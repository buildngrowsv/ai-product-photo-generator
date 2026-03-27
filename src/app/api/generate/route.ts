/**
 * route.ts — API route for AI product photo generation (PhotoForge AI)
 *
 * PURPOSE: Server-side proxy that calls fal.ai to generate professional product
 * photography with AI backgrounds. This is the HOSTED solution — our API key,
 * our backend, metered for billing. Users never see or need an API key.
 *
 * ARCHITECTURE (2026-03-24, Builder 6, BridgeSwarm pane1774):
 * - Client uploads product image as base64 + selects a style preset
 * - This route receives the base64 image + style prompt
 * - Calls fal.ai's FLUX image-to-image model with the prompt
 * - Returns the generated image CDN URL to the client
 *
 * BUG FIX HISTORY (2026-03-24, Builder 6):
 * The original implementation used raw fetch() to https://queue.fal.run/...
 * This is fal.ai's ASYNC QUEUE endpoint — it returns {request_id, response_url}
 * immediately and requires polling to get the actual result. The code was then
 * reading falResult.images[0].url which was ALWAYS undefined because the queue
 * endpoint never returns images directly. Every request would fail with "No image
 * generated" even if fal.ai was perfectly healthy.
 *
 * FIX: Use @fal-ai/client SDK with fal.subscribe() which handles queue polling
 * internally and resolves when the inference is actually complete. The SDK
 * abstracts queue vs sync distinction entirely — you just await the result.
 *
 * HOSTED MODEL (operator directive 2026-03-24):
 * All products must convert from BYOK to hosted backend proxy. This route
 * uses OUR fal.ai key (FAL_KEY env var on Vercel) so users don't need their own.
 * Usage is metered via a simple counter for now — Stripe billing integration
 * will gate heavy usage behind Pro subscription ($12.90/mo).
 *
 * ENV VARS REQUIRED:
 * - FAL_KEY: fal.ai API key (set in Vercel dashboard, NOT in code)
 *
 * SECURITY:
 * - API key is server-side only (Next.js API route, never sent to browser)
 * - Rate limiting: basic IP-based counter (TODO: upgrade to Redis/KV)
 * - Input validation: image size limit, prompt length limit
 *
 * CALLED BY: Frontend generate button (src/app/page.tsx handleGenerateProductPhoto)
 * DEPENDS ON: @fal-ai/client npm package, FAL_KEY env var
 * REFERENCE PATTERN: See ai-image-upscaler/app/api/upscale/route.ts for same pattern
 */

import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
import {
  checkIpRateLimit,
  extractClientIpAddress,
} from "@/lib/server-ip-rate-limiter";

/**
 * Maximum image size in bytes (10MB). Product photos shouldn't be larger
 * than this — if they are, the user should resize before uploading.
 * This prevents abuse and keeps fal.ai API costs reasonable.
 */
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

/**
 * Maximum prompt length in characters. Style presets are typically ~100 chars.
 * Custom prompts shouldn't exceed this — longer prompts don't improve quality
 * and may indicate prompt injection attempts.
 */
const MAX_PROMPT_LENGTH_CHARS = 500;

/**
 * Type definition for the fal.ai FLUX image-to-image response.
 *
 * fal-ai/flux/dev/image-to-image returns an object with an images array.
 * Each image has: url (CDN URL on fal.media), content_type, width, height.
 * We only need the url for our use case.
 *
 * WHY TYPED: fal.subscribe() returns unknown data by default. Casting to this
 * interface lets TypeScript validate our property access and gives IDE support
 * for future maintainers.
 */
interface FalFluxImageToImageOutput {
  images: Array<{
    url: string;
    content_type: string;
    width: number;
    height: number;
  }>;
  timings?: Record<string, number>;
  seed?: number;
  has_nsfw_concepts?: boolean[];
}

export async function POST(request: NextRequest) {
  /**
   * Step 1: Validate FAL_KEY is configured.
   * If missing, the app can't generate images — return a clear error
   * so the operator knows to set it in Vercel dashboard.
   */
  const falApiKey = process.env.FAL_KEY;
  if (!falApiKey) {
    return NextResponse.json(
      {
        error: "Service not configured",
        message: "Image generation service is not yet configured. Please try again later.",
      },
      { status: 503 }
    );
  }

  /**
   * Step 2: Rate limit check.
   * Prevent abuse — 5 requests per 24h per IP via durable Upstash Redis
   * sliding-window (wave-2 hardening 2026-03-27). Replaced in-memory Map
   * (per-instance, resets on cold start) with checkIpRateLimit() from
   * @/lib/server-ip-rate-limiter, which uses @upstash/ratelimit for
   * globally consistent limits across all parallel serverless instances.
   * Falls back to in-memory if UPSTASH env vars are not set.
   */
  const _clientIp = extractClientIpAddress(request);
  const _rateLimitResult = await checkIpRateLimit(_clientIp);
  if (!_rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error: "Rate limited",
        message: "Too many requests. Please wait a minute before generating again.",
      },
      { status: 429 }
    );
  }

  /**
   * Step 3: Parse and validate request body.
   */
  let body: { imageBase64?: string; stylePrompt?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request", message: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const { imageBase64, stylePrompt } = body;

  if (!imageBase64 || typeof imageBase64 !== "string") {
    return NextResponse.json(
      { error: "Missing image", message: "Please upload a product image." },
      { status: 400 }
    );
  }

  if (!stylePrompt || typeof stylePrompt !== "string") {
    return NextResponse.json(
      { error: "Missing style", message: "Please select a background style." },
      { status: 400 }
    );
  }

  /**
   * Validate image size — strip the data URL prefix if present,
   * then check the base64 payload size.
   */
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
  const imageSizeBytes = Math.ceil(base64Data.length * 0.75);
  if (imageSizeBytes > MAX_IMAGE_SIZE_BYTES) {
    return NextResponse.json(
      {
        error: "Image too large",
        message: `Image must be under ${MAX_IMAGE_SIZE_BYTES / 1024 / 1024}MB. Please resize and try again.`,
      },
      { status: 400 }
    );
  }

  if (stylePrompt.length > MAX_PROMPT_LENGTH_CHARS) {
    return NextResponse.json(
      { error: "Prompt too long", message: `Style description must be under ${MAX_PROMPT_LENGTH_CHARS} characters.` },
      { status: 400 }
    );
  }

  /**
   * Step 4: Configure fal.ai client and call image generation.
   *
   * WHY fal.config() per-request: Serverless functions may share module scope
   * between warm invocations. Per-request config ensures the right key is always
   * used and avoids any potential cross-request credential bleed.
   * Pattern copied from ai-image-upscaler/app/api/upscale/route.ts.
   *
   * WHY fal.subscribe() not fal.run():
   * - fal.subscribe() polls the queue until complete — correct for GPU inference
   * - fal.run() was removed or aliased in @fal-ai/client v1.x
   * - fal.subscribe() is the canonical method for long-running inferences
   * - For FLUX dev the job takes ~10-30 seconds — subscribe handles polling
   *
   * WHY NOT raw fetch to queue.fal.run:
   * - queue.fal.run returns {request_id, response_url} immediately (async queue)
   * - You must then poll response_url until status == "COMPLETED"
   * - The original code incorrectly read .images from the queue submit response
   * - This ALWAYS returned undefined -> "No image generated" error
   * - fal.subscribe() encapsulates this entire flow
   *
   * MODEL: fal-ai/flux/dev/image-to-image
   * Transforms an existing product image with AI-generated backgrounds based
   * on the text prompt. Strength 0.65 = 65% new content, 35% original structure.
   * This keeps the product shape visible while replacing the background.
   */
  try {
    fal.config({
      credentials: falApiKey,
    });

    const falApiResult = await fal.subscribe("fal-ai/flux/dev/image-to-image", {
      input: {
        image_url: `data:image/png;base64,${base64Data}`,
        prompt: stylePrompt,
        strength: 0.65,
        num_images: 1,
        num_inference_steps: 28,
        guidance_scale: 3.5,
      },
    });

    /**
     * Extract the generated image URL from fal.ai response.
     * fal-ai/flux/dev/image-to-image returns { images: [{url, content_type, width, height}] }
     * The url is a CDN-hosted image on fal.media (included in next.config.ts remotePatterns).
     *
     * falApiResult.data is the raw model output — cast to our typed interface.
     */
    const responseData = falApiResult.data as FalFluxImageToImageOutput;
    const generatedImageUrl = responseData?.images?.[0]?.url;

    if (!generatedImageUrl) {
      console.error("[PhotoForge API] No image URL in fal.ai response:", JSON.stringify(falApiResult).substring(0, 300));
      return NextResponse.json(
        { error: "No image generated", message: "The AI did not produce an image. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl: generatedImageUrl,
      model: "flux-dev-image-to-image",
    });
  } catch (error) {
    console.error("[PhotoForge API] fal.ai error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Generation failed", message: `Image generation failed: ${errorMessage}` },
      { status: 502 }
    );
  }
}

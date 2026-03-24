/**
 * route.ts — API route for AI product photo generation (PhotoForge AI)
 *
 * PURPOSE: Server-side proxy that calls fal.ai to generate professional product
 * photography with AI backgrounds. This is the HOSTED solution — our API key,
 * our backend, metered for billing. Users never see or need an API key.
 *
 * ARCHITECTURE (2026-03-24, Builder 2, BridgeSwarm pane1774):
 * - Client uploads product image as base64 + selects a style preset
 * - This route receives the base64 image + style prompt
 * - Calls fal.ai's image generation model (FLUX or similar) with the prompt
 * - Returns the generated image as base64 to the client
 *
 * HOSTED MODEL (operator directive 2026-03-24):
 * All products must convert from BYOK to hosted backend proxy. This route
 * uses OUR fal.ai key (FAL_KEY env var on Vercel) so users don't need their own.
 * Usage is metered via a simple counter for now — Stripe billing integration
 * will gate heavy usage behind Pro subscription ($9.90/mo).
 *
 * ENV VARS REQUIRED:
 * - FAL_KEY: fal.ai API key (set in Vercel dashboard, NOT in code)
 *
 * SECURITY:
 * - API key is server-side only (Next.js API route, never sent to browser)
 * - Rate limiting: basic IP-based counter (TODO: upgrade to Redis/KV)
 * - Input validation: image size limit, prompt length limit
 *
 * CALLED BY: Frontend generate button (src/app/page.tsx)
 * DEPENDS ON: fal.ai API (https://fal.ai/models)
 */

import { NextRequest, NextResponse } from "next/server";

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
 * Simple in-memory rate limiter. Tracks requests per IP per minute.
 * TODO: Replace with Vercel KV or Upstash Redis for production at scale.
 *
 * WHY IN-MEMORY: For MVP with low traffic (~1.4k visitors/mo projected),
 * in-memory rate limiting is sufficient. Each Vercel serverless function
 * instance has its own memory, so this isn't globally consistent — but it
 * catches obvious abuse within a single instance's lifetime.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX_REQUESTS_PER_MINUTE = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS_PER_MINUTE) {
    return false;
  }

  entry.count++;
  return true;
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
   * Prevent abuse — 5 requests per minute per IP is generous for
   * legitimate product photo generation use cases.
   */
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(clientIp)) {
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
   * Step 4: Call fal.ai API to generate the product photo.
   *
   * We use fal.ai's image-to-image endpoint with the product photo as
   * the input image and the style prompt as the generation guidance.
   * The model replaces/enhances the background while keeping the product.
   *
   * MODEL CHOICE: Using fal-ai/flux/dev for high quality image generation.
   * This model supports image-to-image with prompt guidance, which is
   * exactly what we need for product background replacement.
   */
  try {
    const falResponse = await fetch("https://queue.fal.run/fal-ai/flux/dev/image-to-image", {
      method: "POST",
      headers: {
        "Authorization": `Key ${falApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_url: `data:image/png;base64,${base64Data}`,
        prompt: stylePrompt,
        strength: 0.65,
        num_images: 1,
        image_size: "square_hd",
        num_inference_steps: 28,
        guidance_scale: 3.5,
      }),
    });

    if (!falResponse.ok) {
      const errorText = await falResponse.text();
      console.error("[PhotoForge API] fal.ai error:", falResponse.status, errorText);
      return NextResponse.json(
        {
          error: "Generation failed",
          message: "Image generation failed. Please try again.",
        },
        { status: 502 }
      );
    }

    const falResult = await falResponse.json();

    /**
     * fal.ai returns images in the `images` array with `url` properties.
     * We return the first generated image URL to the client.
     */
    const generatedImageUrl = falResult?.images?.[0]?.url;
    if (!generatedImageUrl) {
      console.error("[PhotoForge API] No image in fal.ai response:", JSON.stringify(falResult).substring(0, 200));
      return NextResponse.json(
        { error: "No image generated", message: "The AI did not produce an image. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl: generatedImageUrl,
      model: "flux-dev",
    });
  } catch (error) {
    console.error("[PhotoForge API] Unexpected error:", error);
    return NextResponse.json(
      { error: "Server error", message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

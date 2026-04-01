/**
 * POST /api/stripe/create-checkout
 *
 * Creates a Stripe Checkout Session for the Product Photo Pro plan and returns
 * the hosted checkout URL. The client-side ProductPhotoProCheckoutButton POSTs
 * here, then redirects window.location.href to the returned url.
 *
 * WHY direct fetch() instead of Stripe SDK (v17 / v20):
 * Both stripe@17 and stripe@20 crash on Vercel serverless with
 * "An error occurred with our connection to Stripe. Request was retried N times."
 * The bug is in stripe-node's http agent keep-alive logic, which Vercel's
 * cold-start environment does not survive. Direct fetch() to api.stripe.com
 * bypasses the SDK entirely and is 100% stable on Vercel.
 * Pattern validated in: ai-tattoo-generator (commit 453a419),
 * ai-image-upscaler (commit 7f401e7), ai-background-remover (commit cad2a4f).
 *
 * WHY manual body construction instead of URLSearchParams:
 * URLSearchParams encodes "{" as "%7B", which breaks Stripe template variables.
 * (We don't use template variables here, but the array join pattern is consistent
 * across all clone repos for copy-paste reliability.)
 *
 * Stripe product: AI Product Photo Pro — $11.99/month recurring subscription
 * Live price ID: price_1TEUbhGsPhSTDD4x6Rcg9hKo
 * Created 2026-03-24 by Builder 8 + Stripe API agent.
 * Checkout route wired by Builder 9 (2026-03-25, T-productphoto-stripe).
 */

import { NextRequest, NextResponse } from "next/server";
import { createPendingToken } from "@/lib/subscription-store";

/**
 * PLAN_TO_STRIPE_PRICE_ID — maps plan slug sent from the client button to the
 * live Stripe price ID. Currently only "pro" exists; adding "business" later
 * just means adding another entry here.
 */
const PLAN_TO_STRIPE_PRICE_ID: Record<string, string> = {
  // AI Product Photo Pro — $11.99/month recurring subscription
  // Created 2026-03-24 by Builder 8 + Stripe API agent.
  pro: "price_1TEUbhGsPhSTDD4x6Rcg9hKo",
};

export async function POST(request: NextRequest) {
  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    return NextResponse.json(
      {
        error:
          "Image generation is not configured on this deployment yet. Checkout is paused until the service is live.",
      },
      { status: 503 }
    );
  }

  // Guard: Stripe secret key must be present at request time.
  // We intentionally do NOT read this at module load time — that would crash
  // next build when the env var isn't injected (CI, fresh clones, preview deploys).
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured on this server." },
      { status: 500 }
    );
  }

  // Parse plan slug from request body sent by ProductPhotoProCheckoutButton.
  let plan = "pro";
  try {
    const body = (await request.json()) as { plan?: string };
    if (body.plan) plan = body.plan;
  } catch {
    // If body parsing fails, fall back to "pro" — the button only sends one plan.
  }

  const priceId = PLAN_TO_STRIPE_PRICE_ID[plan];
  if (!priceId) {
    return NextResponse.json({ error: `Unknown plan: ${plan}` }, { status: 400 });
  }

  // Derive the base URL for success/cancel redirects.
  // On Vercel, NEXT_PUBLIC_APP_URL is set to the canonical domain.
  // Locally, fall back to the dev server's default port 3000 (no custom port).
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";

  // ---------------------------------------------------------------------------
  // PRO ENTITLEMENT TOKEN (T018, 2026-03-26): Generate before Stripe session.
  //
  // We create a UUID token now and:
  //   1. Store it as "pending" in Upstash Redis (1h TTL)
  //   2. Pass it as client_reference_id so Stripe echoes it back in the webhook
  //   3. Embed it in success_url so the client can save it in localStorage
  //
  // The webhook (/api/stripe/webhook) activates the token on
  // checkout.session.completed, upgrading its state to "active" (13-month TTL).
  // The generate route checks isProActive(x-pro-token) BEFORE IP rate limiting.
  //
  // If Upstash is not configured, createPendingToken() still returns a UUID —
  // checkout works, but Pro bypass won't function until env vars are set.
  // ---------------------------------------------------------------------------
  const subscriptionToken = await createPendingToken();

  // Build success and cancel URLs.
  // Token appended to success_url so the client-side component can read it from
  // URLSearchParams and persist to localStorage("productphoto_pro_token").
  const successUrl =
    `${appUrl}/?checkout=success&plan=${encodeURIComponent(plan)}` +
    `&token=${encodeURIComponent(subscriptionToken)}`;
  const cancelUrl = `${appUrl}/#pricing`;

  // Construct the form-encoded body for the Stripe Checkout Session API.
  const bodyParts = [
    `mode=subscription`,
    `line_items[0][price]=${encodeURIComponent(priceId)}`,
    `line_items[0][quantity]=1`,
    `success_url=${encodeURIComponent(successUrl)}`,
    `cancel_url=${encodeURIComponent(cancelUrl)}`,
    `allow_promotion_codes=true`,
    `client_reference_id=${encodeURIComponent(subscriptionToken)}`,
    `metadata[plan]=${encodeURIComponent(plan)}`,
    `metadata[source]=product-photo-generator`,
  ];

  // POST directly to Stripe REST API — no SDK, no keep-alive issues.
  let stripeResponse: Response;
  try {
    stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Stripe-Version": "2025-02-24.acacia",
      },
      body: bodyParts.join("&"),
    });
  } catch (networkError) {
    console.error("[create-checkout] Network error calling Stripe:", networkError);
    return NextResponse.json(
      { error: "Could not reach Stripe. Please try again." },
      { status: 502 }
    );
  }

  const stripeData = (await stripeResponse.json()) as {
    url?: string;
    error?: { message?: string };
  };

  if (!stripeResponse.ok || !stripeData.url) {
    const stripeErrorMessage = stripeData.error?.message || "Stripe returned an error.";
    console.error("[create-checkout] Stripe error:", stripeErrorMessage);
    return NextResponse.json({ error: stripeErrorMessage }, { status: 500 });
  }

  // Return the Stripe-hosted checkout URL to the client.
  return NextResponse.json({ url: stripeData.url });
}

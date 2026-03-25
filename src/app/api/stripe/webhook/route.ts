/**
 * POST /api/stripe/webhook
 *
 * Receives Stripe webhook events and verifies the HMAC-SHA256 signature
 * using the Web Crypto API (no Stripe SDK needed).
 *
 * WHY no Stripe SDK for webhook verification:
 * The SDK's constructEvent() function requires the raw body as a Buffer
 * AND the Stripe-Signature header. Both are accessible natively in Next.js
 * App Router edge functions. Using the Web Crypto API eliminates the
 * sdk dependency entirely, which avoids the cold-start keep-alive crash
 * described in create-checkout/route.ts.
 *
 * WHY export const dynamic = "force-dynamic":
 * Without this, Next.js may statically optimize this route at build time,
 * which prevents reading the raw request body needed for HMAC verification.
 *
 * CURRENTLY HANDLED EVENT:
 * - checkout.session.completed: Logs the subscription activation. Extend
 *   with DB writes when user accounts land in this repo.
 *
 * TO REGISTER THIS WEBHOOK IN STRIPE DASHBOARD:
 * Dashboard → Developers → Webhooks → Add endpoint
 * URL: https://<your-vercel-domain>/api/stripe/webhook
 * Events: checkout.session.completed
 * After saving, copy the signing secret → set as STRIPE_WEBHOOK_SECRET on Vercel.
 *
 * Builder 9 (2026-03-25, T-productphoto-stripe).
 */

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * verifyStripeWebhookSignature — reimplements Stripe's constructEvent()
 * using the native Web Crypto API. See ai-tattoo-generator for full rationale.
 */
async function verifyStripeWebhookSignature(
  rawBody: string,
  signatureHeader: string,
  webhookSecret: string
): Promise<boolean> {
  const parts = signatureHeader.split(",");
  let timestamp = "";
  const v1Signatures: string[] = [];

  for (const part of parts) {
    if (part.startsWith("t=")) timestamp = part.slice(2);
    if (part.startsWith("v1=")) v1Signatures.push(part.slice(3));
  }

  if (!timestamp || v1Signatures.length === 0) return false;

  const signedPayload = `${timestamp}.${rawBody}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(signedPayload)
  );

  const computedHex = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return v1Signatures.some((sig) => sig === computedHex);
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json(
      { error: "Webhook secret not configured." },
      { status: 500 }
    );
  }

  const rawBody = await request.text();
  const signatureHeader = request.headers.get("stripe-signature") || "";

  const isValid = await verifyStripeWebhookSignature(rawBody, signatureHeader, webhookSecret);
  if (!isValid) {
    console.error("[webhook] Invalid Stripe signature");
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    event = JSON.parse(rawBody) as typeof event;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("[webhook] checkout.session.completed:", {
        sessionId: session["id"],
        customerId: session["customer"],
        subscriptionId: session["subscription"],
        metadata: session["metadata"],
      });
      // TODO: Write subscription activation to DB when user accounts are added.
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

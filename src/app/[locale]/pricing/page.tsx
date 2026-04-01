/**
 * [locale]/pricing/page.tsx — Server entry for pricing; delegates UI to PricingClient.tsx
 *
 * FAL_KEY is read here at request time on the server (same signal as /api/runtime-status)
 * so the Pro tier and "Purchases Paused" banner are correct on first paint — no client fetch
 * shim that could hang under Playwright + next dev. See PricingClient.tsx header comment.
 */
import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing | PhotoForge AI",
  description:
    "Free tier and Pro plan for AI product photo generation — upgrade for unlimited studio-quality output.",
};

export default function PricingPage() {
  return <PricingClient initialFalConfigured={Boolean(process.env.FAL_KEY)} />;
}

/**
 * [locale]/pricing/page.tsx — Server entry for pricing; delegates UI to PricingClient.tsx
 *
 * FAL_KEY is read here at request time on the server (same signal as /api/runtime-status)
 * so the Pro tier and "Purchases Paused" banner are correct on first paint — no client fetch
 * shim that could hang under Playwright + next dev. See PricingClient.tsx header comment.
 */
import type { Metadata } from "next";
import PricingClient from "./PricingClient";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://aiproductphotomaker.com";

export const metadata: Metadata = {
  title: "Pricing | PhotoForge AI",
  description:
    "Free tier and Pro plan for AI product photo generation — upgrade for unlimited studio-quality output.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: "Pricing | PhotoForge AI",
    description:
      "Free tier and Pro plan for AI product photo generation — upgrade for unlimited studio-quality output.",
    url: `${SITE_URL}/pricing`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function PricingPage() {
  return <PricingClient initialFalConfigured={Boolean(process.env.FAL_KEY)} />;
}

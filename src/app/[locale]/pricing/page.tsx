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

/**
 * FAQPage JSON-LD — mirrors the FAQ section rendered in PricingClient.tsx.
 * Enables Google's FAQ rich result in organic search, increasing CTR for
 * "[product] pricing" and "cancel anytime" intent queries.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I cancel anytime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Cancel from your Stripe billing portal with one click. No lock-in, no questions.",
      },
    },
    {
      "@type": "Question",
      name: "Is the output commercial-use ready?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Pro images include a full commercial license — use them on Amazon, Shopify, ads, anywhere.",
      },
    },
    {
      "@type": "Question",
      name: "What types of products work best?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any physical product — apparel, electronics, food packaging, jewelry, cosmetics. Clean source photos get the best results.",
      },
    },
    {
      "@type": "Question",
      name: "Is my payment secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Checkout is handled entirely by Stripe — your card details never touch our servers.",
      },
    },
  ],
};

/**
 * SoftwareApplication + Offer JSON-LD — enables Google rich snippets showing
 * price and application category in search results for "[product] pricing" queries.
 */
const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PhotoForge AI",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/pricing`,
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "3 product photos per day",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "11.99",
      priceCurrency: "USD",
      description: "Unlimited product photos, all backgrounds, priority processing",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PricingClient initialFalConfigured={Boolean(process.env.FAL_KEY)} />
    </>
  );
}

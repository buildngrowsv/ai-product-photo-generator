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

/**
 * async generateMetadata (not static export const metadata).
 *
 * WHY: When the parent [locale]/layout.tsx uses async generateMetadata(),
 * Next.js RSC streaming does not reliably flush CHILD page static metadata
 * exports into initial HTML. Googlebot sees the parent layout's title instead
 * of the pricing-specific title. Converting to async forces Next.js to resolve
 * this page's metadata during SSR.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI Product Photo Pricing — Free Plan + Pro From $11.99/mo",
    description:
      "Get 3 free AI product photos daily. Upgrade to Pro for unlimited high-res e-commerce shots, batch processing, and commercial license. Cancel anytime.",
    alternates: {
      canonical: `${SITE_URL}/pricing`,
    },
    openGraph: {
      title: "AI Product Photo Pricing — Free Plan + Pro From $11.99/mo",
      description:
        "Get 3 free AI product photos daily. Upgrade to Pro for unlimited high-res e-commerce shots, batch processing, and commercial license. Cancel anytime.",
      url: `${SITE_URL}/pricing`,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

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

/**
 * BreadcrumbList JSON-LD — helps Google display breadcrumb navigation
 * (Home > Pricing) in search results, improving click-through rate.
 */
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE_URL}/pricing` },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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

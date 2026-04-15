/**
 * =============================================================================
 * PhotoForge AI — Root Layout
 * =============================================================================
 *
 * PURPOSE:
 * Provides the HTML shell (<html>, <body>) for ALL pages, including both
 * locale-routed pages (under [locale]/) and non-locale pSEO pages
 * (/for/, /vs/, /use-cases/, /best/).
 *
 * WHY THIS STRUCTURE:
 * When next-intl was added (pane1774 T13, 2026-03-24), the <html>/<body>
 * tags were moved into [locale]/layout.tsx, leaving this root layout as a
 * bare fragment. That broke all pSEO pages outside [locale] because they
 * had no HTML shell — causing 404s on /for/*, /vs/*, etc.
 *
 * FIX (2026-04-14, Custom 2 / prism-exec-6847):
 * Root layout now owns <html> and <body>. The [locale] layout is a nested
 * wrapper that adds locale providers and JSON-LD without duplicating the
 * document structure. pSEO pages inherit this root layout and render
 * correctly. Same pattern as mangaartai fix (Builder 3, commit 3b5583a).
 * =============================================================================
 */
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ExitIntentCapture from "@/components/ExitIntentCapture";
import StickyBottomCTA from "@/components/StickyBottomCTA";
import "./globals.css";

/**
 * next/font/google Inter — self-hosted by Next.js at build time.
 * Eliminates external Google Fonts request, reducing CLS and
 * improving first paint by ~200ms.
 */
const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#7c3aed" },
  ],
};

/**
 * Root-level metadata — ensures every page has a <title> and canonical in
 * SSR HTML. The [locale]/layout.tsx generateMetadata overrides these for
 * locale-routed pages, but pages served from root page.tsx need this.
 *
 * FIX (2026-04-15, Coordinator 1): Production curl showed no <title> tag.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://aiproductphotomaker.com"),
  title: "AI Generated Product Photos — Free Product Photo Generator for E-Commerce | PhotoForge",
  description:
    "Generate AI product photos for Amazon, Shopify & Etsy in seconds. Upload your product, choose a background, get studio-quality photos instantly. Free AI product photography — no photographer needed.",
  alternates: {
    canonical: "https://aiproductphotomaker.com",
  },
  openGraph: {
    title: "AI Generated Product Photos — Free Product Photo Generator for E-Commerce | PhotoForge",
    description:
      "Generate AI product photos for Amazon, Shopify & Etsy in seconds. Upload your product, choose a background, get studio-quality photos instantly. Free AI product photography — no photographer needed.",
    type: "website",
    url: "https://aiproductphotomaker.com",
    siteName: "PhotoForge AI",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "PhotoForge AI — AI Product Photo Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
};

/**
 * SoftwareApplication JSON-LD — placed in root layout so curl to `/` (without
 * locale prefix) returns structured data for Google. The [locale]/layout also
 * has this schema; duplicates are harmless — Google deduplicates by @type+name.
 * Without this, production homepage audit shows SoftwareApplication FAIL.
 */
const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PhotoForge AI — AI Product Photo Generator",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  url: "https://aiproductphotomaker.com",
  description:
    "Generate stunning product photos instantly with AI. Upload your product, pick a background style, and get professional e-commerce photos in seconds. Free to try.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "11.99",
    priceCurrency: "USD",
    offerCount: 2,
  },
  featureList: [
    "AI-powered product photo generation",
    "White studio and lifestyle scene backgrounds",
    "Optimized for Amazon, Shopify, and Etsy listings",
    "No photography skills required",
    "Instant results from product uploads",
  ],
};

/**
 * Organization JSON-LD — tells Google this site belongs to a real business
 * entity (SymplyAI). Improves E-E-A-T signals and Knowledge Panel eligibility.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PhotoForge AI",
  url: "https://aiproductphotomaker.com",
  logo: "https://aiproductphotomaker.com/icon.png",
  description:
    "AI-powered product photo generator — create professional e-commerce photos instantly.",
  parentOrganization: {
    "@type": "Organization",
    name: "SymplyAI",
    url: "https://symplyai.io",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://aiproductphotomaker.com/contact",
  },
};


/**
 * BreadcrumbList JSON-LD — breadcrumb navigation in Google search results.
 * Improves click-through rate by showing site hierarchy directly in SERP.
 */
const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://aiproductphotomaker.com" },
    { "@type": "ListItem", position: 2, name: "Pricing", item: "https://aiproductphotomaker.com/pricing" },
  ],
};


/**
 * WebSite JSON-LD — establishes site identity in Google search results
 * and enables sitelinks searchbox eligibility.
 */
const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PhotoForge AI",
  url: "https://aiproductphotomaker.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://aiproductphotomaker.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

/**
 * HowTo JSON-LD — enables "How to" rich results in Google SERPs.
 * Targets "how to create product photos with AI" queries with step-by-step instructions.
 */
const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create Product Photos with AI",
  description: "Use PhotoForge AI to turn smartphone snapshots into professional e-commerce product photos — upload, choose a background, and download.",
  totalTime: "PT30S",
  tool: { "@type": "HowToTool", name: "PhotoForge AI (aiproductphotomaker.com)" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Upload your product", text: "Take a photo of your product with any smartphone — the AI handles background removal, relighting, and shadow generation." },
    { "@type": "HowToStep", position: 2, name: "Choose a background scene", text: "Select pure white (Amazon-compliant), lifestyle scenes, gradient studio backdrops, seasonal themes, or custom colors." },
    { "@type": "HowToStep", position: 3, name: "Download pro-quality photos", text: "Get studio-quality product images ready for Amazon, Shopify, Etsy, or any marketplace." },
  ],
};

/* FAQPage JSON-LD removed — page-level components provide page-specific FAQs. Layout-level FAQPage duplicates with every page. */

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`dark ${interFont.variable}`}>
      <head>
        {/* Google Search Console verification — aiproductphotomaker.com (buildngrowsv@gmail.com) */}
        <meta
          name="google-site-verification"
          content="EvH1LfFf_PO3s16leLnD-OJjSDYeGdXpvZlk_xT5ht8"
        />
              <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
              <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="font-sans antialiased bg-gray-950 text-white min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
        />
        {children}
        <ExitIntentCapture />
        <StickyBottomCTA />
      </body>
    </html>
  );
}

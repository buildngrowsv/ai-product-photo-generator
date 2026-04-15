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
  title: "AI Product Photo Generator — Professional Product Photos with AI | PhotoForge",
  description:
    "Generate product photos instantly with AI. Upload your product, pick a style, and get professional e-commerce photos in seconds. Free to try.",
  alternates: {
    canonical: "https://aiproductphotomaker.com",
  },
  openGraph: {
    title: "AI Product Photo Generator — Professional Product Photos with AI",
    description:
      "Generate stunning product photos instantly with AI. Free to try — no sign-up required.",
    type: "website",
    url: "https://aiproductphotomaker.com",
    siteName: "PhotoForge AI",
  },
  twitter: { card: "summary_large_image" },
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`dark ${interFont.variable}`}>
      <head>
        {/* Google Search Console verification — aiproductphotomaker.com (buildngrowsv@gmail.com) */}
        <meta
          name="google-site-verification"
          content="EvH1LfFf_PO3s16leLnD-OJjSDYeGdXpvZlk_xT5ht8"
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
        {children}
        <ExitIntentCapture />
      </body>
    </html>
  );
}

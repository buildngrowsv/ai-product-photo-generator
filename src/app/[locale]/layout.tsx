/**
 * [locale]/layout.tsx — Locale-aware root layout for PhotoForge AI
 *
 * PURPOSE: This is the HTML shell that renders for every locale. It owns the
 * <html lang={locale}> tag, Inter font, dark theme, JSON-LD structured data,
 * and the NextIntlClientProvider that makes translations available to client
 * components.
 *
 * MIGRATION NOTE (2026-03-24, pane1774 T13):
 * Originally this was src/app/layout.tsx with a hardcoded lang="en". We moved
 * it here so that lang= can be set dynamically from the URL locale segment.
 * The root layout.tsx is now a pass-through (renders children only).
 *
 * SEO:
 * - generateMetadata reads translations via getTranslations so title/description
 *   are locale-specific (EN vs ES).
 * - hreflang alternates tell Google about the EN/ES variants.
 * - generateStaticParams ensures both locales are pre-rendered at build time
 *   (important for static hosting on Vercel).
 *
 * JSON-LD:
 * Two structured data blocks — SoftwareApplication (rich snippet eligibility)
 * and HowTo (step-by-step rich snippets) — are injected inline in <head> as
 * Google recommends. FAQPage JSON-LD lives at the page level only to avoid
 * Google "Duplicate field" errors. They remain in English only for now; the
 * content itself does not need to change for ES pages since it's schema metadata.
 *
 * BUSINESS: Free 3 images → Pro $11.99/mo unlimited. Stripe Payment Link checkout.
 *
 * Updated 2026-03-24 by Scout 15 / i18n rollout agent.
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import CookieConsent from "@/components/CookieConsent";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
/* globals.css is now imported in the root layout (src/app/layout.tsx) */
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import GoogleAnalyticsLoader from "@/components/GoogleAnalytics";

/**
 * Production URL — used for canonical and hreflang alternates.
 * Change this when a custom domain (e.g. productphotos.symplyai.io) is set.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://aiproductphotomaker.com"
).replace(/\/$/, "");

/**
 * JSON-LD: SoftwareApplication schema
 *
 * Tells Google this is a web app so it can show rich snippets (star ratings,
 * price, feature list). applicationCategory PhotographyApplication matches
 * the Google-documented enum for photo editing tools.
 *
 * This block is intentionally static (EN-only) because schema.org rich results
 * are indexed in whatever language the page is in — the ES page will also have
 * this block but Google's crawler will read the page locale from lang= attribute.
 */
const jsonLdStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PhotoForge AI - Product Photo Generator",
  "applicationCategory": "PhotographyApplication",
  "operatingSystem": "Web",
  "description":
    "Transform your product photos with AI-generated professional backgrounds. Upload any product image and get stunning e-commerce photography in seconds.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free tier: 3 product photos. Pro: $11.99/month unlimited.",
  },
  "featureList": [
    "AI-powered product background generation",
    "Professional e-commerce photography in seconds",
    "Multiple background styles and scenes",
    "High-resolution output for marketplaces",
    "No photography skills required",
  ],
};

/**
 * HowTo JSON-LD — targets "how to create product photos with AI" queries.
 * Google displays step-by-step rich snippets; AI engines cite steps directly.
 */
const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create Professional Product Photos with AI",
  description:
    "Generate studio-quality product photos in 3 easy steps using PhotoForge AI — free, no photography equipment needed.",
  totalTime: "PT30S",
  tool: {
    "@type": "HowToTool",
    name: "PhotoForge AI (photoforgepro.com)",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Upload your product image",
      text: "Upload any product photo taken with a smartphone or camera. No professional equipment needed — PhotoForge AI handles background removal, relighting, and shadow generation automatically.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose a background scene",
      text: "Select from dozens of backgrounds: pure white (Amazon-compliant), lifestyle scenes, gradient studio backdrops, seasonal themes, or custom colors. The AI adjusts lighting and shadows to match each scene naturally.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download your professional photo",
      text: "Download the studio-quality product image ready for Amazon, Shopify, Etsy, or any marketplace. Pro plans enable batch processing for large catalogs and A/B testing multiple backgrounds.",
    },
  ],
};

/**
 * generateStaticParams — pre-renders both locales at build time.
 *
 * Required for static hosting (Vercel) so that /es path is generated as a
 * static page rather than requiring a server render on first hit.
 * Called automatically by Next.js during `next build`.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * generateMetadata — locale-aware page metadata.
 *
 * Reads title and description from the locale's messages/en.json or
 * messages/es.json via getTranslations. This means each locale gets its own
 * title/description in Google's index.
 *
 * hreflang alternates: tells Google which URL is English and which is Spanish,
 * preventing duplicate content penalties and enabling locale-targeted results.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(siteUrl),
    verification: { google: "EvH1LfFf_PO3s16leLnD-OJjSDYeGdXpvZlk_xT5ht8" },
    title: t("title"),
    description: t("description"),
    keywords: [
      "ai product photo generator",
      "product photography ai",
      "e-commerce product photos",
      "ai background generator",
      "product photo editor free",
    ],
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      siteName: "PhotoForge AI",
      url: siteUrl,
      /*
       * og:image — points to the dynamic opengraph-image.tsx at src/app/opengraph-image.tsx.
       * Next.js resolves relative paths against metadataBase (siteUrl above).
       * Without this explicit images array, the locale layout's openGraph block
       * shadows/overrides the file-based opengraph-image.tsx, causing no og:image tag
       * to appear in the rendered HTML. Adding it explicitly here fixes the social
       * sharing preview that was showing blank on Twitter/LinkedIn/Slack.
       * Identified as missing during fleet audit 2026-04-08 (PARTIAL og:image on aiproductphotomaker.com).
       */
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "PhotoForge AI — Studio-quality AI product photos for ecommerce",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image"],
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        en: siteUrl,
        es: `${siteUrl}/es`,
        "x-default": siteUrl,
      },
    },
  };
}

/**
 * LocaleLayout — the actual HTML shell rendered for every page.
 *
 * setRequestLocale(locale): Enables static rendering for locale routes.
 * Without this call, Next.js would force dynamic rendering for every page
 * because getTranslations/getMessages use request context.
 *
 * NextIntlClientProvider: Makes messages available to client components
 * (e.g. interactive UI that uses useTranslations hook). We pass all messages
 * for simplicity; for very large sites you'd pass only the needed namespace.
 */

/* Viewport is now exported from root layout (src/app/layout.tsx) */

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering — must be called before any async operations
  // that rely on request context (getMessages, getTranslations).
  setRequestLocale(locale);

  // Load all messages for this locale — passed to client provider below.
  const messages = await getMessages();

  return (
    <>
      {/* Set correct lang attribute — root layout hardcodes "en" for pSEO pages */}
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang="${locale}"` }} />
      {/* SoftwareApplication rich snippet for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdStructuredData),
        }}
      />
      {/* HowTo schema — step-by-step rich snippets for "how to create product photos" */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />
      {/* GA4 with consent mode — GoogleAnalyticsLoader reads env var internally */}
      <GoogleAnalyticsLoader />
      <LanguageSwitcher locale={locale} />
      <header className="fixed top-2 right-4 z-50 flex items-center">
        <LocaleSwitcher />
      </header>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
      <CookieConsentBanner />
      <CookieConsent />
    </>
  );
}

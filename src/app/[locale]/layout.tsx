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
 * and FAQPage (expandable Q&A in SERP) — are injected inline in <head> as
 * Google recommends. They remain in English only for now; the content itself
 * does not need to change for ES pages since it's schema metadata.
 *
 * BUSINESS: Free 3 images → Pro $9.90/mo unlimited. Stripe Payment Link checkout.
 *
 * Updated 2026-03-24 by Scout 15 / i18n rollout agent.
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

/**
 * Production URL — used for canonical and hreflang alternates.
 * Change this when a custom domain (e.g. productphotos.symplyai.io) is set.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_APP_URL || "https://product-photo.symplyai.io"
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
    "description": "Free tier: 3 product photos. Pro: $9.90/month unlimited.",
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
 * JSON-LD: FAQPage schema
 *
 * Provides expandable Q&A rich results in Google SERP — high-CTR format.
 * Questions mirror the FAQ section on the landing page.
 * Added by Scout 15 (2026-03-24) as part of SEO meta rollout across clone apps.
 */
const jsonLdFaqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is PhotoForge AI free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! PhotoForge AI offers 3 free product photos to start. Pro plans at $9.90/month give you unlimited generations for your e-commerce store.",
      },
    },
    {
      "@type": "Question",
      "name": "What kind of product photos can I create?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can create professional e-commerce photos for any product. Upload your product image and AI generates stunning backgrounds — perfect for Amazon, Shopify, Etsy, and other marketplaces.",
      },
    },
    {
      "@type": "Question",
      "name": "Do I need photography equipment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No! Just upload a basic product photo taken with any camera or phone. Our AI handles the background, lighting, and composition to create professional-quality results.",
      },
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
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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
    <html lang={locale} className="dark">
      <head>
        {/* SoftwareApplication rich snippet for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdStructuredData),
          }}
        />
        {/* FAQPage rich snippet for Google SERP expandable Q&A */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqData) }}
        />
      </head>
      <body className="font-sans antialiased bg-gray-950 text-white min-h-screen">
        {/* GA4 — conditionally rendered; set NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel env to activate */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics trackingId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
        )}
        <LanguageSwitcher locale={locale} />
        {/*
         * NextIntlClientProvider wraps the entire app so that client
         * components can call useTranslations() without an extra provider
         * higher in the tree. messages are serialized from server to client.
         */}
                <header className="fixed top-2 right-4 z-50 flex items-center">
          <LocaleSwitcher />
        </header>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

/**
 * =============================================================================
 * PhotoForge AI — Sitemap Configuration
 * =============================================================================
 *
 * PURPOSE:
 * Generates sitemap.xml for search engine discovery. Target keyword
 * "ai product photo generator free" has strong e-commerce intent — sellers
 * on Etsy, Amazon, and Shopify need professional product photos fast.
 *
 * DYNAMIC SEO PAGES:
 * Imports SEO_PAGES_CONFIG to automatically generate sitemap entries for
 * /for/[audience] and /best/[slug] programmatic pages. Adding a new audience
 * or best page to seo-pages.ts automatically adds it to the sitemap.
 *
 * BASE URL: Vercel deployment URL. Update when custom domain is configured.
 *
 * ADDED: 2026-03-24 as part of SEO rollout across all clone apps.
 * UPDATED: 2026-04-13 to include /for/ and /best/ programmatic SEO routes.
 * =============================================================================
 */

import type { MetadataRoute } from "next";
import { SEO_PAGES_CONFIG } from "@/config/seo-pages";
import { getAllBlogSlugs } from "@/config/blog-posts";

const BASE_URL = (
  process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://aiproductphotomaker.com"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  /**
   * Static pages — manually maintained list of core site pages.
   */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guide/ai-product-photography`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/shopify-product-photos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/amazon-product-photos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/photoroom-alternative`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/refunds`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/vs/pebblely`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vs/photoroom`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vs/flair-ai`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vs/pixelcut`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  /**
   * Audience landing pages — /for/[audience] routes generated from
   * SEO_PAGES_CONFIG. Each targets a specific buyer persona searching
   * for "best AI product photo generator for [audience]".
   */
  const audiencePages: MetadataRoute.Sitemap = SEO_PAGES_CONFIG.audiences.map(
    (audienceEntry) => ({
      url: `${BASE_URL}/for/${audienceEntry.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  /**
   * Best-of listicle pages — /best/[slug] routes generated from
   * SEO_PAGES_CONFIG. Each targets high-intent "best [category]" keywords
   * that capture comparison shoppers ready to buy.
   */
  const bestPages: MetadataRoute.Sitemap = SEO_PAGES_CONFIG.bestPages.map(
    (bestEntry) => ({
      url: `${BASE_URL}/best/${bestEntry.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  /* ── pSEO hub pages (parent indices for content clusters) ── */
  const hubPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/vs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/for`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/use-cases`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/best`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/get-started`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  /**
   * Use case pages — /use-cases/[use-case] routes from SEO_PAGES_CONFIG.
   */
  const useCasePages: MetadataRoute.Sitemap = SEO_PAGES_CONFIG.useCases.map(
    (useCaseEntry) => ({
      url: `${BASE_URL}/use-cases/${useCaseEntry.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  /**
   * Blog index + individual article pages.
   * Added 2026-04-14 — blog content initiative.
   */
  const blogIndexPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const blogPostPages: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  /**
   * Locale-aware entries — each English page gets hreflang alternates
   * for all 5 locales (en/es/fr/de/pt), plus separate entries for each
   * non-English locale so Google discovers and indexes every variant.
   */
  const NON_DEFAULT_LOCALES = ["es", "fr", "de", "pt"] as const;

  const allEnglishOnly = [
    ...staticPages,
    ...hubPages,
    ...audiencePages,
    ...bestPages,
    ...useCasePages,
    ...blogIndexPage,
    ...blogPostPages,
  ];

  const withLocales: MetadataRoute.Sitemap = [];
  for (const entry of allEnglishOnly) {
    const path = entry.url.replace(BASE_URL, "");
    const languageAlternates: Record<string, string> = {
      en: `${BASE_URL}${path}`,
    };
    for (const loc of NON_DEFAULT_LOCALES) {
      languageAlternates[loc] = `${BASE_URL}/${loc}${path || "/"}`;
    }
    withLocales.push({
      ...entry,
      alternates: { languages: languageAlternates },
    });
    for (const loc of NON_DEFAULT_LOCALES) {
      withLocales.push({
        url: `${BASE_URL}/${loc}${path || "/"}`,
        lastModified: entry.lastModified,
        changeFrequency: entry.changeFrequency,
        priority: Math.max(0.1, (entry.priority ?? 0.5) - 0.05),
      });
    }
  }

  return withLocales;
}

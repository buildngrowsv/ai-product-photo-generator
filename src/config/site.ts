/**
 * Site configuration — PhotoForge AI branding, URLs, and metadata.
 *
 * PRODUCT CONTEXT:
 * PhotoForge AI is a web-first SaaS that transforms product images into
 * professional studio-quality photos using AI (fal.ai). E-commerce sellers
 * upload a product image and the AI removes backgrounds, adds professional
 * lighting, and places products in clean studio environments.
 *
 * MARKET POSITIONING:
 * Category: AI Product Photo Generator
 * Competitors: Photoroom, PixelCut, Flair AI, Mokker
 * Our wedge: Simpler UX, competitive pricing ($11.99/mo), no per-image fees,
 * unlimited generations on Pro tier.
 *
 * IMPORTED BY:
 * - src/config/seo-pages.ts (canonical URLs for SEO pages)
 * - src/app/for/[audience]/page.tsx (canonical URL generation)
 * - src/app/best/[slug]/page.tsx (canonical URL generation)
 * - src/app/sitemap.ts (base URL for sitemap entries)
 */
export const siteConfig = {
  siteName: "PhotoForge AI",
  siteDescription:
    "Transform product images into professional studio-quality photos with AI. Remove backgrounds, add lighting, and create e-commerce ready images in seconds.",
  siteUrl: (
    process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://aiproductphotomaker.com"
  ).replace(/\/$/, ""),
  supportEmail: "support@symplyai.io",
  domain: "aiproductphotomaker.com",
};

export type SiteConfig = typeof siteConfig;

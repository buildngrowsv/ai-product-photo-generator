/**
 * Product Configuration — PhotoForge AI
 *
 * WHY THIS FILE EXISTS:
 * Centralizes all product-specific branding, pricing, and model config so that
 * SEO pages, pricing UI, and landing page all draw from a single source of truth.
 * Follows the saas-clone-template PRODUCT_CONFIG pattern used across all clone SKUs.
 *
 * BUSINESS MODEL:
 * Free tier (3 product photos/day) hooks e-commerce sellers who need a quick
 * background swap or studio shot. Pro ($11.99/mo) unlocks unlimited generations,
 * 4K output, batch processing, and priority queue — the margins come from
 * subscribers who pay monthly but don't max out GPU inference every day.
 *
 * IMPORTED BY:
 * - src/config/seo-pages.ts (SEO content references pricing and product name)
 * - src/app/for/[audience]/page.tsx (audience landing pages)
 * - src/app/best/[slug]/page.tsx (listicle SEO pages)
 * - src/components/SeoInternalLinks.tsx (internal link grid)
 */

export interface ProductPricingTier {
  readonly price: number;
  readonly limit: number | string;
  readonly period: "day" | "month";
}

export interface ProductConfiguration {
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly falModelIdentifier: string;
  readonly inputType: "image" | "text" | "both";
  readonly pricing: {
    readonly free: ProductPricingTier;
    readonly basic: ProductPricingTier;
    readonly pro: ProductPricingTier;
  };
}

/**
 * PRODUCT_CONFIG — PhotoForge AI product photo generator.
 *
 * Pricing mirrors the Stripe product "AI Product Photo Pro" at $11.99/mo.
 * The "basic" tier is set equal to pro here because the live product only
 * has two tiers (free + pro). SEO pages that reference basic.price will
 * show the pro price, which is correct for "starting at $X" copy.
 */
export const PRODUCT_CONFIG: ProductConfiguration = {
  name: "PhotoForge AI",
  tagline: "Professional product photos in seconds with AI",
  description:
    "Transform ordinary product images into stunning studio-quality photos with AI. Remove backgrounds, add professional lighting, and place products in beautiful scenes — no photographer needed.",
  falModelIdentifier: "fal-ai/flux/dev",
  inputType: "both",
  pricing: {
    free: { price: 0, limit: 3, period: "day" },
    basic: { price: 11.99, limit: "unlimited", period: "month" },
    pro: { price: 11.99, limit: "unlimited", period: "month" },
  },
};

/**
 * next.config.ts — Next.js configuration for AI Product Photo Generator
 *
 * REMOTE IMAGE PATTERNS:
 * fal.ai returns CDN-hosted image URLs on fal.media. We allow this
 * domain so Next.js <Image> component can serve those images.
 * This is the same pattern used across all our fal.ai-powered clones
 * (ai-image-upscaler, ai-background-remover, etc.).
 *
 * If we ever add an <Image> component that references fal.media URLs,
 * this allowance prevents the "Invalid src" error Next.js would throw.
 * The landing page currently uses regular <img> tags for the result,
 * so this is proactive but harmless — avoids the gotcha on future
 * iteration when someone upgrades to <Image>.
 *
 * NEXT-INTL PLUGIN (added 2026-03-24, pane1774 T13):
 * createNextIntlPlugin wraps the existing config to enable:
 *   - Alias resolution for next-intl/server imports (getTranslations, etc.)
 *   - Compile-time optimizations for message bundles
 *   - Proper RSC (React Server Component) support for locale hooks
 * The plugin path points to our request config at src/i18n/request.ts.
 */
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

// Wrap with next-intl plugin, pointing to our server request config.
// This enables next-intl's server-side APIs (getTranslations, getMessages)
// to work correctly in App Router server components.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fal.media",
      },
      {
        protocol: "https",
        hostname: "fal.media",
      },
    ],
  },
};

export default withNextIntl(nextConfig);

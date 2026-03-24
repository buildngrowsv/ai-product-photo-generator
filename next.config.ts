import type { NextConfig } from "next";

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
 */
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

export default nextConfig;

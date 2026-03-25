/**
 * next.config.ts — Next.js configuration for AI Product Photo Generator
 *
 * REMOTE IMAGE PATTERNS:
 * fal.ai returns CDN-hosted image URLs on fal.media. We allow this
 * domain so Next.js <Image> component can serve those images.
 * This is the same pattern used across all our fal.ai-powered clones
 * (ai-image-upscaler, ai-background-remover, etc.).
 *
 * NEXT-INTL PLUGIN (added 2026-03-24, pane1774 T13):
 * createNextIntlPlugin wraps the existing config to inject the next-intl/config
 * webpack alias. However, Next.js 16 moved turbopack config from
 * `experimental.turbo` to top-level `turbopack`, and next-intl 3.x still writes
 * to the old experimental.turbo key (ignored in Next 16).
 *
 * FIX: We manually set `turbopack.resolveAlias["next-intl/config"]` to point
 * to our src/i18n/request.ts file. This is the same alias the plugin would set
 * via experimental.turbo, but using the correct Next.js 16 key. Without this,
 * the server chunk throws "Couldn't find next-intl config file" at prerender.
 *
 * Reference: https://nextjs.org/docs/app/api-reference/turbopack#resolvealias
 * Background: next-intl issue https://github.com/amannn/next-intl/issues/1350
 * (experimental.turbo deprecated in Next 16, replaced by turbopack at root)
 */
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

// The plugin handles webpack alias (for non-turbopack builds) and would handle
// turbopack if it used the correct Next 16 key. We keep it for webpack compat.
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
  /**
   * Turbopack resolveAlias for next-intl/config.
   *
   * next-intl uses a virtual module "next-intl/config" as the bridge between
   * the plugin (which knows the request.ts path at config time) and the
   * server runtime (which needs to call getRequestConfig). Without this alias,
   * the server chunk imports an empty stub and throws "Couldn't find config".
   *
   * In Next.js ≤15: set via experimental.turbo.resolveAlias (done by plugin)
   * In Next.js 16+: must be set at top-level turbopack.resolveAlias
   */
  turbopack: {
    resolveAlias: {
      // Relative path required — Turbopack in Next.js 16 does not support
      // absolute paths in resolveAlias yet ("server relative imports not
      // implemented"). The path is relative to the project root (cwd).
      "next-intl/config": "./src/i18n/request.ts",
    },
  },
};

export default withNextIntl(nextConfig);

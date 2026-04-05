/**
 * vitest.config.ts — Test runner configuration for PhotoForge AI (ai-product-photo-generator)
 *
 * WHY VITEST (not Jest):
 * Next.js 15+ projects that use ESM and the App Router work much more cleanly
 * with Vitest than Jest. Vitest uses Vite's transform pipeline under the hood,
 * which handles TypeScript, JSX, and path aliases without complex Babel configs.
 *
 * NOTE on @vitejs/plugin-react:
 * We intentionally omit the React plugin here because:
 * 1. Our tests only cover API routes (TypeScript, no JSX)
 * 2. @vitejs/plugin-react@6 requires vite@7 but vitest@3 bundles vite@5,
 *    causing an ERR_PACKAGE_PATH_NOT_EXPORTED conflict.
 * If we ever test React components, add @vitejs/plugin-react at a compatible
 * version and re-enable the plugin below.
 *
 * EXCLUDE:
 * - e2e/** — Playwright tests; run via `npx playwright test`, not vitest
 *
 * HOW TO RUN:
 *   npm test           -- run all tests once
 *   npm test -- --watch -- watch mode during development
 */
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    // Exclude Playwright e2e tests — they require a running server and use @playwright/test API
    exclude: ["**/node_modules/**", "**/dist/**", "e2e/**", "tests/e2e/**", "tests/smoke/**", "docs/demo/**/*.spec.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

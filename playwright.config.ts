/**
 * playwright.config.ts — repo-local Playwright config for PhotoForge AI
 *
 * testDir is ./e2e at the repository root (not fleet-e2e-tests).
 *
 * Local runs start next dev on port 7638 (swarm-safe, non-default).
 * Live runs: set E2E_BASE_URL (preferred) or PLAYWRIGHT_BASE_URL to a full origin
 * e.g. https://aiproductphotomaker.com — webServer is skipped so we hit the real deployment.
 */
import { defineConfig, devices } from "@playwright/test";

const LOCAL_DEV_PORT = 7638;

const liveBaseRaw =
  process.env.E2E_BASE_URL?.trim() || process.env.PLAYWRIGHT_BASE_URL?.trim() || "";

const resolvedBaseURL = liveBaseRaw
  ? liveBaseRaw.startsWith("http")
    ? liveBaseRaw
    : `https://${liveBaseRaw}`
  : `http://127.0.0.1:${LOCAL_DEV_PORT}`;

const shouldStartLocalWebServer = !liveBaseRaw;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  /* Fewer workers avoids hammering a cold Next dev server and reduces flaky API races. */
  workers: process.env.CI ? 2 : 3,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "list" : "html",
  timeout: 30_000,
  use: {
    baseURL: resolvedBaseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  ...(shouldStartLocalWebServer
    ? {
        webServer: {
          command: `npx next dev -p ${LOCAL_DEV_PORT}`,
          port: LOCAL_DEV_PORT,
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
        },
      }
    : {}),
});

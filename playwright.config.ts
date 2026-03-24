/**
 * playwright.config.ts — E2E test config for PhotoForge AI
 * Port 4391 — random to avoid swarm conflicts.
 */
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  timeout: 30000,
  use: {
    baseURL: "http://localhost:4391",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npx next dev -p 4391",
    port: 4391,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});

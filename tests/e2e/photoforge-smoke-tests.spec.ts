/**
 * photoforge-smoke-tests.spec.ts — E2E tests for PhotoForge AI
 *
 * Follows shipping-velocity-and-quality-gates.md rule: every revenue product
 * needs Playwright tests before shipping. Tests homepage, upload flow, pricing,
 * FAQ, and API route availability.
 */

import { test, expect } from "@playwright/test";

test.describe("PhotoForge AI — Homepage", () => {
  test("homepage loads with correct title and branding", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/PhotoForge|Product Photo/i);

    const branding = page.getByText(/PhotoForge AI/i).first();
    await expect(branding).toBeVisible({ timeout: 10000 });
  });

  test("hero shows upload dropzone", async ({ page }) => {
    await page.goto("/");
    const uploadText = page.getByText(/Drop your product photo/i).first();
    await expect(uploadText).toBeVisible({ timeout: 10000 });
  });

  test("social proof counter is visible", async ({ page }) => {
    await page.goto("/");
    const counter = page.getByText(/product photos generated/i).first();
    await expect(counter).toBeVisible({ timeout: 10000 });
  });
});

test.describe("PhotoForge AI — Pricing", () => {
  test("pricing section shows Free and Pro tiers", async ({ page }) => {
    await page.goto("/");
    await page.goto("/#pricing");

    const freeText = page.getByText(/\$0/).first();
    const proText = page.getByText(/\$9\.90/).first();

    await expect(freeText).toBeVisible({ timeout: 10000 });
    await expect(proText).toBeVisible({ timeout: 10000 });
  });

  test("pricing shows feature lists", async ({ page }) => {
    await page.goto("/");
    const unlimitedFeature = page.getByText(/Unlimited product photos/i).first();
    await expect(unlimitedFeature).toBeVisible({ timeout: 10000 });
  });
});

test.describe("PhotoForge AI — FAQ", () => {
  test("FAQ section renders with questions", async ({ page }) => {
    await page.goto("/");
    const faqQuestion = page.getByText(/What is an AI product photo generator/i).first();
    await expect(faqQuestion).toBeVisible({ timeout: 10000 });
  });
});

test.describe("PhotoForge AI — API Route", () => {
  test("generate API returns 503 when FAL_KEY not set", async ({ request }) => {
    const response = await request.post("/api/generate", {
      data: {
        imageBase64: "data:image/png;base64,iVBORw0KGgo=",
        stylePrompt: "Product on white background",
      },
    });
    /**
     * Without FAL_KEY env var, the API should return 503 (service not configured).
     * This confirms the route exists and handles missing config gracefully.
     */
    expect(response.status()).toBe(503);
    const body = await response.json();
    expect(body.error).toBe("Service not configured");
  });

  test("generate API rejects missing image", async ({ request }) => {
    const response = await request.post("/api/generate", {
      data: { stylePrompt: "White background" },
    });
    expect(response.status()).toBe(400);
  });

  test("generate API rejects missing style", async ({ request }) => {
    const response = await request.post("/api/generate", {
      data: { imageBase64: "data:image/png;base64,abc123" },
    });
    expect(response.status()).toBe(400);
  });
});

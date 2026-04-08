/**
 * 02-extended.spec.ts — marketing and legal surfaces beyond the home tool
 *
 * Covers /pricing (monetization copy), static policy pages, and a minimal ES locale
 * check so next-intl routing stays exercised in CI.
 */
import { expect, test } from "@playwright/test";
import { readFalConfiguredFromRuntimeStatusApi } from "./helpers/readFalConfiguredFromRuntimeStatusApi";

test.describe("PhotoForge — pricing and extended pages", () => {
  test("pricing page shows tiers and checkout messaging aligned with runtime", async ({
    page,
    request,
  }) => {
    const falConfigured = await readFalConfiguredFromRuntimeStatusApi(request);
    const navResponse = await page.goto("/pricing");
    expect(navResponse?.status()).toBe(200);

    await expect(page.getByText(/^Free$/i)).toBeVisible();
    await expect(page.getByText(/^Pro$/i)).toBeVisible();
    await expect(page.getByText(/\$11\.99/i)).toBeVisible();

    const upgradeButton = page.getByRole("button", {
      name: falConfigured
        ? /Upgrade to Pro/i
        : /Checkout Paused Until Generation Is Live/i,
    });

    if (falConfigured) {
      await expect(upgradeButton).toBeEnabled();
      await expect(page.getByText(/Secure checkout via Stripe/i)).toBeVisible();
    } else {
      await expect(page.getByText(/Purchases Paused/i)).toBeVisible();
      await expect(
        page.getByText(/Checkout is intentionally disabled until the core product is live/i)
      ).toBeVisible();
      await expect(upgradeButton).toBeDisabled();
    }
  });

  test("privacy and terms pages render policy headings", async ({ page }) => {
    const privacy = await page.goto("/privacy");
    if (privacy?.status() === 404) {
      test.skip(true, "/privacy not deployed on this baseURL yet (404) — deploy [locale] legal routes");
      return;
    }
    expect(privacy?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: /privacy/i })).toBeVisible();

    const terms = await page.goto("/terms");
    if (terms?.status() === 404) {
      test.skip(true, "/terms not deployed on this baseURL yet (404)");
      return;
    }
    expect(terms?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: /terms/i })).toBeVisible();
  });

  test("refunds page explains Stripe-backed refunds", async ({ page }) => {
    const response = await page.goto("/refunds");
    if (response?.status() === 404) {
      test.skip(true, "/refunds not deployed on this baseURL yet (404)");
      return;
    }
    // Avoid /refund/i on role=heading — it matches "When Refunds May Be Considered" too (strict mode).
    await expect(page.getByRole("heading", { level: 1, name: "Refund Policy" })).toBeVisible();
    await expect(page.getByText(/Stripe receipt email/i)).toBeVisible();
  });

  test("Spanish locale pricing route responds", async ({ page }) => {
    const response = await page.goto("/es/pricing");
    expect(response?.status()).toBe(200);
    await expect(page.getByText(/\$11\.99/i)).toBeVisible();
  });

  test("guide route serves the AI product photography article", async ({ page }) => {
    const response = await page.goto("/guide/ai-product-photography");
    expect(response?.status()).toBe(200);

    await expect(
      page.getByRole("heading", {
        name: /How to Create Professional Product Photos with AI in 2026/i,
      })
    ).toBeVisible();
    await expect(page.getByText(/AI product photography vs hiring a photographer/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Try PhotoForge AI/i })).toBeVisible();
  });

  test("SEO landing pages for Shopify, Amazon, and alternatives respond", async ({ page }) => {
    for (const [route, heading] of [
      ["/shopify-product-photos", /AI Product Photography for Shopify Stores/i],
      ["/amazon-product-photos", /Amazon Product Photo Generator/i],
      ["/photoroom-alternative", /Photoroom Alternative/i],
    ] as const) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    }
  });
});

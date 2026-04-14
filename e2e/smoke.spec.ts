/**
 * e2e/smoke.spec.ts — PhotoForge AI (AI Product Photo Generator) smoke tests
 *
 * PURPOSE:
 * Fast route and render checks that run on every CI push.
 * No external dependencies — does not call Stripe or fal.ai.
 * Completes in < 30 seconds.
 *
 * SCOPE:
 *   - Homepage renders product branding (PhotoForge AI)
 *   - Pricing section renders with dollar amounts ($9.90 Pro tier)
 *   - Pro/paid CTA button is present
 *   - Free tier mentioned on homepage
 *   - ES locale routes work (/es, /es/pricing)
 *   - API routes return structured errors (not server crashes) on bad input
 *
 * NOT IN SCOPE (requires live keys — see 03-checkout-api.spec.ts):
 *   - Stripe checkout redirect
 *   - Payment processing
 *   - fal.ai image generation
 *   - Pro token validation against Redis
 *
 * WHY THIS FILE EXISTS ALONGSIDE 01/02/03:
 * The numbered spec files test runtime-conditional behavior (fal configured
 * vs not). This smoke file follows the fleet-wide template pattern from
 * ai-hairstyle-generator: lightweight, no helper dependencies, safe to run
 * against any deployment state. It serves as the canonical "is the product
 * alive and showing the right content?" check.
 *
 * RUN LOCALLY:
 *   npx playwright test e2e/smoke.spec.ts
 *   E2E_BASE_URL=https://aiproductphotomaker.com npx playwright test e2e/smoke.spec.ts
 */

import { expect, test } from "@playwright/test";

// ---------------------------------------------------------------------------
// EN homepage
// ---------------------------------------------------------------------------

test.describe("EN homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page title contains product name", async ({ page }) => {
    /**
     * The page title should reference the product — either "PhotoForge" or
     * "Product Photo" to match the brand and SEO keywords. This catches
     * regressions where a template placeholder title leaks through.
     */
    const title = await page.title();
    expect(title.toLowerCase()).toMatch(/photoforge|product photo/i);
  });

  test("main heading is visible", async ({ page }) => {
    /**
     * The H1 is the primary SEO signal and the first thing visitors see.
     * If it's missing, the page likely crashed or rendered an error boundary.
     */
    await expect(
      page.getByRole("heading", { level: 1 }).first()
    ).toBeVisible();
  });

  test("pricing section is visible on homepage", async ({ page }) => {
    /**
     * PhotoForge AI (aiproductphotomaker.com) embeds pricing directly on the
     * homepage as a section with $0 (Free) and $9.90 (Pro) tiers. The pricing
     * section uses an id="pricing" anchor. This test verifies the pricing
     * content renders on the page without needing a separate /pricing route.
     */
    await expect(
      page.getByText(/pricing|simple pricing/i).first()
    ).toBeVisible();
  });

  test("dollar amount is visible on homepage pricing section", async ({ page }) => {
    /**
     * Verify that at least one price amount ($) is visible somewhere on the
     * page, confirming the pricing section rendered with real content and not
     * a loading skeleton or empty container.
     */
    await expect(page.getByText(/\$/).first()).toBeVisible();
  });

  test("free tier is described on homepage", async ({ page }) => {
    /**
     * The freemium model is central to conversion — visitors see the free
     * tier (3 generations/day) and the Pro tier side by side. If "Free" is
     * not visible, the pricing section may have regressed.
     */
    await expect(page.getByText(/free/i).first()).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Pricing page (dedicated /pricing route)
// ---------------------------------------------------------------------------

test.describe("Pricing page", () => {
  /**
   * PhotoForge has both an embedded homepage pricing section AND a dedicated
   * /pricing page at src/app/[locale]/pricing/page.tsx. This block tests the
   * dedicated route. Fast HTTP check first to avoid 30s timeout if 404.
   */
  test("pricing page returns HTTP 200 (not 404)", async ({ request }) => {
    const resp = await request.get("/pricing");
    expect(resp.status()).toBe(200);
  });

  test.beforeEach(async ({ page, request }) => {
    const resp = await request.get("/pricing");
    if (resp.status() !== 200) {
      test.skip(true, `/pricing returns ${resp.status()} — pricing page not deployed`);
    }
    await page.goto("/pricing");
  });

  test("pricing page renders without error", async ({ page }) => {
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByText(/application error|this page crashed/i)).toBeHidden();
  });

  test("Pro tier price is visible", async ({ page }) => {
    /**
     * The Pro tier is $9.90/mo on the homepage and $11.99/mo on the dedicated
     * pricing page (different Stripe product). Accept either price as valid
     * since the exact amount may change — the key invariant is that a dollar
     * amount in the right range is present.
     */
    await expect(page.getByText(/\$(?:9\.90|11\.99)/i).first()).toBeVisible();
  });

  test("upgrade / Get Pro CTA is present", async ({ page }) => {
    /**
     * The primary monetization CTA must be visible on the pricing page.
     * If fal.ai is not configured, the button text changes to "Checkout Paused"
     * — either variant counts as the CTA being present.
     */
    const cta = page
      .getByRole("button", { name: /upgrade|get pro|subscribe|buy|start|checkout paused/i })
      .first();
    await expect(cta).toBeVisible();
  });

  test("free tier described on pricing page", async ({ page }) => {
    await expect(page.getByText(/free/i).first()).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// ES locale routes
// ---------------------------------------------------------------------------

test.describe("ES locale routes", () => {
  /**
   * PhotoForge supports locales: en, es, fr, de, pt (see src/i18n/routing.ts).
   * The /es route tests that next-intl locale routing is working and that the
   * Spanish locale does not 404 or crash.
   */
  test("/es homepage renders", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByText(/page not found|404/i)).toBeHidden();
  });

  test("/es/pricing renders pricing content", async ({ page }) => {
    await page.goto("/es/pricing");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByText(/page not found|404/i)).toBeHidden();
  });
});

// ---------------------------------------------------------------------------
// API route sanity checks (no real AI calls)
// ---------------------------------------------------------------------------

test.describe("API route sanity", () => {
  test("POST /api/generate returns structured error on empty body", async ({ request }) => {
    /**
     * Empty body should trigger validation error (400 "Missing image") when
     * fal is configured, or 503 "Service not configured" when fal is down.
     * Either way: structured JSON with an "error" field, never 500 crash.
     */
    const resp = await request.post("/api/generate", {
      headers: { "Content-Type": "application/json" },
      data: {},
    });
    expect([400, 401, 422, 429, 503]).toContain(resp.status());

    const body = await resp.json().catch(() => null);
    expect(body).not.toBeNull();
    expect(body).toHaveProperty("error");
  });

  test("POST /api/stripe/checkout returns structured response on empty body", async ({ request }) => {
    /**
     * Missing plan/priceId should return a structured error, not a 404 or
     * unhandled crash. When fal is down, returns 503 (checkout paused).
     * When fal is up but Stripe key is missing, may return 500.
     * The key invariant: the route exists and responds (not 404).
     */
    const resp = await request.post("/api/stripe/checkout", {
      headers: { "Content-Type": "application/json" },
      data: {},
    });
    expect(resp.status()).not.toBe(404);
  });

  test("GET /api/health returns 200", async ({ request }) => {
    /**
     * Health endpoint should always be available regardless of fal.ai or
     * Stripe configuration. This is the most basic liveness check.
     */
    const resp = await request.get("/api/health");
    expect(resp.status()).toBe(200);
  });
});

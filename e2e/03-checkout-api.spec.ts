/**
 * 03-checkout-api.spec.ts — Stripe checkout API contract
 *
 * Canonical handler: POST /api/stripe/create-checkout (body: { plan: "pro" }).
 * Fleet alias: POST /api/stripe/checkout re-exports the same POST handler.
 *
 * When FAL_KEY is missing, checkout is fail-closed (503) before Stripe is called.
 * When FAL_KEY exists, outcome depends on STRIPE_SECRET_KEY and network — we only
 * assert strict shapes for the paused case; otherwise allow success or Stripe errors.
 */
import { expect, test } from "@playwright/test";
import { readFalConfiguredFromRuntimeStatusApi } from "./helpers/readFalConfiguredFromRuntimeStatusApi";

test.describe("PhotoForge — checkout API", () => {
  test.describe.configure({ mode: "serial" });

  test("runtime-status exposes falConfigured boolean", async ({ request }) => {
    const response = await request.get("/api/runtime-status");
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { falConfigured?: boolean };
    expect(typeof body.falConfigured).toBe("boolean");
  });

  test("generate route applies runtime guard before payload validation", async ({ request }) => {
    const falConfigured = await readFalConfiguredFromRuntimeStatusApi(request);
    const response = await request.post("/api/generate", {
      data: { stylePrompt: "White background" },
    });
    const body = (await response.json()) as { error?: string };

    if (falConfigured) {
      expect(response.status()).toBe(400);
      expect(body.error).toBe("Missing image");
    } else {
      expect(response.status()).toBe(503);
      expect(body.error).toBe("Service not configured");
    }
  });

  test("POST /api/stripe/create-checkout matches deployment capability", async ({ request }) => {
    const falConfigured = await readFalConfiguredFromRuntimeStatusApi(request);
    const response = await request.post("/api/stripe/create-checkout", {
      data: { plan: "pro" },
    });
    const body = (await response.json()) as { error?: string; url?: string };

    if (falConfigured) {
      expect([200, 500, 502]).toContain(response.status());
      if (response.status() === 200) {
        expect(body.url).toMatch(/^https:\/\/checkout\.stripe\.com\//);
      }
    } else {
      expect(response.status()).toBe(503);
      expect(body.error).toMatch(/Checkout is paused until the service is live/i);
    }
  });

  test("POST /api/stripe/checkout alias matches create-checkout", async ({ request }) => {
    const falConfigured = await readFalConfiguredFromRuntimeStatusApi(request);
    const response = await request.post("/api/stripe/checkout", {
      data: { plan: "pro" },
    });
    const body = (await response.json()) as { error?: string; url?: string };

    if (falConfigured) {
      expect([200, 500, 502]).toContain(response.status());
      if (response.status() === 200) {
        expect(body.url).toMatch(/^https:\/\/checkout\.stripe\.com\//);
      }
    } else {
      expect(response.status()).toBe(503);
      expect(body.error).toMatch(/Checkout is paused until the service is live/i);
    }
  });
});

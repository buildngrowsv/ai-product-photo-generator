/**
 * build-smoke.test.ts — Smoke tests verifying the app builds and key modules load
 *
 * PURPOSE:
 * These tests run fast (no fal.ai or network calls) and verify that:
 *   1. The Next.js config exports the correct shape
 *   2. The API route handler is exported properly
 *   3. The route follows the documented error-response contract
 *
 * IMPORTANT: The generate route checks FAL_KEY FIRST (returns 503 if missing),
 * THEN validates input (400 for bad input). This is by design — a misconfigured
 * server should surface a clear 503 immediately rather than validating input
 * against a route that can never succeed.
 *
 * WHY smoke tests at this level:
 * Per quality-gates-and-prevention.md: "Run `npx tsc --noEmit` before every commit."
 * Smoke tests catch module import errors, missing exports, and runtime crashes
 * from bad env var handling BEFORE they become Vercel deploy failures.
 *
 * WHAT IS NOT TESTED HERE (deliberately):
 * - Actual fal.ai calls (require FAL_KEY, cost money)
 * - Frontend React rendering (requires a running Next.js dev server)
 * - End-to-end flows (see e2e/ for Playwright tests)
 *
 * HOW TO RUN:
 *   npm test
 */

describe("Build smoke tests — ai-product-photo-generator", () => {
  it("should import next.config without throwing", async () => {
    // If the config has syntax errors or bad module imports, this throws.
    // This is the fastest check that the entire module dependency graph is intact.
    const config = await import("../../next.config");
    expect(config).toBeDefined();
    expect(typeof config.default).toBe("object");
  });

  it("should export POST handler from generate route (no crash on import)", async () => {
    // The generate route must not crash at import time when FAL_KEY is absent.
    // This mirrors the quality gate: build-time vs runtime env var handling.
    // If this throws, the route does NOT use the lazy init pattern — fix it.
    const route = await import("../app/api/generate/route");
    expect(typeof route.POST).toBe("function");
  });

  it("should return 503 when FAL_KEY is not configured", async () => {
    // FAL_KEY check is intentionally the FIRST guard in the route (step 1).
    // A misconfigured server returns 503 Service Unavailable immediately
    // rather than proceeding to validate input that can never be processed.
    // This makes misconfiguration obvious in monitoring (503 ≠ 400/500 noise).
    delete process.env.FAL_KEY;

    const { POST } = await import("../app/api/generate/route");

    const request = new Request("http://localhost/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: "data:image/png;base64,iVBORw0KGgo=",
        style: "white-background",
      }),
    });

    const response = await POST(request as any);
    // 503 = FAL_KEY not set (documented in route comments)
    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });

  it("should return 400 when FAL_KEY is present but request has missing fields", async () => {
    // With FAL_KEY set, input validation runs. Empty body → 400.
    process.env.FAL_KEY = "test-key-for-validation-test";

    const { POST } = await import("../app/api/generate/route");

    const request = new Request("http://localhost/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}), // no 'image' or 'style'
    });

    const response = await POST(request as any);
    // 400 = Bad Request — missing required fields
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("error");

    // Clean up so subsequent tests start clean
    delete process.env.FAL_KEY;
  });

  it("should import the SEO landing pages without throwing", async () => {
    const shopifyPage = await import("../app/[locale]/shopify-product-photos/page");
    const amazonPage = await import("../app/[locale]/amazon-product-photos/page");
    const photoroomPage = await import("../app/[locale]/photoroom-alternative/page");

    expect(typeof shopifyPage.default).toBe("function");
    expect(typeof amazonPage.default).toBe("function");
    expect(typeof photoroomPage.default).toBe("function");
  });
});

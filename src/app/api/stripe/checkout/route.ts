/**
 * POST /api/stripe/checkout — fleet-standard alias for /api/stripe/create-checkout
 *
 * WHY THIS EXISTS:
 * The fleet-wide T018 standard path for checkout is /api/stripe/checkout (POST).
 * This repo was originally wired to /api/stripe/create-checkout (Builder 9,
 * 2026-03-25). The fleet E2E test suite (fleet-e2e-tests/tests/user-journey.spec.ts)
 * and the automated revenue blocker check both hit /api/stripe/checkout.
 *
 * Without this alias, the site fails the journey test L4 with a 404, which the
 * test suite flags as a revenue-blocking gap. The fix is a thin re-export that
 * keeps the real business logic in create-checkout/route.ts (single source of
 * truth) and adds the /checkout alias for fleet compatibility.
 *
 * The ProductPhotoProCheckoutButton still calls /api/stripe/create-checkout
 * directly — no frontend change needed.
 *
 * Fleet test that surfaced this gap: Builder 7 L4 checkout layer test, commit
 * 4f698c2 (2026-03-27), fleet-e2e-tests/tests/user-journey.spec.ts.
 *
 * Accepts: POST { plan: "pro" } — same body the button sends.
 * Returns: { url: string } — Stripe hosted checkout URL.
 */

// Re-export the POST handler from the canonical create-checkout route.
// Next.js App Router supports re-exporting route handlers across route files.
export { POST } from "../create-checkout/route";

# PhotoForge AI

AI-powered product photo generator for ecommerce sellers. Upload a product image,
pick a scene, and generate marketplace-ready product photography with fal.ai.

## Publish Readiness

This repo includes:

- Landing page and pricing flow for free vs Pro conversion
- Stripe Checkout session creation plus webhook-based Pro token activation
- In-tree buyer-facing legal pages: `/privacy`, `/terms`, `/refunds`
- SEO routes: `robots.txt`, `sitemap.xml`, locale-aware metadata
- Upstash-backed Pro entitlement token storage and rate limiting
- Fail-closed storefront behavior when `FAL_KEY` is missing: uploads, generation, and checkout stay disabled instead of pretending the product is live

## Environment Variables

Copy `.env.example` to `.env.local` and provide real values:

- `FAL_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

## Local Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run build
npm test
npm run test:e2e
```

## Browser Test Matrix

This repo now has an explicit split between local fail-closed checks and remote
deployment checks so builders do not accidentally test the wrong environment.

- `npm run test:e2e`
  Runs the dev-safe public visitor flow against a local `next dev` server on
  port `4391`. This is the default command for local work before any deploy.
- `PLAYWRIGHT_BASE_URL=https://<dev-deployment-host> npm run test:e2e:dev`
  Runs the same anonymous visitor journey against the deployed dev site. Use
  this before promoting changes toward prod.
- `npm run test:e2e:prod`
  Runs the public visitor journey against `https://productphoto.symplyai.io`.

### What The Browser Suite Actually Verifies

- Homepage loads with hero, social proof, FAQ, and pricing surface
- Runtime status is honest: uploads and checkout are enabled only when
  `FAL_KEY` is configured on that deployment
- Pricing page renders the free/pro ladder and uses paused checkout messaging
  when the core generation backend is offline
- `/api/generate` and `/api/stripe/create-checkout` fail closed instead of
  pretending the product is available

### Dev vs Prod Expectations

- Dev site:
  Safe to run the anonymous visitor flow and confirm runtime honesty before a
  push to production. If `FAL_KEY` is absent, the correct result is a paused UI
  with `503` responses from generate/checkout routes.
- Prod site:
  Run only after the dev deployment is smooth. Production should either show the
  same paused state intentionally, or a live upload/checkout path if the fal.ai
  backend has been configured on that environment.

## External Deployment Dependencies

The following must be configured outside the repo before launch:

- Live Stripe product/price and webhook endpoint secrets
- Production fal.ai key
- Production Upstash Redis database
- Canonical production domain set in `NEXT_PUBLIC_APP_URL`

If `FAL_KEY` is missing on a deployment, the app now intentionally presents a paused state and blocks checkout until generation is actually available.

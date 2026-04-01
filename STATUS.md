# AI Product Photo Generator — STATUS

**Last updated:** 2026-03-27 (Builder 6, T105 browser coverage + journey docs)

## Current State

| Area | Status | Notes |
|------|--------|-------|
| Core feature | ⚠️ FAIL-CLOSED | fal.ai route bug is fixed, but storefront and checkout now stay paused until `FAL_KEY` is configured |
| API route | ✅ DONE | `@fal-ai/client` fal.subscribe() — hosted, server-side FAL_KEY |
| Build | ⚠️ CONDITIONAL | Code builds locally, but sandboxed local builds may still fail on external font fetches |
| Automated browser coverage | ✅ DONE | Local dev-safe Playwright suite now verifies homepage, pricing, runtime honesty, and fail-closed generate/checkout behavior |
| GitHub push | ✅ DONE | `main` branch at 4f8272d |
| Vercel deploy | ⚠️ LIVE FAIL-CLOSED | https://ai-product-photo-generator-eusjej2u1-buildngrowsvs-projects.vercel.app |
| Subdomain | ⚠️ LIVE FAIL-CLOSED | https://productphoto.symplyai.io (CNAME + Vercel alias + TLS cert issued) |
| FAL_KEY env | ⚠️ NEEDED | Must be set in Vercel dashboard before AI generation and checkout can be enabled in prod |

## Root Cause Fixed (2026-03-24)

**Bug:** API route used raw `fetch()` to `https://queue.fal.run/fal-ai/flux/dev/image-to-image`
(async queue endpoint) then immediately read `falResult.images[0].url`. Queue endpoint returns
`{request_id, response_url}` — never images. Result: 100% failure rate, always "No image generated."

**Fix:** Replaced with `@fal-ai/client` SDK `fal.subscribe()` which internally polls the queue
until inference completes and returns the actual model output.

## Honesty / Fail-Closed Fix (2026-03-27)

Buyer-facing surfaces now reflect the real deployment state when `FAL_KEY` is absent:

- landing page shows generation paused
- upload + generate controls are disabled
- pricing/checkout is paused instead of selling access to a dead core feature
- checkout API returns `503` until fal.ai is configured

## Files Changed

- `src/app/api/generate/route.ts` — complete rewrite, now uses fal.subscribe()
- `package.json` — added `@fal-ai/client: ^1.5.0`
- `next.config.ts` — added fal.media remote image patterns
- `vercel.json` — added `--legacy-peer-deps` install + 60s function timeout
- `tests/e2e/photoforge-smoke-tests.spec.ts` — replaced brittle assertions with dev-safe public visitor flow coverage
- `tests/playwright.local.config.ts` — local browser config with swarm-safe dev port
- `tests/playwright.remote.config.ts` — remote browser config for dev/prod deployment checks
- `README.md` — documented local/dev/prod browser test commands and expected paused-state behavior
- `STATUS.md` — recorded T105 test coverage changes and deployment test contract

## Deploy Instructions

```bash
# When Vercel limit resets (or GitHub push triggers auto-deploy):
vercel --yes --prod

# Required Vercel env var (set in dashboard):
FAL_KEY=<fal.ai API key from UserRoot/.secrets/fal-ai-key.txt>
```

## Architecture

- **Hosted model** — our FAL_KEY, no BYOK
- **Rate limiting** — 5 req/min per IP (in-memory, serverless)
- **Input validation** — 10MB image limit, 500-char prompt limit
- **fal.ai model** — `fal-ai/flux/dev/image-to-image`, strength 0.65

## Production URLs

- **Primary:** https://productphoto.symplyai.io
- **Vercel direct:** https://ai-product-photo-generator-eusjej2u1-buildngrowsvs-projects.vercel.app

## Test Commands

```bash
# Unit/build-adjacent coverage
npm test

# Local dev-safe browser coverage (spins up next dev on port 4391)
npm run test:e2e

# Deployed dev site browser coverage
PLAYWRIGHT_BASE_URL=https://<dev-deployment-host> npm run test:e2e:dev

# Canonical production browser coverage
npm run test:e2e:prod
```

## Dev/Prod Test Contract

The public visitor-flow suite is intentionally anonymous and deployment-safe:

1. It verifies homepage, pricing, and FAQ visibility.
2. It checks whether `FAL_KEY` is configured by calling `/api/runtime-status`.
3. If generation is paused, the expected behavior is disabled upload + checkout
   UI plus `503` responses from `/api/generate` and `/api/stripe/create-checkout`.
4. If generation is live, the suite expects upload and upgrade controls to be
   enabled and payload validation to return `400` for malformed generate calls.

## Blockers

1. **FAL_KEY** — must be set in Vercel dashboard before AI generation and checkout can be enabled (key at `UserRoot/.secrets/fal-ai-key.txt`)
   ```bash
   # Set via CLI:
   cat /Users/ak/UserRoot/.secrets/fal-ai-key.txt | vercel env add FAL_KEY production
   ```

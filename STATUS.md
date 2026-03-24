# AI Product Photo Generator — STATUS

**Last updated:** 2026-03-24 (Builder 6, commit 4f8272d)

## Current State

| Area | Status | Notes |
|------|--------|-------|
| Core feature | ✅ FIXED | fal.ai queue bug patched — was always returning "No image generated" |
| API route | ✅ DONE | `@fal-ai/client` fal.subscribe() — hosted, server-side FAL_KEY |
| Build | ✅ PASSING | `npm run build` clean |
| GitHub push | ✅ DONE | `main` branch at 4f8272d |
| Vercel deploy | 🚫 BLOCKED | Free-tier 100 deploys/day limit hit; auto-deploys on next push |
| FAL_KEY env | ⚠️ NEEDED | Must be set in Vercel dashboard before production works |

## Root Cause Fixed (2026-03-24)

**Bug:** API route used raw `fetch()` to `https://queue.fal.run/fal-ai/flux/dev/image-to-image`
(async queue endpoint) then immediately read `falResult.images[0].url`. Queue endpoint returns
`{request_id, response_url}` — never images. Result: 100% failure rate, always "No image generated."

**Fix:** Replaced with `@fal-ai/client` SDK `fal.subscribe()` which internally polls the queue
until inference completes and returns the actual model output.

## Files Changed

- `src/app/api/generate/route.ts` — complete rewrite, now uses fal.subscribe()
- `package.json` — added `@fal-ai/client: ^1.5.0`
- `next.config.ts` — added fal.media remote image patterns
- `vercel.json` — added `--legacy-peer-deps` install + 60s function timeout

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

## Blockers

1. **Vercel deploy limit** — resets in ~24h; next push to `main` auto-deploys via GitHub integration
2. **FAL_KEY** — must be set in Vercel dashboard (key available at `UserRoot/.secrets/fal-ai-key.txt`)

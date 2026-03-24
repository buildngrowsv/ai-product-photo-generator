# AI Product Photo Generator — STATUS

**Last updated:** 2026-03-24 (Builder 6, BCL DNS + alias session)

## Current State

| Area | Status | Notes |
|------|--------|-------|
| Core feature | ✅ FIXED | fal.ai queue bug patched — was always returning "No image generated" |
| API route | ✅ DONE | `@fal-ai/client` fal.subscribe() — hosted, server-side FAL_KEY |
| Build | ✅ PASSING | `npm run build` clean |
| GitHub push | ✅ DONE | `main` branch at 4f8272d |
| Vercel deploy | ✅ LIVE | https://ai-product-photo-generator-eusjej2u1-buildngrowsvs-projects.vercel.app |
| Subdomain | ✅ LIVE | https://productphoto.symplyai.io (CNAME + Vercel alias + TLS cert issued) |
| FAL_KEY env | ⚠️ NEEDED | Must be set in Vercel dashboard before AI generate works in prod |

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

## Production URLs

- **Primary:** https://productphoto.symplyai.io
- **Vercel direct:** https://ai-product-photo-generator-eusjej2u1-buildngrowsvs-projects.vercel.app

## Blockers

1. **FAL_KEY** — must be set in Vercel dashboard for AI generate to work (key at `UserRoot/.secrets/fal-ai-key.txt`)
   ```bash
   # Set via CLI:
   cat /Users/ak/UserRoot/.secrets/fal-ai-key.txt | vercel env add FAL_KEY production
   ```

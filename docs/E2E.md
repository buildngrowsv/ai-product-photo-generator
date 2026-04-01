# End-to-end tests (Playwright)

Repo-local Playwright lives at the project root: `playwright.config.ts` and `e2e/`.

## Layout

| Path | Purpose |
|------|---------|
| `e2e/01-core-tool.spec.ts` | Home page and core upload/checkout affordances |
| `e2e/02-extended.spec.ts` | `/pricing`, policy pages, `/es/pricing` |
| `e2e/03-checkout-api.spec.ts` | `/api/runtime-status`, `/api/generate`, `/api/stripe/create-checkout`, `/api/stripe/checkout` |
| `e2e/helpers/` | Shared request helpers (not test files) |

`testDir` is `e2e` (root-relative).

## Local run (default)

Starts `next dev` on port **7638** unless a server is already listening (`reuseExistingServer` when not in CI).

If Playwright reports the port is already in use and cannot start the web server, stop the other process, for example:

```bash
lsof -ti :7638 | xargs kill -9
```

```bash
npm run test:e2e
```

## Live run (production)

Point tests at the public site with **`E2E_BASE_URL`**. You may pass a host only (HTTPS is assumed) or a full origin:

```bash
npm run test:e2e:live
# equivalent to:
# E2E_BASE_URL=https://aiproductphotomaker.com npx playwright test
```

Override:

```bash
E2E_BASE_URL=https://your-preview.vercel.app npx playwright test
```

When `E2E_BASE_URL` or `PLAYWRIGHT_BASE_URL` is set, **no local web server** is started.

## Environment variables

| Variable | Role |
|----------|------|
| `E2E_BASE_URL` | Preferred base URL for remote runs (host or `https://...`) |
| `PLAYWRIGHT_BASE_URL` | Fallback if `E2E_BASE_URL` is unset (same behavior) |
| `CI` | Enables retries and list reporter |

## Reports

HTML report is emitted after a local run (non-CI). Open `playwright-report/index.html` after failures.

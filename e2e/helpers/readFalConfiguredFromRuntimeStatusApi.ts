/**
 * readFalConfiguredFromRuntimeStatusApi — shared E2E helper
 *
 * Calls GET /api/runtime-status (same origin as Playwright baseURL) so specs can
 * branch on whether FAL_KEY is present on the target deployment. Local dev often
 * has no key (fail-closed UI); production may be fully wired.
 */
import { expect, type APIRequestContext } from "@playwright/test";

interface RuntimeStatusBody {
  falConfigured?: boolean;
}

export async function readFalConfiguredFromRuntimeStatusApi(
  request: APIRequestContext
): Promise<boolean> {
  const response = await request.get("/api/runtime-status");
  expect(response.status()).toBe(200);
  const body = (await response.json()) as RuntimeStatusBody;
  return Boolean(body.falConfigured);
}

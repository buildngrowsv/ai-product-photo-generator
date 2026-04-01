/**
 * 01-core-tool.spec.ts — homepage first; core interactive tool surfaces
 *
 * Ordering: this file is numbered so `playwright test` runs home/tool checks
 * before extended routes (see 02-extended.spec.ts). Product story: visitor lands,
 * sees the hero tool (upload / generation affordances) and trust copy.
 */
import { expect, test } from "@playwright/test";
import { readFalConfiguredFromRuntimeStatusApi } from "./helpers/readFalConfiguredFromRuntimeStatusApi";

test.describe("PhotoForge — home and core tool", () => {
  test("homepage loads and surfaces the primary product photo tool", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/PhotoForge|Product Photo/i);
    await expect(page.getByText(/AI Product Photos/i)).toBeVisible();
    await expect(page.getByText(/12,000\+ product photos generated/i)).toBeVisible();
    await expect(page.locator("#pricing")).toBeVisible();
    await expect(page.getByText(/What is an AI product photo generator\?/i)).toBeVisible();
  });

  test("upload and checkout controls reflect whether generation is live", async ({
    page,
    request,
  }) => {
    const falConfigured = await readFalConfiguredFromRuntimeStatusApi(request);
    await page.goto("/");

    if (falConfigured) {
      await expect(page.getByText(/Drop your product photo here/i)).toBeVisible();
      await expect(page.getByRole("button", { name: /Upload Product Photo/i })).toBeEnabled();
      await expect(page.getByRole("button", { name: /Upgrade to Pro/i }).last()).toBeEnabled();
    } else {
      await expect(page.getByText(/Generation Paused/i)).toBeVisible();
      await expect(
        page.getByText(/uploads, generation, and paid checkout are intentionally disabled/i)
      ).toBeVisible();
      await expect(page.getByText(/Image generation is currently unavailable/i)).toBeVisible();
      await expect(page.getByRole("button", { name: /Uploads Paused/i })).toBeDisabled();
      await expect(
        page.getByRole("button", { name: /Checkout Paused Until Generation Is Live/i })
      ).toBeDisabled();
    }
  });
});

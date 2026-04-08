/**
 * request.ts — next-intl server-side request configuration
 *
 * PURPOSE: Tells next-intl how to resolve locale and messages per request.
 * Called once per server render. Returns the active locale + loaded messages.
 *
 * LOCALE RESOLUTION:
 * 1. requestLocale is injected by next-intl middleware (from URL path or cookie).
 * 2. If missing or not in our supported list, fall back to defaultLocale ("en").
 * 3. Dynamic JSON import — only loads the messages file for the active locale,
 *    keeping the bundle small.
 *
 * WHY DYNAMIC IMPORT:
 * Static imports would bundle ALL locale files into every page.
 * Dynamic `import(../messages/${locale}.json)` loads lazily per request.
 *
 * Added 2026-03-24 as part of i18n rollout (pane1774 T13).
 */
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the locale from the request (may be a Promise in Next.js 15+)
  let locale = await requestLocale;

  // Guard: if the URL doesn't include a valid locale segment (e.g. direct
  // API hits, bots), fall back to the default to avoid runtime errors.
  if (!locale || !routing.locales.includes(locale as "en" | "es" | "fr" | "de" | "pt")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

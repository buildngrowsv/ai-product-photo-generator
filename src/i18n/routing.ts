/**
 * routing.ts — next-intl locale routing configuration
 *
 * LOCALES: English (default) and Spanish.
 * localePrefix "as-needed" means:
 *   - /en routes serve WITHOUT the /en prefix (just /)
 *   - /es routes serve WITH the /es prefix (/es/...)
 * This keeps the EN URL clean for SEO while still exposing ES.
 *
 * Added 2026-03-24 as part of i18n rollout across clone apps
 * (pane1774 T13 — next-intl EN+ES locale routing).
 */
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

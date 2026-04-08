/**
 * routing.ts — next-intl locale routing configuration
 *
 * LOCALES: English (default) + Spanish, French, German, Portuguese.
 * localePrefix "as-needed" means:
 *   - English routes serve WITHOUT the /en prefix (just /)
 *   - Other locales get their prefix: /es, /fr, /de, /pt
 * This keeps the EN URL clean for SEO while enabling hreflang for
 * all 5 major language markets (Europe + Latin America + Brazil).
 *
 * Added 2026-03-24 (pane1774 T13 — EN+ES).
 * Expanded 2026-04-08 to FR+DE+PT (T-MULTILINGUAL-TOP5, steel-prism-8463).
 */
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "fr", "de", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

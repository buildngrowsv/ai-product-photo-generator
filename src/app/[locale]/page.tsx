/**
 * [locale]/page.tsx — Locale segment page re-export
 *
 * PURPOSE: next-intl requires pages to live under the [locale] segment.
 * The actual page content lives in src/app/page.tsx (the original landing page).
 * This file re-exports it so the locale routing works without duplicating code.
 *
 * WHY RE-EXPORT INSTEAD OF MOVE:
 * The original page.tsx is the source of truth. Moving it would break git history
 * and make it harder to see what changed vs what was refactored. Re-exporting keeps
 * the original intact and makes the locale segment a thin shim.
 *
 * If the landing page ever needs locale-specific rendering (e.g. translated UI
 * strings via useTranslations), update src/app/page.tsx directly — the re-export
 * here will automatically pick up the change.
 *
 * Added 2026-03-24 as part of i18n rollout (pane1774 T13).
 */
export { default } from "../page";

/**
 * layout.tsx — Root pass-through layout for next-intl App Router integration
 *
 * PURPOSE: With next-intl's [locale] segment pattern, the actual HTML shell
 * lives in src/app/[locale]/layout.tsx. This root layout must exist (Next.js
 * requires it) but should be a minimal pass-through — it renders children
 * directly so the [locale] layout can own the <html> and <body> tags.
 *
 * WHY PASS-THROUGH:
 * If we kept the full HTML/body here AND in [locale]/layout.tsx, Next.js
 * would render nested <html> elements, which is invalid HTML and causes
 * hydration mismatches. The pass-through avoids that by delegating all
 * HTML structure to the locale-aware child layout.
 *
 * Original SEO metadata, Inter font, dark theme, and JSON-LD are all
 * preserved in src/app/[locale]/layout.tsx.
 *
 * Migrated 2026-03-24 as part of i18n rollout (pane1774 T13).
 */
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

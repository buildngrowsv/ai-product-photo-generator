/**
 * =============================================================================
 * PhotoForge AI — Root Layout
 * =============================================================================
 *
 * PURPOSE:
 * Provides the HTML shell (<html>, <body>) for ALL pages, including both
 * locale-routed pages (under [locale]/) and non-locale pSEO pages
 * (/for/, /vs/, /use-cases/, /best/).
 *
 * WHY THIS STRUCTURE:
 * When next-intl was added (pane1774 T13, 2026-03-24), the <html>/<body>
 * tags were moved into [locale]/layout.tsx, leaving this root layout as a
 * bare fragment. That broke all pSEO pages outside [locale] because they
 * had no HTML shell — causing 404s on /for/*, /vs/*, etc.
 *
 * FIX (2026-04-14, Custom 2 / prism-exec-6847):
 * Root layout now owns <html> and <body>. The [locale] layout is a nested
 * wrapper that adds locale providers and JSON-LD without duplicating the
 * document structure. pSEO pages inherit this root layout and render
 * correctly. Same pattern as mangaartai fix (Builder 3, commit 3b5583a).
 * =============================================================================
 */
import type { ReactNode } from "react";
import type { Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#7c3aed" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Search Console verification — aiproductphotomaker.com (buildngrowsv@gmail.com) */}
        <meta
          name="google-site-verification"
          content="EvH1LfFf_PO3s16leLnD-OJjSDYeGdXpvZlk_xT5ht8"
        />
      </head>
      <body className="font-sans antialiased bg-gray-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}

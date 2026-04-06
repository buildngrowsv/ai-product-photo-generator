/**
 * src/app/vs/layout.tsx — HTML shell for /vs/ comparison pages
 *
 * WHY THIS EXISTS:
 * The /vs/ route sits outside [locale], so it does not inherit the HTML shell
 * from src/app/[locale]/layout.tsx. This layout provides the minimal <html>
 * and <body> tags plus Tailwind CSS import needed for the comparison pages
 * to render properly.
 *
 * Created 2026-04-06 — SEO comparison page initiative.
 */
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "PhotoForge AI — Product Photo Generator Comparisons",
  description: "Compare PhotoForge AI with popular AI product photography tools.",
};

export default function VsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}

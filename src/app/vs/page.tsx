/**
 * src/app/vs/page.tsx — PhotoForge AI comparison index page
 *
 * WHY THIS PAGE EXISTS:
 * Hub for all /vs/ competitor comparison pages. Strengthens internal linking
 * for SEO and provides a clean landing for users searching "AI product photo
 * comparison" or "photoroom alternative" who want to browse options.
 *
 * MIDDLEWARE NOTE:
 * /vs/ is excluded from next-intl middleware — see middleware.ts matcher.
 *
 * Created 2026-04-06 — SEO comparison page initiative.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PhotoForge AI vs Competitors — Product Photo Generator Comparisons",
  description:
    "See how PhotoForge AI compares to Photoroom, Pebblely, and other popular AI product photography tools. Honest feature, pricing, and quality comparisons.",
  alternates: {
    canonical: "https://aiproductphotomaker.com/vs",
  },
};

/**
 * COMPARISONS — Each entry maps to a child /vs/<slug> page.
 * Photoroom is the category leader for AI product photography with 100M+ downloads.
 * Pebblely is a focused competitor targeting e-commerce sellers specifically.
 */
const COMPARISONS = [
  {
    slug: "photoroom",
    name: "Photoroom",
    tagline: "Browser-based AI tool vs the mobile-first app giant",
    highlights: [
      "3 free product photos",
      "No app download required",
      "$9.90/mo vs $12.99/mo",
    ],
  },
  {
    slug: "pebblely",
    name: "Pebblely",
    tagline: "Affordable AI backgrounds vs premium e-commerce photography",
    highlights: [
      "Multiple background styles",
      "Instant browser processing",
      "Free tier, no credit card",
    ],
  },
];

export default function VsIndexPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* ── Navigation ── */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📸</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              PhotoForge AI
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          How{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            PhotoForge AI
          </span>{" "}
          Compares
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Honest, side-by-side comparisons with popular AI product photography tools and services.
        </p>
      </section>

      {/* ── Comparison cards ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {COMPARISONS.map((comp) => (
            <Link
              key={comp.slug}
              href={`/vs/${comp.slug}`}
              className="group rounded-2xl border border-gray-800 bg-gray-900/50 p-8 hover:border-blue-500/50 transition-colors"
            >
              <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                PhotoForge AI vs {comp.name}
              </h2>
              <p className="mt-2 text-gray-400">{comp.tagline}</p>
              <ul className="mt-4 space-y-1">
                {comp.highlights.map((h) => (
                  <li key={h} className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="text-blue-400">&#10003;</span> {h}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-block text-sm font-semibold text-blue-400 group-hover:underline">
                Read full comparison &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} PhotoForge AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <a href="https://symplyai.io" target="_blank" rel="noopener" className="hover:text-gray-300 transition-colors">
              Powered by SymplyAI
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

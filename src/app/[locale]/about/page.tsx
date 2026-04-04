/**
 * [locale]/about/page.tsx — About page for PhotoForge AI (AI Product Photo Generator).
 *
 * Locale-routed so next-intl middleware can serve it at /about for the default
 * locale and /es/about for Spanish visitors. A root alias at app/about/page.tsx
 * re-exports this component for direct /about access.
 *
 * Uses the same gray-950 / indigo-300 palette as the privacy and terms pages
 * for visual consistency across all static/info pages.
 *
 * Includes: product description, SymplyAI attribution, contact email,
 * breadcrumb nav, and back-to-home link.
 *
 * Added 2026-04-03, Builder 3 pane1775.
 */
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | AI Product Photo Generator",
  description:
    "Learn about AI Product Photo Generator — transform basic product images into professional studio-quality photos with AI-generated backgrounds and lighting.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-950 px-4 py-16 text-gray-100">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Breadcrumb navigation */}
        <nav className="text-sm text-gray-400">
          <Link href="/" className="hover:text-indigo-300 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-100">About</span>
        </nav>

        {/* Header */}
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">
            About
          </p>
          <h1 className="text-4xl font-semibold">
            About AI Product Photo Generator
          </h1>
        </header>

        {/* Product description */}
        <section className="space-y-3">
          <h2 className="text-2xl font-medium">What we do</h2>
          <p className="text-gray-300">
            AI Product Photo Generator transforms basic product images into
            professional studio-quality photos with AI-generated backgrounds and
            lighting. Whether you sell on Etsy, Amazon, Shopify, or your own
            store, our tool helps you create polished product photography in
            seconds — no studio, no photographer, no expensive editing software
            required. Upload your product image, choose a scene or style, and
            get results that are ready for your listings.
          </p>
        </section>

        {/* Built by SymplyAI */}
        <section className="space-y-3">
          <h2 className="text-2xl font-medium">Built by SymplyAI</h2>
          <p className="text-gray-300">
            AI Product Photo Generator is part of the{" "}
            <a
              href="https://symplyai.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-300 underline underline-offset-4 hover:text-indigo-200 transition-colors"
            >
              SymplyAI
            </a>{" "}
            suite of AI-powered creative tools. SymplyAI builds accessible,
            browser-first AI products that help people create professional
            content without specialized skills or expensive software.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-3">
          <h2 className="text-2xl font-medium">Contact</h2>
          <p className="text-gray-300">
            Questions, feedback, or support requests? Reach us at{" "}
            <a
              href="mailto:support@symplyai.io"
              className="text-indigo-300 underline underline-offset-4 hover:text-indigo-200 transition-colors"
            >
              support@symplyai.io
            </a>
            .
          </p>
        </section>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-6 py-3 text-sm font-medium text-gray-100 shadow-sm transition-colors hover:bg-gray-800"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

/**
 * /use-cases — Hub page listing all PhotoForge AI use case pages.
 *
 * WHY THIS EXISTS:
 * Acts as the parent index for all /use-cases/[use-case] pages. Without this,
 * /use-cases returns 404 while /use-cases/product-listing-photos works. Google
 * and users expect the parent path to render a hub. Also consolidates
 * internal link equity and provides a single entry point for the "what can
 * you do with this?" content cluster.
 *
 * SEO TARGETS: "ai product photo use cases", "product photography examples",
 * "what can ai product photo generator do"
 *
 * Created 2026-04-14: T1776-E-C1 (pane1776 Custom 1) — fix pSEO 404s.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SEO_PAGES_CONFIG } from "@/config/seo-pages";

import { SeoCrossLinks } from "@/components/SeoCrossLinks";
import { SeoInternalLinks } from "@/components/SeoInternalLinks";
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://aiproductphotomaker.com";

export const metadata: Metadata = {
  title: "Use Cases — What You Can Do with PhotoForge AI",
  description:
    "Create product listing photos, lifestyle shots, social media content, catalog images, and more. See step-by-step how PhotoForge AI solves real product photography problems.",
  alternates: { canonical: `${SITE_URL}/use-cases` },
  openGraph: {
    title: "Use Cases — What You Can Do with PhotoForge AI",
    description:
      "Step-by-step guides for common product photography tasks: listings, lifestyle shots, social media, and more.",
    type: "website",
    url: `${SITE_URL}/use-cases`,
    siteName: "PhotoForge AI",
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Use Cases", item: `${SITE_URL}/use-cases` },
  ],
};

export default function UseCasesHubPage() {
  const useCases = SEO_PAGES_CONFIG.useCases;

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              PhotoForge AI
            </span>
          </Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          What Can You Do with{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            PhotoForge AI
          </span>
          ?
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          From product listing photos to lifestyle shots — see exactly how AI
          product photography solves real e-commerce problems, step by step.
        </p>
      </section>

      {/* Use case cards */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <Link
              key={useCase.slug}
              href={`/use-cases/${useCase.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-blue-500/50"
            >
              <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {useCase.name}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">
                {useCase.description.slice(0, 140)}...
              </p>
              <div className="mt-3 text-xs text-gray-500">
                {useCase.steps.length} steps
              </div>
              <span className="mt-3 text-sm font-semibold text-blue-400 group-hover:underline">
                See how &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
        <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-12">
          <h2 className="text-3xl font-bold">
            Try PhotoForge AI Free &mdash; 3 Product Photos Included
          </h2>
          <p className="mt-3 text-gray-400">
            Upload a product photo and get professional backgrounds in seconds.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-4 text-lg font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Create Product Photos Now
          </Link>
        </div>
      </section>

      {/* Footer */}
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
        
            {/* Cross-links and internal links for crawlability */}
            <SeoCrossLinks currentCategory="use-cases" currentSlug="" />
            <SeoInternalLinks />
</div>
      </footer>
    </main>
  );
}

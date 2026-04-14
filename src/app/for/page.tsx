/**
 * /for — Hub page listing all PhotoForge AI audience landing pages.
 *
 * WHY THIS EXISTS:
 * Acts as the parent index for all /for/[audience] pages. Without this,
 * /for returns 404 while /for/etsy-sellers works. Google and users
 * expect the parent path to render a hub. Also consolidates internal
 * link equity across audience pages and provides a single entry point
 * for the "who is this for?" content cluster.
 *
 * SEO TARGETS: "ai product photo generator for e-commerce",
 * "who uses ai product photography", "best product photo tool for sellers"
 *
 * Created 2026-04-14: T1776-E-C1 (pane1776 Custom 1) — fix pSEO 404s.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SEO_PAGES_CONFIG } from "@/config/seo-pages";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://aiproductphotomaker.com";

export const metadata: Metadata = {
  title: "Who Uses PhotoForge AI? — Product Photography for Every Seller",
  description:
    "Etsy sellers, Amazon merchants, Shopify store owners, and marketers use PhotoForge AI to create professional product photos. Find out how it fits your workflow.",
  alternates: { canonical: `${SITE_URL}/for` },
  openGraph: {
    title: "Who Uses PhotoForge AI? — Product Photography for Every Seller",
    description:
      "See how Etsy sellers, Amazon merchants, Shopify store owners, and marketers use PhotoForge AI.",
    type: "website",
    url: `${SITE_URL}/for`,
    siteName: "PhotoForge AI",
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "For", item: `${SITE_URL}/for` },
  ],
};

export default function ForHubPage() {
  const audiences = SEO_PAGES_CONFIG.audiences;

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
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            PhotoForge AI
          </span>{" "}
          for Every Seller
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Whether you sell on Etsy, Amazon, Shopify, or your own store —
          PhotoForge AI creates professional product photos in seconds. See how
          sellers in your niche use AI product photography.
        </p>
      </section>

      {/* Audience cards */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {audiences.map((audience) => (
            <Link
              key={audience.slug}
              href={`/for/${audience.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-blue-500/50"
            >
              <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                For {audience.name}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">
                {audience.howWeHelp.slice(0, 160)}...
              </p>
              <span className="mt-4 text-sm font-semibold text-blue-400 group-hover:underline">
                Learn more &rarr;
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
        </div>
      </footer>
    </main>
  );
}

/**
 * src/app/vs/mokker/page.tsx — PhotoForge AI vs Mokker AI comparison page
 *
 * SEO STRATEGY:
 * Targets "mokker alternative", "mokker ai alternative", "mokker vs",
 * "mokker pricing alternative", and "mokker ai review" queries. Mokker
 * (mokker.ai) is an AI product photo generator specializing in e-commerce
 * lifestyle backgrounds. Searchers are often sticker-shocked by Mokker's
 * $19/month entry price with a strict 50-image/month cap — no free tier to
 * even try before paying.
 *
 * COMPETITOR CONTEXT:
 * Mokker AI (mokker.ai) generates AI product photos with realistic scene
 * placement and shadow rendering. It is well-regarded for output quality,
 * but is the most expensive tool in the category: Standard at $19/month
 * (50 images), Pro at $49/month (200 images). There is no free tier — users
 * must pay to generate even a single test photo.
 * PhotoForge AI offers 3 free product photos with no watermarks, then
 * $11.99/month for unlimited generations — purpose-built for e-commerce
 * sellers who need more than a handful of images per month.
 *
 * STRUCTURED DATA:
 * FAQPage JSON-LD for rich snippet eligibility.
 * BreadcrumbList JSON-LD for SERP breadcrumb display.
 *
 * MIDDLEWARE NOTE:
 * /vs/ is excluded from next-intl middleware — see middleware.ts matcher.
 *
 * SEO comparison page initiative, 2026-04-15
 */

import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://aiproductphotomaker.com";
const PRODUCT_NAME = "PhotoForge AI";

// ---------------------------------------------------------------------------
// Metadata — targets "mokker alternative" and related queries
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: `${PRODUCT_NAME} vs Mokker AI (2026) — AI Product Photo Comparison`,
  description:
    "Compare PhotoForge AI with Mokker AI for AI product photography. Get 3 free product photos with no watermarks vs Mokker's $19/month entry with no free tier. See pricing, features, and quality side by side.",
  keywords: [
    "mokker alternative",
    "mokker ai alternative",
    "mokker vs",
    "mokker pricing alternative",
    "mokker ai review",
    "AI product photo generator",
    "best AI product photography 2026",
    "mokker competitor",
    "AI product background generator",
    "e-commerce product photo tool",
    "product photo AI no subscription",
  ],
  alternates: {
    canonical: `${SITE_URL}/vs/mokker`,
  },
  openGraph: {
    title: `${PRODUCT_NAME} vs Mokker AI — Which AI Product Photo Tool Is Better?`,
    description:
      "No free tier, 50-image cap, $19/month minimum — vs PhotoForge AI's 3 free photos and $11.99/month unlimited. Honest 2026 pricing and feature comparison.",
    url: `${SITE_URL}/vs/mokker`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

// ---------------------------------------------------------------------------
// FAQ data — addresses Mokker-specific pricing and workflow concerns
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "Is PhotoForge AI a good Mokker AI alternative?",
    answer:
      "Yes. PhotoForge AI is a strong Mokker alternative for e-commerce sellers who want AI-generated product photos without paying before you even try the tool. PhotoForge AI offers 3 free product photos with no watermarks, then $11.99/month for unlimited generations. Mokker has no free tier — you must subscribe at $19/month just to generate your first photo.",
  },
  {
    question: "How much does Mokker AI cost?",
    answer:
      "Mokker AI starts at $19/month for the Standard plan (50 images/month) and goes up to $49/month for the Pro plan (200 images/month). There is no free tier. PhotoForge AI offers 3 free product photos with no watermarks, then $11.99/month for unlimited AI-generated product backgrounds — more than 37% cheaper than Mokker's entry price and no image caps.",
  },
  {
    question: "Does Mokker AI have a free trial?",
    answer:
      "No. Mokker AI does not offer a free tier or a no-credit-card free trial. To generate even a single AI product photo, you must subscribe to at least the $19/month Standard plan. PhotoForge AI gives you 3 free product photos immediately — no account required, no credit card, no commitment — so you can evaluate the quality before paying anything.",
  },
  {
    question: "Does Mokker AI have an image limit?",
    answer:
      "Yes. Mokker's Standard plan caps you at 50 images per month. If you need more, the Pro plan ($49/month) allows 200 images per month. PhotoForge AI's Pro plan at $11.99/month has no image cap — generate as many product photos as you need without watching a counter or upgrading plans mid-month.",
  },
  {
    question: "What AI background styles does PhotoForge AI offer vs Mokker?",
    answer:
      "Both PhotoForge AI and Mokker use generative AI to place products into realistic lifestyle and studio backgrounds. Mokker is particularly well-regarded for shadow rendering and realistic scene placement. PhotoForge AI offers a variety of background styles including studio environments, lifestyle settings, and contextual scenes — all generated fresh from your specific product image. For most e-commerce use cases, PhotoForge AI's output quality is comparable at a fraction of the cost.",
  },
  {
    question: "Can I use PhotoForge AI for Amazon and Shopify listings?",
    answer:
      "Absolutely. PhotoForge AI generates high-resolution product photos with professional AI backgrounds perfect for Amazon, Shopify, Etsy, and other marketplaces. The AI creates contextual, studio-quality backgrounds that make products look professionally shot — no photography studio or props required. Your free photos are full-resolution with no watermarks, ready to use immediately on any listing.",
  },
  {
    question: "Which tool is better for large product catalogs?",
    answer:
      "PhotoForge AI. Mokker's Standard plan caps you at 50 images per month — not nearly enough for sellers with large catalogs refreshing their imagery seasonally. PhotoForge AI's $11.99/month plan has no per-image cap, so you can process your entire catalog in one go. Mokker's Pro plan ($49/month, 200 images) costs four times PhotoForge AI's price for still-limited batch volume.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD — FAQPage structured data for rich snippets
// ---------------------------------------------------------------------------
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

// ---------------------------------------------------------------------------
// Comparison table data
// ---------------------------------------------------------------------------
const COMPARISON_ROWS = [
  { feature: "Free Tier", ours: "3 product photos, no watermark", theirs: "No free tier" },
  { feature: "Pro Price (Monthly)", ours: "$11.99/month unlimited", theirs: "$19/month (50 images)" },
  { feature: "Higher Volume Plan", ours: "Unlimited included in $11.99", theirs: "$49/month (200 images)" },
  { feature: "Image Cap", ours: "No image cap", theirs: "50/month (Standard), 200/month (Pro)" },
  { feature: "Watermarks", ours: "No watermarks", theirs: "N/A — paid only" },
  { feature: "Credit Card Required to Try", ours: "No — 3 free photos first", theirs: "Yes — must subscribe to generate" },
  { feature: "AI Background Generation", ours: "Generative AI scenes (purpose-built)", theirs: "Generative AI with strong shadow rendering" },
  { feature: "Background Style Variety", ours: "Multiple generative styles per product", theirs: "Lifestyle and studio scenes" },
  { feature: "Platform", ours: "Browser-based, desktop-first", theirs: "Browser-based" },
  { feature: "Background Removal", ours: "Auto background removal on upload", theirs: "Auto background removal included" },
  { feature: "E-commerce Focus", ours: "Purpose-built for product photos", theirs: "Product photo focused" },
  { feature: "Output Resolution", ours: "High-resolution, no watermark on free", theirs: "High-resolution (paid only)" },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function VsMokkerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* BreadcrumbList JSON-LD — breadcrumb rich snippets in Google SERPs */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: process.env.NEXT_PUBLIC_APP_URL || "" },
          { name: "Alternatives", url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/vs` },
        ]}
      />

      <main className="min-h-screen bg-gray-950 text-gray-100">
        {/* ── Navigation ── */}
        <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">📸</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {PRODUCT_NAME}
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/vs" className="hover:text-white transition-colors">
                Comparisons
              </Link>
            </div>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {PRODUCT_NAME}
            </span>{" "}
            vs Mokker AI
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Mokker requires a $19/month subscription before you can generate a single photo.{" "}
            {PRODUCT_NAME} gives you 3 free product photos with no watermarks — try it before you
            buy, then go unlimited for $11.99/month.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 text-base font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Try {PRODUCT_NAME} Free
            </Link>
            <a
              href="#comparison"
              className="inline-flex items-center justify-center rounded-full border border-gray-700 px-8 py-3 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              See Full Comparison
            </a>
          </div>
        </section>

        {/* ── Key differentiator cards ── */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🆓",
                title: "Try Before You Pay",
                description:
                  "Mokker has no free tier whatsoever — you must hand over your credit card and subscribe at $19/month before generating your first photo. PhotoForge AI gives you 3 free product photos immediately, no account required, so you can evaluate the quality before committing to anything.",
              },
              {
                icon: "♾️",
                title: "No Image Caps",
                description:
                  "Mokker Standard caps you at 50 images per month — barely enough for a small product catalog refresh. PhotoForge AI's $11.99/month plan has zero image limits. Generate as many product photos as you need, every month, without watching a counter.",
              },
              {
                icon: "💰",
                title: "60% Lower Pro Price",
                description:
                  "Mokker Standard costs $19/month for just 50 images. PhotoForge AI Pro is $11.99/month with no image cap — that's 37% cheaper entry price for unlimited output. Mokker's Pro ($49/month) costs more than four times PhotoForge AI's monthly rate.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6"
              >
                <span className="text-3xl">{card.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section id="comparison" className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/80">
                  <th className="px-6 py-4 font-semibold text-gray-300">
                    Feature
                  </th>
                  <th className="px-6 py-4 font-semibold text-blue-400">
                    {PRODUCT_NAME}
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-400">
                    Mokker AI
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-gray-800/50 ${
                      i % 2 === 0 ? "bg-gray-900/30" : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-200">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-gray-100">{row.ours}</td>
                    <td className="px-6 py-4 text-gray-400">{row.theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Pricing deep dive ── */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Pricing Breakdown
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-8">
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                {PRODUCT_NAME}
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Free Tier</span>
                  <span className="text-blue-400 font-medium">3 product photos, no watermark</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Pro Monthly</span>
                  <span className="text-blue-400 font-medium">$11.99/month</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Image Limit</span>
                  <span className="text-blue-400 font-medium">Unlimited</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual cost</span>
                  <span className="text-blue-400 font-medium">$118.80/year</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-300 mb-2">
                Mokker AI
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Free Tier</span>
                  <span className="font-medium">None</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Standard Monthly</span>
                  <span className="font-medium">$19/month (50 images)</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Pro Monthly</span>
                  <span className="font-medium">$49/month (200 images)</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual cost (Standard)</span>
                  <span className="font-medium">$228/year</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why switch section ── */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why Sellers Switch from Mokker
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">
            Mokker produces quality AI product photos, but the pricing model punishes sellers
            who need volume, flexibility, or just want to try before they buy.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "No Free Trial — Pay to Even See Results",
                text: "Mokker gives you no way to evaluate output quality without subscribing. $19/month just to generate a test image is a hard sell. PhotoForge AI gives you 3 free product photos — watermark-free, full-resolution — so you know what you're getting before you spend a dollar.",
              },
              {
                title: "Image Caps Kill High-Volume Workflows",
                text: "Mokker Standard's 50-image/month cap evaporates quickly for sellers with growing catalogs. At $49/month, the Pro plan's 200-image limit still isn't unlimited. PhotoForge AI's $11.99/month plan has no caps — generate your entire catalog and refresh it seasonally without hitting a wall.",
              },
              {
                title: "Lower Price, Comparable Quality",
                text: "Mokker charges $19/month for 50 images. PhotoForge AI charges $11.99/month for unlimited images. Both tools use generative AI to create realistic product backgrounds. The quality difference doesn't justify Mokker's premium for most e-commerce use cases.",
              },
              {
                title: "Purpose-Built E-Commerce Workflow",
                text: "Both tools are designed for product photography, but PhotoForge AI strips away the complexity: upload your product, pick a background style, download a studio-quality photo in seconds. No subscription required to discover if it works for your products.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-800 bg-gray-900/40 p-6"
              >
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Which tool is right for you ── */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Which Tool Is Right for You?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-8">
              <h3 className="text-xl font-bold text-blue-400 mb-4">
                Choose {PRODUCT_NAME} if you want:
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  3 free product photos before paying anything
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  Unlimited generations for $11.99/month
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  No monthly image caps
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  No watermarks — even on free photos
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  Purpose-built e-commerce product photo workflow
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-300 mb-4">
                Choose Mokker AI if you want:
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Particularly precise shadow rendering and scene placement
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  A mature, established product photography tool
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  High-fidelity lifestyle scenes for premium brand campaigns
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Budget is not a concern and you need fewer than 200 images/month
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  You already have a paid Mokker account and it meets your needs
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="mx-auto max-w-3xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-gray-800 bg-gray-900/40 p-6"
              >
                <h3 className="text-base font-semibold text-white">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-12">
            <h2 className="text-3xl font-bold">
              Try {PRODUCT_NAME} Free — No Credit Card, No Subscription
            </h2>
            <p className="mt-3 text-gray-400">
              3 free product photos, clean and ready for your store. Upgrade to unlimited for $11.99/month — less than Mokker&apos;s entry price.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-4 text-lg font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Try {PRODUCT_NAME} Free
            </Link>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
          <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p>
              &copy; {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">
                Terms
              </Link>
              <a
                href="https://symplyai.io"
                target="_blank"
                rel="noopener"
                className="hover:text-gray-300 transition-colors"
              >
                Powered by SymplyAI
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

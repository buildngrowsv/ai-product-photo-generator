/**
 * src/app/vs/flair-ai/page.tsx — PhotoForge AI vs Flair AI comparison page
 *
 * SEO STRATEGY:
 * Targets "flair ai alternative", "flair ai vs product photo generator",
 * "flair ai pricing" queries. Flair AI is a well-funded AI product photography
 * tool used by e-commerce brands. It charges $25/month for the Basic tier and
 * up to $190/month for Enterprise. Users searching for more affordable
 * alternatives are high-intent prospects for PhotoForge AI.
 *
 * COMPETITOR CONTEXT:
 * Flair AI specializes in AI-generated product photography scenes. It offers
 * drag-and-drop product placement with AI backgrounds. Pricing: free trial
 * (10 images), Basic $25/month (250 images), Pro $75/month (1000 images),
 * Enterprise $190/month (5000 images). PhotoForge AI offers 3 free product
 * photos with no watermarks, then $11.99/month for unlimited generations.
 *
 * STRUCTURED DATA:
 * FAQPage JSON-LD for rich snippet eligibility.
 *
 * MIDDLEWARE NOTE:
 * /vs/ is excluded from next-intl middleware — see middleware.ts matcher.
 *
 * SEO comparison page initiative, 2026-04-13
 */

import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SeoCrossLinks } from "@/components/SeoCrossLinks";
import { SeoInternalLinks } from "@/components/SeoInternalLinks";
// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://aiproductphotomaker.com";
const PRODUCT_NAME = "PhotoForge AI";

// ---------------------------------------------------------------------------
// Metadata — targets "flair ai alternative" and related queries
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: `${PRODUCT_NAME} vs Flair AI (2026) — AI Product Photo Comparison`,
  description:
    "Compare PhotoForge AI with Flair AI for AI product photography. $11.99/month unlimited vs $25-$190/month tiered. See pricing, features, and output quality side by side.",
  keywords: [
    "flair ai alternative",
    "flair ai vs product photo generator",
    "flair ai pricing alternative",
    "cheap AI product photo generator",
    "best AI product photography 2026",
    "flair ai competitor",
    "AI product photo comparison",
    "flair ai free alternative",
  ],
  alternates: {
    canonical: `${SITE_URL}/vs/flair-ai`,
  },
  openGraph: {
    title: `${PRODUCT_NAME} vs Flair AI — Which AI Product Photo Tool Is Better Value?`,
    description:
      "$11.99/month unlimited vs $25-$190/month tiered. Honest pricing and feature comparison for 2026.",
    url: `${SITE_URL}/vs/flair-ai`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

// ---------------------------------------------------------------------------
// FAQ data — addresses Flair AI-specific pricing and workflow concerns
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "How much does Flair AI cost?",
    answer:
      "Flair AI offers a free trial with 10 images. After that, Basic costs $25/month (250 images), Pro costs $75/month (1000 images), and Enterprise costs $190/month (5000 images). PhotoForge AI offers 3 free product photos with no watermarks, then $11.99/month for unlimited generations — no per-image caps or tier upgrades needed.",
  },
  {
    question: "Is PhotoForge AI better than Flair AI?",
    answer:
      "It depends on your needs. Flair AI excels at drag-and-drop product placement with precise control over scene composition and camera angles. PhotoForge AI is better if you want unlimited AI-generated product backgrounds at a flat $11.99/month without worrying about image quotas. For most small sellers processing under 250 images/month, PhotoForge AI saves $15/month compared to Flair AI Basic.",
  },
  {
    question: "Does Flair AI have a free plan?",
    answer:
      "Flair AI offers a free trial limited to 10 images total — not 10 per month, 10 ever. After that, you must choose a paid plan starting at $25/month. PhotoForge AI gives you 3 free product photos to start and then unlimited generations for $11.99/month.",
  },
  {
    question: "Can I use Flair AI without a credit card?",
    answer:
      "Yes, Flair AI's free trial does not require a credit card for the initial 10 images. However, any continued use requires payment. PhotoForge AI also starts free with no credit card required for the initial 3 product photos.",
  },
  {
    question: "Which is better for Shopify product photos?",
    answer:
      "Both tools work well for Shopify. Flair AI offers more precise scene composition with drag-and-drop placement, which is valuable for lifestyle product shots. PhotoForge AI offers simpler one-click background generation that is faster for high-volume catalog updates. For small Shopify stores processing dozens of products monthly, PhotoForge AI at $11.99/month is dramatically more affordable than Flair AI Basic at $25/month.",
  },
  {
    question: "How does image quality compare?",
    answer:
      "Both tools produce professional-quality product photos suitable for e-commerce listings. Flair AI's strength is scene composition — you can precisely position products in generated environments. PhotoForge AI focuses on fast, clean background generation with multiple style options. Both use state-of-the-art AI models for photorealistic output.",
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
  { feature: "Free Tier", ours: "3 free product photos, no watermark", theirs: "10 images total (trial only)" },
  { feature: "Basic Price", ours: "$11.99/month unlimited", theirs: "$25/month (250 images)" },
  { feature: "Pro Price", ours: "Included in $11.99/month", theirs: "$75/month (1000 images)" },
  { feature: "Enterprise", ours: "Not needed — unlimited at $11.99", theirs: "$190/month (5000 images)" },
  { feature: "Image Caps", ours: "None (unlimited with Pro)", theirs: "Strict per-tier limits" },
  { feature: "Platform", ours: "Browser-based", theirs: "Browser-based" },
  { feature: "Scene Composition", ours: "AI-generated backgrounds", theirs: "Drag-and-drop product placement" },
  { feature: "Background Styles", ours: "Multiple AI-generated options", theirs: "Scene templates + custom prompts" },
  { feature: "Processing Speed", ours: "Seconds per image", theirs: "Seconds per image" },
  { feature: "Signup Required", ours: "Free credits without signup", theirs: "Account required" },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function VsFlairAiPage() {
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
        {/* -- Navigation -- */}
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

        {/* -- Hero -- */}
        <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {PRODUCT_NAME}
            </span>{" "}
            vs Flair AI
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Flair AI charges $25-$190/month with strict image caps. {PRODUCT_NAME}{" "}
            gives you unlimited AI product photos for $11.99/month — 60% cheaper
            than Flair AI Basic, with no per-image limits.
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

        {/* -- Key differentiator cards -- */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "\u{1F4B0}",
                title: "60% Cheaper Than Flair AI Basic",
                description:
                  "Flair AI Basic costs $25/month for 250 images. PhotoForge AI is $11.99/month with unlimited generations. You save $15/month and never worry about running out of image credits.",
              },
              {
                icon: "\u267E\uFE0F",
                title: "No Image Caps or Tier Upgrades",
                description:
                  "Flair AI limits you to 250, 1000, or 5000 images depending on your tier. PhotoForge AI gives you unlimited product photos on one flat plan. No counting, no upgrade pressure.",
              },
              {
                icon: "\u26A1",
                title: "Simpler, Faster Workflow",
                description:
                  "Upload a product photo, choose a background style, get professional results in seconds. No drag-and-drop scene building required — though Flair AI's scene composer is powerful if you need precise control.",
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

        {/* -- Comparison table -- */}
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
                    Flair AI
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

        {/* -- Pricing deep dive -- */}
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
                Flair AI
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Free Trial</span>
                  <span className="font-medium">10 images total (not monthly)</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Basic</span>
                  <span className="font-medium">$25/month (250 images)</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Pro</span>
                  <span className="font-medium">$75/month (1000 images)</span>
                </div>
                <div className="flex justify-between">
                  <span>Enterprise</span>
                  <span className="font-medium">$190/month (5000 images)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -- When to choose section -- */}
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
                  Unlimited product photos for one flat monthly fee
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  60% savings compared to Flair AI Basic
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  Simple upload-and-generate workflow
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  Free product photos to try before subscribing
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  No image caps or tier upgrade pressure
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-300 mb-4">
                Choose Flair AI if you want:
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Precise drag-and-drop scene composition
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Custom camera angles and lighting control
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Enterprise-grade batch workflows
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Advanced scene templates for lifestyle shots
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Brand kit integration for consistent styling
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* -- FAQ -- */}
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

        {/* -- CTA -- */}
        <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-12">
            <h2 className="text-3xl font-bold">
              Unlimited Product Photos for $11.99/month — No Image Caps
            </h2>
            <p className="mt-3 text-gray-400">
              3 free product photos to start. No per-image fees, no tier upgrades.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-4 text-lg font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Try {PRODUCT_NAME} Free
            </Link>
          </div>
        </section>

        {/* Cross-links and internal links for crawlability */}
        <SeoCrossLinks currentCategory="vs" currentSlug="flair-ai" />
        <SeoInternalLinks />

        {/* -- Footer -- */}
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

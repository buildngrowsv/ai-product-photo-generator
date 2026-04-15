/**
 * src/app/vs/pixelcut/page.tsx — PhotoForge AI vs Pixelcut comparison page
 *
 * SEO STRATEGY:
 * Targets "pixelcut alternative", "pixelcut vs product photo generator",
 * "pixelcut pricing", and "pixelcut free alternative" queries. Pixelcut
 * (pixelcut.ai) is a popular AI product photography tool with a large
 * following among Etsy, Amazon, and Shopify sellers. Users searching for
 * alternatives are often frustrated by Pixelcut's watermarks on free output
 * and the jump to Pro pricing to unlock full resolution and unlimited use.
 *
 * COMPETITOR CONTEXT:
 * Pixelcut (pixelcut.ai) is an AI product photography and background removal
 * tool popular for e-commerce. It offers background removal, AI-generated
 * product backgrounds, and batch editing. Pricing: free with watermarks
 * and limited exports, Pro at $9.99/month (annual) or ~$14.99/month (monthly).
 * PhotoForge AI offers 3 free product photos with no watermarks, then
 * $11.99/month for unlimited generations — purpose-built for e-commerce
 * product photos with more AI background style variety.
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
// Metadata — targets "pixelcut alternative" and related queries
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: `${PRODUCT_NAME} vs Pixelcut (2026) — AI Product Photo Comparison`,
  description:
    "Compare PhotoForge AI with Pixelcut for AI product photography. More AI background styles, no watermarks on free tier, and a purpose-built e-commerce workflow. See pricing, features, and quality side by side.",
  keywords: [
    "pixelcut alternative",
    "pixelcut alternative free",
    "pixelcut vs product photo generator",
    "pixelcut pricing alternative",
    "AI product photo generator",
    "best AI product photography 2026",
    "pixelcut competitor",
    "AI product background generator",
    "e-commerce product photo tool",
    "product photo AI no watermark",
  ],
  alternates: {
    canonical: `${SITE_URL}/vs/pixelcut`,
  },
  openGraph: {
    title: `${PRODUCT_NAME} vs Pixelcut — Which AI Product Photo Tool Is Better?`,
    description:
      "No watermarks on free tier, more AI generation styles, purpose-built for e-commerce. Honest 2026 pricing and feature comparison.",
    url: `${SITE_URL}/vs/pixelcut`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

// ---------------------------------------------------------------------------
// FAQ data — addresses Pixelcut-specific pricing and workflow concerns
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "Is PhotoForge AI a good Pixelcut alternative?",
    answer:
      "Yes. PhotoForge AI is a strong Pixelcut alternative for e-commerce sellers who want AI-generated product backgrounds without watermarks on the free tier. PhotoForge AI offers 3 free product photos with no watermarks to start, then $11.99/month for unlimited generations. Pixelcut's free tier adds watermarks to every export, making them unusable for store listings without paying.",
  },
  {
    question: "How much does Pixelcut cost?",
    answer:
      "Pixelcut offers a free tier with watermarked exports and limited full-resolution downloads. Pixelcut Pro costs approximately $9.99/month (billed annually) or ~$14.99/month (billed monthly). PhotoForge AI offers 3 free product photos without watermarks, then $11.99/month for unlimited AI-generated product backgrounds.",
  },
  {
    question: "Does Pixelcut add watermarks?",
    answer:
      "Yes. Pixelcut's free tier watermarks all exported images, which means you cannot use free photos on your Amazon, Shopify, or Etsy listings without upgrading. PhotoForge AI does not add watermarks to your free product photos — your first 3 photos are clean, full-resolution, and ready to use immediately.",
  },
  {
    question: "What AI background styles does PhotoForge AI offer vs Pixelcut?",
    answer:
      "PhotoForge AI is purpose-built for e-commerce product photography and offers a variety of AI-generated contextual backgrounds — from studio environments to lifestyle settings — each generated fresh from your product image. Pixelcut also offers background replacement and AI backgrounds, but leans more toward background removal with template-based backgrounds. PhotoForge AI's generative approach produces more varied, product-specific scenes.",
  },
  {
    question: "Can I use PhotoForge AI for Amazon and Shopify listings?",
    answer:
      "Absolutely. PhotoForge AI generates high-resolution product photos with professional AI backgrounds perfect for Amazon, Shopify, Etsy, and other marketplaces. The AI creates contextual, studio-quality backgrounds that make products look professionally shot — no photography studio or props required.",
  },
  {
    question: "Which tool is better for batch product photo editing?",
    answer:
      "Pixelcut has batch processing features for background removal across multiple images at once. PhotoForge AI currently focuses on single-image AI generation for maximum quality per product photo. If your workflow is primarily bulk background removal across hundreds of images, Pixelcut may be faster. If you want the best AI-generated background for each individual product photo, PhotoForge AI produces superior results.",
  },
  {
    question: "Does PhotoForge AI require an app download?",
    answer:
      "No. PhotoForge AI works entirely in your browser on any device — desktop, laptop, or tablet. No app download required. Pixelcut also has a web version alongside its mobile apps, but its strongest features are on mobile. PhotoForge AI is designed desktop-first for e-commerce sellers who manage their stores on a computer.",
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
  { feature: "Free Tier", ours: "3 product photos, no watermark", theirs: "Free with watermarks, limited exports" },
  { feature: "Pro Price (Monthly)", ours: "$11.99/month unlimited", theirs: "~$14.99/month (or $9.99 annual)" },
  { feature: "Watermarks (Free)", ours: "No watermarks", theirs: "Watermarked output" },
  { feature: "AI Background Generation", ours: "Generative AI scenes (purpose-built)", theirs: "AI backgrounds + template-based" },
  { feature: "Background Style Variety", ours: "Multiple generative styles per product", theirs: "Pre-set templates + basic AI" },
  { feature: "Platform", ours: "Browser-based, desktop-first", theirs: "Mobile app + web version" },
  { feature: "Background Removal", ours: "Auto background removal on upload", theirs: "Core feature, highly accurate" },
  { feature: "Batch Processing", ours: "Single image, max quality focus", theirs: "Yes (batch background removal)" },
  { feature: "Processing Speed", ours: "~10-20 seconds per generation", theirs: "~5-10 seconds per image" },
  { feature: "Account Required (Free)", ours: "No account for first free photos", theirs: "Account required" },
  { feature: "E-commerce Focus", ours: "Purpose-built for product photos", theirs: "General photo editing + product" },
  { feature: "Output Resolution", ours: "High-resolution, no watermark", theirs: "Limited resolution on free tier" },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function VsPixelcutPage() {
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
            vs Pixelcut
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Pixelcut watermarks your free photos and limits exports. {PRODUCT_NAME} gives
            you 3 free product photos with no watermarks — clean, ready for your store, no upgrade
            required.
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
                icon: "✨",
                title: "No Watermarks, Ever",
                description:
                  "Pixelcut adds watermarks to every free export, making them unusable on your store listings. PhotoForge AI's free product photos are clean, full-resolution, and ready to publish immediately — no payment required to remove watermarks.",
              },
              {
                icon: "🎨",
                title: "More AI Generation Styles",
                description:
                  "PhotoForge AI generates unique backgrounds for each product using generative AI — studio setups, lifestyle environments, and contextual scenes. Pixelcut leans on template-based backgrounds. PhotoForge AI produces more varied, product-specific results.",
              },
              {
                icon: "🛒",
                title: "Purpose-Built for E-Commerce",
                description:
                  "PhotoForge AI is designed from the ground up for e-commerce product photography — upload your product, pick a background style, get a studio-quality photo in seconds. No general-purpose editing tools cluttering your workflow.",
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
                    Pixelcut
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
                Pixelcut
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Free Tier</span>
                  <span className="font-medium">Watermarked, limited exports</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Pro Monthly</span>
                  <span className="font-medium">~$14.99/month</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Pro Annual</span>
                  <span className="font-medium">~$9.99/month (billed yearly)</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual cost (Pro)</span>
                  <span className="font-medium">~$119.88/year</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why switch section ── */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why Sellers Switch from Pixelcut
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">
            Pixelcut is a useful tool, but e-commerce sellers often hit its free-tier
            limits quickly and want better AI generation variety.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Watermark-Free from Day One",
                text: "Pixelcut watermarks every free export. If you want to actually use a photo on your store, you must pay first. PhotoForge AI lets you try 3 real, watermark-free product photos before you ever see a pricing page.",
              },
              {
                title: "Generative AI, Not Just Templates",
                text: "Pixelcut's background tool relies heavily on template-based backgrounds. PhotoForge AI uses generative AI to create unique backgrounds for your specific product — more variety, more creative options, more professional output.",
              },
              {
                title: "Desktop-First Design",
                text: "Most e-commerce sellers manage product listings on desktop. PhotoForge AI is optimized for desktop browsers — full-screen upload, side-by-side previews, and download in one click. No switching to your phone mid-workflow.",
              },
              {
                title: "E-Commerce Focused Workflow",
                text: "PhotoForge AI does one thing: make your product photos look studio-quality. No general-purpose editing tools, filters, or social media templates competing for attention. Upload, generate, download — done.",
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
                  Watermark-free photos from the first upload
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  Generative AI backgrounds (not just templates)
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  Purpose-built e-commerce product photo workflow
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  Unlimited generations for $11.99/month
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">&#10003;</span>
                  Desktop-first browser experience
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-300 mb-4">
                Choose Pixelcut if you want:
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  High-accuracy bulk background removal
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Batch processing across many images at once
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Mobile app for on-the-go editing (iOS / Android)
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  General-purpose photo editing tools alongside AI
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Large template library for social media content
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
              Try {PRODUCT_NAME} Free — No Watermarks, No Credit Card
            </h2>
            <p className="mt-3 text-gray-400">
              3 free product photos, clean and ready for your store. Upgrade to unlimited for $11.99/month.
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

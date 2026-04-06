/**
 * src/app/vs/photoroom/page.tsx — PhotoForge AI vs Photoroom comparison page
 *
 * SEO STRATEGY:
 * Targets "photoroom alternative", "AI product photo free", "photoroom vs"
 * and related queries. Photoroom is the market leader in AI product photography
 * with 100M+ app downloads and a strong brand. Users searching for alternatives
 * are typically looking for a cheaper, browser-first option without app lock-in.
 *
 * COMPETITOR CONTEXT:
 * Photoroom (photoroom.com) is a mobile-first AI photo editing app that
 * specializes in product photography, background removal, and template-based
 * design. Pricing: free with watermarks, Pro at $12.99/month or $69.99/year.
 * PhotoForge AI offers $9.90/month with 3 free product photos to start, no
 * watermarks on free tier, and full browser access.
 *
 * STRUCTURED DATA:
 * FAQPage JSON-LD for rich results targeting common search queries.
 *
 * MIDDLEWARE NOTE:
 * /vs/ is excluded from next-intl middleware — see middleware.ts matcher.
 *
 * Created 2026-04-06 — SEO comparison page initiative.
 */

import type { Metadata } from "next";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "PhotoForge AI vs Photoroom — Free AI Product Photo Alternative (2026)",
  description:
    "Compare PhotoForge AI with Photoroom for AI product photography. Free to start, no watermarks, browser-based. See pricing, quality, and feature differences.",
  keywords: [
    "photoroom alternative",
    "photoroom alternative free",
    "AI product photo generator",
    "product photography AI",
    "photoroom vs",
    "e-commerce photo tool",
  ],
  alternates: {
    canonical: "https://aiproductphotomaker.com/vs/photoroom",
  },
  openGraph: {
    title: "PhotoForge AI vs Photoroom — Free AI Product Photo Alternative",
    description:
      "Free to start, no watermarks, browser-based. Compare PhotoForge AI with Photoroom for AI-powered product photography.",
    url: "https://aiproductphotomaker.com/vs/photoroom",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "Is PhotoForge AI a good alternative to Photoroom?",
    answer:
      "Yes. PhotoForge AI offers AI-powered product background generation with 3 free photos to start, no watermarks, and full browser access. While Photoroom is a powerful mobile app with 100M+ downloads, PhotoForge AI provides a simpler, more affordable browser-based alternative at $9.90/month vs Photoroom's $12.99/month.",
  },
  {
    question: "How much does Photoroom cost?",
    answer:
      "Photoroom offers a free tier with watermarks and limited features. Photoroom Pro costs $12.99/month or $69.99/year. PhotoForge AI offers 3 free product photos without watermarks, and Pro at $9.90/month for unlimited generations.",
  },
  {
    question: "Does PhotoForge AI work in the browser?",
    answer:
      "Yes. PhotoForge AI is fully browser-based — no app download needed. Upload a product photo, choose a background style, and get professional e-commerce photography in seconds. Photoroom is primarily a mobile app, though they also have a web version.",
  },
  {
    question: "Which tool is better for e-commerce product photos?",
    answer:
      "Both tools produce professional product photos. Photoroom has a broader feature set including templates, batch processing, and design tools. PhotoForge AI focuses specifically on AI background generation — upload a product and get multiple professional background options instantly. For pure product photo backgrounds, PhotoForge AI's focused approach produces excellent results at a lower price.",
  },
  {
    question: "Do I need to download an app?",
    answer:
      "No. PhotoForge AI works entirely in your browser on any device. Photoroom is primarily designed as a mobile app (iOS and Android), though they have a web version. If you prefer working on desktop, PhotoForge AI offers a better experience.",
  },
  {
    question: "Can I use PhotoForge AI for Amazon and Shopify listings?",
    answer:
      "Absolutely. PhotoForge AI generates high-resolution product photos with professional backgrounds perfect for Amazon, Shopify, Etsy, and other marketplaces. The AI creates contextual backgrounds that make products look studio-shot.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
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
// Comparison data
// ---------------------------------------------------------------------------
const COMPARISON_ROWS = [
  { feature: "Price (Free Tier)", ours: "3 free photos, no watermark", theirs: "Free with watermarks" },
  { feature: "Price (Pro)", ours: "$9.90/month unlimited", theirs: "$12.99/month ($69.99/year)" },
  { feature: "Platform", ours: "Any browser (no download)", theirs: "Mobile app + limited web" },
  { feature: "Watermarks (Free)", ours: "No watermarks", theirs: "Watermarked output" },
  { feature: "Background Generation", ours: "AI-generated contextual backgrounds", theirs: "AI backgrounds + templates" },
  { feature: "Batch Processing", ours: "One at a time", theirs: "Yes (Pro feature)" },
  { feature: "Processing Speed", ours: "~10-20 seconds", theirs: "~5-15 seconds" },
  { feature: "Design Templates", ours: "AI-generated scenes", theirs: "Extensive template library" },
  { feature: "Account Required", ours: "No (free tier)", theirs: "Yes" },
  { feature: "Desktop Experience", ours: "Full desktop browser", theirs: "Mobile-first design" },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function VsPhotoroomPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

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
              <Link href="/vs" className="hover:text-white transition-colors">Comparisons</Link>
            </div>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              PhotoForge AI
            </span>{" "}
            vs Photoroom
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Looking for a Photoroom alternative? Generate professional product photos in your
            browser — no app, no watermarks, free to start.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 text-base font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Try PhotoForge AI Free
            </Link>
            <a
              href="#comparison"
              className="inline-flex items-center justify-center rounded-full border border-gray-700 px-8 py-3 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              See Full Comparison
            </a>
          </div>
        </section>

        {/* ── Quick difference cards ── */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌐",
                title: "No App Download",
                description: "PhotoForge AI works in any browser on any device. Photoroom is primarily a mobile app — you need to download it from the App Store or Play Store to get the full experience.",
              },
              {
                icon: "✨",
                title: "No Watermarks Free",
                description: "Your free product photos come without watermarks. Photoroom's free tier adds a watermark to every output, which means you cannot use free photos on your store.",
              },
              {
                icon: "💰",
                title: "Lower Pro Price",
                description: "PhotoForge AI Pro is $9.90/month for unlimited product photos. Photoroom Pro costs $12.99/month or $69.99/year — over 30% more expensive.",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
                <span className="text-3xl">{card.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section id="comparison" className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/80">
                  <th className="px-6 py-4 font-semibold text-gray-300">Feature</th>
                  <th className="px-6 py-4 font-semibold text-blue-400">PhotoForge AI</th>
                  <th className="px-6 py-4 font-semibold text-gray-400">Photoroom</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-gray-800/50 ${i % 2 === 0 ? "bg-gray-900/30" : ""}`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-200">{row.feature}</td>
                    <td className="px-6 py-4 text-gray-100">{row.ours}</td>
                    <td className="px-6 py-4 text-gray-400">{row.theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Why switch section ── */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Why Sellers Switch from Photoroom</h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">
            Photoroom is a great app, but many sellers want a simpler, cheaper, browser-first
            product photo tool.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Desktop-First Workflow",
                text: "Most e-commerce sellers manage their stores on desktop. PhotoForge AI is built for desktop browsers first — upload, generate, and download without switching to your phone.",
              },
              {
                title: "No Watermark Tax",
                text: "Photoroom's free tier adds watermarks to every photo, making them unusable for listings. PhotoForge AI's free photos are clean and ready for your store immediately.",
              },
              {
                title: "Simpler Pricing",
                text: "$9.90/month for unlimited product photos. No annual lock-in pressure, no feature gates between tiers. Photoroom charges $12.99/month and reserves key features for higher tiers.",
              },
              {
                title: "AI Background Focus",
                text: "Instead of being a general-purpose photo editor with AI features bolted on, PhotoForge AI focuses entirely on generating professional product backgrounds — doing one thing well.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="mx-auto max-w-3xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question} className="rounded-xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-base font-semibold text-white">{item.question}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-12">
            <h2 className="text-3xl font-bold">Ready to Transform Your Product Photos?</h2>
            <p className="mt-3 text-gray-400">
              No app. No watermarks. 3 free photos. Upload a product and get studio-quality backgrounds in seconds.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-4 text-lg font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Try PhotoForge AI Free
            </Link>
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
    </>
  );
}

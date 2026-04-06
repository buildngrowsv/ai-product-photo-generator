/**
 * src/app/vs/pebblely/page.tsx — PhotoForge AI vs Pebblely comparison page
 *
 * SEO STRATEGY:
 * Targets "pebblely alternative", "AI product photo background", "pebblely vs"
 * and related queries. Pebblely (pebblely.com) is an AI product photography tool
 * focused on e-commerce sellers — generating professional backgrounds for product
 * images. Users comparing tools are bottom-of-funnel buyers.
 *
 * COMPETITOR CONTEXT:
 * Pebblely offers AI-generated product photo backgrounds for e-commerce.
 * Pricing: Free tier (40 photos/month), Pro at $19/month (1000 photos), and
 * Premium at $39/month. They also offer a credits-based system. PhotoForge AI
 * offers simpler pricing at $9.90/month unlimited.
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
  title: "PhotoForge AI vs Pebblely — AI Product Photo Generator Comparison (2026)",
  description:
    "Compare PhotoForge AI with Pebblely for AI product photography. Free to start, unlimited Pro at $9.90/mo vs Pebblely's $19/mo. See features, pricing, and quality.",
  keywords: [
    "pebblely alternative",
    "pebblely alternative free",
    "AI product photo background",
    "product photography AI",
    "pebblely vs",
    "e-commerce photo generator",
  ],
  alternates: {
    canonical: "https://aiproductphotomaker.com/vs/pebblely",
  },
  openGraph: {
    title: "PhotoForge AI vs Pebblely — AI Product Photo Generator Comparison",
    description:
      "Free to start, $9.90/mo unlimited vs $19/mo. Compare PhotoForge AI with Pebblely for AI-powered product photography.",
    url: "https://aiproductphotomaker.com/vs/pebblely",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "Is PhotoForge AI a good alternative to Pebblely?",
    answer:
      "Yes. PhotoForge AI offers AI-generated product photo backgrounds with 3 free photos to start and unlimited Pro at $9.90/month. Pebblely charges $19/month for 1000 photos — almost double the price. Both tools produce professional e-commerce photography, but PhotoForge AI offers simpler pricing and no generation caps on Pro.",
  },
  {
    question: "How much does Pebblely cost?",
    answer:
      "Pebblely offers a free tier with 40 photos/month. Their Pro plan is $19/month for 1000 photos, and Premium is $39/month for more. PhotoForge AI offers 3 free photos to try and $9.90/month for unlimited generations — significantly more affordable for high-volume sellers.",
  },
  {
    question: "Which tool produces better product photos?",
    answer:
      "Both tools use AI to generate professional product backgrounds. Pebblely has been in the market longer and offers more theme templates. PhotoForge AI uses the latest FLUX-based AI models which produce highly realistic, contextual backgrounds. For most e-commerce use cases, both tools produce excellent results — the main difference is price and simplicity.",
  },
  {
    question: "Does PhotoForge AI have generation limits?",
    answer:
      "On the free tier, you get 3 product photos to try. On Pro ($9.90/month), generations are unlimited — no monthly caps. Pebblely limits Pro users to 1000 photos/month, which can be restrictive for sellers with large catalogs.",
  },
  {
    question: "Can I use PhotoForge AI for Amazon product photos?",
    answer:
      "Absolutely. PhotoForge AI generates high-resolution product photos with professional backgrounds that meet Amazon, Shopify, Etsy, and other marketplace standards. Upload your product on a plain background and get studio-quality images ready for listing.",
  },
  {
    question: "Do I need to remove the background first?",
    answer:
      "PhotoForge AI handles the entire process — it isolates your product and generates a new professional background automatically. You do not need to manually remove the background before uploading. The same applies to Pebblely.",
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
  { feature: "Price (Free Tier)", ours: "3 free photos, no watermark", theirs: "40 photos/month (free)" },
  { feature: "Price (Pro)", ours: "$9.90/month unlimited", theirs: "$19/month (1000 photos)" },
  { feature: "Price (Premium)", ours: "Included in Pro", theirs: "$39/month" },
  { feature: "Generation Limit (Pro)", ours: "Unlimited", theirs: "1000/month" },
  { feature: "Platform", ours: "Browser-based", theirs: "Browser-based" },
  { feature: "Background Themes", ours: "AI-generated contextual scenes", theirs: "70+ pre-designed themes" },
  { feature: "Custom Backgrounds", ours: "AI generates from product context", theirs: "Yes, with text prompts" },
  { feature: "Processing Speed", ours: "~10-20 seconds", theirs: "~10-30 seconds" },
  { feature: "Batch Processing", ours: "One at a time", theirs: "Yes (Pro feature)" },
  { feature: "API Access", ours: "Not yet available", theirs: "Available (Premium)" },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function VsPebblelyPage() {
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
            vs Pebblely
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Looking for a Pebblely alternative? Get unlimited AI product photos at half the
            price — no generation caps, no watermarks, free to try.
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
                icon: "💰",
                title: "Half the Price",
                description: "PhotoForge AI Pro is $9.90/month unlimited. Pebblely Pro is $19/month for 1000 photos. For high-volume sellers, that price difference adds up fast.",
              },
              {
                icon: "♾️",
                title: "Unlimited Generations",
                description: "No monthly caps on Pro. Generate as many product photos as you need. Pebblely limits Pro to 1000 photos/month and charges more for higher tiers.",
              },
              {
                icon: "⚡",
                title: "AI-Generated Scenes",
                description: "Instead of picking from pre-made templates, PhotoForge AI generates unique, contextual backgrounds that match your product type for a more natural, professional look.",
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
                  <th className="px-6 py-4 font-semibold text-gray-400">Pebblely</th>
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
          <h2 className="text-3xl font-bold text-center mb-4">Why Sellers Choose PhotoForge AI Over Pebblely</h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">
            Pebblely is a solid tool, but sellers with growing catalogs need unlimited
            generations at a price that scales.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "No Generation Caps",
                text: "Pebblely Pro limits you to 1000 photos/month. If you have 200 products and need 5 variations each, you are already at your limit. PhotoForge AI Pro is unlimited — generate as many as you need.",
              },
              {
                title: "Half the Monthly Cost",
                text: "$9.90/month vs $19/month. Over a year, that is $118 saved — money that goes back into your business. And PhotoForge AI gives you more (unlimited) for less.",
              },
              {
                title: "AI-Native Backgrounds",
                text: "Instead of choosing from a library of pre-designed themes, PhotoForge AI uses generative AI to create unique, contextual backgrounds that match your specific product — more variety, more authenticity.",
              },
              {
                title: "Simple Free Trial",
                text: "3 free product photos with no signup and no watermarks. See the quality before committing. Pebblely's free tier gives 40/month but the quality limitations push you to paid quickly.",
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
              No caps. No watermarks. $9.90/mo unlimited. Upload a product and get professional backgrounds in seconds.
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

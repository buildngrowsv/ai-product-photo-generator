/**
 * src/app/get-started/page.tsx — PhotoForge AI Getting Started Guide
 *
 * SEO STRATEGY:
 * Targets "how to use ai product photo generator", "get started with photoforge ai",
 * and "ai product photo generator tutorial" queries. Informational intent pages that convert
 * readers into users by walking them through the product step-by-step.
 *
 * STRUCTURED DATA:
 * HowTo JSON-LD for rich snippets (step-by-step in search results).
 * FAQPage JSON-LD for FAQ rich snippets.
 * BreadcrumbList JSON-LD for breadcrumb trail.
 *
 * INTERNAL LINKS:
 * Links to /pricing (monetization) and /for/ audience pages (pSEO distribution).
 *
 * MIDDLEWARE NOTE:
 * /get-started is excluded from next-intl middleware — see middleware.ts matcher.
 */

import type { Metadata } from "next";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Metadata — targets informational "how to" queries
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Get Started with PhotoForge AI — AI Product Photo Generator Tutorial",
  description:
    "Learn how to use PhotoForge AI in 4 simple steps. Professional Product Photos with AI — free, fast, and no design skills required.",
  keywords: [
    "how to use ai product photo generator",
    "ai product photo generator tutorial",
    "photoforge ai guide",
    "ai product photo generator for beginners",
    "get started ai product photo generator",
    "free ai product photo generator",
  ],
  alternates: {
    canonical: "https://aiproductphotomaker.com/get-started",
  },
  openGraph: {
    title: "Get Started with PhotoForge AI — Step-by-Step Guide",
    description:
      "Learn how to create your first AI product photo in minutes. Free, fast, no design skills required.",
    url: "https://aiproductphotomaker.com/get-started",
    type: "article",
  },
};

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "Is PhotoForge AI free?",
    answer: "Yes. Free accounts receive credits for several product photo generations. For unlimited photos and batch processing, Pro plans are available at competitive monthly rates.",
  },
  {
    question: "Can I use a phone photo as input?",
    answer: "Yes. Even a basic smartphone photo of your product works well. The AI enhances lighting, removes backgrounds, and generates professional scenes regardless of the original photo quality.",
  },
  {
    question: "Is this suitable for Amazon/Shopify listings?",
    answer: "Absolutely. Many e-commerce sellers use PhotoForge AI to create white-background product photos for Amazon, lifestyle images for Shopify, and ad creatives — all from a single product photo.",
  },
  {
    question: "How many photos can I generate per product?",
    answer: "You can generate multiple variations per product — different angles, backgrounds, and settings. This is ideal for A/B testing which product images convert best.",
  },
  {
    question: "Do I own the photos?",
    answer: "Yes. All product photos generated with PhotoForge AI are yours for any commercial use — online stores, print catalogs, advertising, and social media.",
  },
];

// ---------------------------------------------------------------------------
// HowTo JSON-LD — step-by-step rich snippets in Google Search
// ---------------------------------------------------------------------------
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use PhotoForge AI",
  description:
    "A step-by-step guide to create your first AI product photo using PhotoForge AI.",
  step: [
    { "@type": "HowToStep", name: "Upload Your Product Image", text: "Upload a photo of your product — even a simple smartphone photo works. The AI will remove the background and prepare it for professional scene generation." },
    { "@type": "HowToStep", name: "Choose a Scene & Setting", text: "Select from professional backgrounds and settings — lifestyle scenes, studio lighting, seasonal themes, or custom environments. Describe the exact look you want for your brand." },
    { "@type": "HowToStep", name: "AI Creates Professional Photos", text: "The AI generates studio-quality product photos in seconds. It handles lighting, shadows, reflections, and composition to make your product look its best — as if shot by a professional photographer." },
    { "@type": "HowToStep", name: "Download & Use Everywhere", text: "Download high-resolution product photos ready for your online store, Amazon listings, social media ads, catalogs, and marketing materials. No photographer or studio needed." },
  ],
};

// ---------------------------------------------------------------------------
// FAQPage JSON-LD
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
// BreadcrumbList JSON-LD
// ---------------------------------------------------------------------------
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://aiproductphotomaker.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Get Started",
      item: "https://aiproductphotomaker.com/get-started",
    },
  ],
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function GetStartedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-gray-950 text-gray-100">
        {/* -- Navigation -- */}
        <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold text-white">
              PhotoForge AI
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/pricing"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 transition-colors"
              >
                Try Free
              </Link>
            </div>
          </div>
        </nav>

        {/* -- Hero -- */}
        <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Get Started with{"\u00A0"}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              PhotoForge AI
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
            Learn how to create your first AI product photo in just a few minutes. No design skills
            needed — our AI does the heavy lifting.
          </p>
          <div className="mt-8">
            <Link
              href="{c['ctaHref']}"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              Create Product Photos Free
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* -- Step-by-Step Guide -- */}
        <section className="mx-auto max-w-3xl px-6 pb-20">
          <h2 className="text-2xl font-bold mb-10">
            How to Use PhotoForge AI — Step by Step
          </h2>
          <div className="space-y-10">
            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-lg font-bold text-purple-400">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">Upload Your Product Image</h3>
                  <p className="mt-2 text-gray-400 leading-relaxed">
                    Upload a photo of your product — even a simple smartphone photo works. The AI will remove the background and prepare it for professional scene generation.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-lg font-bold text-blue-400">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">Choose a Scene & Setting</h3>
                  <p className="mt-2 text-gray-400 leading-relaxed">
                    Select from professional backgrounds and settings — lifestyle scenes, studio lighting, seasonal themes, or custom environments. Describe the exact look you want for your brand.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-lg font-bold text-emerald-400">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">AI Creates Professional Photos</h3>
                  <p className="mt-2 text-gray-400 leading-relaxed">
                    The AI generates studio-quality product photos in seconds. It handles lighting, shadows, reflections, and composition to make your product look its best — as if shot by a professional photographer.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-lg font-bold text-amber-400">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">Download & Use Everywhere</h3>
                  <p className="mt-2 text-gray-400 leading-relaxed">
                    Download high-resolution product photos ready for your online store, Amazon listings, social media ads, catalogs, and marketing materials. No photographer or studio needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -- CTA Banner -- */}
        <section className="border-t border-gray-800">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to create your first AI product photo?
            </h2>
            <p className="mt-4 text-gray-400">
              It takes less than a minute. Start for free — no credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="{c['ctaHref']}"
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                Create Product Photos Free
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-gray-400 hover:text-white underline underline-offset-4 transition-colors"
              >
                View pricing plans
              </Link>
            </div>
          </div>
        </section>

        {/* -- FAQ -- */}
        <section className="border-t border-gray-800">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="text-2xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl bg-gray-900 border border-gray-800 transition-all"
                >
                  <summary className="cursor-pointer px-6 py-4 font-medium list-none flex justify-between items-center">
                    {item.question}
                    <span className="ml-4 text-gray-500 transition-transform duration-200 group-open:rotate-180">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* -- Internal Links — pSEO distribution + pricing -- */}
        <section className="border-t border-gray-800">
          <div className="mx-auto max-w-3xl px-6 py-12">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Explore More
            </h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/for/ecommerce-sellers" className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2">
                PhotoForge AI for Ecommerce Sellers
              </Link>
              <Link href="/for/marketers" className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2">
                PhotoForge AI for Marketers
              </Link>
              <Link href="/for/small-businesses" className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2">
                PhotoForge AI for Small Businesses
              </Link>
              <Link href="/pricing" className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2">
                View All Plans &amp; Pricing
              </Link>
              <Link href="/blog" className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2">
                Read the Blog
              </Link>
            </div>
          </div>
        </section>

        {/* -- Footer -- */}
        <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} PhotoForge AI. All rights reserved.</p>
          <div className="mt-3 flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/pricing" className="hover:text-gray-300 transition-colors">Pricing</Link>
          </div>
        </footer>
      </main>
    </>
  );
}

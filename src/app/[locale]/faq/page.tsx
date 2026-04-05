/**
 * src/app/[locale]/faq/page.tsx — FAQ page for AI Product Photo Generator (aiproductphotomaker.com)
 *
 * WHY THIS PAGE EXISTS:
 * Captures "[tool] FAQ" and "AI product photography questions" search traffic.
 * E-commerce sellers researching AI photography solutions frequently search for
 * FAQs before committing to a tool. This page answers common concerns about
 * quality, supported products, commercial licensing, and pricing — then funnels
 * visitors to the main tool or Pro upgrade.
 *
 * SEO:
 * - Metadata targets "AI product photo generator FAQ", "product photography questions"
 * - JSON-LD FAQPage schema for rich snippets in Google SERPs
 * - Internal links to homepage and /pricing for crawl equity
 *
 * DESIGN:
 * Dark theme (gray-950 background) matching the app's overall dark aesthetic.
 * Native HTML <details>/<summary> elements — no client JS needed.
 *
 * CREATED: 2026-04-04 — SEO FAQ pages initiative
 */

import type { Metadata } from "next";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*  SEO Metadata                                                              */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "FAQ | AI Product Photo Generator — Common Questions Answered",
  description:
    "Frequently asked questions about AI Product Photo Generator. Learn how AI product photography works, supported products, background options, commercial use, and pricing.",
  keywords: [
    "AI product photo generator FAQ",
    "AI product photography questions",
    "product photo AI help",
    "AI product photo maker FAQ",
    "e-commerce photo generator questions",
    "product photography tool FAQ",
  ],
  alternates: {
    canonical: "https://aiproductphotomaker.com/faq",
  },
};

/* -------------------------------------------------------------------------- */
/*  FAQ Data                                                                  */
/* -------------------------------------------------------------------------- */

const faqs = [
  {
    question: "What is AI product photography?",
    answer:
      "AI product photography uses advanced artificial intelligence models to generate professional, studio-quality product images from a simple photo of your item. Instead of hiring a photographer, renting a studio, and spending hours on lighting and retouching, our AI instantly places your product in beautiful, contextual scenes with perfect lighting, reflections, and shadows — all in seconds.",
  },
  {
    question: "How does AI Product Photo Generator work?",
    answer:
      "Upload a photo of your product (even one taken on your phone), and our AI analyzes the item, removes the background, and generates a new professional scene around it. You can choose from lifestyle backgrounds, solid colors, gradient studios, or contextual environments. The AI handles lighting, perspective, and shadows automatically to make the product look natural in its new setting.",
  },
  {
    question: "What types of products are supported?",
    answer:
      "AI Product Photo Generator works with virtually any physical product — electronics, clothing, jewelry, food and beverages, cosmetics, furniture, toys, accessories, and more. The AI is trained on millions of product images across categories, so it understands how different materials (glass, metal, fabric, leather) interact with light and reflections.",
  },
  {
    question: "What background options are available?",
    answer:
      "We offer a wide range of background options: clean white studio (ideal for Amazon and e-commerce listings), lifestyle scenes (kitchen counters, office desks, outdoor settings), gradient studios, seasonal themes, and custom prompt-based backgrounds where you describe exactly the scene you want. Pro users also get access to premium templates and batch background swapping.",
  },
  {
    question: "Can I use the generated photos commercially?",
    answer:
      "Yes, all images you generate are yours to use for any commercial purpose. Use them on your Shopify store, Amazon listings, Etsy shop, social media ads, marketing emails, print catalogs — anywhere you need professional product imagery. There are no watermarks on Pro plan outputs and no licensing fees.",
  },
  {
    question: "What does pricing look like?",
    answer:
      "We offer a free tier so you can try the tool with a limited number of generations per day. Our Pro plan unlocks unlimited generations, higher resolution outputs, batch processing, premium backgrounds, and priority processing speed. Visit our pricing page for current rates — plans start at just $9.99/month, which is a fraction of what a single professional product photoshoot would cost.",
  },
];

/* -------------------------------------------------------------------------- */
/*  JSON-LD Structured Data                                                   */
/* -------------------------------------------------------------------------- */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

/* -------------------------------------------------------------------------- */
/*  Page Component                                                            */
/* -------------------------------------------------------------------------- */

export default function FaqPage() {
  return (
    <>
      {/* JSON-LD for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gray-950 text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Breadcrumb / back link */}
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            &larr; Back to AI Product Photo Generator
          </Link>

          {/* Page heading */}
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-400 mb-12">
            Everything you need to know about AI-powered product photography.
          </p>

          {/* FAQ list using native <details> for zero-JS interactivity */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-lg border border-gray-800 bg-gray-900/50 open:bg-gray-900"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-lg font-medium text-white hover:text-amber-400 transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span className="ml-4 shrink-0 text-gray-500 group-open:rotate-180 transition-transform">
                    &#9660;
                  </span>
                </summary>
                <div className="px-6 pb-5 text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {/* CTA section */}
          <div className="mt-16 rounded-xl border border-gray-800 bg-gray-900/60 p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Ready to create stunning product photos?
            </h2>
            <p className="text-gray-400 mb-6">
              Upload your first product photo and see the AI magic in seconds —
              free to start.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-500 transition-colors"
              >
                Try It Free
              </Link>
              <Link
                href="/pricing"
                className="inline-block rounded-lg border border-gray-700 px-6 py-3 font-semibold text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
              >
                View Pricing
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Powered by{" "}
              <a
                href="https://symplyai.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white underline transition-colors"
              >
                SymplyAI
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

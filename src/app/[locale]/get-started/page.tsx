/**
 * /get-started — Onboarding landing page for PhotoForge AI.
 *
 * PURPOSE:
 * Marketing-optimized entry point targeting "how to create product photos with AI"
 * search intent. Shows 3-step process, feature highlights, and CTAs.
 *
 * Created 2026-04-15 — W4-06 pSEO expansion.
 */

import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://aiproductphotomaker.com";
const PRODUCT_NAME = "PhotoForge AI";

export const metadata: Metadata = {
  title: `Get Started — ${PRODUCT_NAME}`,
  description:
    "Create professional product photos in 3 easy steps. Upload your product, choose a background scene, and download studio-quality images — free, no photography skills needed.",
  alternates: { canonical: `${SITE_URL}/get-started` },
  openGraph: {
    title: `Get Started with ${PRODUCT_NAME}`,
    description: "Create studio-quality product photos with AI. No photography skills needed.",
    url: `${SITE_URL}/get-started`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: PRODUCT_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Get Started with ${PRODUCT_NAME}`,
    description: "AI product photo generator — studio-quality images in seconds.",
    images: ["/opengraph-image"],
  },
};

const STEPS = [
  {
    number: "1",
    title: "Upload Your Product",
    description: "Take a photo of your product with any smartphone. No studio setup needed — the AI handles background removal, relighting, and shadow generation.",
  },
  {
    number: "2",
    title: "Choose a Background Scene",
    description: "Select from pure white (Amazon-compliant), lifestyle scenes, gradient studio backdrops, seasonal themes, or custom colors. AI adjusts lighting to match.",
  },
  {
    number: "3",
    title: "Download Pro-Quality Photos",
    description: "Get studio-quality product images ready for Amazon, Shopify, Etsy, or any marketplace. Pro plans support batch processing for large catalogs.",
  },
];

const FEATURES = [
  { title: "No Photography Skills Needed", description: "AI turns smartphone snapshots into professional e-commerce photos that compete with $200+ studio shoots." },
  { title: "Free Product Photos", description: "Generate up to 3 product photos for free. Pro for unlimited generations and higher resolution outputs." },
  { title: "Amazon-Ready Backgrounds", description: "Pure white backgrounds meet Amazon's main image requirements. Lifestyle scenes perfect for secondary images." },
  { title: "Batch Processing", description: "Pro plans let you process entire product catalogs at once — ideal for sellers with hundreds of SKUs." },
];

export default function GetStartedPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Get Started", item: `${SITE_URL}/get-started` },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
            {PRODUCT_NAME}
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Create Product Photos in{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
            3 Simple Steps
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          No photography equipment needed. Upload a product snapshot, pick a
          background, and get studio-quality images in seconds.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative rounded-2xl border border-gray-800 bg-gray-900/50 p-8 text-center">
              <span className="absolute top-4 left-4 text-xs font-bold text-indigo-400">STEP {step.number}</span>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10 text-2xl">
                {["📤", "🖼️", "⬇️"][i]}
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{step.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Why Choose {PRODUCT_NAME}?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-gray-800 bg-gray-900/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 to-sky-950/20 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Ready? Create Your First Product Photo Now.</h2>
          <p className="mt-2 text-gray-400">Free to try — no account needed.</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-8 py-3.5 text-base font-semibold text-white hover:opacity-90 transition-opacity">
              Create Product Photos &rarr;
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center rounded-full border border-gray-700 px-8 py-3.5 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-all">
              View Pro Plans
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.</p>
      </footer>
    </main>
  );
}

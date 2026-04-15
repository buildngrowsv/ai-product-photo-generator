/**
 * src/app/blog/page.tsx — Standalone blog index (no locale prefix).
 *
 * WHY THIS EXISTS:
 * The primary blog lives at [locale]/blog/page.tsx. But with next-intl
 * middleware using localePrefix "as-needed", /blog/[slug] dynamic routes
 * fail because next-intl doesn't properly rewrite nested dynamic paths
 * for the default locale. This standalone route bypasses middleware entirely
 * (blog is excluded from the matcher) and renders the same content.
 *
 * All other DD clones use this pattern: standalone blog/ + [locale]/blog/.
 * vortex-build-4821 (2026-04-15): Created to fix blog post 404s.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/config/blog-posts";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.NEXT_PUBLIC_APP_URL?.trim() ||
  "https://aiproductphotomaker.com"
).replace(/\/$/, "");

export const metadata: Metadata = {
  title: "AI Product Photography Blog | PhotoForge AI",
  description:
    "Expert guides on AI product photography for e-commerce sellers. Compare tools, learn best practices, and discover how AI can replace expensive studio photoshoots for Amazon, Shopify, and Etsy listings.",
  keywords: [
    "ai product photography blog",
    "product photo guide ecommerce",
    "amazon product photos ai",
    "ai product photo tips",
    "e-commerce photography blog",
    "photoforge ai blog",
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "AI Product Photography Blog | PhotoForge AI",
    description:
      "Expert guides on AI product photography for e-commerce sellers. Compare tools, learn best practices, and discover how AI can replace expensive studio photoshoots.",
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: "PhotoForge AI",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Photography Blog | PhotoForge AI",
    description:
      "Expert guides on AI product photography for e-commerce sellers. Compare tools, learn best practices, and replace expensive studio photoshoots.",
    images: ["/opengraph-image"],
  },
};

const CATEGORY_STYLES: Record<string, string> = {
  Comparisons: "bg-blue-900/50 text-blue-300 border-blue-700/50",
  Reviews: "bg-indigo-900/50 text-indigo-300 border-indigo-700/50",
  Guides: "bg-violet-900/50 text-violet-300 border-violet-700/50",
};

function getCategoryStyle(category: string): string {
  return (
    CATEGORY_STYLES[category] ||
    "bg-gray-800 text-gray-300 border-gray-700"
  );
}

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-indigo-300 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-gray-200">Blog</span>
          </nav>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-indigo-400">
            AI Product Photography
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Blog &amp; Guides
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-400">
            Expert guides on AI product photography for Amazon, Shopify, and
            Etsy sellers. Compare tools, learn best practices, and cut your
            photography costs with AI.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-200 hover:border-indigo-700/60 hover:bg-gray-900 hover:shadow-lg hover:shadow-indigo-950/40"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getCategoryStyle(post.category)}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {post.readingTimeMinutes} min read
                  </span>
                </div>
                <h2 className="mb-2 text-lg font-semibold leading-snug text-gray-100 group-hover:text-indigo-300 transition-colors">
                  {post.title}
                </h2>
                <p className="flex-1 text-sm leading-relaxed text-gray-400">
                  {post.description}
                </p>
                <div className="mt-5 flex items-center text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  Read article
                  <svg
                    className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-800 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-xl border border-indigo-800/40 bg-indigo-950/40 p-10 text-center shadow-lg shadow-indigo-950/30">
          <h2 className="mb-2 text-2xl font-bold">
            Ready to create professional product photos?
          </h2>
          <p className="mb-7 text-gray-400">
            Upload your product image and get studio-quality AI photos in
            seconds — free to start, no signup required.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
            >
              Try PhotoForge AI Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-5 text-xs text-gray-500">
            3 free images daily · No credit card · No watermarks
          </p>
        </div>
      </section>
    </main>
  );
}

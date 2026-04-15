/**
 * src/app/[locale]/blog/[slug]/page.tsx — Individual blog post page.
 *
 * WHAT THIS PAGE DOES:
 * Renders a full SEO article from BLOG_POSTS config. Generates static params
 * for all slugs so articles are pre-rendered at build time (no SSR on first hit).
 *
 * SEO:
 * - Per-article metadata (title, description, keywords, canonical URL)
 * - Article JSON-LD structured data (Article schema for Google News / rich results)
 * - Open Graph and Twitter card metadata
 * - Breadcrumb navigation (BreadcrumbList schema)
 * - Internal links back to blog index, homepage, and /pricing
 *
 * 404 HANDLING:
 * If slug doesn't match any BLOG_POSTS entry, returns Next.js notFound() which
 * renders the 404 page rather than a broken or empty article.
 *
 * DESIGN:
 * Dark blue/indigo palette matching the rest of the site. Prose-style article
 * layout with max-w-3xl for comfortable reading line length.
 *
 * Added 2026-04-14 — blog content initiative.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, getBlogPostBySlug, getAllBlogSlugs } from "@/config/blog-posts";

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.NEXT_PUBLIC_APP_URL?.trim() ||
  "https://aiproductphotomaker.com"
).replace(/\/$/, "");

/* -------------------------------------------------------------------------- */
/*  Static Params — pre-render all blog slugs at build time                   */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

/* -------------------------------------------------------------------------- */
/*  Metadata — per-article SEO metadata                                       */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | PhotoForge AI Blog",
    };
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | PhotoForge AI`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: "article",
      siteName: "PhotoForge AI",
      publishedTime: post.publishedAt,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/opengraph-image"],
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Category badge styles                                                      */
/* -------------------------------------------------------------------------- */

const CATEGORY_STYLES: Record<string, string> = {
  Comparisons: "bg-blue-900/50 text-blue-300 border-blue-700/50",
  Reviews: "bg-indigo-900/50 text-indigo-300 border-indigo-700/50",
  Guides: "bg-violet-900/50 text-violet-300 border-violet-700/50",
};

function getCategoryStyle(category: string): string {
  return CATEGORY_STYLES[category] || "bg-gray-800 text-gray-300 border-gray-700";
}

/* -------------------------------------------------------------------------- */
/*  Page Component                                                             */
/* -------------------------------------------------------------------------- */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  /* ── JSON-LD: Article schema ─────────────────────────────────────────── */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "PhotoForge AI",
    },
    publisher: {
      "@type": "Organization",
      name: "PhotoForge AI",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: post.keywords.join(", "),
  };

  /* ── JSON-LD: BreadcrumbList ─────────────────────────────────────────── */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  /* ── Related posts (excluding current) ──────────────────────────────── */
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-gray-950 text-gray-100">

        {/* ── Article Header ───────────────────────────────────────────────── */}
        <header className="border-b border-gray-800 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-indigo-300 transition-colors">
                Home
              </Link>
              <span className="mx-2 text-gray-600">/</span>
              <Link href="/blog" className="hover:text-indigo-300 transition-colors">
                Blog
              </Link>
              <span className="mx-2 text-gray-600">/</span>
              <span className="text-gray-300 line-clamp-1">{post.title}</span>
            </nav>

            {/* Category + meta */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getCategoryStyle(post.category)}`}
              >
                {post.category}
              </span>
              <span className="text-xs text-gray-500">
                {post.readingTimeMinutes} min read
              </span>
              <time
                dateTime={post.publishedAt}
                className="text-xs text-gray-500"
              >
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
              {post.title}
            </h1>

            {/* Description lead */}
            <p className="mt-4 text-lg leading-relaxed text-gray-400">
              {post.description}
            </p>
          </div>
        </header>

        {/* ── Article Body ─────────────────────────────────────────────────── */}
        <article className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Table of Contents */}
            <nav className="mb-10 rounded-xl border border-gray-800 bg-gray-900/50 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-400">
                In this article
              </p>
              <ol className="space-y-1.5">
                {post.sections.map((section, index) => (
                  <li key={index}>
                    <a
                      href={`#section-${index}`}
                      className="text-sm text-gray-400 hover:text-indigo-300 transition-colors"
                    >
                      {index + 1}. {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Sections */}
            <div className="space-y-10">
              {post.sections.map((section, index) => (
                <section key={index} id={`section-${index}`}>
                  <h2 className="mb-4 text-2xl font-semibold text-gray-100">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.body.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="leading-relaxed text-gray-300"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* ── CTA Block ──────────────────────────────────────────────── */}
            <div className="mt-14 rounded-xl border border-indigo-800/40 bg-indigo-950/40 p-8 text-center shadow-lg shadow-indigo-950/30">
              <h2 className="mb-2 text-2xl font-bold">{post.ctaHeading}</h2>
              <p className="mb-6 text-gray-400">{post.ctaBody}</p>
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
              <p className="mt-4 text-xs text-gray-500">
                3 free images daily · No credit card · No watermarks
              </p>
            </div>
          </div>
        </article>

        {/* ── Related Articles ─────────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-gray-800 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-xl font-semibold text-gray-100">
                Related Articles
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition-all hover:border-indigo-700/50 hover:bg-gray-900"
                  >
                    <span
                      className={`mb-2 self-start rounded-full border px-2 py-0.5 text-xs font-medium ${getCategoryStyle(related.category)}`}
                    >
                      {related.category}
                    </span>
                    <h3 className="text-sm font-medium leading-snug text-gray-200 group-hover:text-indigo-300 transition-colors">
                      {related.title}
                    </h3>
                    <span className="mt-3 text-xs text-indigo-400">
                      Read &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Back to blog ─────────────────────────────────────────────────── */}
        <div className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-indigo-300"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              All articles
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

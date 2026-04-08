import type { Metadata } from "next";
import Link from "next/link";

const canonicalPath = "/shopify-product-photos";
const canonicalUrl = `https://aiproductphotomaker.com${canonicalPath}`;

const faqItems = [
  {
    question: "Can AI product photos work for a Shopify store without a studio?",
    answer:
      "Yes. For most Shopify catalogs, a clean source image and a strong product-focused scene are enough to create hero images, collection thumbnails, lifestyle variants, and ad creative without booking a studio session every time a new SKU ships.",
  },
  {
    question: "What kind of Shopify products benefit most from AI product photography?",
    answer:
      "Accessories, skincare, packaged food, home goods, candles, apparel add-ons, and electronics all benefit because the same product usually needs several image variants across PDPs, collection pages, email, paid social, and retargeting.",
  },
  {
    question: "How many image styles should a Shopify seller create per product?",
    answer:
      "A strong baseline is three: one clean storefront image, one contextual lifestyle image, and one higher-contrast image for paid ads or promotions. That gives the product enough range without creating visual chaos across the catalog.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Product Photography for Shopify Stores: No Photographer Needed",
  description:
    "A practical Shopify-focused guide to AI product photography, including workflow, image types that convert, and when to use AI instead of a traditional studio shoot.",
  author: {
    "@type": "Organization",
    name: "SymplyAI",
  },
  publisher: {
    "@type": "Organization",
    name: "PhotoForge AI",
  },
  mainEntityOfPage: canonicalUrl,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aiproductphotomaker.com"),
  title: "AI Product Photography for Shopify Stores | PhotoForge AI",
  description:
    "Create Shopify-ready product photos with AI. Learn how to build storefront, collection, and ad-ready visuals without paying for a photographer.",
  keywords: [
    "ai product photography shopify",
    "shopify product photos ai",
    "shopify product photo generator",
    "ecommerce product photography ai",
    "shopify hero image ai",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "AI Product Photography for Shopify Stores",
    description:
      "A seller-focused playbook for creating Shopify-ready product imagery with AI instead of expensive photo shoots.",
    type: "article",
    url: canonicalUrl,
    siteName: "PhotoForge AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Photography for Shopify Stores",
    description:
      "Learn how Shopify sellers can turn one simple product image into storefront, collection, and ad-ready visuals with AI.",
  },
};

export default function ShopifyProductPhotosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-gray-950 text-white">
        <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Shopify Product Photos</span>
          </nav>

          <header className="mb-12 space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Shopify Seller SEO Page
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              AI Product Photography for Shopify Stores, Without Hiring a Photographer
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-gray-300">
              Shopify merchants do not just need one good image. They need a storefront hero, a
              collection thumbnail, email creative, social assets, and a repeatable visual system
              for every new product launch. AI product photography lets a lean team create those
              assets from one usable source image instead of paying for a new studio setup every
              time inventory changes.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-gray-400">
              <span className="rounded-full border border-white/10 px-3 py-1">
                Target keyword: ai product photography shopify
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1">
                Buyer intent: merchants updating product pages fast
              </span>
            </div>
          </header>

          <section className="mb-12 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Best use case</p>
              <p className="mt-3 text-3xl font-semibold text-white">SKU launches</p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Create launch-ready visuals as soon as new inventory or a seasonal variant arrives.
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">What Shopify needs</p>
              <p className="mt-3 text-3xl font-semibold text-amber-300">Consistency</p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Product pages convert better when the catalog feels visually coordinated.
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Why AI wins</p>
              <p className="mt-3 text-3xl font-semibold text-white">Fast iteration</p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Sellers can test a clean image, a lifestyle image, and a promo look in minutes.
              </p>
            </div>
          </section>

          <section className="space-y-6 text-base leading-8 text-gray-300">
            <h2 className="text-3xl font-semibold text-white">
              Why Shopify product imagery is a speed problem, not just a design problem
            </h2>
            <p>
              Shopify stores change fast. New colorways arrive, bundles get created, seasonal
              campaigns need fresh visuals, and best sellers deserve better hero images than the
              first phone photo the team uploaded months ago. The friction is not knowing that good
              images matter. The friction is the cost and delay of producing them every time the
              catalog changes.
            </p>
            <p>
              An AI product photo workflow fixes that operational bottleneck. Instead of treating
              product photography as a one-time studio event, you can treat it like a repeatable
              content system. Upload the product, pick the use case, generate a few scenes, and
              publish the strongest version to the storefront, collection grid, and campaign assets.
              That gives a Shopify store the visual polish of a larger brand without the same labor
              cost.
            </p>
          </section>

          <section className="mt-14 space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              The Shopify image workflow that actually scales
            </h2>
            <div className="space-y-5">
              {[
                {
                  title: "1. Start with the image that shows the product clearly",
                  body:
                    "The source image does not need to look premium. It needs to show the product shape, texture, and edges clearly enough for the AI to build from.",
                },
                {
                  title: "2. Decide which Shopify surface you are creating for",
                  body:
                    "A storefront hero, collection tile, PDP image, and paid social image do not need the same background or composition. AI performs better when the destination is defined first.",
                },
                {
                  title: "3. Generate three variants per SKU",
                  body:
                    "Use one clean catalog-safe image, one richer lifestyle image, and one more dramatic promotional variant. That gives the merchandising team options without wasting time.",
                },
                {
                  title: "4. Keep the visual language consistent",
                  body:
                    "When a brand finds a lighting style and background family that works, reusing it across products helps the storefront look deliberate instead of patchy.",
                },
              ].map((step) => (
                <div key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-gray-300">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              What images usually convert best on Shopify
            </h2>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-white/[0.05] text-gray-200">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Surface</th>
                    <th className="px-5 py-4 font-semibold">Best visual style</th>
                    <th className="px-5 py-4 font-semibold">Why it works</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-white/[0.02] text-gray-300">
                  <tr>
                    <td className="px-5 py-4">Homepage hero</td>
                    <td className="px-5 py-4">Lifestyle or branded studio scene</td>
                    <td className="px-5 py-4">Gives the product emotional context and premium feel.</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">Collection page</td>
                    <td className="px-5 py-4">Simple, clean, repeatable composition</td>
                    <td className="px-5 py-4">Helps multiple products look coherent at a glance.</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">Product detail page</td>
                    <td className="px-5 py-4">Clean product image plus one contextual variant</td>
                    <td className="px-5 py-4">Balances clarity with enough persuasion to drive purchase.</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">Paid social</td>
                    <td className="px-5 py-4">Higher contrast with stronger scene design</td>
                    <td className="px-5 py-4">Stops the scroll better than a plain listing image.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-14 space-y-6 text-base leading-8 text-gray-300">
            <h2 className="text-3xl font-semibold text-white">
              When AI beats a photographer for Shopify teams
            </h2>
            <p>
              AI is strongest when the store needs repeatable assets more than perfect art direction.
              If you are building out bundles, refreshing low-performing PDP images, creating seasonal
              promo sets, or launching lots of new SKUs, speed matters more than a bespoke set build.
              That is where AI product photography becomes an unfair advantage for a small team.
            </p>
            <p>
              Traditional photography still makes sense for flagship campaigns or brand shoots. But
              most Shopify operators are not blocked by a lack of cinematic campaign imagery. They are
              blocked by dozens of product pages that deserve a cleaner, better-converting visual
              system right now.
            </p>
          </section>

          <section className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-3xl font-semibold text-white">Frequently asked questions</h2>
            <div className="mt-8 space-y-4">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-2xl border border-white/10 bg-gray-950/70 p-5">
                  <summary className="cursor-pointer list-none text-lg font-medium text-white">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-gray-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-3xl border border-amber-500/20 bg-amber-500/10 p-8 text-center">
            <h2 className="text-3xl font-semibold text-white">
              Build your Shopify image system faster
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-200">
              Generate clean storefront images, lifestyle variants, and ad-ready product creative
              from one product photo instead of booking another shoot.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-amber-400"
              >
                Try PhotoForge AI
              </Link>
              <Link
                href="/photoroom-alternative"
                className="rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"
              >
                Compare Alternatives
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

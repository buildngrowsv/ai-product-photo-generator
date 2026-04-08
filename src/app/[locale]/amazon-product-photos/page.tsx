import type { Metadata } from "next";
import Link from "next/link";

const canonicalPath = "/amazon-product-photos";
const canonicalUrl = `https://aiproductphotomaker.com${canonicalPath}`;

const faqItems = [
  {
    question: "Can AI help create Amazon-compliant product images?",
    answer:
      "AI can help sellers generate strong white-background product images and secondary lifestyle images, but the seller still needs to review the output before publishing. The main image should stay product-first and follow Amazon marketplace rules.",
  },
  {
    question: "What is the best use of AI for Amazon listings?",
    answer:
      "The highest-leverage use is creating the main white-background hero plus a set of supporting secondary images that clarify features, texture, packaging, and scale. AI reduces the time needed to make those variations.",
  },
  {
    question: "Why not just remove the background manually?",
    answer:
      "Manual background removal solves only one step. Amazon listings still need cleaner lighting, better composition, consistent framing, and useful secondary imagery. AI handles more of the visual polish in one workflow.",
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
  headline: "Amazon Product Photo Generator: Create White Background Photos with AI",
  description:
    "A practical guide for Amazon sellers who need compliant white-background product images and stronger secondary visuals without a full photography workflow.",
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
  title: "Amazon Product Photo Generator | White Background Photos with AI",
  description:
    "Create Amazon-ready white background product photos with AI and generate better secondary listing images faster.",
  keywords: [
    "amazon product photo ai generator",
    "amazon white background photo ai",
    "amazon listing images ai",
    "amazon product image generator",
    "white background product photos ai",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Amazon Product Photo Generator",
    description:
      "Use AI to create Amazon-ready white background photos and stronger listing image sets without another product shoot.",
    type: "article",
    url: canonicalUrl,
    siteName: "PhotoForge AI",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon Product Photo Generator",
    description:
      "A seller-focused guide to creating Amazon-ready white background images and secondary listing assets with AI.",
  },
};

export default function AmazonProductPhotosPage() {
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
            <span>Amazon Product Photos</span>
          </nav>

          <header className="mb-12 space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Amazon Seller SEO Page
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Amazon Product Photo Generator: Create White Background Photos with AI
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-gray-300">
              Amazon sellers live and die by image quality. The main image has to be clear,
              compliant, and product-first. The secondary images still need to explain features,
              packaging, texture, and use cases. AI product photography helps sellers build that
              image stack faster without getting stuck in manual background cleanup and endless
              re-shoots.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-gray-400">
              <span className="rounded-full border border-white/10 px-3 py-1">
                Target keyword: amazon product photo ai generator
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1">
                Buyer intent: listing-ready marketplace visuals
              </span>
            </div>
          </header>

          <section className="mb-12 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Main image goal</p>
              <p className="mt-3 text-3xl font-semibold text-white">Clarity</p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                The product needs to read instantly in search results and on mobile.
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Best AI use</p>
              <p className="mt-3 text-3xl font-semibold text-amber-300">White background first</p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Create the compliant hero, then expand into better supporting visuals.
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Why it matters</p>
              <p className="mt-3 text-3xl font-semibold text-white">CTR and trust</p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Stronger listing images make the offer feel more credible before shoppers read.
              </p>
            </div>
          </section>

          <section className="space-y-6 text-base leading-8 text-gray-300">
            <h2 className="text-3xl font-semibold text-white">
              Amazon sellers need both compliance and persuasion
            </h2>
            <p>
              Amazon is stricter than a branded storefront. The main image usually has to stay on a
              white background, the product needs to dominate the frame, and anything that feels too
              editorial can backfire. That makes sellers think they only need background removal,
              but the real challenge is broader than that. The image still needs clean lighting,
              strong edges, consistent scale, and enough polish to compete with the listings around
              it.
            </p>
            <p>
              AI helps by upgrading the entire workflow. Instead of manually clipping the product,
              touching up shadows, and making a second pass for secondary images, the seller can
              generate a cleaner white-background hero and then create supporting visuals that show
              packaging, context, and feature emphasis. The output is faster to produce and easier
              to repeat across a catalog.
            </p>
          </section>

          <section className="mt-14 space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              A practical Amazon image workflow
            </h2>
            <div className="space-y-5">
              {[
                {
                  title: "1. Capture a source image with strong product edges",
                  body:
                    "The product should stand out clearly. This gives the AI enough shape information to create a cleaner listing image without losing important detail.",
                },
                {
                  title: "2. Generate the main white-background hero first",
                  body:
                    "Start with the most constrained image because it matters most for search-result click-through. Review the output with Amazon requirements in mind before publishing.",
                },
                {
                  title: "3. Use AI to build the secondary image stack",
                  body:
                    "Create additional images that explain texture, components, use case, packaging, or premium feel. That is where a listing often earns the sale after the shopper clicks.",
                },
                {
                  title: "4. Standardize the look across the catalog",
                  body:
                    "Once a seller finds a white-background style and a supporting visual approach that works, they should apply it consistently to related SKUs.",
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
            <h2 className="text-3xl font-semibold text-white">What each Amazon image should do</h2>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-white/[0.05] text-gray-200">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Image slot</th>
                    <th className="px-5 py-4 font-semibold">Recommended style</th>
                    <th className="px-5 py-4 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-white/[0.02] text-gray-300">
                  <tr>
                    <td className="px-5 py-4">Main image</td>
                    <td className="px-5 py-4">White background, product-first</td>
                    <td className="px-5 py-4">Win the click in search results and look compliant.</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">Secondary image 1</td>
                    <td className="px-5 py-4">Closer detail shot</td>
                    <td className="px-5 py-4">Help the shopper understand texture, controls, or finish.</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">Secondary image 2</td>
                    <td className="px-5 py-4">Usage or packaging context</td>
                    <td className="px-5 py-4">Clarify what arrives and how the product fits real life.</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">Secondary image 3+</td>
                    <td className="px-5 py-4">Feature-focused variants</td>
                    <td className="px-5 py-4">Reduce uncertainty and support conversion after the click.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-14 space-y-6 text-base leading-8 text-gray-300">
            <h2 className="text-3xl font-semibold text-white">
              Why AI beats manual editing for most Amazon sellers
            </h2>
            <p>
              Sellers often start by removing the background in one tool, then opening a second tool
              to clean shadows, then exporting a third version for marketing. That fragmented process
              is exactly what slows down listing operations. An AI product photo generator reduces the
              number of passes because it helps with the image as a whole, not just the cutout.
            </p>
            <p>
              The result is not just time saved. It is better listing hygiene. More products get the
              images they deserve, more secondary visuals get published, and the catalog stops feeling
              uneven. That kind of consistency matters on Amazon because shoppers compare offers very
              quickly.
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
              Build your Amazon listing images faster
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-200">
              Start with a clean product shot, generate a stronger white-background hero, then build
              the supporting visuals that help Amazon shoppers convert.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-amber-400"
              >
                Try PhotoForge AI
              </Link>
              <Link
                href="/shopify-product-photos"
                className="rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"
              >
                See Shopify Workflow
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

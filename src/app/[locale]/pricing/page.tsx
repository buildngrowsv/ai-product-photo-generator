/**
 * src/app/[locale]/pricing/page.tsx — Product Photo Pro upgrade path.
 *
 * WHY THIS EXISTS (T141, Builder 9, pane1774 swarm 2026-03-25):
 * The repo had no /pricing page. This is the [locale]-routed version because
 * next-intl requires all pages under src/app/[locale]/ to be served correctly.
 *
 * CHECKOUT FLOW:
 * "Upgrade to Pro" → POST /api/stripe/create-checkout { plan: "pro" }
 * → { url: "https://checkout.stripe.com/..." } → redirect.
 *
 * The create-checkout route has the price ID hardcoded:
 *   price_1TEUbhGsPhSTDD4x6Rcg9hKo = AI Product Photo Pro ($11.99/mo)
 * No NEXT_PUBLIC env var needed — the pricing page just sends { plan: "pro" }.
 * The route handles everything else server-side.
 *
 * RESPONSE SHAPE: { url: string } (NOT { checkoutUrl })
 * Different from some other fleet repos — use data.url here.
 *
 * THEME:
 * Clean white/blue professional aesthetic matching the product photography niche.
 * Target: brands, ecommerce sellers, agencies needing studio-quality product shots.
 *
 * Builder 9 — T141-A — pane1774 2026-03-25.
 */
"use client";

import { useState } from "react";

const PRO_FEATURES = [
  "Unlimited AI product photo transformations",
  "White background removal & replacement",
  "8 professional studio environments",
  "4K high-resolution output",
  "Batch processing up to 10 images",
  "Commercial license included",
  "Priority processing queue",
];

const FREE_FEATURES = [
  "3 free product photo transformations/day",
  "Standard resolution output",
  "Single image processing",
];

const FAQ = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your Stripe billing portal with one click. No lock-in, no questions.",
  },
  {
    q: "Is the output commercial-use ready?",
    a: "Yes. Pro images include a full commercial license — use them on Amazon, Shopify, ads, anywhere.",
  },
  {
    q: "What types of products work best?",
    a: "Any physical product — apparel, electronics, food packaging, jewelry, cosmetics. Clean source photos get the best results.",
  },
  {
    q: "Is my payment secure?",
    a: "Yes. Checkout is handled entirely by Stripe — your card details never touch our servers.",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpgrade() {
    setLoading(true);
    setError(null);
    try {
      /* POST /api/stripe/create-checkout with plan slug.
       * The route maps "pro" → price_1TEUbhGsPhSTDD4x6Rcg9hKo ($11.99/mo).
       * Returns { url } — redirect browser to Stripe hosted checkout. */
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "pro" }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed. Please try again.");
      }

      /* This repo's checkout returns { url } (not { checkoutUrl }). */
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto max-w-5xl px-4 py-20">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium">
            Professional Product Photography · AI-Powered
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              Simple Pricing
            </span>
          </h1>
          <p className="text-xl text-blue-100/70 max-w-2xl mx-auto">
            Transform product photos into studio-quality images with AI. Start free,
            upgrade for unlimited commercial-grade results.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">

          {/* Free */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white/80">Free</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-white/50">/forever</span>
              </div>
              <p className="mt-2 text-sm text-white/50">No credit card required</p>
            </div>
            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="text-blue-400/60">✓</span>{f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full rounded-lg border border-white/20 py-3 text-sm font-medium text-white/70 hover:bg-white/5 transition-colors"
            >
              Continue Free
            </button>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-blue-500/50 bg-gradient-to-b from-blue-900/40 to-blue-950/20 p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-300">Pro</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">$11.99</span>
                <span className="text-white/50">/month</span>
              </div>
              <p className="mt-2 text-sm text-white/50">Cancel anytime</p>
            </div>
            <ul className="space-y-3 mb-8">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white">
                  <span className="text-blue-400">✓</span>{f}
                </li>
              ))}
            </ul>

            {error && (
              <p className="mb-4 rounded-lg bg-red-900/40 border border-red-500/30 px-3 py-2 text-xs text-red-300">
                {error}
              </p>
            )}

            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 py-3 text-sm font-bold text-white hover:from-blue-400 hover:to-cyan-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Redirecting to Stripe…" : "Upgrade to Pro"}
            </button>
            <p className="mt-3 text-center text-xs text-white/40">
              Secure checkout via Stripe · No card stored on our servers
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-8 text-white/80">Frequently Asked</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="font-medium text-white/90 mb-2">{q}</p>
                <p className="text-sm text-white/50">{a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

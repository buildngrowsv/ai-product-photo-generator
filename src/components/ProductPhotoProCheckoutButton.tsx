"use client";

/**
 * ProductPhotoProCheckoutButton — client component that POSTs to
 * /api/stripe/create-checkout and redirects the user to Stripe Checkout.
 *
 * WHY separate client component:
 * The main page (page.tsx) is a server component for performance. Only the
 * interactive checkout button needs client-side JS. Standard Next.js App Router
 * pattern: server component renders the shell, client component handles events.
 *
 * WHY API route instead of a static buy.stripe.com link:
 * The buy.stripe.com link previously in page.tsx (Builder 11, 2026-03-25) works
 * as a static fallback but has no webhook support, no session metadata, and
 * hardcodes no domain-specific redirect. The API route approach gives us all of
 * those — and works across Vercel preview URLs without config changes.
 *
 * Reference pattern: TattooProCheckoutButton (commit 453a419),
 * UpscalerProCheckoutButton (commit 7f401e7), BgRemoverProCheckoutButton (cad2a4f),
 * TtsProCheckoutButton (same session).
 *
 * Builder 9 (2026-03-25, T-productphoto-stripe).
 */

import { useState } from "react";

interface ProductPhotoProCheckoutButtonProps {
  /** Text label shown on the button */
  label: string;
  /** Optional className for styling */
  className?: string;
}

export function ProductPhotoProCheckoutButton({
  label,
  className = "",
}: ProductPhotoProCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "pro" }),
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        throw new Error(json.error || "Failed to start checkout.");
      }
      // Redirect to Stripe-hosted checkout page.
      window.location.href = json.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setLoading(false);
    }
    // Do not reset loading after redirect — keeps button disabled during navigation.
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        {loading ? "Redirecting to checkout…" : label}
      </button>
      {error ? (
        <p className="text-xs text-red-400 text-center">{error}</p>
      ) : null}
    </div>
  );
}

/**
 * [locale]/refunds/page.tsx — Refund policy (locale-routed)
 *
 * Same routing rationale as [locale]/privacy — keeps /refunds working with next-intl middleware.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | PhotoForge AI",
  description:
    "Refund and cancellation policy for PhotoForge AI subscriptions and billing disputes.",
};

export default function RefundsPage() {
  return (
    <main className="min-h-screen bg-gray-950 px-4 py-16 text-gray-100">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">PhotoForge AI</p>
          <h1 className="text-4xl font-semibold">Refund Policy</h1>
          <p className="text-sm text-gray-400">Last updated: March 27, 2026</p>
          <p className="text-gray-300">
            This policy explains how cancellations and refund requests are handled for PhotoForge AI.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">Subscriptions</h2>
          <p className="text-gray-300">
            Monthly subscriptions can be cancelled at any time. Cancellation stops future renewals
            but does not retroactively reverse charges already processed for the active billing period.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">When Refunds May Be Considered</h2>
          <p className="text-gray-300">
            Refund requests may be reviewed for duplicate charges, billing mistakes, or material
            service failures that prevented reasonable use of the product after purchase.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">How To Request One</h2>
          <p className="text-gray-300">
            Contact support through the storefront or sales listing used to buy the app and include
            the Stripe receipt email, charge date, and a brief explanation of the issue. Approved
            refunds are issued back to the original payment method through Stripe.
          </p>
        </section>
      </div>
    </main>
  );
}

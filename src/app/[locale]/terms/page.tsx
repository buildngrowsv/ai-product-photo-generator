/**
 * [locale]/terms/page.tsx — Terms of service (locale-routed)
 *
 * Routed under [locale] for the same reason as privacy: middleware + localePrefix
 * "as-needed" expects policy pages beside [locale]/pricing. See privacy/page.tsx.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | PhotoForge AI",
  description:
    "The customer terms covering access, acceptable use, commercial rights, and subscription billing for PhotoForge AI.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-950 px-4 py-16 text-gray-100">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">PhotoForge AI</p>
          <h1 className="text-4xl font-semibold">Terms of Service</h1>
          <p className="text-sm text-gray-400">Last updated: March 27, 2026</p>
          <p className="text-gray-300">
            These terms govern use of PhotoForge AI, including free usage, paid subscriptions,
            and commercial use of generated assets.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">Service Access</h2>
          <p className="text-gray-300">
            PhotoForge AI provides AI-assisted product photo generation on an as-available basis.
            We may modify, pause, or improve the service as needed to maintain reliability,
            security, or compliance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">Acceptable Use</h2>
          <p className="text-gray-300">
            You may not use the service for unlawful content, deceptive advertising, infringement,
            abuse of third-party rights, or attempts to disrupt the platform, payment flows, or
            rate limits.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">Billing</h2>
          <p className="text-gray-300">
            Paid plans renew automatically until cancelled. Prices, taxes, billing intervals, and
            subscription status are presented during Stripe checkout and managed through Stripe.
          </p>
          <p className="text-gray-300">
            You are responsible for keeping payment information current and for any applicable
            taxes associated with your subscription.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">Commercial Rights</h2>
          <p className="text-gray-300">
            Subject to these terms and any third-party provider restrictions, Pro customers may
            use generated outputs commercially. You remain responsible for confirming that your
            source material and final use comply with marketplace, advertising, and intellectual
            property requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">Limitation of Liability</h2>
          <p className="text-gray-300">
            To the maximum extent allowed by law, PhotoForge AI is not liable for indirect,
            incidental, special, consequential, or exemplary damages arising from service use,
            downtime, or generated outputs.
          </p>
        </section>
      </div>
    </main>
  );
}

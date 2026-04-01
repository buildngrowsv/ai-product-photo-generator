/**
 * [locale]/privacy/page.tsx — Privacy policy (locale-routed)
 *
 * WHY UNDER [locale]:
 * next-intl middleware rewrites default-locale paths like /privacy internally to the
 * [locale] segment. When the page lived only at app/privacy/page.tsx, /privacy returned
 * 404 in dev/prod because there was no matching app/[locale]/privacy route. This file
 * mirrors the app/pricing → [locale]/pricing pattern (Builder 9, T141).
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PhotoForge AI",
  description:
    "How PhotoForge AI collects, uses, and protects product images, billing data, and analytics information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-950 px-4 py-16 text-gray-100">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">PhotoForge AI</p>
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: March 27, 2026</p>
          <p className="text-gray-300">
            This policy explains what data we collect to run PhotoForge AI, how we use it,
            and what choices customers have.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">What We Collect</h2>
          <p className="text-gray-300">
            We collect the images and prompts you submit so we can generate product photos,
            plus technical metadata such as IP address, browser details, and request logs used
            for abuse prevention, troubleshooting, and service analytics.
          </p>
          <p className="text-gray-300">
            When you upgrade, Stripe processes payment information directly. We receive limited
            billing metadata from Stripe, such as subscription status, plan details, and
            transaction identifiers. We do not store full card numbers on our servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">How We Use Data</h2>
          <p className="text-gray-300">
            Submitted images and prompts are used to generate the requested output, improve
            reliability, investigate misuse, and enforce free-tier or subscription entitlements.
          </p>
          <p className="text-gray-300">
            Operational data may also be used to monitor performance, prevent fraud, and support
            customers who report a billing or product issue.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">Third-Party Processors</h2>
          <p className="text-gray-300">
            PhotoForge AI relies on third-party providers including fal.ai for image generation,
            Stripe for billing, Upstash for entitlement and rate-limit storage, and Vercel for
            hosting and runtime infrastructure. These providers may process the minimum data
            required to deliver their portion of the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">Retention</h2>
          <p className="text-gray-300">
            We retain generated assets, entitlement records, and logs only for as long as needed
            to operate the service, resolve disputes, meet legal obligations, and protect the
            platform from abuse.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-medium">Contact</h2>
          <p className="text-gray-300">
            For privacy requests or billing-related data questions, contact the operator through
            the support channel listed on the storefront or sales listing for this app.
          </p>
        </section>
      </div>
    </main>
  );
}

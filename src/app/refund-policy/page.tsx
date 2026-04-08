/**
 * /refund-policy alias page for AI Product Photo Generator.
 *
 * This product already has /refunds but many directories specifically check
 * /refund-policy as the standard URL. Both paths should be accessible.
 * Re-exports the same refunds content to avoid duplicate page maintenance.
 *
 * Required for directory submissions (Futurepedia, There's An AI For That, etc.)
 */

export const metadata = {
  title: "Refund Policy | AI Product Photo Generator",
  description:
    "Refund and cancellation policy for AI Product Photo Generator powered by SymplyAI.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0b1120] px-4 py-16 text-white">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-3">
          <a
            href="/"
            className="text-sm text-amber-300 hover:text-amber-200 transition-colors"
          >
            ← Back to AI Product Photo Generator
          </a>
          <h1 className="text-4xl font-bold">Refund Policy</h1>
          <p className="text-sm text-slate-400">Last updated: 2026-04-08</p>
        </div>

        <p className="text-slate-300">
          If you were charged in error or would like to request a refund, please
          email{" "}
          <a
            className="text-amber-300 hover:text-amber-200 transition-colors"
            href="mailto:support@symplyai.io"
          >
            support@symplyai.io
          </a>{" "}
          with your Stripe receipt and account email address.
        </p>

        <section className="space-y-3 text-slate-300">
          <p>
            First-time subscription charges requested within 7 days of purchase
            are reviewed for refund eligibility.
          </p>
          <p>
            Duplicate charges and obvious billing mistakes are corrected
            promptly.
          </p>
          <p>
            Refunds may be denied after substantial usage or repeated renewals,
            except where required by applicable law.
          </p>
        </section>
      </div>
    </main>
  );
}

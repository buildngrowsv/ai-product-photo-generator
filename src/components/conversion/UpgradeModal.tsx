/**
 * UpgradeModal — post-generation conversion prompt for AI Product Photo Generator.
 *
 * WHEN IT SHOWS:
 * After the user completes their 3rd free generation (matching "3 free product photos"
 * copy on the landing page). Post-value timing — they've just seen their professional
 * product photo and are in a receptive state.
 *
 * DESIGN STRATEGY — "Value Anchoring":
 * Leads with a celebration of what they just created ("Your photo looks amazing!"),
 * not a restriction ("You've run out of free uses"). Significantly better conversion.
 *
 * COLOR SCHEME:
 * Uses indigo/violet gradient to match PhotoForge AI's brand palette (Tailwind classes).
 *
 * DISMISS BEHAVIOR:
 * Low-friction dismiss — user can keep trying until server hard-blocks at 5.
 * Soft reminder converts better than forced paywalls.
 *
 * CREATED: 2026-03-28 by Custom 5 (conversion optimization sprint — T3ceb2cc2)
 * USED BY: src/app/page.tsx (PhotoForgeAILandingPage)
 * RELATED: src/hooks/useDailyUseTracker.ts
 */
"use client";

import { useEffect, useCallback } from "react";
import { Crown, Check, X } from "lucide-react";

interface UpgradeModalProps {
  open: boolean;
  remainingFree: number;
  onDismiss: () => void;
}

export function UpgradeModal({ open, remainingFree, onDismiss }: UpgradeModalProps) {
  /**
   * Escape key dismissal — standard accessible modal behavior.
   * Users expect Escape to close overlays; not supporting it signals poor-quality UI.
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onDismiss();
    },
    [open, onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent background scroll while modal is visible
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onDismiss}
        aria-hidden="true"
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-2xl bg-gray-900 border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Gradient accent bar — indigo brand */}
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 to-violet-600" />

          {/* Close button */}
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-8">
            {/* Celebration header */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">📸</div>
              <h2
                id="upgrade-modal-title"
                className="text-2xl font-bold text-white mb-2"
              >
                Your photo looks amazing!
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {remainingFree > 0
                  ? `You have ${remainingFree} free generation${remainingFree === 1 ? "" : "s"} left. Go Pro to keep creating without limits.`
                  : "You've used your free product photos today. Upgrade to keep shooting."}
              </p>
            </div>

            {/* Pro plan card */}
            <div className="rounded-xl border-2 border-indigo-500/50 bg-indigo-500/5 p-5 mb-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Crown className="h-4 w-4 text-indigo-400" />
                    <p className="font-semibold text-white text-sm">Pro Plan</p>
                  </div>
                  <p className="text-xs text-gray-400">Unlimited photos + HD resolution</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">$9.90</p>
                  <p className="text-xs text-gray-500">/month</p>
                </div>
              </div>
              <a
                href="#pricing"
                onClick={onDismiss}
                className="block w-full text-center py-2.5 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all"
              >
                Upgrade to Pro — $9.90/mo
              </a>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                "✓ Unlimited photos",
                "✓ HD 2048px resolution",
                "✓ No watermark",
                "✓ Priority generation",
              ].map((feature) => (
                <p key={feature} className="text-xs text-gray-400">{feature}</p>
              ))}
            </div>

            {/* Dismiss */}
            <button
              onClick={onDismiss}
              className="w-full text-xs text-gray-600 hover:text-gray-400 transition-colors py-2"
            >
              {remainingFree > 0
                ? `Maybe later — I still have ${remainingFree} free generation${remainingFree === 1 ? "" : "s"}`
                : "Maybe later"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

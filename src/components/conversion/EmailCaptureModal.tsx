/**
 * EmailCaptureModal — email gate shown before the server rate-limit wall.
 *
 * WHEN IT SHOWS:
 * On the 4th generation attempt. Instead of immediately blocking, we offer:
 * "Give us your email → get 1 bonus product photo free."
 *
 * WHY EMAIL CAPTURE BEFORE PAYWALL:
 * Without this gate: user hits limit and doesn't convert = total loss.
 * With this gate: user gives email = lead worth $5-15 LTV, nurture via drip.
 * Cost of bonus gen: ~$0.04 fal.ai credits. Expected value strongly positive.
 *
 * COLOR SCHEME:
 * Uses indigo/violet to match PhotoForge AI's brand palette (Tailwind classes).
 *
 * CREATED: 2026-03-28 by Custom 5 (conversion optimization sprint — T3ceb2cc2)
 * USED BY: src/app/page.tsx (PhotoForgeAILandingPage)
 * RELATED: src/hooks/useDailyUseTracker.ts, src/app/api/email-capture/route.ts
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { trackEmailCaptureSubmitted } from "@/lib/analytics/ga4-web-events";

interface EmailCaptureModalProps {
  open: boolean;
  onEmailCaptured: (email: string) => void;
  onDismiss: () => void;
}

export function EmailCaptureModal({ open, onEmailCaptured, onDismiss }: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  /** Escape key dismissal */
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setEmail("");
      setValidationError(null);
      setIsSubmitting(false);
    }
  }, [open]);

  function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  /**
   * handleSubmit — POST to /api/email-capture.
   * IMPORTANT: Always calls onEmailCaptured regardless of API success/failure.
   * The user gave their email in good faith; we owe them the bonus generation.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError(null);

    const trimmedEmail = email.trim();
    if (!isValidEmail(trimmedEmail)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      trackEmailCaptureSubmitted();
      await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, source: "product_photo_gate" }),
      });
      // Always proceed — API failure must not punish the user
      onEmailCaptured(trimmedEmail);
    } catch {
      // Network error — still proceed (don't penalize user for our infra issues)
      onEmailCaptured(trimmedEmail);
    } finally {
      setIsSubmitting(false);
    }
  }

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
        aria-labelledby="email-capture-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-2xl bg-gray-900 border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Violet-to-indigo accent bar — differentiates from upgrade modal */}
          <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 to-indigo-600" />

          {/* Close button */}
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-8">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎁</div>
              <h2
                id="email-capture-modal-title"
                className="text-2xl font-bold text-white mb-2"
              >
                Get 1 more free photo
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Enter your email to unlock a bonus generation and save your product photos.
                We&apos;ll occasionally share tips for better product photography.
              </p>
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setValidationError(null); }}
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-gray-500 outline-none focus:border-indigo-500 transition-colors ${
                    validationError ? "border-red-500" : "border-white/10"
                  }`}
                />
                {validationError && (
                  <p className="text-xs text-red-400 mt-1.5">{validationError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Unlocking bonus photo...
                  </>
                ) : (
                  "Get my free bonus photo →"
                )}
              </button>
            </form>

            {/* Trust signal */}
            <p className="text-center text-xs text-gray-600 mb-4">
              No credit card. Unsubscribe anytime. We hate spam too.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-xs text-gray-600">or</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <a
              href="#pricing"
              onClick={onDismiss}
              className="block text-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors mb-3"
            >
              Upgrade to Pro for unlimited photos →
            </a>

            <button
              onClick={onDismiss}
              className="w-full text-xs text-gray-600 hover:text-gray-400 transition-colors py-1.5"
            >
              No thanks, I&apos;m done for today
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

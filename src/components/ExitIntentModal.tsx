"use client";

/**
 * ExitIntentModal — Captures bouncing homepage visitors with a free credits offer.
 *
 * TRIGGERS: Exit intent (mouseleave clientY < 10) or 60% scroll depth.
 * 5-second arm delay prevents false triggers. Shows once per browser (localStorage).
 * Posts to /api/email-capture (Resend Contacts API or server log fallback).
 *
 * CREATED: 2026-04-15 by Builder 2 (prism-exec-6847, pane1776)
 * WIRED IN: src/app/layout.tsx (root layout)
 */

import { useEffect, useState, useCallback, useRef } from "react";

const STORAGE_KEY = "pf_exit_shown";

export default function ExitIntentModal() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const armed = useRef(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* noop */ }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!trimmed) return;
      setSubmitting(true);
      try {
        await fetch("/api/email-capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed, source: "exit_intent" }),
        });
      } catch { /* noop */ }
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* noop */ }
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setVisible(false), 2500);
    },
    [email],
  );

  useEffect(() => {
    try { if (localStorage.getItem(STORAGE_KEY)) return; } catch { return; }

    const armTimeout = setTimeout(() => {
      if (armed.current) return;
      armed.current = true;

      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY < 10) {
          setVisible(true);
          document.removeEventListener("mouseleave", handleMouseLeave);
          window.removeEventListener("scroll", handleScroll);
        }
      };

      const handleScroll = () => {
        const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if (pct > 0.6) {
          setVisible(true);
          window.removeEventListener("scroll", handleScroll);
          document.removeEventListener("mouseleave", handleMouseLeave);
        }
      };

      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("scroll", handleScroll);
      };
    }, 5000);

    return () => clearTimeout(armTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="dialog" aria-label="Special offer" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} aria-hidden="true" />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0f]/95 p-8 shadow-2xl backdrop-blur-xl">
        <button onClick={dismiss} className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white">You&apos;re in!</h3>
            <p className="mt-2 text-sm text-gray-400">3 bonus product photo edits are waiting for you. Sign up to claim them.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-xl font-bold text-white">Wait — get 3 free product photos</h3>
              <p className="mt-2 text-sm text-gray-400 max-w-xs mx-auto">
                Enter your email and we&apos;ll give you 3 bonus AI product photo edits.
                Create studio-quality product images in seconds with PhotoForge AI.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30" autoComplete="email" disabled={submitting} />
              <button type="submit" disabled={submitting} className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50">
                {submitting ? "Unlocking..." : "Get 3 Free Product Photos"}
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}

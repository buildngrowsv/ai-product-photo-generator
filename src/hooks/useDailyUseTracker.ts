/**
 * useDailyUseTracker — localStorage-backed daily generation counter for conversion funneling.
 *
 * PURPOSE:
 * Mirrors the ai-logo-generator conversion pattern (Custom 5, 2026-03-28), adapted for
 * ai-product-photo-generator's free tier ("3 free product photos per day"). The server
 * hard-blocks at 5/24h via IP rate limiting; this hook intercepts users earlier with:
 *   - Upgrade modal after completing 3rd generation (matches "3 free photos" copy)
 *   - Email capture gate on 4th attempt (bonus gen for email before server block)
 *   - Hard upgrade wall from attempt 5+ (server will block regardless)
 *
 * WHY LOCALSTORAGE (not server):
 * Conversion gate timing is UX — the server's IP rate limiter is the true enforcement.
 * localStorage gives instant (no round-trip) reads. If cleared, user might not see modals;
 * the server still stops them. Acceptable tradeoff.
 *
 * RESET LOGIC:
 * Resets at midnight local time. The server uses a rolling 24h window; this uses calendar
 * day. Small mismatch is acceptable for UX conversion purposes.
 *
 * CREATED: 2026-03-28 by Custom 5 (conversion optimization sprint — T3ceb2cc2)
 * USED BY: src/app/page.tsx (PhotoForgeAILandingPage component)
 */

"use client";

import { useState, useEffect, useCallback } from "react";

/** localStorage key for the daily use counter record */
const DAILY_USE_STORAGE_KEY = "productphoto_daily_uses";

/** localStorage key for email capture state — persists across days (one-time capture) */
const EMAIL_CAPTURED_STORAGE_KEY = "productphoto_email_captured";

/**
 * Shape stored in localStorage.
 * date: ISO date string YYYY-MM-DD (local time)
 * count: completed generations today
 */
interface DailyUseRecord {
  date: string;
  count: number;
}

/** Returns today's date as YYYY-MM-DD in local timezone */
function getTodayDateString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/** Reads today's use record from localStorage, auto-resetting if the date changed */
function readDailyUseRecord(): DailyUseRecord {
  if (typeof window === "undefined") return { date: getTodayDateString(), count: 0 };
  try {
    const raw = localStorage.getItem(DAILY_USE_STORAGE_KEY);
    if (!raw) return { date: getTodayDateString(), count: 0 };
    const parsed = JSON.parse(raw) as DailyUseRecord;
    if (parsed.date !== getTodayDateString()) {
      return { date: getTodayDateString(), count: 0 };
    }
    return parsed;
  } catch {
    return { date: getTodayDateString(), count: 0 };
  }
}

/** Writes an updated daily use record to localStorage */
function writeDailyUseRecord(record: DailyUseRecord): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DAILY_USE_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage write failure (private browsing quota) — ignore gracefully
  }
}

/** Returns whether this browser has already completed email capture */
function readEmailCaptured(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(EMAIL_CAPTURED_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

/** Marks email as captured in localStorage — persists across days */
function markEmailCaptured(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(EMAIL_CAPTURED_STORAGE_KEY, "true");
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------------------
// Conversion thresholds
//
// SERVER hard-blocks at 5/24h (IP rate limiter in server-ip-rate-limiter.ts).
// CLIENT shows upgrade nudge at 3 (matches "3 free product photos" in page copy).
// EMAIL GATE fires on attempt 4 — user wants a 4th, we offer bonus for email.
// Above 5: server will block; client shows upgrade wall instead.
// ---------------------------------------------------------------------------
export const FREE_DAILY_LIMIT = 5;
export const UPGRADE_MODAL_THRESHOLD = 3;  // show upgrade nudge after Nth completion
export const EMAIL_GATE_ATTEMPT = 4;       // show email capture on this attempt number

export interface UseDailyUseTrackerReturn {
  todayCount: number;
  remainingFree: number;
  showUpgradeModal: boolean;
  showEmailGate: boolean;
  emailCaptured: boolean;
  recordGeneration: () => void;
  checkGenerationAttempt: () => "allow" | "show_email_gate" | "show_upgrade_modal";
  dismissUpgradeModal: () => void;
  dismissEmailGate: () => void;
  captureEmail: () => void;
}

export function useDailyUseTracker(): UseDailyUseTrackerReturn {
  const [todayCount, setTodayCount] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);

  // Hydrate from localStorage on mount (client-only execution)
  useEffect(() => {
    const record = readDailyUseRecord();
    setTodayCount(record.count);
    setEmailCaptured(readEmailCaptured());
  }, []);

  // remainingFree shows how many gens the user believes they have left.
  // Capped at UPGRADE_MODAL_THRESHOLD which matches "3 free photos per day" copy.
  const remainingFree = Math.max(0, UPGRADE_MODAL_THRESHOLD - todayCount);

  /**
   * recordGeneration — called after each successful API response.
   * Increments count and triggers the upgrade modal when threshold is crossed.
   */
  const recordGeneration = useCallback(() => {
    const record = readDailyUseRecord();
    const newCount = record.count + 1;
    writeDailyUseRecord({ date: getTodayDateString(), count: newCount });
    setTodayCount(newCount);

    // Show upgrade modal after completing UPGRADE_MODAL_THRESHOLD generations today.
    // Post-value timing: user just got results, is in a "satisfied and curious" state.
    if (newCount >= UPGRADE_MODAL_THRESHOLD) {
      setShowUpgradeModal(true);
    }
  }, []);

  /**
   * checkGenerationAttempt — called BEFORE the API request.
   * Determines if the generation should proceed or a gate should fire.
   *
   * Returns:
   *   "allow"               — proceed normally
   *   "show_email_gate"     — 4th attempt + no email yet → offer bonus gen for email
   *   "show_upgrade_modal"  — 5th+ attempt → server will block, show upgrade wall
   */
  const checkGenerationAttempt = useCallback((): "allow" | "show_email_gate" | "show_upgrade_modal" => {
    const record = readDailyUseRecord();
    const attemptNumber = record.count + 1;

    if (attemptNumber >= FREE_DAILY_LIMIT) {
      setShowUpgradeModal(true);
      return "show_upgrade_modal";
    }

    if (attemptNumber === EMAIL_GATE_ATTEMPT && !readEmailCaptured()) {
      setShowEmailGate(true);
      return "show_email_gate";
    }

    return "allow";
  }, []);

  const dismissUpgradeModal = useCallback(() => setShowUpgradeModal(false), []);
  const dismissEmailGate = useCallback(() => setShowEmailGate(false), []);

  const captureEmail = useCallback(() => {
    markEmailCaptured();
    setEmailCaptured(true);
    setShowEmailGate(false);
  }, []);

  return {
    todayCount,
    remainingFree,
    showUpgradeModal,
    showEmailGate,
    emailCaptured,
    recordGeneration,
    checkGenerationAttempt,
    dismissUpgradeModal,
    dismissEmailGate,
    captureEmail,
  };
}

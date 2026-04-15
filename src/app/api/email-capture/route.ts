/**
 * POST /api/email-capture — stores leads from the email gate modal.
 *
 * PURPOSE:
 * When free-tier users hit the 4th generation attempt, EmailCaptureModal
 * offers 1 bonus generation in exchange for email. This endpoint:
 * 1. Validates the email
 * 2. Stores it (logs to console if no DATABASE_URL configured)
 * 3. Returns 200 so the client can proceed with the bonus generation
 *
 * ALWAYS RETURNS 200 (if email is valid):
 * Email storage failure must never block the bonus generation. The user gave
 * their email in good faith; we owe them the bonus regardless of DB health.
 *
 * RATE LIMITING:
 * 3 submissions per IP per hour — prevents harvesting.
 *
 * CREATED: 2026-03-28 by Custom 5 (conversion optimization sprint — T3ceb2cc2)
 * PATTERN: Mirrors ai-logo-generator/src/app/api/email-capture/route.ts
 * CALLED BY: src/components/conversion/EmailCaptureModal.tsx
 */
import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// IP rate limiter — 3 submissions per IP per hour
// ---------------------------------------------------------------------------
const emailCaptureRateLimitMap = new Map<string, { count: number; windowStartMs: number }>();
const EMAIL_RATE_LIMIT_COUNT = 3;
const EMAIL_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function checkEmailRateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = emailCaptureRateLimitMap.get(ip);
  if (!existing || now - existing.windowStartMs > EMAIL_RATE_LIMIT_WINDOW_MS) {
    emailCaptureRateLimitMap.set(ip, { count: 1, windowStartMs: now });
    return true;
  }
  if (existing.count >= EMAIL_RATE_LIMIT_COUNT) return false;
  existing.count++;
  return true;
}

function extractClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const clientIp = extractClientIp(request);

  if (!checkEmailRateLimit(clientIp)) {
    // Return 200 anyway — IP collisions (shared IPs, VPNs) would punish innocent users
    console.warn(`[email-capture] Rate limit hit for IP: ${clientIp}`);
    return NextResponse.json({ success: true, message: "logged" }, { status: 200 });
  }

  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const source = (body.source || "unknown").trim().slice(0, 50);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  /**
   * Attempt to store the lead via Resend Contacts API for remarketing.
   * Falls back to console logging when RESEND_API_KEY / RESEND_AUDIENCE_ID
   * are not configured (local dev, env not yet set).
   * Never fails the request — email capture infra issues must not block the bonus.
   */
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim();

  if (resendApiKey && audienceId) {
    try {
      const response = await fetch("https://api.resend.com/contacts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audience_id: audienceId,
          email,
          unsubscribed: false,
          first_name: "",
          last_name: "",
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`[email-capture] Resend error (${response.status}): ${errorBody}`);
      } else {
        console.info(`[email-capture] Added to Resend: ${email.slice(0, 3)}***@${email.split("@")[1]} source=${source}`);
      }
    } catch (err) {
      console.error("[email-capture] Resend request failed:", err);
    }
  } else {
    console.info(
      `[email-capture] Lead (no Resend): ${email.slice(0, 3)}***@${email.split("@")[1]} source=${source} ip=${clientIp.slice(0, 8)}***`
    );
  }

  return NextResponse.json(
    { success: true, bonusGranted: true, message: "Thank you! 1 bonus product photo unlocked." },
    { status: 200 }
  );
}

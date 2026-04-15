/**
 * src/lib/subscription-store.ts — ai-product-photo-generator subscription persistence layer
 *
 * PURPOSE:
 * Provides durable per-token Pro subscription state backed by Upstash Redis.
 * Used by three routes:
 *   - /api/stripe/create-checkout  → generates a token, stores "pending" state
 *   - /api/stripe/webhook          → activates the token on checkout.session.completed
 *   - /api/generate                → checks if the request's token is "active"
 *
 * TOKEN LIFECYCLE:
 *   pending  → checkout session created but not yet paid
 *   active   → payment confirmed via Stripe webhook
 *   cancelled → subscription cancelled (future: subscription.deleted event)
 *
 * WHY TOKEN-BASED INSTEAD OF USER AUTH:
 * ai-product-photo-generator is a lightweight clone with no user database.
 * The subscription token pattern gives us durable Pro gating quickly:
 *   1. Server generates UUID at checkout creation
 *   2. Token stored as client_reference_id in Stripe session
 *   3. Success URL includes ?token= so client can capture it in localStorage
 *   4. Webhook activates the token when payment succeeds
 *   5. Client includes token in generate requests via x-pro-token header
 *   6. Generate route checks Redis before applying IP rate limit
 *
 * This is the fleet-standard T018 pattern. The key namespace is prefixed with
 * "productphoto:" to avoid collisions if multiple apps ever share a Redis database.
 *
 * TOKEN EXPIRY:
 * Active tokens expire after 13 months (covers annual billing cycle + buffer).
 * Pending tokens expire after 1 hour (abandoned checkouts should not linger).
 *
 * GRACEFUL DEGRADATION:
 * If UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN are not configured,
 * all calls fail open with console warnings:
 *   - Pending tokens are not stored (checkout still works)
 *   - Webhook acknowledges but does not persist Pro status
 *   - Generate route treats ALL requests as free tier (conservative, correct)
 *
 * This allows the code to build and deploy before Upstash is provisioned.
 * BC1 note: after provisioning at https://console.upstash.com/:
 *   vercel env add UPSTASH_REDIS_REST_URL production
 *   vercel env add UPSTASH_REDIS_REST_TOKEN production
 *
 * REQUIRED ENV VARS (Vercel dashboard):
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * CALLED BY:
 *   src/app/api/stripe/create-checkout/route.ts
 *   src/app/api/stripe/webhook/route.ts
 *   src/app/api/generate/route.ts
 *
 * pane1774 swarm — Builder 7, 2026-03-26 (T018 Upstash token lifecycle)
 * Pattern from: ai-face-swap/src/lib/subscription-store.ts
 * Key namespace changed from "faceswap:" to "productphoto:"
 */

import { Redis } from "@upstash/redis";

// -------------------------------------------------------------------------
// Redis client — lazy singleton, fails gracefully if env vars are missing
// -------------------------------------------------------------------------

let _redisClient: Redis | null = null;
let _redisInitAttempted = false;

/**
 * getRedisClient — returns a shared Redis instance, or null if not configured.
 *
 * Lazy init prevents build-time crashes when UPSTASH env vars are absent.
 * The null check at each call site ensures operations skip gracefully.
 */
function getRedisClient(): Redis | null {
  if (_redisInitAttempted) {
    return _redisClient;
  }

  _redisInitAttempted = true;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn(
      "[subscription-store] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set. " +
        "Pro subscription persistence is DISABLED. " +
        "All generate requests will use free-tier IP rate limiting. " +
        "Set these Vercel env vars to enable durable Pro entitlement."
    );
    return null;
  }

  try {
    _redisClient = new Redis({ url, token });
    return _redisClient;
  } catch (err) {
    console.error("[subscription-store] Failed to initialize Redis client:", err);
    return null;
  }
}

// -------------------------------------------------------------------------
// Token key helpers
// -------------------------------------------------------------------------

/**
 * Redis key for a subscription token.
 * Namespaced with "productphoto:" prefix to avoid collisions with other fleet apps
 * (tattoo uses "tattoo:", faceswap uses "faceswap:", outfit uses "outfit:", etc.).
 */
function subTokenKey(token: string): string {
  return `productphoto:sub:token:${token}`;
}

// -------------------------------------------------------------------------
// TTLs
// -------------------------------------------------------------------------

/** Pending checkout session expires after 1 hour */
const PENDING_TTL_SECONDS = 60 * 60;

/** Active Pro subscription is valid for 13 months (annual + 1-month buffer) */
const ACTIVE_TTL_SECONDS = 13 * 30 * 24 * 60 * 60;

// -------------------------------------------------------------------------
// Public API
// -------------------------------------------------------------------------

export type SubscriptionStatus = "pending" | "active" | "cancelled";

/**
 * createPendingToken — called by checkout route when creating a Stripe session.
 *
 * Generates a UUID, stores it as "pending" in Redis (1h TTL), and returns
 * the token. The token is passed as client_reference_id in Stripe and
 * included in the success_url so the client can store it in localStorage.
 *
 * If Redis is unavailable, the token is still returned — checkout works,
 * but Pro entitlement won't persist when the webhook fires.
 */
export async function createPendingToken(): Promise<string> {
  const token = crypto.randomUUID();

  const redis = getRedisClient();
  if (!redis) {
    console.warn(
      "[subscription-store] createPendingToken: Redis unavailable — token not stored.",
      { token }
    );
    return token;
  }

  try {
    await redis.setex(subTokenKey(token), PENDING_TTL_SECONDS, "pending");
  } catch (err) {
    console.error("[subscription-store] createPendingToken: Redis write failed:", err);
    // Still return the token so checkout does not break
  }

  return token;
}

/**
 * activateToken — called by /api/stripe/webhook on checkout.session.completed.
 *
 * Upgrades the token from "pending" to "active" (13-month TTL).
 * If the token was never stored (no Redis at checkout time), creates it as
 * "active" directly. Idempotent — safe to call multiple times.
 */
export async function activateToken(token: string): Promise<boolean> {
  const redis = getRedisClient();
  if (!redis) {
    console.warn(
      "[subscription-store] activateToken: Redis unavailable — cannot persist Pro status.",
      { token }
    );
    return false;
  }

  try {
    await redis.setex(subTokenKey(token), ACTIVE_TTL_SECONDS, "active");
    console.log("[subscription-store] activateToken: token activated in Redis", { token });
    return true;
  } catch (err) {
    console.error("[subscription-store] activateToken: Redis write failed:", err);
    // Fail silently — Stripe will retry; don't 500 back to Stripe
    return false;
  }
}

/**
 * cancelToken — for future use with customer.subscription.deleted.
 * Marks the token as cancelled with a 30-day TTL so clients get a clear error.
 */
export async function cancelToken(token: string): Promise<void> {
  const redis = getRedisClient();
  if (!redis) return;

  try {
    await redis.setex(subTokenKey(token), 30 * 24 * 60 * 60, "cancelled");
  } catch (err) {
    console.error("[subscription-store] cancelToken: Redis write failed:", err);
  }
}

/**
 * subIdToTokenKey — Redis key mapping stripeSubscriptionId → token.
 *
 * The customer.subscription.deleted webhook event does NOT carry the
 * client_reference_id. This reverse lookup lets us find and cancel the
 * token when a subscription is deleted.
 */
function subIdToTokenKey(stripeSubscriptionId: string): string {
  return `productphoto:sub:subid:${stripeSubscriptionId}`;
}

/**
 * storeSubscriptionTokenMapping — saves stripeSubscriptionId → token in Redis.
 *
 * Called by the webhook's checkout.session.completed handler AFTER activateToken()
 * succeeds. TTL matches ACTIVE_TTL_SECONDS so the mapping lives as long as the token.
 */
export async function storeSubscriptionTokenMapping(
  stripeSubscriptionId: string,
  token: string
): Promise<void> {
  const redis = getRedisClient();
  if (!redis) return;

  try {
    await redis.setex(subIdToTokenKey(stripeSubscriptionId), ACTIVE_TTL_SECONDS, token);
  } catch (err) {
    console.error("[subscription-store] storeSubscriptionTokenMapping: Redis write failed:", err);
  }
}

/**
 * getTokenForSubscription — retrieves the token for a stripeSubscriptionId.
 *
 * Called by the webhook's customer.subscription.deleted handler to find the
 * token that needs to be cancelled. Returns null if no mapping exists.
 */
export async function getTokenForSubscription(
  stripeSubscriptionId: string
): Promise<string | null> {
  const redis = getRedisClient();
  if (!redis) return null;

  try {
    const token = await redis.get<string>(subIdToTokenKey(stripeSubscriptionId));
    return token ?? null;
  } catch (err) {
    console.error("[subscription-store] getTokenForSubscription: Redis read failed:", err);
    return null;
  }
}

/**
 * checkTokenStatus — returns the subscription status or null if not found/Redis down.
 */
export async function checkTokenStatus(
  token: string
): Promise<SubscriptionStatus | null> {
  if (!token || typeof token !== "string" || token.length < 10) {
    return null;
  }

  const redis = getRedisClient();
  if (!redis) return null;

  try {
    const storedStatus = await redis.get<string>(subTokenKey(token));
    if (!storedStatus) return null;

    if (
      storedStatus === "active" ||
      storedStatus === "pending" ||
      storedStatus === "cancelled"
    ) {
      return storedStatus as SubscriptionStatus;
    }

    return null;
  } catch (err) {
    console.error("[subscription-store] checkTokenStatus: Redis read failed:", err);
    return null; // Fail conservatively — don't grant Pro access on error
  }
}

/**
 * isProActive — returns true only if the token is in "active" state.
 * Primary entitlement check used by /api/generate.
 */
export async function isProActive(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  const status = await checkTokenStatus(token);
  return status === "active";
}

// -------------------------------------------------------------------------
// Stripe API Fallback for Pro Verification (no Redis required)
// -------------------------------------------------------------------------

/**
 * In-memory cache for Stripe API fallback lookups.
 *
 * WHY THIS EXISTS:
 * When Upstash Redis is not provisioned (which is the case for many clones in
 * early deployment), isProActive() always returns false — even for customers
 * who have paid via Stripe. This means paying customers are stuck on free tier.
 *
 * The Stripe API fallback queries Stripe's checkout sessions endpoint directly
 * using the token (which was stored as client_reference_id during checkout).
 * If Stripe confirms a paid session exists for that token, the user is Pro.
 *
 * WHY IN-MEMORY CACHE IS OK HERE (but NOT for credits):
 * This is a read-only cache of Stripe's immutable payment records. A cold start
 * just means one extra Stripe API call — the source of truth (Stripe) is always
 * available. Unlike credits/usage counters, there's no state mutation risk.
 * The 5-minute TTL prevents hammering Stripe's API on every generate request.
 *
 * LIFECYCLE:
 * 1. isProActive() checks Redis first (fast, durable)
 * 2. If Redis returns null/false → isProActiveFromStripe() queries Stripe API
 * 3. Stripe confirms paid session → user gets Pro access
 * 4. Result cached for 5 minutes to avoid repeated API calls
 *
 * This pattern was introduced fleet-wide to unblock revenue while Upstash
 * provisioning is pending (BridgeMind: clone-factory quality gates).
 */
const _stripeFallbackCache = new Map<string, { isPro: boolean; cachedAt: number }>();
const STRIPE_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * isProActiveFromStripe — Stripe API fallback for Pro status verification.
 *
 * Queries Stripe's checkout sessions by client_reference_id (the token) to
 * determine if a paid session exists. This bypasses Redis entirely and goes
 * straight to the payment processor as the source of truth.
 *
 * WHEN THIS IS CALLED:
 * Only after isProActive() (Redis check) returns false. This ensures we don't
 * add unnecessary Stripe API latency when Redis is healthy.
 *
 * FAIL-CLOSED DESIGN:
 * Any error (network, auth, malformed response) returns false. We never grant
 * Pro access on an ambiguous signal — the user stays on free tier and can retry.
 * This is the conservative choice: false negatives are recoverable (user retries
 * or contacts support), false positives leak revenue.
 *
 * SECURITY:
 * - STRIPE_SECRET_KEY is server-side only (never exposed to client)
 * - Token must be >= 10 chars (rejects empty/garbage values before API call)
 * - Newline trimming on the key prevents the common Vercel env var bug where
 *   `echo` appends \n (see deploy-readiness-checklist.md)
 *
 * @param token - The x-pro-token from the client (originally a UUID from checkout)
 * @returns true if Stripe has a paid checkout session for this token
 */
export async function isProActiveFromStripe(
  token: string | null | undefined
): Promise<boolean> {
  if (!token || typeof token !== "string" || token.length < 10) return false;

  // Check in-memory cache first to avoid repeated Stripe API calls
  const cached = _stripeFallbackCache.get(token);
  if (cached && Date.now() - cached.cachedAt < STRIPE_CACHE_TTL_MS) {
    return cached.isPro;
  }

  // Trim the Stripe secret key — Vercel env vars set via `echo` often have
  // trailing newlines that cause 401 errors (see deploy-readiness-checklist.md)
  const stripeKey = process.env.STRIPE_SECRET_KEY?.replace(/[\s\n\r\\n]+$/g, "").trim();
  if (!stripeKey) {
    // No Stripe key configured — can't verify, fail closed
    return false;
  }

  try {
    // Query Stripe for checkout sessions with this token as client_reference_id.
    // The token was set during create-checkout and Stripe indexes it for lookup.
    const url = new URL("https://api.stripe.com/v1/checkout/sessions");
    url.searchParams.set("client_reference_id", token);
    url.searchParams.set("limit", "1");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
      },
    });

    if (!response.ok) {
      console.warn(
        "[subscription-store] isProActiveFromStripe: Stripe API returned non-OK status",
        { status: response.status, token: token.slice(0, 8) + "..." }
      );
      _stripeFallbackCache.set(token, { isPro: false, cachedAt: Date.now() });
      return false;
    }

    const data = await response.json() as {
      data: Array<{ payment_status: string; subscription?: string | null }>;
    };

    // Find a paid checkout session
    const paidSession = data.data?.find(
      (session) => session.payment_status === "paid"
    );

    if (!paidSession) {
      _stripeFallbackCache.set(token, { isPro: false, cachedAt: Date.now() });
      return false;
    }

    // Subscription cancellation check: a cancelled subscription's checkout
    // session still shows payment_status "paid" because the original payment
    // succeeded. Verify the subscription is still active before granting Pro.
    if (paidSession.subscription) {
      const subResponse = await fetch(
        `https://api.stripe.com/v1/subscriptions/${paidSession.subscription}`,
        { method: "GET", headers: { Authorization: `Bearer ${stripeKey}` } }
      );

      if (subResponse.ok) {
        const subData = await subResponse.json() as { status: string };
        const isActive = subData.status === "active" || subData.status === "trialing";
        if (!isActive) {
          console.log(
            `[subscription-store] isProActiveFromStripe: subscription ${paidSession.subscription} status="${subData.status}" — NOT Pro`,
            { token: token.slice(0, 8) + "..." }
          );
          _stripeFallbackCache.set(token, { isPro: false, cachedAt: Date.now() });
          return false;
        }
      } else {
        console.warn(
          `[subscription-store] isProActiveFromStripe: subscription check returned ${subResponse.status} — denying Pro`,
          { token: token.slice(0, 8) + "..." }
        );
        _stripeFallbackCache.set(token, { isPro: false, cachedAt: Date.now() });
        return false;
      }
    }

    // Paid + subscription active (or one-time payment)
    _stripeFallbackCache.set(token, { isPro: true, cachedAt: Date.now() });
    console.log(
      "[subscription-store] isProActiveFromStripe: Stripe confirms paid session",
      { token: token.slice(0, 8) + "..." }
    );
    return true;
  } catch (err) {
    // Network error, DNS failure, etc. — fail closed, cache the negative result
    console.warn("[subscription-store] isProActiveFromStripe: fetch error", err);
    _stripeFallbackCache.set(token, { isPro: false, cachedAt: Date.now() });
    return false;
  }
}

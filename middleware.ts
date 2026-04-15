/**
 * middleware.ts — next-intl locale routing middleware.
 *
 * Intercepts all non-API, non-static requests and redirects/rewrites them
 * to the correct locale prefix. English stays at "/" (no /en prefix).
 *
 * CRITICAL: The matcher MUST exclude pSEO routes (/for, /best, /use-cases, /vs)
 * so that Googlebot can access them without locale redirects. Gate 9 in
 * clone-factory-quality-gates.md tracks this requirement.
 *
 * prism-exec-6847 (2026-04-14): Created — was missing entirely, causing
 * potential locale redirect interference with pSEO and static routes.
 */
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all routes except: API routes, Next.js internals, Vercel internals,
  // static files, and pSEO/marketing routes that must be directly accessible
  matcher: ["/((?!api|_next|_vercel|privacy|privacy-policy|terms|terms-of-service|refund-policy|refund|vs|for|best|use-cases|lp|testimonials|ai-|get-started|guide|amazon-product-photos|photoroom-alternative|about|.*\\..*).*)"],
};

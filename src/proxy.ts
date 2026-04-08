/**
 * proxy.ts — next-intl locale detection proxy
 *
 * PURPOSE: Intercepts every non-asset request and:
 *   1. Detects the user's preferred locale (Accept-Language header, cookie, URL)
 *   2. Rewrites or redirects to the correct locale-prefixed path if needed
 *   3. Sets a locale cookie for subsequent requests
 *
 * MATCHER PATTERN:
 * "/((?!api|_next|_vercel|.*\\..*).*)":
 *   - Skips /api/* routes (handled by API route handlers directly)
 *   - Skips /_next/* (Next.js internal assets)
 *   - Skips /_vercel/* (Vercel system routes)
 *   - Skips anything with a file extension (images, fonts, favicons)
 *   - Runs on all other paths (page routes)
 *
 * Next.js 16 renamed the middleware file convention to proxy. The behavior
 * here stays the same; only the file convention changes.
 */
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|privacy|terms|refund|refund-policy|about|.*\\..*).*)"],
};

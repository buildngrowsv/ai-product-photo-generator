/**
 * middleware.ts — next-intl locale detection middleware
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
 * This is the standard next-intl middleware pattern for App Router.
 * Must live at src/middleware.ts (Next.js picks it up automatically).
 *
 * Added 2026-03-24 as part of i18n rollout (pane1774 T13).
 */
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|privacy|terms|refund|refund-policy|about|.*\\..*).*)"],
};

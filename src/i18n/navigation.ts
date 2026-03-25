/**
 * navigation.ts — next-intl locale-aware navigation helpers
 *
 * PURPOSE: Exports locale-aware versions of Next.js navigation primitives.
 * Wrapping with createNavigation ensures Link, redirect, usePathname, and
 * useRouter all automatically prepend the /es prefix for Spanish routes
 * while keeping English routes clean (localePrefix "as-needed").
 *
 * Usage: import { Link, useRouter } from "@/i18n/navigation" instead of
 * "next/link" or "next/navigation" whenever you need locale-aware routing.
 *
 * Added 2026-03-24 as part of i18n rollout (pane1774 T13).
 */
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

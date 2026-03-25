"use client";

/**
 * LocaleSwitcher — EN/ES language toggle for AI Product Photo Generator.
 *
 * WHY "use client": Uses next-intl's useLocale() and useRouter() hooks.
 *
 * WHY useRouter from @/i18n/navigation:
 * next-intl's typed router accepts { locale } option to switch locales
 * while preserving the current path — canonical next-intl v4.x approach.
 *
 * No props needed — locale comes from next-intl context set by setRequestLocale.
 * Rendered inside [locale]/layout.tsx body.
 */

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const LOCALES = ["en", "es"] as const;
type Locale = (typeof LOCALES)[number];

const LABELS: Record<Locale, string> = { en: "EN", es: "ES" };

export function LocaleSwitcher() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: Locale) {
    router.push(pathname, { locale: next, scroll: false });
  }

  return (
    <div
      className="flex items-center gap-1 text-xs font-medium"
      aria-label="Language switcher"
    >
      {LOCALES.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          disabled={locale === currentLocale}
          className={`px-2 py-0.5 rounded transition-colors ${
            locale === currentLocale
              ? "bg-white/20 text-white cursor-default"
              : "text-white/60 hover:text-white hover:bg-white/10 cursor-pointer"
          }`}
          aria-pressed={locale === currentLocale}
        >
          {LABELS[locale]}
        </button>
      ))}
    </div>
  );
}

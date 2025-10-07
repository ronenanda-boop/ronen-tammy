"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next-intl/link";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

const corePaths = new Set(["", "about", "studio", "contact"]);

function normalizePath(pathname: string | null): string {
  if (!pathname) return "";
  const cleaned = pathname.replace(/^\/(en)(?=\/|$)/, "");
  return cleaned.replace(/^\//, "");
}

function buildPath(path: string, locale: Locale) {
  const normalized = path ? `/${path}` : "/";
  return locale === defaultLocale ? normalized : `/${locale}${normalized}`;
}

export default function LangSwitch() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const normalizedPath = normalizePath(pathname);

  if (!corePaths.has(normalizedPath)) {
    return null;
  }

  const targetLocale = locales.find((loc) => loc !== locale) ?? defaultLocale;
  const href = buildPath(normalizedPath, targetLocale);

  return (
    <Link
      href={href}
      locale={targetLocale}
      className="rounded-full border border-foreground/20 px-4 py-1.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
    >
      {targetLocale === "he" ? "עברית" : "English"}
    </Link>
  );
}

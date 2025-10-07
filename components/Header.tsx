"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next-intl/link";
import { usePathname } from "next/navigation";
import clsx from "classnames";
import Logo from "./Logo";
import LangSwitch from "./LangSwitch";
import { defaultLocale, type Locale } from "@/lib/i18n";

const navItems = [
  { key: "home", path: "" },
  { key: "about", path: "about" },
  { key: "studio", path: "studio" },
  { key: "works", path: "works" },
  { key: "contact", path: "contact" }
];

function buildHref(path: string, locale: Locale) {
  const basePath = path ? `/${path}` : "/";
  return locale === defaultLocale ? basePath : `/${locale}${basePath}`;
}

export default function Header() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Logo href={locale === defaultLocale ? "/" : `/${locale}`} locale={locale} />
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => {
            if (item.key === "works" && locale !== "he") {
              return (
                <Link key={item.key} href="/works" locale="he" className="text-foreground/60 hover:text-accent">
                  {t(item.key)}
                </Link>
              );
            }
            const href = buildHref(item.path, locale);
            const isActive = pathname === href || (href === "/" && pathname === "/");
            return (
              <Link
                key={item.key}
                href={href}
                locale={locale}
                className={clsx("transition", isActive ? "text-accent" : "text-foreground/70 hover:text-accent")}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch />
        </div>
      </div>
    </header>
  );
}

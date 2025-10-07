"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode, useEffect } from "react";

interface IntlProviderProps {
  locale: string;
  messages: Record<string, unknown>;
  children: ReactNode;
}

export default function IntlProvider({ locale, messages, children }: IntlProviderProps) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === "he" ? "rtl" : "ltr";
    }
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Jerusalem">
      {children}
    </NextIntlClientProvider>
  );
}

'use client';

import * as React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';

type IntlProviderProps = {
  children: React.ReactNode;
  locale: string;
  // מגיע לעיתים כ-unknown/Record<string, unknown> מהפאץ' של ההודעות
  messages: unknown;
};

// ליהוק בטוח עבור next-intl
function asMessages(input: unknown): AbstractIntlMessages {
  return input as AbstractIntlMessages;
}

export default function IntlProvider({ children, locale, messages }: IntlProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={asMessages(messages)}>
      {children}
    </NextIntlClientProvider>
  );
}

import { ReactNode } from "react";
import type { Metadata } from "next";
import IntlProvider from "@/components/IntlProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMessages } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/sanity.queries";

export const metadata: Metadata = {
  title: "Ronen & Tammy Izhaki | Visual Studio",
  description: "A multidisciplinary studio crafting cinematic and sonic experiences."
};

export default async function EnglishLayout({ children }: { children: ReactNode }) {
  const locale = "en" as const;
  const [messages, settings] = await Promise.all([getMessages(locale), getSiteSettings(locale)]);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-1 flex-col" dir="ltr">
        <Header />
        <main className="container flex-1 space-y-16 py-12">{children}</main>
        <Footer email={settings.contacts?.email} phone={settings.contacts?.phone} socials={settings.socials} />
      </div>
    </IntlProvider>
  );
}

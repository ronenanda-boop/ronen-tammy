import { ReactNode } from "react";
import type { Metadata } from "next";
import IntlProvider from "@/components/IntlProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMessages } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/sanity.queries";

export const metadata: Metadata = {
  title: "רונן וטמי איצ׳אקי | סטודיו לתוכן חזותי",
  description: "סטודיו רב תחומי ליצירת חוויות וידאו ומוזיקה."
};

export default async function HebrewLayout({ children }: { children: ReactNode }) {
  const locale = "he" as const;
  const [messages, settings] = await Promise.all([getMessages(locale), getSiteSettings(locale)]);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-1 flex-col" dir="rtl">
        <Header />
        <main className="container flex-1 space-y-16 py-12">{children}</main>
        <Footer email={settings.contacts?.email} phone={settings.contacts?.phone} socials={settings.socials} />
      </div>
    </IntlProvider>
  );
}

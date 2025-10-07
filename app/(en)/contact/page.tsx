import { createTranslator } from "next-intl";
import ContactForm from "@/components/ContactForm";
import LimitedNotice from "@/components/LimitedNotice";
import { getMessages } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/sanity.queries";

export default async function ContactPage() {
  const locale = "en" as const;
  const [messages, settings] = await Promise.all([getMessages(locale), getSiteSettings(locale)]);
  const t = createTranslator({ locale, messages, namespace: "contact" });

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-6">
        <LimitedNotice href="/contact" />
        <h1 className="text-4xl font-semibold text-foreground">{t("title")}</h1>
        <p className="text-lg text-foreground/70">
          We are excited to hear about new projects, collaborations or questions.
        </p>
        <div className="space-y-2 text-sm text-foreground/70">
          {settings.contacts?.email && (
            <a href={`mailto:${settings.contacts.email}`} className="block text-accent">
              ✉️ {settings.contacts.email}
            </a>
          )}
          {settings.contacts?.phone && (
            <a href={`tel:${settings.contacts.phone}`} className="block text-accent">
              ☎️ {settings.contacts.phone}
            </a>
          )}
        </div>
      </div>
      <ContactForm />
    </div>
  );
}

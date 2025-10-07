import { createTranslator } from "next-intl";
import RichText from "@/components/RichText";
import StudioBookingEmbed from "@/components/StudioBookingEmbed";
import BookingForm from "@/components/BookingForm";
import ImageGrid from "@/components/ImageGrid";
import LimitedNotice from "@/components/LimitedNotice";
import { getMessages } from "@/lib/i18n";
import { getStudio } from "@/lib/sanity.queries";

export default async function StudioPage() {
  const locale = "en" as const;
  const [messages, studio] = await Promise.all([getMessages(locale), getStudio()]);
  const t = createTranslator({ locale, messages, namespace: "studio" });

  return (
    <div className="space-y-14">
      <LimitedNotice href="/studio" />
      <section className="space-y-6">
        <h1 className="text-4xl font-semibold text-foreground">{t("visionTitle")}</h1>
        <RichText value={studio.vision_en && studio.vision_en.length > 0 ? studio.vision_en : studio.vision} />
        {studio.address && (
          <p className="text-sm text-foreground/60">📍 {studio.address}</p>
        )}
        {studio.email && (
          <a href={`mailto:${studio.email}`} className="text-sm text-accent">
            ✉️ {studio.email}
          </a>
        )}
      </section>

      <ImageGrid images={studio.photos} />

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">{t("bookingTitle")}</h2>
        <StudioBookingEmbed provider={studio.bookingProvider} url={studio.bookingUrl} />
        <BookingForm />
      </section>
    </div>
  );
}

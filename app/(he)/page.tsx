import { createTranslator } from "next-intl";
import Link from "next-intl/link";
import HeroVideo from "@/components/HeroVideo";
import WorkCard from "@/components/WorkCard";
import { getMessages } from "@/lib/i18n";
import { getFeaturedWorks, getSiteSettings } from "@/lib/sanity.queries";
import { urlForImage } from "@/lib/sanity.image";

export default async function HomePage() {
  const locale = "he" as const;
  const [messages, settings, works] = await Promise.all([
    getMessages(locale),
    getSiteSettings(locale),
    getFeaturedWorks()
  ]);

  const t = createTranslator({ locale, messages, namespace: "home" });

  const poster = settings.heroPoster ? urlForImage(settings.heroPoster)?.width(1600).height(900).url() : undefined;

  return (
    <div className="space-y-16">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-foreground/20 px-4 py-1 text-xs uppercase tracking-widest text-foreground/60">
            {settings.title || t("heroTitle")}
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">{t("heroTitle")}</h1>
          <p className="max-w-xl text-lg text-foreground/70">{t("heroSubtitle")}</p>
          <Link
            href="/studio"
            locale="he"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/80"
          >
            {t("ctaStudio")}
          </Link>
        </div>
        <HeroVideo videoUrl={settings.heroVideoUrl} posterUrl={poster} title={t("heroTitle")} />
      </section>

      {works.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">{t("featuredTitle")}</h2>
            <Link href="/works" locale="he" className="text-sm font-medium text-accent hover:text-accent/80">
              {t("ctaStudio")}
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {works.map((work) => (
              <WorkCard key={work._id} work={work} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import LimitedNotice from "@/components/LimitedNotice";

export const metadata = {
  title: "About Ronen & Tammy Izhaki"
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <LimitedNotice href="/about" />
      <section className="space-y-6">
        <h1 className="text-4xl font-semibold text-foreground">About</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-foreground/80">
          Ronen and Tammy Izhaki lead an independent studio dedicated to layered visual storytelling. They blend direction, design, sound and technology to shape immersive experiences for brands, cultural institutions and artists.
        </p>
      </section>
      <div className="grid gap-10 md:grid-cols-2">
        <article className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Ronen Izhaki</h2>
          <p className="text-base leading-relaxed text-foreground/70">
            Multimedia director with over a decade of global collaborations. Ronen shapes complex visual concepts, leads studio and location shoots and crafts interactive moments.
          </p>
        </article>
        <article className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Tammy Izhaki</h2>
          <p className="text-base leading-relaxed text-foreground/70">
            Designer, composer and producer. Tammy bridges design, animation and sound to deliver multi-sensory narratives with emotional clarity.
          </p>
        </article>
      </div>
    </div>
  );
}

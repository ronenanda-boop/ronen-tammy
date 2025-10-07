export const metadata = {
  title: "על רונן וטמי איצ׳אקי"
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <h1 className="text-4xl font-semibold text-foreground">עלינו</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-foreground/80">
          רונן וטמי איצ׳אקי מובילים סטודיו עצמאי שמתמקד בסיפורים חזותיים מרובי שכבות. הצמד משלב בין בימוי, עיצוב, סאונד ופיתוח טכנולוגי כדי ליצור חוויות סוחפות עבור מותגים, מוסדות תרבות ואמנים. החזון שלהם הוא לייצר רגעים בלתי נשכחים שמחברים בין אנשים באמצעות דימוי, תנועה וצליל.
        </p>
      </section>
      <div className="grid gap-10 md:grid-cols-2">
        <article className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">רונן איצ׳אקי</h2>
          <p className="text-base leading-relaxed text-foreground/70">
            במאי ויוצר מולטימדיה עם ניסיון של יותר מעשור בפרויקטים בינלאומיים. מומחה בבימוי צילומי סטודיו וחוץ, פיתוח רעיונות ויזואליים מורכבים ויצירת חוויות אינטראקטיביות.
          </p>
        </article>
        <article className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">טמי איצ׳אקי</h2>
          <p className="text-base leading-relaxed text-foreground/70">
            מעצבת, מלחינה ומפיקה מוזיקלית. טמי מובילה את הצד האודיו־ויזואלי ומחברת בין עולמות העיצוב, האנימציה והסאונד ליצירת חוויות רב חושיות.
          </p>
        </article>
      </div>
    </div>
  );
}

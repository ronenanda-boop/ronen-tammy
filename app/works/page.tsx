import WorkCard from "@/components/WorkCard";
import { getWorks } from "@/lib/sanity.queries";

export const metadata = {
  title: "עבודות נבחרות | רונן וטמי איצ׳אקי"
};

export default async function WorksPage() {
  const works = await getWorks();
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-foreground">עבודות</h1>
          <p className="max-w-2xl text-lg text-foreground/70">
            מבחר פרויקטים מתוך הסטודיו, החל מקליפים, מופעים ועד חוויות דיגיטליות.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <WorkCard key={work._id} work={work} />
        ))}
      </div>
    </div>
  );
}

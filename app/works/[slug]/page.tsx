import Image from "next/image";
import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import RichText from "@/components/RichText";
import ImageGrid from "@/components/ImageGrid";
import { getWorkBySlug } from "@/lib/sanity.queries";
import { urlForImage } from "@/lib/sanity.image";

interface WorkPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: WorkPageProps) {
  const work = await getWorkBySlug(params.slug);
  if (!work) return { title: "עבודה" };
  return {
    title: `${work.title} | רונן וטמי איצ׳אקי`
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const work = await getWorkBySlug(params.slug);
  if (!work) {
    notFound();
  }

  const cover = work.coverImage ? urlForImage(work.coverImage)?.width(1600).height(900).url() : null;

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-sm text-foreground/60">{work.year}</p>
        <h1 className="text-4xl font-semibold text-foreground">{work.title}</h1>
        {work.credits && work.credits.length > 0 && (
          <ul className="space-y-1 text-sm text-foreground/70">
            {work.credits.map((credit, index) => (
              <li key={index}>{credit}</li>
            ))}
          </ul>
        )}
      </header>

      {cover && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
          <Image src={cover} alt={work.title} fill className="object-cover" sizes="(min-width: 1024px) 70vw, 100vw" />
        </div>
      )}

      {work.videoUrl && <VideoPlayer url={work.videoUrl} light={cover ?? true} className="max-w-4xl" />}

      <RichText value={work.description} />

      {work.gallery && work.gallery.length > 0 && <ImageGrid images={work.gallery} columns={3} />}
    </div>
  );
}

import Image from "next/image";
import Link from 'next/link';
import type { Work } from "@/types/content";
import { urlForImage } from "@/lib/sanity.image";

interface WorkCardProps {
  work: Work;
}

export default function WorkCard({ work }: WorkCardProps) {
  const href = `/works/${work.slug}`;
  const imageUrl = work.coverImage ? urlForImage(work.coverImage)?.width(800).height(600).url() : null;
  return (
    <Link
      href={href}
      locale="he"
      className="group block overflow-hidden rounded-3xl border border-foreground/10 bg-white/70 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={work.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-foreground/40">
            {work.title}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{work.title}</h3>
          {work.credits && work.credits.length > 0 && (
            <p className="mt-1 text-sm text-foreground/60">{work.credits[0]}</p>
          )}
        </div>
        {work.year && <span className="text-sm text-foreground/50">{work.year}</span>}
      </div>
    </Link>
  );
}

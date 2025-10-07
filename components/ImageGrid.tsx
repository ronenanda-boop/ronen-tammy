import Image from "next/image";
import clsx from "classnames";
import type { SanityImage } from "@/types/content";
import { urlForImage } from "@/lib/sanity.image";

interface ImageGridProps {
  images?: SanityImage[];
  columns?: 2 | 3 | 4;
}

export default function ImageGrid({ images = [], columns = 3 }: ImageGridProps) {
  if (!images || images.length === 0) return null;

  const columnClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4"
  }[columns];

  return (
    <div className={clsx("grid gap-4", columnClass)}>
      {images.map((image, index) => {
        const src = urlForImage(image)?.width(1200).height(900).url();
        if (!src) return null;
        return (
          <div key={image.asset?._ref ?? index} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={src}
              alt={image.alt || "Studio visual"}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
        );
      })}
    </div>
  );
}

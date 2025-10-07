"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const VideoPlayer = dynamic(() => import("./VideoPlayer"), { ssr: false });

interface HeroVideoProps {
  videoUrl?: string | null;
  posterUrl?: string;
  title: string;
}

export default function HeroVideo({ videoUrl, posterUrl, title }: HeroVideoProps) {
  if (!videoUrl) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-foreground/10">
        {posterUrl && (
          <Image src={posterUrl} alt={title} fill className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
      </div>
    );
  }

  return (
    <VideoPlayer
      url={videoUrl}
      light={posterUrl ?? true}
      playing
      muted
      loop
      controls={false}
      className="overflow-hidden rounded-3xl"
    />
  );
}

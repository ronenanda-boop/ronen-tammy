"use client";

import ReactPlayer from "react-player/lazy";
import { useState } from "react";

interface VideoPlayerProps {
  url: string;
  light?: boolean | string;
  controls?: boolean;
  playing?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

export default function VideoPlayer({
  url,
  light = true,
  controls = true,
  playing = false,
  loop = false,
  muted = false,
  className
}: VideoPlayerProps) {
  const [ready, setReady] = useState(false);

  return (
    <div className={className}>
      <div className="aspect-video overflow-hidden rounded-2xl bg-foreground/10">
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          light={light}
          controls={controls}
          playing={playing && ready}
          loop={loop}
          muted={muted}
          playsinline
          onReady={() => setReady(true)}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                preload: "metadata"
              }
            }
          }}
        />
      </div>
    </div>
  );
}

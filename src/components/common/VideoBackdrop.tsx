'use client';

import React, { useEffect, useRef } from 'react';
import { getAssetPath } from '@/lib/assets';

interface VideoBackdropProps {
  src: string;
  /** Tint layer over the footage. Keep it light so the video stays legible. */
  scrimClassName?: string;
  /** Extra overlay layers (edge fades, colour washes) rendered above the scrim. */
  children?: React.ReactNode;
}

export function VideoBackdrop({
  src,
  scrimClassName = 'bg-[#060B18]/45',
  children,
}: VideoBackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        className="h-full w-full object-cover object-center scale-105"
      >
        <source src={getAssetPath(src)} type="video/mp4" />
      </video>

      <div className={`absolute inset-0 ${scrimClassName}`} />
      {children}
    </div>
  );
}

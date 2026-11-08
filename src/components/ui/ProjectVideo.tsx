"use client";

import { useEffect, useRef } from "react";
import type { ProjectVideo as ProjectVideoData } from "@/types";

type ProjectVideoProps = {
  video: ProjectVideoData;
};

// Muted looping demo inside a device screen. It only plays while visible and
// stays on the poster for people who prefer reduced motion.
export function ProjectVideo({ video }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;

    const update = () => {
      if (isVisible && !reducedMotion.matches) {
        element.play().catch(() => {
          // Autoplay can be blocked; the poster stays visible.
        });
      } else {
        element.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    reducedMotion.addEventListener("change", update);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      poster={video.poster}
      aria-label={video.label}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 h-full w-full object-cover object-top"
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}

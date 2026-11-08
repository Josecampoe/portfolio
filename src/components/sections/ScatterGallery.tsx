"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { GalleryItem } from "@/types";

// Where each photo sits on desktop (percent of the gallery box) and how fast it drifts.
const SPOTS = [
  { left: 0, top: 3, width: 30, speed: 0.5 },
  { left: 36, top: 0, width: 17, speed: -0.35 },
  { left: 62, top: 9, width: 19, speed: 0.6 },
  { left: 5, top: 40, width: 32, speed: -0.45 },
  { left: 44, top: 45, width: 17, speed: 0.4 },
  { left: 68, top: 52, width: 27, speed: -0.5 },
  { left: 22, top: 72, width: 30, speed: 0.55 },
];

const ASPECT: Record<GalleryItem["shape"], string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};

// Parallax only where the photos are scattered (tablet and up).
const WIDE_QUERY = "(min-width: 768px)";
function useIsWide() {
  return useSyncExternalStore(
    (listener) => {
      const query = window.matchMedia(WIDE_QUERY);
      query.addEventListener("change", listener);
      return () => query.removeEventListener("change", listener);
    },
    () => window.matchMedia(WIDE_QUERY).matches,
    () => false,
  );
}

type ScatterGalleryProps = {
  title: string;
  items: GalleryItem[];
};

function GalleryPhoto({
  item,
  index,
  progress,
  isStill,
}: {
  item: GalleryItem;
  index: number;
  progress: MotionValue<number>;
  isStill: boolean;
}) {
  const spot = SPOTS[index % SPOTS.length];
  const drift = isStill ? 0 : spot.speed * 80;
  const y = useTransform(progress, [0, 1], [drift, -drift]);

  return (
    <motion.figure
      style={{
        y,
        "--left": `${spot.left}%`,
        "--top": `${spot.top}%`,
        "--width": `${spot.width}%`,
      } as never}
      className="group relative md:absolute md:top-[var(--top)] md:left-[var(--left)] md:w-[var(--width)]"
    >
      <div
        className={`relative overflow-hidden rounded-xl ring-1 ring-line ${ASPECT[item.shape]} ${
          item.image ? "bg-surface-2" : "cover-pattern border border-dashed border-line-strong bg-surface-2"
        }`}
      >
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 768px) 30vw, 45vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        ) : null}
      </div>
      <figcaption className="mt-2 text-xs font-medium text-muted">{item.caption}</figcaption>
    </motion.figure>
  );
}

// Photos of different sizes spread over the screen, drifting at different speeds on scroll.
export function ScatterGallery({ title, items }: ScatterGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isWide = useIsWide();
  const isStill = (useReducedMotion() ?? false) || !isWide;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} className="mt-20">
      <h3 className="mx-auto max-w-xl text-center font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
        <span className="text-accent">.</span>
      </h3>
      <div className="relative mt-10 grid grid-cols-2 gap-4 md:block md:h-[56rem] lg:h-[62rem]">
        {items.map((item, index) => (
          <GalleryPhoto
            key={item.id}
            item={item}
            index={index}
            progress={scrollYProgress}
            isStill={isStill}
          />
        ))}
      </div>
    </div>
  );
}

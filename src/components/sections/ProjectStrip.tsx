"use client";

import type { CSSProperties, Ref } from "react";
import { motion } from "motion/react";
import type { Project } from "@/types";
import { uiText } from "@/data/ui";
import { StaggerItem } from "@/components/ui/Stagger";
import { ProjectCover } from "@/components/ui/ProjectCover";

// Desktop layout: each strip sits a little lower or higher and has its own height.
const OFFSETS = ["0rem", "2.75rem", "1rem", "3.75rem"];
const HEIGHTS = ["94%", "84%", "100%", "86%"];

type ProjectStripProps = {
  project: Project;
  index: number;
  category: string;
  isHovered: boolean;
  isDimmed: boolean;
  isHidden: boolean;
  buttonRef: Ref<HTMLButtonElement>;
  onOpen: () => void;
  onHover: (isHovered: boolean) => void;
};

// A tall, narrow poster. Hover or focus widens it (accordion); click opens the detail.
export function ProjectStrip({
  project,
  index,
  category,
  isHovered,
  isDimmed,
  isHidden,
  buttonRef,
  onOpen,
  onHover,
}: ProjectStripProps) {
  const layout = {
    "--grow": isHovered ? 2.3 : 1,
    "--offset": OFFSETS[index % OFFSETS.length],
    "--h": HEIGHTS[index % HEIGHTS.length],
  } as CSSProperties;

  return (
    <StaggerItem
      style={layout}
      className="strip flex h-[min(68vh,27rem)] w-[68vw] max-w-[17rem] shrink-0 snap-center flex-col md:mt-[var(--offset)] md:h-[var(--h)] md:w-auto md:max-w-none md:min-w-0"
    >
      <p className="mb-2 text-center text-xs font-semibold tracking-[0.18em] text-muted uppercase">
        {category}
      </p>
      <button
        ref={buttonRef}
        type="button"
        onClick={onOpen}
        onPointerEnter={(event) => event.pointerType === "mouse" && onHover(true)}
        onPointerLeave={(event) => event.pointerType === "mouse" && onHover(false)}
        onFocus={() => onHover(true)}
        onBlur={() => onHover(false)}
        aria-label={`${project.title}, ${category}. ${uiText.projects.open}`}
        className="relative block w-full flex-1 overflow-hidden rounded-xl ring-1 ring-line transition-[filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          filter: isDimmed
            ? "brightness(0.42) saturate(0.6)"
            : isHovered
              ? "brightness(1.08) saturate(1.05)"
              : "brightness(1)",
        }}
      >
        {/* The same cover grows into the detail card (shared layout transition) */}
        {isHidden ? null : (
          <motion.span
            layoutId={`cover-${project.id}`}
            className="absolute inset-0 block overflow-hidden rounded-xl"
          >
            <motion.span layout className="absolute inset-0 block">
              <ProjectCover project={project} sizes="(min-width: 768px) 30vw, 68vw" />
            </motion.span>
          </motion.span>
        )}
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-4 pt-20 text-left text-white">
          <span className="block font-display text-xl leading-tight font-bold tracking-tight">
            {project.title}
          </span>
          <span className="mt-0.5 block text-xs text-white/75">{project.year}</span>
        </span>
      </button>
    </StaggerItem>
  );
}

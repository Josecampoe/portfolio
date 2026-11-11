"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Project } from "@/types";
import { uiText } from "@/data/ui";
import { ArrowDownIcon, CloseIcon, GitHubIcon } from "@/components/ui/Icons";
import { easeOut } from "@/components/ui/Stagger";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { DeviceStage } from "@/components/ui/DeviceStage";
import { ProjectVideo } from "@/components/ui/ProjectVideo";

type ProjectDetailProps = {
  project: Project;
  category: string;
  onClose: () => void;
};

const contentIn = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut, delay: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// Wide card that grows out of the strip's cover. Escape or the X closes it.
export function ProjectDetail({ project, category, onClose }: ProjectDetailProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `detail-${project.id}`;

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-labelledby={titleId}
      className="relative z-10 min-h-[clamp(26rem,66vh,42rem)] overflow-hidden rounded-2xl [grid-area:1/1]"
    >
      <motion.div
        layoutId={`cover-${project.id}`}
        transition={{ duration: 0.55, ease: easeOut }}
        className="absolute inset-0 overflow-hidden rounded-2xl"
      >
        <motion.div layout className="absolute inset-0">
          <ProjectCover project={project} sizes="100vw" plain />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.15 } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/25 lg:bg-gradient-to-r"
      />

      <motion.div
        {...contentIn}
        className="relative grid items-center gap-10 p-6 pt-16 text-white sm:p-10 sm:pt-16 lg:grid-cols-2 lg:gap-12"
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-white/75 uppercase">
            {category} · {project.year}
          </p>
          <h3
            id={titleId}
            className="mt-3 font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-balance sm:text-7xl lg:text-6xl 2xl:text-7xl"
          >
            {project.title}
            <span className="text-accent">.</span>
          </h3>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 text-pretty sm:text-lg">
            {project.description}
          </p>

          <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">
            {uiText.projects.stack}
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-white/10 px-2 py-1 font-mono text-xs text-white/90 ring-1 ring-white/15"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-semibold"
            >
              <span className="grid size-12 place-items-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-105">
                <GitHubIcon />
              </span>
              {uiText.projects.code}
            </a>
            <a
              href={project.demo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-semibold"
            >
              <span className="grid size-12 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-300 group-hover:scale-105">
                <ArrowDownIcon />
              </span>
              {project.demo.label}
            </a>
          </div>
        </div>

        {project.video || project.image ? (
          <div className="mx-auto w-full max-w-3xl lg:max-w-none">
            <DeviceStage kind={project.device}>
              <DeviceFrame kind={project.device} title={project.title}>
                {project.video ? (
                  <ProjectVideo video={project.video} />
                ) : project.image ? (
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover object-top"
                  />
                ) : null}
              </DeviceFrame>
            </DeviceStage>
          </div>
        ) : null}

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={uiText.projects.close}
          className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white hover:text-black"
        >
          <CloseIcon />
        </button>
      </motion.div>
    </div>
  );
}

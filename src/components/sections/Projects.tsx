"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { projectCategories, projects } from "@/data/projects";
import { sections } from "@/data/sections";
import { projectHashPrefix, uiText } from "@/data/ui";
import { goToHash, projectIdFromHash, useHash } from "@/lib/viewHash";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import { ProjectStrip } from "./ProjectStrip";
import { ProjectDetail } from "./ProjectDetail";

const categoryLabel = (id: string) =>
  projectCategories.find((category) => category.id === id)?.label ?? id;

// Projects as tall strips. The URL hash (#proyecto-busalert) opens a project's detail.
export function Projects() {
  const selectedId = projectIdFromHash(useHash());
  const selected = projects.find((project) => project.id === selectedId) ?? null;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const stripRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const returnFocusTo = useRef<string | null>(null);

  const openProject = (id: string) => {
    goToHash(`${projectHashPrefix}${id}`);
  };

  const closeProject = useCallback(() => {
    returnFocusTo.current = selectedId;
    goToHash("projects");
  }, [selectedId]);

  // Give focus back to the strip that was open.
  useEffect(() => {
    if (selected || !returnFocusTo.current) return;
    stripRefs.current[returnFocusTo.current]?.focus({ preventScroll: true });
    returnFocusTo.current = null;
  }, [selected]);

  return (
    <section aria-labelledby="projects-title">
      <StaggerGroup>
        <SectionHeading
          id="projects-title"
          title={sections.projects.title}
          intro={sections.projects.intro}
        />
        <StaggerItem>
          <p className="mb-6 hidden text-sm text-muted md:block">{uiText.projects.hint}</p>
          <p className="mb-4 text-sm text-muted md:hidden">{uiText.projects.swipeHint}</p>
        </StaggerItem>

        <LayoutGroup>
          <div className="grid grid-cols-[minmax(0,1fr)]">
            <div
              inert={selected !== null}
              aria-hidden={selected !== null}
              className={`[grid-area:1/1] transition-opacity duration-300 ${selected ? "opacity-0" : "opacity-100"}`}
            >
              <StaggerGroup
                nested
                className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:h-[clamp(26rem,64vh,40rem)] md:snap-none md:items-start md:overflow-visible md:px-0 lg:gap-4"
              >
                {projects.map((project, index) => (
                  <ProjectStrip
                    key={project.id}
                    project={project}
                    index={index}
                    category={categoryLabel(project.categories[0])}
                    isHovered={hoveredId === project.id}
                    isDimmed={hoveredId !== null && hoveredId !== project.id}
                    isHidden={selected?.id === project.id}
                    buttonRef={(element) => {
                      stripRefs.current[project.id] = element;
                    }}
                    onOpen={() => openProject(project.id)}
                    onHover={(isHovered) =>
                      setHoveredId((current) =>
                        isHovered ? project.id : current === project.id ? null : current,
                      )
                    }
                  />
                ))}
              </StaggerGroup>
            </div>

            <AnimatePresence>
              {selected ? (
                <ProjectDetail
                  key={selected.id}
                  project={selected}
                  category={categoryLabel(selected.categories[0])}
                  onClose={closeProject}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </StaggerGroup>
    </section>
  );
}

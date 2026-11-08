import type { ComponentType, SVGProps } from "react";
import type { InterestIcon } from "@/types";
import {
  aboutParagraphs,
  focusAreas,
  focusTitle,
  gallery,
  galleryTitle,
  interests,
  interestsTitle,
} from "@/data/about";
import { sections } from "@/data/sections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import {
  GamepadIcon,
  HeadphonesIcon,
  ShieldIcon,
  SmileIcon,
  SparklesIcon,
  TrophyIcon,
} from "@/components/ui/Icons";
import { ScatterGallery } from "./ScatterGallery";

const icons: Record<InterestIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  fun: SmileIcon,
  sports: TrophyIcon,
  games: GamepadIcon,
  music: HeadphonesIcon,
  security: ShieldIcon,
  ai: SparklesIcon,
};

export function About() {
  return (
    <section aria-labelledby="about-title">
      <StaggerGroup>
        <SectionHeading id="about-title" title={sections.about.title} intro={sections.about.intro} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          <StaggerItem className="max-w-[65ch] space-y-5 text-lg leading-relaxed text-muted text-pretty">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </StaggerItem>

          <StaggerItem>
            <h3 className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">{interestsTitle}</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {interests.map((interest) => {
                const Icon = icons[interest.icon];
                return (
                  <li
                    key={interest.id}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-3 pr-4 transition-colors duration-500 hover:border-accent/60 hover:bg-surface"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-text transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
                      <Icon width={20} height={20} />
                    </span>
                    <span>
                      <span className="block font-semibold">{interest.label}</span>
                      <span className="block text-sm text-muted">{interest.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </StaggerItem>
        </div>

        <StaggerItem className="mt-14">
          <h3 className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">{focusTitle}</h3>
        </StaggerItem>
        <StaggerGroup nested className="accordion mt-4 flex flex-col gap-4 sm:flex-row">
          {focusAreas.map((area) => {
            const Icon = icons[area.icon];
            return (
              <StaggerItem key={area.id} className="accordion-item sm:min-w-0">
                <article
                  tabIndex={0}
                  className="group relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-2xl bg-ink p-6 text-bg ring-1 ring-line sm:p-8 dark:bg-surface-2 dark:text-ink"
                >
                  <Icon
                    aria-hidden="true"
                    width={180}
                    height={180}
                    strokeWidth={1}
                    className="absolute -right-6 -bottom-8 text-bg/10 transition-transform dark:text-ink/10 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-110"
                  />
                  <span className="grid size-12 place-items-center rounded-full bg-accent text-on-accent">
                    <Icon width={22} height={22} />
                  </span>
                  <div className="relative mt-10">
                    <h4 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                      {area.title}
                      <span className="text-accent">.</span>
                    </h4>
                    <p className="mt-3 max-w-md leading-relaxed text-bg/75 text-pretty dark:text-ink/75">{area.description}</p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <StaggerItem>
          <ScatterGallery title={galleryTitle} items={gallery} />
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

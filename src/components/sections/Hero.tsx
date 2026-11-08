import Image from "next/image";
import { profile } from "@/data/profile";
import { projectCategories, projects } from "@/data/projects";
import { projectHashPrefix, uiText } from "@/data/ui";
import { ArrowDownIcon, FileIcon, PinIcon } from "@/components/ui/Icons";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import { ProjectCover } from "@/components/ui/ProjectCover";

const categoryLabel = (id: string) =>
  projectCategories.find((category) => category.id === id)?.label ?? id;

// Home view: a featured card with the photo as a wide poster strip.
export function Hero() {
  const isSvgPhoto = profile.photo.src.endsWith(".svg");

  return (
    <section aria-labelledby="hero-title">
      <StaggerGroup className="grid items-center gap-10 lg:min-h-[calc(100dvh-14rem)] lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:gap-14">
        <div className="order-2 lg:order-1">
          <StaggerItem>
            <p className="text-lg text-muted">{profile.greeting}</p>
          </StaggerItem>
          <StaggerItem>
            <h1
              id="hero-title"
              className="mt-2 font-display text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl xl:text-7xl"
            >
              {profile.firstName}
              <br />
              {profile.lastName}
              <span className="text-accent">.</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 text-xl font-semibold sm:text-2xl">{profile.role}</p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted text-pretty">
              {profile.headline}
            </p>
          </StaggerItem>

          <StaggerItem>
            <ul className="mt-6 flex max-w-xl flex-wrap gap-2">
              {profile.specialties.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs"
                >
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary">
              {uiText.hero.primaryCta}
              <ArrowDownIcon />
            </a>
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <FileIcon />
              {uiText.hero.cvCta}
            </a>
            <p className="ml-1 flex items-center gap-2 text-sm text-muted">
              <PinIcon className="text-accent-text" />
              {profile.location}
            </p>
          </StaggerItem>

          {/* Small strips: a teaser of the projects view */}
          <StaggerItem className="mt-10">
            <p className="text-sm font-semibold text-muted">{uiText.hero.featured}</p>
            <ul className="mt-3 grid max-w-xl grid-cols-4 gap-2 sm:gap-3">
              {projects.map((project) => (
                <li key={project.id}>
                  <a
                    href={`#${projectHashPrefix}${project.id}`}
                    aria-label={`${project.title} · ${categoryLabel(project.categories[0])}`}
                    className="group block"
                  >
                    <span className="relative block aspect-[3/4] overflow-hidden rounded-lg ring-1 ring-line transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                      <ProjectCover project={project} sizes="120px" compact />
                    </span>
                    <span className="mt-1.5 block truncate text-xs font-medium text-muted transition-colors group-hover:text-ink">
                      {project.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </div>

        <StaggerItem className="order-1 mx-auto w-full max-w-[15rem] sm:max-w-[19rem] lg:order-2 lg:max-w-[22rem]">
          <div className="relative isolate">
            {/* Susanoo-like chakra aura burning behind the photo */}
            <div aria-hidden="true" className="susanoo absolute -inset-[12%] -z-10">
              <span className="susanoo-flame" />
              <span className="susanoo-flame" />
              <span className="susanoo-flame" />
              <span className="susanoo-flame" />
              <span className="susanoo-flame" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-2xl shadow-black/15">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                fill
                sizes="(min-width: 1024px) 352px, 90vw"
                loading="eager"
                fetchPriority="high"
                unoptimized={isSvgPhoto}
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12 text-white">
                <p className="text-xs text-white/80">{profile.badge.label}</p>
                <p className="font-semibold">{profile.badge.value}</p>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

import Image from "next/image";
import type { Project } from "@/types";

type ProjectCoverProps = {
  project: Project;
  sizes: string;
  // Smaller title for thumbnails.
  compact?: boolean;
  priority?: boolean;
  // Only the brand color, without the logo (background of the detail card).
  plain?: boolean;
};

const brandBackground = (tint: string) =>
  `radial-gradient(120% 80% at 50% 30%, color-mix(in oklab, ${tint} 75%, white) 0%, ${tint} 55%, color-mix(in oklab, ${tint} 65%, black) 100%)`;

// Vertical poster of a project: its logo over the brand color.
// Falls back to a "cover" image, or to a CSS cover with the vertical name.
export function ProjectCover({
  project,
  sizes,
  compact = false,
  priority = false,
  plain = false,
}: ProjectCoverProps) {
  if (plain) {
    return (
      <span
        className="absolute inset-0"
        style={{ backgroundColor: project.tint, backgroundImage: brandBackground(project.tint) }}
      />
    );
  }

  if (project.logo) {
    const isWordmark = project.logo.kind === "wordmark";
    return (
      <span
        className="absolute inset-0 flex items-center justify-center overflow-hidden pb-[16%]"
        // A wordmark sits on its own flat background, so it keeps the flat tint.
        style={{
          backgroundColor: project.tint,
          backgroundImage: isWordmark ? undefined : brandBackground(project.tint),
        }}
      >
        {isWordmark ? null : <span aria-hidden="true" className="cover-pattern absolute inset-0" />}
        <span
          className={`relative block ${
            isWordmark
              ? "aspect-[620/110] w-[86%] max-w-[22rem]"
              : `aspect-square max-w-48 drop-shadow-[0_12px_24px_rgb(0_0_0/0.35)] ${compact ? "w-[62%]" : "w-[50%]"}`
          }`}
        >
          <Image
            src={project.logo.src}
            alt={project.logo.alt}
            fill
            sizes={isWordmark ? sizes : "(min-width: 768px) 12rem, 40vw"}
            priority={priority}
            unoptimized={project.logo.src.endsWith(".svg")}
            className="object-contain"
          />
        </span>
      </span>
    );
  }

  if (project.cover) {
    return (
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    );
  }

  return (
    <span
      className="absolute inset-0 flex items-end justify-start overflow-hidden p-[8%]"
      style={{ backgroundColor: project.tint, backgroundImage: brandBackground(project.tint) }}
    >
      <span aria-hidden="true" className="cover-pattern absolute inset-0" />
      <span
        className={`relative font-display leading-none font-extrabold tracking-tight text-white/90 [writing-mode:vertical-rl] rotate-180 ${
          compact ? "text-lg" : "text-5xl"
        }`}
      >
        {project.title}
      </span>
    </span>
  );
}

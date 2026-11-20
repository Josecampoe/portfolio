import Image from "next/image";
import type { GalleryItem, Project } from "@/types";
import { projectCategories, projects } from "@/data/projects";
import { projectHashPrefix } from "@/data/ui";
import { ProjectVideo } from "@/components/ui/ProjectVideo";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

const SIZE: Record<GalleryItem["size"], string> = {
  feature: "col-span-2 row-span-2",
  tall: "row-span-2",
  wide: "col-span-2",
  small: "",
};

const categoryLabel = (project: Project) =>
  projectCategories.find((category) => category.id === project.categories[0])?.label ??
  project.categories[0];

// The screenshot or, without one, the project's demo video.
function Media({ item, project }: { item: GalleryItem; project: Project }) {
  if (item.image) {
    return (
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes="(min-width: 1024px) 40vw, 90vw"
        className="object-cover object-top"
      />
    );
  }
  return project.video ? <ProjectVideo video={project.video} /> : null;
}

function Tile({ item, project }: { item: GalleryItem; project: Project }) {
  const zoom = "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <a
      href={`#${projectHashPrefix}${project.id}`}
      aria-label={`${project.title}: ${item.caption}`}
      style={{ backgroundColor: project.tint }}
      className={`group relative isolate block overflow-hidden rounded-2xl ring-1 ring-line outline-none focus-visible:ring-2 focus-visible:ring-accent ${SIZE[item.size]}`}
    >
      {/* Soft light behind the devices so they lift off the brand color */}
      {item.frame !== "fill" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgb(255_255_255/0.18),transparent_65%)]"
        />
      )}

      {item.frame === "fill" && (
        <div className={`absolute inset-0 group-hover:scale-[1.04] ${zoom}`}>
          <Media item={item} project={project} />
        </div>
      )}

      {item.frame === "phone" && (
        <div className="absolute inset-x-0 top-[9%] bottom-0 flex justify-center">
          <div
            className={`relative aspect-[9/19] h-[125%] overflow-hidden rounded-[1.6rem] border-[5px] border-black/70 bg-black shadow-2xl shadow-black/40 group-hover:-translate-y-[4%] ${zoom}`}
          >
            <Media item={item} project={project} />
          </div>
        </div>
      )}

      {item.frame === "watch" && (
        <div className="absolute inset-x-0 top-0 bottom-[22%] grid place-items-center">
          <div
            className={`relative aspect-square w-[80%] max-w-[15rem] overflow-hidden rounded-full border-[7px] border-black/75 bg-black shadow-2xl shadow-black/40 ring-1 ring-white/15 group-hover:scale-[1.05] ${zoom}`}
          >
            <Media item={item} project={project} />
          </div>
        </div>
      )}

      {/* Shade so the text reads over any capture */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
      />

      <span className="absolute top-3 left-3 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[0.68rem] text-white/90 backdrop-blur-sm">
        {categoryLabel(project)}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-3 right-3 grid size-8 translate-y-1 place-items-center rounded-full bg-white text-black opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        <ArrowUpRightIcon />
      </span>

      <span className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
        <span className="block font-display text-lg leading-tight font-bold sm:text-xl">
          {project.title}
          <span className="text-accent">.</span>
        </span>
        <span className="mt-0.5 block text-sm leading-snug text-white/75 text-pretty">{item.caption}</span>
      </span>
    </a>
  );
}

type ProjectMosaicProps = {
  title: string;
  items: GalleryItem[];
};

// A bento of the current projects: demos play inside their device, each tile opens the project.
export function ProjectMosaic({ title, items }: ProjectMosaicProps) {
  return (
    <div className="mt-20">
      <h3 className="mx-auto max-w-xl text-center font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
        <span className="text-accent">.</span>
      </h3>
      <div className="mt-10 grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[12.5rem] xl:auto-rows-[14rem]">
        {items.map((item) => {
          const project = projects.find((entry) => entry.id === item.projectId);
          return project ? <Tile key={item.id} item={item} project={project} /> : null;
        })}
      </div>
    </div>
  );
}

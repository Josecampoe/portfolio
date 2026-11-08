import type { TimelineItem } from "@/types";
import { education, experienceTitles, workExperience } from "@/data/experience";
import { sections } from "@/data/sections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";

function Timeline({ title, items }: { title: string; items: TimelineItem[] }) {
  return (
    <StaggerGroup nested>
      <StaggerItem>
        <h3 className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">{title}</h3>
      </StaggerItem>
      <ol className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <StaggerItem
            as="li"
            key={item.id}
            className="group relative rounded-2xl border border-line bg-surface/70 p-5 pl-6 transition-colors duration-500 hover:border-accent/60 hover:bg-surface"
          >
            <span
              aria-hidden="true"
              className="absolute top-5 bottom-5 left-0 w-[3px] origin-top scale-y-0 rounded-full bg-accent transition-transform duration-500 group-hover:scale-y-100"
            />
            <p className="font-mono text-xs text-accent-text">{item.period}</p>
            <h4 className="mt-1 text-lg font-semibold">{item.title}</h4>
            <p className="text-sm text-muted">{item.place}</p>
            <p className="mt-2 leading-relaxed text-muted text-pretty">{item.description}</p>
            {item.tags ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li key={tag} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </StaggerItem>
        ))}
      </ol>
    </StaggerGroup>
  );
}

export function Experience() {
  return (
    <section aria-labelledby="experience-title">
      <StaggerGroup>
        <SectionHeading
          id="experience-title"
          title={sections.experience.title}
          intro={sections.experience.intro}
        />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <Timeline title={experienceTitles.work} items={workExperience} />
          <Timeline title={experienceTitles.education} items={education} />
        </div>
      </StaggerGroup>
    </section>
  );
}

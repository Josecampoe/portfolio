import { languages } from "@/data/languages";
import { sections } from "@/data/sections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";

// Additional free section. Cards widen on hover like the project strips.
export function Languages() {
  return (
    <section aria-labelledby="languages-title">
      <StaggerGroup>
        <SectionHeading
          id="languages-title"
          title={sections.languages.title}
          intro={sections.languages.intro}
        />

        <StaggerGroup nested className="accordion flex max-w-4xl flex-col gap-4 sm:flex-row">
          {languages.map((language) => (
            <StaggerItem key={language.id} className="accordion-item sm:min-w-0">
              <article
                tabIndex={0}
                className="group relative flex h-full min-h-60 flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent/60 focus-visible:border-accent/60"
              >
                <p
                  lang={language.id}
                  className="font-display text-5xl font-extrabold tracking-tight transition-colors duration-500 group-hover:text-accent-text sm:text-6xl"
                >
                  {language.greeting}
                </p>
                <div className="mt-10 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{language.name}</h3>
                    <p className="text-sm text-muted">{language.note}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent px-3 py-1 font-mono text-xs font-semibold text-on-accent">
                    {language.level}
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </StaggerGroup>
    </section>
  );
}

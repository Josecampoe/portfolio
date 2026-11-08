import { StaggerItem } from "./Stagger";

type SectionHeadingProps = {
  title: string;
  intro?: string;
  centered?: boolean;
  // id of the <h2>, used by the section's aria-labelledby.
  id?: string;
};

// The red dot closing each title repeats the brand mark from the logo and the intro.
// Must be placed inside a <StaggerGroup>.
export function SectionHeading({ title, intro, centered = false, id }: SectionHeadingProps) {
  const endsWithPunctuation = /[?!.]$/.test(title);

  return (
    <StaggerItem className={`mb-10 max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <h2 id={id} className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        {title}
        {endsWithPunctuation ? null : <span className="text-accent">.</span>}
      </h2>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{intro}</p> : null}
    </StaggerItem>
  );
}

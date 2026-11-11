import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import { sections } from "@/data/sections";
import { getInitials } from "@/lib/validation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import { QuoteIcon } from "@/components/ui/Icons";

// Tall cards in a row on wide screens (stacked below, so long quotes stay
// readable); the hovered one widens like the project strips.
export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title">
      <StaggerGroup>
        <SectionHeading
          id="testimonials-title"
          title={sections.testimonials.title}
          intro={sections.testimonials.intro}
        />

        <StaggerGroup nested className="accordion flex flex-col gap-4 xl:min-h-[24rem] xl:flex-row">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={testimonial.id} className="accordion-item xl:min-w-0">
              <figure
                tabIndex={0}
                className={`group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors duration-500 hover:border-accent/60 focus-visible:border-accent/60 ${
                  index === 1 ? "xl:mt-6" : ""
                }`}
              >
                <QuoteIcon className="text-accent" />
                <blockquote className="mt-5 flex-1 leading-relaxed text-pretty">{testimonial.quote}</blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                  {testimonial.photo ? (
                    <Image
                      src={testimonial.photo.src}
                      alt={testimonial.photo.alt}
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft font-display font-bold text-accent-text"
                    >
                      {getInitials(testimonial.name)}
                    </span>
                  )}
                  <span>
                    <span className="block font-semibold">{testimonial.name}</span>
                    <span className="block text-sm text-muted">
                      {testimonial.role} · {testimonial.organization}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </StaggerGroup>
    </section>
  );
}

import { contactText } from "@/data/contact";
import { profile } from "@/data/profile";
import { sections } from "@/data/sections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import { MailIcon, socialIcons } from "@/components/ui/Icons";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section aria-labelledby="contact-title">
      <StaggerGroup>
        <SectionHeading id="contact-title" title={sections.contact.title} intro={sections.contact.intro} />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <StaggerItem>
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
              {contactText.emailLabel}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-flex items-center gap-3 font-display text-xl font-bold tracking-tight break-all underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent-text sm:text-2xl"
            >
              <MailIcon className="size-6 shrink-0 text-accent-text" />
              {profile.email}
            </a>

            <p className="mt-10 text-xs font-semibold tracking-[0.18em] text-muted uppercase">
              {contactText.socialLabel}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {profile.socials.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-4 transition-colors duration-500 hover:border-accent/60 hover:bg-surface"
                    >
                      <span className="grid size-11 place-items-center rounded-full bg-accent-soft text-accent-text transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
                        <Icon />
                      </span>
                      <span>
                        <span className="block font-semibold">{social.name}</span>
                        <span className="block text-sm text-muted">{social.handle}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <ContactForm />
          </StaggerItem>
        </div>
      </StaggerGroup>
    </section>
  );
}

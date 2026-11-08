import { profile } from "@/data/profile";
import { uiText } from "@/data/ui";
import { socialIcons } from "@/components/ui/Icons";
import { CopyrightYear } from "./CopyrightYear";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="text-sm text-muted">
          <p>
            <span className="font-display text-base font-bold text-ink">
              {profile.initials}
              <span className="text-accent">.</span>
            </span>{" "}
            © <CopyrightYear /> {profile.fullName}. {uiText.footer.rights}
          </p>
          <p className="mt-1">{uiText.footer.builtWith}</p>
        </div>

        <div className="flex items-center gap-2">
          {profile.socials.map((social) => {
            const Icon = socialIcons[social.name];
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="grid size-10 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-accent hover:text-accent-text"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

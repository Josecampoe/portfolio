import { navLinks } from "@/data/navigation";
import { uiText } from "@/data/ui";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";

type SideNavProps = {
  activeView: string;
};

// Vertical menu on the left of the frame (desktop). Items enter one by one.
export function SideNav({ activeView }: SideNavProps) {
  return (
    <nav
      aria-label={uiText.mainNav}
      className="sticky top-16 hidden self-start h-[calc(100dvh-5.5rem)] pt-8 pl-6 lg:block"
    >
      <StaggerGroup className="flex flex-col gap-1">
        {navLinks.map(({ id, label }) => {
          const isActive = activeView === id;
          return (
            <StaggerItem key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex items-center py-2 pl-4 text-[0.95rem] font-medium transition-colors duration-300 ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-accent transition-transform duration-300 ${
                    isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"
                  }`}
                />
                {label}
              </a>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </nav>
  );
}

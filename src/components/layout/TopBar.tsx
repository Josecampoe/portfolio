"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";
import { uiText } from "@/data/ui";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import { ThemeToggle } from "./ThemeToggle";

type TopBarProps = {
  activeView: string;
};

// Theme button on the left, "JC." in the center and the photo with the name on the right.
// On phones the left side also holds the hamburger menu.
export function TopBar({ activeView }: TopBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isSvgPhoto = profile.photo.src.endsWith(".svg");

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 rounded-t-[inherit] border-b border-line bg-frame-solid/80 backdrop-blur-md">
      <StaggerGroup className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-3 sm:px-6">
        <StaggerItem className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? uiText.closeMenu : uiText.openMenu}
            className="grid size-10 place-items-center rounded-full border border-line-strong lg:hidden"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <ThemeToggle />
        </StaggerItem>

        <StaggerItem>
          <a
            href={`#${navLinks[0].id}`}
            onClick={closeMenu}
            className="font-display text-2xl font-extrabold tracking-tight"
          >
            {profile.initials}
            <span className="text-accent">.</span>
          </a>
        </StaggerItem>

        <StaggerItem className="flex justify-end">
          <a
            href={`#${navLinks[0].id}`}
            onClick={closeMenu}
            className="flex items-center gap-3 rounded-full py-1 pr-1 pl-1 sm:pl-4"
          >
            <span className="hidden text-right text-sm leading-tight sm:block">
              <span className="block font-semibold">{profile.fullName}</span>
              <span className="block text-xs text-muted">{profile.role}</span>
            </span>
            <span className="relative size-9 overflow-hidden rounded-full ring-2 ring-accent ring-offset-2 ring-offset-bg">
              <Image
                src={profile.photo.src}
                alt=""
                fill
                sizes="36px"
                unoptimized={isSvgPhoto}
                className="object-cover object-[50%_35%]"
              />
            </span>
          </a>
        </StaggerItem>
      </StaggerGroup>

      <nav
        id="mobile-menu"
        aria-label={uiText.mainNav}
        className={`overflow-hidden border-line transition-[max-height] duration-300 lg:hidden ${
          isOpen ? "max-h-[30rem] border-t" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 p-3">
          {navLinks.map(({ id, label }) => {
            const isActive = activeView === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={closeMenu}
                  tabIndex={isOpen ? 0 : -1}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors ${
                    isActive ? "bg-accent-soft text-accent-text" : "hover:bg-surface-2"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-4 w-[3px] rounded-full ${isActive ? "bg-accent" : "bg-transparent"}`}
                  />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import { uiText } from "@/data/ui";
import { MoonIcon, SunIcon } from "@/components/ui/Icons";

const STORAGE_KEY = "theme";

function subscribe(listener: () => void) {
  const observer = new MutationObserver(listener);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const isDarkNow = () => document.documentElement.classList.contains("dark");

// Light is the default; the choice is remembered in localStorage.
export function ThemeToggle({ className = "" }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, isDarkNow, () => false);

  const toggle = () => {
    const next = !isDarkNow();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Storage can be blocked; the theme just isn't remembered.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? uiText.theme.toLight : uiText.theme.toDark}
      className={`grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent-text ${className}`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

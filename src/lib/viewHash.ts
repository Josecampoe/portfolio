"use client";

import { useSyncExternalStore } from "react";
import { navLinks } from "@/data/navigation";
import { projectHashPrefix } from "@/data/ui";

// The URL hash picks the visible view (#projects) or opens a project (#proyecto-busalert).
export const defaultView = navLinks[0].id;
const projectsView = "projects";

function subscribe(listener: () => void) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}

export function useHash() {
  return useSyncExternalStore(
    subscribe,
    () => decodeURIComponent(window.location.hash.slice(1)),
    () => "",
  );
}

export function projectIdFromHash(hash: string) {
  return hash.startsWith(projectHashPrefix) ? hash.slice(projectHashPrefix.length) : null;
}

export function viewFromHash(hash: string) {
  if (projectIdFromHash(hash)) return projectsView;
  return navLinks.some((link) => link.id === hash) ? hash : defaultView;
}

export function goToHash(hash: string) {
  window.location.hash = hash;
}

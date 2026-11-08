"use client";

import { useSyncExternalStore } from "react";

// Tells the page when the opening intro is over, so the frame can enter.
let isDone = false;
const listeners = new Set<() => void>();

export function finishIntro() {
  if (isDone) return;
  isDone = true;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  // Without the "has-intro" class the intro never plays (already seen or reduced motion).
  return isDone || !document.documentElement.classList.contains("has-intro");
}

export function useIntroDone() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

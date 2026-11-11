"use client";

import { useRef, type ReactNode } from "react";

// Keeps an accordion row from shrinking while the pointer is over it. Without
// this, widening a card reflows its text, the row gets shorter, the pointer
// falls outside, the card shrinks back and the hover flickers on and off.
export function StableHeight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const lock = () => {
    const element = ref.current;
    if (element) element.style.minHeight = `${element.offsetHeight}px`;
  };

  const release = () => {
    if (ref.current) ref.current.style.minHeight = "";
  };

  return (
    <div ref={ref} className={className} onPointerEnter={lock} onPointerLeave={release}>
      {children}
    </div>
  );
}

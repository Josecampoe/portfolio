"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { navLinks } from "@/data/navigation";
import { uiText } from "@/data/ui";
import { easeOut } from "@/components/ui/Stagger";

const LOAD_MS = 650;

type ViewLoaderProps = {
  view: string;
  onDone: () => void;
};

// Between views: the name of the next section while a red line fills up.
export function ViewLoader({ view, onDone }: ViewLoaderProps) {
  const link = navLinks.find((item) => item.id === view);

  useEffect(() => {
    const timer = window.setTimeout(onDone, LOAD_MS);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="grid min-h-[65vh] place-items-center"
    >
      <div className="w-[min(16rem,70vw)] text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: easeOut }}
          className="font-display text-3xl font-bold tracking-tight"
        >
          <span className="sr-only">{uiText.loading} </span>
          {link?.label}
          <span className="text-accent">.</span>
        </motion.p>
        <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-line">
          <motion.div
            className="h-full origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: (LOAD_MS - 100) / 1000, ease: easeOut }}
          />
        </div>
      </div>
    </motion.div>
  );
}

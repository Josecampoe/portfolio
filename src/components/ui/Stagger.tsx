"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { useIntroDone } from "@/lib/introState";

export const easeOut = [0.22, 1, 0.36, 1] as const;

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  // A nested group follows its parent instead of starting on its own.
  nested?: boolean;
};

// Children marked with <StaggerItem> enter one by one once the intro is over.
// With reduced motion, MotionConfig turns this into a plain fade.
export function StaggerGroup({ children, className, nested = false }: StaggerProps) {
  const isReady = useIntroDone();
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      {...(nested ? {} : { initial: "hidden", animate: isReady ? "show" : "hidden" })}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = Omit<StaggerProps, "nested"> & {
  // Render as a list item when the parent is a <ul> or <ol>.
  as?: "div" | "li";
};

export function StaggerItem({ children, className, style, as = "div" }: StaggerItemProps) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} style={style} variants={itemVariants}>
      {children}
    </Tag>
  );
}

"use client";

import { useCallback, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { uiText } from "@/data/ui";
import { useIntroDone } from "@/lib/introState";
import { defaultView, useHash, viewFromHash } from "@/lib/viewHash";
import { easeOut } from "@/components/ui/Stagger";
import { TopBar } from "./TopBar";
import { SideNav } from "./SideNav";
import { ViewLoader } from "./ViewLoader";

type AppFrameProps = {
  // One element per menu link, keyed by its id.
  views: Record<string, ReactNode>;
  // Rendered on the server (the copyright year is computed there).
  footer: ReactNode;
};

// The framed interface: top bar, side menu and one view at a time.
// Changing the hash fades the view out, shows the loader and brings the next one in.
export function AppFrame({ views, footer }: AppFrameProps) {
  const isReady = useIntroDone();
  const targetView = viewFromHash(useHash());
  const [shownView, setShownView] = useState(defaultView);
  const isLoading = shownView !== targetView;

  const finishLoading = useCallback(() => {
    setShownView(targetView);
    window.scrollTo({ top: 0 });
  }, [targetView]);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        {uiText.skipToContent}
      </a>

      <div className="p-2 sm:p-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="app-frame relative flex min-h-[calc(100dvh-1rem)] flex-col rounded-[14px] border border-line bg-frame sm:min-h-[calc(100dvh-1.5rem)]"
        >
          <div aria-hidden="true" className="frame-guides pointer-events-none absolute inset-0 rounded-[inherit]" />

          <TopBar activeView={targetView} />

          <div className="relative flex-1 lg:grid lg:grid-cols-[12.5rem_minmax(0,1fr)]">
            <SideNav activeView={targetView} />
            <main id="main" tabIndex={-1} className="min-w-0 px-4 pt-6 pb-14 outline-none sm:px-8 lg:pr-10 lg:pl-4">
              <AnimatePresence mode="wait" initial={false}>
                {isLoading ? (
                  <ViewLoader key={`loader-${targetView}`} view={targetView} onDone={finishLoading} />
                ) : (
                  <motion.div key={shownView} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
                    {views[shownView]}
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>

          {footer}
        </motion.div>
      </div>
    </MotionConfig>
  );
}

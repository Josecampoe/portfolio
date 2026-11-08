"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { profile } from "@/data/profile";
import { uiText } from "@/data/ui";
import { SharinganEye } from "@/components/ui/SharinganEye";
import { finishIntro } from "@/lib/introState";

const STORAGE_KEY = "introSeen";

// Same bubbles as the page background, made with CSS so they move on the first paint.
// Integer-only pseudo-random values, so server and browser markup are identical.
const random = (seed: number) => {
  let hash = Math.imul(seed ^ 0x5bd1e995, 0x2c1b3c6d);
  hash ^= hash >>> 15;
  hash = Math.imul(hash, 0x297a2d39);
  hash ^= hash >>> 12;
  return (hash >>> 0) / 4294967296;
};
const BUBBLES = Array.from({ length: 24 }, (_, index) => {
  const roll = random(index + 1);
  const kind = roll < 0.3 ? "ember" : roll < 0.5 ? "aura" : "flame";
  const duration = 2.4 + random(index + 50) * 1.6;
  return {
    kind,
    style: {
      "--x": `${(random(index + 100) * 100).toFixed(1)}%`,
      "--size": kind === "ember" ? `${Math.round(3 + random(index + 150) * 4)}px` : `${Math.round(60 + random(index + 150) * 90)}px`,
      "--sway": `${Math.round((random(index + 200) - 0.5) * 80)}px`,
      "--duration": `${duration.toFixed(2)}s`,
      "--delay": `${(-random(index + 250) * duration).toFixed(2)}s`,
    } as CSSProperties,
  };
});
const INTRO_DURATION_MS = 4350;
// The curtain starts lifting here; the frame enters behind it.
const REVEAL_AT_MS = 3650;

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage can be blocked; the intro simply plays again next time.
  }
}

function unlockPage() {
  document.documentElement.classList.remove("intro-lock");
}

// Opening sequence: the name rises and its dot (a tiny Sharingan) flies to the
// center among rising bubbles, grows and turns into the Mangekyou Sharingan.
// Then the eye dissolves into a soft pink screen, the photo appears and the
// curtain lifts to reveal the page.
// The animation is pure CSS (globals.css) so it starts on the first paint;
// this component only measures where the dot is, handles skipping and
// removes the overlay.
export function Intro() {
  const [isMounted, setIsMounted] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Without the "has-intro" class the overlay stays hidden by CSS.
    if (!document.documentElement.classList.contains("has-intro")) return;

    // The big eye starts exactly on top of the small dot, then flies to the center.
    // offsetLeft/offsetTop ignore the rising transform, so this is the dot's final spot.
    const overlay = overlayRef.current;
    const dot = dotRef.current;
    const eye = eyeRef.current;
    const stage = dot?.offsetParent;
    if (overlay && dot && eye && stage instanceof HTMLElement) {
      const stageRect = stage.getBoundingClientRect();
      const x = stageRect.left + dot.offsetLeft + dot.offsetWidth / 2 - window.innerWidth / 2;
      const y = stageRect.top + dot.offsetTop + dot.offsetHeight / 2 - window.innerHeight / 2;
      overlay.style.setProperty("--eye-from-x", `${x}px`);
      overlay.style.setProperty("--eye-from-y", `${y}px`);
      overlay.style.setProperty("--eye-from-scale", `${dot.offsetWidth / eye.offsetWidth}`);
    }

    markSeen();
    const revealTimer = window.setTimeout(finishIntro, REVEAL_AT_MS);
    const timer = window.setTimeout(() => {
      unlockPage();
      setIsMounted(false);
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(timer);
    };
  }, []);

  const skipIntro = () => {
    document.documentElement.classList.add("intro-skipped");
    unlockPage();
    finishIntro();
    window.setTimeout(() => setIsMounted(false), 320);
  };

  if (!isMounted) return null;

  const nameLines = [profile.firstName, profile.lastName];

  return (
    <div ref={overlayRef} className="intro-overlay">
      <div className="intro-stage" aria-hidden="true">
        <p className="intro-name">
          {nameLines.map((line, index) => {
            const isLast = index === nameLines.length - 1;
            return (
              <span key={line} className="intro-line">
                <span
                  className="intro-line-inner"
                  style={{ animationDelay: `${120 + index * 140}ms` }}
                >
                  {line}
                  {isLast ? (
                    <span ref={dotRef} className="intro-dot">
                      <SharinganEye className="intro-eye" />
                    </span>
                  ) : null}
                </span>
              </span>
            );
          })}
        </p>
        <p className="intro-role">{profile.role}</p>
      </div>

      <div className="intro-bubbles" aria-hidden="true">
        {BUBBLES.map((bubble, index) => (
          <span key={index} className="intro-bubble" data-kind={bubble.kind} style={bubble.style} />
        ))}
      </div>

      {/* The dot, now a big eye: Sharingan, then Mangekyou Sharingan, then it dissolves */}
      <div ref={eyeRef} className="intro-big-eye" aria-hidden="true">
        <SharinganEye withMangekyo className="size-full" />
        <span className="intro-eye-flash" />
      </div>

      <div className="intro-reveal" aria-hidden="true">
        <span className="intro-photo">
          {/* eslint-disable-next-line @next/next/no-img-element -- must paint instantly, without lazy loading */}
          <img src={profile.photo.src} alt="" />
        </span>
        <p className="intro-welcome">{uiText.intro.welcome}</p>
      </div>

      <button type="button" onClick={skipIntro} className="intro-skip">
        {uiText.intro.skip}
      </button>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { SharinganEye } from "@/components/ui/SharinganEye";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  age: number;
  life: number;
  phase: number;
  kind: "flame" | "aura" | "ember";
};

const CURSOR_RADIUS = 150;
const SCROLL_TURN = 0.06; // degrees of extra eye rotation per scrolled pixel

// Soft round sprite, drawn once and reused for every flame particle.
function makeSprite(color: string) {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return sprite;
}

// Fixed animated background: a giant spinning eye and Susanoo-like chakra
// flames rising from the bottom of the screen. The flames dodge the cursor.
export function ChakraBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const eye = eyeRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !eye || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Scroll turns the eye a little more.
    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        eye.style.setProperty("--scroll-turn", `${window.scrollY * SCROLL_TURN}deg`);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const sprites = {
      flame: makeSprite("rgba(214, 24, 38, 1)"),
      aura: makeSprite("rgba(118, 36, 160, 1)"),
    };

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let lastTime = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const maxParticles = () => (width < 640 ? 40 : 80);

    // Flames rise mostly from the sides, like an aura around the page.
    const spawn = (anywhere = false): Particle => {
      const roll = Math.random();
      const kind: Particle["kind"] = roll < 0.3 ? "ember" : roll < 0.48 ? "aura" : "flame";
      const side = Math.random();
      const x =
        side < 0.4
          ? Math.random() * width * 0.25
          : side < 0.8
            ? width * 0.75 + Math.random() * width * 0.25
            : Math.random() * width;
      return {
        x,
        y: anywhere ? Math.random() * height : height + 30,
        vx: 0,
        vy: -(kind === "ember" ? 0.7 + Math.random() * 1.1 : 0.35 + Math.random() * 0.6),
        size: kind === "ember" ? 1.5 + Math.random() * 2 : 40 + Math.random() * 70,
        age: 0,
        life: 5000 + Math.random() * 6000,
        phase: Math.random() * Math.PI * 2,
        kind,
      };
    };

    const draw = (now: number, dt: number) => {
      ctx.clearRect(0, 0, width, height);
      const step = dt / 16.7;

      while (particles.length < maxParticles()) particles.push(spawn());

      particles = particles.filter((p) => {
        p.age += dt;
        if (p.age > p.life || p.y < -120) return false;

        // Wavy rise.
        p.vx = Math.sin(now / 900 + p.phase) * (p.kind === "ember" ? 0.6 : 0.35);
        let push = 0;
        if (pointer) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < CURSOR_RADIUS && distance > 0) {
            push = 1 - distance / CURSOR_RADIUS;
            p.x += (dx / distance) * push * 4 * step;
            p.y += (dy / distance) * push * 2 * step;
          }
        }
        p.x += p.vx * step;
        p.y += p.vy * step;

        const t = p.age / p.life;
        const fade = Math.min(1, t / 0.15) * Math.min(1, (1 - t) / 0.45);

        if (p.kind === "ember") {
          ctx.globalAlpha = Math.min(1, fade * (0.75 + push));
          ctx.fillStyle = push > 0 ? "#ff3b47" : "#c8102e";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const size = p.size * (0.6 + t * 0.8);
          ctx.globalAlpha = fade * (p.kind === "aura" ? 0.22 : 0.3);
          ctx.drawImage(sprites[p.kind], p.x - size / 2, p.y - size / 2, size, size);
        }
        return true;
      });
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const dt = lastTime ? Math.min(now - lastTime, 50) : 16.7;
      lastTime = now;
      draw(now, dt);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || reducedMotion.matches || document.hidden) return;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
    };
    const onPointerLeave = () => {
      pointer = null;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        stop();
        ctx.clearRect(0, 0, width, height);
      } else {
        start();
      }
    };

    resize();
    particles = Array.from({ length: maxParticles() }, () => spawn(true));
    start();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      stop();
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div ref={eyeRef} className="backdrop-eye">
        <SharinganEye className="size-full" />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}

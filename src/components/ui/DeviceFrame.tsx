import type { ReactNode } from "react";
import type { DeviceKind } from "@/types";

type DeviceFrameProps = {
  kind: DeviceKind;
  title: string;
  children: ReactNode;
};

// Pure CSS frames: a phone, a round smartwatch, a desktop window and a game screen.
export function DeviceFrame({ kind, title, children }: DeviceFrameProps) {
  switch (kind) {
    case "phone":
      return (
        <div
          data-device
          className="device relative aspect-[9/19] h-full rounded-[2rem] bg-device p-[6px] shadow-2xl shadow-black/25 ring-1 ring-device-edge"
        >
          <div className="@container relative h-full w-full overflow-hidden rounded-[1.6rem] bg-surface">
            {children}
          </div>
          <span className="absolute left-1/2 top-[11px] h-[10px] w-[32%] -translate-x-1/2 rounded-full bg-device" />
          <span className="absolute -right-[3px] top-[22%] h-[12%] w-[3px] rounded-r bg-device-edge" />
          <span className="absolute -left-[3px] top-[18%] h-[7%] w-[3px] rounded-l bg-device-edge" />
        </div>
      );

    case "watch":
      return (
        <div data-device className="device relative flex aspect-[1/1.6] h-full flex-col items-center">
          <span className="h-[21%] w-[58%] rounded-t-2xl bg-device-edge" />
          <div className="relative -my-[3%] aspect-square w-full rounded-full bg-device p-[7%] shadow-2xl shadow-black/25 ring-1 ring-device-edge">
            <div className="@container relative h-full w-full overflow-hidden rounded-full bg-surface">
              {children}
            </div>
            <span className="absolute -right-[5%] top-1/2 h-[16%] w-[6%] -translate-y-1/2 rounded-r-md bg-device-edge" />
          </div>
          <span className="h-[21%] w-[58%] rounded-b-2xl bg-device-edge" />
        </div>
      );

    case "desktop":
      return (
        <div
          data-device
          className="device flex w-full flex-col overflow-hidden rounded-xl bg-surface shadow-2xl shadow-black/25 ring-1 ring-device-edge"
        >
          <div className="flex h-7 shrink-0 items-center justify-between bg-device pl-3 text-[11px] text-white/75">
            <span className="flex items-center gap-2 truncate">
              <span className="size-2.5 rounded-sm bg-accent" />
              {title}
            </span>
            <span className="flex h-full" aria-hidden="true">
              <span className="grid w-9 place-items-center">
                <span className="h-px w-2.5 bg-current" />
              </span>
              <span className="grid w-9 place-items-center">
                <span className="size-2.5 border border-current" />
              </span>
              <span className="grid w-9 place-items-center bg-accent text-white">
                <svg viewBox="0 0 10 10" className="size-2.5" stroke="currentColor" strokeWidth="1.4">
                  <path d="M1 1l8 8M9 1l-8 8" />
                </svg>
              </span>
            </span>
          </div>
          {/* Same 16:10 shape as the recordings, so nothing is cropped or stretched */}
          <div className="@container relative aspect-[16/10]">{children}</div>
        </div>
      );

    case "console":
      // The pad sits under the screen, on the right, so it never covers the game.
      return (
        <div data-device className="device relative flex w-full flex-col items-end">
          <div className="w-full rounded-xl bg-device p-[2%] shadow-2xl shadow-black/25 ring-1 ring-device-edge">
            <div className="@container relative aspect-video w-full overflow-hidden rounded-md bg-surface">
              {children}
            </div>
          </div>
          <svg
            viewBox="0 0 120 72"
            aria-hidden="true"
            className="-mt-[1%] mr-[5%] w-[24%] drop-shadow-xl"
          >
            <path
              d="M30 6h60c16 0 26 12 28 30l2 18c1 10-6 16-14 16-6 0-10-4-14-10l-6-8H34l-6 8c-4 6-8 10-14 10-8 0-15-6-14-16l2-18C4 18 14 6 30 6z"
              className="fill-device stroke-device-edge"
              strokeWidth="1.5"
            />
            <path d="M24 30h6v-6h6v6h6v6h-6v6h-6v-6h-6z" className="fill-device-edge" />
            <circle cx="88" cy="27" r="4.5" className="fill-accent" />
            <circle cx="97" cy="36" r="4.5" className="fill-accent" />
            <circle cx="79" cy="36" r="4.5" className="fill-device-edge" />
            <circle cx="88" cy="45" r="4.5" className="fill-device-edge" />
          </svg>
        </div>
      );
  }
}

type ScreenPlaceholderProps = {
  kind: DeviceKind;
  title: string;
};

// Shown inside the device until a real screenshot is added to the project.
export function ScreenPlaceholder({ kind, title }: ScreenPlaceholderProps) {
  const isWatch = kind === "watch";

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 flex flex-col justify-center gap-[5cqw] overflow-hidden bg-accent-soft ${
        isWatch ? "items-center px-[14cqw] text-center" : "px-[9cqw]"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--accent)_28%,transparent)_1px,transparent_1px)] [background-size:12px_12px]" />
      <div className="absolute -right-[20%] -top-[20%] size-[70%] rounded-full bg-accent/20 blur-2xl" />
      <span
        className={`relative font-display font-extrabold leading-none tracking-tight text-accent-hover ${
          kind === "phone" ? "text-[17cqw]" : isWatch ? "text-[15cqw]" : "text-[9cqw]"
        }`}
      >
        {title}
        <span className="text-accent">.</span>
      </span>
      <span className={`relative flex flex-col gap-[2.5cqw] ${isWatch ? "w-[70%] items-center" : "w-[60%]"}`}>
        <span className="h-[2.5cqw] min-h-1 w-full rounded-full bg-accent/30" />
        <span className="h-[2.5cqw] min-h-1 w-3/4 rounded-full bg-accent/20" />
      </span>
    </div>
  );
}

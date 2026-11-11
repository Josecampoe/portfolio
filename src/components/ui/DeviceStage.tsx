import type { ReactNode } from "react";
import type { DeviceKind } from "@/types";

// Room each device needs. Wide screens grow with the width; the tall phone and
// the watch get a fixed height so they stay big without overflowing the card.
const stageSize: Record<DeviceKind, string> = {
  desktop: "w-full",
  console: "w-full",
  phone: "h-[30rem] sm:h-[36rem] lg:h-[clamp(30rem,64vh,38rem)]",
  watch: "h-[24rem] sm:h-[30rem] lg:h-[clamp(24rem,58vh,32rem)]",
};

// Transparent area that holds a project's device.
export function DeviceStage({ kind, children }: { kind: DeviceKind; children: ReactNode }) {
  return (
    <div className={`relative flex w-full items-center justify-center ${stageSize[kind]}`}>
      {children}
    </div>
  );
}

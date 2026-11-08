import type { ReactNode } from "react";

// Transparent area that holds a project's device.
export function DeviceStage({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex aspect-[16/10] items-center justify-center md:aspect-[16/11]">
      {children}
    </div>
  );
}

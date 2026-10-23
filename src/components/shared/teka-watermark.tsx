"use client";

// TEKA NEXUS — TekaWatermark (Task ws-1).
// A subtle, non-intrusive brand watermark used across the Workspace:
// editor status bar, console corners and personalized background previews.
// Purely decorative — pointer-events none, aria-hidden.

import * as React from "react";
import { cn } from "@/lib/utils";

export function TekaWatermark({
  className,
  label = "TEKA",
  variant = "corner",
}: {
  className?: string;
  label?: string;
  /** corner — small floating tag; bar — inline status-bar strip */
  variant?: "corner" | "bar";
}) {
  if (variant === "bar") {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex select-none items-center gap-1 rounded-md bg-gradient-to-l from-cyan-500/10 to-violet-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/70 ring-1 ring-cyan-400/20",
          className,
        )}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
        {label}
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute select-none font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/25",
        "bottom-2 end-2 z-10 drop-shadow-sm",
        className,
      )}
    >
      {label}
    </span>
  );
}

"use client";

import { cn } from "@/lib/utils";

// TEKA NEXUS — provisional geometric brand mark (spec §3).
// Hexagonal node with orbital link — represents "nexus" (connection point).
export function LogoMark({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="teka-g" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        d="M24 4 L40.5 13.5 V34.5 L24 44 L7.5 34.5 V13.5 Z"
        stroke="url(#teka-g)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="5.5" fill="url(#teka-g)" />
      <circle cx="24" cy="24" r="10" stroke="url(#teka-g)" strokeWidth="1.6" strokeDasharray="3 4" opacity="0.7" />
      <circle cx="34" cy="14" r="2.4" fill="#22d3ee" />
      <circle cx="14" cy="34" r="1.8" fill="#a78bfa" />
    </svg>
  );
}

export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("font-display font-bold tracking-tight select-none", className)}>
      <span className="text-foreground">TEKA</span>{" "}
      <span className="text-gradient">NEXUS</span>
      {!compact && (
        <span className="hidden sm:inline text-[10px] font-mono font-medium text-muted-foreground align-super ml-1.5 tracking-widest">
          β
        </span>
      )}
    </span>
  );
}

export function Logo({ className, size = 30, onClick }: { className?: string; size?: number; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn("flex items-center gap-2.5 group outline-none focus-glow rounded-lg", className)}
      aria-label="TEKA NEXUS home"
    >
      <LogoMark size={size} className="transition-transform duration-300 group-hover:rotate-12" />
      <Wordmark className="text-lg" />
    </button>
  );
}

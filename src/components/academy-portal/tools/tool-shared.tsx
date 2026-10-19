"use client";

// TEKA NEXUS — Academy portal tools: tiny shared kit.
// Private to the tools folder: header shell, localStorage helpers and a
// deterministic shuffle (options never reshuffle between renders/reloads).

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/shared/motion";

// ─── Header shell ────────────────────────────────────────────

export function ToolHeader({
  icon: Icon,
  title,
  subtitle,
  iconClass,
  right,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  iconClass?: string;
  right?: ReactNode;
}) {
  return (
    <FadeIn className="glass-card p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-4">
        <span
          aria-hidden="true"
          className={cn(
            "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] ring-1 ring-inset ring-white/10",
            iconClass,
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-lg font-bold sm:text-xl">{title}</h2>
          <p className="mt-0.5 text-xs leading-5 text-muted-foreground sm:text-sm">{subtitle}</p>
        </div>
        {right}
      </div>
    </FadeIn>
  );
}

// ─── localStorage (fail-soft in private mode) ────────────────

export function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode — keep in memory only */
  }
}

// ─── Deterministic shuffle ───────────────────────────────────

/** xorshift32 → [0, 1) */
function makeRand(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

/** FNV-1a string hash — stable seed per question id. */
export function hashSeed(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Fisher–Yates with a fixed seed — same order every session. */
export function seededShuffle<T>(arr: readonly T[], seed: number): T[] {
  const out = [...arr];
  const rand = makeRand(seed);
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = out[i]!;
    out[i] = out[j]!;
    out[j] = tmp;
  }
  return out;
}

// ─── Small shared chips ──────────────────────────────────────

export function FilterChip({
  active,
  onClick,
  children,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-4 text-sm font-medium transition focus-glow",
        active
          ? "bg-cyan-500/15 text-cyan-200 ring-1 ring-inset ring-cyan-400/40"
          : "bg-white/[0.03] text-muted-foreground ring-1 ring-inset ring-white/10 hover:bg-white/[0.07] hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

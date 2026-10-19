"use client";

// TEKA NEXUS — shared motion primitives.
// A tiny animation toolkit built on framer-motion that every view composes:
//   FadeIn / Reveal      — mount & scroll entrances
//   Stagger / StaggerItem — orchestrated list entrances
//   AnimatedNumber       — count-up stats
//   HoverLift / TapScale — tactile feedback
//   PulsingDot           — "live" indicators
//   PageTransition       — SPA view cross-fade (used by src/app/page.tsx)
//   MotionRoot           — global MotionConfig (honors prefers-reduced-motion)

import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Signature easing used across the app — fast start, soft landing. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard spring for hover/tap feedback. */
export const SPRING = { type: "spring", stiffness: 380, damping: 26 } as const;

// ── Global motion config ─────────────────────────────────────
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// ── FadeIn: animate on mount ────────────────────────────────
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 14,
  duration = 0.5,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ── Reveal: animate once when scrolled into view ────────────
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-48px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ── Stagger: orchestrated parent/child entrances ────────────
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

export function Stagger({
  children,
  className,
  gap = 0.055,
  delayChildren = 0.04,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren } },
      }}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

// ── AnimatedNumber: smooth count-up ─────────────────────────
export function AnimatedNumber({
  value,
  className,
  duration = 1.1,
  delay = 0,
  format = (n: number) => String(Math.round(n)),
}: {
  value: number;
  className?: string;
  duration?: number;
  delay?: number;
  format?: (n: number) => string;
}) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
      onComplete: () => {
        prev.current = value;
        setDisplay(value);
      },
    });
    return () => controls.stop();
  }, [value, duration, delay]);

  return (
    <span className={cn("tabular-nums", className)} aria-label={format(value)}>
      {format(display)}
    </span>
  );
}

// ── HoverLift: tactile card lift ────────────────────────────
export function HoverLift({
  children,
  className,
  y = -4,
  scale = 1.01,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y, scale }}
      transition={SPRING}
    >
      {children}
    </motion.div>
  );
}

// ── TapScale: press feedback wrapper ────────────────────────
export function TapScale({
  children,
  className,
  scale = 0.97,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  return (
    <motion.div
      className={className}
      whileTap={{ scale }}
      transition={SPRING}
    >
      {children}
    </motion.div>
  );
}

// ── PulsingDot: "live" beacon ───────────────────────────────
export function PulsingDot({
  className,
  dotClassName,
  label,
}: {
  className?: string;
  dotClassName?: string;
  label?: string;
}) {
  return (
    <span className={cn("relative flex h-2.5 w-2.5", className)} role="status" aria-label={label}>
      <span
        className={cn(
          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
          dotClassName ?? "bg-emerald-400"
        )}
      />
      <span
        className={cn(
          "relative inline-flex h-2.5 w-2.5 rounded-full",
          dotClassName ?? "bg-emerald-400"
        )}
      />
    </span>
  );
}

// ── PageTransition: SPA view cross-fade ─────────────────────
export function PageTransition({
  viewKey,
  children,
}: {
  viewKey: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={viewKey}
        initial={{ opacity: 0, y: 12, scale: 0.996 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.14, ease: "easeIn" } }}
        transition={{ duration: 0.3, ease: EASE }}
        className="flex flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

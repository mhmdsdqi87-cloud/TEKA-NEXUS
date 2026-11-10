"use client";

// TEKA NEXUS — shared motion primitives.
// A tiny animation toolkit built on framer-motion that every view composes:
//   FadeIn / Reveal      — mount & scroll entrances
//   Stagger / StaggerItem — orchestrated list entrances
//   TextReveal           — word-by-word cinematic headline entrance
//   AnimatedNumber       — count-up stats
//   HoverLift / TapScale — tactile feedback
//   SpotlightCard        — cursor-tracked radial glow (with useSpotlight hook)
//   TiltCard             — 3D perspective tilt that follows the pointer
//   Magnetic             — element gently pulled toward the cursor
//   ScrollProgress       — top-of-viewport gradient reading progress
//   PulsingDot           — "live" indicators
//   PageTransition       — SPA view cross-fade (used by src/app/page.tsx)
//   MotionRoot           — global MotionConfig (honors prefers-reduced-motion)

import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

/** Signature easing used across the app — fast start, soft landing. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard spring for hover/tap feedback. */
export const SPRING = { type: "spring", stiffness: 380, damping: 26 } as const;

// ── Global motion config ─────────────────────────────────────
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// ── FadeIn: animate on mount (optional cinematic blur-in) ──
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 14,
  duration = 0.5,
  blur = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  blur?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? `blur(${blur}px)` : "blur(0px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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

// ── SpotlightCard: cursor-tracked radial glow ──────────────
// Pairs with the .spotlight-card CSS overlay in globals.css: the glow follows
// the pointer via --mx/--my custom properties (no re-renders — direct style).
export function useSpotlight() {
  const ref = useRef<HTMLElement | null>(null);
  const onMouseMove = useCallback((e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${Math.round(e.clientX - r.left)}px`);
    el.style.setProperty("--my", `${Math.round(e.clientY - r.top)}px`);
  }, []);
  return { ref, onMouseMove };
}

export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, onMouseMove } = useSpotlight();
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} onMouseMove={onMouseMove} className={cn("spotlight-card", className)}>
      {children}
    </div>
  );
}

// ── TiltCard: 3D perspective tilt following the pointer ────
export function TiltCard({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees at the card edges. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rxRaw = useMotionValue(0);
  const ryRaw = useMotionValue(0);
  const rotateX = useSpring(rxRaw, { stiffness: 240, damping: 22 });
  const rotateY = useSpring(ryRaw, { stiffness: 240, damping: 22 });

  const onMouseMove = useCallback(
    (e: ReactMouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ryRaw.set(px * max * 2);
      rxRaw.set(-py * max * 2);
    },
    [max, rxRaw, ryRaw]
  );
  const onMouseLeave = useCallback(() => {
    rxRaw.set(0);
    ryRaw.set(0);
  }, [rxRaw, ryRaw]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Magnetic: element gently pulled toward the cursor ─────
export function Magnetic({
  children,
  className,
  strength = 0.22,
}: {
  children: ReactNode;
  className?: string;
  /** 0..1 — how far the element chases the pointer from its center. */
  strength?: number;
}) {
  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, SPRING);
  const y = useSpring(yRaw, SPRING);

  const onMouseMove = useCallback(
    (e: ReactMouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      xRaw.set((e.clientX - (r.left + r.width / 2)) * strength);
      yRaw.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    [strength, xRaw, yRaw]
  );
  const onMouseLeave = useCallback(() => {
    xRaw.set(0);
    yRaw.set(0);
  }, [xRaw, yRaw]);

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── TextReveal: word-by-word cinematic entrance ───────────
// Splits a plain string into words that rise + de-blur in sequence.
// RTL-safe: inline-block words flow in the parent's writing direction.
export function TextReveal({
  text,
  className,
  delay = 0,
  gap = 0.045,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  gap?: number;
  once?: boolean;
}) {
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-40px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: "0.55em", filter: "blur(6px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.5, ease: EASE },
            },
          }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ── ScrollProgress: top-of-viewport reading progress ─────
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.35 });
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[45] h-0.5 origin-left bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 rtl:origin-right",
        className
      )}
      style={{ scaleX }}
    />
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
        initial={{ opacity: 0, y: 12, scale: 0.996, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.14, ease: "easeIn" } }}
        transition={{ duration: 0.32, ease: EASE }}
        className="flex flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

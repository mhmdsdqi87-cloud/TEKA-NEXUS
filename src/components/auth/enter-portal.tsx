"use client";

// TEKA NEXUS — EnterPortal (Task 15-b, re-timed in Task 17).
// The epic "ignition" takeover played right after a successful login/signup:
// warp-speed starfield canvas + shockwave rings + logo ignition + wordmark
// assembly + welcome banner + phase readout. Plays above everything (z-[999])
// for ~8s — the user asked for a full cinematic 8-second intro.

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { LogoMark } from "@/components/brand/logo";
import { useT } from "@/lib/i18n";

const EVENT = "teka-enter-portal";
const FLAG = "teka_enter_portal";

// Fire the portal from anywhere (password login, signup, Google callback boot).
export function triggerEnterPortal(name: string): void {
  try {
    sessionStorage.setItem(FLAG, "1");
    sessionStorage.setItem("teka_enter_name", name);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { name } }));
}

// Mark "play the portal once the session resolves" (Google callback boot path,
// where the user object isn't known yet). Cleared by takePendingEnterPortal().
export function markPendingEnterPortal(): void {
  try {
    sessionStorage.setItem(FLAG, "1");
  } catch {
    /* storage unavailable */
  }
}

// Returns true once if a pending portal was queued, consuming the flag.
export function takePendingEnterPortal(): boolean {
  try {
    if (sessionStorage.getItem(FLAG) !== "1") return false;
    sessionStorage.removeItem(FLAG);
    sessionStorage.removeItem("teka_enter_name");
    return true;
  } catch {
    return false;
  }
}

type Particle = { a: number; d: number; v: number; hue: number; w: number };

// Short and honest: enough to feel like a warp, short enough to never
// feel like fake loading. Click anywhere (or the skip button) to dismiss.
const DURATION_MS = 3200;
const WORD = "TEKA NEXUS";

// Mono status phases cycled while the portal warms up (LTR, terminal-style —
// matches the boot screen aesthetic). The last phase is the localized line.
const PHASE_MS = 700;
const PHASE_START_DELAY_MS = 350;
const PHASES = [
  "SYNCING SKILL ENGINE…",
  "MAPPING ACADEMY GRID — 300 LESSONS…",
  "LINKING NEXUS NODES…",
  "CALIBRATING PORTAL GATE…",
];

export function EnterPortal() {
  const t = useT();
  const [run, setRun] = useState(false);
  const [name, setName] = useState("");
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback((who: string) => {
    setName(who);
    setRun((playing) => {
      if (playing) return playing; // ignore double-fires
      return true;
    });
  }, []);

  const skip = useCallback(() => setRun(false), []);

  // ── listen for triggers ──────────────────────────────────────
  useEffect(() => {
    const onEnter = (e: Event) => {
      const who = (e as CustomEvent<{ name?: string }>).detail?.name ?? "";
      start(who);
    };
    window.addEventListener(EVENT, onEnter);
    return () => window.removeEventListener(EVENT, onEnter);
  }, [start]);

  // ── auto-dismiss + phase cycling ──────────────────────────
  useEffect(() => {
    if (!run) return;
    timerRef.current = setTimeout(() => setRun(false), DURATION_MS);
    const phaseDelay = setTimeout(() => {
      setPhase(0);
      phaseRef.current = setInterval(() => {
        setPhase((p) => Math.min(PHASES.length, p + 1));
      }, PHASE_MS);
    }, PHASE_START_DELAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (phaseDelay) clearTimeout(phaseDelay);
      if (phaseRef.current) clearInterval(phaseRef.current);
    };
  }, [run]);

  // ── warp starfield canvas ────────────────────────────────────
  useEffect(() => {
    if (!run) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#04050b";
      ctx.fillRect(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 640 ? 130 : 240;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      a: Math.random() * Math.PI * 2,
      d: Math.random() * 40,
      v: 0.4 + Math.random() * 1.4,
      hue: [187, 262, 45][Math.floor(Math.random() * 3)], // cyan | violet | gold
      w: 0.6 + Math.random() * 1.6,
    }));

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 16.7, 3);
      last = now;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.hypot(cx, cy) + 60;

      ctx.fillStyle = "rgba(4, 5, 11, 0.30)";
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        const prevD = p.d;
        p.v += 0.09 * dt;
        p.d += p.v * p.v * dt * 0.55;
        if (p.d > maxR) {
          p.d = Math.random() * 30;
          p.v = 0.4 + Math.random() * 1.2;
          p.a = Math.random() * Math.PI * 2;
          continue;
        }
        const x1 = cx + Math.cos(p.a) * prevD;
        const y1 = cy + Math.sin(p.a) * prevD;
        const x2 = cx + Math.cos(p.a) * p.d;
        const y2 = cy + Math.sin(p.a) * p.d;
        const alpha = Math.min(p.d / 140, 1) * 0.9;
        ctx.strokeStyle = `hsla(${p.hue}, 90%, ${p.hue === 45 ? 62 : 68}%, ${alpha})`;
        ctx.lineWidth = p.w;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [run]);

  return (
    <AnimatePresence>
      {run && (
        <motion.div
          key="enter-portal"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-[#04050b]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.09, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          role="status"
          aria-live="polite"
          onClick={skip}
        >
          <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

          {/* shockwave rings */}
          {[0, 0.16].map((delay) => (
            <motion.div
              key={delay}
              aria-hidden="true"
              className="absolute h-40 w-40 rounded-full border-2 border-cyan-300/60"
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 9, opacity: 0 }}
              transition={{ delay: 0.15 + delay, duration: 1.15, ease: "easeOut" }}
            />
          ))}
          <motion.div
            aria-hidden="true"
            className="absolute h-40 w-40 rounded-full border border-violet-400/50"
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 6.4, opacity: 0 }}
            transition={{ delay: 0.34, duration: 1.2, ease: "easeOut" }}
          />

          {/* rotating sigil rings */}
          <motion.div
            aria-hidden="true"
            className="absolute h-64 w-64 sm:h-80 sm:w-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.svg
              viewBox="0 0 100 100"
              className="h-full w-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(34,211,238,0.35)" strokeWidth="0.5" strokeDasharray="3 5" />
            </motion.svg>
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)]"
              animate={{ rotate: -360 }}
              transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth="0.5" strokeDasharray="10 14" />
            </motion.svg>
          </motion.div>

          {/* logo ignition */}
          <motion.div
            className="relative z-10 flex items-center justify-center"
            initial={{ scale: 0.15, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 13, delay: 0.3 }}
          >
            <motion.div
              animate={{ filter: ["drop-shadow(0 0 18px rgba(34,211,238,0.55))", "drop-shadow(0 0 44px rgba(167,139,250,0.75))", "drop-shadow(0 0 18px rgba(34,211,238,0.55))"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <LogoMark size={92} />
            </motion.div>
          </motion.div>

          {/* wordmark assembly */}
          <div className="relative z-10 mt-6 flex overflow-hidden font-display text-3xl font-black tracking-[0.35em] text-white sm:text-4xl" dir="ltr" aria-label={WORD}>
            {WORD.split("").map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.85 + i * 0.045, duration: 0.4, ease: "easeOut" }}
                className={ch === " " ? "w-4" : ""}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </div>

          {/* welcome banner */}
          <motion.p
            className="relative z-10 mt-7 text-center text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.45 }}
          >
            {t("auth.portal.welcome")}{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text font-bold text-transparent" dir="auto">
              {name.trim() || "Builder"}
            </span>
            <motion.span
              aria-hidden="true"
              className="ml-1 inline-block"
              animate={{ opacity: [0, 1, 0.4, 1] }}
              transition={{ delay: 1.9, duration: 1, repeat: Infinity }}
            >
              ⚡
            </motion.span>
          </motion.p>

          {/* ignition progress — spans most of the 8s show */}
          <motion.div
            className="relative z-10 mt-5 h-1 w-48 overflow-hidden rounded-full bg-white/[0.08] sm:w-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.4, duration: 2.6, ease: "easeInOut" }}
            />
          </motion.div>
          <motion.div
            className="relative z-10 mt-3 flex h-4 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {phase < PHASES.length ? (
              <motion.p
                key={phase}
                dir="ltr"
                className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-200/80"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {PHASES[phase]}
              </motion.p>
            ) : (
              <motion.p
                className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-300"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: [0, 1, 0.6, 1] }}
                transition={{ duration: 0.6 }}
              >
                {t("auth.portal.entering")}
              </motion.p>
            )}
          </motion.div>

          {/* honest skip — the warp is 3s, but nobody should be trapped in it */}
          <motion.button
            type="button"
            onClick={skip}
            className="absolute bottom-8 z-10 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60 transition-colors hover:border-white/40 hover:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {t("common.skip")}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

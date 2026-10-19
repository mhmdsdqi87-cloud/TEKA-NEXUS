"use client";

// TEKA NEXUS — TEKA Academy celebration particles.
// A framer-motion confetti burst (no deps): N colored chips explode from a
// point and fall out. Decorative only — aria-hidden, honors reduced motion
// via the global MotionConfig.

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["#22d3ee", "#a78bfa", "#34d399", "#fbbf24", "#fb7185", "#f472b6"];

export function Confetti({ trigger, count = 42 }: { trigger: number; count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: `${trigger}-${i}`,
        x: (Math.random() - 0.5) * 340,
        y: -(60 + Math.random() * 190),
        drift: (Math.random() - 0.5) * 160,
        rotate: (Math.random() - 0.5) * 540,
        size: 5 + Math.random() * 7,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.12,
        round: Math.random() > 0.6,
      })),
    [trigger],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-50 overflow-visible">
      <div className="absolute left-1/2 top-10">
        <AnimatePresence>
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              className="absolute block"
              style={{ width: p.size, height: p.round ? p.size : p.size * 0.45, backgroundColor: p.color, borderRadius: p.round ? "9999px" : "2px" }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
              animate={{ x: p.x + p.drift, y: [p.y, p.y + 260], opacity: [1, 1, 0], scale: 1, rotate: p.rotate }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 + Math.random() * 0.6, delay: p.delay, ease: [0.15, 0.6, 0.35, 1] }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

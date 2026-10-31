"use client";

// TEKA OS — Matrix mode overlay (Task 19). Full-screen code rain.
// Honors prefers-reduced-motion (renders a single static frame).

import { useEffect, useRef } from "react";
import { useOs } from "@/lib/os/os-store";

const GLYPHS = "01アイウエオカキクケコサシスセソ<>{}[];$#@=%";

export function MatrixOverlay() {
  const matrix = useOs((s) => s.matrix);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!matrix) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let drops: number[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.max(8, Math.floor(w / 16));
      drops = Array.from({ length: cols }, () => Math.floor((Math.random() * h) / 16));
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(4,6,14,0.09)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = "13px monospace";
      for (let i = 0; i < drops.length; i++) {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * 16;
        const y = drops[i] * 16;
        ctx.fillStyle = Math.random() > 0.975 ? "#d1fae5" : "#22c55e";
        ctx.fillText(ch, x, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      // single static frame
      ctx.fillStyle = "rgba(4,6,14,0.9)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = "13px monospace";
      ctx.fillStyle = "#22c55e";
      for (let i = 0; i < 60; i++) {
        ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], Math.random() * w, Math.random() * h);
      }
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [matrix]);

  if (!matrix) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] bg-[#04060e]/80" aria-hidden>
      <canvas ref={ref} className="h-full w-full opacity-70" />
      <div className="absolute inset-x-0 top-1/3 text-center font-mono text-sm tracking-[0.3em] text-emerald-300/90">
        WAKE UP, DEVELOPER…
      </div>
    </div>
  );
}

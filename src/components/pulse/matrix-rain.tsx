"use client";

// TEKA NEXUS — Matrix rain easter egg (triggered by the `matrix` command
// in the Nexus Terminal). Full-screen canvas overlay, katakana + latin
// glyph rain, auto-fades in/out and cleans itself up.

import { useEffect, useRef } from "react";

const GLYPHS = "アカサタナハマヤラワ0123456789ABCDEF<>/\\{}[]$#*+=~ｦｧｨｩｪｫｬｭｮｯｰ".split("");

export function MatrixRain({ durationMs = 6000, onDone }: { durationMs?: number; onDone?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 15;
    const cols = Math.ceil(width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);

    let raf = 0;
    let last = 0;
    const start = performance.now();
    const FADE_IN = 350;
    const FADE_OUT = 700;

    const draw = (t: number) => {
      const elapsed = t - start;
      const remaining = durationMs - elapsed;
      if (remaining <= -FADE_OUT) {
        onDone?.();
        return;
      }

      // global opacity envelope
      let alpha = 1;
      if (elapsed < FADE_IN) alpha = elapsed / FADE_IN;
      if (remaining < FADE_OUT) alpha = Math.max(0, remaining / FADE_OUT);
      canvas.style.opacity = String(alpha);

      if (t - last > 45) {
        last = t;
        ctx.fillStyle = "rgba(2, 6, 4, 0.14)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${fontSize}px 'Courier New', monospace`;

        for (let i = 0; i < cols; i++) {
          const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          // leading glyph is bright, trail is dimmer
          ctx.fillStyle = Math.random() > 0.975 ? "#c8ffd9" : "#22c55e";
          ctx.fillText(glyph, x, y);
          if (y > height && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 1;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [durationMs, onDone]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] bg-[#020604]"
      style={{ transition: "opacity 120ms linear" }}
    />
  );
}

"use client";

// TEKA NEXUS — Hero cinema layer.
// A full-bleed canvas behind the landing hero: warp starfield flying outward
// from the hero core + occasional shooting stars. Pure canvas, DPR-aware,
// pauses when the tab is hidden. Cyan/violet TEKA palette.

import { useEffect, useRef } from "react";

type Star = {
  x: number; y: number;       // position (px, canvas space)
  z: number;                  // 0..1 depth — drives speed & brightness
  hue: number;                // 185..275 (cyan → violet)
  size: number;
};

type Shooter = {
  x: number; y: number;
  vx: number; vy: number;
  life: number;               // 0..1 remaining
};

export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const stars: Star[] = [];
    const shooters: Shooter[] = [];
    const STAR_COUNT = 190;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawnStar = (star?: Star): Star => {
      const s = star ?? ({} as Star);
      // spawn near the center core, random direction
      const angle = Math.random() * Math.PI * 2;
      const r0 = rand(6, 70);
      s.x = cx + Math.cos(angle) * r0;
      s.y = cy + Math.sin(angle) * r0;
      s.z = Math.random();
      s.hue = rand(185, 275);
      s.size = rand(0.6, 1.9);
      return s;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w * 0.5;
      cy = h * 0.46;
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r0 = rand(6, Math.max(w, h) * 0.6);
        stars.push({
          x: cx + Math.cos(angle) * r0,
          y: cy + Math.sin(angle) * r0,
          z: Math.random(),
          hue: rand(185, 275),
          size: rand(0.6, 1.9),
        });
      }
    };

    const spawnShooter = () => {
      const fromLeft = Math.random() > 0.5;
      shooters.push({
        x: fromLeft ? -20 : w + 20,
        y: rand(h * 0.05, h * 0.5),
        vx: (fromLeft ? 1 : -1) * rand(7, 11),
        vy: rand(2.4, 4.2),
        life: 1,
      });
    };

    let nextShooterAt = performance.now() + 2200;

    const tick = (now: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      // ── warp stars ──
      for (const s of stars) {
        const dx = s.x - cx;
        const dy = s.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const speed = (0.5 + s.z * 2.6) * (0.6 + dist / (Math.max(w, h) * 0.9));
        s.x += (dx / dist) * speed;
        s.y += (dy / dist) * speed;

        // trail: short streak pointing away from core
        const trail = Math.min(speed * 2.4, 26);
        const alpha = 0.14 + s.z * 0.55;
        ctx.strokeStyle = `hsla(${s.hue}, 90%, ${62 + s.z * 18}%, ${alpha})`;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - (dx / dist) * trail, s.y - (dy / dist) * trail);
        ctx.stroke();

        if (s.x < -40 || s.x > w + 40 || s.y < -40 || s.y > h + 40) {
          spawnStar(s);
        }
      }

      // ── shooting stars ──
      if (now > nextShooterAt) {
        spawnShooter();
        nextShooterAt = now + rand(3400, 7200);
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life -= 0.012;
        if (sh.life <= 0 || sh.x < -60 || sh.x > w + 60) {
          shooters.splice(i, 1);
          continue;
        }
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 9, sh.y - sh.vy * 9);
        grad.addColorStop(0, `rgba(165, 243, 252, ${0.85 * sh.life})`);
        grad.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 9, sh.y - sh.vy * 9);
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full opacity-70"}
    />
  );
}

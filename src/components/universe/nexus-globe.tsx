"use client";

// TEKA NEXUS — Live Universe globe (NEXUS 2.0 Phase 1).
//
// Tiny WebGL globe (cobe, ~5KB) with REAL platform data markers: one marker
// per self-declared country. This component contains no data — it renders
// what /api/universe measured.
//
// Interactivity is implemented against cobe's own projection math (verified
// against node_modules/cobe/dist/index.esm.js):
//   U([lat, lon]) = [-cos(lat)cos(lon-π), sin(lat), cos(lat)sin(lon-π)] (deg)
//   screen x = (c/(w/h)*scale + off*scale*dpr/w + 1)/2
//   screen y = (-s*scale + off*scale*dpr/h + 1)/2
//   depth    = -sinφ·cosθ·v.x + sinθ·v.y + cosφ·cosθ·v.z   (front = ≥ 0)
// with c = cosφ·v.x + sinφ·v.z, s = sinφ·sinθ·v.x + cosθ·v.y − cosφ·sinθ·v.z.
// That gives us pixel-exact click hit-testing and "rotate to country" focus.

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import type { UniverseCountry } from "@/lib/dto";
import { COUNTRIES } from "@/lib/countries";

const GLOBE_RADIUS = 0.8;
const MARKER_ELEVATION = 0.06;
const FRONT_SCALE = GLOBE_RADIUS + MARKER_ELEVATION;
const ROT_SPEED = 0.06; // rad/s auto-rotation
const DRAG_SENSITIVITY = 0.005;

export type GlobeMarker = {
  code: string;
  lat: number;
  lon: number;
  size: number; // cobe marker size (world units)
  selected: boolean;
};

type Props = {
  markers: GlobeMarker[];
  selectedCode: string | null;
  onSelect: (code: string) => void;
};

// ── cobe-exact projection ────────────────────────────────────
function toVec(latDeg: number, lonDeg: number): [number, number, number] {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180 - Math.PI;
  const c = Math.cos(lat);
  return [-c * Math.cos(lon), Math.sin(lat), c * Math.sin(lon)];
}

function projectMarker(
  latDeg: number,
  lonDeg: number,
  phi: number,
  theta: number,
  width: number,
  height: number,
): { x: number; y: number; front: boolean; dist: number } {
  const v = toVec(latDeg, lonDeg);
  const vx = v[0] * FRONT_SCALE;
  const vy = v[1] * FRONT_SCALE;
  const vz = v[2] * FRONT_SCALE;
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  const c = cosPhi * vx + sinPhi * vz;
  const s = sinPhi * sinTheta * vx + cosTheta * vy - cosPhi * sinTheta * vz;
  const depth = -sinPhi * cosTheta * vx + sinTheta * vy + cosPhi * cosTheta * vz;
  // width/height are the canvas backing-store dims (CSS px × dpr), matching
  // cobe's internal normalization. We pass CSS dims and cobe's dpr handling
  // cancels out in the fraction — positions are relative 0..1 either way.
  const x = (c / (width / height) + 1) / 2;
  const y = (-s + 1) / 2;
  return { x, y, front: depth >= 0, dist: Math.hypot(c, s) };
}

export default function NexusGlobe({ markers, selectedCode, onSelect }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<GlobeMarker[]>(markers);
  const selectedRef = useRef<string | null>(selectedCode);
  const onSelectRef = useRef(onSelect);
  const pushMarkersRef = useRef<(() => void) | null>(null);

  // sync props → refs after render (never during render), then push the
  // refreshed marker geometry into the live globe
  useEffect(() => {
    markersRef.current = markers;
    selectedRef.current = selectedCode;
    onSelectRef.current = onSelect;
    pushMarkersRef.current?.();
  }, [markers, selectedCode, onSelect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let width = wrap.clientWidth || 320;
    let height = wrap.clientHeight || 320;
    let phi = -1.2;
    let theta = 0.32;
    let dragging = false;
    let moved = false;
    let lastX = 0;
    let lastY = 0;
    let raf = 0;
    let lastTs = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // focus target (rotate-to-country)
    let targetPhi: number | null = null;
    let targetTheta: number | null = null;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(2, window.devicePixelRatio || 1),
      width: width * 2,
      height: height * 2,
      phi,
      theta,
      dark: 1,
      diffuse: 1.35,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.1, 0.09, 0.08],
      markerColor: [0.85, 0.66, 0.24],
      glowColor: [0.36, 0.28, 0.1],
      markerElevation: MARKER_ELEVATION,
      opacity: 0.98,
      markers: [],
    });

    const resize = () => {
      width = wrap.clientWidth || 320;
      height = wrap.clientHeight || 320;
      globe.update({ width: width * 2, height: height * 2 });
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const markerList = (): Array<GlobeMarker & { x: number; y: number; front: boolean }> => {
      return markersRef.current
        .filter((m) => COUNTRIES[m.code])
        .map((m) => {
          const info = COUNTRIES[m.code];
          const p = projectMarker(info.lat, info.lon, phi, theta, width, height);
          return { ...m, x: p.x, y: p.y, front: p.front };
        });
    };

    const hitTest = (px: number, py: number) => {
      // px/py in CSS px. Convert marker fractions to CSS px; nearest
      // front-facing marker within radius wins (selected slightly preferred).
      let best: { code: string; d: number } | null = null;
      for (const m of markerList()) {
        if (!m.front) continue;
        const mx = m.x * width;
        const my = m.y * height;
        const d = Math.hypot(mx - px, my - py);
        const radius = Math.max(14, m.size * height * 0.62);
        if (d <= radius && (!best || d - (m.code === selectedRef.current ? 6 : 0) < best.d)) {
          best = { code: m.code, d };
        }
      }
      return best?.code ?? null;
    };

    const renderMarkers = () => {
      globe.update({
        markers: markersRef.current
          .filter((m) => COUNTRIES[m.code])
          .map((m) => ({
            id: m.code,
            location: [COUNTRIES[m.code].lat, COUNTRIES[m.code].lon],
            size: m.selected ? m.size * 1.45 : m.size,
            color: m.selected ? [1, 0.92, 0.6] : undefined,
          })),
      });
    };

    const loop = (ts: number) => {
      const dt = Math.min(64, ts - lastTs);
      lastTs = ts;

      if (targetPhi !== null && targetTheta !== null) {
        // ease toward focus target (shortest angular path)
        let dp = targetPhi - phi;
        while (dp > Math.PI) dp -= 2 * Math.PI;
        while (dp < -Math.PI) dp += 2 * Math.PI;
        phi += dp * Math.min(1, dt / 220);
        theta += (targetTheta - theta) * Math.min(1, dt / 220);
        if (Math.abs(dp) < 0.004 && Math.abs(targetTheta - theta) < 0.004) {
          targetPhi = null;
          targetTheta = null;
        }
      } else if (!dragging && !reducedMotion && !document.hidden) {
        phi += ROT_SPEED * (dt / 1000);
      }

      globe.update({ phi, theta });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // ── Pointer interaction: drag to rotate, click to select ──
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      moved = false;
      lastX = e.clientX;
      lastY = e.clientY;
      targetPhi = null;
      targetTheta = null;
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (!dragging) {
        canvas.style.cursor = hitTest(px, py) ? "pointer" : "grab";
        return;
      }
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
      phi += dx * DRAG_SENSITIVITY;
      theta = Math.max(-0.85, Math.min(0.85, theta - dy * DRAG_SENSITIVITY * 0.6));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      canvas.releasePointerCapture?.(e.pointerId);
      if (!moved) {
        const rect = canvas.getBoundingClientRect();
        const code = hitTest(e.clientX - rect.left, e.clientY - rect.top);
        if (code) onSelectRef.current(code);
      }
    };
    const onPointerLeave = () => {
      canvas.style.cursor = "grab";
    };

    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    renderMarkers();
    pushMarkersRef.current = renderMarkers;

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      globe.destroy();
    };
    // markers/selection updates flow through refs; re-create only on mount.
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full" data-testid="nexus-globe">
      <canvas ref={canvasRef} className="w-full h-full touch-none" aria-label="Live universe globe" role="application" />
    </div>
  );
}

/** Rotate-to-country target computed from the same math cobe uses. */
export function focusAngles(latDeg: number, lonDeg: number): { phi: number; theta: number } {
  const v = toVec(latDeg, lonDeg);
  return { phi: -Math.atan2(v[0], v[2]), theta: Math.asin(v[1]) * 0.9 };
}

/** WebGL support probe for the graceful 2D fallback. */
export function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

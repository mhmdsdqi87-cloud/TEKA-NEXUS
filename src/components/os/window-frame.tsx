"use client";

// TEKA OS — draggable / resizable glass window frame (Task 19).
// Pointer-events based dragging (no extra deps), mobile becomes full-bleed.

import { useCallback, useEffect, useRef, useState } from "react";
import { X, Minus, Square } from "lucide-react";
import { useOs, type OsWindow } from "@/lib/os/os-store";

const TASKBAR_H = 56;
const MIN_W = 320;
const MIN_H = 240;

export function WindowFrame({
  win,
  title,
  accent = "cyan",
  children,
}: {
  win: OsWindow;
  title: string;
  accent?: string;
  children: React.ReactNode;
}) {
  const focus = useOs((s) => s.focus);
  const close = useOs((s) => s.close);
  const minimize = useOs((s) => s.minimize);
  const toggleMax = useOs((s) => s.toggleMax);
  const setPos = useOs((s) => s.setPos);
  const setSize = useOs((s) => s.setSize);

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const dragRef = useRef<{ dx: number; dy: number } | null>(null);
  const resizeRef = useRef<{ sx: number; sy: number; w: number; h: number } | null>(null);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (dragRef.current) {
        const nx = Math.min(Math.max(0, e.clientX - dragRef.current.dx), window.innerWidth - 80);
        const ny = Math.min(Math.max(0, e.clientY - dragRef.current.dy), window.innerHeight - TASKBAR_H - 40);
        setPos(win.id, nx, ny);
      } else if (resizeRef.current) {
        const r = resizeRef.current;
        setSize(
          win.id,
          Math.max(MIN_W, r.w + (e.clientX - r.sx)),
          Math.max(MIN_H, r.h + (e.clientY - r.sy)),
        );
      }
    },
    [setPos, setSize, win.id],
  );

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
    resizeRef.current = null;
    window.removeEventListener("pointermove", onPointerMove);
  }, [onPointerMove]);

  const startDrag = (e: React.PointerEvent) => {
    if (mobile || win.maximized) return;
    dragRef.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
    focus(win.id);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp, { once: true });
  };

  const startResize = (e: React.PointerEvent) => {
    if (mobile || win.maximized) return;
    e.stopPropagation();
    resizeRef.current = { sx: e.clientX, sy: e.clientY, w: win.w, h: win.h };
    focus(win.id);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp, { once: true });
  };

  // Detach a dangling pointermove listener if the frame unmounts mid-drag.
  useEffect(
    () => () => {
      window.removeEventListener("pointermove", onPointerMove);
    },
    [onPointerMove],
  );

  const geo = win.maximized
    ? { left: 8, top: 8, width: "calc(100% - 16px)", height: `calc(100% - ${TASKBAR_H + 16}px)` }
    : mobile
      ? { left: 6, top: 8, width: "calc(100% - 12px)", height: `calc(100% - ${TASKBAR_H + 14}px)` }
      : { left: win.x, top: win.y, width: win.w, height: win.h };

  const accentColor =
    accent === "violet" ? "#a78bfa" : accent === "ember" ? "#fbbf24" : accent === "emerald" ? "#34d399" : "#22d3ee";

  if (win.minimized) return null;

  return (
    <section
      role="dialog"
      aria-label={title}
      onPointerDown={() => focus(win.id)}
      className="fixed flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#070b16]/85 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
      style={{ ...geo, zIndex: win.z }}
    >
      {/* title bar */}
      <header
        onPointerDown={startDrag}
        onDoubleClick={() => !mobile && toggleMax(win.id)}
        className="flex h-10 shrink-0 cursor-grab items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-3 active:cursor-grabbing"
      >
        <div dir="ltr" className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Close"
            onClick={() => close(win.id)}
            className="h-3.5 w-3.5 rounded-full bg-rose-500/90 transition hover:bg-rose-400"
          />
          <button
            type="button"
            aria-label="Minimize"
            onClick={() => minimize(win.id)}
            className="h-3.5 w-3.5 rounded-full bg-amber-400/90 transition hover:bg-amber-300"
          />
          <button
            type="button"
            aria-label="Maximize"
            onClick={() => toggleMax(win.id)}
            className="h-3.5 w-3.5 rounded-full bg-emerald-500/90 transition hover:bg-emerald-400"
          />
        </div>
        <span className="flex-1 truncate text-center text-xs font-semibold tracking-wide text-white/80" dir="auto">
          {title}
        </span>
        <span className="h-2 w-2 rounded-full" style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
      </header>

      {/* body */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain teka-os-scroll">{children}</div>

      {/* resize handle */}
      {!win.maximized && !mobile && (
        <button
          type="button"
          aria-label="Resize"
          onPointerDown={startResize}
          className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize opacity-40"
          style={{
            background:
              "linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.5) 60%, transparent 60%)",
          }}
        />
      )}
      {/* a11y: hidden actions duplicated for keyboard users */}
      <div className="sr-only">
        <button type="button" onClick={() => close(win.id)}><X size={12} /> close</button>
        <button type="button" onClick={() => minimize(win.id)}><Minus size={12} /> minimize</button>
        <button type="button" onClick={() => toggleMax(win.id)}><Square size={12} /> maximize</button>
      </div>
    </section>
  );
}

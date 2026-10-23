"use client";

// TEKA OS — Skill Tree app (Task 19).
// The galaxy map: every Academy module, its module boss, the four course
// masters, and the special islands — drawn as a pannable, zoomable
// constellation. Node states come from /api/os/tree (real progress only).
//
// Viewport model: fixed viewBox `0 0 TREE_VIEW.w TREE_VIEW.h` with
// `xMidYMin slice` (cover). The inner <g transform="translate(pan) scale(k)">
// does the pan/zoom in map units; at k = k0 (computed to fit the width) the
// whole chain width is visible and vertical drag travels down the galaxy.

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle, ArrowUpRight, Check, Loader2, LocateFixed, Lock, Minus, Plus, RefreshCw, X,
} from "lucide-react";

import { get } from "@/lib/api";
import { useT } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/store";
import { useApp } from "@/lib/store";
import { OS_STRINGS, pickL } from "@/lib/os/strings";
import { TREE_VIEW, type TreeNode } from "@/lib/os/tree";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type TreeState = "done" | "open" | "locked";
type TreeAccent = "cyan" | "violet" | "ember" | "emerald";

export type TreeApiNode = TreeNode & {
  state: TreeState;
  progress?: { done: number; total: number };
};

type TreeBranch = { id: string; name: { en: string; fa: string }; accent: TreeAccent };
type TreeResponse = {
  nodes: TreeApiNode[];
  branches: TreeBranch[];
  stats: { done: number; total: number };
};

type Geo = { u: number; w: number; h: number };

// ─── Constants & geometry ────────────────────────────────────────────────────

const ACCENT_HEX: Record<TreeAccent, string> = {
  cyan: "#22d3ee",
  violet: "#a78bfa",
  ember: "#fbbf24",
  emerald: "#34d399",
};

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 1.6;
const ZOOM_STEP = 0.15;

/** px per viewBox unit with `xMidYMin slice` (cover). */
function baseScale(w: number, h: number): number {
  return Math.max(w / TREE_VIEW.w, h / TREE_VIEW.h);
}

/** Alignment offset the slice mapping applies on an axis (yMin → 0, xMid → centered). */
function offsetFor(g: Geo, axis: "x" | "y"): number {
  const M = axis === "x" ? TREE_VIEW.w : TREE_VIEW.h;
  const C = axis === "x" ? g.w : g.h;
  return axis === "x" ? (C - M * g.u) / 2 : 0;
}

/** Clamp one pan axis so the viewport never leaves the map (centers when zoomed out). */
function clampAxis(t: number, k: number, g: Geo, axis: "x" | "y"): number {
  if (g.u <= 0) return 0;
  const M = axis === "x" ? TREE_VIEW.w : TREE_VIEW.h;
  const C = axis === "x" ? g.w : g.h;
  const o = offsetFor(g, axis);
  const vis = C / (g.u * k);
  if (vis >= M) return (k * (vis - M)) / 2;
  const lo = (C - o - M * g.u * k) / g.u;
  const hi = -o / g.u;
  return Math.min(Math.max(t, lo), Math.max(lo, hi));
}

function clampPan(x: number, y: number, k: number, g: Geo) {
  return { x: clampAxis(x, k, g, "x"), y: clampAxis(y, k, g, "y") };
}

/** Initial zoom: fit the full chain width (clamped into the allowed range). */
function fitZoom(g: Geo): number {
  if (g.u <= 0 || g.w <= 0) return 1;
  return Math.min(1, Math.max(ZOOM_MIN, g.w / (g.u * TREE_VIEW.w)));
}

// ─── Edges (memoized) ────────────────────────────────────────────────────────

type Edge = { x1: number; y1: number; x2: number; y2: number; hot: boolean };

const Edges = memo(function Edges({ edges }: { edges: Edge[] }) {
  return (
    <g aria-hidden>
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          stroke={e.hot ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.08)"}
          strokeWidth={e.hot ? 2.5 : 2}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
});

// ─── Node sprite (memoized) ──────────────────────────────────────────────────

type NodeSpriteProps = {
  node: TreeApiNode;
  idx: number;
  selected: boolean;
  locale: string;
  onSelect: (id: string) => void;
};

const TreeNodeSprite = memo(function TreeNodeSprite({
  node,
  idx,
  selected,
  locale,
  onSelect,
}: NodeSpriteProps) {
  const hex = ACCENT_HEX[node.accent] ?? ACCENT_HEX.cyan;
  const done = node.state === "done";
  const open = node.state === "open";
  const locked = node.state === "locked";
  const label = pickL(node.title, locale);

  return (
    <g transform={`translate(${node.x} ${node.y})`}>
      {/* pop-in, first render only (component mounts once per session) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: Math.min(idx * 0.012, 1.4), duration: 0.45, ease: "easeOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        {open && (
          <motion.circle
            fill="none"
            stroke={hex}
            strokeWidth={2}
            animate={{ r: [24, 37], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: (idx % 5) * 0.35 }}
          />
        )}
        <g
          role="button"
          tabIndex={0}
          aria-label={label}
          className={cn("cursor-pointer outline-none focus-visible:opacity-100", locked && "opacity-45")}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(node.id);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              onSelect(node.id);
            }
          }}
        >
          <title>{label}</title>
          <circle r={30} fill="transparent" />
          <circle
            r={22}
            fill={done ? hex : "#ffffff"}
            fillOpacity={done ? 0.2 : open ? 0.1 : 0.03}
            stroke={done || open ? hex : "rgba(255,255,255,0.14)"}
            strokeWidth={done ? 2 : 1.5}
            strokeDasharray={open ? "5 4" : undefined}
          />
          {selected && (
            <circle
              r={28}
              fill="none"
              stroke={hex}
              strokeOpacity={0.9}
              strokeWidth={2}
              className="animate-pulse"
            />
          )}
          <text
            {...({ dir: "auto" } as Record<string, string>)}
            textAnchor="middle"
            dominantBaseline="central"
            dy={1}
            fontSize={18}
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            {node.emoji}
          </text>
          {done && (
            <g transform="translate(15 -15)">
              <circle r={7.5} fill="#10b981" stroke="#022c22" strokeWidth={1.5} />
              <path
                d="M-3 0 L-1 2.2 L3.2 -2"
                fill="none"
                stroke="#ecfdf5"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}
          {locked && (
            <text
              textAnchor="middle"
              dy={27}
              fontSize={9}
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              🔒
            </text>
          )}
        </g>
      </motion.g>
    </g>
  );
});

// ─── Detail panel CTA routing ────────────────────────────────────────────────

function ctaFor(
  node: TreeApiNode,
  locale: string,
  t: (path: string) => string,
): { appId: string; props?: Record<string, string>; label: string } | null {
  if (node.kind === "module") {
    return { appId: "academy", props: { course: node.branch }, label: pickL(OS_STRINGS.tree.openModule, locale) };
  }
  if (node.kind === "boss" || node.kind === "final") {
    return { appId: "boss", label: pickL(OS_STRINGS.tree.openBoss, locale) };
  }
  if (node.ref === "pet") return { appId: "pet", label: t("os.apps.pet") };
  if (node.ref === "war") return { appId: "war", label: t("os.apps.war") };
  if (node.ref === "speedrun") return { appId: "speedrun", label: t("os.apps.speedrun") };
  if (node.ref.startsWith("case-")) return { appId: "crime", label: t("os.apps.crime") };
  return null;
}

// ─── Main app ────────────────────────────────────────────────────────────────

export function TreeApp() {
  const t = useT();
  const locale = useI18n((s) => s.locale);
  const navigate = useApp((s) => s.navigate);

  const [data, setData] = useState<TreeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // viewport + pan/zoom state
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const fittedRef = useRef(false);

  const geo: Geo = {
    u: size.w > 0 ? baseScale(size.w, size.h) : 0,
    w: size.w,
    h: size.h,
  };
  const geoRef = useRef<Geo & { zoom: number }>({ u: 0, w: 0, h: 0, zoom: 1 });
  geoRef.current = { ...geo, zoom };

  // ── data ──
  useEffect(() => {
    let alive = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await get<TreeResponse>("/api/os/tree");
        if (!alive) return;
        setData(res);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    return () => {
      alive = false;
    };
  }, [reloadKey]);

  // ── measure the viewport (ResizeObserver fires once on observe) ──
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize((prev) =>
        Math.abs(prev.w - r.width) < 1 && Math.abs(prev.h - r.height) < 1
          ? prev
          : { w: r.width, h: r.height },
      );
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── initial fit-width view (once) + re-clamp pan on resize ──
  useEffect(() => {
    if (size.w <= 0 || size.h <= 0) return;
    const g = geoRef.current;
    const apply = () => {
      if (!fittedRef.current) {
        fittedRef.current = true;
        const k0 = fitZoom(g);
        setZoom(k0);
        setPan(clampPan(0, 0, k0, g));
      } else {
        setPan((p) => clampPan(p.x, p.y, g.zoom, g));
      }
    };
    apply();
  }, [size.w, size.h]);

  // ── drag-to-pan (window listeners, no pointer capture: keeps node clicks) ──
  const dragRef = useRef<{ sx: number; sy: number; tx: number; ty: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);

  const onDragMove = useCallback((e: PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) > 5) d.moved = true;
    if (!d.moved) return;
    const g = geoRef.current;
    if (g.u <= 0) return;
    setPan(clampPan(d.tx + dx / g.u, d.ty + dy / g.u, g.zoom, g));
  }, []);

  const onDragEnd = useCallback(() => {
    const d = dragRef.current;
    suppressClickRef.current = !!d?.moved;
    dragRef.current = null;
    window.removeEventListener("pointermove", onDragMove);
    window.removeEventListener("pointerup", onDragEnd);
    window.removeEventListener("pointercancel", onDragEnd);
    setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
    if (d && !d.moved) setSelectedId(null); // tap on empty space clears selection
  }, [onDragMove]);

  useEffect(
    () => () => {
      window.removeEventListener("pointermove", onDragMove);
      window.removeEventListener("pointerup", onDragEnd);
      window.removeEventListener("pointercancel", onDragEnd);
    },
    [onDragMove, onDragEnd],
  );

  const startPan = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    suppressClickRef.current = false;
    dragRef.current = { sx: e.clientX, sy: e.clientY, tx: pan.x, ty: pan.y, moved: false };
    window.addEventListener("pointermove", onDragMove);
    window.addEventListener("pointerup", onDragEnd);
    window.addEventListener("pointercancel", onDragEnd);
  };

  // ── zoom controls (keep the viewport center pinned) ──
  const zoomBy = (delta: number) => {
    const g = geoRef.current;
    if (g.u <= 0) return;
    const k2 = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((g.zoom + delta) * 100) / 100));
    if (k2 === g.zoom) return;
    const ox = offsetFor(g, "x");
    const cx = g.w / 2;
    const cy = g.h / 2;
    const px = (cx - ox - g.u * pan.x) / (g.u * g.zoom);
    const py = (cy - g.u * pan.y) / (g.u * g.zoom);
    const tx = (cx - ox - g.u * k2 * px) / g.u;
    const ty = (cy - g.u * k2 * py) / g.u;
    setZoom(k2);
    setPan(clampPan(tx, ty, k2, g));
  };

  const resetView = () => {
    const g = geoRef.current;
    if (g.u <= 0) return;
    const k0 = fitZoom(g);
    setZoom(k0);
    setPan(clampPan(0, 0, k0, g));
  };

  // ── selection ──
  const handleSelect = useCallback((id: string) => {
    if (suppressClickRef.current) return;
    setSelectedId(id);
  }, []);

  // ── derived: node index, edges ──
  const byId = useMemo(() => new Map((data?.nodes ?? []).map((n) => [n.id, n])), [data]);

  const edges = useMemo<Edge[]>(() => {
    const nodes = data?.nodes ?? [];
    const out: Edge[] = [];
    for (const n of nodes) {
      for (const r of n.requires) {
        const from = byId.get(r);
        if (!from) continue;
        out.push({
          x1: from.x,
          y1: from.y,
          x2: n.x,
          y2: n.y,
          hot: from.state === "done" && n.state === "done",
        });
      }
    }
    return out;
  }, [data, byId]);

  const selected = selectedId ? (byId.get(selectedId) as TreeApiNode | undefined) ?? null : null;

  const tagline = pickL(OS_STRINGS.tree.tagline, locale);
  const progressText = pickL(OS_STRINGS.tree.progress, locale)
    .replaceAll("{done}", String(data?.stats.done ?? 0))
    .replaceAll("{total}", String(data?.stats.total ?? 0));

  const kindLabel = (kind: TreeApiNode["kind"]) =>
    pickL(
      kind === "module"
        ? OS_STRINGS.tree.legendModule
        : kind === "boss"
          ? OS_STRINGS.tree.legendBoss
          : kind === "final"
            ? OS_STRINGS.tree.legendFinal
            : OS_STRINGS.tree.legendSpecial,
      locale,
    );

  const stateLabel = (state: TreeState) =>
    pickL(
      state === "done"
        ? OS_STRINGS.tree.stateDone
        : state === "open"
          ? OS_STRINGS.tree.stateOpen
          : OS_STRINGS.tree.stateLocked,
      locale,
    );

  const stateBadge: Record<TreeState, string> = {
    done: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    open: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
    locked: "border-white/10 bg-white/5 text-white/50",
  };

  return (
    <div className="flex h-full flex-col">
      {/* ── header: tagline + progress chip + branch legend ── */}
      <header className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-white/[0.07] bg-white/[0.02] px-3 py-2">
        <h2 className="text-sm font-semibold text-white/90" dir="auto">
          {t("os.apps.tree")}
        </h2>
        <p className="min-w-0 flex-1 truncate text-[11px] text-white/45" dir="auto">
          {tagline}
        </p>
        <span
          title={progressText}
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] tabular-nums text-white/75"
          dir="auto"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {data ? `${data.stats.done} / ${data.stats.total}` : "… / …"}
        </span>
        <button
          type="button"
          aria-label={t("os.common.refresh")}
          onClick={() => setReloadKey((k) => k + 1)}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <RefreshCw size={13} className={cn(loading && "animate-spin")} />
        </button>
        <div className="flex w-full items-center gap-x-3 gap-y-1 overflow-x-auto sm:w-auto">
          {(data?.branches ?? []).map((b) => {
            const hex = ACCENT_HEX[b.accent] ?? ACCENT_HEX.cyan;
            return (
              <span key={b.id} className="inline-flex shrink-0 items-center gap-1.5 text-[11px] text-white/55" dir="auto">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: hex, boxShadow: `0 0 6px ${hex}` }}
                />
                {pickL(b.name, locale)}
              </span>
            );
          })}
        </div>
      </header>

      {/* ── galaxy viewport ── */}
      <div ref={wrapRef} className="relative min-h-0 flex-1 overflow-hidden bg-[#04060d]">
        {/* nebulae + starfield (behind the SVG) */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 22% 18%, rgba(255,255,255,0.5) 50%, transparent 51%)," +
                "radial-gradient(1px 1px at 68% 42%, rgba(255,255,255,0.35) 50%, transparent 51%)," +
                "radial-gradient(1.5px 1.5px at 41% 71%, rgba(255,255,255,0.4) 50%, transparent 51%)," +
                "radial-gradient(1px 1px at 86% 83%, rgba(255,255,255,0.3) 50%, transparent 51%)," +
                "radial-gradient(1px 1px at 9% 55%, rgba(255,255,255,0.35) 50%, transparent 51%)",
              backgroundSize: "340px 340px",
            }}
          />
          <div className="absolute left-[2%] top-[4%] h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #22d3ee, transparent 70%)" }} />
          <div className="absolute left-[28%] top-[10%] h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #fbbf24, transparent 70%)" }} />
          <div className="absolute left-[52%] top-[4%] h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #34d399, transparent 70%)" }} />
          <div className="absolute right-[2%] top-[8%] h-80 w-80 rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }} />
          <div className="absolute bottom-[4%] left-[38%] h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }} />
        </div>

        {geo.u > 0 && data && data.nodes.length > 0 && (
          <svg
            viewBox={`0 0 ${TREE_VIEW.w} ${TREE_VIEW.h}`}
            preserveAspectRatio="xMidYMin slice"
            className="absolute inset-0 h-full w-full touch-none select-none"
            style={{ cursor: "grab" }}
            onPointerDown={startPan}
            role="application"
            aria-label={t("os.apps.tree")}
          >
            <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
              <Edges edges={edges} />
              {data.nodes.map((n, i) => (
                <TreeNodeSprite
                  key={n.id}
                  node={n}
                  idx={i}
                  selected={n.id === selectedId}
                  locale={locale}
                  onSelect={handleSelect}
                />
              ))}
            </g>
          </svg>
        )}

        {/* zoom controls */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5">
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => zoomBy(ZOOM_STEP)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0a0f1e]/80 text-white/70 shadow-lg backdrop-blur transition hover:bg-white/10 hover:text-white active:scale-95"
          >
            <Plus size={16} />
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => zoomBy(-ZOOM_STEP)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0a0f1e]/80 text-white/70 shadow-lg backdrop-blur transition hover:bg-white/10 hover:text-white active:scale-95"
          >
            <Minus size={16} />
          </button>
          <button
            type="button"
            aria-label="Reset view"
            onClick={resetView}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0a0f1e]/80 text-white/70 shadow-lg backdrop-blur transition hover:bg-white/10 hover:text-white active:scale-95"
          >
            <LocateFixed size={15} />
          </button>
        </div>

        {/* loading / error overlays */}
        {loading && !data && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 text-white/60">
            <Loader2 size={22} className="animate-spin" />
            <span className="text-xs" dir="auto">{t("os.common.loading")}</span>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <AlertTriangle size={22} className="text-amber-300" />
            <p className="max-w-xs text-xs text-white/60" dir="auto">{error}</p>
            <button
              type="button"
              onClick={() => setReloadKey((k) => k + 1)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10"
              dir="auto"
            >
              <RefreshCw size={12} />
              {t("os.common.refresh")}
            </button>
          </div>
        )}

        {/* ── node detail panel: right side on desktop, bottom sheet on mobile ── */}
        {selected && (
          <aside
            key={selected.id}
            className="teka-os-scroll absolute inset-x-2 bottom-2 z-20 max-h-[46dvh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0f1e]/85 p-4 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl md:inset-x-auto md:bottom-3 md:right-3 md:top-3 md:max-h-none md:w-80"
          >
            {(() => {
              const hex = ACCENT_HEX[selected.accent] ?? ACCENT_HEX.cyan;
              const pct = selected.progress
                ? Math.min(100, Math.round((selected.progress.done / Math.max(1, selected.progress.total)) * 100))
                : 0;
              const cta = ctaFor(selected, locale, t);
              return (
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-2xl"
                      style={{ background: `${hex}1f`, borderColor: `${hex}55` }}
                    >
                      {selected.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-white/90" dir="auto">
                        {pickL(selected.title, locale)}
                      </h3>
                      <p className="text-[11px] text-white/40" dir="auto">{kindLabel(selected.kind)}</p>
                    </div>
                    <button
                      type="button"
                      aria-label={t("os.common.close")}
                      onClick={() => setSelectedId(null)}
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <p className="text-xs leading-relaxed text-white/60" dir="auto">
                    {pickL(selected.desc, locale)}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium",
                        stateBadge[selected.state],
                      )}
                      dir="auto"
                    >
                      {selected.state === "done" ? <Check size={11} /> : selected.state === "locked" ? <Lock size={11} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                      {stateLabel(selected.state)}
                    </span>
                    {selected.state === "locked" && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-300/80" dir="auto">
                        <Lock size={11} />
                        {t("os.common.lockedHint")}
                      </span>
                    )}
                  </div>

                  {selected.progress && (
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-white/50" dir="auto">
                        <span>{t("os.common.inProgress")}</span>
                        <span className="tabular-nums">
                          {selected.progress.done} / {selected.progress.total}
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full transition-[width] duration-500"
                          style={{ width: `${pct}%`, background: hex, boxShadow: `0 0 8px ${hex}` }}
                        />
                      </div>
                    </div>
                  )}

                  {cta && (
                    <button
                      type="button"
                      onClick={() => {
                        if (cta.appId === "academy") navigate({ name: "academy", course: cta.props?.course });
                        else navigate({ name: cta.appId } as Parameters<typeof navigate>[0]);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition hover:brightness-125 active:scale-[0.98]"
                      style={{ background: `${hex}22`, border: `1px solid ${hex}55`, color: hex }}
                      dir="auto"
                    >
                      {cta.label}
                      <ArrowUpRight size={13} />
                    </button>
                  )}
                </div>
              );
            })()}
          </aside>
        )}
      </div>
    </div>
  );
}

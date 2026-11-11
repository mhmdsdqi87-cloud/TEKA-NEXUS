"use client";

// TEKA NEXUS — Arena game registry (Task 23).
// The TEKA OS desktop is gone: every game is now a first-class, full-page
// view in the main navigation. This registry is the single source of truth
// for the Arena Hub grid, the sidebar, the terminal and the landing page.
//
// BANDWIDTH CONTRACT: game components load lazily (next/dynamic). The
// registry itself stays a tiny metadata table (ids, titles, icons) so the
// main bundle never pulls the games — or the academy content some of them
// import — until a game is actually opened.

import dynamic from "next/dynamic";
import {
  Activity, Gamepad2, HandCoins, Hourglass, IdCard, Map, Mic, Scale,
  Swords, TerminalSquare, Timer, Users, type LucideIcon,
} from "lucide-react";

/** Minimal in-place loader shown while a lazy arena app chunk streams in. */
export const GameLoader = () => (
  <div className="grid min-h-[50vh] place-items-center" role="status" aria-live="polite">
    <span className="sr-only">Loading</span>
    <div className="h-10 w-10 animate-pulse rounded-xl bg-white/[0.06] ring-1 ring-white/10" />
  </div>
);

/** All arena apps use named exports — normalize them for next/dynamic. */
const lazyApp = <N extends string>(loader: () => Promise<Record<N, React.ComponentType<Record<string, never>>>>, name: N) =>
  dynamic(() => loader().then((m) => ({ default: m[name] })), { loading: GameLoader });

const TerminalApp = lazyApp(() => import("@/components/os/terminal-app"), "TerminalApp");
const PetApp = lazyApp(() => import("@/components/os/apps/pet-app"), "PetApp");
const BossApp = lazyApp(() => import("@/components/os/apps/boss-app"), "BossApp");
const TreeApp = lazyApp(() => import("@/components/os/apps/tree-app"), "TreeApp");
const WarApp = lazyApp(() => import("@/components/os/apps/war-app"), "WarApp");
const CardsApp = lazyApp(() => import("@/components/os/apps/cards-app"), "CardsApp");
const ShopApp = lazyApp(() => import("@/components/os/apps/shop-app"), "ShopApp");
const CrimeApp = lazyApp(() => import("@/components/os/apps/crime-app"), "CrimeApp");
const TimeMachineApp = lazyApp(() => import("@/components/os/apps/timemachine-app"), "TimeMachineApp");
const HeatmapApp = lazyApp(() => import("@/components/os/apps/heatmap-app"), "HeatmapApp");
const SpeedrunApp = lazyApp(() => import("@/components/os/apps/speedrun-app"), "SpeedrunApp");
const VoiceApp = lazyApp(() => import("@/components/os/apps/voice-app"), "VoiceApp");

export type GameAccent = "cyan" | "violet" | "ember" | "emerald";

export type ArenaGame = {
  /** Stable id — also the SPA view name ({ name: id }) and terminal name. */
  id:
    | "boss"
    | "skilltree"
    | "pet"
    | "cards"
    | "war"
    | "shop"
    | "crime"
    | "speedrun"
    | "timemachine"
    | "heatmap"
    | "voice"
    | "terminal";
  /** i18n title path (os.apps.* keeps the fully translated titles). */
  titleKey: string;
  icon: LucideIcon;
  accent: GameAccent;
  component: React.ComponentType<Record<string, never>>;
  /** Featured games sit directly in the sidebar; the rest live under "More". */
  featured: boolean;
};

export const ARENA_GAMES: ArenaGame[] = [
  { id: "boss", titleKey: "os.apps.boss", icon: Swords, accent: "ember", component: BossApp, featured: true },
  { id: "skilltree", titleKey: "os.apps.tree", icon: Map, accent: "violet", component: TreeApp, featured: true },
  { id: "pet", titleKey: "os.apps.pet", icon: Gamepad2, accent: "cyan", component: PetApp, featured: true },
  { id: "cards", titleKey: "os.apps.cards", icon: IdCard, accent: "violet", component: CardsApp, featured: true },
  { id: "war", titleKey: "os.apps.war", icon: Users, accent: "ember", component: WarApp, featured: true },
  { id: "shop", titleKey: "os.apps.shop", icon: HandCoins, accent: "ember", component: ShopApp, featured: true },
  { id: "crime", titleKey: "os.apps.crime", icon: Scale, accent: "emerald", component: CrimeApp, featured: false },
  { id: "speedrun", titleKey: "os.apps.speedrun", icon: Timer, accent: "violet", component: SpeedrunApp, featured: false },
  { id: "timemachine", titleKey: "os.apps.timemachine", icon: Hourglass, accent: "cyan", component: TimeMachineApp, featured: false },
  { id: "heatmap", titleKey: "os.apps.heatmap", icon: Activity, accent: "emerald", component: HeatmapApp, featured: false },
  { id: "voice", titleKey: "os.apps.voice", icon: Mic, accent: "cyan", component: VoiceApp, featured: false },
  { id: "terminal", titleKey: "os.apps.terminal", icon: TerminalSquare, accent: "emerald", component: TerminalApp, featured: false },
];

export function getGame(id: string): ArenaGame | undefined {
  return ARENA_GAMES.find((g) => g.id === id);
}

/** Tailwind-free accent tokens used by the hub grid + shell chips. */
export const ACCENT_HEX: Record<GameAccent, string> = {
  cyan: "#22d3ee",
  violet: "#a78bfa",
  ember: "#fbbf24",
  emerald: "#34d399",
};

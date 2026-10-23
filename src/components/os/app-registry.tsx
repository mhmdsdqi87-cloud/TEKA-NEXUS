"use client";

// TEKA NEXUS — Arena game registry (Task 23).
// The TEKA OS desktop is gone: every game is now a first-class, full-page
// view in the main navigation. This registry is the single source of truth
// for the Arena Hub grid, the sidebar, the terminal and the landing page.

import {
  Activity, Gamepad2, HandCoins, Hourglass, IdCard, Map, Mic, Scale,
  Swords, TerminalSquare, Timer, Users, type LucideIcon,
} from "lucide-react";

import { TerminalApp } from "@/components/os/terminal-app";
import { PetApp } from "@/components/os/apps/pet-app";
import { BossApp } from "@/components/os/apps/boss-app";
import { TreeApp } from "@/components/os/apps/tree-app";
import { WarApp } from "@/components/os/apps/war-app";
import { CardsApp } from "@/components/os/apps/cards-app";
import { ShopApp } from "@/components/os/apps/shop-app";
import { CrimeApp } from "@/components/os/apps/crime-app";
import { TimeMachineApp } from "@/components/os/apps/timemachine-app";
import { HeatmapApp } from "@/components/os/apps/heatmap-app";
import { SpeedrunApp } from "@/components/os/apps/speedrun-app";
import { VoiceApp } from "@/components/os/apps/voice-app";

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
  component: React.ComponentType;
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

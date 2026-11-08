"use client";

// TEKA OS — desktop app registry (Task 19).
// Single source of truth for desktop icons, start menu, taskbar and windows.
// os-root.tsx renders desktop/start/taskbar from OS_APPS and resolves open
// windows via getOsApp. Titles reuse the existing os.apps.* i18n keys so all
// 7 locales are covered without new dictionary work.

import type { ComponentType } from "react";
import {
  Bird,
  Fingerprint,
  Flame,
  GraduationCap,
  History,
  Mic,
  Network,
  ShoppingBag,
  Spade,
  Swords,
  Terminal,
  Timer,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { AcademyView } from "@/views/academy-view";
import { BossApp } from "./apps/boss-app";
import { CardsApp } from "./apps/cards-app";
import { CrimeApp } from "./apps/crime-app";
import { HeatmapApp } from "./apps/heatmap-app";
import { PetApp } from "./apps/pet-app";
import { ShopApp } from "./apps/shop-app";
import { SpeedrunApp } from "./apps/speedrun-app";
import { TimeMachineApp } from "./apps/timemachine-app";
import { TreeApp } from "./apps/tree-app";
import { VoiceApp } from "./apps/voice-app";
import { WarApp } from "./apps/war-app";
import { TerminalApp } from "./terminal-app";

export type OsAppAccent = "cyan" | "violet" | "ember" | "emerald";

export type OsApp = {
  id: string;
  /** i18n key under os.apps.* — present in all 7 dictionaries. */
  titleKey: string;
  icon: LucideIcon;
  accent: OsAppAccent;
  /** Show on the desktop icon grid (false → start-menu only). */
  desktop: boolean;
  component: ComponentType;
};

export const OS_APPS: OsApp[] = [
  { id: "academy", titleKey: "os.apps.academy", icon: GraduationCap, accent: "cyan", desktop: true, component: AcademyView },
  { id: "terminal", titleKey: "os.apps.terminal", icon: Terminal, accent: "emerald", desktop: true, component: TerminalApp },
  { id: "pet", titleKey: "os.apps.pet", icon: Bird, accent: "violet", desktop: true, component: PetApp },
  { id: "boss", titleKey: "os.apps.boss", icon: Trophy, accent: "ember", desktop: true, component: BossApp },
  { id: "tree", titleKey: "os.apps.tree", icon: Network, accent: "cyan", desktop: true, component: TreeApp },
  { id: "war", titleKey: "os.apps.war", icon: Swords, accent: "ember", desktop: true, component: WarApp },
  { id: "cards", titleKey: "os.apps.cards", icon: Spade, accent: "violet", desktop: true, component: CardsApp },
  { id: "shop", titleKey: "os.apps.shop", icon: ShoppingBag, accent: "ember", desktop: true, component: ShopApp },
  { id: "crime", titleKey: "os.apps.crime", icon: Fingerprint, accent: "violet", desktop: true, component: CrimeApp },
  { id: "timemachine", titleKey: "os.apps.timemachine", icon: History, accent: "cyan", desktop: false, component: TimeMachineApp },
  { id: "heatmap", titleKey: "os.apps.heatmap", icon: Flame, accent: "ember", desktop: false, component: HeatmapApp },
  { id: "speedrun", titleKey: "os.apps.speedrun", icon: Timer, accent: "emerald", desktop: false, component: SpeedrunApp },
  { id: "voice", titleKey: "os.apps.voice", icon: Mic, accent: "emerald", desktop: false, component: VoiceApp },
];

export function getOsApp(id: string): OsApp | undefined {
  return OS_APPS.find((app) => app.id === id);
}

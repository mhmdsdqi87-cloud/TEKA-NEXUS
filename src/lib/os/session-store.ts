"use client";

// TEKA OS — shared session snapshot (Task 19).
// The OS root fetches /api/os/session once and shares it with every app;
// mutating apps call refresh() so the wallet / pet / event chips stay live.

import { create } from "zustand";

export type OsPetState = {
  id: string;
  name: string;
  stage: number;
  hunger: number;
  feeds: number;
  plays: number;
  lastFedAt: string | null;
};

export type OsEventState = {
  active: boolean;
  start: string;
  end: string;
  nextStart: string;
  multiplier: number;
};

export type OsSession = {
  coins: number;
  team: string | null;
  title: string | null;
  xp: number;
  memberSince: string;
  event: OsEventState;
  pet: OsPetState | null;
  activeBattle: { id: string; courseId: string; moduleId: string; bossHp: number; playerHp: number; cursor: number } | null;
  cards: { count: number; kinds: string[] };
  newCards: string[];
};

type OsSessionState = {
  session: OsSession | null;
  loading: boolean;
  fetchSession: () => Promise<void>;
  patch: (p: Partial<OsSession>) => void;
};

import { get as apiGet } from "@/lib/api";

export const useOsSession = create<OsSessionState>((set, get) => ({
  session: null,
  loading: false,
  fetchSession: async () => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const data = await apiGet<OsSession>("/api/os/session");
      set({ session: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  patch: (p) => {
    const cur = get().session;
    if (cur) set({ session: { ...cur, ...p } });
  },
}));

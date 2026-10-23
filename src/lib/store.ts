"use client";

// TEKA NEXUS — SPA view router + session store.
// The whole app lives on "/" ; navigation is state-based via this store.

import { create } from "zustand";

export type View =
  | { name: "landing" }
  | { name: "login" }
  | { name: "signup" }
  | { name: "onboarding" }
  | { name: "about" }
  | { name: "arena" }
  | { name: "boss" }
  | { name: "skilltree" }
  | { name: "pet" }
  | { name: "cards" }
  | { name: "war" }
  | { name: "shop" }
  | { name: "crime" }
  | { name: "speedrun" }
  | { name: "timemachine" }
  | { name: "heatmap" }
  | { name: "voice" }
  | { name: "terminal" }
  | { name: "home" }
  | { name: "explore"; query?: string }
  | { name: "live" }
  | { name: "workspaceHub" }
  | { name: "projectNew" }
  | { name: "project"; slug: string; tab?: string; fileId?: string }
  | { name: "teams" }
  | { name: "notifications" }
  | { name: "dm"; conversationId?: string }
  | { name: "profile"; username: string }
  | { name: "settings"; tab?: "profile" | "account" | "notifications" | "privacy" }
  | { name: "saved" }
  | { name: "academy"; course?: string; lesson?: string }
  | { name: "academyPortal"; section?: "dashboard" | "paths" | "tools" | "tutor" | "certificates" }
  | { name: "founder" };

export type SessionUser = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  bio: string;
  avatarColor: string;
  avatarUrl: string | null;
  websiteUrl: string;
  role: string;
  goals: string[];
  interests: string[];
  xp: number;
  reputation: number;
  coins?: number; // TEKA Coin balance (Task 19)
  team?: string | null; // RED | BLUE (Task 19)
  title?: string | null; // boss title (Task 19)
  onboardingCompleted: boolean;
  createdAt: string;
};

type RouterState = {
  view: View;
  history: View[];
  searchOpen: boolean;
  authChecked: boolean;
  user: SessionUser | null;
  unreadCount: number;
  dmUnreadCount: number;
  navigate: (view: View) => void;
  back: () => void;
  setSearchOpen: (open: boolean) => void;
  setAuthChecked: (v: boolean) => void;
  setUser: (u: SessionUser | null) => void;
  setUnreadCount: (n: number) => void;
  setDmUnreadCount: (n: number) => void;
};

export const useApp = create<RouterState>((set, get) => ({
  view: { name: "landing" },
  history: [],
  searchOpen: false,
  authChecked: false,
  user: null,
  unreadCount: 0,
  dmUnreadCount: 0,
  navigate: (view) => {
    const { view: current, history } = get();
    // avoid pushing identical consecutive views
    if (JSON.stringify(current) === JSON.stringify(view)) return;
    set({ view, history: [...history.slice(-20), current], searchOpen: false });
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  },
  back: () => {
    const { history } = get();
    const prev = history[history.length - 1];
    if (prev) set({ view: prev, history: history.slice(0, -1) });
    else set({ view: { name: "landing" }, history: [] });
  },
  setSearchOpen: (open) => set({ searchOpen: open }),
  setAuthChecked: (v) => set({ authChecked: v }),
  setUser: (u) => set({ user: u }),
  setUnreadCount: (n) => set({ unreadCount: n }),
  setDmUnreadCount: (n) => set({ dmUnreadCount: n }),
}));

"use client";

// TEKA OS — window manager store (Task 19).
// Tracks open windows, z-order, geometry, and OS-level toggles.

import { create } from "zustand";

export type OsWindow = {
  id: string;
  appId: string;
  z: number;
  x: number;
  y: number;
  w: number;
  h: number;
  minimized: boolean;
  maximized: boolean;
  /** Deep-link props, e.g. { course: "python-basics" } for the academy app. */
  props?: Record<string, string | undefined>;
};

type OsState = {
  windows: OsWindow[];
  topZ: number;
  startOpen: boolean;
  matrix: boolean;
  openApp: (appId: string, props?: Record<string, string | undefined>, size?: { w: number; h: number }) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMax: (id: string) => void;
  setPos: (id: string, x: number, y: number) => void;
  setSize: (id: string, w: number, h: number) => void;
  setStartOpen: (v: boolean) => void;
  setMatrix: (v: boolean) => void;
};

let seq = 0;

export const useOs = create<OsState>((set, get) => ({
  windows: [],
  topZ: 10,
  startOpen: false,
  matrix: false,

  openApp: (appId, props, size) => {
    const { windows, topZ } = get();
    // Re-focus an identical app+props window instead of spawning a twin.
    const same = windows.find(
      (w) => w.appId === appId && JSON.stringify(w.props ?? {}) === JSON.stringify(props ?? {}),
    );
    if (same) {
      set({
        windows: windows.map((w) =>
          w.id === same.id ? { ...w, minimized: false, z: topZ + 1 } : w,
        ),
        topZ: topZ + 1,
        startOpen: false,
      });
      return;
    }
    seq += 1;
    const w = size?.w ?? Math.min(880, Math.max(340, Math.floor(window.innerWidth * 0.72)));
    const h = size?.h ?? Math.min(620, Math.max(360, Math.floor(window.innerHeight * 0.66)));
    const offset = (windows.length % 6) * 28;
    const x = Math.max(12, Math.floor((window.innerWidth - w) / 2) + offset - 60);
    const y = Math.max(12, Math.floor((window.innerHeight - h) / 2) - 40 + offset);
    const win: OsWindow = {
      id: `win-${seq}-${appId}`,
      appId,
      z: topZ + 1,
      x,
      y,
      w,
      h,
      minimized: false,
      maximized: false,
      props,
    };
    set({ windows: [...windows, win], topZ: topZ + 1, startOpen: false });
  },

  close: (id) => set({ windows: get().windows.filter((w) => w.id !== id) }),

  focus: (id) => {
    const { windows, topZ } = get();
    const target = windows.find((w) => w.id === id);
    if (!target) return;
    if (target.z === topZ && !target.minimized) return;
    set({
      windows: windows.map((w) => (w.id === id ? { ...w, z: topZ + 1, minimized: false } : w)),
      topZ: topZ + 1,
    });
  },

  minimize: (id) =>
    set({ windows: get().windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)) }),

  toggleMax: (id) =>
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)),
    }),

  setPos: (id, x, y) =>
    set({ windows: get().windows.map((w) => (w.id === id ? { ...w, x, y } : w)) }),

  setSize: (id, w, h) =>
    set({ windows: get().windows.map((win) => (win.id === id ? { ...win, w, h } : win)) }),

  setStartOpen: (v) => set({ startOpen: v }),
  setMatrix: (v) => set({ matrix: v }),
}));

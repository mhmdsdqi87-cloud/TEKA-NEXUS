// TEKA NEXUS — Academy local persistence (device-side).
// Bookmarks / per-lesson notes / daily streak live in localStorage so they
// work instantly, offline-first, with zero schema migration. Progress and
// certificates stay server-side; these are convenience layers on top.

import { useCallback, useSyncExternalStore } from "react";

const BOOKMARKS_EVENT = "teka:bookmarks";
const STREAK_EVENT = "teka:streak";

// ─── Bookmarks ───────────────────────────────────────────────

export function readBookmarks(userId: string): string[] {
  if (typeof window === "undefined" || !userId) return [];
  try {
    const raw = JSON.parse(window.localStorage.getItem(`teka.bookmarks.${userId}`) ?? "[]");
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Toggle a bookmark; returns the new state (true = bookmarked). */
export function toggleBookmark(userId: string, lessonId: string): boolean {
  if (typeof window === "undefined" || !userId) return false;
  const cur = readBookmarks(userId);
  const next = cur.includes(lessonId) ? cur.filter((id) => id !== lessonId) : [lessonId, ...cur];
  window.localStorage.setItem(`teka.bookmarks.${userId}`, JSON.stringify(next.slice(0, 500)));
  window.dispatchEvent(new Event(BOOKMARKS_EVENT));
  return next.includes(lessonId);
}

// External store plumbing so React subscribes without setState-in-effect.
const EMPTY: string[] = [];
let bookmarkSnap: { key: string; val: string[] } = { key: "\0", val: EMPTY };

function subscribeBookmarks(cb: () => void) {
  const handler = () => {
    bookmarkSnap = { key: "\0", val: EMPTY }; // invalidate → next read is fresh
    cb();
  };
  window.addEventListener(BOOKMARKS_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(BOOKMARKS_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

/** React hook: bookmarks for a user, kept fresh across toggle/storage events. */
export function useBookmarks(userId: string | null | undefined): string[] {
  const key = userId ? `teka.bookmarks.${userId}` : "";
  const getSnapshot = useCallback(() => {
    if (!key) return EMPTY;
    if (bookmarkSnap.key === key) return bookmarkSnap.val;
    const val = readBookmarks(userId as string);
    bookmarkSnap = { key, val: val.length > 0 ? val : EMPTY };
    return bookmarkSnap.val;
  }, [key, userId]);
  return useSyncExternalStore(subscribeBookmarks, getSnapshot, () => EMPTY);
}

// ─── Per-lesson notes ────────────────────────────────────────

export function readNote(lessonId: string): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(`teka.note.${lessonId}`) ?? "";
}

export function saveNote(lessonId: string, text: string): void {
  if (typeof window === "undefined") return;
  if (text.trim()) window.localStorage.setItem(`teka.note.${lessonId}`, text);
  else window.localStorage.removeItem(`teka.note.${lessonId}`);
}

// ─── Daily streak ────────────────────────────────────────────

export type Streak = { count: number; last: string };

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function readStreak(userId: string): Streak {
  if (typeof window === "undefined" || !userId) return { count: 0, last: "" };
  try {
    const raw = JSON.parse(window.localStorage.getItem(`teka.streak.${userId}`) ?? "null");
    return raw && typeof raw === "object" && typeof raw.count === "number" && typeof raw.last === "string"
      ? (raw as Streak)
      : { count: 0, last: "" };
  } catch {
    return { count: 0, last: "" };
  }
}

/**
 * Call once per Academy visit; rolls the streak forward at most once a day.
 * Returns the current streak count (0 for anonymous visitors).
 */
export function touchStreak(userId: string): number {
  if (typeof window === "undefined" || !userId) return 0;
  const cur = readStreak(userId);
  const today = dayKey(new Date());
  if (cur.last === today) return cur.count;
  const yesterday = dayKey(new Date(Date.now() - 86_400_000));
  const next: Streak =
    cur.last === yesterday ? { count: cur.count + 1, last: today } : { count: 1, last: today };
  window.localStorage.setItem(`teka.streak.${userId}`, JSON.stringify(next));
  window.dispatchEvent(new Event(STREAK_EVENT));
  return next.count;
}

let streakSnap: { key: string; val: number } = { key: "\0", val: 0 };

function subscribeStreak(cb: () => void) {
  const handler = () => {
    streakSnap = { key: "\0", val: 0 };
    cb();
  };
  window.addEventListener(STREAK_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(STREAK_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

/** React hook: current streak count for a user (external-store backed). */
export function useStreak(userId: string | null | undefined): number {
  const key = userId ? `teka.streak.${userId}` : "";
  const getSnapshot = useCallback(() => {
    if (!key) return 0;
    if (streakSnap.key === key) return streakSnap.val;
    const val = readStreak(userId as string).count;
    streakSnap = { key, val };
    return val;
  }, [key, userId]);
  return useSyncExternalStore(subscribeStreak, getSnapshot, () => 0);
}

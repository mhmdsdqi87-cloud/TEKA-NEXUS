"use client";

// TEKA NEXUS — locale store.
// Persists the chosen locale to localStorage, detects it from the browser on
// first visit, and mirrors locale/lang/dir onto <html> for CSS (RTL etc.).

import { create } from "zustand";
import { useEffect } from "react";

import {
  DEFAULT_LOCALE,
  RTL_LOCALES,
  isLocale,
  matchLocale,
  type Locale,
} from "./locales";

const STORAGE_KEY = "teka-nexus-locale";

function applyToDocument(locale: Locale) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.lang = locale;
  root.dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";
}

type I18nState = {
  locale: Locale;
  /** true once localStorage/browser detection has been applied (client only) */
  hydrated: boolean;
  setLocale: (locale: Locale) => void;
  hydrate: () => void;
};

export const useI18n = create<I18nState>((set, get) => ({
  locale: DEFAULT_LOCALE,
  hydrated: false,
  setLocale: (locale) => {
    if (!isLocale(locale) || locale === get().locale) {
      applyToDocument(locale);
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* private mode — keep in-memory only */
    }
    applyToDocument(locale);
    set({ locale });
  },
  hydrate: () => {
    if (get().hydrated || typeof window === "undefined") return;
    let initial: Locale = DEFAULT_LOCALE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLocale(saved)) initial = saved;
      else initial = matchLocale(navigator.language) ?? DEFAULT_LOCALE;
    } catch {
      /* keep default */
    }
    applyToDocument(initial);
    set({ locale: initial, hydrated: true });
  },
}));

/**
 * Call once from the root component: restores the persisted / detected locale
 * after mount so SSR markup (default en/ltr) never mismatches.
 */
export function useInitLocale() {
  const hydrate = useI18n((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
}

"use client";

// TEKA NEXUS — i18n runtime.
// useT() returns a translate function with {param} interpolation and an
// en-fallback chain. useRelativeTime()/useFormatDate() bind date-fns to the
// active locale. All dictionaries are statically imported (small bundle,
// zero waterfall) and merged per-locale by dictionaries/<locale>/index.ts.

import { useMemo } from "react";

import { useI18n } from "./store";
import { localeMeta, type Locale } from "./locales";

import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import { zh } from "./dictionaries/zh";
import { ar } from "./dictionaries/ar";
import { fa } from "./dictionaries/fa";
import { fr } from "./dictionaries/fr";

import { format, formatDistanceToNow, parseISO } from "date-fns";

const DICTS: Record<Locale, any> = { en, es, zh, ar, fa, fr };
const BASE: any = en;

/** Resolve a dot path ("landing.hero.title") inside a nested dictionary. */
function lookup(dict: any, path: string): string | undefined {
  let cur: unknown = dict;
  for (const part of path.split(".")) {
    if (cur && typeof cur === "object" && part in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof cur === "string" ? cur : undefined;
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  let out = template;
  for (const [key, value] of Object.entries(params)) {
    out = out.replaceAll(`{${key}}`, String(value));
  }
  return out;
}

export type TFunc = (path: string, params?: Record<string, string | number>) => string;

/** t() bound to an explicit locale — usable outside React (helpers, constants). */
export function makeT(locale: Locale): TFunc {
  return (path, params) => {
    const raw = lookup(DICTS[locale], path) ?? lookup(BASE, path) ?? path;
    return interpolate(raw, params);
  };
}

/** React hook: translate in the active locale with en fallback. */
export function useT(): TFunc {
  const locale = useI18n((s) => s.locale);
  return useMemo(() => makeT(locale), [locale]);
}

/** React hook: true when the active locale is right-to-left. */
export function useIsRTL(): boolean {
  const locale = useI18n((s) => s.locale);
  return localeMeta(locale).dir === "rtl";
}

/**
 * React hook: translate enum-ish constant labels (statuses, categories,
 * skills, priorities, roles, goals…) by dictionary prefix + slug, falling
 * back to the English dictionary and finally to the constant's own name.
 * Example: lbl("project.status", s.slug, s.name)
 */
export function useLabeled() {
  const locale = useI18n((s) => s.locale);
  return useMemo(() => {
    return (prefix: string, slug: string, fallback: string): string =>
      lookup(DICTS[locale], `${prefix}.${slug}`) ??
      lookup(BASE, `${prefix}.${slug}`) ??
      fallback;
  }, [locale]);
}

function toDate(input: Date | string | number): Date {
  if (input instanceof Date) return input;
  if (typeof input === "string") return parseISO(input);
  return new Date(input);
}

/** React hook: locale-aware "3 days ago" style relative time. */
export function useRelativeTime() {
  const locale = useI18n((s) => s.locale);
  return useMemo(() => {
    const dl = localeMeta(locale).dateLocale;
    return (date: Date | string | number) =>
      formatDistanceToNow(toDate(date), { addSuffix: true, locale: dl });
  }, [locale]);
}

/** React hook: locale-aware fixed formatting ("MMM d, yyyy"). */
export function useFormatDate() {
  const locale = useI18n((s) => s.locale);
  return useMemo(() => {
    const dl = localeMeta(locale).dateLocale;
    return (date: Date | string | number, pattern = "MMM d, yyyy") =>
      format(toDate(date), pattern, { locale: dl });
  }, [locale]);
}

// TEKA NEXUS — i18n integrity tests.
// 7 locales (en base + es/zh/ar/fa/fr/ru) × 22 namespaces. The UI assumes
// every locale resolves the exact same key tree — a missing key renders raw
// text to users. This suite flattens every namespace and pins each locale's
// key paths to the English source of truth (extra keys fail too).

import { describe, expect, test } from "bun:test";

import { LOCALES, RTL_LOCALES, isLocale } from "@/lib/i18n/locales";

import { en } from "@/lib/i18n/dictionaries/en";
import { fa } from "@/lib/i18n/dictionaries/fa";
import { ar } from "@/lib/i18n/dictionaries/ar";
import { es } from "@/lib/i18n/dictionaries/es";
import { fr } from "@/lib/i18n/dictionaries/fr";
import { ru } from "@/lib/i18n/dictionaries/ru";
import { zh } from "@/lib/i18n/dictionaries/zh";

const DICTS = { en, fa, ar, es, fr, ru, zh } as const;

/** Flatten a nested object into "namespace.dot.path" strings. */
function keyPaths(obj: Record<string, unknown>, prefix = ""): Set<string> {
  const out = new Set<string>();
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object") {
      for (const p of keyPaths(v as Record<string, unknown>, path)) out.add(p);
    } else {
      out.add(path);
    }
  }
  return out;
}

describe("locale registry", () => {
  test("exactly 7 locales, en default", () => {
    expect(LOCALES.length).toBe(7);
    expect(LOCALES.map((l) => l.code)).toEqual(["en", "es", "zh", "ar", "fa", "fr", "ru"]);
  });

  test("ar + fa are the RTL locales", () => {
    expect([...RTL_LOCALES].sort()).toEqual(["ar", "fa"]);
    expect(isLocale("fa")).toBe(true);
    expect(isLocale("de")).toBe(false);
  });
});

describe("dictionary key parity (en = source of truth)", () => {
  const enKeys = keyPaths(en);

  test("en dictionary is non-trivial (22 namespaces, 400+ keys)", () => {
    const namespaces = Object.keys(en);
    expect(namespaces.length).toBe(22);
    expect(enKeys.size).toBeGreaterThan(400);
  });

  for (const locale of ["fa", "ar", "es", "fr", "ru", "zh"] as const) {
    test(`${locale} resolves every en key (and nothing extra)`, () => {
      const locKeys = keyPaths(DICTS[locale]);
      const missing = [...enKeys].filter((k) => !locKeys.has(k));
      const extra = [...locKeys].filter((k) => !enKeys.has(k));
      expect(missing).toEqual([]); // translated UIs never render raw keys
      expect(extra).toEqual([]);
    });
  }

  test("the landing LivePulse keys exist in all 7 locales (freshness strip)", () => {
    const liveKeys = [...enKeys].filter((k) => k.startsWith("landing.live."));
    expect(liveKeys.length).toBeGreaterThanOrEqual(6); // aria/label/empty/online/members/projects
    for (const locale of ["fa", "ar", "es", "fr", "ru", "zh"] as const) {
      const locKeys = keyPaths(DICTS[locale]);
      for (const k of liveKeys) expect(locKeys.has(k)).toBe(true);
    }
  });
});

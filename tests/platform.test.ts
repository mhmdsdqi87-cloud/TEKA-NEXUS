// TEKA NEXUS — platform kernel tests: XP math, Iranian week window,
// auth primitives. These are the pure functions every other surface leans on.

import { describe, expect, test } from "bun:test";

import { hashPassword, normalizeUsername, safeParseArray, validateUsername, verifyPassword } from "@/lib/auth";
import { currentWeekWindow } from "@/lib/week";
import { levelFromXp, levelProgress, levelTitleKey, xpForLevel } from "@/lib/xp";

// ─── XP → level curve (120 · (n-1)²) ─────────────────────────

describe("xp engine", () => {
  test("documented level thresholds hold (Lv2 @120, Lv3 @480, Lv5 @1920)", () => {
    expect(xpForLevel(1)).toBe(0);
    expect(xpForLevel(2)).toBe(120);
    expect(xpForLevel(3)).toBe(480);
    expect(xpForLevel(5)).toBe(1920);
  });

  test("levelFromXp matches the curve boundaries", () => {
    expect(levelFromXp(0)).toBe(1);
    expect(levelFromXp(119)).toBe(1);
    expect(levelFromXp(120)).toBe(2);
    expect(levelFromXp(479)).toBe(2);
    expect(levelFromXp(480)).toBe(3);
  });

  test("levelProgress clamps to 0-100 and resets at a level-up boundary", () => {
    expect(levelProgress(0)).toBe(0);
    expect(levelProgress(60)).toBe(50); // halfway to Lv2
    expect(levelProgress(119)).toBe(99); // one xp before Lv2
    expect(levelProgress(120)).toBe(0); // leveled up → bar restarts for Lv3
    expect(levelProgress(-5)).toBe(0);
  });

  test("negative xp is treated as zero (never crashes)", () => {
    expect(levelFromXp(-100)).toBe(1);
  });

  test("level title ladder resolves for every level", () => {
    for (const lvl of [1, 2, 5, 10, 50]) {
      expect(typeof levelTitleKey(lvl)).toBe("string");
      expect(levelTitleKey(lvl).length).toBeGreaterThan(0);
    }
  });
});

// ─── Iranian week (Saturday 00:00 UTC → Friday 24:00 UTC) ────

describe("week engine", () => {
  test("window starts on Saturday and spans exactly 7 days", () => {
    // 2026-11-02 is a Monday → its week started Sat 2026-10-31.
    const { weekStart, weekEnd } = currentWeekWindow(new Date("2026-11-02T12:00:00Z"));
    expect(weekStart.toISOString()).toBe("2026-10-31T00:00:00.000Z");
    expect(weekEnd.getTime() - weekStart.getTime()).toBe(7 * 24 * 60 * 60 * 1000);
  });

  test("every weekday of a known week maps to the same window", () => {
    const days = ["2026-10-31", "2026-11-01", "2026-11-02", "2026-11-03", "2026-11-04", "2026-11-05", "2026-11-06"];
    const windows = days.map((d) => currentWeekWindow(new Date(`${d}T09:00:00Z`)).weekStart.toISOString());
    expect(new Set(windows).size).toBe(1);
    expect(windows[0]).toBe("2026-10-31T00:00:00.000Z");
  });

  test("Friday 23:59 is still the same week; Saturday 00:01 rolls over", () => {
    const fri = currentWeekWindow(new Date("2026-11-06T23:59:00Z")).weekStart.toISOString();
    const sat = currentWeekWindow(new Date("2026-11-07T00:01:00Z")).weekStart.toISOString();
    expect(fri).toBe("2026-10-31T00:00:00.000Z");
    expect(sat).toBe("2026-11-07T00:00:00.000Z");
  });
});

// ─── Auth primitives ─────────────────────────────────────────

describe("auth primitives", () => {
  test("password roundtrip: correct passes, wrong fails", () => {
    const stored = hashPassword("TekaNexus2026!Secure");
    expect(stored).toContain(":");
    expect(verifyPassword("TekaNexus2026!Secure", stored)).toBe(true);
    expect(verifyPassword("wrong-password", stored)).toBe(false);
  });

  test("scrypt uses a per-password salt (same input → different hashes)", () => {
    const a = hashPassword("same-secret");
    const b = hashPassword("same-secret");
    expect(a).not.toBe(b);
    expect(verifyPassword("same-secret", a)).toBe(true);
    expect(verifyPassword("same-secret", b)).toBe(true);
  });

  test("malformed stored hash never verifies (no crash)", () => {
    expect(verifyPassword("x", "")).toBe(false);
    expect(verifyPassword("x", "no-colon-here")).toBe(false);
  });

  test("username normalization is lowercase-trim", () => {
    expect(normalizeUsername("  DevAli  ")).toBe("devali");
  });

  test("username validation rules", () => {
    expect(validateUsername("ali_dev")).toBeNull(); // valid → no error
    expect(validateUsername("ab")).toContain("3–24");
    expect(validateUsername("a".repeat(25))).toContain("3–24");
    expect(validateUsername("has space!")).toContain("3–24");
    expect(validateUsername("admin")).toContain("reserved");
    expect(validateUsername("teka")).toContain("reserved");
  });

  test("safeParseArray tolerates garbage (legacy JSON columns)", () => {
    expect(safeParseArray('["a","b"]')).toEqual(["a", "b"]);
    expect(safeParseArray("garbage")).toEqual([]);
    expect(safeParseArray('{"not":"array"}')).toEqual([]);
    expect(safeParseArray("")).toEqual([]);
  });
});

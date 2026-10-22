// TEKA NEXUS — XP → level math (client-safe, no server imports).
// Level curve: xp needed for level n = 120 · (n-1)²  →  gentle start,
// steep later (Lv2 @120, Lv3 @480, Lv4 @1080, Lv5 @1920, Lv6 @3000…).

export function levelFromXp(xp: number): number {
  return Math.max(1, Math.floor(Math.sqrt(Math.max(0, xp) / 120)) + 1);
}

/** Total XP required to *reach* a level (progress bar start). */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.round(120 * Math.pow(level - 1, 2));
}

/** Progress 0-100 toward the next level. */
export function levelProgress(xp: number): number {
  const level = levelFromXp(xp);
  const start = xpForLevel(level);
  const next = xpForLevel(level + 1);
  if (next <= start) return 100;
  return Math.min(100, Math.max(0, Math.round(((xp - start) / (next - start)) * 100)));
}

/** i18n key suffix for the level title ladder (translated in pulse dict). */
export function levelTitleKey(level: number): string {
  if (level >= 12) return "legend";
  if (level >= 9) return "master";
  if (level >= 7) return "veteran";
  if (level >= 5) return "builder";
  if (level >= 3) return "explorer";
  return "rookie";
}

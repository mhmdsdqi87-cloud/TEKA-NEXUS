// TEKA NEXUS — TEKA NIGHTS event engine (client-safe, no server imports).
//
// TEKA NIGHTS = a monthly live event. Deterministic rule so every client and
// the server agree without a shared clock sync:
//   • Window: FIRST Friday of every Gregorian month, 20:00 → 23:00 (Tehran).
//   • Tehran is UTC+03:30 year-round (Iran abolished DST in 2022).
//   • During the window: 2× XP, hidden boss unlocked, site-wide alert theme.
//
// The countdown chip on the OS status bar always shows the next window.

export const TEKA_TZ_OFFSET_MIN = 3 * 60 + 30; // UTC+03:30

export type TekaEventWindow = {
  active: boolean;
  /** Absolute window bounds (ISO strings) for the *current or next* window. */
  start: string;
  end: string;
  /** Start of the next window after `now` (ISO string). */
  nextStart: string;
  multiplier: number; // 2 during the event, 1 otherwise
};

/** Convert a UTC Date to "wall clock" parts in Tehran time. */
function tehranParts(d: Date) {
  const shifted = new Date(d.getTime() + TEKA_TZ_OFFSET_MIN * 60_000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth(), // 0-based
    day: shifted.getUTCDate(),
    weekday: shifted.getUTCDay(), // 0 Sun … 5 Fri … 6 Sat
    hours: shifted.getUTCHours(),
    minutes: shifted.getUTCMinutes(),
  };
}

/** Build a UTC Date from Tehran wall-clock parts. */
function fromTehran(year: number, month: number, day: number, hours: number, minutes: number): Date {
  const utcMs = Date.UTC(year, month, day, hours, minutes) - TEKA_TZ_OFFSET_MIN * 60_000;
  return new Date(utcMs);
}

/** First Friday (Tehran calendar) of the month containing the given Tehran parts. */
function firstFridayOf(year: number, month: number): Date {
  for (let day = 1; day <= 7; day++) {
    const d = fromTehran(year, month, day, 20, 0); // 20:00 Tehran
    if (tehranParts(d).weekday === 5) return d;
  }
  // Unreachable — every 7-day span contains a Friday.
  return fromTehran(year, month, 1, 20, 0);
}

const EVENT_HOURS = 3;

/** Compute the event state for a moment. `now` defaults to real time. */
export function tekaEventWindow(now: Date = new Date()): TekaEventWindow {
  const p = tehranParts(now);
  const start = firstFridayOf(p.year, p.month);
  const end = new Date(start.getTime() + EVENT_HOURS * 3_600_000);

  let nextStart: Date;
  if (now < start) {
    nextStart = start;
  } else {
    const nm = p.month === 11 ? 0 : p.month + 1;
    const ny = p.month === 11 ? p.year + 1 : p.year;
    nextStart = firstFridayOf(ny, nm);
  }

  const active = now >= start && now < end;
  return {
    active,
    start: start.toISOString(),
    end: end.toISOString(),
    nextStart: nextStart.toISOString(),
    multiplier: active ? 2 : 1,
  };
}

/** Format a distance like "2d 4h" / "3h 12m" — used by the countdown chip. */
export function formatCountdown(targetIso: string, now: Date = new Date()): string {
  const ms = Math.max(0, new Date(targetIso).getTime() - now.getTime());
  const totalMin = Math.floor(ms / 60_000);
  const d = Math.floor(totalMin / 1440);
  const h = Math.floor((totalMin % 1440) / 60);
  const m = totalMin % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

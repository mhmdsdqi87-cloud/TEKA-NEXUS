// TEKA NEXUS — Iranian-week helpers (Saturday 00:00 UTC → Friday 24:00 UTC).
// Shared by the challenge API, bootstrap migration and the seeder so every
// surface computes the exact same weekly window.

export function currentWeekWindow(now: Date = new Date()): { weekStart: Date; weekEnd: Date } {
  const d = new Date(now);
  const day = d.getUTCDay(); // 0=Sun … 6=Sat
  const daysSinceSaturday = (day + 1) % 7; // Sat→0, Sun→1, Mon→2 … Fri→6
  const start = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - daysSinceSaturday)
  );
  const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
  return { weekStart: start, weekEnd: end };
}

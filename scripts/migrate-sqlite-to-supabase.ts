#!/usr/bin/env bun
// One-shot migration: SQLite → Supabase Postgres.
// Source is read with bun:sqlite directly (the generated Prisma client is now
// postgres-only); destination uses the generated Prisma Client.
import { Database } from "bun:sqlite";
import { PrismaClient } from "@prisma/client";

// Destination Postgres URL comes from the environment (never hardcode it):
//   DATABASE_URL=postgresql://…pooler.supabase.com…/postgres bun scripts/migrate-sqlite-to-supabase.ts
const PG = process.env.DATABASE_URL ?? "";
if (!PG.startsWith("postgres")) {
  console.error("Refusing to run: DATABASE_URL must point at the Supabase Postgres instance (postgresql://…).");
  process.exit(1);
}
const sqlite = new Database(new URL("../db/custom.db", import.meta.url).pathname, { readonly: true });
const dst = new PrismaClient({ datasourceUrl: PG });

const DATE_FIELDS = new Set([
  "createdAt", "updatedAt", "expiresAt", "startedAt", "submittedAt", "dueAt",
  "completedAt", "archivedAt", "reviewedAt", "deletedAt", "verifiedAt", "readAt",
]);

const BOOL_FIELDS = new Set([
  "onboardingCompleted", "projectActivity", "collaborationRequests", "socialActivity",
]);

function rows(table: string): Record<string, unknown>[] {
  return sqlite.query(`SELECT * FROM "${table}"`).all() as Record<string, unknown>[];
}

// Convert SQLite epoch-ms integers into JS Dates and 0/1 into booleans.
function revive(row: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    if (DATE_FIELDS.has(k) && typeof v === "number") out[k] = new Date(v);
    else if (BOOL_FIELDS.has(k)) out[k] = v === 1 || v === "1" || v === true;
    else out[k] = v;
  }
  return out;
}

async function main() {
  const counts: Record<string, number> = {};

  const users = rows("User").map(revive);
  counts.users = 0;
  for (const u of users) {
    const { id, ...data } = u;
    await dst.user
      .create({ data: { ...(data as any), id: id as string } })
      .then(() => counts.users++)
      .catch((e) => { if (e?.code !== "P2002") throw e; });
  }

  for (const [table, fn] of [
    ["UserNotificationPrefs", (d: any) => dst.userNotificationPrefs.create({ data: d })],
    ["Session", (d: any) => dst.session.create({ data: d })],
    ["AcademyProgress", (d: any) => dst.academyProgress.create({ data: d })],
    ["AcademyCertificate", (d: any) => dst.academyCertificate.create({ data: d })],
    ["AcademyExam", (d: any) => dst.academyExam.create({ data: d })],
    ["Skill", (d: any) => dst.skill.create({ data: d })],
    ["UserSkill", (d: any) => dst.userSkill.create({ data: d })],
  ] as const) {
    const rs = rows(table).map(revive);
    counts[table] = 0;
    for (const r of rs) {
      const { id, ...data } = r;
      await fn({ ...(data as any), ...(id !== undefined ? { id: id as string } : {}) })
        .then(() => counts[table]++)
        .catch(() => {});
    }
  }

  console.log("migrated:", JSON.stringify(counts));
  const pgUsers = await dst.user.findMany({ select: { email: true, role: true } });
  console.log("postgres users now:", JSON.stringify(pgUsers));
  const pgSessions = await dst.session.count();
  console.log("postgres sessions:", pgSessions);
}

main()
  .catch((e) => { console.error("migration failed:", e?.message ?? e); process.exit(1); })
  .finally(async () => { sqlite.close(); await dst.$disconnect(); });

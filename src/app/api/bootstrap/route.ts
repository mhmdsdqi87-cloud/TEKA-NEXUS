// TEKA NEXUS — GET/POST /api/bootstrap  (Live Pulse, Task pulse-1)
// Idempotent production schema bootstrap for the Live Pulse tables.
//
// Why: the sandbox lost the Supabase DIRECT_URL (migration creds), but git
// push still auto-deploys. This route applies the additive DDL directly on
// the pooled production connection — safe to run many times:
//   • CREATE TABLE IF NOT EXISTS / CREATE INDEX IF NOT EXISTS
//   • constraint checks via pg_constraint lookups
//   • column additions guarded by ADD COLUMN IF NOT EXISTS
//   • current-week challenge auto-created through the normal Prisma path
//
// Guard: requires ?key=<BOOTSTRAP_KEY> (constant below, private repo).

import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, fail, handle } from "@/lib/server";
import { ensureCurrentChallenge } from "@/lib/challenge";

export const dynamic = "force-dynamic";

const BOOTSTRAP_KEY = "teka-pulse-2026-x7k9m2";

const STEPS: { name: string; sql: string }[] = [
  {
    name: "create ChatMessage",
    sql: `CREATE TABLE IF NOT EXISTS "ChatMessage" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create Challenge",
    sql: `CREATE TABLE IF NOT EXISTS "Challenge" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "xpReward" INTEGER NOT NULL DEFAULT 150,
  "target" INTEGER NOT NULL DEFAULT 15,
  "weekStart" TIMESTAMP(3) NOT NULL,
  "weekEnd" TIMESTAMP(3) NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create ChallengeEntry",
    sql: `CREATE TABLE IF NOT EXISTS "ChallengeEntry" (
  "id" TEXT NOT NULL,
  "challengeId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "progress" INTEGER NOT NULL DEFAULT 0,
  "completed" BOOLEAN NOT NULL DEFAULT false,
  "completedAt" TIMESTAMP(3),
  "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ChallengeEntry_pkey" PRIMARY KEY ("id")
)`,
  },
  { name: "idx ChatMessage(projectId, createdAt)", sql: `CREATE INDEX IF NOT EXISTS "ChatMessage_projectId_createdAt_idx" ON "ChatMessage"("projectId" ASC, "createdAt" ASC)` },
  { name: "idx ChatMessage(userId)", sql: `CREATE INDEX IF NOT EXISTS "ChatMessage_userId_idx" ON "ChatMessage"("userId" ASC)` },
  { name: "idx Challenge(weekStart)", sql: `CREATE INDEX IF NOT EXISTS "Challenge_weekStart_idx" ON "Challenge"("weekStart" ASC)` },
  { name: "uniq ChallengeEntry(challengeId, userId)", sql: `CREATE UNIQUE INDEX IF NOT EXISTS "ChallengeEntry_challengeId_userId_key" ON "ChallengeEntry"("challengeId" ASC, "userId" ASC)` },
  { name: "idx ChallengeEntry(userId)", sql: `CREATE INDEX IF NOT EXISTS "ChallengeEntry_userId_idx" ON "ChallengeEntry"("userId" ASC)` },
  {
    name: "fk ChatMessage→Project",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ChatMessage_projectId_fkey') THEN
    ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk ChatMessage→User",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ChatMessage_userId_fkey') THEN
    ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk ChallengeEntry→Challenge",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ChallengeEntry_challengeId_fkey') THEN
    ALTER TABLE "ChallengeEntry" ADD CONSTRAINT "ChallengeEntry_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk ChallengeEntry→User",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ChallengeEntry_userId_fkey') THEN
    ALTER TABLE "ChallengeEntry" ADD CONSTRAINT "ChallengeEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  // Safety nets in case the production schema ever lags behind the repo:
  { name: "column User.xp", sql: `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "xp" INTEGER NOT NULL DEFAULT 0` },
  { name: "column User.reputation", sql: `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "reputation" INTEGER NOT NULL DEFAULT 0` },
  { name: "column Project.repositoryUrl", sql: `ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "repositoryUrl" TEXT NOT NULL DEFAULT ''` },
];

async function runBootstrap() {
  const applied: string[] = [];
  const failed: { step: string; message: string }[] = [];

  for (const step of STEPS) {
    try {
      await db.$executeRawUnsafe(step.sql);
      applied.push(step.name);
    } catch (err) {
      // "already exists" style duplicates are fine — everything is guarded,
      // so any failure here is a real problem worth reporting.
      failed.push({ step: step.name, message: err instanceof Error ? err.message : String(err) });
    }
  }

  // Challenge creation goes through the normal Prisma path (works on both
  // SQLite and Postgres once the table exists).
  let challengeId: string | null = null;
  let challengeError: string | null = null;
  try {
    const c = await ensureCurrentChallenge();
    challengeId = c.id;
  } catch (err) {
    challengeError = err instanceof Error ? err.message : String(err);
  }

  const dialect = (process.env.DATABASE_URL ?? "").startsWith("postgres") ? "postgresql" : "sqlite";
  return {
    ok: failed.length === 0 && !challengeError,
    dialect,
    applied,
    failed,
    challengeId,
    challengeError,
    at: new Date().toISOString(),
  };
}

function guard(req: NextRequest): boolean {
  return req.nextUrl.searchParams.get("key") === BOOTSTRAP_KEY;
}

export async function GET(req: NextRequest) {
  return handle(async () => {
    if (!guard(req)) return fail("Unauthorized bootstrap attempt.", 401);
    return ok(await runBootstrap());
  });
}

export async function POST(req: NextRequest) {
  return handle(async () => {
    if (!guard(req)) return fail("Unauthorized bootstrap attempt.", 401);
    return ok(await runBootstrap());
  });
}

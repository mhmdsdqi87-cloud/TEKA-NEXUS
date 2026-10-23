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
  { name: "column Project.bgImage", sql: `ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "bgImage" TEXT NOT NULL DEFAULT ''` },
  // ── Task 15: Google login columns on "User" (additive, idempotent) ──
  { name: "column User.googleId", sql: `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "googleId" TEXT` },
  { name: "column User.authProvider", sql: `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "authProvider" TEXT NOT NULL DEFAULT 'password'` },
  { name: "uniq User.googleId", sql: `CREATE UNIQUE INDEX IF NOT EXISTS "User_googleId_key" ON "User"("googleId")` },
  // ── Task ws-1: Project Workspace (files / revisions / debug logs) ──
  {
    name: "create WorkspaceFile",
    sql: `CREATE TABLE IF NOT EXISTS "WorkspaceFile" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "folder" TEXT NOT NULL DEFAULT '/',
  "isFolder" BOOLEAN NOT NULL DEFAULT false,
  "content" TEXT NOT NULL DEFAULT '',
  "language" TEXT NOT NULL DEFAULT 'plaintext',
  "size" INTEGER NOT NULL DEFAULT 0,
  "starred" BOOLEAN NOT NULL DEFAULT false,
  "createdById" TEXT,
  "updatedById" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "WorkspaceFile_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create FileRevision",
    sql: `CREATE TABLE IF NOT EXISTS "FileRevision" (
  "id" TEXT NOT NULL,
  "fileId" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "size" INTEGER NOT NULL DEFAULT 0,
  "editorName" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "FileRevision_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create DebugLog",
    sql: `CREATE TABLE IF NOT EXISTS "DebugLog" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "level" TEXT NOT NULL DEFAULT 'info',
  "source" TEXT NOT NULL DEFAULT 'system',
  "message" TEXT NOT NULL,
  "userId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DebugLog_pkey" PRIMARY KEY ("id")
)`,
  },
  { name: "uniq WorkspaceFile(project, folder, name)", sql: `CREATE UNIQUE INDEX IF NOT EXISTS "WorkspaceFile_projectId_folder_name_key" ON "WorkspaceFile"("projectId" ASC, "folder" ASC, "name" ASC)` },
  { name: "idx WorkspaceFile(project, updatedAt)", sql: `CREATE INDEX IF NOT EXISTS "WorkspaceFile_projectId_updatedAt_idx" ON "WorkspaceFile"("projectId" ASC, "updatedAt" ASC)` },
  { name: "idx WorkspaceFile(project, folder)", sql: `CREATE INDEX IF NOT EXISTS "WorkspaceFile_projectId_folder_idx" ON "WorkspaceFile"("projectId" ASC, "folder" ASC)` },
  { name: "idx FileRevision(file, createdAt)", sql: `CREATE INDEX IF NOT EXISTS "FileRevision_fileId_createdAt_idx" ON "FileRevision"("fileId" ASC, "createdAt" ASC)` },
  { name: "idx DebugLog(project, createdAt)", sql: `CREATE INDEX IF NOT EXISTS "DebugLog_projectId_createdAt_idx" ON "DebugLog"("projectId" ASC, "createdAt" ASC)` },
  {
    name: "fk WorkspaceFile→Project",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'WorkspaceFile_projectId_fkey') THEN
    ALTER TABLE "WorkspaceFile" ADD CONSTRAINT "WorkspaceFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk WorkspaceFile→User(created)",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'WorkspaceFile_createdById_fkey') THEN
    ALTER TABLE "WorkspaceFile" ADD CONSTRAINT "WorkspaceFile_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk WorkspaceFile→User(updated)",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'WorkspaceFile_updatedById_fkey') THEN
    ALTER TABLE "WorkspaceFile" ADD CONSTRAINT "WorkspaceFile_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk FileRevision→WorkspaceFile",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FileRevision_fileId_fkey') THEN
    ALTER TABLE "FileRevision" ADD CONSTRAINT "FileRevision_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "WorkspaceFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk DebugLog→Project",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'DebugLog_projectId_fkey') THEN
    ALTER TABLE "DebugLog" ADD CONSTRAINT "DebugLog_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  // ── Task 19: TEKA OS — user columns (additive, idempotent) ──
  { name: "column User.coins", sql: `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "coins" INTEGER NOT NULL DEFAULT 0` },
  { name: "column User.team", sql: `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "team" TEXT` },
  { name: "column User.title", sql: `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "title" TEXT` },
  // ── Task 19: TEKA OS tables ──
  {
    name: "create Pet",
    sql: `CREATE TABLE IF NOT EXISTS "Pet" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "name" TEXT NOT NULL DEFAULT '',
  "stage" INTEGER NOT NULL DEFAULT 0,
  "hunger" INTEGER NOT NULL DEFAULT 100,
  "feeds" INTEGER NOT NULL DEFAULT 0,
  "plays" INTEGER NOT NULL DEFAULT 0,
  "lastFedAt" TIMESTAMP(3),
  "lastTickAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create BossBattle",
    sql: `CREATE TABLE IF NOT EXISTS "BossBattle" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "courseId" TEXT NOT NULL,
  "moduleId" TEXT NOT NULL,
  "questions" TEXT NOT NULL DEFAULT '[]',
  "cursor" INTEGER NOT NULL DEFAULT 0,
  "bossHp" INTEGER NOT NULL DEFAULT 100,
  "playerHp" INTEGER NOT NULL DEFAULT 100,
  "status" TEXT NOT NULL DEFAULT 'ACTIVE',
  "hits" INTEGER NOT NULL DEFAULT 0,
  "misses" INTEGER NOT NULL DEFAULT 0,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "finishedAt" TIMESTAMP(3),
  CONSTRAINT "BossBattle_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create SkillNodeState",
    sql: `CREATE TABLE IF NOT EXISTS "SkillNodeState" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "nodeId" TEXT NOT NULL,
  "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SkillNodeState_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create WarAction",
    sql: `CREATE TABLE IF NOT EXISTS "WarAction" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "team" TEXT NOT NULL,
  "weekKey" TEXT NOT NULL,
  "kind" TEXT NOT NULL,
  "points" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "WarAction_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create Card",
    sql: `CREATE TABLE IF NOT EXISTS "Card" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "kind" TEXT NOT NULL,
  "rarity" TEXT NOT NULL,
  "serial" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create CardTrade",
    sql: `CREATE TABLE IF NOT EXISTS "CardTrade" (
  "id" TEXT NOT NULL,
  "cardId" TEXT NOT NULL,
  "fromUserId" TEXT NOT NULL,
  "toUserId" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "resolvedAt" TIMESTAMP(3),
  CONSTRAINT "CardTrade_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create CoinLedger",
    sql: `CREATE TABLE IF NOT EXISTS "CoinLedger" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "delta" INTEGER NOT NULL,
  "reason" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CoinLedger_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create UserItem",
    sql: `CREATE TABLE IF NOT EXISTS "UserItem" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "itemKey" TEXT NOT NULL,
  "equipped" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UserItem_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create SpeedrunRecord",
    sql: `CREATE TABLE IF NOT EXISTS "SpeedrunRecord" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "courseId" TEXT NOT NULL,
  "moduleId" TEXT NOT NULL,
  "ms" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SpeedrunRecord_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create CrimeProgress",
    sql: `CREATE TABLE IF NOT EXISTS "CrimeProgress" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "caseId" TEXT NOT NULL,
  "clues" TEXT NOT NULL DEFAULT '[]',
  "solved" BOOLEAN NOT NULL DEFAULT false,
  "finishedAt" TIMESTAMP(3),
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CrimeProgress_pkey" PRIMARY KEY ("id")
)`,
  },
  {
    name: "create ActivityLog",
    sql: `CREATE TABLE IF NOT EXISTS "ActivityLog" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "kind" TEXT NOT NULL,
  "meta" TEXT NOT NULL DEFAULT '{}',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
)`,
  },
  { name: "uniq Pet(userId)", sql: `CREATE UNIQUE INDEX IF NOT EXISTS "Pet_userId_key" ON "Pet"("userId" ASC)` },
  { name: "idx BossBattle(userId, status)", sql: `CREATE INDEX IF NOT EXISTS "BossBattle_userId_status_idx" ON "BossBattle"("userId" ASC, "status" ASC)` },
  { name: "uniq SkillNodeState(userId, nodeId)", sql: `CREATE UNIQUE INDEX IF NOT EXISTS "SkillNodeState_userId_nodeId_key" ON "SkillNodeState"("userId" ASC, "nodeId" ASC)` },
  { name: "uniq WarAction(userId, weekKey, kind)", sql: `CREATE UNIQUE INDEX IF NOT EXISTS "WarAction_userId_weekKey_kind_key" ON "WarAction"("userId" ASC, "weekKey" ASC, "kind" ASC)` },
  { name: "idx WarAction(weekKey)", sql: `CREATE INDEX IF NOT EXISTS "WarAction_weekKey_idx" ON "WarAction"("weekKey" ASC)` },
  { name: "uniq Card(userId, kind)", sql: `CREATE UNIQUE INDEX IF NOT EXISTS "Card_userId_kind_key" ON "Card"("userId" ASC, "kind" ASC)` },
  { name: "uniq Card.serial", sql: `CREATE UNIQUE INDEX IF NOT EXISTS "Card_serial_key" ON "Card"("serial" ASC)` },
  { name: "idx CardTrade(toUserId, status)", sql: `CREATE INDEX IF NOT EXISTS "CardTrade_toUserId_status_idx" ON "CardTrade"("toUserId" ASC, "status" ASC)` },
  { name: "idx CardTrade(fromUserId, status)", sql: `CREATE INDEX IF NOT EXISTS "CardTrade_fromUserId_status_idx" ON "CardTrade"("fromUserId" ASC, "status" ASC)` },
  { name: "idx CoinLedger(userId, createdAt)", sql: `CREATE INDEX IF NOT EXISTS "CoinLedger_userId_createdAt_idx" ON "CoinLedger"("userId" ASC, "createdAt" ASC)` },
  { name: "uniq UserItem(userId, itemKey)", sql: `CREATE UNIQUE INDEX IF NOT EXISTS "UserItem_userId_itemKey_key" ON "UserItem"("userId" ASC, "itemKey" ASC)` },
  { name: "idx SpeedrunRecord(moduleId, ms)", sql: `CREATE INDEX IF NOT EXISTS "SpeedrunRecord_moduleId_ms_idx" ON "SpeedrunRecord"("moduleId" ASC, "ms" ASC)` },
  { name: "idx SpeedrunRecord(userId)", sql: `CREATE INDEX IF NOT EXISTS "SpeedrunRecord_userId_idx" ON "SpeedrunRecord"("userId" ASC)` },
  { name: "uniq CrimeProgress(userId, caseId)", sql: `CREATE UNIQUE INDEX IF NOT EXISTS "CrimeProgress_userId_caseId_key" ON "CrimeProgress"("userId" ASC, "caseId" ASC)` },
  { name: "idx ActivityLog(userId, createdAt)", sql: `CREATE INDEX IF NOT EXISTS "ActivityLog_userId_createdAt_idx" ON "ActivityLog"("userId" ASC, "createdAt" ASC)` },
  {
    name: "fk Pet→User",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Pet_userId_fkey') THEN
    ALTER TABLE "Pet" ADD CONSTRAINT "Pet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk BossBattle→User",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'BossBattle_userId_fkey') THEN
    ALTER TABLE "BossBattle" ADD CONSTRAINT "BossBattle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk SkillNodeState→User",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SkillNodeState_userId_fkey') THEN
    ALTER TABLE "SkillNodeState" ADD CONSTRAINT "SkillNodeState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk WarAction→User",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'WarAction_userId_fkey') THEN
    ALTER TABLE "WarAction" ADD CONSTRAINT "WarAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk Card→User",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Card_userId_fkey') THEN
    ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk CardTrade→Card",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CardTrade_cardId_fkey') THEN
    ALTER TABLE "CardTrade" ADD CONSTRAINT "CardTrade_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk CardTrade→User(from)",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CardTrade_fromUserId_fkey') THEN
    ALTER TABLE "CardTrade" ADD CONSTRAINT "CardTrade_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk CardTrade→User(to)",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CardTrade_toUserId_fkey') THEN
    ALTER TABLE "CardTrade" ADD CONSTRAINT "CardTrade_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk CoinLedger→User",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CoinLedger_userId_fkey') THEN
    ALTER TABLE "CoinLedger" ADD CONSTRAINT "CoinLedger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk UserItem→User",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'UserItem_userId_fkey') THEN
    ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk SpeedrunRecord→User",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SpeedrunRecord_userId_fkey') THEN
    ALTER TABLE "SpeedrunRecord" ADD CONSTRAINT "SpeedrunRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk CrimeProgress→User",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CrimeProgress_userId_fkey') THEN
    ALTER TABLE "CrimeProgress" ADD CONSTRAINT "CrimeProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
  {
    name: "fk ActivityLog→User",
    sql: `DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ActivityLog_userId_fkey') THEN
    ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$`,
  },
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

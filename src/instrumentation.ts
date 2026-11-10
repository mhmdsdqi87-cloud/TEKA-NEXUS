// TEKA NEXUS — Next.js instrumentation (server cold-start hook).
//
// WHY THIS EXISTS: the sandbox/deploy pipeline holds no Supabase migration
// credentials (DIRECT_URL was lost — see /api/bootstrap), yet git push
// auto-deploys. Schema additions must therefore ride WITH the deploy: on
// every serverless cold start we apply a MINIMAL, ADDITIVE-ONLY, idempotent
// DDL list (ADD COLUMN IF NOT EXISTS / CREATE TABLE IF NOT EXISTS). Each
// statement is a no-op after the first success and costs one round-trip.
//
// SAFETY RULES (enforced by review, keep them):
// - additive only: never DROP, never ALTER TYPE, never rename
// - no user input, no interpolation — static SQL strings
// - every statement wrapped; a failed statement logs and moves on
// - Postgres only: local dev runs the SQLite mirror (schema.local.prisma),
//   where the schema is pushed by `bun run db:push` instead.

export async function register() {
  const url = process.env.DATABASE_URL ?? "";
  if (!url.startsWith("postgres") && !url.startsWith("postgresql")) return;
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  try {
    const { db } = await import("@/lib/db");
    // NEXUS 2.0 Phase 1 — Live Universe: self-declared country (ISO 3166-1
    // alpha-2). Empty string = undeclared; no guessing, no backfill.
    await db.$executeRawUnsafe(
      `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "country" TEXT NOT NULL DEFAULT ''`,
    );
  } catch (err) {
    console.error(
      "[teka-boot] schema guard failed:",
      err instanceof Error ? err.message : err,
    );
  }
}

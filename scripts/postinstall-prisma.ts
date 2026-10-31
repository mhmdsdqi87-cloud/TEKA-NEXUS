#!/usr/bin/env bun
// TEKA NEXUS — smart prisma client bootstrap (runs on every `bun install`).
//
// WHY THIS EXISTS:
//   The repo accidentally shipped `prisma/schema.prisma` with `provider =
//   "sqlite"` (a local-dev switch from scripts/db-switch.ts). On Vercel that
//   generated a SQLite client against a Postgres DATABASE_URL → every DB
//   query 500'd → login/signup died in production while the static shell
//   kept working (see commit f735007).
//
// NEW CONTRACT (this script enforces it):
//   - prisma/schema.prisma        = PRODUCTION, PostgreSQL (Supabase). NEVER
//     switch it to sqlite again.
//   - prisma/schema.local.prisma  = auto-generated SQLite mirror used by the
//     local sandbox (regenerated here on every install → zero drift).
//
// Mode detection:
//   - .env DATABASE_URL starts with "file:"  → LOCAL  → mirror + generate sqlite
//   - anything else (Vercel/CI, postgres URL) → REMOTE → generate postgres
//   - missing env entirely                    → REMOTE (safe default)

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dir, "..");
const MAIN_SCHEMA = resolve(ROOT, "prisma/schema.prisma");
const LOCAL_SCHEMA = resolve(ROOT, "prisma/schema.local.prisma");

function readLocalDatabaseUrl(): string | undefined {
  // bun already loads .env into process.env, but be defensive for npm/pnpm.
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const envPath = resolve(ROOT, ".env");
  if (!existsSync(envPath)) return undefined;
  const line = readFileSync(envPath, "utf8")
    .split("\n")
    .find((l) => l.trim().startsWith("DATABASE_URL="));
  return line?.split("=").slice(1).join("=").trim();
}

function buildSqliteMirror(src: string): string {
  let out = src.replace(
    'provider  = "postgresql"',
    'provider  = "sqlite"'
  );
  // Drop the directUrl line (no DIRECT_URL in the sandbox env).
  out = out.replace(/^\s*directUrl\s*=\s*env\("DIRECT_URL"\)\s*$/gm, "");
  // Stamp the header so nobody mistakes this file for the canonical schema.
  out = out.replace(
    "// TEKA NEXUS — Database Schema",
    "// TEKA NEXUS — Database Schema\n// ⚙️ AUTO-GENERATED SQLite mirror of schema.prisma (scripts/postinstall-prisma.ts).\n// ⚠️ DO NOT EDIT — edit prisma/schema.prisma (PostgreSQL, canonical) instead."
  );
  return out;
}

async function run(cmd: string[]) {
  const proc = Bun.spawn(cmd, { cwd: ROOT, stdout: "inherit", stderr: "inherit" });
  const code = await proc.exited;
  if (code !== 0) {
    console.error(`✗ command failed (${code}): ${cmd.join(" ")}`);
    process.exit(code);
  }
}

const url = readLocalDatabaseUrl();
const isLocal = !!url && url.startsWith("file:");

if (isLocal) {
  console.log("▸ postinstall: LOCAL sandbox detected (DATABASE_URL=file:…) → SQLite mirror");
  const src = readFileSync(MAIN_SCHEMA, "utf8");
  writeFileSync(LOCAL_SCHEMA, buildSqliteMirror(src));
  await run([
    "bunx", "prisma", "generate",
    "--schema", "prisma/schema.local.prisma",
  ]);
  console.log("✓ prisma client generated from schema.local.prisma (SQLite)");
} else {
  console.log("▸ postinstall: REMOTE/CI detected → canonical PostgreSQL schema");
  await run(["bunx", "prisma", "generate"]);
  console.log("✓ prisma client generated from schema.prisma (PostgreSQL)");
}

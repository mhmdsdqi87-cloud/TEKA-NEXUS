#!/usr/bin/env bun
// TEKA NEXUS — Prisma provider switcher (SQLite ⇄ PostgreSQL).
// Usage:
//   bun run db:switch:postgres    # point Prisma at Supabase Postgres
//   bun run db:switch:sqlite      # switch back to local SQLite
// After switching run:  bunx prisma db push   (creates/mirrors the schema)

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const SCHEMA = resolve(import.meta.dir, "../prisma/schema.prisma");
const mode = process.argv[2];

if (mode !== "postgres" && mode !== "sqlite") {
  console.error("Usage: bun scripts/db-switch.ts <postgres|sqlite>");
  process.exit(1);
}

let src = readFileSync(SCHEMA, "utf8");
if (mode === "postgres") {
  if (!src.includes('provider = "sqlite"')) {
    console.log("schema.prisma is already on postgres — nothing to do.");
    process.exit(0);
  }
  src = src.replace('provider = "sqlite"', 'provider = "postgresql"');
  writeFileSync(SCHEMA, src);
  console.log('✅ provider = "postgresql"\nNext steps:');
  console.log("  1. Put your REAL Supabase URI (with the real password) into .env as DATABASE_URL");
  console.log("  2. bunx prisma db push");
  console.log("  3. Restart the app — done. All TEKA features run on Supabase Postgres.");
} else {
  if (!src.includes('provider = "postgresql"')) {
    console.log("schema.prisma is already on sqlite — nothing to do.");
    process.exit(0);
  }
  src = src.replace('provider = "postgresql"', 'provider = "sqlite"');
  writeFileSync(SCHEMA, src);
  console.log('✅ provider = "sqlite"\nNext: bunx prisma db push  (uses the local file DB from .env)');
}

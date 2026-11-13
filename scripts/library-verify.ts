#!/usr/bin/env bun
// TEKA NEXUS — NEXUS LIBRARY verification pipeline.
//
// For every seeded entry: write its published `code` as impl.ts and its
// `demo` as demo.ts into an isolated temp dir, execute the demo with bun,
// and compare stdout with `expectedOutput` (line-trimmed exact match).
//
//   pass  -> status = "verified", verifiedAt = now, verifier = pipeline id
//   fail  -> status = "draft" (demoted if it had been verified), with the
//            mismatch logged for the maintainer
//
// This is the only path to the "verified" label: untested code never gets it.

import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";
import { LIBRARY_ENTRIES } from "./library-entries";

const db = new PrismaClient();
const VERIFIER_ID = "library-verify.ts@1";
const TIMEOUT_MS = 20_000;

function normalize(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .trim();
}

async function runDemo(code: string, demo: string): Promise<{ out: string; ok: boolean; err: string }> {
  const dir = await mkdtemp(join(tmpdir(), "nexus-verify-"));
  try {
    await writeFile(join(dir, "impl.ts"), code, "utf8");
    await writeFile(join(dir, "demo.ts"), demo, "utf8");
    const proc = Bun.spawn(["bun", "run", join(dir, "demo.ts")], {
      cwd: dir,
      stdout: "pipe",
      stderr: "pipe",
    });
    const timer = setTimeout(() => proc.kill(), TIMEOUT_MS);
    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();
    const exitCode = await proc.exited;
    clearTimeout(timer);
    return { out: normalize(stdout), ok: exitCode === 0, err: stderr.trim() };
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

async function main() {
  const bySlug = new Map(LIBRARY_ENTRIES.map((e) => [e.slug, e]));
  const rows = await db.libraryEntry.findMany();
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const row of rows) {
    const seed = bySlug.get(row.slug);
    if (!seed) {
      console.log(`- ${row.slug}: not in seeds (left as-is)`);
      continue;
    }
    if (!seed.demo.trim() || !seed.expectedOutput.trim()) {
      console.log(`? ${row.slug}: no runnable demo — stays "${row.status}"`);
      skipped++;
      continue;
    }
    const r = await runDemo(seed.code, seed.demo);
    const match = r.ok && r.out === normalize(seed.expectedOutput);
    if (match) {
      await db.libraryEntry.update({
        where: { id: row.id },
        data: { status: "verified", verifiedAt: new Date(), verifier: VERIFIER_ID },
      });
      passed++;
      console.log(`PASS ${row.slug} (${row.status} -> verified)`);
    } else {
      await db.libraryEntry.update({
        where: { id: row.id },
        data: { status: "draft", verifiedAt: null, verifier: "" },
      });
      failed++;
      console.log(`FAIL ${row.slug}`);
      console.log(`  exit: ${r.ok ? 0 : "error"}${r.err ? " | stderr: " + r.err.slice(0, 300) : ""}`);
      console.log("  expected:\n" + normalize(seed.expectedOutput).split("\n").map((l) => "    | " + l).join("\n"));
      console.log("  actual:\n" + r.out.split("\n").map((l) => "    | " + l).join("\n"));
    }
  }
  console.log(`\npipeline: ${passed} passed, ${failed} failed, ${skipped} skipped of ${rows.length}`);
  if (failed > 0) process.exit(1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

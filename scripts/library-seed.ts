#!/usr/bin/env bun
// TEKA NEXUS — seed the NEXUS LIBRARY from scripts/library-entries.ts.
// Idempotent: upserts by slug. Status starts as "draft"; only
// scripts/library-verify.ts promotes entries to "verified".

import { PrismaClient } from "@prisma/client";
import { LIBRARY_ENTRIES } from "./library-entries";

const db = new PrismaClient();
const SOURCE_AUTHOR = "TEKA NEXUS";
const SOURCE_URL = "https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS";

async function main() {
  let created = 0;
  let updated = 0;
  for (const e of LIBRARY_ENTRIES) {
    const data = {
      slug: e.slug,
      title: e.title,
      category: e.category,
      summary: e.summary,
      language: e.language,
      framework: e.framework,
      difficulty: e.difficulty,
      problem: e.problem,
      approach: e.approach,
      code: e.code,
      demo: e.demo,
      expectedOutput: e.expectedOutput,
      dependencies: JSON.stringify(e.dependencies),
      install: e.install,
      usage: e.usage,
      securityNotes: e.securityNotes,
      performanceNotes: e.performanceNotes,
      limitations: e.limitations,
      version: e.version,
      license: e.license,
      tags: JSON.stringify(e.tags),
      related: JSON.stringify(e.related),
      sourceAuthor: SOURCE_AUTHOR,
      sourceUrl: SOURCE_URL,
      // seeding does NOT touch status/verifiedAt/verifier — those belong to
      // the verification pipeline (or a human reviewer).
    };
    const existing = await db.libraryEntry.findUnique({ where: { slug: e.slug } });
    if (existing) {
      await db.libraryEntry.update({ where: { slug: e.slug }, data });
      updated++;
    } else {
      await db.libraryEntry.create({ data });
      created++;
    }
    console.log(e.status ? "" : "", "seeded:", e.slug);
  }
  console.log(`done — created ${created}, updated ${updated}, total ${LIBRARY_ENTRIES.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

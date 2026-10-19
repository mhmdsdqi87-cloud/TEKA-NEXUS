// GET /api/skills — the 12 profile skills taxonomy.

import { SKILLS } from "@/lib/constants";
import { handle, ok } from "@/lib/server";

export async function GET() {
  return handle(async () => {
    return ok({ skills: SKILLS.map((s) => ({ slug: s.slug, name: s.name })) });
  });
}

// TEKA NEXUS — POST /api/projects/[slug]/save
// Toggle a save/bookmark on a project visible to the viewer.

import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, handle, requireUser, requireProjectAccess } from "@/lib/server";

export const dynamic = "force-dynamic";

export async function POST(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();

    const project = await requireProjectAccess(slug, user.id);

    const key = { userId_projectId: { userId: user.id, projectId: project.id } };
    const existing = await db.projectSave.findUnique({ where: key });

    let saved: boolean;
    if (existing) {
      await db.projectSave.delete({ where: key });
      saved = false;
    } else {
      await db.projectSave.create({ data: { userId: user.id, projectId: project.id } });
      saved = true;
    }

    return ok({ saved });
  });
}

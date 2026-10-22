// TEKA NEXUS — POST /api/projects/[slug]/like
// Toggle a like on a project visible to the viewer.

import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, handle, requireUser, requireProjectAccess, awardContribution } from "@/lib/server";

export const dynamic = "force-dynamic";

export async function POST(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();

    const project = await requireProjectAccess(slug, user.id);

    const key = { userId_projectId: { userId: user.id, projectId: project.id } };
    const existing = await db.projectLike.findUnique({ where: key });

    let liked: boolean;
    if (existing) {
      await db.projectLike.delete({ where: key });
      liked = false;
    } else {
      await db.projectLike.create({ data: { userId: user.id, projectId: project.id } });
      liked = true;
      // Social XP (Live Pulse): +4 for the like, idempotent per (user, project)
      // — unliking and re-liking never re-awards.
      await awardContribution({
        userId: user.id,
        projectId: project.id,
        eventType: "LIKE_GIVEN",
        sourceType: "project",
        sourceId: project.id,
      });
    }

    const likeCount = await db.projectLike.count({ where: { projectId: project.id } });
    return ok({ liked, likeCount });
  });
}

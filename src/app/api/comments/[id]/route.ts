// TEKA NEXUS — DELETE /api/comments/[id]
// Soft-delete a project comment: allowed for the author or the project owner/admin.

import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, handle, HttpError, requireUser, getProjectRole, canManageProject } from "@/lib/server";

export const dynamic = "force-dynamic";

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await ctx.params;
    const user = await requireUser();

    const comment = await db.projectComment.findUnique({ where: { id } });
    if (!comment) throw new HttpError("Comment not found.", 404);

    const isAuthor = comment.authorId === user.id;
    if (!isAuthor) {
      const role = await getProjectRole(comment.projectId, user.id);
      if (!canManageProject(role)) {
        throw new HttpError("You do not have permission to delete this comment.", 403);
      }
    }

    await db.projectComment.update({
      where: { id: comment.id },
      data: { deletedAt: new Date(), body: "[deleted]" },
    });

    return ok({ ok: true });
  });
}

// POST /api/users/[username]/block — toggle blocking a user.

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireUser, handle, HttpError, ok } from "@/lib/server";

export async function POST(req: NextRequest, ctx: { params: Promise<{ username: string }> }) {
  return handle(async () => {
    const me = await requireUser();
    const { username: rawUsername } = await ctx.params;
    const username = rawUsername.trim().toLowerCase();

    const target = await db.user.findUnique({ where: { username }, select: { id: true } });
    if (!target) throw new HttpError("User not found.", 404);
    if (target.id === me.id) throw new HttpError("You cannot block yourself.", 400);

    const key = { blockerId_blockedId: { blockerId: me.id, blockedId: target.id } };
    const existing = await db.userBlock.findUnique({ where: key });

    let blocked: boolean;
    if (existing) {
      await db.userBlock.delete({ where: key });
      blocked = false;
    } else {
      // Blocking removes existing follow rows in both directions.
      await db.$transaction([
        db.userBlock.create({ data: { blockerId: me.id, blockedId: target.id } }),
        db.follow.deleteMany({
          where: {
            OR: [
              { followerId: me.id, followingId: target.id },
              { followerId: target.id, followingId: me.id },
            ],
          },
        }),
      ]);
      blocked = true;
    }

    return ok({ blocked });
  });
}

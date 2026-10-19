// POST /api/users/[username]/follow — toggle following a user.

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireUser, handle, HttpError, ok, notify } from "@/lib/server";

export async function POST(req: NextRequest, ctx: { params: Promise<{ username: string }> }) {
  return handle(async () => {
    const me = await requireUser();
    const { username: rawUsername } = await ctx.params;
    const username = rawUsername.trim().toLowerCase();

    const target = await db.user.findUnique({ where: { username }, select: { id: true } });
    if (!target) throw new HttpError("User not found.", 404);
    if (target.id === me.id) throw new HttpError("You cannot follow yourself.", 400);

    // Blocked in either direction makes the action unavailable.
    const block = await db.userBlock.findFirst({
      where: {
        OR: [
          { blockerId: me.id, blockedId: target.id },
          { blockerId: target.id, blockedId: me.id },
        ],
      },
      select: { blockerId: true },
    });
    if (block) throw new HttpError("This action isn't available.", 403);

    const key = { followerId_followingId: { followerId: me.id, followingId: target.id } };
    const existing = await db.follow.findUnique({ where: key });

    let following: boolean;
    if (existing) {
      await db.follow.delete({ where: key });
      following = false;
    } else {
      await db.follow.create({ data: { followerId: me.id, followingId: target.id } });
      following = true;
      await notify({
        recipientId: target.id,
        actorId: me.id,
        type: "NEW_FOLLOWER",
        entityType: "user",
        entityId: me.id,
        payload: { username: me.username, displayName: me.displayName },
      });
    }

    const followerCount = await db.follow.count({ where: { followingId: target.id } });
    return ok({ following, followerCount });
  });
}

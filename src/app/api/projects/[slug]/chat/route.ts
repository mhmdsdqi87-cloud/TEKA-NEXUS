// TEKA NEXUS — GET/POST /api/projects/[slug]/chat  (Live Pulse, Task pulse-1)
// Live per-project team chat. GET is pollable with an `?after=<iso>` cursor
// (delta-only, 3s client loop). POST sends a ≤500-char message, rate-limited
// to 10 messages/minute, and awards +2 XP (idempotent per message id).
// Read access follows project visibility; posting requires sign-in.

import type { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { ok, handle, parseBody, requireUser, requireProjectAccess, awardContribution } from "@/lib/server";

export const dynamic = "force-dynamic";

const DEFAULT_TAKE = 80;
const BODY_MAX = 500;
const RATE_LIMIT = 10; // messages per minute
const RATE_WINDOW_MS = 60 * 1000;

const AUTHOR_FIELDS = {
  id: true,
  username: true,
  displayName: true,
  avatarColor: true,
  avatarUrl: true,
  xp: true,
} as const;

function messageDTO(m: {
  id: string;
  body: string;
  createdAt: Date;
  user: { id: string; username: string; displayName: string; avatarColor: string; avatarUrl: string | null; xp: number };
}) {
  return {
    id: m.id,
    body: m.body,
    createdAt: m.createdAt.toISOString(),
    user: m.user,
  };
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const viewer = await getAuthUser();
    const project = await requireProjectAccess(slug, viewer?.id);

    const afterParam = req.nextUrl.searchParams.get("after");
    let after: Date | null = null;
    if (afterParam) {
      const parsed = new Date(afterParam);
      if (!Number.isNaN(parsed.getTime())) after = parsed;
    }

    const rows = after
      ? await db.chatMessage.findMany({
          where: { projectId: project.id, createdAt: { gt: after } },
          orderBy: { createdAt: "asc" },
          take: DEFAULT_TAKE,
          include: { user: { select: AUTHOR_FIELDS } },
        })
      : (
          await db.chatMessage.findMany({
            where: { projectId: project.id },
            orderBy: { createdAt: "desc" },
            take: DEFAULT_TAKE,
            include: { user: { select: AUTHOR_FIELDS } },
          })
        ).reverse();

    return ok({
      messages: rows.map(messageDTO),
      viewerId: viewer?.id ?? null,
    });
  });
}

const sendSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "پیام نمی‌تواند خالی باشد.")
    .max(BODY_MAX, `پیام حداکثر می‌تواند ${BODY_MAX} نویسه باشد.`),
});

export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const me = await requireUser();
    const project = await requireProjectAccess(slug, me.id);

    const { body } = await parseBody(req, sendSchema);
    const trimmed = body.trim();

    // Light anti-flood: max RATE_LIMIT messages per minute per user.
    const recent = await db.chatMessage.count({
      where: { userId: me.id, createdAt: { gte: new Date(Date.now() - RATE_WINDOW_MS) } },
    });
    if (recent >= RATE_LIMIT) {
      return ok({ error: "rate_limited" }, 429);
    }

    const message = await db.chatMessage.create({
      data: { projectId: project.id, userId: me.id, body: trimmed },
      include: { user: { select: AUTHOR_FIELDS } },
    });

    // Social XP (Live Pulse): +2 per message, idempotent per message id.
    await awardContribution({
      userId: me.id,
      projectId: project.id,
      eventType: "CHAT_MESSAGE",
      sourceType: "chat",
      sourceId: message.id,
    });

    return ok({ message: messageDTO(message) }, 201);
  });
}

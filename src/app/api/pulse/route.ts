// TEKA NEXUS — GET /api/pulse  (Live Pulse, Task pulse-1)
// The live community feed powering the Nexus Terminal: latest social events
// (joins, launches, likes, comments, chat messages, project updates) merged
// into one chronological stream + community counters. Public read; polling
// client (7s) dedupes by event id.

import { db } from "@/lib/db";
import { ok, handle } from "@/lib/server";

export const dynamic = "force-dynamic";

const PER_SOURCE = 12;
const MAX_EVENTS = 40;

type PulseEvent = {
  id: string;
  type: "join" | "project" | "like" | "comment" | "chat" | "update";
  at: string;
  actor: string; // display name
  actorColor: string;
  target: string; // project / person name
  slug?: string; // project slug for navigation
  preview?: string; // comment/chat snippet
};

export async function GET() {
  return handle(async () => {
    const [users, projects, likes, comments, chats, updates, stats] = await Promise.all([
      db.user.findMany({
        orderBy: { createdAt: "desc" },
        take: PER_SOURCE,
        select: { id: true, username: true, displayName: true, avatarColor: true, createdAt: true },
      }),
      db.project.findMany({
        where: { visibility: "PUBLIC" },
        orderBy: { createdAt: "desc" },
        take: PER_SOURCE,
        select: {
          id: true,
          name: true,
          slug: true,
          createdAt: true,
          owner: { select: { displayName: true, avatarColor: true } },
        },
      }),
      db.projectLike.findMany({
        orderBy: { createdAt: "desc" },
        take: PER_SOURCE,
        select: {
          userId: true,
          createdAt: true,
          user: { select: { displayName: true, avatarColor: true } },
          project: { select: { name: true, slug: true } },
        },
      }),
      db.projectComment.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: PER_SOURCE,
        select: {
          id: true,
          body: true,
          createdAt: true,
          author: { select: { displayName: true, avatarColor: true } },
          project: { select: { name: true, slug: true } },
        },
      }),
      db.chatMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: PER_SOURCE,
        select: {
          id: true,
          body: true,
          createdAt: true,
          user: { select: { displayName: true, avatarColor: true } },
          project: { select: { name: true, slug: true } },
        },
      }),
      db.projectUpdate.findMany({
        orderBy: { createdAt: "desc" },
        take: PER_SOURCE,
        select: {
          id: true,
          title: true,
          createdAt: true,
          author: { select: { displayName: true, avatarColor: true } },
          project: { select: { name: true, slug: true } },
        },
      }),
      Promise.all([
        db.user.count(),
        db.project.count({ where: { visibility: "PUBLIC" } }),
        db.projectLike.count(),
        db.projectComment.count({ where: { deletedAt: null } }),
        db.chatMessage.count(),
      ]),
    ]);

    const events: PulseEvent[] = [];

    for (const u of users) {
      events.push({
        id: `join:${u.id}`,
        type: "join",
        at: u.createdAt.toISOString(),
        actor: u.displayName,
        actorColor: u.avatarColor,
        target: "TEKA NEXUS",
      });
    }
    for (const p of projects) {
      events.push({
        id: `project:${p.id}`,
        type: "project",
        at: p.createdAt.toISOString(),
        actor: p.owner.displayName,
        actorColor: p.owner.avatarColor,
        target: p.name,
        slug: p.slug,
      });
    }

    for (const l of likes) {
      events.push({
        id: `like:${l.userId}:${l.project.slug}`,
        type: "like",
        at: l.createdAt.toISOString(),
        actor: l.user.displayName,
        actorColor: l.user.avatarColor,
        target: l.project.name,
        slug: l.project.slug,
      });
    }
    for (const c of comments) {
      events.push({
        id: `comment:${c.id}`,
        type: "comment",
        at: c.createdAt.toISOString(),
        actor: c.author?.displayName ?? "کاربر حذف‌شده",
        actorColor: c.author?.avatarColor ?? "cyan",
        target: c.project.name,
        slug: c.project.slug,
        preview: c.body.length > 60 ? `${c.body.slice(0, 60)}…` : c.body,
      });
    }
    for (const m of chats) {
      events.push({
        id: `chat:${m.id}`,
        type: "chat",
        at: m.createdAt.toISOString(),
        actor: m.user.displayName,
        actorColor: m.user.avatarColor,
        target: m.project.name,
        slug: m.project.slug,
        preview: m.body.length > 60 ? `${m.body.slice(0, 60)}…` : m.body,
      });
    }
    for (const u of updates) {
      events.push({
        id: `update:${u.id}`,
        type: "update",
        at: u.createdAt.toISOString(),
        actor: u.author.displayName,
        actorColor: u.author.avatarColor,
        target: u.project.name,
        slug: u.project.slug,
        preview: u.title,
      });
    }

    events.sort((a, b) => (a.at < b.at ? 1 : -1));

    const [userCount, projectCount, likeCount, commentCount, chatCount] = stats;

    return ok({
      events: events.slice(0, MAX_EVENTS),
      stats: {
        users: userCount,
        projects: projectCount,
        likes: likeCount,
        comments: commentCount,
        chats: chatCount,
        generatedAt: new Date().toISOString(),
      },
    });
  });
}

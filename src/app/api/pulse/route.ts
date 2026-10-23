// TEKA NEXUS — GET /api/pulse  (Live Pulse v3, Task 13 + ws-1)
// The live community feed powering the Nexus Terminal + Activity Feed:
// latest social events (joins, launches, likes, comments, chat messages,
// project updates, follows, saves, member joins, completed tasks, workspace
// file activity) merged into one chronological stream + community counters.
// Public read; polling clients dedupe by event id.

import { db } from "@/lib/db";
import { ok, handle } from "@/lib/server";

export const dynamic = "force-dynamic";

const PER_SOURCE = 12;
const MAX_EVENTS = 48;

export type PulseEventType =
  | "join"
  | "project"
  | "like"
  | "comment"
  | "chat"
  | "update"
  | "follow"
  | "save"
  | "member"
  | "task"
  | "file";

type PulseEvent = {
  id: string;
  type: PulseEventType;
  at: string;
  actor: string; // display name
  actorColor: string;
  target: string; // project / person name
  slug?: string; // project slug for navigation
  username?: string; // user slug for navigation (follows)
  preview?: string; // comment/chat snippet
};

export async function GET() {
  return handle(async () => {
    const [users, projects, likes, comments, chats, updates, follows, saves, members, tasks, wsFiles, stats] =
      await Promise.all([
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
        db.follow.findMany({
          orderBy: { createdAt: "desc" },
          take: PER_SOURCE,
          select: {
            createdAt: true,
            follower: { select: { displayName: true, avatarColor: true, username: true } },
            following: { select: { displayName: true, username: true } },
          },
        }),
        db.projectSave.findMany({
          orderBy: { createdAt: "desc" },
          take: PER_SOURCE,
          select: {
            createdAt: true,
            user: { select: { displayName: true, avatarColor: true } },
            project: { select: { name: true, slug: true } },
          },
        }),
        db.projectMember.findMany({
          orderBy: { joinedAt: "desc" },
          take: PER_SOURCE,
          select: {
            joinedAt: true,
            user: { select: { displayName: true, avatarColor: true } },
            project: { select: { name: true, slug: true } },
          },
        }),
        db.task.findMany({
          where: { completedAt: { not: null } },
          orderBy: { completedAt: "desc" },
          take: PER_SOURCE,
          select: {
            completedAt: true,
            title: true,
            project: { select: { name: true, slug: true } },
            assignee: { select: { displayName: true, avatarColor: true } },
            creator: { select: { displayName: true, avatarColor: true } },
          },
        }),
        db.workspaceFile.findMany({
          where: { isFolder: false, project: { visibility: "PUBLIC" } },
          orderBy: { updatedAt: "desc" },
          take: PER_SOURCE,
          select: {
            name: true,
            updatedAt: true,
            updatedBy: { select: { displayName: true, avatarColor: true } },
            createdBy: { select: { displayName: true, avatarColor: true } },
            project: { select: { name: true, slug: true } },
          },
        }),
        Promise.all([
          db.user.count(),
          db.project.count({ where: { visibility: "PUBLIC" } }),
          db.projectLike.count(),
          db.projectComment.count({ where: { deletedAt: null } }),
          db.chatMessage.count(),
          db.follow.count(),
          db.projectSave.count(),
          db.projectMember.count(),
          db.workspaceFile.count({ where: { isFolder: false } }),
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
        username: u.username,
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
    for (const f of follows) {
      events.push({
        id: `follow:${f.follower.username}:${f.following.username}`,
        type: "follow",
        at: f.createdAt.toISOString(),
        actor: f.follower.displayName,
        actorColor: f.follower.avatarColor,
        target: f.following.displayName,
        username: f.following.username,
      });
    }
    for (const s of saves) {
      events.push({
        id: `save:${s.user.displayName}:${s.project.slug}`,
        type: "save",
        at: s.createdAt.toISOString(),
        actor: s.user.displayName,
        actorColor: s.user.avatarColor,
        target: s.project.name,
        slug: s.project.slug,
      });
    }
    for (const m of members) {
      events.push({
        id: `member:${m.user.displayName}:${m.project.slug}`,
        type: "member",
        at: m.joinedAt.toISOString(),
        actor: m.user.displayName,
        actorColor: m.user.avatarColor,
        target: m.project.name,
        slug: m.project.slug,
      });
    }
    for (const t of tasks) {
      if (!t.completedAt) continue;
      const who = t.assignee ?? t.creator;
      events.push({
        id: `task:${t.completedAt.toISOString()}:${t.title}`,
        type: "task",
        at: t.completedAt.toISOString(),
        actor: who.displayName,
        actorColor: who.avatarColor,
        target: t.project.name,
        slug: t.project.slug,
        preview: t.title.length > 60 ? `${t.title.slice(0, 60)}…` : t.title,
      });
    }

    for (const w of wsFiles) {
      const who = w.updatedBy ?? w.createdBy;
      if (!who) continue;
      events.push({
        id: `file:${w.updatedAt.toISOString()}:${w.project.slug}:${w.name}`,
        type: "file",
        at: w.updatedAt.toISOString(),
        actor: who.displayName,
        actorColor: who.avatarColor,
        target: w.project.name,
        slug: w.project.slug,
        preview: w.name,
      });
    }

    events.sort((a, b) => (a.at < b.at ? 1 : -1));

    const [userCount, projectCount, likeCount, commentCount, chatCount, followCount, saveCount, memberCount, fileCount] =
      stats;

    return ok({
      events: events.slice(0, MAX_EVENTS),
      stats: {
        users: userCount,
        projects: projectCount,
        likes: likeCount,
        comments: commentCount,
        chats: chatCount,
        follows: followCount,
        saves: saveCount,
        members: memberCount,
        files: fileCount,
        generatedAt: new Date().toISOString(),
      },
    });
  });
}

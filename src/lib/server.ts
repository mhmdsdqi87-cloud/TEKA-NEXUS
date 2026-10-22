// TEKA NEXUS — Shared server helpers for API routes.

import { NextResponse } from "next/server";
import { ZodError, ZodSchema } from "zod";
import { db } from "@/lib/db";
import { getAuthUser, AuthUser } from "@/lib/auth";
import { XP_RULES } from "@/lib/constants";

export function ok<T>(data: T, init?: number) {
  return NextResponse.json(data as any, { status: init ?? 200 });
}

export function fail(message: string, status = 400, extra?: Record<string, unknown>) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

export class HttpError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

// Wrap a handler with unified error handling.
export function handle(fn: () => Promise<Response>): Promise<Response> {
  return fn().catch((err) => {
    if (err instanceof HttpError) return fail(err.message, err.status);
    if (err instanceof ZodError) {
      const first = err.issues[0];
      return fail(first ? `${first.path.join(".") || "input"}: ${first.message}` : "Invalid input", 422);
    }
    console.error("[api]", err);
    return fail("Something went wrong on our side. Please try again.", 500);
  });
}

export async function parseBody<T>(req: Request, schema: ZodSchema<T>): Promise<T> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    throw new HttpError("Request body must be valid JSON.", 400);
  }
  return schema.parse(raw);
}

// Require an authenticated user or throw 401.
export async function requireUser(): Promise<AuthUser> {
  const user = await getAuthUser();
  if (!user) throw new HttpError("You need to sign in to do that.", 401);
  return user;
}

// Parse a trailing [id] param from a route context.
export async function param(ctx: { params: Promise<Record<string, string>> }, key: string): Promise<string> {
  const p = await ctx.params;
  return p[key];
}

// ─── Project authorization ───────────────────────────────────

export type ProjectRole = "OWNER" | "ADMIN" | "CONTRIBUTOR" | "VIEWER" | null;

export async function getProjectRole(projectId: string, userId?: string): Promise<ProjectRole> {
  if (!userId) return null;
  const m = await db.projectMember.findUnique({
    where: { projectId_userId: { projectId, userId } },
  });
  return (m?.role as ProjectRole) ?? null;
}

export function canManageProject(role: ProjectRole): boolean {
  return role === "OWNER" || role === "ADMIN";
}

export function canContribute(role: ProjectRole): boolean {
  return role === "OWNER" || role === "ADMIN" || role === "CONTRIBUTOR";
}

export async function requireProjectAccess(slug: string, userId?: string, needVisibility = true) {
  const project = await db.project.findUnique({ where: { slug } });
  if (!project) throw new HttpError("Project not found.", 404);
  if (needVisibility && project.visibility === "PRIVATE") {
    const role = await getProjectRole(project.id, userId);
    if (!role) throw new HttpError("This project is private.", 404); // 404, not 403: don't leak existence
  }
  return project;
}

// ─── Verified reputation (spec §12) ──────────────────────────
// Idempotent: unique constraint on (userId, eventType, sourceType, sourceId).

export async function awardContribution(opts: {
  userId: string;
  projectId?: string;
  eventType: keyof typeof XP_RULES;
  sourceType: string;
  sourceId: string;
  /** Optional per-call override (e.g. rotating weekly challenge rewards). */
  xpOverride?: number;
  reputationOverride?: number;
}) {
  const rule = XP_RULES[opts.eventType];
  const xp = opts.xpOverride ?? rule.xp;
  const reputation = opts.reputationOverride ?? rule.reputation;
  try {
    await db.contributionEvent.create({
      data: {
        userId: opts.userId,
        projectId: opts.projectId ?? null,
        eventType: opts.eventType,
        sourceType: opts.sourceType,
        sourceId: opts.sourceId,
        xp,
        reputation,
      },
    });
    await db.user.update({
      where: { id: opts.userId },
      data: { xp: { increment: xp }, reputation: { increment: reputation } },
    });
  } catch {
    // Duplicate award — unique constraint hit. Idempotent, safe to ignore.
  }
}

export async function logActivity(opts: {
  projectId: string;
  actorId?: string;
  eventType: string;
  metadata?: Record<string, unknown>;
}) {
  await db.projectActivity.create({
    data: {
      projectId: opts.projectId,
      actorId: opts.actorId ?? null,
      eventType: opts.eventType,
      metadata: JSON.stringify(opts.metadata ?? {}),
    },
  });
}

export async function notify(opts: {
  recipientId: string;
  actorId?: string;
  type: string;
  entityType?: string;
  entityId?: string;
  payload?: Record<string, unknown>;
}) {
  if (opts.actorId && opts.actorId === opts.recipientId) return; // never self-notify
  const prefs = await db.userNotificationPrefs.findUnique({ where: { userId: opts.recipientId } }).catch(() => null);
  const cat = opts.type.startsWith("COLLAB") || opts.type.startsWith("REQUEST") || opts.type === "MEMBER_JOINED"
    ? "collaborationRequests"
    : opts.type === "NEW_FOLLOWER"
      ? "socialActivity"
      : "projectActivity";
  if (prefs && prefs[cat] === false) return;
  await db.notification.create({
    data: {
      recipientId: opts.recipientId,
      actorId: opts.actorId ?? null,
      type: opts.type,
      entityType: opts.entityType ?? null,
      entityId: opts.entityId ?? null,
      payload: JSON.stringify(opts.payload ?? {}),
    },
  });
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
    .replace(/^-|-$/g, "");
}

export async function uniqueProjectSlug(name: string): Promise<string> {
  const base = slugify(name) || "project";
  let slug = base;
  let i = 1;
  while (await db.project.findUnique({ where: { slug } })) {
    i++;
    slug = `${base}-${i}`.slice(0, 70);
  }
  return slug;
}

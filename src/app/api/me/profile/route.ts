// PATCH /api/me/profile — update profile fields and optionally replace skills.

import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser, handle, ok, parseBody } from "@/lib/server";
import { safeParseArray, AuthUser } from "@/lib/auth";
import { SKILLS, AVATAR_GRADIENT_KEYS, LIMITS } from "@/lib/constants";

const SKILL_SLUGS: string[] = SKILLS.map((s) => s.slug);

const patchSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, "Display name is required.")
    .max(60, "Display name must be 60 characters or fewer.")
    .optional(),
  bio: z.string().max(LIMITS.bio, `Bio must be ${LIMITS.bio} characters or fewer.`).optional(),
  websiteUrl: z
    .string()
    .max(500, "Website URL is too long.")
    .transform((v) => (!v || /^https?:\/\//i.test(v) ? v : `https://${v}`))
    .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), {
      message: "Website must be a valid http(s) URL.",
    })
    .optional(),
  avatarColor: z
    .string()
    .refine((v) => AVATAR_GRADIENT_KEYS.includes(v), { message: "Unknown avatar color." })
    .optional(),
  skills: z
    .array(z.string().refine((v) => SKILL_SLUGS.includes(v), { message: "Unknown skill selected." }))
    .max(24, "Too many skills selected.")
    .optional(),
});

function toSessionUser(u: {
  id: string;
  email: string;
  username: string;
  displayName: string;
  bio: string;
  avatarColor: string;
  avatarUrl: string | null;
  websiteUrl: string;
  role: string;
  goals: string;
  interests: string;
  xp: number;
  reputation: number;
  onboardingCompleted: boolean;
  createdAt: Date;
}): AuthUser {
  return {
    id: u.id,
    email: u.email,
    username: u.username,
    displayName: u.displayName,
    bio: u.bio,
    avatarColor: u.avatarColor,
    avatarUrl: u.avatarUrl,
    websiteUrl: u.websiteUrl,
    role: u.role,
    goals: safeParseArray(u.goals),
    interests: safeParseArray(u.interests),
    xp: u.xp,
    reputation: u.reputation,
    onboardingCompleted: u.onboardingCompleted,
    createdAt: u.createdAt,
  };
}

export async function PATCH(req: NextRequest) {
  return handle(async () => {
    const me = await requireUser();
    const body = await parseBody(req, patchSchema);

    // Interactive transaction: the default 5s timeout is too tight on Vercel,
    // where every pooled-connection round-trip to Supabase adds latency — the
    // old per-skill upsert loop (2 queries × N skills) blew past it and the
    // whole PATCH (including websiteUrl) failed with P2028. Bulk queries keep
    // the round-trip count at ~5 regardless of skill count, and the explicit
    // timeout adds headroom.
    const user = await db.$transaction(
      async (tx) => {
        if (body.skills) {
          // Replace the user's skill rows atomically. Create any missing
          // Skill taxonomy rows in ONE bulk insert so the FK is always
          // satisfied even before global seeding.
          const skills = [...new Set(body.skills)];
          const existing = await tx.skill.findMany({
            where: { slug: { in: skills } },
            select: { id: true, slug: true },
          });
          const known = new Set(existing.map((s) => s.slug));
          const missing = skills.filter((slug) => !known.has(slug));
          if (missing.length > 0) {
            await tx.skill.createMany({
              data: missing.map((slug) => {
                const def = SKILLS.find((s) => s.slug === slug);
                return { slug, name: def ? def.name : slug };
              }),
            });
          }

          await tx.userSkill.deleteMany({ where: { userId: me.id } });
          // Re-fetch ids (covers just-created rows) only when needed.
          const rows =
            missing.length > 0
              ? await tx.skill.findMany({
                  where: { slug: { in: skills } },
                  select: { id: true, slug: true },
                })
              : existing;
          if (rows.length > 0) {
            await tx.userSkill.createMany({
              data: rows.map((s) => ({ userId: me.id, skillId: s.id })),
            });
          }
        }

        return tx.user.update({
          where: { id: me.id },
          data: {
            ...(body.displayName !== undefined ? { displayName: body.displayName } : {}),
            ...(body.bio !== undefined ? { bio: body.bio } : {}),
            ...(body.websiteUrl !== undefined ? { websiteUrl: body.websiteUrl } : {}),
            ...(body.avatarColor !== undefined ? { avatarColor: body.avatarColor } : {}),
          },
        });
      },
      { timeout: 15_000, maxWait: 10_000 },
    );

    return ok({ user: toSessionUser(user) });
  });
}

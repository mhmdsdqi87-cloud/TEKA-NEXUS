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

    const user = await db.$transaction(async (tx) => {
      if (body.skills) {
        // Replace the user's skill rows atomically. Upsert Skill taxonomy rows
        // on demand so the FK is always satisfied even before global seeding.
        const skills = [...new Set(body.skills)];
        await tx.userSkill.deleteMany({ where: { userId: me.id } });
        for (const slug of skills) {
          const def = SKILLS.find((s) => s.slug === slug);
          const skill = await tx.skill.upsert({
            where: { slug },
            create: { slug, name: def ? def.name : slug },
            update: {},
          });
          await tx.userSkill.create({ data: { userId: me.id, skillId: skill.id } });
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
    });

    return ok({ user: toSessionUser(user) });
  });
}

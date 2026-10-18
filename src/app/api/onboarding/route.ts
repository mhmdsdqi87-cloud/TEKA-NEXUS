// POST /api/onboarding — complete profile setup (requires auth).

import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser, handle, ok, parseBody } from "@/lib/server";
import { safeParseArray, AuthUser } from "@/lib/auth";
import { SKILLS, PROJECT_CATEGORIES, GOALS, AVATAR_GRADIENT_KEYS, LIMITS } from "@/lib/constants";

const SKILL_SLUGS: string[] = SKILLS.map((s) => s.slug);
const CATEGORY_SLUGS: string[] = PROJECT_CATEGORIES.map((c) => c.slug);
const GOAL_SLUGS: string[] = GOALS.map((g) => g.slug);

const websiteUrlSchema = z
  .string()
  .max(500, "Website URL is too long.")
  .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), {
    message: "Website must be a valid http(s) URL.",
  });

const onboardingSchema = z.object({
  displayName: z.string().trim().min(1, "Display name is required.").max(60, "Display name must be 60 characters or fewer."),
  bio: z.string().max(LIMITS.bio, `Bio must be ${LIMITS.bio} characters or fewer.`).optional(),
  skills: z
    .array(z.string().refine((v) => SKILL_SLUGS.includes(v), { message: "Unknown skill selected." }))
    .max(24, "Too many skills selected.")
    .nonempty("Select at least one skill."),
  interests: z
    .array(z.string().refine((v) => CATEGORY_SLUGS.includes(v), { message: "Unknown category selected." }))
    .max(24, "Too many categories selected.")
    .nonempty("Select at least one interest."),
  goals: z
    .array(z.string().refine((v) => GOAL_SLUGS.includes(v), { message: "Unknown goal selected." }))
    .max(GOAL_SLUGS.length, "Too many goals selected.")
    .nonempty("Select at least one goal."),
  websiteUrl: websiteUrlSchema.optional(),
  avatarColor: z
    .string()
    .refine((v) => AVATAR_GRADIENT_KEYS.includes(v), { message: "Unknown avatar color." })
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

export async function POST(req: NextRequest) {
  return handle(async () => {
    const me = await requireUser();
    const body = await parseBody(req, onboardingSchema);

    // Deduplicate while preserving order.
    const skills = [...new Set(body.skills)];

    const user = await db.$transaction(async (tx) => {
      // Replace the user's skill rows atomically. Upsert the Skill taxonomy rows
      // on demand so the FK is always satisfied even before global seeding.
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

      return tx.user.update({
        where: { id: me.id },
        data: {
          displayName: body.displayName,
          bio: body.bio ?? "",
          websiteUrl: body.websiteUrl ?? "",
          avatarColor: body.avatarColor ?? me.avatarColor,
          goals: JSON.stringify(body.goals),
          interests: JSON.stringify(body.interests),
          onboardingCompleted: true,
        },
      });
    });

    return ok({ user: toSessionUser(user) });
  });
}

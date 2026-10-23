// POST /api/auth/login — verify credentials and issue a session cookie.

import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  verifyPassword,
  createSession,
  setSessionCookie,
  safeParseArray,
  AuthUser,
} from "@/lib/auth";
import { ensureFounderRole, isFounderEmail } from "@/lib/founder";
import { mirrorUserToSupabaseAuth } from "@/lib/supabase/server";
import { handle, HttpError, ok, parseBody } from "@/lib/server";

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").max(255),
  password: z.string().min(1, "Password is required.").max(200),
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
  coins: number;
  team: string | null;
  title: string | null;
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
    coins: u.coins,
    team: u.team,
    title: u.title,
    onboardingCompleted: u.onboardingCompleted,
    createdAt: u.createdAt,
  };
}

export async function POST(req: NextRequest) {
  return handle(async () => {
    const body = await parseBody(req, loginSchema);
    const email = body.email.toLowerCase();

    const user = await db.user.findUnique({ where: { email } });
    if (!user || !verifyPassword(body.password, user.passwordHash)) {
      throw new HttpError("Invalid email or password.", 401);
    }

    await ensureFounderRole(user.id, user.email);
    const finalUser =
      user.role === "FOUNDER" || !isFounderEmail(user.email)
        ? user
        : { ...user, role: "FOUNDER" };

    const { token, expiresAt } = await createSession(user.id);
    await setSessionCookie(token, expiresAt);

    // Best-effort backfill mirror into Supabase Auth for accounts created
    // before the Supabase integration went live (never blocks login).
    const supabaseMirror = await mirrorUserToSupabaseAuth({
      email,
      password: body.password,
      username: user.username,
    });

    return ok({ user: toSessionUser(finalUser), token, supabaseMirror });
  });
}

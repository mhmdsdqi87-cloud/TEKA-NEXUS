// POST /api/auth/register — create account + notification prefs + session atomically.

import { randomBytes } from "crypto";
import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  hashPassword,
  normalizeUsername,
  validateUsername,
  safeParseArray,
  setSessionCookie,
  AuthUser,
} from "@/lib/auth";
import { ensureFounderRole, isFounderEmail, FOUNDER_ROLE } from "@/lib/founder";
import { handle, HttpError, ok, parseBody } from "@/lib/server";

const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .min(3, "Enter a valid email address.")
    .max(255, "Email is too long.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters.").max(200),
  username: z.string().trim().min(1, "Username is required.").max(30),
});

type DbUser = {
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
};

// Shape every user response exactly like SessionUser (see lib/auth AuthUser).
function toSessionUser(u: DbUser): AuthUser {
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
    const body = await parseBody(req, registerSchema);
    const email = body.email.toLowerCase();
    const username = normalizeUsername(body.username);

    const usernameError = validateUsername(username);
    if (usernameError) throw new HttpError(usernameError, 400);

    // Friendly pre-checks (unique constraints below guard against races).
    const [emailTaken, usernameTaken] = await Promise.all([
      db.user.findUnique({ where: { email }, select: { id: true } }),
      db.user.findUnique({ where: { username }, select: { id: true } }),
    ]);
    if (emailTaken) throw new HttpError("Email already registered", 409);
    if (usernameTaken) throw new HttpError("Username already taken", 409);

    const passwordHash = hashPassword(body.password);
    const token = randomBytes(48).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    let created: DbUser;
    try {
      created = await db.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: { email, username, passwordHash, displayName: username },
        });
        await tx.userNotificationPrefs.create({ data: { userId: user.id } });
        await tx.session.create({ data: { token, userId: user.id, expiresAt } });
        return user;
      });
    } catch (err) {
      const e = err as { code?: string; meta?: { target?: unknown } };
      if (e?.code === "P2002") {
        const target = e.meta?.target;
        const fields = Array.isArray(target) ? target.join(" ") : String(target ?? "");
        if (fields.includes("email")) throw new HttpError("Email already registered", 409);
        if (fields.includes("username")) throw new HttpError("Username already taken", 409);
        throw new HttpError("Email or username already registered", 409);
      }
      throw err;
    }

    await setSessionCookie(token, expiresAt);
    await ensureFounderRole(created.id, created.email);
    const finalUser = isFounderEmail(created.email)
      ? { ...created, role: FOUNDER_ROLE }
      : created;
    return ok({ user: toSessionUser(finalUser), token });
  });
}

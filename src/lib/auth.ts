// TEKA NEXUS — Server-side authentication.
// Session-cookie auth backed by the Session table.
// Passwords hashed with scrypt (node:crypto) + per-user salt.
// NEVER expose this module to client code.

import { randomBytes, scryptSync, timingSafeEqual, createHash } from "crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export const SESSION_COOKIE = "teka_session";
const SESSION_TTL_DAYS = 30;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase();
}

export function validateUsername(username: string): string | null {
  if (!/^[a-z0-9_]{3,24}$/.test(username)) {
    return "Username must be 3–24 characters: letters, numbers, underscores.";
  }
  const reserved = ["admin", "teka", "nexus", "root", "moderator", "support", "api", "me", "null", "undefined", "system"];
  if (reserved.includes(username)) return "That username is reserved.";
  return null;
}

export async function createSession(userId: string): Promise<{ token: string; expiresAt: Date }> {
  const token = randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  await db.session.create({ data: { token, userId, expiresAt } });
  return { token, expiresAt };
}

export async function setSessionCookie(token: string, expiresAt: Date): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // sandbox preview runs over plain http
    expires: expiresAt,
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await db.session.deleteMany({ where: { token } });
  }
  store.delete(SESSION_COOKIE);
}

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  bio: string;
  avatarColor: string;
  avatarUrl: string | null;
  websiteUrl: string;
  role: string;
  goals: string[];
  interests: string[];
  xp: number;
  reputation: number;
  coins: number; // TEKA Coin balance (Task 19)
  team: string | null; // RED | BLUE (Task 19)
  title: string | null; // boss title (Task 19)
  onboardingCompleted: boolean;
  createdAt: Date;
};

export async function getSessionUser(token: string | undefined): Promise<AuthUser | null> {
  if (!token) return null;
  const session = await db.session.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await db.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  const u = session.user;
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

// Request-shaped variant for route handlers.
export async function getAuthUser(req?: Request): Promise<AuthUser | null> {
  const store = await cookies();
  return getSessionUser(store.get(SESSION_COOKIE)?.value);
}

export function safeParseArray(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

export function newToken(): string {
  return createHash("sha256").update(randomBytes(32)).digest("hex");
}

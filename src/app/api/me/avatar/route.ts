// POST /api/me/avatar — set the user's profile photo from a base64 data URL.
// The image is uploaded to Supabase Storage (teka-avatars bucket) and the
// public URL is stored on the user. If Supabase is unreachable, it falls
// back to storing the data URL locally so uploads NEVER break.
// DELETE /api/me/avatar — remove it (the gradient/initials avatar becomes the fallback again).

import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { HttpError, requireUser, handle, ok, parseBody } from "@/lib/server";
import { safeParseArray, AuthUser } from "@/lib/auth";
import { uploadAvatarToStorage, deleteAvatarFromStorage } from "@/lib/supabase/server";

// The whole data URL (prefix + base64 payload) must fit in 400 KB
// (≈300 KB binary — well under the 1 MB bucket limit).
const MAX_AVATAR_LENGTH = 400 * 1024;
const AVATAR_DATA_URL_PREFIX = /^data:image\/(png|jpeg|jpg|webp);base64,/;
const BASE64_PAYLOAD = /^[A-Za-z0-9+/]+={0,2}$/;

const postSchema = z.object({
  dataUrl: z
    .string()
    .min(1, "Avatar data URL is required.")
    .max(MAX_AVATAR_LENGTH, "Avatar image must be 400 KB or smaller.")
    .refine((v) => AVATAR_DATA_URL_PREFIX.test(v), {
      message: "Avatar must be a PNG, JPEG or WebP data URL.",
    }),
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

async function loadCurrentAvatarUrl(userId: string): Promise<string | null> {
  const row = await db.user.findUnique({
    where: { id: userId },
    select: { avatarUrl: true },
  });
  return row?.avatarUrl ?? null;
}

export async function POST(req: NextRequest) {
  return handle(async () => {
    const me = await requireUser();
    const body = await parseBody(req, postSchema);

    // The prefix is already validated by the schema — check that what follows
    // the comma is actually base64 image data, not garbage.
    const payload = body.dataUrl.slice(body.dataUrl.indexOf(",") + 1);
    if (!payload || !BASE64_PAYLOAD.test(payload)) {
      throw new HttpError("Avatar payload must be valid base64 image data.", 422);
    }

    const mime = body.dataUrl.slice(5, body.dataUrl.indexOf(";")); // image/png|jpeg|jpg|webp
    const buffer = Buffer.from(payload, "base64");

    // Try Supabase Storage first — the image lives in the user's own project.
    let stored: string | null = null;
    let storageReason: string | undefined;
    try {
      const upload = await uploadAvatarToStorage({ userId: me.id, buffer, contentType: mime });
      stored = upload.url;
      storageReason = upload.reason;
    } catch {
      storageReason = "storage-exception";
    }

    // Graceful fallback: keep the previous local behaviour (data URL in DB).
    const avatarUrl = stored ?? body.dataUrl;

    // Clean up the previous Supabase object if we are replacing one.
    const previous = await loadCurrentAvatarUrl(me.id);
    if (previous && previous.startsWith("http")) {
      await deleteAvatarFromStorage(previous).catch(() => {});
    }

    const user = await db.user.update({
      where: { id: me.id },
      data: { avatarUrl },
    });

    return ok({
      user: toSessionUser(user),
      storage: { provider: stored ? "supabase" : "local-fallback", reason: storageReason },
    });
  });
}

export async function DELETE() {
  return handle(async () => {
    const me = await requireUser();

    const previous = await loadCurrentAvatarUrl(me.id);
    if (previous && previous.startsWith("http")) {
      await deleteAvatarFromStorage(previous).catch(() => {});
    }

    const user = await db.user.update({
      where: { id: me.id },
      data: { avatarUrl: null },
    });

    return ok({ user: toSessionUser(user) });
  });
}

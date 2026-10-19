// TEKA NEXUS — founder identity + role helpers.

import { db } from "@/lib/db";

export const FOUNDER_EMAIL = "mhmdsdqi87@gmail.com";
export const FOUNDER_ROLE = "FOUNDER";

export function isFounderEmail(email: string): boolean {
  return email.trim().toLowerCase() === FOUNDER_EMAIL;
}

// Idempotently grants the FOUNDER role to the founder account.
// Called from register/login so the role sticks even before any manual step.
export async function ensureFounderRole(userId: string, email: string): Promise<void> {
  if (!isFounderEmail(email)) return;
  await db.user
    .update({ where: { id: userId }, data: { role: FOUNDER_ROLE } })
    .catch(() => {});
}

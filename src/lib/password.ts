// Standalone scrypt hasher for seed scripts (matches src/lib/auth.ts format: salt:hash).
import { scryptSync, randomBytes } from "crypto";

export function hashPasswordForSeed(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

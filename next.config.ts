import type { NextConfig } from "next";

// Sandbox guard: some sandboxes export DATABASE_URL=file:… (old SQLite) in the
// shell. The real connection string lives in .env (Supabase Postgres). If a
// stale `file:` URL is inherited, swap in the Postgres URL from .env so a dev
// restart never boots the Postgres-only Prisma client against a SQLite file.
if (process.env.DATABASE_URL?.startsWith("file:")) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { config } = require("dotenv") as typeof import("dotenv");
  // override: true is CRITICAL — the sandbox shell exports a stale `file:` URL
  // and plain dotenv refuses to replace an existing env var, which left
  // Prisma without any DATABASE_URL (every API 500'd).
  config({ path: ".env", quiet: true, override: true });
  if (!process.env.DATABASE_URL?.startsWith("postgres")) {
    delete process.env.DATABASE_URL;
  }
}
console.log(
  `[teka-boot] DATABASE_URL protocol = ${(process.env.DATABASE_URL ?? "(undefined)").slice(0, 13)}…`
);

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;

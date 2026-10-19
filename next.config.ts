import type { NextConfig } from "next";

// Sandbox guard: some sandboxes export DATABASE_URL=file:… (old SQLite) in the
// shell. The real connection string lives in .env (Supabase Postgres). If a
// stale `file:` URL is inherited, swap in the Postgres URL from .env so a dev
// restart never boots the Postgres-only Prisma client against a SQLite file.
if (process.env.DATABASE_URL?.startsWith("file:")) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { config } = require("dotenv") as typeof import("dotenv");
  config({ path: ".env", quiet: true });
  if (process.env.DATABASE_URL?.startsWith("file:")) delete process.env.DATABASE_URL;
}

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;

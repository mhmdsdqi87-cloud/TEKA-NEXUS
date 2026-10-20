import { PrismaClient } from '@prisma/client'

// Singleton Prisma client.
// - Cached on globalThis in EVERY environment (dev hot-reload AND production
//   cold starts) so one instance = one client = one bounded connection pool.
// - Query logging only in development — logging every query in production
//   wastes lambda memory/CPU and slows responses.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error', 'warn'],
  })

globalForPrisma.prisma = db

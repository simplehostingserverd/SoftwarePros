import { PrismaClient } from '@prisma/client';

// Cache the PrismaClient across hot-reloads in development to avoid exhausting
// database connections and to ensure the generated client is only initialized
// when actually used at runtime.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    // Keep logs minimal; avoid extremely verbose query logging in dev
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const db: PrismaClient = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

// Do not call db.$connect() at module import time. Next.js may import files
// during build/edge evaluation where a live connection is not desired.

import { PrismaClient } from '@prisma/client';

import { env } from '../env';

export * from '@prisma/client';

const globalForPrisma = globalThis as { prisma?: PrismaClient };

export const db =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

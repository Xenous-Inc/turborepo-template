import { PrismaClient } from '@prisma/client';

import { env } from '../env';

export * from '@prisma/client';

const globalForPrisma = globalThis as { prisma?: PrismaClient };

export const db =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: env.NEXT_PUBLIC_NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });

if (env.NEXT_PUBLIC_NODE_ENV !== 'production') globalForPrisma.prisma = db;

import { ORPCError, os } from '@orpc/server';
import type { H3EventContext } from 'nitro/h3';

export const o = os.$context<H3EventContext>();

export const publicProcedure = o;

const requireAuth = o.middleware(async ({ context, next }) => {
    if (!context.session?.user) {
        throw new ORPCError('UNAUTHORIZED');
    }

    return next({
        context: {
            ...context,
            session: context.session,
        },
    });
});

export const protectedProcedure = publicProcedure.use(requireAuth);

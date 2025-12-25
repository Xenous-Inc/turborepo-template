import { ORPCError, os } from '@orpc/server';
import type { ORPCContext } from './context';

export const o = os.$context<ORPCContext>();

export const publicProcedure = o;

const requireAuth = o.middleware(async ({ context, next }) => {
    if (!context.session || !context.user) {
        throw new ORPCError('UNAUTHORIZED');
    }

    return next({
        context: {
            ...context,
            session: context.session,
            user: context.user,
        },
    });
});

export const protectedProcedure = publicProcedure.use(requireAuth);

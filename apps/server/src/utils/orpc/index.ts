import { ORPCError, os } from '@orpc/server';
import type { ORPCContext } from '../context';

export const o = os.$context<ORPCContext>();

export const publicProcedure = o;

const requireAuth = o.middleware(async ({ context, next }) => {
    const session = await context.getSession();

    if (!session) {
        throw new ORPCError('UNAUTHORIZED');
    }

    return next({
        context: {
            ...context,
            session: session.session,
            user: session.user,
        },
    });
});

export const protectedProcedure = publicProcedure.use(requireAuth);

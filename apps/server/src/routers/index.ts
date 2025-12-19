import { env } from '~/env';
import { o, protectedProcedure, publicProcedure } from '~/utils/orpc';
import { todoRouter } from './todo';

export const appRouter = o.router({
    healthCheck: publicProcedure.handler(() => {
        return `OK "${env.NODE_ENV}"`;
    }),
    privateData: protectedProcedure.handler(({ context }) => {
        return {
            message: 'This is private',
            user: context.session?.user,
        };
    }),
    todo: todoRouter,
});

export type AppRouter = typeof appRouter;

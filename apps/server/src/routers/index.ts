import type { RouterClient } from '@orpc/server';
import { env } from '~/env';
import { todoRouter } from './todo';

export const appRouter = {
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
};

export type AppRouter = typeof appRouter;

export type AppRouterClient = RouterClient<AppRouter>;

import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import type { AppRouter } from './root';
import { appRouter } from './root';
import { createCallerFactory, createTRPCContext } from './trpc';

/**
 * Create a server-side caller for the tRPC API
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
const createCaller = createCallerFactory(appRouter);

type RouterInputs = inferRouterInputs<AppRouter>;

type RouterOutputs = inferRouterOutputs<AppRouter>;

export { createTRPCContext, appRouter, createCaller };
export type { AppRouter, RouterInputs, RouterOutputs };

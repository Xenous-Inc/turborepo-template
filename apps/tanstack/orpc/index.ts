import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import type { InferRouterInputs, InferRouterOutputs, RouterClient } from '@orpc/server';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import { createIsomorphicFn } from '@tanstack/react-start';
import { env } from '~/env';
import type { AppRouter } from '../../server/src/routers';

const getLink = createIsomorphicFn()
    .server(() => {
        return new RPCLink({
            url: `${env.SERVER_URL}/rpc`,
            fetch: (url, options) => {
                return fetch(url, {
                    ...options,
                    credentials: 'include',
                });
            },
        });
    })
    .client(() => {
        return new RPCLink({
            url: `${env.VITE_SERVER_URL}/rpc`,
            fetch: (url, options) => {
                return fetch(url, {
                    ...options,
                    credentials: 'include',
                });
            },
        });
    });

const link = getLink();

const client: RouterClient<AppRouter> = createORPCClient(link);

const orpc = createTanstackQueryUtils(client);

type ORPCRouterClient = RouterClient<AppRouter>;

type RouterInputs = InferRouterInputs<AppRouter>;

type RouterOutputs = InferRouterOutputs<AppRouter>;

export { orpc, type ORPCRouterClient, type RouterInputs, type RouterOutputs };

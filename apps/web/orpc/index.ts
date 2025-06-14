import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import type { RouterClient } from '@orpc/server';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import { env } from '~/env';
import type { appRouter } from '../../server/src/routers';

const link = new RPCLink({
    url: `${env.NEXT_PUBLIC_SERVER_URL}/rpc`,
    fetch: (url, options) => {
        return fetch(url, {
            ...options,
            credentials: 'include',
        });
    },
});

const client: RouterClient<typeof appRouter> = createORPCClient(link);

const orpc = createTanstackQueryUtils(client);

export { orpc };

import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import type { InferRouterInputs, InferRouterOutputs, RouterClient } from '@orpc/server';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { ENV } from 'varlock/env';
import type { AppRouter } from '../../server/src/routers';

/**
 * These describe the incoming request, not the RPC call we forward it into — a `content-length` from a
 * render triggered by a POST contradicts the RPC body and stalls the call. Browsers drop them, Node doesn't.
 *
 * {@link https://fetch.spec.whatwg.org/#forbidden-request-header | Fetch — forbidden request-header}
 */
const UNFORWARDED_HEADERS = new Set([
    'connection',
    'content-length',
    'expect',
    'host',
    'keep-alive',
    'transfer-encoding',
    'upgrade',
]);

const forwardableHeaders = (headers: Headers) => {
    const forwarded: Record<string, string> = {};

    for (const [name, value] of headers.entries()) {
        if (UNFORWARDED_HEADERS.has(name)) continue;

        forwarded[name] = value;
    }

    return forwarded;
};

const getLink = createIsomorphicFn()
    .server(() => {
        return new RPCLink({
            url: `${ENV.SERVER_URL}/rpc`,
            /**
             * Server-side fetch has no cookie jar, so the incoming headers must be forwarded or every SSR
             * call is anonymous. A function, not a value, so the shared link reads the current request.
             */
            headers: () => forwardableHeaders(getRequestHeaders()),
        });
    })
    .client(() => {
        return new RPCLink({
            url: `${ENV.VITE_SERVER_URL}/rpc`,
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

export { type ORPCRouterClient, orpc, type RouterInputs, type RouterOutputs };

import type { RequestHeadersPluginContext, ResponseHeadersPluginContext } from '@orpc/server/plugins';
import type { H3Event } from 'nitro/h3';
import { auth } from './auth';

type CreateContextOptions = {
    event: H3Event;
};

type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

/** Memoizes the promise, not the value, so concurrent callers in one request share a single lookup. */
const once = <T>(resolve: () => Promise<T>) => {
    let promise: Promise<T> | undefined;

    return () => {
        promise ??= resolve();

        return promise;
    };
};

/**
 * The session is a getter rather than a value: every request runs this, but only the handlers that ask
 * pay for the lookup. Docs, the spec, health checks and Better Auth's own routes never do.
 *
 * {@link https://orpc.dev/docs/integrations/better-auth | oRPC — Better Auth integration}
 */
export const createNitroContext = ({ event }: CreateContextOptions) => {
    return { getSession: once<Session>(() => auth.api.getSession({ headers: event.req.headers })) };
};

export type NitroContext = ReturnType<typeof createNitroContext>;

export type ORPCContext = NitroContext & RequestHeadersPluginContext & ResponseHeadersPluginContext;

declare module 'nitro/h3' {
    interface H3EventContext extends NitroContext {}
}

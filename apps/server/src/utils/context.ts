import type { RequestHeadersPluginContext, ResponseHeadersPluginContext } from '@orpc/server/plugins';
import type { H3Event } from 'nitro/h3';
import { auth } from './auth';

type CreateContextOptions = {
    event: H3Event;
};

export const createNitroContext = async ({ event }: CreateContextOptions) => {
    const sessionData = await auth.api.getSession({ headers: event.req.headers });

    return { session: sessionData?.session, user: sessionData?.user };
};

export type NitroContext = Awaited<ReturnType<typeof createNitroContext>>;

export type ORPCContext = NitroContext & RequestHeadersPluginContext & ResponseHeadersPluginContext;

declare module 'h3' {
    interface H3EventContext extends NitroContext {}
}

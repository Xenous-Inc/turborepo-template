import { defineMiddleware, type H3Event } from 'nitro/h3';
import { auth } from '~/utils/auth';

type CreateContextOptions = {
    event: H3Event;
};

const createContext = async ({ event }: CreateContextOptions) => {
    const session = await auth.api.getSession({ headers: event.req.headers });

    return { session };
};

declare module 'h3' {
    interface H3EventContext extends Awaited<ReturnType<typeof createContext>> {}
}

export default defineMiddleware(async event => {
    const context = await createContext({ event });

    for (const [key, value] of Object.entries(context)) {
        event.context[key] = value;
    }
});

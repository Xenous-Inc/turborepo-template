import type { H3Event } from 'h3';

export type CreateContextOptions = {
    event: H3Event;
};

export const createContext = async ({ event }: CreateContextOptions) => {
    const session = await auth.api.getSession({ headers: event.headers });

    return { session };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

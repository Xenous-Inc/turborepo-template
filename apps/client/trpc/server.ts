import { cache } from 'react';
import { headers } from 'next/headers';

import { createCaller, createTRPCContext } from '@xenous/api';
import { auth } from '@xenous/auth';

const createContext = cache(async () => {
    const heads = new Headers(headers());
    heads.set('x-trpc-source', 'rsc');

    return createTRPCContext({
        session: await auth(),
        headers: heads,
    });
});

export const api = createCaller(createContext);

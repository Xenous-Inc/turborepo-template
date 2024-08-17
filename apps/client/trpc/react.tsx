'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import SuperJSON from 'superjson';

import type { AppRouter } from '@xenous/api';

import { env } from '~/env';

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30 * 1000,
            },
        },
    });

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
    if (typeof window === 'undefined') {
        return createQueryClient();
    } else {
        return (clientQueryClientSingleton ??= createQueryClient());
    }
};

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    const [trpcClient] = useState(() =>
        api.createClient({
            links: [
                loggerLink({
                    enabled: op =>
                        env.NODE_ENV === 'development' || (op.direction === 'down' && op.result instanceof Error),
                }),
                unstable_httpBatchStreamLink({
                    transformer: SuperJSON,
                    url: getBaseUrl() + '/api/trpc',
                    headers() {
                        const headers = new Headers();
                        headers.set('x-trpc-source', 'nextjs-react');
                        return headers;
                    },
                }),
            ],
        })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {props.children}
                {env.NEXT_PUBLIC_QUERY_DEVTOOLS && <ReactQueryDevtools initialIsOpen={false} />}
            </api.Provider>
        </QueryClientProvider>
    );
}

const getBaseUrl = () => {
    if (typeof window !== 'undefined') return window.location.origin;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
};

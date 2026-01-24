import { defaultShouldDehydrateQuery, isServer, QueryCache, QueryClient } from '@tanstack/react-query';
import { serializer } from './serializer';

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 30 * 1000,
            },
            // https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#streaming-with-server-components
            dehydrate: {
                shouldDehydrateQuery: query => {
                    // include pending queries in dehydration
                    return defaultShouldDehydrateQuery(query) || query.state.status === 'pending';
                },
                shouldRedactErrors: () => {
                    // We should not catch Next.js server errors
                    // as that's how Next.js detects dynamic pages
                    // so we cannot redact them.
                    // Next.js also automatically redacts errors for us
                    // with better digests.
                    return false;
                },
                serializeData: data => {
                    const [json, meta] = serializer.serialize(data);

                    return { json, meta };
                },
            },
            hydrate: {
                deserializeData: data => {
                    return serializer.deserialize(data.json, data.meta);
                },
            },
        },
        queryCache: new QueryCache({
            // onError: error => {
            //     toast.error(`Error: ${error.message}`, {
            //         action: {
            //             label: 'retry',
            //             onClick: () => {
            //                 queryClient.invalidateQueries();
            //             },
            //         },
            //     });
            // },
        }),
    });

let clientQueryClientSingleton: QueryClient | undefined;

export const getQueryClient = () => {
    if (isServer) {
        // Server: always make a new query client
        return createQueryClient();
    }

    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    clientQueryClientSingleton ??= createQueryClient();

    return clientQueryClientSingleton;
};

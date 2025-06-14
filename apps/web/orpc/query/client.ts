import { QueryCache, QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query';
import { serializer } from './serializer';

export const createQueryClient = () =>
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

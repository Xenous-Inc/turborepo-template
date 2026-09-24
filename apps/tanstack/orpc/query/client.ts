import { QueryCache, QueryClient } from '@tanstack/react-query';
import { serializer } from './serializer';

/**
 * Called once per router, so each SSR request gets its own cache and the browser keeps one for the
 * session. Creating it at module scope instead would serve one reader's data inside another's HTML.
 *
 * {@link https://tanstack.com/start/latest/docs/framework/react/guide/tanstack-query | TanStack Start + Query}
 */
export const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 30 * 1000,
            },
            dehydrate: {
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

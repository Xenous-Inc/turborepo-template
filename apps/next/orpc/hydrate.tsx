import type { OperationKey, OperationType, ProcedureUtils } from '@orpc/tanstack-query';
import { dehydrate, HydrationBoundary, type QueryKey } from '@tanstack/react-query';
import { cache } from 'react';
import { getQueryClient } from './query/client';

const getCachedQueryClient = cache(getQueryClient);

/** Everything that is fetched rather than triggered — `mutation` and `live` are not prefetchable. */
const PREFETCHABLE_TYPES = new Set<unknown>(['query', 'streamed', 'infinite'] satisfies OperationType[]);

const isORPCQueryKey = (queryKey: QueryKey): queryKey is OperationKey<'query' | 'streamed' | 'infinite', unknown> => {
    if (queryKey.length !== 2) return false;

    const [path, options] = queryKey;

    if (!Array.isArray(path)) return false;
    if (typeof options !== 'object' || options === null) return false;

    /** A key built without a type matches every operation on the procedure, so read it as a query. */
    if (!('type' in options) || options.type === undefined) return true;

    return PREFETCHABLE_TYPES.has(options.type);
};

const prefetch = <
    T extends ReturnType<
        ProcedureUtils<any, any, any, any>['queryOptions' | 'infiniteOptions' | 'experimental_streamedOptions']
    >,
>(
    queryOptions: T,
) => {
    const queryClient = getCachedQueryClient();

    if (!isORPCQueryKey(queryOptions.queryKey)) return;

    if (queryOptions.queryKey[1]?.type === 'infinite') {
        void queryClient.prefetchInfiniteQuery(queryOptions as any);
    } else {
        void queryClient.prefetchQuery(queryOptions);
    }
};

const HydrateClient: React.FC<React.PropsWithChildren> = ({ children }) => {
    const queryClient = getCachedQueryClient();

    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export { HydrateClient, prefetch };

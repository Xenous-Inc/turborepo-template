import type { OperationKey, OperationType, ProcedureUtils } from '@orpc/tanstack-query';
import { dehydrate, HydrationBoundary, type QueryKey } from '@tanstack/react-query';
import { cache } from 'react';
import { createQueryClient } from './query/client';

const getQueryClient = cache(createQueryClient);

const isORPCQueryKey = (queryKey: QueryKey): queryKey is OperationKey<OperationType, never> => {
    if (queryKey.length !== 2) return false;

    const path = queryKey[0];
    const options = queryKey[1];

    if (!Array.isArray(path)) return false;
    if (typeof options !== 'object' || options === null) return false;

    /** We don't accept input as it can be here only if it's mutationKey */
    if ('input' in options && typeof options.input !== 'undefined') return false;

    /** Excluding mutation because we only check for queryies */
    const operationTypes = ['query', 'streamed', 'infinite'] satisfies OperationType[];

    if (!('type' in options) || typeof options.type === 'undefined') return true;

    if ('type' in options && (typeof options.type !== 'string' || operationTypes.includes(options.type))) {
        return false;
    }

    return true;
};

const prefetch = <
    T extends ReturnType<
        ProcedureUtils<any, any, any, any>['queryOptions' | 'infiniteOptions' | 'experimental_streamedOptions']
    >,
>(
    queryOptions: T,
) => {
    const queryClient = getQueryClient();

    if (!isORPCQueryKey(queryOptions.queryKey)) return;

    if (queryOptions.queryKey[1]?.type === 'infinite') {
        void queryClient.prefetchInfiniteQuery(queryOptions as any);
    } else {
        void queryClient.prefetchQuery(queryOptions);
    }
};

const HydrateClient: React.FC<React.PropsWithChildren> = ({ children }) => {
    const queryClient = getQueryClient();

    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};
HydrateClient.displayName = 'HydrateClient';

export { HydrateClient, prefetch };

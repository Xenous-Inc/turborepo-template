'use client';

import { isServer, type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from './query/client';
import { TanstackQueryDevtools } from './query/devtools';

let clientQueryClientSingleton: QueryClient | undefined;
const getQueryClient = () => {
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

const ORPCProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    /**
     * Avoid useState when initializing the query client if you don't
     * have a suspense boundary between this and the code that may
     * suspend because React will throw away the client on the initial
     * render if it suspends and there is no boundary
     *
     * {@link https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#initial-setup | TanStack Query initial setup}
     */
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <TanstackQueryDevtools />
        </QueryClientProvider>
    );
};
ORPCProvider.displayName = 'ORPCProvider';

export { ORPCProvider };

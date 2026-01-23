import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from './query/client';
import { TanstackQueryDevtools } from './query/devtools';

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

export { ORPCProvider };

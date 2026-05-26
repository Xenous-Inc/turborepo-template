import { lazy, Suspense, useEffect, useState } from 'react';

// Devtools must be lazy-loaded and rendered client-only. A static import pulls the dev-only
// package into the SSR bundle, which crashes the production server build with missing
// browser globals (window/document) during render.
const ReactQueryDevtools = lazy(() =>
    import('@tanstack/react-query-devtools').then(module => ({
        default: module.ReactQueryDevtools,
    })),
);

const ReactQueryDevtoolsProduction = lazy(() =>
    import('@tanstack/react-query-devtools/production').then(module => ({
        default: module.ReactQueryDevtools,
    })),
);

const DevtoolsProductionStorageKey = 'tanstack-query-devtools-production';

const TanstackQueryDevtools: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const [showDevtools, setShowDevtools] = useState(() => {
        if (typeof window === 'undefined') return false;

        return localStorage.getItem(DevtoolsProductionStorageKey) === 'true';
    });

    useEffect(() => {
        setIsClient(true);

        // @ts-expect-error
        window.toggleDevtools = () => {
            setShowDevtools(prev => {
                localStorage.setItem(DevtoolsProductionStorageKey, (!prev).toString());
                return !prev;
            });
        };
    }, []);

    // Gate render on a post-mount flag so the server emits nothing for the devtools subtree —
    // rendering them during SSR causes hydration mismatches and breaks the production build.
    if (!isClient) return;

    return (
        <>
            <ReactQueryDevtools position='bottom' buttonPosition='bottom-right' initialIsOpen={false} />
            {showDevtools && (
                <Suspense fallback={null}>
                    <ReactQueryDevtoolsProduction
                        position='bottom'
                        buttonPosition='bottom-right'
                        initialIsOpen={false}
                    />
                </Suspense>
            )}
        </>
    );
};

export { TanstackQueryDevtools };

import { lazy, Suspense, useEffect, useState } from 'react';

// Devtools must be lazy-loaded and rendered client-only. A static import pulls the dev-only
// package into the SSR bundle, which crashes the production server build with missing
// browser globals (window/document) during render.
const TanStackRouterDevtools = lazy(() =>
    import('@tanstack/react-router-devtools').then(module => ({
        default: module.TanStackRouterDevtools,
    })),
);

const RouterDevtoolsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // Gate render on a post-mount flag so the server emits nothing for the devtools subtree —
    // rendering them during SSR causes hydration mismatches and breaks the production build.
    const [isClient, setIsClient] = useState(false);

    useEffect(() => setIsClient(true), []);

    return (
        <>
            {children}
            {isClient && (
                <Suspense fallback={null}>
                    <TanStackRouterDevtools position='bottom-left' />
                </Suspense>
            )}
        </>
    );
};

export { RouterDevtoolsProvider };

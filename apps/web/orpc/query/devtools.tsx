'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, lazy, useEffect, useState } from 'react';
import { env } from '~/env';

const ReactQueryDevtoolsProduction = lazy(() =>
    import('@tanstack/react-query-devtools/production').then(module => ({
        default: module.ReactQueryDevtools,
    })),
);

const DevtoolsProductionStorageKey = 'tanstack-query-devtools-production';

const TanstackQueryDevtools: React.FC = () => {
    const [showDevtools, setShowDevtools] = useState(() => {
        if (typeof window === 'undefined') return false;

        return localStorage.getItem(DevtoolsProductionStorageKey) === 'true';
    });

    useEffect(() => {
        // @ts-expect-error
        window.toggleDevtools = () => {
            setShowDevtools(prev => {
                localStorage.setItem(DevtoolsProductionStorageKey, (!prev).toString());
                return !prev;
            });
        };
    }, []);

    return (
        <>
            {env.NEXT_PUBLIC_QUERY_DEVTOOLS_ENABLED && <ReactQueryDevtools initialIsOpen={false} />}
            {env.NEXT_PUBLIC_QUERY_DEVTOOLS_ENABLED && showDevtools && (
                <Suspense fallback={null}>
                    <ReactQueryDevtoolsProduction />
                </Suspense>
            )}
        </>
    );
};
TanstackQueryDevtools.displayName = 'TanstackQueryDevtools';

export { TanstackQueryDevtools };

'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ORPCProvider } from '~/orpc/provider';
import { RwdotProvider } from './RwdotProvider';
import { ToastProvider } from './ToastProvider';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ToastProvider>
            <RwdotProvider>
                <NuqsAdapter>
                    <ORPCProvider>{children}</ORPCProvider>
                </NuqsAdapter>
            </RwdotProvider>
        </ToastProvider>
    );
};
Providers.displayName = 'Providers';

export { Providers };

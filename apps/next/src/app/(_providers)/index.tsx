'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ORPCProvider } from '~/orpc/provider';
import { RwdotProvider } from './rwdot-provider';
import { ThemeProvider } from './theme-provider';
import { ToastProvider } from './toast-provider';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider>
            <ToastProvider>
                <RwdotProvider>
                    <NuqsAdapter>
                        <ORPCProvider>{children}</ORPCProvider>
                    </NuqsAdapter>
                </RwdotProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};

export { Providers };

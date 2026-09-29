import { ENV } from 'varlock/env';
import { ORPCProvider } from '~/orpc/provider';
import { RouterDevtoolsProvider } from './router-devtools-provider';
import { ThemeProvider } from './theme-provider';
import { ToastProvider } from './toast-provider';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider>
            <ToastProvider>
                <ORPCProvider>
                    {children}
                    {ENV.VITE_ROUTER_DEVTOOLS_ENABLED && <RouterDevtoolsProvider />}
                </ORPCProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};

export { Providers };

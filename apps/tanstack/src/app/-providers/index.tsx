import { ENV } from 'varlock/env';
import { ORPCProvider } from '~/orpc/provider';
import { RouterDevtoolsProvider } from './router-devtools-provider';
import { ToastProvider } from './toast-provider';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ToastProvider>
            <ORPCProvider>
                {children}
                {ENV.VITE_ROUTER_DEVTOOLS_ENABLED && <RouterDevtoolsProvider />}
            </ORPCProvider>
        </ToastProvider>
    );
};

export { Providers };

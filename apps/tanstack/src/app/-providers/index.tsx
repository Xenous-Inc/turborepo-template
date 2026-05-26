import { env } from '~/env';
import { ORPCProvider } from '~/orpc/provider';
import { RouterDevtoolsProvider } from './RouterDevtoolsProvider';
import { ToastProvider } from './ToastProvider';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ToastProvider>
            <ORPCProvider>
                {children}
                {env.VITE_ROUTER_DEVTOOLS_ENABLED && <RouterDevtoolsProvider />}
            </ORPCProvider>
        </ToastProvider>
    );
};

export { Providers };

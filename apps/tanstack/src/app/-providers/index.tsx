import { ORPCProvider } from '~/orpc/provider';
import { RouterDevtoolsProvider } from './RouterDevtoolsProvider';
import { ToastProvider } from './ToastProvider';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <RouterDevtoolsProvider>
            <ToastProvider>
                <ORPCProvider>{children}</ORPCProvider>
            </ToastProvider>
        </RouterDevtoolsProvider>
    );
};

export { Providers };

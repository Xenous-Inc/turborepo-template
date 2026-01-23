import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { env } from '~/env';

const RouterDevtoolsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            {children}
            {env.VITE_ROUTER_DEVTOOLS_ENABLED && <TanStackRouterDevtools position='bottom-left' />}
        </>
    );
};

export { RouterDevtoolsProvider };

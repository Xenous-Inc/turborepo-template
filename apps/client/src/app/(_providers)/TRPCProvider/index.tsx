import { TRPCReactProvider as Provider } from '~/trpc/react';

export const TRPCProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Provider>{children}</Provider>;
};

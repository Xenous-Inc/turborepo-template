import { TRPCReactProvider as Provider } from '~/trpc/react';

const TRPCProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Provider>{children}</Provider>;
};
TRPCProvider.displayName = 'TRPCProvider';

export default TRPCProvider;

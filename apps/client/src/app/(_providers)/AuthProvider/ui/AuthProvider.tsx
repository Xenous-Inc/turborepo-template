'use client';

import { SessionProvider as Provider } from 'next-auth/react';

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Provider>{children}</Provider>;
};
AuthProvider.displayName = 'AuthProvider';

export default AuthProvider;

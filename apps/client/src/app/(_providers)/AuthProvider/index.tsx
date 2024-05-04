'use client';

import { SessionProvider as Provider } from 'next-auth/react';

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Provider>{children}</Provider>;
};

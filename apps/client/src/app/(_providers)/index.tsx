import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';
import { TRPCProvider } from './TRPCProvider';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider>
            <ToastProvider>
                <AuthProvider>
                    <TRPCProvider>{children}</TRPCProvider>
                </AuthProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};

import { AuthProvider } from './AuthProvider';
import { RwdotProvider } from './RwdotProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';
import { TRPCProvider } from './TRPCProvider';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <RwdotProvider>
            <ThemeProvider>
                <ToastProvider>
                    <AuthProvider>
                        <TRPCProvider>{children}</TRPCProvider>
                    </AuthProvider>
                </ToastProvider>
            </ThemeProvider>
        </RwdotProvider>
    );
};

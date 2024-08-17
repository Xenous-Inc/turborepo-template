import { Toaster } from '@xenous/ui/toast';

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            {children}
            <Toaster />
        </>
    );
};

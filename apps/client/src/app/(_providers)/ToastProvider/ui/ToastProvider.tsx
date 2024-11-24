import { Toaster } from '@xenous/ui/toast';

const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            {children}
            <Toaster />
        </>
    );
};
ToastProvider.displayName = 'ToastProvider';

export default ToastProvider;

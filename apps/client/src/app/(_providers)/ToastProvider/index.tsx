import { ToastProvider as Provider } from '@xenous/ui/toast';

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            {children}
            <Provider />
        </>
    );
};

import { ThemeProvider as Provider } from '@xenous/ui/theme';

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Provider attribute={'class'} defaultTheme={'system'} enableSystem>
            {children}
        </Provider>
    );
};

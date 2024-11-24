import { ThemeProvider as Provider } from '@xenous/ui/theme';

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Provider attribute={'data-theme'} defaultTheme={'system'} enableSystem>
            {children}
        </Provider>
    );
};
ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;

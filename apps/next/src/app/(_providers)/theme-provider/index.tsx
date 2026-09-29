'use client';

import type { EnumItem } from '@xenous/typescript/enum';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { useCallback } from 'react';

const Theme = {
    DARK: 'dark',
    LIGHT: 'light',
} as const;

type Theme = EnumItem<typeof Theme>;

const THEMES = Object.values(Theme);

/** Rendered by the server and used until the stored preference is read. */
const DEFAULT_THEME: Theme = Theme.LIGHT;

const THEME_STORAGE_KEY = 'xenous-theme';

const isTheme = (value: string | undefined): value is Theme => THEMES.some(theme => theme === value);

/** Same shape as the TanStack app's `useTheme`, so components move between the apps unchanged. */
const useTheme = () => {
    const { theme: current, setTheme: setNextTheme } = useNextTheme();

    const theme = isTheme(current) ? current : DEFAULT_THEME;

    // Narrows next-themes' `string` setter to our themes.
    const setTheme = useCallback((next: Theme) => setNextTheme(next), [setNextTheme]);

    const toggleTheme = useCallback(() => {
        setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    }, [setTheme, theme]);

    return { theme, setTheme, toggleTheme };
};

/** next-themes injects the pre-paint script itself, so the root layout needs nothing but `suppressHydrationWarning`. */
const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <NextThemesProvider
            attribute='class'
            themes={THEMES}
            defaultTheme={DEFAULT_THEME}
            storageKey={THEME_STORAGE_KEY}
            enableSystem={false}
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    );
};

export { DEFAULT_THEME, Theme, ThemeProvider, useTheme };

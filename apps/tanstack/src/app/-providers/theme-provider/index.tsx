import type { EnumItem } from '@xenous/typescript/enum';
import { createContext, use, useCallback, useEffect, useState } from 'react';

const Theme = {
    DARK: 'dark',
    LIGHT: 'light',
} as const;

type Theme = EnumItem<typeof Theme>;

const THEMES = Object.values(Theme);

/** Rendered by the server and used until the stored preference is read. */
const DEFAULT_THEME: Theme = Theme.LIGHT;

const THEME_STORAGE_KEY = 'xenous-theme';

/**
 * The server always renders `DEFAULT_THEME`, so a stored preference has to be applied before first
 * paint or the page flashes. Runs in <head> ahead of hydration.
 */
const themeInitScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}'),a=${JSON.stringify(THEMES)};if(a.indexOf(t)>-1){var c=document.documentElement.classList;c.remove.apply(c,a);c.add(t)}}catch(_){}`;

interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const useTheme = () => {
    const context = use(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};

const isTheme = (value: string | null): value is Theme => THEMES.some(theme => theme === value);

/** A stale or hand-edited value falls back to the default instead of reaching the page. */
const readStoredTheme = (): Theme => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    return isTheme(stored) ? stored : DEFAULT_THEME;
};

/**
 * Elements with a color transition would fade to the new theme one by one, so turn transitions off
 * while the classes flip. `getComputedStyle` makes the browser apply the new colors before the style
 * is removed. {@link https://paco.me/writing/disable-theme-transitions}
 */
const withoutTransitions = (apply: () => void) => {
    const style = document.createElement('style');
    style.textContent = '*,*::before,*::after{transition:none!important}';
    document.head.appendChild(style);

    apply();

    window.getComputedStyle(document.body).opacity;
    document.head.removeChild(style);
};

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

    // Adopt the stored preference after hydration, so SSR markup always matches.
    useEffect(() => {
        setThemeState(readStoredTheme());
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        withoutTransitions(() => {
            for (const value of THEMES) root.classList.toggle(value, value === theme);
        });
    }, [theme]);

    // Saved only on an explicit change, never by the mount-time sync above.
    const setTheme = useCallback((next: Theme) => {
        localStorage.setItem(THEME_STORAGE_KEY, next);
        setThemeState(next);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    }, [setTheme, theme]);

    return <ThemeContext value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext>;
};

export { DEFAULT_THEME, Theme, ThemeProvider, themeInitScript, useTheme };

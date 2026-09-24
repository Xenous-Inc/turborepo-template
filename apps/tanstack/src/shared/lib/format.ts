import { getLocale } from '@xenous/i18n';

/** Read the locale per call, or a module-level formatter freezes whatever was current at import. */
export const formatDate = (value: Date, options?: Intl.DateTimeFormatOptions) =>
    value.toLocaleDateString(getLocale(), { year: 'numeric', month: 'short', day: '2-digit', ...options });

export const formatNumber = (value: number, options?: Intl.NumberFormatOptions) =>
    value.toLocaleString(getLocale(), { maximumFractionDigits: 2, ...options });

/** `style` stays out of the options, since changing it would stop this being a percent. */
export const formatPercent = (value: number, options?: Omit<Intl.NumberFormatOptions, 'style'>) =>
    value.toLocaleString(getLocale(), { maximumFractionDigits: 2, ...options, style: 'percent' });

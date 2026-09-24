import { setupLocaleHeaderStrategy } from '@xenous/i18n/strategy';
import { setupZodLocale } from '@xenous/i18n/zod';
import { definePlugin } from 'nitro';

/** Locale resolution, plus the Zod error map that reads it. */
export default definePlugin(() => {
    setupLocaleHeaderStrategy();
    setupZodLocale();
});

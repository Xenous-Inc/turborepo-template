import handler from '@tanstack/react-start/server-entry';
import { paraglideMiddleware } from '@xenous/i18n/server';

/**
 * Runs before React renders, so the whole SSR pass shares one locale.
 *
 * Passes the original `request`, not the middleware's stripped one: TanStack
 * Router already rewrites the URL (see `rewrite` in `router.tsx`), and doing it
 * twice causes a redirect loop.
 */
export default {
    fetch: (request: Request) => paraglideMiddleware(request, () => handler.fetch(request)),
};

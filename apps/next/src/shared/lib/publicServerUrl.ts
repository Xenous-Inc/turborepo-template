'use client';

// `next dev` inlines `ENV` only in 'use client' files, so anywhere else the browser reads undefined.
import { ENV } from 'varlock/env';
import { getPreviewId, withPreviewHost } from './previewHost';

/** Server app URL for the browser. Equals `NEXT_PUBLIC_SERVER_URL`, except on Coolify previews, where it points at the PR's server. */
export const publicServerUrl = withPreviewHost(
    ENV.NEXT_PUBLIC_SERVER_URL,
    getPreviewId(ENV.COOLIFY_PREVIEW, ENV.COOLIFY_URL),
);

import { ENV } from 'varlock/env';
import { getPreviewId, withPreviewHost } from './previewHost';

/** Server app URL for SSR. Equals `SERVER_URL`, except on Coolify previews, where it points at the PR's server. */
export const serverUrl = withPreviewHost(ENV.SERVER_URL, getPreviewId(ENV.COOLIFY_PREVIEW, ENV.COOLIFY_URL));

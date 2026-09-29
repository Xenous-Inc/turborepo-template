import { ENV } from 'varlock/env';

/** Coolify exposes no PR id, so read it off our own URL. Previews are served at `<pr>.<domain>`. */
const previewId = ENV.COOLIFY_PREVIEW ? ENV.COOLIFY_URL?.match(/^(?:https?:\/\/)?(\d+)\./)?.[1] : undefined;

/** The PR's server is served at `<pr>.<server host>`. */
const withPreviewHost = (url: string) => {
    if (!previewId) return url;

    const parsed = new URL(url);
    parsed.hostname = `${previewId}.${parsed.hostname}`;

    return parsed.origin;
};

/** Server app URL for SSR. Equals `SERVER_URL`, except on Coolify previews, where it points at the PR's server. */
export const serverUrl = withPreviewHost(ENV.SERVER_URL);

/** Server app URL for the browser. Equals `NEXT_PUBLIC_SERVER_URL`, except on Coolify previews, where it points at the PR's server. */
export const publicServerUrl = withPreviewHost(ENV.NEXT_PUBLIC_SERVER_URL);

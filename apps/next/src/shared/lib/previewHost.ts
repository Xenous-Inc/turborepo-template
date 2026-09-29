/** Coolify exposes no PR id, so read it off our own URL. Previews are served at `<pr>.<domain>`. */
export const getPreviewId = (isPreview: boolean | undefined, ownUrl: string | undefined) => {
    return isPreview ? ownUrl?.match(/^(?:https?:\/\/)?(\d+)\./)?.[1] : undefined;
};

/** The PR's server is served at `<pr>.<server host>`. */
export const withPreviewHost = (url: string, previewId: string | undefined) => {
    if (!previewId) return url;

    const parsed = new URL(url);
    parsed.hostname = `${previewId}.${parsed.hostname}`;

    return parsed.origin;
};

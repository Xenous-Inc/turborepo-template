import { createHash } from 'node:crypto';
import { ENV } from 'varlock/env';

/** Postgres truncates anything longer, which would silently merge two previews into one database. */
const MAX_IDENTIFIER = 63;

/** Branch names are not identifiers, so `feat/CORS-wildcards` has to become `feat_cors_wildcards`. */
const slugify = (value: string, max: number) => {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_') // every run of characters outside a-z0-9 collapses to a single `_`
        .slice(0, Math.max(max, 0))
        .replace(/^_+|_+$/g, ''); // removes any _ left at the start or end
};

/** 24 bits off the full id, so two branches stay distinct even where the slug had to be cut. */
const fingerprint = (value: string) => createHash('sha256').update(value).digest('hex').slice(0, 6);

/** Names the database `<base>_<slug>_<hash>`, so each preview gets its own. */
const withPreviewDatabase = (databaseUrl: string, previewId: string) => {
    const url = new URL(databaseUrl);
    const base = decodeURIComponent(url.pathname.slice(1));
    const hash = fingerprint(previewId);

    // Two underscores join the parts. Whatever is left over is the slug's budget.
    const slug = slugify(previewId, MAX_IDENTIFIER - base.length - hash.length - 2);

    url.pathname = `/${[base, slug, hash].filter(Boolean).join('_')}`;

    return url.href;
};

// Coolify resolves `${COOLIFY_BRANCH}` against the app's tracked branch, e.g. `pull/2/head:pr-2-coolify`.
const previewId = ENV.COOLIFY_PREVIEW ? ENV.COOLIFY_BRANCH : undefined;

/**
 * Postgres connection string for this deployment. Equals `DATABASE_URL`, except on Coolify
 * previews, where it points at that preview's own database.
 */
export const databaseUrl = previewId ? withPreviewDatabase(ENV.DATABASE_URL, previewId) : ENV.DATABASE_URL;

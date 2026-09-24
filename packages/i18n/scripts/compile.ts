import { watch } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { type CompilerOptions, compile } from '@inlang/paraglide-js';
import { logger } from '@xenous/logger';
import { debounce } from 'perfect-debounce';
import settings from '../project.inlang/settings.json' with { type: 'json' };
import { localeHeaderStrategy } from '../src/header.ts';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Base locale has no prefix, every other locale lives under `/<locale>/`.
// Prefixed patterns go first so the unprefixed base pattern matches last.
const localized: [string, string][] = [
    ...settings.locales
        .filter(locale => locale !== settings.baseLocale)
        .map(locale => [locale, `/${locale}/:path(.*)?`] as [string, string]),
    [settings.baseLocale, '/:path(.*)?'],
];
/**
 * The SDK writes `project.inlang/.gitignore` as `*` plus `!settings.json`, and puts that
 * back whenever the file goes missing or the SDK version moves. Biome's VCS integration
 * drops the negation and then skips settings.json, so the file is only linted on machines
 * where no compile has run yet (biomejs/biome#6340). Naming the generated entries ignores
 * the same paths without a negation, so git and Biome agree. Deleting the file instead
 * doesn't work - the SDK treats a missing one as damage and rewrites it on the next load.
 */
const writeProjectGitignore = () =>
    writeFile(
        resolve(packageRoot, 'project.inlang/.gitignore'),
        ['.gitignore', '.lix/', '.meta.json', 'README.md', 'cache/', 'db.sqlite', 'project_id', ''].join('\n'),
    );

const options: CompilerOptions = {
    project: resolve(packageRoot, 'project.inlang'),
    outdir: resolve(packageRoot, 'src/paraglide'),
    outputStructure: 'message-modules',
    emitTsDeclarations: true,
    cookieName: 'xenous_locale',
    strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
    // Derived from settings.json, so adding a locale there is enough.
    urlPatterns: [{ pattern: '/:path(.*)?', localized }],
    // API routes have no prefix, so they read the locale header instead of the URL.
    // Not `exclude: true` — that pins them to the base locale.
    routeStrategies: [
        { match: '/rpc/:path(.*)?', strategy: [localeHeaderStrategy, 'preferredLanguage', 'baseLocale'] },
        { match: '/api/:path(.*)?', strategy: [localeHeaderStrategy, 'preferredLanguage', 'baseLocale'] },
    ],
};

await compile(options);
await writeProjectGitignore();

if (process.argv.includes('--watch')) {
    const messagesDirectory = resolve(packageRoot, 'messages');

    /**
     * `compile` recreates `src/paraglide`, so two runs at once throw ENOTEMPTY.
     * A timer debounce isn't enough — a compile takes over a second, so an edit
     * landing mid-run starts a second one. `perfect-debounce` waits for the
     * running call, then repeats once if anything changed meanwhile.
     */
    const runCompile = debounce(async () => {
        try {
            await compile(options);
            await writeProjectGitignore();
        } catch (error) {
            logger.withTag('Paraglide').error(error);
        }
    }, 100);

    watch(messagesDirectory, { recursive: true }, () => {
        void runCompile();
    });

    logger.withTag('Paraglide').info('watching messages/');
}

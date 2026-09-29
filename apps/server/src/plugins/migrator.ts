import { db } from '@xenous/db/client';
import { migrate } from '@xenous/db/migrator';
import { ensureDatabase } from '@xenous/db/provision';
import { logger } from '@xenous/logger';
import { definePlugin } from 'nitro';
import { ENV } from 'varlock/env';

export default definePlugin(async () => {
    if (ENV.NODE_ENV !== 'production') return;

    // No-op unless COOLIFY_PREVIEW is set. Must finish before the migrator connects.
    await ensureDatabase();

    logger.withTag('Drizzle').info('Running migrations...');

    try {
        await migrate(db);
    } catch (error) {
        logger.withTag('Drizzle').error('Failed to apply migrations', error);
    } finally {
        logger.withTag('Drizzle').info('Migrations complete');
    }
});

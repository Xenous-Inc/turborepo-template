import { db } from '@xenous/db/client';
import { migrate } from '@xenous/db/migrator';
import { logger } from '@xenous/logger';
import { definePlugin } from 'nitro';
import { ENV } from 'varlock/env';

export default definePlugin(async () => {
    if (ENV.NODE_ENV !== 'production') return;

    logger.withTag('Drizzle').info('Running migrations...');

    try {
        await migrate(db);
    } catch (error) {
        logger.withTag('Drizzle').error('Failed to apply migrations', error);
    } finally {
        logger.withTag('Drizzle').info('Migrations complete');
    }
});

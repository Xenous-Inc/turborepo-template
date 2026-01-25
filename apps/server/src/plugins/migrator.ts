import { db } from '@xenous/db/client';
import { migrate } from '@xenous/db/migrator';
import { logger } from '@xenous/logger';
import { definePlugin } from 'nitro';
import { env } from '~/env';

export default definePlugin(async () => {
    if (env.NODE_ENV !== 'production') return;

    logger.withTag('drizzle').info('running migrations...');

    await migrate(db);

    logger.withTag('drizzle').info('migrations complete');
});

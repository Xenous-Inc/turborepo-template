import { createConsola, LogLevels } from 'consola';
import { isProduction } from 'std-env';

export const logger = createConsola({
    level: isProduction ? LogLevels.info : LogLevels.verbose,
    formatOptions: {
        columns: isProduction ? 80 : undefined,
        colors: true,
        compact: false,
        date: true,
    },
});

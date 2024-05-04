import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import styles from 'ansi-styles';

import { logger } from '@xenous/logger';

import { env } from '../../env';

type ExtendedInternalAxiosRequestConfig<D = unknown> = InternalAxiosRequestConfig<D> & {
    withToken?: boolean;
    isSent?: boolean;
};

export const loggingRequestInterceptorHandlers = [
    (config: ExtendedInternalAxiosRequestConfig) => {
        if (env.NEXT_PUBLIC_HTTP_LOGGING_ENABLED) {
            logger.api.debug(`Fetching ${config.method} ${config.url}`);
        }

        return config;
    },
] as const;

export const loggingResponseInterceptorHandlers = [
    (response: AxiosResponse) => {
        if (env.NEXT_PUBLIC_HTTP_LOGGING_ENABLED) {
            logger.api.debug(
                `${styles.green.open}Succeed ${response.config.method} ${response.config.url} with ${styles.green.close}`,
                response
            );
        }

        return response;
    },
    (error?: AxiosError) => {
        if (env.NEXT_PUBLIC_HTTP_LOGGING_ENABLED) {
            logger.api.debug(
                `${styles.red.open}Failed ${error?.config?.method} ${error?.config?.url} with ${styles.red.close}`,
                error
            );
        }

        throw error;
    },
] as const;

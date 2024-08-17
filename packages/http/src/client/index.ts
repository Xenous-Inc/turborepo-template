import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { env } from '../../env';
import {
    loggingRequestInterceptorHandlers,
    loggingResponseInterceptorHandlers,
    transformErrorResponseInterceptorHandlers,
} from '../interceptors';

export type HttpRequestConfig<D = any> = AxiosRequestConfig<D>;

export const http = axios.create({
    baseURL: env.NEXT_PUBLIC_HTTP_URL,
    validateStatus: status => status >= 200 && status <= 302,
});

http.interceptors.request.use(...loggingRequestInterceptorHandlers);

http.interceptors.response.use(...transformErrorResponseInterceptorHandlers);
http.interceptors.response.use(...loggingResponseInterceptorHandlers);

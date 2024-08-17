import { AxiosError, isAxiosError } from 'axios';

export const HttpStatus = {
    Unathorized: 401,
    InternalServerError: 500,
} as const;

export type HttpStatusType = (typeof HttpStatus)[keyof typeof HttpStatus];

export class HttpError<T = unknown, D = any> extends AxiosError<T, D> {
    constructor(error?: Partial<AxiosError>) {
        // @ts-expect-error
        super(error?.message, error?.code, error?.config, error?.request, error?.response);

        this.status = error?.status ?? error?.response?.status;
    }
}

export const isHttpError = <T = any, D = any>(payload: any): payload is HttpError<T, D> => {
    return isAxiosError(payload) && payload instanceof HttpError;
};

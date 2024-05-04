import { AxiosError } from 'axios';

export const HttpStatus = {
    Unathorized: 401,
    InternalServerError: 500,
} as const;

export type HttpStatusType = (typeof HttpStatus)[keyof typeof HttpStatus];

export class HttpError extends AxiosError {
    constructor(error?: Partial<AxiosError>) {
        super(error?.message, error?.code, error?.config, error?.request, error?.response);

        this.status = error?.status;
    }
}

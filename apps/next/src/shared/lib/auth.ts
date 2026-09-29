import { createAuthClient } from 'better-auth/react';
import { publicServerUrl } from './serverUrl';

export const authClient = createAuthClient({
    baseURL: publicServerUrl,
});

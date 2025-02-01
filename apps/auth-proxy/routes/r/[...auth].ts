import { Auth } from '@auth/core';
import Discord from '@auth/core/providers/discord';
import { eventHandler, toWebRequest } from 'h3';
import { env } from '~/env';

export default eventHandler(async event =>
    Auth(toWebRequest(event), {
        basePath: '/r',
        secret: env.AUTH_SECRET,
        trustHost: !!env.VERCEL,
        redirectProxyUrl: env.AUTH_REDIRECT_PROXY_URL,
        providers: [
            Discord({
                clientId: env.AUTH_DISCORD_ID,
                clientSecret: env.AUTH_DISCORD_SECRET,
            }),
        ],
    })
);

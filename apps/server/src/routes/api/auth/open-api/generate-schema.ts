import { defineRouteMeta } from 'nitro';
import { defineHandler } from 'nitro/h3';
import { auth } from '~/utils/auth';

defineRouteMeta({
    openAPI: {
        tags: ['OpenAPI'],
        description: 'Auth OpenAPI Schema',
    },
});

export default defineHandler(event => {
    return auth.handler(event.req);
});

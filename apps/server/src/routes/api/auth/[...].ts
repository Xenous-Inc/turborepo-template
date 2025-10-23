import { defineHandler } from 'nitro/h3';
import { auth } from '~/utils/auth';

export default defineHandler(event => {
    return auth.handler(event.req);
});

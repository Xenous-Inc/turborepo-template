import { defineMiddleware } from 'nitro/h3';
import { createNitroContext } from '~/utils/context';

export default defineMiddleware(async event => {
    const context = await createNitroContext({ event });

    for (const [key, value] of Object.entries(context)) {
        event.context[key] = value;
    }
});

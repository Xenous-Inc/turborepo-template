import { defineHandler, html } from 'nitro/h3';

export default defineHandler(() => {
    // https://guides.scalar.com/scalar/scalar-api-references/configuration#configuration__configuration-options
    const config = {
        pathRouting: {
            basePath: '/api/docs',
        },
        sources: [
            {
                title: 'Default',
                slug: 'default',
                url: '/api/docs/openapi.json',
            },
            {
                title: 'Auth',
                slug: 'auth',
                url: '/api/auth/open-api/generate-schema',
            },
            {
                title: 'RPC',
                slug: 'rpc',
                url: '/rpc/docs/openapi.json',
            },
        ],
        theme: 'saturn', // saturn | kepler
        defaultOpenAllTags: true,
    };

    return html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">

                <title>Xenous | Scalar</title>

                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body>
                <div id="root"></div>
                <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
                <script>
                    Scalar.createApiReference('#root', ${JSON.stringify(config)});
                </script>
            </body>
        </html>
    `;
});

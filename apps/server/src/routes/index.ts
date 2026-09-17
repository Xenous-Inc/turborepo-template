import { defineHandler, html } from 'nitro/h3';
import { ENV } from 'varlock/env';

export default defineHandler(() => {
    return html`
        <meta charset="utf-8">
        <h1>This is your brand new Nitro project 🚀 </h1>
        <p>Get started by editing the <code>server/routes/index.ts</code> file.</p>
        <p>Learn more from 📖 <a href="https://nitro.build/guide" target="_blank">Nitro Documentation</a></p>
        <p>If you want to check for docs, you can check for <a href="/api/docs">Scalar client</a></p>
        <p>${ENV.NODE_ENV}</p>
    `;
});

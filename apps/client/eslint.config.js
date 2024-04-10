import baseConfig from '@xenous/eslint-config/base';
import nextjsConfig from '@xenous/eslint-config/nextjs';
import reactConfig from '@xenous/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
    {
        ignores: ['.next/**'],
    },
    ...baseConfig,
    ...reactConfig,
    ...nextjsConfig,
];

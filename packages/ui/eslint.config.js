import baseConfig from '@xenous/eslint-config/base';
import reactConfig from '@xenous/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
    {
        ignores: [],
    },
    ...baseConfig,
    ...reactConfig,
];

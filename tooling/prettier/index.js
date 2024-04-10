import { fileURLToPath } from 'url';

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
    quoteProps: 'consistent',
    bracketSameLine: false,
    jsxSingleQuote: true,
    bracketSpacing: true,
    trailingComma: 'es5',
    arrowParens: 'avoid',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
    semi: true,

    plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
    tailwindConfig: fileURLToPath(new URL('../../tooling/tailwind/web.ts', import.meta.url)),
    tailwindFunctions: ['cn', 'cva'],
    importOrder: [
        '<TYPES>',
        '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
        '^(next/(.*)$)|^(next$)',
        '^(expo(.*)$)|^(expo$)',
        '<THIRD_PARTY_MODULES>',
        '',
        '<TYPES>^@acme',
        '^@acme/(.*)$',
        '',
        '<TYPES>^[.|..|~]',
        '^~/',
        '^[../]',
        '^[./]',
    ],
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderTypeScriptVersion: '4.4.0',
};

export default config;

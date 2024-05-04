import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import animate from 'tailwindcss-animate';

import base from './base';

export default {
    content: base.content,
    presets: [base],
    theme: {},
    plugins: [animate, forms],
} satisfies Config;

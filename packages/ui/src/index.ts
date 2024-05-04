import { cx } from 'class-variance-authority';

const cn = (...inputs: Parameters<typeof cx>) => cx(inputs);

export { cn };

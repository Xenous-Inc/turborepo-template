import 'react';

/**
 * Expand dom type definition to add data-icon possible values hint
 *
 * This is used to use correct spacing when icons are used
 */

declare module 'react' {
    interface DOMAttributes<T> {
        'data-icon'?:
            | 'inline-start'
            | 'inline-end'
            | (string & {})
            | number
            | boolean
            | bigint
            | symbol
            | null
            | undefined;
    }
}

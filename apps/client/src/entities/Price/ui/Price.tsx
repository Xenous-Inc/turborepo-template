import { memo } from 'react';

import type { PropsOf } from '~/shared/lib';
import { formatPrice } from '../helpers/formatPrice';

type PriceProps = Omit<PropsOf<'span'>, 'children'> & { children?: number | null; withoutCurrency?: boolean };

export default memo(({ children, withoutCurrency, ...props }: PriceProps) => {
    return <span {...props}>{formatPrice(children ?? 0, !withoutCurrency)}</span>;
});

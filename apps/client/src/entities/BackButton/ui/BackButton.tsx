'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@xenous/ui/button';

import type { PropsOf } from '~/shared/lib';

type BackButtonProps = Omit<PropsOf<typeof Button>, 'onPress'>;

export default (props: BackButtonProps) => {
    const router = useRouter();

    return <Button {...props} onPress={() => router.back()} />;
};

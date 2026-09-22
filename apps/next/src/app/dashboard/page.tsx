'use client';

import { useQuery } from '@tanstack/react-query';
import { orpc } from '~/orpc';
import { authClient } from '~/shared/lib/auth';

export default () => {
    const { data: session, isPending } = authClient.useSession();

    const privateData = useQuery(orpc.privateData.queryOptions());

    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {session?.user.name}</p>
            <p>privateData: {privateData.data?.message}</p>
        </div>
    );
};

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { m } from '@xenous/i18n/messages';
import { orpc } from '~/orpc';
import { authClient } from '~/shared/lib/auth';

export const Route = createFileRoute('/dashboard/')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: session, isPending } = authClient.useSession();

    const privateData = useQuery(orpc.privateData.queryOptions());

    if (isPending) {
        return <div>{m.tidy_ember_lamp()}</div>;
    }

    return (
        <div>
            <h1>{m.amber_socket_kite()}</h1>
            <p>{m.ivory_lantern_urn({ name: session?.user.name ?? '' })}</p>
            <p>
                {m.humble_iris_willow()}: {privateData.data?.message}
            </p>
        </div>
    );
}

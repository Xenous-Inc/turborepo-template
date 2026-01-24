import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { orpc } from '~/orpc';

export const Route = createFileRoute('/todos/')({
    component: RouteComponent,
    loader: ({ context }) => context.queryClient.ensureQueryData(context.orpc.todo.getAll.queryOptions()),
});

function RouteComponent() {
    const { data } = useSuspenseQuery(orpc.todo.getAll.queryOptions());

    return (
        <ul>
            {data.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    );
}

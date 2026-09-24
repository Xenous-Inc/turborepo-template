import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { m } from '@xenous/i18n/messages';
import { cn } from '@xenous/ui/lib/utils';
import { orpc } from '~/orpc';

export const Route = createFileRoute('/')({
    component: App,
});

const TITLE_TEXT = `
██╗  ██╗███████╗███╗   ██╗ ██████╗ ██╗   ██╗███████╗
╚██╗██╔╝██╔════╝████╗  ██║██╔═══██╗██║   ██║██╔════╝
 ╚███╔╝ █████╗  ██╔██╗ ██║██║   ██║██║   ██║███████╗
 ██╔██╗ ██╔══╝  ██║╚██╗██║██║   ██║██║   ██║╚════██║
██╔╝ ██╗███████╗██║ ╚████║╚██████╔╝╚██████╔╝███████║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚══════╝

███╗   ███╗ ██████╗ ███╗   ██╗ ██████╗ ██████╗ ███████╗██████╗  ██████╗
████╗ ████║██╔═══██╗████╗  ██║██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔═══██╗
██╔████╔██║██║   ██║██╔██╗ ██║██║   ██║██████╔╝█████╗  ██████╔╝██║   ██║
██║╚██╔╝██║██║   ██║██║╚██╗██║██║   ██║██╔══██╗██╔══╝  ██╔═══╝ ██║   ██║
██║ ╚═╝ ██║╚██████╔╝██║ ╚████║╚██████╔╝██║  ██║███████╗██║     ╚██████╔╝
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝
 `;

function App() {
    const healthCheck = useQuery(orpc.healthCheck.queryOptions());

    return (
        <div className='container mx-auto max-w-3xl px-4 py-2'>
            <pre className='overflow-x-auto pb-0.5 font-mono leading-none tracking-tighter'>{TITLE_TEXT}</pre>
            <div className='grid gap-6'>
                <section className='rounded-lg border p-4'>
                    <h2 className='mb-2 font-medium'>{m.mellow_kettle_finch()}</h2>
                    <div className='flex items-center gap-2'>
                        <div className={cn('size-2 rounded-full', healthCheck.data ? 'bg-green-500' : 'bg-red-500')} />
                        <span className='text-muted-foreground text-sm'>
                            {healthCheck.isLoading
                                ? m.gentle_juniper_coral()
                                : healthCheck.data
                                  ? m.vivid_grove_tide()
                                  : m.tidy_umbra_lamp()}
                        </span>
                    </div>
                </section>
            </div>
        </div>
    );
}

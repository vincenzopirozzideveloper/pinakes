import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { queryKeys } from '@/shared/api/queryKeys';
import { PublicLayout } from '@/app/layouts/PublicLayout';
import { MaturityBadge, type MaturityStage } from '@/features/content/components/MaturityBadge';
import { Link } from '@tanstack/react-router';
import { formatDate } from '@/lib/utils';

interface GardenNote {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  maturity: MaturityStage;
  tags: string[];
  published_at: string;
}

async function fetchGarden(workspace: string): Promise<GardenNote[]> {
  const { data } = await api.get<{ data: GardenNote[] }>(`/g/${workspace}`);
  return data.data;
}

export const Route = createFileRoute('/g/$workspace/')({
  component: GardenIndexPage,
});

function GardenIndexPage() {
  const { workspace } = Route.useParams();

  const { data: notes, isPending, isError } = useQuery({
    queryKey: queryKeys.publicGarden(workspace),
    queryFn: () => fetchGarden(workspace),
  });

  return (
    <PublicLayout>
      <div className="container mx-auto max-w-content px-4 py-12">
        <header className="mb-10">
          <h1 className="font-serif text-4xl font-semibold mb-2 capitalize">{workspace}</h1>
          <p className="text-text-secondary text-sm">Giardino digitale pubblico.</p>
        </header>

        {isPending && (
          <p className="text-text-secondary text-sm">Caricamento...</p>
        )}

        {isError && (
          <p className="text-destructive text-sm">Impossibile caricare il giardino.</p>
        )}

        {notes && notes.length === 0 && (
          <p className="text-text-secondary text-sm">Nessuna nota pubblicata ancora.</p>
        )}

        {notes && notes.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <li key={note.id}>
                <Link
                  to="/g/$workspace/$slug"
                  params={{ workspace, slug: note.slug }}
                  className="block rounded-lg border border-border bg-bg-secondary p-5 hover:border-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="font-serif font-medium text-text-primary leading-snug flex-1">
                      {note.title}
                    </h2>
                    <MaturityBadge stage={note.maturity} />
                  </div>
                  {note.excerpt && (
                    <p className="text-sm text-text-secondary line-clamp-2 mb-3">{note.excerpt}</p>
                  )}
                  <time className="text-xs text-text-muted">{formatDate(note.published_at)}</time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PublicLayout>
  );
}

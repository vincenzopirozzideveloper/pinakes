import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { queryKeys } from '@/shared/api/queryKeys';
import { PublicLayout } from '@/app/layouts/PublicLayout';
import { MaturityBadge, type MaturityStage } from '@/features/content/components/MaturityBadge';
import { RenderedContent } from '@/features/content/components/RenderedContent';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface PublicNote {
  id: number;
  title: string;
  slug: string;
  body_html: string;
  excerpt: string | null;
  maturity: MaturityStage;
  tags: string[];
  published_at: string;
  updated_at: string;
}

async function fetchPublicNote(workspace: string, slug: string): Promise<PublicNote> {
  const { data } = await api.get<{ data: PublicNote }>(`/g/${workspace}/${slug}`);
  return data.data;
}

export const Route = createFileRoute('/g/$workspace/$slug')({
  component: PublicNotePage,
});

function PublicNotePage() {
  const { workspace, slug } = Route.useParams();

  const { data: note, isPending, isError } = useQuery({
    queryKey: queryKeys.publicContent(workspace, slug),
    queryFn: () => fetchPublicNote(workspace, slug),
  });

  return (
    <PublicLayout>
      <article className="container mx-auto max-w-prose px-4 py-12">
        <Link
          to="/g/$workspace/"
          params={{ workspace }}
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Torna al giardino
        </Link>

        {isPending && (
          <p className="text-text-secondary text-sm">Caricamento...</p>
        )}

        {isError && (
          <p className="text-destructive text-sm">Nota non trovata o non accessibile.</p>
        )}

        {note && (
          <>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <MaturityBadge stage={note.maturity} />
                <time className="text-xs text-text-muted">
                  Aggiornato il {formatDate(note.updated_at)}
                </time>
              </div>
              <h1 className="font-serif text-4xl font-semibold leading-tight mb-3">
                {note.title}
              </h1>
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block text-xs px-2 py-0.5 rounded-full bg-bg-secondary border border-border text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <RenderedContent html={note.body_html} />
          </>
        )}
      </article>
    </PublicLayout>
  );
}

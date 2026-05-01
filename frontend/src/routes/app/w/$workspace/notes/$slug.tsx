import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { queryKeys } from '@/shared/api/queryKeys';
import type { MaturityStage } from '@/features/content/components/MaturityBadge';
import { MaturityBadge } from '@/features/content/components/MaturityBadge';
import { RenderedContent } from '@/features/content/components/RenderedContent';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Pencil } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NoteDetail {
  id: number;
  title: string;
  slug: string;
  body_html: string;
  excerpt: string | null;
  maturity: MaturityStage;
  is_public: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

async function fetchNote(workspace: string, slug: string): Promise<NoteDetail> {
  const { data } = await api.get<{ data: NoteDetail }>(`/workspaces/${workspace}/notes/${slug}`);
  return data.data;
}

export const Route = createFileRoute('/app/w/$workspace/notes/$slug')({
  component: NoteDetailPage,
});

function NoteDetailPage() {
  const { workspace, slug } = Route.useParams();

  const { data: note, isPending, isError } = useQuery({
    queryKey: queryKeys.note(workspace, slug),
    queryFn: () => fetchNote(workspace, slug),
  });

  return (
    <div className="max-w-prose">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/app/w/$workspace/notes"
          params={{ workspace }}
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Torna alle note
        </Link>
        {note && (
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Pencil className="size-3.5" />
            Modifica
          </Button>
        )}
      </div>

      {isPending && <p className="text-text-secondary text-sm">Caricamento nota...</p>}

      {isError && <p className="text-destructive text-sm">Nota non trovata.</p>}

      {note && (
        <>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <MaturityBadge stage={note.maturity} />
              <time className="text-xs text-text-muted">
                Aggiornato il {formatDate(note.updated_at)}
              </time>
            </div>
            <h1 className="font-serif text-4xl font-semibold leading-tight mb-3">{note.title}</h1>
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
    </div>
  );
}

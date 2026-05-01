import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { queryKeys } from '@/shared/api/queryKeys';
import type { MaturityStage } from '@/features/content/components/MaturityBadge';
import { MaturityBadge } from '@/features/content/components/MaturityBadge';
import { Link } from '@tanstack/react-router';
import { formatDate } from '@/lib/utils';
import { FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoteListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  maturity: MaturityStage;
  is_public: boolean;
  updated_at: string;
}

async function fetchNotes(workspace: string): Promise<NoteListItem[]> {
  const { data } = await api.get<{ data: NoteListItem[] }>(`/workspaces/${workspace}/notes`);
  return data.data;
}

export const Route = createFileRoute('/app/w/$workspace/notes/')({
  component: NotesIndexPage,
});

function NotesIndexPage() {
  const { workspace } = Route.useParams();

  const { data: notes, isPending, isError } = useQuery({
    queryKey: queryKeys.notes(workspace),
    queryFn: () => fetchNotes(workspace),
  });

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-semibold">Note</h1>
        <Button size="sm" className="gap-1.5">
          <FilePlus className="size-4" />
          Nuova nota
        </Button>
      </div>

      {isPending && <p className="text-text-secondary text-sm">Caricamento note...</p>}

      {isError && <p className="text-destructive text-sm">Impossibile caricare le note.</p>}

      {notes && notes.length === 0 && (
        <div className="text-center py-16 text-text-secondary">
          <p className="mb-2 text-sm">Nessuna nota ancora.</p>
          <p className="text-xs">Crea la tua prima nota per iniziare.</p>
        </div>
      )}

      {notes && notes.length > 0 && (
        <ul className="divide-y divide-border">
          {notes.map((note) => (
            <li key={note.id}>
              <Link
                to="/app/w/$workspace/notes/$slug"
                params={{ workspace, slug: note.slug }}
                className="flex items-start justify-between gap-4 py-4 hover:bg-bg-secondary rounded-md px-2 -mx-2 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium font-serif text-text-primary truncate">{note.title}</p>
                  {note.excerpt && (
                    <p className="text-sm text-text-secondary line-clamp-1 mt-0.5">{note.excerpt}</p>
                  )}
                  <time className="text-xs text-text-muted mt-1 block">
                    {formatDate(note.updated_at)}
                  </time>
                </div>
                <MaturityBadge stage={note.maturity} className="shrink-0 mt-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

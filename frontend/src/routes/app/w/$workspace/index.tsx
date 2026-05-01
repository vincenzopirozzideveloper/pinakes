import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { queryKeys } from '@/shared/api/queryKeys';
import type { Workspace } from '@/features/workspace/types/Workspace';
import { BookOpen, Tag, Globe, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';

async function fetchWorkspace(slug: string): Promise<Workspace> {
  const { data } = await api.get<{ data: Workspace }>(`/workspaces/${slug}`);
  return data.data;
}

export const Route = createFileRoute('/app/w/$workspace/')({
  component: WorkspaceDashboard,
});

function VisibilityBadge({ visibility }: { visibility: Workspace['visibility'] }) {
  if (visibility === 'public') {
    return (
      <Badge variant="outline" className="gap-1 text-emerald-700 border-emerald-300">
        <Globe className="size-3" /> Pubblico
      </Badge>
    );
  }
  if (visibility === 'unlisted') {
    return (
      <Badge variant="outline" className="gap-1 text-amber-700 border-amber-300">
        <Globe className="size-3" /> Non listato
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="gap-1 text-muted-foreground">
      <Lock className="size-3" /> Privato
    </Badge>
  );
}

function WorkspaceDashboard() {
  const { workspace: slug } = Route.useParams();

  const { data: workspace, isPending, isError } = useQuery({
    queryKey: queryKeys.workspace(slug),
    queryFn: () => fetchWorkspace(slug),
  });

  if (isPending) {
    return <p className="text-text-secondary text-sm">Caricamento workspace...</p>;
  }

  if (isError) {
    return <p className="text-destructive text-sm">Workspace non trovato o non accessibile.</p>;
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold mb-1">{workspace.name}</h1>
          {workspace.description && (
            <p className="text-text-secondary text-sm">{workspace.description}</p>
          )}
        </div>
        <VisibilityBadge visibility={workspace.visibility} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary flex items-center gap-1.5">
              <BookOpen className="size-4" /> Note
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold font-serif">{workspace.notes_count}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary flex items-center gap-1.5">
              <Tag className="size-4" /> Tag
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold font-serif">--</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Link
          to="/app/w/$workspace/notes"
          params={{ workspace: slug }}
          className="text-sm text-accent hover:underline underline-offset-4"
        >
          Vai alle note
        </Link>
        {workspace.visibility === 'public' && (
          <Link
            to="/g/$workspace/"
            params={{ workspace: slug }}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Vedi giardino pubblico
          </Link>
        )}
      </div>
    </div>
  );
}

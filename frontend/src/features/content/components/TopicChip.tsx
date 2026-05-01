import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

type TopicChipProps = {
  name: string;
  slug: string;
  count?: number;
  workspace: string;
  className?: string;
};

export function TopicChip({ name, slug, count, workspace, className }: TopicChipProps) {
  return (
    <Link
      to="/g/$workspace/$slug"
      params={{ workspace, slug }}
      className={cn(
        'block bg-surface-card hover:bg-surface-strong border border-hairline p-4 transition-colors no-underline',
        className
      )}
    >
      <p className="text-title-sm text-ink mb-1">{name}</p>
      {count != null && (
        <p className="text-caption text-muted">{count} {count === 1 ? 'contenuto' : 'contenuti'}</p>
      )}
    </Link>
  );
}

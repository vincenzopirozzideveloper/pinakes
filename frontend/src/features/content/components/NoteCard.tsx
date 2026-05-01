import { Link } from '@tanstack/react-router';
import { FileText, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MaturityBadge, type MaturityStage } from './MaturityBadge';

export type ContentType = 'note' | 'bookmark';

const contentTypeIcons: Record<ContentType, React.FC<{ size?: number; className?: string }>> = {
  note: FileText,
  bookmark: Bookmark,
};

const contentTypeLabels: Record<ContentType, string> = {
  note: 'NOTA',
  bookmark: 'BOOKMARK',
};

type NoteCardProps = {
  title: string;
  excerpt?: string | null;
  slug: string;
  workspace: string;
  type: ContentType;
  maturity: MaturityStage;
  topics?: string[];
  readTime?: number;
  coverImage?: string | null;
  publishedAt?: string | null;
  className?: string;
};

export function NoteCard({
  title,
  excerpt,
  slug,
  workspace,
  type,
  maturity,
  readTime,
  coverImage,
  publishedAt,
  className,
}: NoteCardProps) {
  const TypeIcon = contentTypeIcons[type];

  return (
    <Link
      to="/g/$workspace/$slug"
      params={{ workspace, slug }}
      className={cn(
        'group block bg-canvas hover:bg-surface-soft transition-colors',
        className
      )}
    >
      {/* Photo plate */}
      <div className="aspect-[16/10] bg-surface-card overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <TypeIcon size={48} className="text-muted-soft" />
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-label-uppercase text-muted">
            {contentTypeLabels[type]}
          </p>
          <span className="text-muted" aria-hidden>·</span>
          <MaturityBadge maturity={maturity} />
        </div>

        <h3 className="text-title-md text-ink mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {excerpt && (
          <p className="text-body-sm text-body line-clamp-2 mb-4">
            {excerpt}
          </p>
        )}

        <div className="flex items-center justify-between">
          <p className="text-caption text-muted">
            {publishedAt && new Date(publishedAt).toLocaleDateString('it-IT')}
            {readTime && publishedAt && ' · '}
            {readTime && `${readTime} min`}
          </p>
          <span className="text-label-uppercase text-ink group-hover:text-primary transition-colors">
            LEGGI ›
          </span>
        </div>
      </div>
    </Link>
  );
}

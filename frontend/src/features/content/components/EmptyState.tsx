import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type EmptyStateProps = {
  title: string;
  description?: string;
  image?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyState({
  title,
  description,
  image,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-16 px-6',
        className
      )}
    >
      <div className="max-w-md w-full flex flex-col items-center gap-6">
        {image && (
          <img
            src={image}
            alt=""
            className="w-48 h-48 object-contain"
            aria-hidden
          />
        )}

        <div className="flex flex-col gap-2">
          <h3 className="text-title-lg text-ink">{title}</h3>
          {description && (
            <p className="text-body-sm text-muted">{description}</p>
          )}
        </div>

        {actionLabel && onAction && (
          <Button variant="primary" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

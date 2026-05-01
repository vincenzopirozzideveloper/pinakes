import { cn } from '@/lib/utils';

type CategoryTabProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function CategoryTab({ label, active = false, onClick, className }: CategoryTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'inline-flex items-center text-label-uppercase pb-2 transition-colors cursor-pointer',
        'border-b-2 rounded-none',
        active
          ? 'text-ink border-ink'
          : 'text-muted border-transparent hover:text-ink',
        className
      )}
    >
      {label}
    </button>
  );
}

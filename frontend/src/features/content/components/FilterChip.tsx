import { cn } from '@/lib/utils';

type FilterChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function FilterChip({ label, active = false, onClick, className }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center text-caption px-3.5 py-2 border rounded-none transition-colors cursor-pointer',
        active
          ? 'bg-ink text-on-dark border-ink'
          : 'bg-canvas text-ink border-hairline-strong hover:border-ink',
        className
      )}
    >
      {label}
    </button>
  );
}

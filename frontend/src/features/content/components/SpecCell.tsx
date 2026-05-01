import { cn } from '@/lib/utils';

type SpecCellProps = {
  value: string | number;
  label: string;
  divided?: boolean;
  className?: string;
};

export function SpecCell({ value, label, divided = false, className }: SpecCellProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        divided && 'border-t border-hairline pt-4',
        className
      )}
    >
      <span className="text-display-sm text-ink">{value}</span>
      <span className="text-label-uppercase text-muted">{label}</span>
    </div>
  );
}

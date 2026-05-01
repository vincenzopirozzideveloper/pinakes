import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  isPending?: boolean;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, isPending, className }: StatCardProps) {
  return (
    <Card
      className={cn(
        'relative bg-surface-1 border border-hairline rounded-lg p-6 flex flex-col gap-3 overflow-hidden',
        className
      )}
    >
      <div className="absolute top-4 right-4 text-ink-subtle">
        <Icon className="size-4" />
      </div>

      <p
        className="text-[0.6875rem] font-sans font-semibold tracking-[0.1em] uppercase text-ink-muted"
      >
        {label}
      </p>

      {isPending ? (
        <div className="h-9 w-16 rounded bg-hairline animate-pulse" />
      ) : (
        <p
          className="font-serif text-[2.125rem] font-semibold leading-[1.15] tracking-[-0.015em] text-ink"
        >
          {value}
        </p>
      )}
    </Card>
  );
}

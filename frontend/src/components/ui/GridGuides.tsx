import { cn } from '@/lib/utils';

type GridGuidesProps = {
  columns?: number;
  className?: string;
};

export function GridGuides({ columns = 12, className }: GridGuidesProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute inset-0 pointer-events-none select-none',
        className
      )}
    >
      <div
        className="w-full h-full"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="h-full"
            style={{
              borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

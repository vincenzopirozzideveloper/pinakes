import { cn } from '@/lib/utils';

type CoordinateTicksProps = {
  labels?: string[];
  top?: number;
  className?: string;
};

const DEFAULT_LABELS = ['0', '8', '16', '24', '32'];

export function CoordinateTicks({
  labels = DEFAULT_LABELS,
  top = 0,
  className,
}: CoordinateTicksProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute left-0 right-0 flex items-center h-[40px] pointer-events-none select-none',
        className
      )}
      style={{ top }}
    >
      <div className="w-full flex justify-between px-0">
        {labels.map((label, i) => (
          <span
            key={i}
            className="font-mono text-[10px] text-[#404040] leading-none"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

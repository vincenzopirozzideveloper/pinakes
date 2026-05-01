import { cn } from '@/lib/utils';

type NavChipTopProps = {
  label: string;
  className?: string;
};

export function NavChipTop({ label, className }: NavChipTopProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-[9999px] px-4 py-1.5',
        'bg-[#1a1a1a] border border-[rgba(255,255,255,0.14)]',
        'text-[12px] text-[#d4d4d4] leading-none select-none',
        className
      )}
    >
      <span className="flex items-center gap-1">
        <span className="inline-block w-[6px] h-[6px] rounded-full bg-[#ffffff] opacity-90" />
        <span className="inline-block w-[6px] h-[6px] rounded-full bg-[#ffffff] opacity-55" />
      </span>
      {label}
    </span>
  );
}

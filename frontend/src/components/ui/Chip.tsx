import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChipVariant = 'default' | 'removable' | 'selected';

type ChipProps = {
  variant?: ChipVariant;
  onRemove?: () => void;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'span'>, 'children'> & { children: ReactNode };

const variants: Record<ChipVariant, string> = {
  default:
    'bg-[#1a1a1a] text-[#a3a3a3] border border-[rgba(255,255,255,0.10)]',
  removable:
    'bg-[#1a1a1a] text-[#a3a3a3] border border-[rgba(255,255,255,0.10)]',
  selected:
    'bg-[#ffffff] text-[#0a0a0a] border border-[#ffffff]',
};

export function Chip({
  variant = 'default',
  onRemove,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[9999px] px-3 py-1 text-[13px] leading-none select-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
      {variant === 'removable' && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center justify-center rounded-full w-3.5 h-3.5 hover:text-[#e5e5e5] transition-colors"
          aria-label="Remove"
        >
          <X size={11} strokeWidth={1.5} />
        </button>
      )}
    </span>
  );
}

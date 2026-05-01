import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TagMaturity = 'SEEDLING' | 'BUDDING' | 'EVERGREEN';

type TagProps = {
  children?: ReactNode;
  maturity?: TagMaturity;
  className?: string;
} & ComponentPropsWithoutRef<'span'>;

const maturityColors: Record<TagMaturity, string> = {
  SEEDLING: 'text-[#a3a3a3]',
  BUDDING: 'text-[#d4b483]',
  EVERGREEN: 'text-[#86d4a3]',
};

export function Tag({ children, maturity, className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[6px] px-2 py-0.5',
        'bg-[#1a1a1a] border border-[rgba(255,255,255,0.10)]',
        'text-[11px] font-mono uppercase tracking-[0.08em] leading-none',
        maturity ? maturityColors[maturity] : 'text-[#a3a3a3]',
        className
      )}
      {...props}
    >
      {children ?? maturity}
    </span>
  );
}

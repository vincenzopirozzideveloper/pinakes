import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<'span'>;

export function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[6px] px-2 py-1',
        'bg-[#1a1a1a] border border-[rgba(255,255,255,0.10)]',
        'font-mono text-[11px] uppercase tracking-[0.08em] leading-none',
        'text-[#a3a3a3]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

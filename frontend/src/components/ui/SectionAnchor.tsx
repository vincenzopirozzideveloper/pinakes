import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionAnchorProps = {
  children?: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<'div'>;

export function SectionAnchor({ children, className, ...props }: SectionAnchorProps) {
  return (
    <div
      className={cn(
        'font-mono text-[11px] uppercase tracking-[0.12em] leading-none',
        'text-[#525252] mb-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

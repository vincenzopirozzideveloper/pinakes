import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TextLinkProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<'a'>;

export function TextLink({ children, className, ...props }: TextLinkProps) {
  return (
    <a
      className={cn(
        'text-label-uppercase text-ink hover:text-primary transition no-underline border-b-0',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

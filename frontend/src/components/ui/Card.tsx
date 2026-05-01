import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'interactive' | 'elevated';

type CardProps = {
  variant?: CardVariant;
  header?: ReactNode;
  footer?: ReactNode;
  badge?: ReactNode;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

const variants: Record<CardVariant, string> = {
  default:
    'bg-[#111111] border border-[rgba(255,255,255,0.08)]',
  interactive:
    'bg-[#111111] border border-[rgba(255,255,255,0.08)] cursor-pointer transition-colors duration-150 hover:bg-[#1a1a1a] hover:border-[rgba(255,255,255,0.18)]',
  elevated:
    'bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)]',
};

export function Card({
  variant = 'default',
  header,
  footer,
  badge,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn('relative rounded-[12px] p-7', variants[variant], className)}
      {...props}
    >
      {badge && (
        <div className="absolute top-4 right-4">
          {badge}
        </div>
      )}
      {header && (
        <div className="mb-4">
          {header}
        </div>
      )}
      {children}
      {footer && (
        <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
          {footer}
        </div>
      )}
    </div>
  );
}

import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type StatProps = {
  value: ReactNode;
  label: string;
  className?: string;
} & ComponentPropsWithoutRef<'div'>;

export function Stat({ value, label, className, ...props }: StatProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        className
      )}
      {...props}
    >
      <span className="text-[64px] font-bold text-[#ffffff] leading-none tracking-tight">
        {value}
      </span>
      <span className="text-[12px] text-[#737373] leading-snug">
        {label}
      </span>
    </div>
  );
}

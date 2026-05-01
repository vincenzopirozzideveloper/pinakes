import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'text-link';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[#ffffff] text-[#0a0a0a] font-semibold hover:bg-[#e5e5e5] active:bg-[#d4d4d4]',
  secondary:
    'bg-[#1a1a1a] text-[#e5e5e5] border border-[rgba(255,255,255,0.12)] hover:bg-[#242424] hover:border-[rgba(255,255,255,0.22)]',
  'text-link':
    'bg-transparent text-[#737373] hover:text-[#e5e5e5] px-0 lowercase gap-1 after:content-["→"]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-6 py-2.5 text-[14px]',
  lg: 'px-8 py-3 text-[15px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft: IconLeft,
  iconRight: IconRight,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-[9999px] transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:pointer-events-none select-none whitespace-nowrap';

  return (
    <button
      className={cn(
        base,
        variants[variant],
        variant !== 'text-link' && sizes[size],
        className
      )}
      {...props}
    >
      {IconLeft && <IconLeft size={16} strokeWidth={1.5} />}
      {children}
      {IconRight && <IconRight size={16} strokeWidth={1.5} />}
    </button>
  );
}

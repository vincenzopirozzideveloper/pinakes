import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type AvatarSize = 'sm' | 'md' | 'lg';

type AvatarProps = {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  className?: string;
} & ComponentPropsWithoutRef<'div'>;

const sizes: Record<AvatarSize, { container: string; text: string }> = {
  sm: { container: 'w-7 h-7', text: 'text-[11px]' },
  md: { container: 'w-10 h-10', text: 'text-[13px]' },
  lg: { container: 'w-16 h-16', text: 'text-[20px]' },
};

export function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const fallback = initials ?? (alt ? alt.slice(0, 2).toUpperCase() : '?');

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden shrink-0',
        'rounded-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.12)]',
        'select-none',
        sizes[size].container,
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover rounded-full"
        />
      ) : (
        <span
          className={cn(
            'font-semibold text-[#a3a3a3] leading-none uppercase',
            sizes[size].text
          )}
        >
          {fallback}
        </span>
      )}
    </div>
  );
}

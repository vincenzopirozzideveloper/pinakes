import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type InputProps = {
  label?: string;
  error?: string | boolean;
  className?: string;
} & ComponentPropsWithoutRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const hasError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-[12px] text-[#a3a3a3] uppercase tracking-[0.08em] leading-none"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-[6px] px-4 py-3 text-[14px] font-sans leading-none',
            'bg-[#111111] text-[#e5e5e5] placeholder:text-[#525252]',
            'border outline-none transition-colors duration-150',
            'disabled:opacity-40 disabled:pointer-events-none',
            hasError
              ? 'border-[#ef4444] focus:border-[#ef4444]'
              : 'border-[rgba(255,255,255,0.10)] focus:border-[rgba(255,255,255,0.28)]',
            className
          )}
          {...props}
        />
        {errorMessage && (
          <p className="text-[12px] text-[#ef4444] leading-none">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

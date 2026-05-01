import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type CtaBandPhotoProps = {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  bgImage?: string;
  className?: string;
};

export function CtaBandPhoto({
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
  bgImage,
  className,
}: CtaBandPhotoProps) {
  return (
    <section
      className={cn(
        'relative w-full bg-surface-dark overflow-hidden',
        'py-[80px] px-6',
        className
      )}
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {bgImage && (
        <div className="absolute inset-0 bg-surface-dark/75" aria-hidden />
      )}

      <div className="relative z-10 mx-auto max-w-[1440px] flex flex-col items-center text-center gap-6">
        <h2 className="text-display-md text-on-dark max-w-2xl">
          {title}
        </h2>

        {subtitle && (
          <p className="text-body-md text-on-dark-soft max-w-lg">
            {subtitle}
          </p>
        )}

        <Button
          variant="on-dark"
          size="lg"
          onClick={onCtaClick}
          className="mt-2"
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}

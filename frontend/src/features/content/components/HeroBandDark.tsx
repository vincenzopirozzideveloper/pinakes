import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type CtaConfig = {
  label: string;
  onClick?: () => void;
  href?: string;
};

type HeroBandDarkProps = {
  title: string;
  subtitle?: string;
  kicker?: string;
  primaryCta?: CtaConfig;
  secondaryCta?: CtaConfig;
  image?: string;
  className?: string;
};

export function HeroBandDark({
  title,
  subtitle,
  kicker,
  primaryCta,
  secondaryCta,
  image,
  className,
}: HeroBandDarkProps) {
  return (
    <section
      className={cn(
        'relative w-full bg-surface-dark overflow-hidden',
        'py-[80px] px-6',
        className
      )}
      style={
        image
          ? {
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {image && (
        <div className="absolute inset-0 bg-surface-dark/70" aria-hidden />
      )}

      <div className="relative z-10 mx-auto max-w-[1440px] flex flex-col items-center text-center gap-6">
        {kicker && (
          <p className="text-label-uppercase text-on-dark-soft">{kicker}</p>
        )}

        <h1 className="text-display-xl text-on-dark max-w-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="text-body-md text-on-dark-soft max-w-xl">
            {subtitle}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="flex items-center gap-4 flex-wrap justify-center mt-2">
            {primaryCta && (
              <Button
                variant="primary"
                size="lg"
                onClick={primaryCta.onClick}
              >
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button
                variant="on-dark"
                size="lg"
                onClick={secondaryCta.onClick}
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

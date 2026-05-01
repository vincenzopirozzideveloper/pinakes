import { Sprout, BookOpen, Leaf, Archive } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MaturityStage = 'seedling' | 'budding' | 'evergreen' | 'archived';

type MaturityConfig = {
  label: string;
  color: string;
  Icon: React.FC<{ size?: number; className?: string }>;
};

const config: Record<MaturityStage, MaturityConfig> = {
  seedling:  { color: 'text-maturity-seedling',  label: 'SEEDLING',  Icon: Sprout },
  budding:   { color: 'text-maturity-budding',   label: 'BUDDING',   Icon: BookOpen },
  evergreen: { color: 'text-maturity-evergreen', label: 'EVERGREEN', Icon: Leaf },
  archived:  { color: 'text-maturity-archived',  label: 'ARCHIVED',  Icon: Archive },
};

type MaturityBadgeProps = {
  maturity?: MaturityStage;
  stage?: MaturityStage;
  className?: string;
};

export function MaturityBadge({ maturity, stage, className }: MaturityBadgeProps) {
  const key = (maturity ?? stage) as MaturityStage;
  if (!key || !config[key]) return null;

  const { color, label, Icon } = config[key];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-caption border px-2.5 py-1 border-current rounded-none',
        color,
        className
      )}
    >
      <Icon size={12} />
      {label}
    </span>
  );
}

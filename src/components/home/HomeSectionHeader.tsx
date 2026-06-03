import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export function HomeSectionHeader({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="home-section-header">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-adgm-primary-light text-adgm-primary mt-0.5">
            <Icon className="h-4 w-4" strokeWidth={2.5} />
          </span>
        )}
        <div className="min-w-0">
          <h2 className="font-display text-lg font-semibold text-adgm-navy leading-tight">{title}</h2>
          {description && (
            <p className="text-sm text-adgm-slate mt-1 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0 self-center">{action}</div>}
    </div>
  );
}

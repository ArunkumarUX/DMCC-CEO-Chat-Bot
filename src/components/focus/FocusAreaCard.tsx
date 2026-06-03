import { Link } from 'react-router-dom';
import {
  Globe2,
  Calendar,
  Scale,
  Mail,
  Users,
  Library,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import type { FocusArea } from '../../data/focusAreas';

const iconMap: Record<FocusArea['icon'], LucideIcon> = {
  globe: Globe2,
  calendar: Calendar,
  scale: Scale,
  mail: Mail,
  users: Users,
  library: Library,
};

export function FocusAreaCard({
  area,
  onSelectPrompt,
  compact = false,
  minimal = false,
}: {
  area: FocusArea;
  onSelectPrompt?: (prompt: string) => void;
  compact?: boolean;
  /** Home grid: title + one line only */
  minimal?: boolean;
}) {
  const Icon = iconMap[area.icon];

  const content = (
    <>
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-adgm-primary-light text-adgm-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3
            className={`font-semibold text-adgm-navy ${minimal || compact ? 'text-sm' : 'text-base'}`}
          >
            {minimal ? area.shortTitle : area.title}
          </h3>
          {!compact && !minimal && (
            <p className="text-xs text-adgm-slate mt-1 leading-relaxed line-clamp-2">
              {area.description}
            </p>
          )}
          {minimal && (
            <p className="text-xs text-adgm-mist mt-0.5 line-clamp-1">{area.capabilities[0]}</p>
          )}
        </div>
        {!onSelectPrompt && <ArrowRight className="h-4 w-4 text-adgm-mist shrink-0 mt-1" />}
      </div>
      {!compact && !minimal && (
        <ul className="mt-3 space-y-1 border-t border-adgm-line pt-3">
          {area.capabilities.map((c) => (
            <li key={c} className="text-[11px] text-adgm-charcoal flex gap-2 leading-snug">
              <span className="text-adgm-primary shrink-0">·</span>
              {c}
            </li>
          ))}
        </ul>
      )}
      {onSelectPrompt && (
        <div className="mt-3 space-y-1.5 border-t border-adgm-line pt-3">
          {area.prompts.slice(0, compact ? 2 : 3).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onSelectPrompt(p)}
              className="w-full text-start text-xs text-adgm-charcoal rounded-lg px-2 py-1.5 hover:bg-adgm-sky-bg hover:text-adgm-primary transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </>
  );

  if (onSelectPrompt) {
    return (
      <article className="rounded-2xl border border-adgm-line bg-white p-4 shadow-adgm-sm h-full text-start">
        {content}
      </article>
    );
  }

  return (
    <Link
      to={`/focus/${area.id}`}
      className={`block rounded-2xl border border-adgm-line bg-white shadow-adgm-sm hover:border-adgm-primary/35 hover:shadow-adgm-md transition-all h-full ${
        minimal ? 'p-3' : 'p-4'
      }`}
    >
      {content}
    </Link>
  );
}

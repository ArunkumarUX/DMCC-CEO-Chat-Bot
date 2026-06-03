import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Globe2, Calendar, Scale, Mail, Users, Library, type LucideIcon } from 'lucide-react';
import { CORE_FOCUS_AREAS, CONVERSATION_CATEGORIES, type FocusArea } from '../../data/focusAreas';

const iconMap: Record<FocusArea['icon'], LucideIcon> = {
  globe: Globe2,
  calendar: Calendar,
  scale: Scale,
  mail: Mail,
  users: Users,
  library: Library,
};

export function FocusStarterGrid({
  onSelectPrompt,
  showFilters = true,
  maxItems,
  className = '',
}: {
  onSelectPrompt: (prompt: string) => void;
  showFilters?: boolean;
  maxItems?: number;
  className?: string;
}) {
  const filters = CONVERSATION_CATEGORIES;
  const [category, setCategory] = useState('All');

  const areas =
    category === 'All'
      ? CORE_FOCUS_AREAS
      : CORE_FOCUS_AREAS.filter((a) => a.shortTitle === category);

  const shown = maxItems ? areas.slice(0, maxItems) : areas;

  return (
    <div className={className}>
      {showFilters && (
        <div className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-thin">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setCategory(f)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                category === f
                  ? 'bg-adgm-primary text-white'
                  : 'border border-adgm-line bg-adgm-ivory text-adgm-slate hover:border-adgm-primary/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {shown.map((area, i) => {
          const Icon = iconMap[area.icon];
          const prompt = area.prompts[0];
          return (
            <motion.button
              key={area.id}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i }}
              onClick={() => onSelectPrompt(prompt)}
              className="group flex min-h-[72px] w-full items-center gap-3 rounded-xl border border-adgm-line bg-white p-4 text-start transition-all hover:border-adgm-primary/50 hover:shadow-adgm-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-adgm-primary-light text-adgm-primary transition-colors group-hover:bg-adgm-primary group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-adgm-navy">{area.shortTitle}</p>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-adgm-slate">
                  {area.capabilities[0]}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-adgm-mist transition-colors group-hover:text-adgm-primary" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

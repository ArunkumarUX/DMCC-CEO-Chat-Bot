import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe2,
  Calendar,
  Scale,
  Mail,
  Users,
  Library,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { CORE_FOCUS_AREAS, type FocusArea } from '../../data/focusAreas';
import { staggerContainer, staggerItem } from '../../lib/motion';

const iconMap: Record<FocusArea['icon'], LucideIcon> = {
  globe: Globe2,
  calendar: Calendar,
  scale: Scale,
  mail: Mail,
  users: Users,
  library: Library,
};

const accents: Record<FocusArea['icon'], string> = {
  globe: 'from-blue-500/10 to-adgm-primary/5',
  calendar: 'from-indigo-500/10 to-adgm-primary/5',
  scale: 'from-cyan-500/10 to-adgm-primary/5',
  mail: 'from-violet-500/10 to-adgm-primary/5',
  users: 'from-emerald-500/10 to-adgm-primary/5',
  library: 'from-slate-500/10 to-adgm-primary/5',
};

function FocusTile({
  area,
  onQuickPrompt,
}: {
  area: FocusArea;
  onQuickPrompt?: (prompt: string) => void;
}) {
  const Icon = iconMap[area.icon];
  const className = `home-focus-tile group flex h-full min-h-[152px] flex-col bg-gradient-to-br ${accents[area.icon]}`;

  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-adgm-primary shadow-adgm-sm transition-transform group-hover:scale-105 sm:h-11 sm:w-11">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-adgm-mist opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-adgm-primary group-hover:opacity-100" />
      </div>
      <h3 className="mt-4 font-display text-base font-semibold leading-snug text-adgm-navy">
        {area.shortTitle}
      </h3>
      <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-adgm-slate">
        {area.capabilities[0]}
      </p>
      <p className="mt-3 border-t border-adgm-line/60 pt-3 text-[10px] text-adgm-mist">
        {area.prompts.length} starter prompts
      </p>
    </>
  );

  if (onQuickPrompt) {
    return (
      <button type="button" onClick={() => onQuickPrompt(area.prompts[0])} className={className}>
        {inner}
      </button>
    );
  }

  return (
    <Link to={`/focus/${area.id}`} className={className}>
      {inner}
    </Link>
  );
}

export function FocusBento({ onQuickPrompt }: { onQuickPrompt?: (prompt: string) => void }) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {CORE_FOCUS_AREAS.map((area) => (
        <motion.div key={area.id} variants={staggerItem} className="h-full">
          <FocusTile area={area} onQuickPrompt={onQuickPrompt} />
        </motion.div>
      ))}
    </motion.div>
  );
}

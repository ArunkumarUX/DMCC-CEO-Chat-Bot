import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, TrendingUp, Globe2, Scale, AlertTriangle, ChevronRight } from 'lucide-react';
import type { MorningSignal } from '../../types';
import { easeOut } from '../../lib/motion';

const iconMap = {
  overnight: Moon,
  market: TrendingUp,
  competitor: Globe2,
  regulatory: Scale,
  'performance-risk': AlertTriangle,
};

const priorityStyles = {
  high: 'border-adgm-warning/40 bg-amber-50/50',
  medium: 'border-adgm-primary/25 bg-adgm-sky-bg/40',
  normal: 'border-adgm-line bg-white',
};

function SignalCard({ signal, index }: { signal: MorningSignal; index: number }) {
  const Icon = iconMap[signal.icon];
  const inner = (
    <article
      className={`rounded-2xl border p-4 shadow-adgm-sm transition-all duration-300 hover:shadow-adgm-md ${priorityStyles[signal.priority]} ${signal.href ? 'group-hover:border-adgm-primary/50' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex shrink-0 flex-col items-center gap-1">
          <span className="kpi-num text-[10px] text-adgm-primary">{signal.pillar}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-adgm-primary-light text-adgm-primary">
            <Icon className="h-4 w-4" />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-adgm-navy">{signal.title}</h3>
            {signal.href && <ChevronRight className="h-4 w-4 shrink-0 text-adgm-mist" />}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-adgm-slate">{signal.summary}</p>
        </div>
      </div>
    </article>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.4, ease: easeOut }}
    >
      {signal.href ? (
        <Link to={signal.href} className="block group">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.div>
  );
}

export function MorningSignals({
  signals,
  className = '',
}: {
  signals: MorningSignal[];
  className?: string;
}) {
  return (
    <section className={className} aria-labelledby="morning-signals-heading">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {signals.map((signal, i) => (
          <SignalCard key={signal.id} signal={signal} index={i} />
        ))}
      </div>
    </section>
  );
}

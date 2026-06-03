import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Moon,
  TrendingUp,
  Globe2,
  Scale,
  AlertTriangle,
  ChevronRight,
  LayoutGrid,
} from 'lucide-react';
import type { MorningSignal } from '../../types';
import { easeOut } from '../../lib/motion';

const iconMap = {
  overnight: Moon,
  market: TrendingUp,
  competitor: Globe2,
  regulatory: Scale,
  'performance-risk': AlertTriangle,
};

export function MorningInsightsPanel({ signals }: { signals: MorningSignal[] }) {
  const featured =
    signals.find((s) => s.id === 'performance-risk') ??
    signals.find((s) => s.priority === 'high') ??
    signals[0];
  const rest = signals.filter((s) => s.id !== featured?.id);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-adgm-primary-light text-adgm-primary">
          <LayoutGrid className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-lg font-semibold leading-tight text-adgm-navy">
            CSO daily intelligence
          </h2>
          <p className="mt-0.5 text-xs text-adgm-mist">
            Five priority pillars · strategic updates &amp; recommended actions
          </p>
        </div>
      </div>

      {featured && <FeaturedSignal signal={featured} />}

      <div className="grid flex-1 auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
        {rest.map((signal, i) => (
          <CompactSignal key={signal.id} signal={signal} index={i} />
        ))}
      </div>
    </div>
  );
}

function PillarBadge({ pillar }: { pillar: MorningSignal['pillar'] }) {
  return (
    <span className="kpi-num inline-flex h-5 min-w-[1.75rem] items-center justify-center rounded-md bg-adgm-navy px-1.5 text-[10px] text-white">
      {pillar}
    </span>
  );
}

function FeaturedSignal({ signal }: { signal: MorningSignal }) {
  const Icon = iconMap[signal.icon];
  const content = (
    <article className="home-featured-signal group h-full">
      <div className="flex items-start gap-4">
        <div className="flex shrink-0 flex-col items-center gap-2">
          <PillarBadge pillar={signal.pillar} />
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-adgm-primary text-white shadow-md sm:h-12 sm:w-12 sm:rounded-2xl">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
            Priority alert
          </span>
          <h3 className="mt-2 font-display text-base font-semibold leading-snug text-adgm-navy sm:text-lg">
            {signal.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-adgm-slate">{signal.summary}</p>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-adgm-mist">{signal.detail}</p>
        </div>
        {signal.href && (
          <ChevronRight className="h-5 w-5 shrink-0 self-center text-adgm-primary transition-transform group-hover:translate-x-0.5" />
        )}
      </div>
    </article>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      {signal.href ? <Link to={signal.href} className="block h-full">{content}</Link> : content}
    </motion.div>
  );
}

function CompactSignal({ signal, index }: { signal: MorningSignal; index: number }) {
  const Icon = iconMap[signal.icon];
  const inner = (
    <article
      className={`flex h-full min-h-[92px] flex-col justify-center rounded-xl border p-3 transition-all hover:shadow-adgm-md ${
        signal.priority === 'high'
          ? 'border-amber-200/80 bg-amber-50/40'
          : 'border-adgm-line bg-white hover:border-adgm-primary/30'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <div className="flex shrink-0 flex-col items-center gap-1">
          <PillarBadge pillar={signal.pillar} />
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-adgm-primary-light text-adgm-primary">
            <Icon className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xs font-semibold leading-snug text-adgm-navy">{signal.title}</h3>
          <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-adgm-slate">{signal.summary}</p>
        </div>
      </div>
    </article>
  );

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, ease: easeOut }}
    >
      {signal.href ? (
        <Link to={signal.href} className="block h-full">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.div>
  );
}

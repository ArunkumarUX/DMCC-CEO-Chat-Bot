import { motion } from 'framer-motion';
import { FileText, MessageSquare, Building2, AlertCircle } from 'lucide-react';
import { CountUp } from '../motion/CountUp';
import type { ExecutiveMetrics } from '../../data/executiveStore';
import { easeOut } from '../../lib/motion';

const cards = [
  {
    key: 'queries',
    label: 'Queries this week',
    icon: MessageSquare,
    getValue: (m: ExecutiveMetrics) => m.queriesThisWeek ?? 0,
    suffix: '',
    accent: 'bg-adgm-primary-light text-adgm-primary',
  },
  {
    key: 'docs',
    label: 'Knowledge base',
    icon: FileText,
    getValue: (m: ExecutiveMetrics) => m.documentsInKb,
    suffix: '+',
    accent: 'bg-emerald-50 text-emerald-700',
  },
  {
    key: 'depts',
    label: 'Departments on track',
    icon: Building2,
    getValue: (m: ExecutiveMetrics) => m.departmentsOnTrack,
    suffix: '/9',
    accent: 'bg-adgm-sky-bg text-adgm-navy',
  },
  {
    key: 'actions',
    label: 'Open actions',
    icon: AlertCircle,
    getValue: (m: ExecutiveMetrics) => m.openActions,
    suffix: '',
    accent: 'bg-amber-50 text-amber-800',
    alert: true,
  },
] as const;

export function ExecutiveSnapshot({ metrics }: { metrics: ExecutiveMetrics }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const val = card.getValue(metrics);
        const showBadge = 'alert' in card && card.alert && metrics.openActions > 0;

        return (
          <motion.div
            key={card.key}
            className="home-stat-card flex h-full min-h-[148px] flex-col"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: easeOut }}
          >
            <div className="flex min-h-[40px] items-start justify-between gap-2">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.accent}`}
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              {showBadge ? (
                <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                  Review
                </span>
              ) : (
                <span className="h-5 w-8 shrink-0" aria-hidden />
              )}
            </div>
            <p className="kpi-num mt-auto pt-4 text-2xl text-adgm-navy sm:text-3xl">
              <CountUp value={val ?? 0} />
              {card.suffix && (
                <span className="font-sans text-lg font-medium text-adgm-mist">{card.suffix}</span>
              )}
            </p>
            <p className="mt-1 text-xs leading-snug text-adgm-slate">{card.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

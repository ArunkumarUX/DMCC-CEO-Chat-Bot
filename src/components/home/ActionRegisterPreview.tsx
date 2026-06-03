import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import type { ActionItem } from '../../data/executiveStore';

export function ActionRegisterPreview({
  actions,
  onComplete,
}: {
  actions: ActionItem[];
  onComplete?: (id: string) => void;
}) {
  const overdue = actions.filter((a) => a.status === 'overdue');
  const open = actions.filter((a) => a.status === 'open').slice(0, 2);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-adgm-navy">Action register</p>
          <p className="text-[10px] text-adgm-mist">
            {overdue.length > 0 ? `${overdue.length} overdue` : 'Follow-ups'}
          </p>
        </div>
        <Link to="/chat" className="text-[10px] font-medium text-adgm-primary hover:underline flex items-center gap-0.5">
          View all
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      <ul className="space-y-2 flex-1">
        {[...overdue, ...open].slice(0, 3).map((a, i) => (
          <motion.li
            key={a.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className={`rounded-lg border px-3 py-2.5 text-xs ${
              a.status === 'overdue'
                ? 'border-amber-200 bg-amber-50/80'
                : 'border-adgm-line bg-adgm-ivory/80'
            }`}
          >
            <div className="flex gap-2">
              {a.status === 'overdue' && (
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-adgm-navy leading-snug line-clamp-2">{a.title}</p>
                <p className="text-[10px] text-adgm-mist mt-1">Due {a.due}</p>
              </div>
              {onComplete && a.status !== 'done' && (
                <button
                  type="button"
                  onClick={() => onComplete(a.id)}
                  className="text-[10px] text-adgm-primary font-medium shrink-0 hover:underline"
                >
                  Done
                </button>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

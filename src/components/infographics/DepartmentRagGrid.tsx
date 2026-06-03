import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { DepartmentPerformance, RagStatus } from '../../types';

const ragColor: Record<RagStatus, string> = {
  green: '#157347',
  amber: '#b8860b',
  red: '#eb5757',
};

export function DepartmentRagGrid({
  departments,
  onSelect,
}: {
  departments: DepartmentPerformance[];
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {departments.map((d, i) => {
        const pct = d.rag === 'green' ? 88 : d.rag === 'amber' ? 62 : 35;
        const inner = (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03, duration: 0.35 }}
            whileHover={{ boxShadow: '0 4px 16px rgba(0,9,42,0.08)' }}
            className="relative flex h-full min-h-[100px] flex-col items-center justify-center rounded-xl border border-adgm-line bg-white p-3 transition-shadow sm:min-h-[108px]"
            onClick={() => onSelect?.(d.id)}
          >
            <svg viewBox="0 0 36 36" className="h-11 w-11 shrink-0 -rotate-90 sm:h-12 sm:w-12">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#EDEFF3" strokeWidth="3" />
              <motion.circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke={ragColor[d.rag]}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${pct} 100`}
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ delay: 0.15 + i * 0.04, duration: 0.8 }}
              />
            </svg>
            <span className="mt-2 text-center text-[10px] font-bold leading-tight text-adgm-navy">
              {d.shortName}
            </span>
            <span
              className="absolute end-2.5 top-2.5 h-1.5 w-1.5 rounded-full"
              style={{ background: ragColor[d.rag] }}
              aria-hidden
            />
          </motion.div>
        );
        return onSelect ? (
          <div key={d.id} className="h-full">
            {inner}
          </div>
        ) : (
          <Link key={d.id} to="/performance" className="block h-full">
            {inner}
          </Link>
        );
      })}
    </div>
  );
}

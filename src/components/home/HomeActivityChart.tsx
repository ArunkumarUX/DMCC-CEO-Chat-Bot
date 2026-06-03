import type { ActivityPoint } from '../../data/executiveStore';
import { CountUp } from '../motion/CountUp';

export function HomeActivityChart({
  activityWeek,
  avgConfidence,
}: {
  activityWeek: ActivityPoint[];
  avgConfidence: number;
}) {
  const maxQ = Math.max(...activityWeek.map((d) => d.queries), 1);
  const w = 280;
  const h = 72;
  const pad = 4;

  const points = activityWeek.map((d, i) => {
    const x = pad + (i / (activityWeek.length - 1)) * (w - pad * 2);
    const y = h - pad - (d.queries / maxQ) * (h - pad * 2);
    return `${x},${y}`;
  });

  const areaPoints = `${pad},${h - pad} ${points.join(' ')} ${w - pad},${h - pad}`;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-adgm-navy">Weekly activity</p>
          <p className="text-[10px] text-adgm-mist">Queries per day</p>
        </div>
        <div className="text-end">
          <p className="text-lg font-display font-semibold text-adgm-navy">
            <CountUp value={avgConfidence * 100} decimals={0} suffix="%" />
          </p>
          <p className="text-[10px] text-adgm-mist">Avg confidence</p>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full flex-1 min-h-[72px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0088FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0088FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#activityFill)" />
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke="#0088FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {activityWeek.map((d, i) => {
          const x = pad + (i / (activityWeek.length - 1)) * (w - pad * 2);
          const y = h - pad - (d.queries / maxQ) * (h - pad * 2);
          return (
            <circle key={d.day} cx={x} cy={y} r="3" fill="#0088FF" stroke="white" strokeWidth="1.5" />
          );
        })}
      </svg>
      <div className="flex justify-between mt-2 px-0.5">
        {activityWeek.map((d) => (
          <span key={d.day} className="text-[9px] text-adgm-mist font-medium">
            {d.day}
          </span>
        ))}
      </div>
    </div>
  );
}

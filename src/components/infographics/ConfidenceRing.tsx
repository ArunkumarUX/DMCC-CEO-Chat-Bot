import { motion } from 'framer-motion';

export function ConfidenceRing({
  value = 0.88,
  size = 100,
  className = '',
}: {
  value?: number;
  size?: number;
  className?: string;
}) {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#EDEFF3"
          strokeWidth="8"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#0088FF"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-xl font-semibold text-adgm-navy font-display"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        >
          {Math.round(value * 100)}%
        </motion.span>
        <span className="text-[9px] text-adgm-mist uppercase tracking-wide">Confidence</span>
      </div>
    </div>
  );
}

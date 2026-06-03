import { motion } from 'framer-motion';
import { EXECUTIVE_AGENTS } from '../../data/agents';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function AgentTeamRow() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative flex justify-center items-center py-2" aria-hidden>
      <svg viewBox="0 0 200 120" className="w-full max-w-[200px] h-auto">
        <defs>
          <radialGradient id="homeAgentCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#33A0FF" />
            <stop offset="100%" stopColor="#001C7D" />
          </radialGradient>
        </defs>
        {!reduced && (
          <motion.circle
            cx="100"
            cy="60"
            r="42"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="4 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '100px 60px' }}
          />
        )}
        {EXECUTIVE_AGENTS.map((agent, i) => {
          const angle = (i / EXECUTIVE_AGENTS.length) * Math.PI * 2 - Math.PI / 2;
          const x = 100 + 42 * Math.cos(angle);
          const y = 60 + 42 * Math.sin(angle);
          return (
            <g key={agent.id}>
              <motion.line
                x1="100"
                y1="60"
                x2={x}
                y2={y}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="14"
                fill={agent.color}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + i * 0.06, type: 'spring', stiffness: 300 }}
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill="white"
                fontSize="7"
                fontWeight="700"
              >
                {agent.shortName.slice(0, 3)}
              </text>
            </g>
          );
        })}
        <circle cx="100" cy="60" r="18" fill="url(#homeAgentCore)" />
        <text x="100" y="64" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">
          AI
        </text>
      </svg>
    </div>
  );
}

import { motion } from 'framer-motion';
import { AGENT_MAP } from '../../data/agents';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import type { AgentType } from '../../types';

export function AgentAvatar({
  agentId,
  size = 'md',
  active = false,
  pulse = false,
}: {
  agentId: AgentType;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  pulse?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const agent = AGENT_MAP[agentId];
  const dim =
    size === 'sm' ? 'h-7 w-7 text-[10px]' : size === 'lg' ? 'h-12 w-12 text-sm' : 'h-9 w-9 text-xs';

  return (
    <motion.span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ${dim} ${
        active ? 'ring-2 ring-offset-2 ring-adgm-primary' : ''
      }`}
      style={{ backgroundColor: agent.color }}
      animate={pulse && !reduced ? { scale: [1, 1.06, 1] } : undefined}
      transition={{ duration: 1.2, repeat: pulse ? Infinity : 0 }}
      title={agent.name}
    >
      {agent.shortName.slice(0, 2).toUpperCase()}
      {pulse && (
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ backgroundColor: agent.color }}
          aria-hidden
        />
      )}
    </motion.span>
  );
}

import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import type { AgentDefinition } from '../../data/agents';
import { AgentAvatar } from './AgentAvatar';

export function AgentCard({
  agent,
  selected,
  onToggle,
  onDelegate,
  compact = false,
}: {
  agent: AgentDefinition;
  selected: boolean;
  onToggle: () => void;
  onDelegate?: () => void;
  compact?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group w-full text-start rounded-2xl border p-4 transition-shadow ${
        selected
          ? 'border-adgm-primary bg-adgm-sky-bg/80 shadow-adgm-md ring-1 ring-adgm-primary/25'
          : 'border-adgm-line bg-white hover:border-adgm-primary/30 shadow-adgm-sm'
      }`}
    >
      <div className="flex items-start gap-3">
        <AgentAvatar agentId={agent.id} size={compact ? 'sm' : 'md'} active={selected} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold text-adgm-navy ${compact ? 'text-sm' : 'text-base'}`}>
              {agent.name}
            </h3>
            {selected && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-adgm-primary text-white">
                <Check className="h-3 w-3" />
              </span>
            )}
          </div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-adgm-primary mt-0.5">
            {agent.role}
          </p>
          {!compact && (
            <>
              <p className="text-xs text-adgm-slate mt-2 leading-relaxed">{agent.tagline}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {agent.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-adgm-ivory px-1.5 py-0.5 text-[10px] text-adgm-charcoal border border-adgm-line"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {onDelegate && selected && !compact && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onDelegate();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.stopPropagation();
              onDelegate();
            }
          }}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-adgm-primary py-2.5 text-xs font-semibold text-white hover:bg-adgm-primary-hover opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        >
          <Zap className="h-3.5 w-3.5" />
          Delegate task
        </span>
      )}
    </motion.button>
  );
}

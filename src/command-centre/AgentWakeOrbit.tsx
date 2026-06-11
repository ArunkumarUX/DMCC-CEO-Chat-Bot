import type { CSSProperties } from 'react';
import { AGENT_MAP, EXECUTIVE_AGENTS } from '../data/agents';
import type { AgentType } from '../types';
import { Emblem } from './CcPrimitives';
import { CcIcon } from './CcIcon';

const ICON_BY_AGENT: Partial<Record<AgentType, string>> = {
  cos: 'calendar-clock',
  strategy: 'compass',
  policy: 'gavel',
  relationship: 'network',
  comms: 'megaphone',
  explorer: 'globe',
};

type Props = {
  /** Agents participating this turn — all orbit nodes still wake; these glow stronger */
  agentIds?: AgentType[];
  /** Index into agentIds for the active specialist pulse */
  activeAgent?: number | null;
  /** Compact size for inline chat bubble */
  compact?: boolean;
  ar?: boolean;
};

export function AgentWakeOrbit({ agentIds = [], activeAgent = null, compact = false, ar = false }: Props) {
  const participating = new Set(agentIds);
  const orbitAgents = EXECUTIVE_AGENTS;
  const radius = compact ? 88 : 108;
  const size = compact ? 240 : 300;
  const activeId =
    activeAgent != null && agentIds[activeAgent] ? agentIds[activeAgent] : null;

  return (
    <div
      className={`agent-wake-orbit${compact ? ' agent-wake-orbit--compact' : ''}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ar ? 'الوكلاء يستيقظون' : 'Agents waking up'}
    >
      <div className="agent-wake-orbit__ring" aria-hidden />
      <div className="agent-wake-orbit__core">
        <Emblem size={compact ? 40 : 48} />
        <span className="agent-wake-orbit__global-label">
          {ar ? 'سوق أبوظبي العالمي' : 'Abu Dhabi Global Market'}
        </span>
      </div>

      {orbitAgents.map((agent, i) => {
        const angle = (360 / orbitAgents.length) * i - 90;
        const isRouted = participating.size === 0 || participating.has(agent.id);
        const isActive = activeId === agent.id;
        const icon = ICON_BY_AGENT[agent.id] ?? 'sparkles';

        return (
          <div
            key={agent.id}
            className={[
              'agent-wake-orbit__node',
              'agent-wake-orbit__node--awake',
              isRouted ? 'agent-wake-orbit__node--routed' : '',
              isActive ? 'agent-wake-orbit__node--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={
              {
                '--orbit-angle': `${angle}deg`,
                '--orbit-radius': `${radius}px`,
                '--agent-color': agent.color,
                '--wake-delay': `${i * 0.09}s`,
              } as CSSProperties
            }
          >
            <div
              className="agent-wake-orbit__node-btn"
              title={AGENT_MAP[agent.id]?.name ?? agent.name}
            >
              <CcIcon name={icon} size={compact ? 14 : 16} />
            </div>
            <span className="agent-wake-orbit__node-label">{agent.shortName}</span>
          </div>
        );
      })}
    </div>
  );
}

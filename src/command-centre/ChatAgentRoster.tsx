import { AGENTS } from '../data/commandCentreData';
import { CcIcon } from './CcIcon';
import type { AgentType } from '../types';

const ROSTER_LABELS: Record<string, { en: string; ar: string }> = {
  cos: { en: 'Chief of Staff', ar: 'كبير الموظفين' },
  strategy: { en: 'Strategy', ar: 'الاستراتيجية' },
  policy: { en: 'Policy', ar: 'السياسات' },
  relationship: { en: 'Relationship', ar: 'العلاقات' },
  comms: { en: 'Communications', ar: 'الاتصالات' },
  explorer: { en: 'Explorer', ar: 'المستكشف' },
};

type Props = {
  agentIds?: AgentType[];
  activeAgent?: number | null;
  ar?: boolean;
};

/** Read-only specialist pills shown above AI answers (Policy · Strategy · Chief of Staff …). */
export function ChatAgentRoster({ agentIds = [], activeAgent = null, ar = false }: Props) {
  if (!agentIds.length) return null;

  const roster = AGENTS.filter((a) => agentIds.includes(a.id as AgentType));
  const ordered =
    roster.length > 0
      ? roster
      : agentIds.map((id) => ({ id, icon: 'sparkles' as const }));

  return (
    <div
      className="chat-agent-roster"
      role="list"
      aria-label={ar ? 'الوكلاء المتخصصون' : 'Specialist agents'}
    >
      {ordered.map((agent, index) => {
        const id = agent.id as AgentType;
        const inRoster = agentIds.indexOf(id);
        const idx = inRoster >= 0 ? inRoster : index;
        const isActive =
          activeAgent != null ? idx === activeAgent : agentIds.length > 0;
        const label = ar ? ROSTER_LABELS[id]?.ar : ROSTER_LABELS[id]?.en;
        return (
          <span
            key={id}
            role="listitem"
            className={`chat-agent-roster__pill${isActive ? ' chat-agent-roster__pill--on' : ''}`}
          >
            <CcIcon name={agent.icon} size={14} className="chat-agent-roster__icon" />
            <span>{label ?? id}</span>
          </span>
        );
      })}
    </div>
  );
}

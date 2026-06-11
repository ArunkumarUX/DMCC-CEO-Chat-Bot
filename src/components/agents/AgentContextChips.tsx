import { AGENTS } from '../../data/commandCentreData';
import { CcIcon } from '../../command-centre/CcIcon';
import type { AgentType } from '../../types';

const CHIP_LABELS: Record<string, { en: string; ar: string }> = {
  cos: { en: 'Chief of Staff', ar: 'كبير الموظفين' },
  strategy: { en: 'Strategy', ar: 'الاستراتيجية' },
  policy: { en: 'Policy', ar: 'السياسات' },
  relationship: { en: 'Relationship', ar: 'العلاقات' },
  comms: { en: 'Communications', ar: 'الاتصالات' },
};

type Props = {
  value: AgentType | null;
  onChange: (id: AgentType | null) => void;
  ar?: boolean;
  /** Light pills on white (chat) vs translucent on dark hero card */
  variant?: 'light' | 'dark';
  className?: string;
};

export function AgentContextChips({
  value,
  onChange,
  ar = false,
  variant = 'light',
  className = '',
}: Props) {
  return (
    <div
      className={`agent-context-chips agent-context-chips--${variant}${className ? ` ${className}` : ''}`}
      role="group"
      aria-label={ar ? 'سياق الوكيل المتخصص' : 'Specialist agent context'}
    >
      {AGENTS.map((agent) => {
        const id = agent.id as AgentType;
        const selected = value === id;
        const label = ar ? CHIP_LABELS[id]?.ar : CHIP_LABELS[id]?.en;
        return (
          <button
            key={id}
            type="button"
            className={`agent-context-chips__chip${selected ? ' agent-context-chips__chip--on' : ''}`}
            aria-pressed={selected}
            onClick={() => onChange(selected ? null : id)}
            title={
              ar
                ? selected
                  ? 'إلغاء السياق — التوجيه التلقائي'
                  : `الإجابة في سياق ${label}`
                : selected
                  ? 'Clear context — auto-route again'
                  : `Answer in ${label} context`
            }
          >
            <CcIcon name={agent.icon} size={15} className="agent-context-chips__icon" />
            <span>{label ?? agent.name.replace(' AI', '')}</span>
          </button>
        );
      })}
    </div>
  );
}

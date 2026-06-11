import { AGENT_LABELS } from '../data/agents';
import type { AgentType } from '../types';

type Props = {
  agentIds?: AgentType[];
  activeAgent?: number | null;
  ar?: boolean;
};

export function ChatThinkingLoader({ agentIds = [], activeAgent = null, ar = false }: Props) {
  const activeId =
    activeAgent != null && agentIds[activeAgent] ? agentIds[activeAgent] : agentIds[0];
  const agentName = activeId ? (AGENT_LABELS[activeId] ?? activeId) : null;

  return (
    <div className="chat-thinking-loader" role="status" aria-live="polite">
      <div className="chat-thinking-loader__bars" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="chat-thinking-loader__copy">
        <p className="chat-thinking-loader__title">
          {ar ? 'جارٍ إعداد الإجابة…' : 'Preparing your response…'}
        </p>
        {agentName ? (
          <p className="chat-thinking-loader__agent">{agentName}</p>
        ) : (
          <p className="chat-thinking-loader__agent muted-3">
            {ar ? 'الوكلاء المتخصصون' : 'Specialist agents'}
          </p>
        )}
      </div>
    </div>
  );
}

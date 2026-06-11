// @ts-nocheck
import { SourceCitationChip } from '../components/chat/SourceCitationChip';
import { CcIcon } from './CcIcon';
import { Emblem } from './CcPrimitives';
import { mdToNodes } from './CcMarkdown';
import type { Source } from '../types';
import { panelSources } from '../utils/sourceLinks';
import { AGENT_LABELS, AGENT_MAP } from '../data/agents';
import type { AgentType } from '../types';
import { AgentWakeOrbit } from './AgentWakeOrbit';

export type CcChatAiMsg = {
  id: number;
  role: 'ai';
  text: string;
  agents?: string[];
  thinking?: boolean;
  activeAgent?: number | null;
  confidence?: number;
  grounding?: string;
  sources?: Source[];
};

export function CcChatAiMessage({
  message: m,
  ar,
  busy,
  copied,
  onCopy,
  onRetry,
  onOpenSources,
}: {
  message: CcChatAiMsg;
  ar: boolean;
  busy: boolean;
  copied: boolean;
  onCopy: () => void;
  onRetry: () => void;
  onOpenSources: (sources: Source[]) => void;
}) {
  const linkedSources = panelSources(m.sources ?? []);
  const hasResources = linkedSources.length > 0;
  const messageReady = !m.thinking && Boolean(m.text?.trim());
  const showSourceMeta = messageReady && hasResources;
  const showActions = messageReady;

  // Agent label — show which AI is responding
  const primaryAgentId = m.agents?.[0] as AgentType | undefined;
  const agentLabel = primaryAgentId ? (AGENT_LABELS[primaryAgentId] ?? primaryAgentId) : null;
  const agentColor = primaryAgentId ? (AGENT_MAP[primaryAgentId]?.color ?? 'var(--accent-bright)') : 'var(--accent-bright)';

  const showOrbit = m.thinking && !m.text?.trim();

  return (
    <div className={`chat-ai-msg mi-chat-in${showOrbit ? ' chat-ai-msg--orchestrating' : ''}`}>
      {!showOrbit && (
        <div className="chat-ai-msg__avatar">
          <Emblem size={22} />
        </div>
      )}
      <div className={`chat-ai-msg__body${showOrbit ? ' chat-ai-msg__body--orchestrating' : ''}`}>
        {agentLabel && !showOrbit && (
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: agentColor,
            marginBottom: 6,
            opacity: 0.9,
          }}>
            {agentLabel}
          </div>
        )}
        {showOrbit ? (
          <div className="chat-ai-msg__thinking-orbit">
            <AgentWakeOrbit
              agentIds={(m.agents ?? []) as AgentType[]}
              activeAgent={m.activeAgent}
              compact
              ar={ar}
            />
            <p className="chat-ai-msg__thinking-caption muted">
              {ar ? 'الوكلاء يستيقظون…' : 'Agents waking up…'}
            </p>
          </div>
        ) : (
          <div className={`chat-ai-msg__content ${ar ? 'lang-ar' : ''}`}>{mdToNodes(m.text)}</div>
        )}

        {(showSourceMeta || showActions) && (
          <div className="chat-ai-meta">
            <div
              className={`chat-ai-meta__toolbar${showSourceMeta ? '' : ' chat-ai-meta__toolbar--actions-only'}`}
            >
              {showSourceMeta && (
                <div className="chat-ai-meta__primary">
                  <SourceCitationChip
                    sources={linkedSources}
                    ar={ar}
                    compact
                    onClick={() => onOpenSources(linkedSources)}
                  />
                </div>
              )}
              {showActions && (
              <div className="chat-ai-meta__actions" role="toolbar" aria-label={ar ? 'إجراءات الرسالة' : 'Message actions'}>
                <button
                  type="button"
                  className={`chat-ai-meta__action-btn chat-ai-meta__action-btn--icon${copied ? ' mi-copied' : ''}`}
                  onClick={onCopy}
                  aria-label={copied ? (ar ? 'تم النسخ' : 'Copied') : ar ? 'نسخ' : 'Copy'}
                  title={copied ? (ar ? 'تم النسخ' : 'Copied') : ar ? 'نسخ' : 'Copy'}
                >
                  <CcIcon name={copied ? 'check' : 'copy'} size={16} />
                </button>
                <button
                  type="button"
                  className="chat-ai-meta__action-btn chat-ai-meta__action-btn--icon"
                  onClick={onRetry}
                  disabled={busy}
                  aria-label={ar ? 'إعادة المحاولة' : 'Retry'}
                  title={ar ? 'إعادة المحاولة' : 'Retry'}
                >
                  <CcIcon name="rotate-ccw" size={16} />
                </button>
              </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

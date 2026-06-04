// @ts-nocheck
import { SourceCitationChip } from '../components/chat/SourceCitationChip';
import { CcIcon } from './CcIcon';
import { Emblem } from './CcPrimitives';
import { mdToNodes } from './CcMarkdown';
import { AGENTS } from '../data/commandCentreData';
import type { Source } from '../types';

function AgentChips({ ids, active }: { ids: string[]; active: number | null }) {
  const map = Object.fromEntries(AGENTS.map((a) => [a.id, a]));
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 12 }}>
      {ids.map((id, i) => {
        const a = map[id];
        if (!a) return null;
        const on = active === null || active >= i;
        return (
          <div
            key={id}
            className="pill ghost"
            style={{
              height: 28,
              opacity: on ? 1 : 0.4,
              borderColor: on ? a.color : 'var(--line)',
            }}
          >
            <CcIcon name={a.icon} size={13} style={{ color: a.color }} />
            <span style={{ fontSize: 11.5 }}>{a.name.replace(' AI', '')}</span>
          </div>
        );
      })}
    </div>
  );
}

export type CcChatAiMsg = {
  id: number;
  role: 'ai';
  text: string;
  agents?: string[];
  thinking?: boolean;
  activeAgent?: number | null;
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
  const sourceCount = m.sources?.length ?? 0;
  const hasMeta = !m.thinking && m.text && sourceCount > 0;

  return (
    <div className="chat-ai-msg mi-chat-in">
      <div className="chat-ai-msg__avatar">
        <Emblem size={22} />
      </div>
      <div className="chat-ai-msg__body">
        <AgentChips ids={m.agents || []} active={m.activeAgent ?? null} />
        {m.thinking && !m.text ? (
          <div className="muted chat-ai-msg__thinking">
            <span className="dot pulse" style={{ color: 'var(--accent-bright)', background: 'var(--accent-bright)' }} />
            {ar ? 'الوكلاء يجمعون ويُركّبون الإجابة…' : 'Agents synthesising response…'}
          </div>
        ) : (
          <div className={`chat-ai-msg__content ${ar ? 'lang-ar' : ''}`}>{mdToNodes(m.text)}</div>
        )}

        {hasMeta && (
          <div className="chat-ai-meta">
            <div className="chat-ai-meta__row">
              <SourceCitationChip
                sources={m.sources!}
                ar={ar}
                onClick={() => onOpenSources(m.sources!)}
              />
            </div>
          </div>
        )}

        {m.text && !m.thinking && (
          <div className="chat-ai-actions" role="toolbar" aria-label={ar ? 'إجراءات الرسالة' : 'Message actions'}>
            <button
              type="button"
              className={`chat-ai-actions__btn${copied ? ' mi-copied' : ''}`}
              onClick={onCopy}
              aria-label={copied ? (ar ? 'تم النسخ' : 'Copied') : ar ? 'نسخ' : 'Copy'}
              title={copied ? (ar ? 'تم النسخ' : 'Copied') : ar ? 'نسخ' : 'Copy'}
            >
              <CcIcon name={copied ? 'check' : 'copy'} size={16} />
            </button>
            <button
              type="button"
              className="chat-ai-actions__btn"
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
  );
}

// @ts-nocheck
import { useState } from 'react';
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
  confidence?: number;
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
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const hasMeta = !m.thinking && m.text && (m.confidence != null || (m.sources?.length ?? 0) > 0);
  const confPct = m.confidence != null ? Math.round(m.confidence * 100) : null;
  const confClass =
    m.confidence != null && m.confidence >= 0.85
      ? 'chat-ai-meta__conf--high'
      : 'chat-ai-meta__conf--mid';

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
              {confPct != null && (
                <span className={`chat-ai-meta__conf ${confClass}`}>
                  {ar ? `ثقة ${confPct}%` : `${confPct}% confidence`}
                </span>
              )}
              {(m.sources?.length ?? 0) > 0 && (
                <button
                  type="button"
                  className="chat-ai-meta__sources-btn"
                  onClick={() => {
                    setSourcesOpen((o) => !o);
                    if (!sourcesOpen) onOpenSources(m.sources!);
                  }}
                  aria-expanded={sourcesOpen}
                >
                  <CcIcon name="book-open" size={14} />
                  {ar
                    ? `${m.sources!.length} مصادر`
                    : `${m.sources!.length} source${m.sources!.length === 1 ? '' : 's'}`}
                  <CcIcon name={sourcesOpen ? 'chevron-up' : 'chevron-down'} size={14} />
                </button>
              )}
              {(m.sources?.length ?? 0) > 0 && (
                <button
                  type="button"
                  className="chat-ai-meta__sources-btn chat-ai-meta__sources-btn--panel"
                  onClick={() => onOpenSources(m.sources!)}
                >
                  {ar ? 'عرض الكل' : 'View all'}
                </button>
              )}
            </div>
            {sourcesOpen && m.sources && m.sources.length > 0 && (
              <ul className="chat-ai-sources">
                {m.sources.map((src) => (
                  <li key={src.id} className="chat-ai-sources__item">
                    <span className="chat-ai-sources__title">{src.title}</span>
                    <span className="chat-ai-sources__meta">
                      {src.documentName} · {Math.round(src.confidence * 100)}% match
                    </span>
                  </li>
                ))}
              </ul>
            )}
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

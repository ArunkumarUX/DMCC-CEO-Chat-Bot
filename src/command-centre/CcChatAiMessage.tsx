// @ts-nocheck
import { SourceCitationChip } from '../components/chat/SourceCitationChip';
import { CcIcon } from './CcIcon';
import { Emblem } from './CcPrimitives';
import { mdToNodes } from './CcMarkdown';
import type { Source } from '../types';
import { panelSources } from '../utils/sourceLinks';

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

  return (
    <div className="chat-ai-msg mi-chat-in">
      <div className="chat-ai-msg__avatar">
        <Emblem size={22} />
      </div>
      <div className="chat-ai-msg__body">
        {m.thinking && !m.text ? (
          <div className="muted chat-ai-msg__thinking">
            <span className="dot pulse" style={{ color: 'var(--accent-bright)', background: 'var(--accent-bright)' }} />
            {ar ? 'جارٍ إعداد الرد…' : 'Preparing your response…'}
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

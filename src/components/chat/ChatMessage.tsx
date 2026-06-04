import { motion } from 'framer-motion';
import {
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { SourceCitationChip } from './SourceCitationChip';
import { MarkdownLite } from '../ui/MarkdownLite';
import { useApp } from '../../context/AppContext';
import { AGENT_LABELS } from '../../data/agents';
import type { ChatMessage as ChatMessageType } from '../../types';

interface Props {
  message: ChatMessageType;
  conversationId: string;
}

export function ChatMessageBubble({ message, conversationId }: Props) {
  const {
    copyMessage,
    rateMessage,
    regenerateLast,
    setSourcesPanelOpen,
    setActiveSources,
    isStreaming,
  } = useApp();

  const isUser = message.role === 'user';
  const content = message.content;

  if (isUser) {
    return (
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="max-w-[85%] md:max-w-[70%] rounded-2xl rounded-ee-md bg-adgm-navy px-4 py-3 text-white shadow-adgm-sm">
          <p className="text-[15px] leading-relaxed">{message.content}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex gap-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-adgm-primary-light border border-adgm-champagne">
        <Sparkles className="h-4 w-4 text-adgm-primary" />
      </div>
      <div className="flex-1 min-w-0 max-w-[90%]">
        <div className="rounded-2xl rounded-es-md border border-adgm-line bg-white px-4 py-4 shadow-adgm-sm">
          {message.agents && message.agents.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {message.agents.map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-adgm-ivory px-2 py-0.5 text-[10px] font-medium text-adgm-slate border border-adgm-line"
                >
                  {AGENT_LABELS[a] ?? a}
                </span>
              ))}
            </div>
          )}
          {content ? (
            <MarkdownLite content={content} />
          ) : (
            <div className="flex gap-1 py-2">
              <span className="thinking-dot h-2 w-2 rounded-full" />
              <span className="thinking-dot h-2 w-2 rounded-full" />
              <span className="thinking-dot h-2 w-2 rounded-full" />
            </div>
          )}
          {message.confidence != null && content && (
            <div className="mt-3 pt-3 border-t border-adgm-line flex items-center justify-between">
              <span
                className={`text-xs font-medium ${
                  message.confidence >= 0.85 ? 'text-adgm-success' : 'text-adgm-warning'
                }`}
              >
                Confidence: {Math.round(message.confidence * 100)}%
              </span>
              {message.sources && message.sources.length > 0 && (
                <SourceCitationChip
                  sources={message.sources}
                  onClick={() => {
                    setActiveSources(message.sources!);
                    setSourcesPanelOpen(true);
                  }}
                />
              )}
            </div>
          )}
        </div>
        {content && (
          <div className="flex flex-wrap items-center gap-1 mt-2">
            <button
              type="button"
              onClick={() => copyMessage(content)}
              className="rounded-lg p-2 text-adgm-mist hover:bg-adgm-ivory hover:text-adgm-navy"
              aria-label="Copy"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => rateMessage(conversationId, message.id, true)}
              className="rounded-lg p-2 text-adgm-mist hover:bg-adgm-ivory hover:text-adgm-success"
              aria-label="Helpful"
            >
              <ThumbsUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => rateMessage(conversationId, message.id, false)}
              className="rounded-lg p-2 text-adgm-mist hover:bg-adgm-ivory hover:text-adgm-error"
              aria-label="Not helpful"
            >
              <ThumbsDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={regenerateLast}
              disabled={isStreaming}
              className="rounded-lg p-2 text-adgm-mist hover:bg-adgm-ivory disabled:opacity-40"
              aria-label="Regenerate"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

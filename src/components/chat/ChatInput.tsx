import { useRef } from 'react';
import { Send, Paperclip, Square, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SmartRoutingToggle } from '../agents/SmartRoutingToggle';

export function ChatInput() {
  const {
    inputDraft,
    setInputDraft,
    sendMessage,
    isStreaming,
    stopStreaming,
    regenerateLast,
    showToast,
    uploadDocument,
    autoRouteAgents,
    setAutoRouteAgents,
  } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border-t border-adgm-line bg-white px-4 py-3 md:px-6 safe-area-bottom">
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 px-1">
          <SmartRoutingToggle autoRoute={autoRouteAgents} onAutoRouteChange={setAutoRouteAgents} />
        </div>
        <div className="flex items-end gap-2 rounded-2xl border border-adgm-line bg-adgm-ivory/50 p-2 focus-within:border-adgm-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-adgm-primary/15 transition-all">
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                uploadDocument(f.name);
                showToast(`Attached: ${f.name}`, 'info');
              }
              e.target.value = '';
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="shrink-0 rounded-xl p-2.5 text-adgm-slate hover:text-adgm-navy"
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <textarea
            value={inputDraft}
            onChange={(e) => setInputDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (inputDraft.trim()) sendMessage(inputDraft);
              }
            }}
            placeholder="Ask about briefings, meetings, policy, stakeholders…"
            rows={1}
            className="flex-1 resize-none bg-transparent py-2.5 text-[15px] text-adgm-navy placeholder:text-adgm-mist focus:outline-none max-h-32 min-h-[44px]"
            aria-label="Message"
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={stopStreaming}
              className="shrink-0 rounded-xl bg-adgm-error/10 p-2.5 text-adgm-error"
              aria-label="Stop"
            >
              <Square className="h-5 w-5 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => inputDraft.trim() && sendMessage(inputDraft)}
              disabled={!inputDraft.trim()}
              className="shrink-0 rounded-none bg-adgm-primary px-4 py-2.5 text-white hover:bg-adgm-primary-hover disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <button
            type="button"
            onClick={regenerateLast}
            disabled={isStreaming}
            className="flex items-center gap-1 text-xs text-adgm-mist hover:text-adgm-navy disabled:opacity-40"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

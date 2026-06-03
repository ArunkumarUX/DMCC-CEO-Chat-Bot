import type { ChatMessage } from '../types';

export type UiChatMsg =
  | { id: number; role: 'user'; text: string }
  | {
      id: number;
      role: 'ai';
      text: string;
      agents?: string[];
      thinking?: boolean;
      activeAgent?: number | null;
      confidence?: number;
      sources?: import('../types').Source[];
    };

export function conversationToUiMessages(messages: ChatMessage[]): UiChatMsg[] {
  return messages.map((m, i) => {
    if (m.role === 'user') {
      return { id: i + 1, role: 'user', text: m.content };
    }
    return {
      id: i + 1,
      role: 'ai',
      text: m.content,
      agents: m.agents,
      confidence: m.confidence,
      sources: m.sources,
    };
  });
}

export function nextUiMessageId(msgs: UiChatMsg[]): number {
  if (!msgs.length) return 1;
  return Math.max(...msgs.map((m) => m.id)) + 1;
}

export function formatChatRelativeTime(iso: string, ar: boolean): string {
  try {
    const d = new Date(iso);
    const now = Date.now();
    const diff = now - d.getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return ar ? 'الآن' : 'Just now';
    if (mins < 60) return ar ? `منذ ${mins} د` : `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return ar ? `منذ ${hrs} س` : `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return ar ? `منذ ${days} ي` : `${days}d ago`;
    return d.toLocaleDateString(ar ? 'ar-AE' : 'en-GB', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}

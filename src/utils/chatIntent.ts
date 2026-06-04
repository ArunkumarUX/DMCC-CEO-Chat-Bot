export type ChatIntent = 'greeting' | 'thanks' | 'standard';

/** Detect casual openers — Hi, how are you, what's happened today, etc. */
export function detectChatIntent(query: string): ChatIntent {
  const raw = query.trim();
  if (!raw) return 'standard';

  const q = raw.toLowerCase().replace(/[!?.،]/g, '').trim();

  if (/^(thanks|thank you|thx|cheers|شكرا|شكراً)/.test(q)) return 'thanks';

  if (
    /^(hi|hello|hey|yo|hiya|good morning|good afternoon|good evening|how are you|how r u|how are u|whats up|what s up|sup|salam|marhaba|السلام|مرحبا|مرحباً)$/.test(
      q,
    )
  ) {
    return 'greeting';
  }

  if (/^(hi|hello|hey)\b/.test(q) && q.length < 48) return 'greeting';

  if (/\bhow are you\b/.test(q) && q.length < 72) return 'greeting';

  if (
    /\b(what happened today|what s happened today|whats happened today|how is my day|what s on today|whats on today|catch me up|brief me on today)\b/.test(
      q,
    )
  ) {
    return 'greeting';
  }

  return 'standard';
}

export function isConversationalTurn(query: string): boolean {
  return detectChatIntent(query) !== 'standard';
}

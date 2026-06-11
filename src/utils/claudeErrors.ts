import type { OfflineNoticeKind } from '../types';

/** Whether Claude failed for a reason where offline KB answers are acceptable. */
export function isInvalidAnthropicApiKey(message: string): boolean {
  const m = message.toLowerCase();
  return m.includes('invalid x-api-key') || m.includes('authentication_error');
}

export function shouldFallbackToOfflineKb(message: string): boolean {
  if (isInvalidAnthropicApiKey(message)) return false;
  const m = message.toLowerCase();
  return (
    m.includes('credit balance') ||
    m.includes('too low') ||
    m.includes('billing') ||
    m.includes('purchase credits') ||
    m.includes('quota') ||
    m.includes('rate limit') ||
    m.includes('overloaded') ||
    m.includes('529') ||
    m.includes('empty response from claude')
  );
}

export function formatClaudeErrorForUser(message: string, ar = false): string {
  if (isInvalidAnthropicApiKey(message)) {
    return ar
      ? 'مفتاح Claude API غير صالح. أنشئ مفتاحاً جديداً من console.anthropic.com وأضفه إلى إعدادات الخادم (ANTHROPIC_API_KEY).'
      : 'Invalid Claude API key. Create a new key at console.anthropic.com and set ANTHROPIC_API_KEY on the server.';
  }
  return message;
}

export function offlineNoticeKind(message: string): OfflineNoticeKind {
  const m = message.toLowerCase();
  if (m.includes('credit') || m.includes('billing') || m.includes('purchase credits')) {
    return 'billing';
  }
  return 'temporary';
}

/** Legacy markdown banners prepended before KB fallback — strip when rendering. */
const LEGACY_OFFLINE_BANNER_RE =
  /^>\s*⚠️\s*\*\*Claude API (?:unavailable|temporarily unavailable)\*\*[^\n]*\n\n?/i;

export function stripOfflineFallbackBanner(text: string): {
  text: string;
  notice: OfflineNoticeKind | null;
} {
  const trimmed = text.trimStart();
  if (!LEGACY_OFFLINE_BANNER_RE.test(trimmed)) {
    return { text, notice: null };
  }
  const body = trimmed.replace(LEGACY_OFFLINE_BANNER_RE, '').trimStart();
  const notice: OfflineNoticeKind = /needs credits|billing/i.test(trimmed) ? 'billing' : 'temporary';
  return { text: body, notice };
}

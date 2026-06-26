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

function anthropicKeySetupHint(ar: boolean): string {
  const onNetlify =
    typeof window !== 'undefined' && window.location.hostname.includes('netlify.app');
  if (onNetlify) {
    return ar
      ? 'مفتاح Claude API غير صالح. أنشئ مفتاحاً جديداً من console.anthropic.com ثم حدّث ANTHROPIC_API_KEY في Netlify → Site configuration → Environment variables وأعد النشر.'
      : 'Invalid Claude API key. Create a new key at console.anthropic.com, update ANTHROPIC_API_KEY in Netlify → Site configuration → Environment variables, then redeploy.';
  }
  return ar
    ? 'مفتاح Claude API غير صالح. أنشئ مفتاحاً جديداً من console.anthropic.com وأضفه إلى .env.local كـ ANTHROPIC_API_KEY ثم أعد تشغيل npm run dev.'
    : 'Invalid Claude API key. Create a new key at console.anthropic.com, set ANTHROPIC_API_KEY in .env.local, and restart npm run dev.';
}

export function formatClaudeErrorForUser(message: string, ar = false): string {
  if (isInvalidAnthropicApiKey(message)) {
    return anthropicKeySetupHint(ar);
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

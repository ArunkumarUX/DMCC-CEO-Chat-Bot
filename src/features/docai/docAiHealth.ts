/** DocAI health — shares Anthropic key with SlideAI */

export type DocAiHealth = {
  available: boolean;
  reason?: 'missing-key' | 'unreachable' | 'server' | 'ok';
};

let cached: { at: number; value: DocAiHealth } | null = null;

export function clearDocAiHealthCache() {
  cached = null;
}

export async function fetchDocAiHealth(): Promise<DocAiHealth> {
  const now = Date.now();
  if (cached && now - cached.at < 20_000 && cached.value.available) return cached.value;

  try {
    const res = await fetch('/api/docai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ probe: true }),
    });
    if (res.status === 503) {
      cached = { at: now, value: { available: false, reason: 'missing-key' } };
      return cached.value;
    }
    if (res.ok) {
      cached = { at: now, value: { available: true, reason: 'ok' } };
      return cached.value;
    }
    // 404 from a stale API process (route missing) — treat as unreachable, don't sticky-cache.
    if (res.status === 404 || res.status === 502 || res.status === 504) {
      cached = { at: now, value: { available: false, reason: 'unreachable' } };
      return cached.value;
    }
    cached = { at: now, value: { available: false, reason: 'server' } };
    return cached.value;
  } catch {
    cached = { at: now, value: { available: false, reason: 'unreachable' } };
    return cached.value;
  }
}

export function docAiBannerMessage(ar: boolean, health: DocAiHealth): string {
  if (health.reason === 'missing-key') {
    return ar
      ? 'خدمة DocAI غير مهيأة — أضف ANTHROPIC_API_KEY إلى .env.local ثم شغّل npm run dev.'
      : 'DocAI is not configured — set ANTHROPIC_API_KEY in .env.local and run npm run dev.';
  }
  if (health.reason === 'unreachable') {
    return ar
      ? 'الخادم غير متصل — شغّل npm run dev لبدء واجهة DocAI والخادم معاً.'
      : 'API server not running — run npm run dev to start UI and API together.';
  }
  return ar
    ? 'تعذّر الاتصال بخدمة DocAI — تحقق من الشبكة وحاول مرة أخرى.'
    : 'Could not reach DocAI — check your connection and try again.';
}

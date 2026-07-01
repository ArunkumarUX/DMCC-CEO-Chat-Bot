import { isLocalDevHost } from '../../api/devApiPort';

export type SlideAiHealthStatus = {
  available: boolean;
  reason?: 'missing_key' | 'network' | 'server_error';
};

export async function fetchSlideAiHealth(): Promise<SlideAiHealthStatus> {
  try {
    const res = await fetch('/api/health', { cache: 'no-store' });
    if (!res.ok) return { available: false, reason: 'server_error' };
    const data = (await res.json()) as { claude?: boolean };
    if (data.claude) return { available: true };
    return { available: false, reason: 'missing_key' };
  } catch {
    return { available: false, reason: 'network' };
  }
}

export function slideAiBannerMessage(ar: boolean, health: SlideAiHealthStatus): string {
  if (health.available) return '';

  if (health.reason === 'missing_key') {
    if (isLocalDevHost()) {
      return ar
        ? 'خدمة SlideAI غير مهيأة — أضف ANTHROPIC_API_KEY إلى .env.local ثم شغّل npm run dev.'
        : 'SlideAI is not configured — set ANTHROPIC_API_KEY in .env.local and run npm run dev.';
    }
    return ar
      ? 'خدمة SlideAI غير متاحة مؤقتاً — يُرجى إبلاغ المسؤول بإعداد مفتاح الذكاء الاصطناعي على الخادم.'
      : 'SlideAI is temporarily unavailable — ask your admin to configure the AI service on the server.';
  }

  if (isLocalDevHost()) {
    return ar
      ? 'الخادم غير متصل — شغّل npm run dev لبدء واجهة SlideAI والخادم معاً.'
      : 'Server offline — run npm run dev to start the UI and API together.';
  }

  return ar
    ? 'تعذّر الاتصال بخدمة SlideAI — تحقق من الشبكة وحاول مرة أخرى.'
    : 'Could not reach SlideAI — check your connection and try again.';
}

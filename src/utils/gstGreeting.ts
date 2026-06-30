import { useEffect, useMemo, useState } from 'react';
import { GST_TIMEZONE } from '../config/dataRefreshSchedule';

export type GreetingLang = 'en' | 'ar';
export type GreetingPeriod = 'morning' | 'afternoon' | 'evening';

/** Hour boundaries in GST (Asia/Dubai) — production clock */
const MORNING_END = 12;
const AFTERNOON_END = 17;

/** Current hour 0–23 in Dubai (GST), independent of device timezone */
export function gstHour(at: Date = new Date()): number {
  return Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: GST_TIMEZONE,
      hour: 'numeric',
      hour12: false,
    }).format(at),
  );
}

export function greetingPeriodForGst(at: Date = new Date()): GreetingPeriod {
  const h = gstHour(at);
  if (h < MORNING_END) return 'morning';
  if (h < AFTERNOON_END) return 'afternoon';
  return 'evening';
}

export function greetingForGstTime(lang: GreetingLang = 'en', at: Date = new Date()): string {
  const period = greetingPeriodForGst(at);
  if (lang === 'ar') {
    if (period === 'morning') return 'صباح الخير';
    if (period === 'afternoon') return 'مساء الخير';
    return 'مساء الخير';
  }
  if (period === 'morning') return 'Good morning';
  if (period === 'afternoon') return 'Good afternoon';
  return 'Good evening';
}

/** @deprecated Use greetingForGstTime — kept for imports; always uses GST */
export function greetingForTime(_unused?: Date, lang: GreetingLang = 'en'): string {
  return greetingForGstTime(lang);
}

export function formatGstClock(at: Date = new Date(), lang: GreetingLang = 'en'): string {
  return at.toLocaleTimeString(lang === 'ar' ? 'ar-AE' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: GST_TIMEZONE,
  });
}

export function formatGstDate(at: Date = new Date(), lang: GreetingLang = 'en'): string {
  return at.toLocaleDateString(lang === 'ar' ? 'ar-AE' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: GST_TIMEZONE,
  });
}

export function briefingLabelForGst(lang: GreetingLang = 'en', at: Date = new Date()): string {
  const period = greetingPeriodForGst(at);
  if (lang === 'ar') {
    if (period === 'morning') return 'إحاطة الصباح';
    if (period === 'afternoon') return 'إحاطة بعد الظهر';
    return 'إحاطة المساء';
  }
  if (period === 'morning') return 'Open morning briefing';
  if (period === 'afternoon') return 'Open afternoon briefing';
  return 'Open evening briefing';
}

/** Chat seed / quick prompt — time-aware in GST */
export function todayCatchUpPrompt(lang: GreetingLang = 'en', at: Date = new Date()): string {
  const g = greetingForGstTime(lang, at);
  if (lang === 'ar') return `${g} — ما الذي حدث اليوم؟`;
  return `${g} — what's happened today?`;
}

/** Executive quick prompts — focused daily workflows (Walid review) */
export const EXECUTIVE_QUICK_PROMPTS = {
  en: [
    'Help me create a PowerPoint',
    'Draft an email for me',
    'Analyse and review documents',
  ],
  ar: [
    'ساعدني في إنشاء عرض PowerPoint',
    'صِغ رسالة بريد إلكتروني لي',
    'حلّل المستندات وراجعها',
  ],
} as const;

/** Rotating pool of CSO-persona suggestions — 2 surface each day alongside the fixed chips */
export const CSO_PERSONA_PROMPTS: {
  en: string;
  ar: string;
  agents: string[];
}[] = [
  {
    en: "Catch me up on today — calendar, actions and markets.",
    ar: 'اطلعني على مستجدات اليوم — الأجندة والإجراءات والأسواق.',
    agents: ['cos'],
  },
  {
    en: "Compare R&B's residential pipeline against the Dubai market.",
    ar: 'قارن خط أنابيب R&B السكني مع سوق دبي.',
    agents: ['strategy', 'policy'],
  },
  {
    en: 'Top investment opportunities Apparel Group should prioritise from current Dubai capital flows?',
    ar: 'ما أبرز فرص الاستثمار التي ينبغي لـ Apparel Group إعطاؤها الأولوية من تدفقات رأس المال في دبي؟',
    agents: ['strategy'],
  },
  {
    en: 'Any UAE retail compliance or Dubai regulatory updates I should know about this week?',
    ar: 'هل هناك مستجدات تنظيمية من UAE retail compliance أو دبي يجب أن أعرفها هذا الأسبوع؟',
    agents: ['policy'],
  },
  {
    en: 'Brief me on Images RetailME before the Images RetailME Awards commission review.',
    ar: 'أطلعني على Images RetailME قبل مراجعة عمولة Images RetailME Awards.',
    agents: ['relationship'],
  },
  {
    en: "Draft a note on Apparel Group's Q2 portfolio performance in Arabic.",
    ar: 'صِغ مذكرة حول أداء محفظة Apparel Group في الربع الثاني باللغة العربية.',
    agents: ['comms'],
  },
];

/**
 * Chat suggestion chips — the three core executive workflows are ALWAYS shown,
 * plus 2 more drawn from the CSO persona pool (rotates daily, stable within a day).
 */
export function getTimeBasedChatSuggestions(
  lang: GreetingLang = 'en',
  at: Date = new Date(),
): { q: string; agents: string[] }[] {
  const ar = lang === 'ar';
  const fixed = (ar ? EXECUTIVE_QUICK_PROMPTS.ar : EXECUTIVE_QUICK_PROMPTS.en).map((q) => ({
    q,
    agents: [] as string[],
  }));

  // Deterministic daily rotation — same pair all day (no flicker), new pair each day
  const dayIndex = Math.floor(at.getTime() / 86_400_000);
  const n = CSO_PERSONA_PROMPTS.length;
  const first = dayIndex % n;
  const second = (first + 1 + (dayIndex % (n - 1))) % n;
  const personaPicks = [CSO_PERSONA_PROMPTS[first], CSO_PERSONA_PROMPTS[second === first ? (first + 1) % n : second]];

  return [
    ...fixed,
    ...personaPicks.map((p) => ({ q: ar ? p.ar : p.en, agents: p.agents })),
  ];
}

/** Live GST clock + greeting — re-renders every second (hero, chat chips) */
export function useGstLive(lang: GreetingLang = 'en') {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return useMemo(
    () => ({
      now,
      greeting: greetingForGstTime(lang, now),
      period: greetingPeriodForGst(now),
      briefingLabel: briefingLabelForGst(lang, now),
      todayPrompt: todayCatchUpPrompt(lang, now),
      suggestions: getTimeBasedChatSuggestions(lang, now),
      dateStr: formatGstDate(now, lang),
      timeStr: formatGstClock(now, lang),
    }),
    [lang, now],
  );
}

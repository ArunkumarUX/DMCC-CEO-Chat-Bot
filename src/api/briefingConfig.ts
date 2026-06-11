import type { ExecutiveState, Meeting } from '../data/executiveStore';
import { CANNED } from '../data/commandCentreData';

export type BriefingFormatId =
  | 'premeeting'
  | 'email'
  | 'boardpack'
  | 'stakeholder';

export type BriefingConfig = {
  id: BriefingFormatId;
  /** Used for scenario fallback + intelligent response routing */
  fallbackQuery: string;
  cannedKey: keyof typeof CANNED | null;
  agents: string[];
  buildUserMessage: (state: ExecutiveState, ar: boolean) => string;
};

function formatMeetingTime(iso: string, ar: boolean) {
  try {
    return new Date(iso).toLocaleString(ar ? 'ar-AE' : 'en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Dubai',
    });
  } catch {
    return iso;
  }
}

export function pickNextMeeting(state: ExecutiveState): Meeting {
  const now = Date.now();
  const upcoming = [...state.meetings].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
  );
  const next = upcoming.find((m) => new Date(m.time).getTime() >= now - 3_600_000);
  return next ?? upcoming[0] ?? state.meetings[0];
}

const DOC_LIST = (state: ExecutiveState, max = 8) =>
  state.documents
    .slice(0, max)
    .map((d) => `- ${d.name}: ${d.summary ?? 'no summary'}`)
    .join('\n');

const OPEN_ACTIONS = (state: ExecutiveState) =>
  state.actionRegister
    .filter((a) => a.status !== 'done')
    .map((a) => `- [${a.status}] ${a.title} (due ${a.due}, owner ${a.owner})`)
    .join('\n') || '- None listed';

export const BRIEFING_CONFIGS: Record<BriefingFormatId, BriefingConfig> = {
  premeeting: {
    id: 'premeeting',
    fallbackQuery: 'Brief me on my 3pm meeting tomorrow.',
    cannedKey: 'Brief me on my 3pm meeting tomorrow.',
    agents: ['cos', 'relationship', 'strategy'],
    buildUserMessage: (state, ar) => {
      const mtg = pickNextMeeting(state);
      const when = formatMeetingTime(mtg.time, ar);
      return ar
        ? `أنشئ إحاطة اجتماع تنفيذية قبل الاجتماع التالي.

**الاجتماع (من التقويم):** ${mtg.title}
**الوقت:** ${when} (توقيت الإمارات)
**الحضور:** ${mtg.attendees}
**المكان:** ${mtg.location}
**حالة التحضير:** ${mtg.prepStatus}

**سجل الإجراءات المفتوحة:**
${OPEN_ACTIONS(state)}

**لمحة السوق:** GCC ${state.marketSnapshot.gccEquities} · أصول رقمية ${state.marketSnapshot.digitalAssetsWoW} · منافس: ${state.marketSnapshot.competitorNote}

**قاعدة المعرفة (استشهد عند الاقتضاء):**
${DOC_LIST(state)}

الهيكل: من · جدول الأعمال المتوقع · نقاط الحديث · مخاطر · طلب مقترح. بدون محادثة عامة.`
        : `Generate an executive **pre-meeting brief** for my next calendar meeting.

**Meeting (from calendar):** ${mtg.title}
**When:** ${when} (UAE time)
**Attendees:** ${mtg.attendees}
**Location:** ${mtg.location}
**Prep status:** ${mtg.prepStatus}

**Open action register:**
${OPEN_ACTIONS(state)}

**Market snapshot:** GCC ${state.marketSnapshot.gccEquities} · digital assets ${state.marketSnapshot.digitalAssetsWoW} · competitor: ${state.marketSnapshot.competitorNote}

**Knowledge base (cite document names when used):**
${DOC_LIST(state)}

Structure: Who · Their likely agenda · Talking points · Watch-outs · Suggested ask. Use > plain-terms blockquote, metric tables, and █ score bars. Max 150 words.`;
    },
  },

  boardpack: {
    id: 'boardpack',
    fallbackQuery: 'What strategic decisions did ADGM make in 2024 and how do they track against Falcon Economy priorities?',
    cannedKey: 'What strategic decisions did ADGM make in 2024 and how do they track against Falcon Economy priorities?',
    agents: ['cos', 'strategy'],
    buildUserMessage: (state, ar) => {
      const boardDocs = state.documents
        .filter((d) => /board|falcon|strategic/i.test(d.name))
        .map((d) => `- ${d.name}: ${d.summary}`)
        .join('\n');
      return ar
        ? `لخّص حزمة مجلس الإدارة إلى قرارات تنفيذية ومحاذاة الاقتصاد الصقور.

**مستندات ذات صلة:**
${boardDocs || DOC_LIST(state)}

**مقاييس حية:** ${state.metrics.departmentsOnTrack}/9 إدارات خضراء · ${state.metrics.openActions} إجراءات مفتوحة.

الهيكل: قرارات مطلوبة · محاذاة الاقتصاد الصقور · مخاطر · توصية واحدة.`
        : `Produce a **board pack summary** — condense materials to decisions, not narrative.

**Relevant knowledge base:**
${boardDocs || DOC_LIST(state)}

**Live context:** ${state.metrics.departmentsOnTrack}/9 departments green · ${state.metrics.openActions} open actions.

Structure: Decisions required · Falcon Economy alignment score/narrative · Risks · One recommendation. Markdown for board prep.`;
    },
  },

  stakeholder: {
    id: 'stakeholder',
    fallbackQuery:
      'Stakeholder profile for Singapore MAS delegation Deputy MD from CRM and meeting history.',
    cannedKey: null,
    agents: ['relationship', 'cos'],
    buildUserMessage: (state, ar) => {
      const mtg = state.meetings.find((m) => /mas|singapore/i.test(m.title)) ?? pickNextMeeting(state);
      return ar
        ? `أنشئ **ملف صاحب مصلحة** للاجتماع: ${mtg.title}.

استخدم التقويم والإجراءات المفتوحة. إن لم تتوفر بيانات CRM تفصيلية، استنتج بشكل معقول من سياق ADGM–MAS.

**الاجتماع:** ${mtg.title} · ${formatMeetingTime(mtg.time, ar)}
**الإجراءات ذات الصلة:** ${OPEN_ACTIONS(state)}

الهيكل: العلاقة · مجالات الاهتمام · متابعات مفتوحة · شبكة ADGM · الخطوة التالية.`
        : `Generate a **stakeholder profile** for: ${mtg.title}.

Use calendar and action register. If CRM detail is thin, infer reasonably from ADGM–MAS context and label assumptions.

**Meeting:** ${mtg.title} · ${formatMeetingTime(mtg.time, ar)}
**Related actions:** ${OPEN_ACTIONS(state)}

Structure: Relationship warmth · Focus areas · Open follow-ups · ADGM network · Suggested next step.`;
    },
  },

  email: {
    id: 'email',
    fallbackQuery: 'Draft an email for me',
    cannedKey: null,
    agents: ['comms'],
    buildUserMessage: (state, ar) => {
      return ar
        ? `صِغ **مسودة بريد إلكتروني** جاهزة للإرسال.

**السياق المتاح:** مستندات مرفوعة · سجل الإجراءات · ملاحظات من قاعدة المعرفة
${DOC_LIST(state, 4)}

**إجراءات مفتوحة:**
${OPEN_ACTIONS(state)}

أنشئ مسودة احترافية جاهزة للنسخ — بدون أسئلة متابعة. افترض سياقاً معقولاً إذا لزم.`
        : `Draft a **ready-to-send email**.

**Available context:** uploaded documents · action register · knowledge base notes
${DOC_LIST(state, 4)}

**Open actions:**
${OPEN_ACTIONS(state)}

Produce a clean, copy-paste friendly draft — no follow-up questions. Use sensible assumptions where needed.`;
    },
  },
};

export function getBriefingConfig(id: string): BriefingConfig {
  return BRIEFING_CONFIGS[id as BriefingFormatId] ?? BRIEFING_CONFIGS.premeeting;
}

export function getCannedBriefingText(config: BriefingConfig): string | null {
  if (!config.cannedKey) return null;
  return CANNED[config.cannedKey] ?? null;
}

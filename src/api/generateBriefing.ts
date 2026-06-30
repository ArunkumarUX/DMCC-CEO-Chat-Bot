import type { ExecutiveState } from '../data/executiveStore';
import { buildChatContext } from './buildChatContext';
import { streamClaudeChat, type ChatStreamContext } from './claudeChat';
import {
  buildBriefingKbQuery,
  getBriefingConfig,
  type BriefingFormatId,
} from './briefingConfig';

const USE_CLAUDE = true; // always use Claude; env var previously blocked responses on Vercel

export type GenerateBriefingOptions = {
  formatId: string;
  state: ExecutiveState;
  language: 'en' | 'ar';
  /** User-pasted agenda, email, board text, or notes — required for generation */
  userPaste: string;
  onToken?: (chunk: string) => void;
  signal?: AbortSignal;
};

export type GenerateBriefingResult = {
  text: string;
  source: 'claude' | 'offline';
  agents: string[];
};

function buildBriefingContext(
  state: ExecutiveState,
  formatId: string,
  language: 'en' | 'ar',
  userPaste: string,
): ChatStreamContext {
  const config = getBriefingConfig(formatId);
  const ar = language === 'ar';
  const message = config.buildUserMessage(state, ar, userPaste);
  const base = buildChatContext(state, {
    query: buildBriefingKbQuery(userPaste, config),
    routedAgents: config.agents as import('../types').AgentType[],
  });
  return {
    ...base,
    language,
    userQuestion: message,
    briefingFormat: formatId,
    meetings: state.meetings.map((m) => ({
      title: m.title,
      time: m.time,
      attendees: m.attendees,
      location: m.location,
      prepStatus: m.prepStatus,
    })),
    openActions: state.actionRegister
      .filter((a) => a.status !== 'done')
      .map((a) => ({
        title: a.title,
        due: a.due,
        status: a.status,
        owner: a.owner,
      })),
    marketSnapshot: state.marketSnapshot,
  };
}

// ─────────────────────────────────────────────────────────────
// Offline fallbacks — each follows the SAME numbered-section template
// as the live server prompt, so degraded mode never returns the wrong
// briefing shape. Built from the user's pasted content.
// ─────────────────────────────────────────────────────────────

function numberedSections(items: [string, string][]): string {
  return items.map(([h, body], i) => `**${i + 1}. ${h}**\n${body}`).join('\n\n');
}

function firstContentLine(paste: string): string {
  return (
    paste
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !/^(from|to|subject|date|sent|cc)[:\s]/i.test(l))[0] ?? ''
  );
}

function extractSubject(paste: string): string {
  return paste.match(/^subject[:\s]+(.+)$/im)?.[1]?.trim() ?? '';
}

function extractNames(paste: string): string {
  const names = new Set<string>();
  for (const m of paste.matchAll(/(?:^|\s)(?:from|to|dear|hi|hello|regards,?|attn)[:\s]+([A-Z][a-zA-Z]+(?:\s[A-Z][a-zA-Z]+)?)/gim)) {
    if (m[1]) names.add(m[1].trim());
  }
  return [...names].slice(0, 4).join(', ');
}

const OFFLINE_NOTE_EN = '\n\n*(Offline draft — connect the AI service for a fully analysed briefing.)*';
const OFFLINE_NOTE_AR = '\n\n*(مسودة دون اتصال — اتصل بخدمة الذكاء الاصطناعي للحصول على إحاطة كاملة.)*';

function buildOfflinePremeeting(paste: string, ar: boolean): string {
  const topic = extractSubject(paste) || firstContentLine(paste) || (ar ? 'انظر المحتوى الملصق' : 'see pasted content');
  const people = extractNames(paste) || (ar ? 'غير محدد في النص' : 'not identified in pasted text');
  if (ar) {
    return numberedSections([
      ['لمحة الاجتماع', `- الغرض: ${topic}\n- المشاركون الرئيسيون: ${people}\n- المواضيع: مستخلصة من النص الملصق`],
      ['الملخص التنفيذي', 'راجع المحتوى الملصق أعلاه؛ النقاط الرئيسية مذكورة في أول فقرات النص.'],
      ['القرارات الرئيسية', '- القرار: حدده من جدول الأعمال · الموقف المقترح: يتطلب تحليل الذكاء الاصطناعي · السبب: —'],
      ['سياق مهم', 'تحقق من مستندات قاعدة المعرفة ذات الصلة قبل الاجتماع.'],
      ['المخاطر والمخاوف', '- لم يتم تحليلها دون اتصال — راجع النص الملصق للنقاط الحساسة.'],
      ['ملاحظات أصحاب المصلحة', people],
      ['نقاط الحديث', '- أكد الأهداف المشتركة\n- اطلب توضيح الجدول الزمني\n- حدد المسؤوليات\n- اقترح خطوة تالية واضحة\n- اختم بالتزامات مؤكدة'],
      ['أسئلة للطرح', '- ما القرار المطلوب اليوم؟\n- ما العوائق الحالية؟\n- من المسؤول عن كل بند؟\n- ما الجدول الزمني؟\n- ما الخطوة التالية؟'],
      ['إحاطة 30 ثانية', `الاجتماع حول: ${topic}. راجع النص الملصق للنقاط الأساسية وادخل بهدف واحد واضح.`],
    ]) + OFFLINE_NOTE_AR;
  }
  return numberedSections([
    ['Meeting Snapshot', `- Purpose: ${topic}\n- Key participants: ${people}\n- Main topics: per pasted content`],
    ['Executive Summary', 'See the pasted content above — key context is in its opening lines. Full synthesis requires the AI service.'],
    ['Key Decisions', '- Decision: identify from the agenda · Recommended position: requires AI analysis · Reason: —'],
    ['Important Context', 'Check related knowledge-base documents before the meeting.'],
    ['Risks & Concerns', '- Not analysed offline — review pasted text for sensitive points.'],
    ['Stakeholder Notes', people],
    ['Talking Points', '- Confirm shared objectives\n- Ask for timeline clarity\n- Pin ownership per item\n- Propose one clear next step\n- Close with confirmed commitments'],
    ['Questions to Ask', '- What decision is needed today?\n- What are the current blockers?\n- Who owns each item?\n- What is the timeline?\n- What is the next step?'],
    ['30-Second Brief', `Meeting concerns: ${topic}. Review the pasted material for specifics and enter with one clear ask.`],
  ]) + OFFLINE_NOTE_EN;
}

function buildOfflineEmailReply(paste: string, ar: boolean): string {
  const senderMatch =
    paste.match(/(?:from|regards|sincerely|thanks(?: & regards)?)[,:\s]+([A-Z][a-zA-Z]+)/i) ??
    paste.match(/^(?:dear|hi|hello)\s+([A-Z][a-zA-Z]+)/im);
  const sender = senderMatch?.[1] ?? '';
  const firstLine = firstContentLine(paste);
  if (ar) {
    return numberedSections([
      ['فهم البريد', `الطلب الرئيسي: ${firstLine || 'انظر النص الملصق'} · الإلحاح: متوسط · الإجراء المطلوب: رد بالتأكيد والخطوات التالية.`],
      ['استراتيجية الرد المقترحة', 'رد مهذب ومباشر: أكّد الاستلام، أجب على النقاط الأساسية، واختم بخطوة تالية واضحة.'],
      ['رد جاهز للإرسال', `${sender ? `عزيزي ${sender}،` : 'تحية طيبة،'}\n\nشكراً لرسالتك. أؤكد استلام النقاط الواردة وسنعمل عليها. سأعود إليك بالتفاصيل والخطوات التالية خلال يومي عمل.\n\nمع خالص التحية،\nراجيف`],
      ['نسخة مختصرة', `${sender ? `عزيزي ${sender}،` : 'تحية طيبة،'} شكراً لرسالتك — تم الاستلام وسأرد بالتفاصيل قريباً. راجيف`],
      ['إجراءات المتابعة', '- مراجعة النقاط المطلوبة وتحديد المسؤولين\n- تحديد موعد للمتابعة'],
    ]) + OFFLINE_NOTE_AR;
  }
  return numberedSections([
    ['Email Understanding', `Main request: ${firstLine || 'see pasted text'} · Urgency: medium · Required action: reply confirming receipt and next steps.`],
    ['Recommended Reply Strategy', 'Acknowledge promptly, answer the key points directly, confirm ownership, and close with one clear next step.'],
    ['Ready-to-Send Email', `${sender ? `Dear ${sender},` : 'Hello,'}\n\nThank you for your email. I confirm receipt of the points raised and we will take them forward. I will come back to you with details and next steps within two working days.\n\nBest regards,\nNeeraj`],
    ['Short Version', `${sender ? `Dear ${sender},` : 'Hello,'} thanks for your note — received and in hand; details to follow shortly. Neeraj`],
    ['Follow-Up Actions', '- Review the requested items and assign owners\n- Schedule a follow-up touchpoint'],
  ]) + OFFLINE_NOTE_EN;
}

function buildOfflineBoardpack(paste: string, ar: boolean): string {
  const topic = extractSubject(paste) || firstContentLine(paste) || (ar ? 'انظر المواد الملصقة' : 'see pasted materials');
  const na = ar ? 'غير متوفر في المصادر' : 'Not in available sources';
  if (ar) {
    return numberedSections([
      ['ملخص المجلس', `المواد تتعلق بـ: ${topic}. التحليل الكامل يتطلب خدمة الذكاء الاصطناعي.`],
      ['القضايا الرئيسية', '- مستخلصة من المواد الملصقة — راجع العناوين الرئيسية.'],
      ['القرارات المطلوبة', `- القرار: حدده من المواد · التوصية: ${na} · الأثر: — · مخاطر التأخير: —`],
      ['اللمحة المالية', `الإيرادات: ${na} · التكاليف: ${na} · الربح/الخسارة: ${na} · انحراف الموازنة: ${na} · تغيرات التوقعات: ${na}`],
      ['المخاطر الرئيسية', `- ${na} — لا تُخترع تقييمات دون مصدر.`],
      ['أبرز الأداء', na],
      ['أسئلة للمجلس', '- ما القرار المطلوب في هذا الاجتماع؟\n- ما الافتراضات خلف التوقعات؟\n- أين أكبر انحراف عن الموازنة؟\n- ما خطة معالجة المخاطر العالية؟\n- ما الذي يتطلب موافقة المجلس اليوم؟'],
      ['إحاطة دقيقة واحدة', `المواد حول: ${topic}. اطلب التحليل الكامل عبر الخدمة المتصلة قبل اتخاذ قرارات.`],
    ]) + OFFLINE_NOTE_AR;
  }
  return numberedSections([
    ['Board Summary', `Materials concern: ${topic}. Full synthesis requires the AI service.`],
    ['Key Issues', '- Extract from pasted materials — review main headings.'],
    ['Decisions Required', `- Decision: identify from materials · Recommendation: ${na} · Business impact: — · Risk if delayed: —`],
    ['Financial Snapshot', `Revenue: ${na} · Costs: ${na} · Profit/loss: ${na} · Budget variance: ${na} · Forecast changes: ${na}`],
    ['Major Risks', `- ${na} — no severity ratings invented without a source.`],
    ['Performance Highlights', na],
    ['Questions for the Board', '- What decision is required at this meeting?\n- What assumptions sit behind the forecast?\n- Where is the largest budget variance?\n- What is the mitigation plan for high risks?\n- What requires board approval today?'],
    ['One-Minute Board Brief', `Pack concerns: ${topic}. Obtain the full AI analysis before taking decisions.`],
  ]) + OFFLINE_NOTE_EN;
}

function buildOfflineStakeholder(paste: string, ar: boolean): string {
  const who = extractNames(paste) || extractSubject(paste) || firstContentLine(paste) || (ar ? 'غير محدد' : 'not identified');
  const na = ar ? 'غير متوفر في الملاحظات الملصقة' : 'Not available in pasted notes';
  if (ar) {
    return numberedSections([
      ['نظرة عامة على صاحب المصلحة', `الاسم: ${who} · الدور: ${na} · المنظمة: ${na} · الأقدمية: ${na} · العلاقة بالمشروع: ${na}`],
      ['الملخص', 'استخلص من الملاحظات الملصقة؛ التحليل الكامل يتطلب خدمة الذكاء الاصطناعي.'],
      ['الأولويات', `- ${na}`],
      ['مستوى التأثير', 'القرار: — · الموازنة: — · السياسي: — · التشغيلي: — (يتطلب تحليلاً)'],
      ['أسلوب التواصل', na],
      ['المخاطر والحساسيات', `- ${na}`],
      ['استراتيجية التعامل', 'حضّر بياناً واضحاً للقيمة، وأكد الالتزامات المفتوحة، واختم بخطوة تالية محددة.'],
      ['نقاط الحديث', '- أكد الأولويات المشتركة\n- راجع الالتزامات المفتوحة\n- اعرض خطوة تالية واضحة\n- اطلب ملاحظاتهم\n- أكّد قناة المتابعة'],
      ['أسئلة محتملة', '- ما حالة الالتزامات السابقة؟\n- ما الجدول الزمني؟\n- من نقطة الاتصال؟'],
      ['إحاطة 30 ثانية', `صاحب المصلحة: ${who}. راجع الملاحظات الملصقة قبل اللقاء وادخل بخطوة تالية واحدة واضحة.`],
    ]) + OFFLINE_NOTE_AR;
  }
  return numberedSections([
    ['Stakeholder Overview', `Name: ${who} · Role: ${na} · Organization: ${na} · Seniority: ${na} · Relationship to project: ${na}`],
    ['Summary', 'Derive from the pasted notes; full profiling requires the AI service.'],
    ['Priorities', `- ${na}`],
    ['Influence Level', 'Decision: — · Budget: — · Political: — · Operational: — (requires analysis)'],
    ['Communication Style', na],
    ['Risks & Sensitivities', `- ${na}`],
    ['Engagement Strategy', 'Prepare a clear value statement, confirm open commitments, close with one specific next step.'],
    ['Talking Points', '- Confirm shared priorities\n- Review open commitments\n- Offer one clear next step\n- Invite their feedback\n- Confirm the follow-up channel'],
    ['Likely Questions', '- What is the status of prior commitments?\n- What is the timeline?\n- Who is the point of contact?'],
    ['30-Second Stakeholder Brief', `Stakeholder: ${who}. Review the pasted notes before meeting and enter with one clear next step.`],
  ]) + OFFLINE_NOTE_EN;
}

function buildOfflineBriefing(formatId: BriefingFormatId, paste: string, ar: boolean): string {
  switch (formatId) {
    case 'email':
      return buildOfflineEmailReply(paste, ar);
    case 'boardpack':
      return buildOfflineBoardpack(paste, ar);
    case 'stakeholder':
      return buildOfflineStakeholder(paste, ar);
    case 'premeeting':
    default:
      return buildOfflinePremeeting(paste, ar);
  }
}

export async function generateBriefing({
  formatId,
  state,
  language,
  userPaste,
  onToken,
  signal,
}: GenerateBriefingOptions): Promise<GenerateBriefingResult> {
  const config = getBriefingConfig(formatId);
  const ar = language === 'ar';
  const paste = userPaste.trim();
  if (!paste) {
    throw new Error(ar ? 'الصق المحتوى أولاً' : 'Paste your content first');
  }
  const message = config.buildUserMessage(state, ar, paste);
  const agents = config.agents;

  if (USE_CLAUDE) {
    try {
      let streamed = '';
      await streamClaudeChat({
        message,
        language,
        history: [],
        context: buildBriefingContext(state, formatId, language, paste),
        signal,
        onToken: (chunk) => {
          streamed += chunk;
          onToken?.(chunk);
        },
      });
      if (streamed.trim()) {
        return { text: streamed, source: 'claude', agents };
      }
      throw new Error('Empty response from Claude');
    } catch (err) {
      console.warn('[briefing] Claude failed, using offline template fallback', err);
    }
  }

  // Offline fallback — ALWAYS the correct template shape for the selected format,
  // built from the user's pasted content. Never unrelated canned scenarios.
  const offline = buildOfflineBriefing(config.id, paste, ar);
  onToken?.(offline);
  return { text: offline, source: 'offline', agents };
}

export function isBriefingFormatId(id: string): id is BriefingFormatId {
  return id in { premeeting: 1, email: 1, boardpack: 1, stakeholder: 1 };
}

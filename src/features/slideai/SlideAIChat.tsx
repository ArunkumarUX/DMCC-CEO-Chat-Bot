import { useState, useRef, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { CcIcon } from '../../command-centre/CcIcon';
import { useApp } from '../../context/AppContext';
import { useSlideStore } from './useSlideStore';
import { ALLOWED_SLIDE_COUNTS } from '../../api/perceptisDeckPayload';
import { runSlideAgent } from './claudeSlideAgent';
import { fetchSlideAiHealth, slideAiBannerMessage } from './slideAiHealth';
import { PORTFOLIO_QUICK_STARTS } from './mckinseyGuidanceContent';
import {
  formatSlideAiExecutiveBrief,
  userRequestsSlideContext,
} from './buildSlideAiContext';
import { userRequestsNewDeck } from './parseDeckRequest';

const QUICK_PROMPTS_EN = [
  {
    id: 'ceo-board',
    label: 'CEO board pack',
    prompt:
      'Use Command Centre context — 8-slide DMCC CEO board pack: member services, gold & diamonds, free zone compliance, Dubai Diamond Conference',
  },
  {
    id: 'strategy-update',
    label: 'Leadership strategy update',
    prompt:
      '8-slide McKinsey-style strategy update for DMCC leadership — sapphire/navy hero, KPI slides, Gold · Diamonds · Cyber · Member Services benchmarks',
  },
  {
    id: 'fot-investor',
    label: 'Future of Trade deck',
    prompt:
      'Create an investor/partner deck for Future of Trade 2026: commodities corridors, Singapore launch, DMCC Commodity Trade Index',
  },
];

const QUICK_PROMPTS_AR = [
  {
    id: 'ceo-board',
    label: 'حزمة مجلس الرئيس التنفيذي',
    prompt:
      'أنشئ عرضاً من 8 شرائح لمجلس DMCC: خدمات الأعضاء، الذهب والماس، امتثال المنطقة الحرة، مؤتمر دبي للماس',
  },
  {
    id: 'fot-investor',
    label: 'عرض مستقبل التجارة',
    prompt: 'عرض لمستقبل التجارة 2026 وممرات السلع وإطلاق سنغافورة',
  },
];

/**
 * Consulting-grade deck templates — full prompts adapted to DMCC context.
 * These populate the input field (not auto-sent) so the user can review before generating.
 */
export const DECK_TEMPLATES = [
  {
    id: 'ai-platform',
    icon: 'cpu',
    label: 'AI Decision Support Platform',
    description: '8-slide McKinsey-grade strategy deck — building the Personal AI for DMCC CEO',
    prompt: `Create an 8-slide consulting-grade, board-ready strategy presentation for DMCC CEO Ahmed Bin Sulayem.

Topic: Building an AI-powered Executive Decision Support Platform for DMCC
Audience: CEO and DMCC senior leadership team — commercially sharp, time-poor, decision-oriented
Context: DMCC (26,000+ companies, 900+ activities, gold & diamonds ecosystems, DMCC Cyber, Uptown Dubai, Member Services) needs a governed AI intelligence layer for CEO decision-making.

Required 8-slide structure:
1. Title slide — premium navy hero
2. Executive summary — recommendation first: pilot the AI platform starting with 3 high-value use cases
3. Strategic context and current pain points — information fragmentation, inconsistent briefing quality, fragmented signals across commodities and member services
4. Strategic positioning — intelligence layer (not chatbot): trade corridors, member SLAs, FDI pipeline, board briefings
5. Priority use cases 2×2 matrix — CEO meeting briefings, GCC commodity signals, Diamond Conference prep, board pack generation
6. Target platform model and governance — Executive Home + AI Strategy Agent + Briefings + Knowledge Base + Governance Layer; source control, permissioning, audit trail
7. Pilot roadmap — 3 phases: design → build → launch
8. Decisions required — what CEO must approve, pilot scope, success metrics, next milestone

Rules: Answer-first, action slide titles (full sentence insight), one message per slide, MECE structure, exhibit on every slide, no generic AI language, separate facts/assumptions/recommendations. Deep navy hero title and close, white content slides. Use Command Centre context.`,
  },
  {
    id: 'commodities-growth',
    icon: 'trending-up',
    label: 'Commodities Growth Strategy',
    description: '8-slide exhibit-led deck — gold, diamonds, Cyber and member growth for DMCC',
    prompt: `Create an 8-slide consulting-grade, chart-led, board-ready strategy presentation for DMCC CEO Ahmed Bin Sulayem.

Topic: Commodities Ecosystems & Free Zone Growth Strategy for DMCC
Audience: CEO Ahmed Bin Sulayem and DMCC senior leadership — institutional, evidence-focused
Context: DMCC (Gold & Precious Metals, Dubai Diamond Exchange, DMCC Cyber, Tea/Coffee, Member Services, Uptown Dubai) is accelerating trade corridors and member acquisition vs ADGM/DIFC/JAFZA.

Required 8-slide structure:
1. Title slide — "Gold, diamonds and Cyber are DMCC's highest-growth vectors in 2026"
2. Executive summary — recommended posture: prioritise diamond corridor MoU, Cyber member growth, Uptown Dubai activation
3. Market momentum — commodity trade growth chart (diamond trade USD 41.7B, gold ecosystem +12% YoY)
4. Competitive opportunity — DMCC vs ADGM/DIFC free-zone benchmarks (bar chart)
5. Corridor benchmark — Antwerp/Mumbai/Singapore vs Dubai Diamond Exchange + Future of Trade index
6. Opportunity prioritisation 2×2 matrix — strategic value vs feasibility: Diamond MoU, Cyber/Tether, Uptown, Member SLA
7. Strategic options matrix and risk — 4 options scored with impact and risk; sanctions, licensing, competitor free zones
8. Decisions required — approve MoU spend, Cyber launch comms, Uptown Phase 1, next milestone

Rules: Chart-led (6+ exhibits), at least 4 quantitative charts, action titles, source notes on every chart. Deep navy executive theme.`,
  },
] as const;

const LOADING_STEPS_EN = [
  'Sending your brief to SlideAI…',
  'Structuring the executive storyline…',
  'Building slides with charts & exhibits…',
  'Applying DMCC brand…',
];

const LOADING_STEPS_AR = [
  'إرسال الموجز إلى SlideAI…',
  'هيكلة القصة التنفيذية…',
  'بناء الشرائح بالرسوم والجداول…',
  'تطبيق هوية DMCC…',
];

export default function SlideAIChat() {
  const { settings, executiveState } = useApp();
  const ar = settings.language === 'ar';
  const [input, setInput] = useState('');
  const {
    chatHistory,
    deck,
    isLoading,
    loadingStep,
    addMessage,
    applyAgentResult,
    setLoading,
    setLoadingStep,
  } = useSlideStore(
    useShallow((s) => ({
      chatHistory: s.chatHistory,
      deck: s.deck,
      isLoading: s.isLoading,
      loadingStep: s.loadingStep,
      addMessage: s.addMessage,
      applyAgentResult: s.applyAgentResult,
      setLoading: s.setLoading,
      setLoadingStep: s.setLoadingStep,
    })),
  );
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const suggestions = ar ? QUICK_PROMPTS_AR : QUICK_PROMPTS_EN;
  const loadingSteps = ar ? LOADING_STEPS_AR : LOADING_STEPS_EN;
  const [apiHealth, setApiHealth] = useState<Awaited<ReturnType<typeof fetchSlideAiHealth>> | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [slideCount, setSlideCount] = useState<number>(8);

  useEffect(() => {
    fetchSlideAiHealth().then(setApiHealth);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading, loadingStep]);

  useEffect(() => {
    if (!isLoading) return;
    const timer = window.setInterval(() => {
      setLoadingStep((loadingStep + 1) % loadingSteps.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isLoading, loadingStep, loadingSteps.length, setLoadingStep]);

  function stopGeneration() {
    abortRef.current?.abort();
    abortRef.current = null;
    setLoading(false);
    addMessage({
      role: 'assistant',
      content: ar
        ? 'تم إيقاف الإنشاء. يمكنك إعادة المحاولة أو تعديل الموجز.'
        : 'Generation stopped. You can retry or refine your brief.',
    });
  }

  async function send(text?: string) {
    const userMsg = (text ?? input).trim();
    if (!userMsg || isLoading) return;
    setInput('');
    addMessage({ role: 'user', content: userMsg });

    const forceNew = userRequestsNewDeck(userMsg);

    const executiveBrief = userRequestsSlideContext(userMsg)
      ? formatSlideAiExecutiveBrief(executiveState, userMsg)
      : undefined;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setLoadingStep(0);

    addMessage({
      role: 'assistant',
      content: ar
        ? 'جاري إنشاء عرضك — ستظهر المعاينة على اليمين خلال ثوانٍ.'
        : 'Building your deck — preview will appear on the right in seconds.',
    });

    try {
      const result = await runSlideAgent(userMsg, chatHistory, forceNew ? null : deck, {
        executiveBrief,
        forceNewDeck: forceNew,
        slideCount,
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      const updated = applyAgentResult(result);
      if (result.message) {
        addMessage({
          role: 'assistant',
          content: updated
            ? result.message
            : ar
              ? `${result.message} (لم يتم تحديث الشرائح — أعد صياغة الطلب.)`
              : `${result.message} (No slide changes applied — try rephrasing.)`,
        });
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      addMessage({
        role: 'assistant',
        content: ar
          ? `تعذّر الإنشاء: ${err instanceof Error ? err.message : 'خطأ غير معروف'}`
          : `Generation failed: ${err instanceof Error ? err.message : 'unknown error'}`,
      });
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
      setLoading(false);
      fetchSlideAiHealth().then(setApiHealth);
    }
  }

  return (
    <div className="cc-slideai__chat">
      {apiHealth && !apiHealth.available ? (
        <div className="cc-slideai__api-banner" role="status">
          {slideAiBannerMessage(ar, apiHealth)}
        </div>
      ) : null}
      <div className="cc-slideai__messages" role="log" aria-live="polite">
        {chatHistory.length === 0 && (
          <div className="cc-slideai__empty">
            <p className="cc-slideai__empty-title">
              {ar
                ? 'صف عرضك — SlideAI · DMCC'
                : 'Describe your deck — SlideAI · DMCC'}
            </p>
            <p className="cc-slideai__empty-sub">
              {ar
                ? 'يُنشأ العرض فوراً عبر Opus — قل "استخدم سياق مركز القيادة" للحقائق الداخلية.'
                : 'Decks build in seconds with Opus — say "use Command Centre context" for internal facts.'}
            </p>

            <section className="cc-slideai__prompt-section" aria-label={ar ? 'قوالب العروض' : 'Deck templates'}>
              <h3 className="cc-slideai__prompt-section-title">
                {ar ? 'قوالب منظومات DMCC' : 'DMCC ecosystem templates'}
              </h3>
              <ul className="cc-slideai__prompt-list">
                {PORTFOLIO_QUICK_STARTS.map((tpl) => (
                  <li key={tpl.id}>
                    <button
                      type="button"
                      className="cc-slideai__template-btn"
                      onClick={() => setInput(tpl.prompt)}
                      title={ar ? 'تحميل في حقل الإدخال' : 'Load into input — review then send'}
                    >
                      <span className="cc-slideai__template-btn-icon" aria-hidden>
                        <CcIcon name={tpl.icon as 'cpu'} size={14} />
                      </span>
                      <span className="cc-slideai__template-btn-body">
                        <span className="cc-slideai__template-btn-title">
                          {ar ? tpl.labelAr : tpl.labelEn}
                        </span>
                        <span className="cc-slideai__template-btn-desc">
                          {ar ? tpl.descriptionAr : tpl.descriptionEn}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="cc-slideai__prompt-section" aria-label={ar ? 'قوالب إضافية' : 'More templates'}>
              <div className="cc-slideai__prompt-section-head">
                <h3 className="cc-slideai__prompt-section-title">
                  {ar ? 'قوالب إضافية' : 'More templates'}
                </h3>
                <button
                  type="button"
                  className="cc-slideai__prompt-toggle"
                  onClick={() => setShowTemplates((v) => !v)}
                  aria-expanded={showTemplates}
                >
                  {showTemplates ? (ar ? 'إخفاء' : 'Hide') : (ar ? 'عرض' : 'Show')}
                </button>
              </div>
              {showTemplates && (
                <ul className="cc-slideai__prompt-list">
                  {DECK_TEMPLATES.map((tpl) => (
                    <li key={tpl.id}>
                      <button
                        type="button"
                        className="cc-slideai__template-btn"
                        onClick={() => setInput(tpl.prompt)}
                        title={ar ? 'تحميل في حقل الإدخال' : 'Load into input — review then send'}
                      >
                        <span className="cc-slideai__template-btn-icon" aria-hidden>
                          <CcIcon name={tpl.icon as 'cpu'} size={14} />
                        </span>
                        <span className="cc-slideai__template-btn-body">
                          <span className="cc-slideai__template-btn-title">{tpl.label}</span>
                          <span className="cc-slideai__template-btn-desc">{tpl.description}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="cc-slideai__prompt-section" aria-label={ar ? 'اقتراحات سريعة' : 'Quick prompts'}>
              <h3 className="cc-slideai__prompt-section-title">
                {ar ? 'اقتراحات سريعة' : 'Quick prompts'}
              </h3>
              <ul className="cc-slideai__prompt-list">
                {suggestions.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="cc-slideai__quick-btn"
                      onClick={() => send(item.prompt)}
                      title={item.prompt}
                    >
                      <span className="cc-slideai__quick-btn-label">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
        {chatHistory.map((m, i) => (
          <div key={i} className={`cc-slideai__msg cc-slideai__msg--${m.role}`}>
            <div className="cc-slideai__bubble">{m.content}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {isLoading && (
        <div className="cc-slideai__generation" aria-live="polite" aria-busy="true">
          <div className="cc-slideai__bubble cc-slideai__bubble--loading">
            <span className="cc-slideai__typing" aria-hidden />
            <span className="cc-slideai__loading-text">
              {loadingSteps[Math.min(loadingStep, loadingSteps.length - 1)]}
            </span>
          </div>
          <button
            type="button"
            className="cc-slideai__stop"
            onClick={stopGeneration}
            aria-label={ar ? 'إيقاف الإنشاء' : 'Stop generation'}
          >
            <CcIcon name="square" size={14} />
            {ar ? 'إيقاف' : 'Stop'}
          </button>
        </div>
      )}

      <div className="cc-slideai__slidecount-row" role="radiogroup" aria-label={ar ? 'عدد الشرائح' : 'Slide count'}>
        <span className="cc-slideai__slidecount-label">{ar ? 'الشرائح' : 'Slides'}</span>
        {ALLOWED_SLIDE_COUNTS.map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={slideCount === n}
            className={`pill cc-slideai__slidecount-pill${slideCount === n ? ' cc-slideai__slidecount-pill--on' : ''}`}
            onClick={() => setSlideCount(n)}
          >
            {n}
          </button>
        ))}
        <span className="cc-slideai__slidecount-hint muted-3">
          {ar ? 'أقل = أسرع' : 'fewer = faster'}
        </span>
      </div>

      <div className="cc-slideai__composer">
        <textarea
          className="cc-slideai__input"
          placeholder={
            ar
              ? 'صف العرض التنفيذي الذي تريده…'
              : 'Describe the executive deck you need…'
          }
          value={input}
          rows={2}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <button
          type="button"
          className={`btn-primary cc-slideai__send${isLoading ? ' cc-slideai__send--stop' : ''}`}
          onClick={() => (isLoading ? stopGeneration() : send())}
          disabled={!isLoading && !input.trim()}
          aria-label={isLoading ? (ar ? 'إيقاف الإنشاء' : 'Stop generation') : ar ? 'إرسال' : 'Send'}
        >
          <CcIcon name={isLoading ? 'square' : 'send'} size={18} />
        </button>
      </div>
    </div>
  );
}

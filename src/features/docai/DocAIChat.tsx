import { useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { CcIcon } from '../../command-centre/CcIcon';
import { useApp } from '../../context/AppContext';
import { formatDocAiExecutiveBrief } from './buildDocAiContext';
import { runDocAgent, userRequestsDocContext, userRequestsNewDoc } from './claudeDocAgent';
import { docAiBannerMessage, fetchDocAiHealth } from './docAiHealth';
import {
  DOC_AUDIENCES,
  DOC_PURPOSES,
  DOC_STYLES,
  DOC_TYPES,
  QUICK_DOC_TEMPLATES,
  labelFor,
} from './documentCatalog';
import { useDocStore } from './useDocStore';

const LOADING_EN = [
  'Analysing purpose and audience…',
  'Structuring the executive narrative…',
  'Drafting CEO-grade sections…',
  'Applying DMCC branding…',
];

const LOADING_AR = [
  'تحليل الغرض والجمهور…',
  'هيكلة السرد التنفيذي…',
  'صياغة الأقسام…',
  'تطبيق هوية DMCC…',
];

const SMART_ACTIONS = [
  { id: 'one-pager', label: 'One-page version', prompt: 'Create a one-page executive summary version of this document.' },
  { id: 'board', label: 'Board version', prompt: 'Convert this into a board-level report — tighter decisions, risk, and asks.' },
  { id: 'investor', label: 'Investor version', prompt: 'Make this investor-friendly — commercial clarity, traction, ask, and risks.' },
  { id: 'action-plan', label: 'Action plan', prompt: 'Add a 90-day implementation plan with owners and milestones.' },
  { id: 'decisions', label: 'Extract decisions', prompt: 'Extract key decisions required into a clear decision memo section.' },
  { id: 'email', label: 'Email summary', prompt: 'Generate a short email summary leaders can forward.' },
];

export default function DocAIChat() {
  const { settings, executiveState } = useApp();
  const ar = settings.language === 'ar';
  const [input, setInput] = useState('');
  const [wizardStep, setWizardStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const {
    chatHistory,
    document,
    brief,
    isLoading,
    loadingStep,
    addMessage,
    applyAgentResult,
    setBrief,
    setLoading,
    setLoadingStep,
  } = useDocStore(
    useShallow((s) => ({
      chatHistory: s.chatHistory,
      document: s.document,
      brief: s.brief,
      isLoading: s.isLoading,
      loadingStep: s.loadingStep,
      addMessage: s.addMessage,
      applyAgentResult: s.applyAgentResult,
      setBrief: s.setBrief,
      setLoading: s.setLoading,
      setLoadingStep: s.setLoadingStep,
    })),
  );

  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const loadingSteps = ar ? LOADING_AR : LOADING_EN;
  const [apiHealth, setApiHealth] = useState<Awaited<ReturnType<typeof fetchDocAiHealth>> | null>(null);

  useEffect(() => {
    fetchDocAiHealth().then(setApiHealth);
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

  const briefReady = Boolean(brief.docType && brief.purpose && brief.audience && brief.style);

  const briefSummary = useMemo(() => {
    if (!brief.docType) return '';
    return [
      labelFor(DOC_TYPES, brief.docType, ar),
      labelFor(DOC_PURPOSES, brief.purpose, ar),
      labelFor(DOC_AUDIENCES, brief.audience, ar),
      labelFor(DOC_STYLES, brief.style, ar),
    ]
      .filter((x) => x && x !== '—')
      .join(' · ');
  }, [brief, ar]);

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

  async function send(text?: string, opts?: { forceNew?: boolean; useContext?: boolean }) {
    const userMsg = (text ?? input).trim();
    if (!userMsg || isLoading) return;
    setInput('');
    addMessage({ role: 'user', content: userMsg });

    const forceNew = opts?.forceNew || userRequestsNewDoc(userMsg);
    const executiveBrief =
      opts?.useContext || userRequestsDocContext(userMsg)
        ? formatDocAiExecutiveBrief(executiveState, userMsg)
        : undefined;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setLoadingStep(0);

    addMessage({
      role: 'assistant',
      content: ar
        ? 'جاري إعداد المستند — ستظهر المعاينة على اليمين خلال ثوانٍ.'
        : 'Preparing your document — preview will appear on the right in seconds.',
    });

    try {
      const result = await runDocAgent(userMsg, chatHistory, forceNew ? null : document, {
        executiveBrief,
        forceNewDoc: forceNew,
        brief: { ...brief },
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      const updated = applyAgentResult(result);
      if (result.message) {
        addMessage({
          role: 'assistant',
          content: updated
            ? result.message
            : result.action === 'message' || result.action === 'preview'
              ? result.message
              : ar
                ? `${result.message} (لم يُحدَّث المستند — أعد صياغة الطلب.)`
                : `${result.message} (No document changes applied — try rephrasing.)`,
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
      if (abortRef.current === controller) abortRef.current = null;
      setLoading(false);
      fetchDocAiHealth().then(setApiHealth);
    }
  }

  function pickChip(
    field: 'docType' | 'purpose' | 'audience' | 'style',
    id: string,
    nextStep: 0 | 1 | 2 | 3 | 4,
  ) {
    setBrief({ [field]: id });
    setWizardStep(nextStep);
  }

  function startFromTemplate(seed: (typeof QUICK_DOC_TEMPLATES)[number]['seed']) {
    setBrief({
      docType: seed.docType,
      purpose: seed.purpose,
      audience: seed.audience,
      style: seed.style,
      includeNotes: seed.includeNotes,
    });
    setWizardStep(4);
    const prompt = [
      `Generate a ${seed.docType.replace(/-/g, ' ')} document.`,
      `Purpose: ${seed.purpose.replace(/-/g, ' ')}.`,
      `Audience: ${seed.audience}.`,
      `Style: ${seed.style}.`,
      seed.includeNotes,
      'Use Command Centre context. Apply DMCC branding. Do not invent figures.',
    ].join(' ');
    void send(prompt, { forceNew: true, useContext: true });
  }

  function generateFromBrief() {
    if (!briefReady) return;
    const notes = brief.includeNotes || input.trim();
    const prompt = [
      `Generate Document now.`,
      `Type: ${brief.docType}. Purpose: ${brief.purpose}. Audience: ${brief.audience}. Style: ${brief.style}.`,
      notes ? `Include: ${notes}` : '',
      'Recommend structure then produce full executive content. Use Command Centre context. DMCC brand. No fabricated data.',
    ]
      .filter(Boolean)
      .join(' ');
    void send(prompt, { forceNew: true, useContext: true });
  }

  const chipLists = [
    { step: 0 as const, field: 'docType' as const, title: ar ? 'نوع المستند؟' : 'What type of document?', items: DOC_TYPES, next: 1 as const },
    { step: 1 as const, field: 'purpose' as const, title: ar ? 'الغرض؟' : 'What is the purpose?', items: DOC_PURPOSES, next: 2 as const },
    { step: 2 as const, field: 'audience' as const, title: ar ? 'الجمهور؟' : 'Who is the audience?', items: DOC_AUDIENCES, next: 3 as const },
    { step: 3 as const, field: 'style' as const, title: ar ? 'الأسلوب؟' : 'Select document style', items: DOC_STYLES, next: 4 as const },
  ];

  return (
    <div className="cc-slideai__chat">
      {apiHealth && !apiHealth.available ? (
        <div className="cc-slideai__api-banner" role="status">
          {docAiBannerMessage(ar, apiHealth)}
        </div>
      ) : null}

      <div className="cc-slideai__messages" role="log" aria-live="polite">
        {chatHistory.length === 0 && (
          <div className="cc-slideai__empty">
            <p className="cc-slideai__empty-title">
              {ar ? 'أنشئ مستنداً تنفيذياً — DocAI · DMCC' : 'Generate a document — DocAI · DMCC'}
            </p>
            <p className="cc-slideai__empty-sub">
              {ar
                ? 'محادثة قصيرة ثم مستند مخصص بعلامة DMCC — قل "استخدم سياق مركز القيادة" للحقائق الداخلية.'
                : 'A short conversation, then a branded, tailored document — say “use Command Centre context” for internal facts.'}
            </p>

            <section className="cc-slideai__prompt-section" aria-label={ar ? 'قوالب سريعة' : 'Quick starts'}>
              <h3 className="cc-slideai__prompt-section-title">
                {ar ? 'قوالب DMCC السريعة' : 'DMCC quick starts'}
              </h3>
              <ul className="cc-slideai__prompt-list">
                {QUICK_DOC_TEMPLATES.map((tpl) => (
                  <li key={tpl.id}>
                    <button
                      type="button"
                      className="cc-slideai__template-btn"
                      onClick={() => startFromTemplate(tpl.seed)}
                    >
                      <span className="cc-slideai__template-btn-icon" aria-hidden>
                        <CcIcon name="file-text" size={14} />
                      </span>
                      <span className="cc-slideai__template-btn-body">
                        <span className="cc-slideai__template-btn-title">
                          {ar ? tpl.labelAr : tpl.label}
                        </span>
                        <span className="cc-slideai__template-btn-desc">
                          {ar ? tpl.descriptionAr : tpl.description}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="cc-docai__wizard" aria-label={ar ? 'معالج المستند' : 'Document wizard'}>
              <h3 className="cc-slideai__prompt-section-title">
                {ar ? 'أو أجب عن أسئلة قصيرة' : 'Or answer a few essentials'}
              </h3>
              {chipLists.map((block) =>
                wizardStep === block.step ? (
                  <div key={block.field} className="cc-docai__wizard-block">
                    <p className="cc-docai__wizard-q">{block.title}</p>
                    <div className="cc-docai__chips">
                      {block.items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`cc-docai__chip${brief[block.field] === item.id ? ' cc-docai__chip--on' : ''}`}
                          onClick={() => pickChip(block.field, item.id, block.next)}
                        >
                          {ar ? item.labelAr : item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null,
              )}

              {wizardStep === 4 && (
                <div className="cc-docai__wizard-block">
                  <p className="cc-docai__wizard-q">
                    {ar ? 'ما المعلومات المطلوب تضمينها؟' : 'What information should be included?'}
                  </p>
                  <p className="muted-3" style={{ fontSize: 12, marginBottom: 8 }}>
                    {briefSummary}
                  </p>
                  <textarea
                    className="cc-slideai__input"
                    rows={3}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setBrief({ includeNotes: e.target.value });
                    }}
                    placeholder={
                      ar
                        ? 'اكتب النقاط، أو اطلب استيراد بيانات الشركة / المحادثات السابقة…'
                        : 'Type key points, or ask to import company data / prior conversations…'
                    }
                  />
                  <div className="cc-docai__wizard-actions">
                    <button type="button" className="btn-primary" onClick={generateFromBrief} disabled={isLoading}>
                      <CcIcon name="sparkles" size={14} />
                      {ar ? 'إنشاء المستند' : 'Generate Document'}
                    </button>
                    <button
                      type="button"
                      className="pill ghost"
                      onClick={() => setWizardStep(0)}
                    >
                      {ar ? 'إعادة التعيين' : 'Reset'}
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {chatHistory.map((m) => (
          <div
            key={m.id}
            className={`cc-slideai__bubble cc-slideai__bubble--${m.role === 'user' ? 'user' : 'assistant'}`}
          >
            {m.content}
          </div>
        ))}

        {isLoading && (
          <div className="cc-slideai__bubble cc-slideai__bubble--assistant cc-slideai__loading">
            <CcIcon name="loader" size={14} className="spin" />
            {loadingSteps[loadingStep % loadingSteps.length]}
            <button type="button" className="pill ghost" onClick={stopGeneration} style={{ marginInlineStart: 8 }}>
              {ar ? 'إيقاف' : 'Stop'}
            </button>
          </div>
        )}

        {document && !isLoading && (
          <div className="cc-docai__smart-actions" aria-label={ar ? 'إجراءات تنفيذية' : 'Smart actions'}>
            <span className="cc-docai__smart-label">{ar ? 'إجراءات' : 'Smart actions'}</span>
            <div className="cc-docai__chips">
              {SMART_ACTIONS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className="cc-docai__chip"
                  onClick={() => void send(a.prompt)}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="cc-slideai__composer">
        <textarea
          className="cc-slideai__input"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
          placeholder={
            ar
              ? 'عدّل المستند أو اطلب مستنداً جديداً…'
              : 'Edit the document or describe a new one…'
          }
          disabled={isLoading}
        />
        <button
          type="button"
          className="cc-slideai__send btn-primary"
          onClick={() => void send()}
          disabled={isLoading || !input.trim()}
          aria-label={ar ? 'إرسال' : 'Send'}
        >
          <CcIcon name="send" size={16} />
        </button>
      </div>
    </div>
  );
}

/** McKinsey-level deck guidance — SCQA, templates, title standards, quick starts. (DMCC sync 2026-07-14T11:23:56) */

export const MCKINSEY_MODELS = [
  {
    id: 'claude-opus-4-8',
    label: 'Advanced AI',
    badge: 'Recommended',
    descriptionEn: 'Best reasoning and structure — the right choice for McKinsey-level decks.',
    descriptionAr: 'أفضل استدلال وبنية — الخيار المناسب لعروض مستوى McKinsey.',
    default: true,
  },
  {
    id: 'claude-sonnet-4-6',
    label: 'Fast AI',
    badge: null,
    descriptionEn: 'Faster, still high quality — use when speed matters.',
    descriptionAr: 'أسرع وجودة عالية — عندما يكون السرعة أولوية.',
    default: false,
  },
] as const;

export const SCQA_FORMULA = {
  en: [
    { key: 'S', label: 'Situation', detail: 'Context and audience — free zone, ecosystems, timing.' },
    { key: 'C', label: 'Complication', detail: 'The tension — why leadership must decide now.' },
    { key: 'Q', label: 'Question', detail: 'The central strategic question the deck must answer.' },
    { key: 'A', label: 'Answer', detail: 'Recommended answer upfront — Pyramid Principle.' },
  ],
  ar: [
    { key: 'S', label: 'الوضع', detail: 'السياق والجمهور — المنطقة الحرة والمنظومات والتوقيت.' },
    { key: 'C', label: 'التعقيد', detail: 'التوتر — لماذا يجب اتخاذ القرار الآن.' },
    { key: 'Q', label: 'السؤال', detail: 'السؤال الاستراتيجي المركزي الذي يجيب عليه العرض.' },
    { key: 'A', label: 'الإجابة', detail: 'التوصية في المقدمة — مبدأ الهرم.' },
  ],
};

export const MCKINSEY_BOARD_TEMPLATE = `Create an 8-slide McKinsey board deck for Ahmed Bin Sulayem, Executive Chairman & CEO, DMCC.

Topic: [YOUR TOPIC]
Situation (S): [Context — audience, ecosystems (Gold · Diamonds · Crypto · Tea/Coffee · Member Services · Uptown Dubai)]
Complication (C): [The tension — why we must decide now]
Question (Q): [Central strategic question this deck must answer]
Answer (A): [Recommended answer upfront — Pyramid Principle]

Must-have slides:
1. Executive summary (recommendation upfront)
2. Market sizing table
3. Competitive benchmark (insightPanel)
4. Financial model (3 scenarios: conservative, base, upside)
5. Risk register (table with severity scores)
6. 12-month roadmap (timeline with decision gates)
7. Decisions required (what the CEO must approve today)

Formatting rules:
- Two-column layout + insightPanel on every data slide
- Every title = full action sentence (the "so what")
- soWhat callouts + sourceNote on every slide
- Use table field for tabular data; never plain bullets for matrices`;

export const TITLE_EXAMPLES = {
  en: {
    bad: ['Market Overview', 'Key Findings', 'Agenda', 'Diamonds Update', 'Financial Summary'],
    good: [
      'USD 41.7B diamond trade through Dubai in 2025 justifies accelerating the London corridor MoU now',
      "ADGM's digital-asset licensing pace narrows DMCC Cyber's first-mover window to 6 months",
      'Member onboarding at 4.2 days puts Uptown Dubai activation at risk unless SLA hits 3.0 by Q4',
    ],
  },
  ar: {
    bad: ['نظرة عامة على السوق', 'النتائج الرئيسية', 'جدول الأعمال', 'تحديث الماس', 'ملخص مالي'],
    good: [
      'تجارة الماس بقيمة 41.7 مليار دولار عبر دبي في 2025 تبرّر تسريع مذكرة لندن الآن',
      'سرعة ترخيص الأصول الرقمية في ADGM تضيّق نافذة DMCC Cyber الأولى إلى 6 أشهر',
      'استقبال الأعضاء خلال 4.2 أيام يعرّض تفعيل Uptown Dubai للخطر ما لم يصل SLA إلى 3.0 بحلول الربع الرابع',
    ],
  },
};

export const PORTFOLIO_QUICK_STARTS = [
  {
    id: 'diamonds-corridor',
    icon: 'building-2',
    labelEn: 'Diamonds corridor deck',
    labelAr: 'عرض ممرات الماس',
    descriptionEn: 'McKinsey board pack — USD 41.7B trade case for London Diamond Bourse MoU',
    descriptionAr: 'حزمة مجلس McKinsey — حالة تجارة 41.7 مليار دولار لمذكرة لندن',
    prompt: `Create an 8-slide McKinsey board deck for Ahmed Bin Sulayem, CEO, DMCC.

Topic: Dubai Diamond Exchange — London corridor acceleration
Situation (S): DMCC recorded USD 41.7B diamond trade through Dubai in 2025; Dubai Diamond Exchange and London Diamond Bourse MoU are advancing.
Complication (C): Antwerp and Mumbai are competing on corridor narrative; delay risks losing provenance and tender share.
Question (Q): Should DMCC approve accelerated MoU execution and marketing investment in H2 2026?
Answer (A): Approve MoU acceleration + Dubai Diamond Conference keynote platform (26 Oct) — reinforce Dubai as the global volume + growth hub.

Must-have slides: executive summary · market sizing table · competitive benchmark vs Antwerp/Mumbai (insightPanel) · 3-scenario investment case · risk register · 12-month roadmap · CEO decisions required.

Rules: action titles only, two-col + insightPanel on data slides, soWhat + sourceNote every slide.`,
  },
  {
    id: 'cyber-launch',
    icon: 'sparkles',
    labelEn: 'DMCC Cyber deck',
    labelAr: 'عرض DMCC Cyber',
    descriptionEn: 'Crypto & digital assets — Tether MoU and 4,000+ tech companies',
    descriptionAr: 'العملات الرقمية والأصول — مذكرة Tether و4,000+ شركة تقنية',
    prompt: `Create an 8-slide McKinsey board deck for Ahmed Bin Sulayem, CEO, DMCC.

Topic: DMCC Cyber — formalising Dubai's tech & crypto free-zone cluster
Situation (S): DMCC Cyber unites 4,000+ tech companies; Tether MoU advances blockchain and tokenisation; BlockDown Dubai 2027 planned at Uptown Dubai.
Complication (C): ADGM and DIFC are competing hard on VASP licensing; DMCC must differentiate on commodities × crypto connectivity.
Question (Q): What launch sequence and partnerships maximise member acquisition while protecting free-zone compliance?
Answer (A): Phase 1 — Cyber brand + Tether collaboration narrative; Phase 2 — BlockDown 2027 at Uptown; Phase 3 — tokenised commodities pilots with Good Delivery members.

Must-have slides: executive summary · market sizing · competitive benchmark vs ADGM/DIFC (insightPanel) · partnership scenarios · risk register · launch roadmap · decisions required.

Rules: action titles, insightPanel on every exhibit slide, sourceNote citing DMCC / Future of Trade where possible.`,
  },
  {
    id: 'uptown-dubai',
    icon: 'map-pin',
    labelEn: 'Uptown Dubai activation deck',
    labelAr: 'عرض تفعيل أب تاون دبي',
    descriptionEn: 'Uptown Dubai investor & member activation — Q4 2026 milestones',
    descriptionAr: 'تفعيل أب تاون دبي للمستثمرين والأعضاء — معالم الربع الرابع 2026',
    prompt: `Create an 8-slide McKinsey board deck for Ahmed Bin Sulayem, CEO, DMCC.

Topic: Uptown Dubai activation — investor briefing & member ecosystem expansion
Situation (S): DMCC operates 87 towers across JLT and Uptown Dubai; Uptown is the next growth campus for commodities, crypto, and events.
Complication (C): Capital and phasing must align with Future of Trade priorities; competitor free zones are courting the same FDI.
Question (Q): Which phasing and capital structure unlocks Uptown while protecting DMCC downside?
Answer (A): Approve Phase 1 mixed-use activation (members + events + Cyber footprint) with decision gates at months 6, 12, 18.

Must-have slides: executive summary · market sizing (FDI + members) · phasing timeline · 3-scenario financial model · stakeholder map · risk register · decisions required today.

Rules: McKinsey action titles, two-col layout + insightPanel, soWhat on every data slide.`,
  },
] as const;

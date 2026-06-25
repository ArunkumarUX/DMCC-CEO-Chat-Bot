/** Plain-language explanations for Market Intelligence panels */

export type IntelLaymanBlock = {
  title: string;
  intro: string;
  bullets: string[];
  note: string;
  label: string;
};

export const INTEL_LAYMAN: Record<
  'competitiveFootprint' | 'capitalFlows' | 'benchmark12' | 'investmentOps',
  { en: IntelLaymanBlock; ar: IntelLaymanBlock }
> = {
  competitiveFootprint: {
    en: {
      label: 'Explain the competitive footprint chart',
      title: 'What am I looking at?',
      intro: 'A simple picture of how DREC, HUNA or HIVE compares with another Dubai developer (Emaar, Meraas, etc.) across six topics that matter to the portfolio.',
      bullets: [
        'Each spoke is a topic: design, occupancy, sales velocity, hospitality, community living, and compliance.',
        'The solid line is the selected A.R.M. Holding company; the dashed line is the competitor.',
        'Further from the centre = stronger on that topic (higher score).',
        'The number beside each name (e.g. 85) is the average score out of 100 across all six topics.',
      ],
      note: 'These scores are for leadership discussion and planning — not live stock prices or official league tables.',
    },
    ar: {
      label: 'شرح مخطط البصمة التنافسية',
      title: 'ماذا أرى هنا؟',
      intro: 'صورة مبسطة لمقارنة DREC أو HUNA أو HIVE مع مطور دبي آخر (إعمار، ميراس…) في ستة محاور مهمة للمحفظة.',
      bullets: [
        'كل محور يمثل موضوعاً: التصميم، الإشغال، سرعة المبيعات، الضيافة، العيش المجتمعي، والامتثال.',
        'الخط الصلب هو شركة A.R.M. Holding المختارة؛ الخط المتقطع هو المنافس.',
        'كلما ابتعد الخط عن المركز كان الأداء أقوى (درجة أعلى).',
        'الرقم بجانب الاسم (مثل 85) هو متوسط الدرجات من 100 على المحاور الستة.',
      ],
      note: 'الدرجات للنقاش والتخطيط التنفيذي — وليست أسعار سوق لحظية أو ترتيباً رسمياً.',
    },
  },
  capitalFlows: {
    en: {
      label: 'Explain capital flows',
      title: 'What am I looking at?',
      intro: 'Where real estate capital moved in the last 24 hours — and how much is heading toward Dubai and the A.R.M. Holding portfolio.',
      bullets: [
        'Each row is a region (GCC, Europe, South Asia, etc.) with a % change — like "+4.2%" net inflow.',
        'Green "Live 24h" means the view is meant to feel current; data here is illustrative for scenarios.',
        'The chart bands show volume flowing toward Dubai as the destination.',
        'The leader at the bottom (e.g. GCC +4.2%) is the strongest source region in this snapshot.',
      ],
      note: 'Use this to spot geographic rotation in capital — not as an audited financial report.',
    },
    ar: {
      label: 'شرح تدفقات رأس المال',
      title: 'ماذا أرى هنا؟',
      intro: 'أين تحرك رأس المال العقاري خلال 24 ساعة — وكم يتجه نحو دبي ومحفظة A.R.M. Holding.',
      bullets: [
        'كل صف منطقة (الخليج، أوروبا، جنوب آسيا…) مع نسبة مثل «+4.2٪» صافي تدفق.',
        'شارة «مباشر 24س» تعني عرضاً لحظياً؛ البيانات هنا توضيحية للسيناريوهات.',
        'الأشرطة تبيّن حجم التدفق باتجاه دبي.',
        'الأعلى في الأسفل (مثل الخليج +4.2٪) هو أقوى مصدر في هذه اللقطة.',
      ],
      note: 'لرصد تحول رأس المال جغرافياً — وليس كتقرير مالي مدقق.',
    },
  },
  benchmark12: {
    en: {
      label: 'Explain the 12-dimension benchmark',
      title: 'What am I looking at?',
      intro: 'A scorecard that lines DREC, HUNA and HIVE up against Dubai developers on twelve real-estate metrics.',
      bullets: [
        'Companies compared: DREC, HUNA, HIVE, Emaar, Meraas — number under each name is its overall average.',
        'Each row is one dimension (e.g. occupancy, design differentiation, coliving engagement).',
        'Bar length = score out of 100; longer bar = stronger on that dimension.',
        'Small crown = who leads that row; portfolio bars are highlighted.',
      ],
      note: 'Refreshed for daily executive review — illustrative benchmarking, not an external published index.',
    },
    ar: {
      label: 'شرح مقارنة الـ12 بُعداً',
      title: 'ماذا أرى هنا؟',
      intro: 'بطاقة أداء تقارن DREC وHUNA وHIVE مع مطوري دبي في اثني عشر محوراً عقارياً.',
      bullets: [
        'الشركات: DREC وHUNA وHIVE وإعمار وميراس — الرقم تحت كل اسم هو المتوسط العام.',
        'كل صف بُعد واحد (مثل الإشغال، التميّز التصميمي، العيش المجتمعي).',
        'طول الشريطة = درجة من 100؛ الأطول = أقوى في ذلك البُعد.',
        'التاج الصغير = المتصدّر في ذلك الصف.',
      ],
      note: 'للمراجعة التنفيذية اليومية — مقارنة توضيحية وليست مؤشراً منشوراً خارجياً.',
    },
  },
  investmentOps: {
    en: {
      label: 'Explain investment opportunity scores',
      title: 'What am I looking at?',
      intro: 'Which Dubai real estate sectors A.R.M. Holding should prioritise next, scored against the D33 economic agenda.',
      bullets: [
        'Each row is a theme (design-led residential, hospitality recovery, coliving, commercial retail).',
        'The ring number (e.g. 90) = fit with D33 priorities — higher is better alignment, out of 100.',
        '#1, #2… = rank order for leadership attention this cycle.',
        'Short note under the title explains why that theme scores high (e.g. hospitality RevPAR climbing).',
      ],
      note: 'This prioritises strategic focus — it is not buy/sell investment advice.',
    },
    ar: {
      label: 'شرح درجات فرص الاستثمار',
      title: 'ماذا أرى هنا؟',
      intro: 'أي قطاعات العقارات في دبي يجب تقديمها لـ A.R.M. Holding، بدرجات توافق مع أجندة D33.',
      bullets: [
        'كل صف قطاع (سكن بتصميم رائد، تعافي الضيافة، العيش المشترك، تجزئة تجارية).',
        'رقم الحلقة (مثل 90) = توافق مع أولويات D33 — الأعلى أفضل، من 100.',
        '«#1، #2…» = ترتيب الأولوية لاهتمام القيادة في هذه الدورة.',
        'الملاحظة القصيرة تشرح سبب الدرجة (مثل ارتفاع RevPAR).',
      ],
      note: 'لترتيب الأولويات الاستراتيجية — وليس توصية شراء أو بيع.',
    },
  },
};

/** Dashboard signal card quick-info tooltips */
export const SIGNAL_CARD_INFO: Record<
  string,
  { en: IntelLaymanBlock; ar: IntelLaymanBlock }
> = {
  market: {
    en: {
      label: 'About market movements',
      title: 'Market Movements',
      intro: 'Dubai real estate and GCC indices — refreshed at 08:00 & 22:00 GST.',
      bullets: ['Dubai RE transaction trends', 'GCC: ADX, DFM when available', 'Headlines: Reuters, Gulf News, CBRE'],
      note: 'Live badge when price feeds succeed at refresh.',
    },
    ar: {
      label: 'عن تحركات السوق',
      title: 'تحركات السوق',
      intro: 'عقارات دبي ومؤشرات الخليج — تحديث 08:00 و22:00.',
      bullets: ['اتجاهات معاملات دبي', 'الخليج: ADX وDFM', 'العناوين: رويترز والخليج'],
      note: 'شارة «مباشر» عند نجاح المصادر.',
    },
  },
  competitor: {
    en: {
      label: 'About competitor activity',
      title: 'Competitor Activity',
      intro: 'Moves by Dubai developers affecting HUNA and DREC.',
      bullets: ['Emaar, Meraas, Nakheel tracking', 'Industry research and news', 'Strategic responses flagged'],
      note: 'Each signal links to its source.',
    },
    ar: {
      label: 'عن نشاط المنافسين',
      title: 'نشاط المنافسين',
      intro: 'تحركات مطوري دبي المؤثرة على HUNA وDREC.',
      bullets: ['متابعة إعمار وميراس ونخيل', 'أبحاث وإعلام القطاع', 'ردود استراتيجية'],
      note: 'كل إشارة مرتبطة بمصدرها.',
    },
  },
  investment: {
    en: {
      label: 'About investment opportunities',
      title: 'Investment Opportunities',
      intro: 'Sectors scored against D33 for the portfolio.',
      bullets: ['Group strategy + market intel', 'Higher = stronger D33 fit', 'Ranks leadership focus'],
      note: 'Prioritisation — not investment advice.',
    },
    ar: {
      label: 'عن فرص الاستثمار',
      title: 'فرص الاستثمار',
      intro: 'قطاعات مُقيّمة مقابل D33 للمحفظة.',
      bullets: ['استراتيجية المجموعة والسوق', 'الأعلى = توافق أقوى', 'ترتيب أولويات القيادة'],
      note: 'للأولويات — وليس نصيحة استثمارية.',
    },
  },
  performance: {
    en: {
      label: 'About internal performance',
      title: 'Internal Performance Signals',
      intro: 'Department health across A.R.M. Holding.',
      bullets: ['ERP/HR + action register', 'Attrition and RAG status', 'Cross-team risks'],
      note: 'Internal dashboards.',
    },
    ar: {
      label: 'عن الأداء الداخلي',
      title: 'مؤشرات الأداء الداخلي',
      intro: 'صحة الإدارات عبر A.R.M. Holding.',
      bullets: ['ERP/HR وسجل الإجراءات', 'الدوران وحالة الإدارات', 'مخاطر مترابطة'],
      note: 'لوحات داخلية.',
    },
  },
  regulatory: {
    en: {
      label: 'About regulatory shifts',
      title: 'Regulatory Shifts',
      intro: 'Dubai regulator changes for the portfolio.',
      bullets: ['RERA, DLD, DET feeds', 'DREC/HUNA/HIVE relevance', 'Compliance deadlines'],
      note: 'Traceable to issuing regulator.',
    },
    ar: {
      label: 'عن التحولات التنظيمية',
      title: 'التحولات التنظيمية',
      intro: 'تغييرات جهات دبي للمحفظة.',
      bullets: ['RERA وDLD وDET', 'صلة DREC/HUNA/HIVE', 'مواعيد الامتثال'],
      note: 'قابل للتتبع للجهة المُصدِرة.',
    },
  },
  followup: {
    en: {
      label: 'About follow-up actions',
      title: 'Follow-Up Actions',
      intro: 'Open items from your action register.',
      bullets: ['Synced from meetings', 'Awaiting CEO decision', 'Sorted by due date'],
      note: 'Institutional register — not external feeds.',
    },
    ar: {
      label: 'عن إجراءات المتابعة',
      title: 'إجراءات المتابعة',
      intro: 'بنود مفتوحة من سجل الإجراءات.',
      bullets: ['من الاجتماعات', 'بانتظار قرار الرئيس التنفيذي', 'حسب الموعد'],
      note: 'سجل مؤسسي — ليس مصادر خارجية.',
    },
  },
};

export const SOURCE_EXPLANATION_SLIDE = {
  en: `## Data sources — A.R.M. Holding Command Centre\n\n| Source | Used for | Credibility |\n|--------|----------|-------------|\n| CBRE / Knight Frank | Market benchmarks | Industry research |\n| RERA / DLD / DET | Regulatory monitor | Dubai regulators |\n| SharePoint / DMS | Knowledge base | Approved group docs |\n| ERP / HR | Performance | Internal data |`,
  ar: `## مصادر البيانات — مركز قيادة A.R.M. Holding\n\n| المصدر | الاستخدام | الموثوقية |\n|--------|-----------|----------|\n| CBRE / Knight Frank | مقارنة السوق | أبحاث القطاع |\n| RERA / DLD / DET | الرقابة | جهات دبي |\n| SharePoint | قاعدة المعرفة | وثائق معتمدة |`,
};

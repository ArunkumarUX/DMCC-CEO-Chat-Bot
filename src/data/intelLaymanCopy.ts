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
      intro: 'A simple picture of how ADGM compares with another financial centre (pick DIFC, Singapore, etc.) across six topics that matter to Abu Dhabi.',
      bullets: [
        'Each spoke is a topic: digital assets, rules & regulation, fintech, access to capital, green finance, and talent.',
        'The solid blue line is ADGM; the dashed line is the other centre.',
        'Further from the centre = stronger on that topic (higher score).',
        'The number beside each name (e.g. 85) is the average score out of 100 across all six topics.',
      ],
      note: 'These scores are for leadership discussion and planning — not live stock prices or official league tables.',
    },
    ar: {
      label: 'شرح مخطط البصمة التنافسية',
      title: 'ماذا أرى هنا؟',
      intro: 'صورة مبسطة لمقارنة ADGM مع مركز مالي آخر (دبي، سنغافورة…) في ستة محاور مهمة لأبوظبي.',
      bullets: [
        'كل محور يمثل موضوعاً: الأصول الرقمية، التنظيم، التقنية المالية، رأس المال، التمويل المستدام، والمواهب.',
        'الخط الأزرق الصلب هو ADGM؛ الخط المتقطع هو المركز الآخر.',
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
      intro: 'Where money moved in the last 24 hours — and how much is heading toward Abu Dhabi and ADGM.',
      bullets: [
        'Each row is a region (GCC, US, Singapore, Europe, etc.) with a % change — like “+4.2%” net inflow.',
        'Green “Live 24h” means the view is meant to feel current; data here is illustrative for scenarios.',
        'The chart bands show volume flowing toward ADGM / Abu Dhabi as the destination.',
        'The leader at the bottom (e.g. GCC +4.2%) is the strongest source region in this snapshot.',
      ],
      note: 'Use this to spot geographic rotation in capital — not as a audited financial report.',
    },
    ar: {
      label: 'شرح تدفقات رأس المال',
      title: 'ماذا أرى هنا؟',
      intro: 'أين تحرك رأس المال خلال 24 ساعة — وكم يتجه نحو أبوظبي وADGM.',
      bullets: [
        'كل صف منطقة (الخليج، أمريكا، سنغافورة…) مع نسبة مثل «+4.2٪» صافي تدفق.',
        'شارة «مباشر 24س» تعني عرضاً لحظياً؛ البيانات هنا توضيحية للسيناريوهات.',
        'الأشرطة تبيّن حجم التدفق باتجاه ADGM / أبوظبي.',
        'الأعلى في الأسفل (مثل الخليج +4.2٪) هو أقوى مصدر في هذه اللقطة.',
      ],
      note: 'لرصد تحول رأس المال جغرافياً — وليس كتقرير مالي مدقق.',
    },
  },
  benchmark12: {
    en: {
      label: 'Explain the 12-dimension benchmark',
      title: 'What am I looking at?',
      intro: 'A scorecard that lines ADGM up against four global centres on twelve things policymakers care about.',
      bullets: [
        'Centres compared: ADGM, DIFC, Singapore, Hong Kong, Luxembourg — number under each name is its overall average.',
        'Each row is one dimension (e.g. digital-asset framework, regulatory agility, fintech ecosystem).',
        'Bar length = score out of 100; longer bar = stronger on that dimension.',
        'Small crown = who leads that row; ADGM bars are highlighted in blue.',
      ],
      note: 'Refreshed for daily executive review — illustrative benchmarking, not an external published index.',
    },
    ar: {
      label: 'شرح مقارنة الـ12 بُعداً',
      title: 'ماذا أرى هنا؟',
      intro: 'بطاقة أداء تقارن ADGM مع أربعة مراكز عالمية في اثني عشر محوراً يهم صناع القرار.',
      bullets: [
        'المراكز: ADGM ودبي وسنغافورة وهونغ كونغ ولوكسمبورغ — الرقم تحت كل اسم هو المتوسط العام.',
        'كل صف بُعد واحد (مثل إطار الأصول الرقمية، سرعة التنظيم، منظومة التقنية المالية).',
        'طول الشريطة = درجة من 100؛ الأطول = أقوى في ذلك البُعد.',
        'التاج الصغير = المتصدّر في ذلك الصف؛ أشرطة ADGM باللون الأزرق.',
      ],
      note: 'للمراجعة التنفيذية اليومية — مقارنة توضيحية وليست مؤشراً منشوراً خارجياً.',
    },
  },
  investmentOps: {
    en: {
      label: 'Explain investment opportunity scores',
      title: 'What am I looking at?',
      intro: 'Which sectors Abu Dhabi should prioritise next, scored against the Falcon Economy long-term economic plan.',
      bullets: [
        'Each row is a theme (AI infrastructure, private credit, tokenised assets, sustainable finance).',
        'The ring number (e.g. 92) = fit with Falcon Economy priorities — higher is better alignment, out of 100.',
        '#1, #2… = rank order for leadership attention this cycle.',
        'Short note under the title explains why that theme scores high (e.g. record VC inflow).',
      ],
      note: 'This prioritises strategic focus — it is not buy/sell investment advice.',
    },
    ar: {
      label: 'شرح درجات فرص الاستثمار',
      title: 'ماذا أرى هنا؟',
      intro: 'أي القطاعات يجب أن تُقدَّم لأبوظبي، بدرجات توافق مع خطة الاقتصاد الصقور.',
      bullets: [
        'كل صف قطاع (بنية الذكاء الاصطناعي، ائتمان خاص، أصول مرمزة، تمويل مستدام).',
        'رقم الحلقة (مثل 92) = توافق مع أولويات الاقتصاد الصقور — الأعلى أفضل، من 100.',
        '«#1، #2…» = ترتيب الأولوية لاهتمام القيادة في هذه الدورة.',
        'الملاحظة القصيرة تشرح سبب الدرجة (مثل تدفق قياسي من رأس المال الجريء).',
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
      intro: 'GCC indices and crypto 24h moves when feeds succeed; refreshed at 08:00 & 22:00 GST.',
      bullets: [
        'GCC: Yahoo Finance (ADX, DFM, Tadawul) when available',
        'Crypto: CoinGecko BTC/ETH 24h change',
        'Headlines: RSS wires + optional Bloomberg (Apify)',
      ],
      note: 'Live badge appears when price feeds succeed at refresh.',
    },
    ar: {
      label: 'عن تحركات السوق',
      title: 'تحركات السوق',
      intro: 'مؤشرات الخليج والعملات الرقمية مباشرة عند نجاح المصادر؛ تحديث 08:00 و22:00 بتوقيت الإمارات.',
      bullets: [
        'الخليج: Yahoo Finance عند التوفر',
        'الرقمي: CoinGecko لتغير BTC/ETH خلال 24 ساعة',
        'العناوين: RSS وBloomberg اختياري',
      ],
      note: 'تظهر شارة «مباشر» عند نجاح مصادر الأسعار عند التحديث.',
    },
  },
  competitor: {
    en: {
      label: 'About competitor activity',
      title: 'Competitor Activity',
      intro: 'Moves by peer financial centres that may affect ADGM positioning.',
      bullets: [
        'Source: Reuters, Gulf News, and regulatory announcements',
        'Tracks DIFC, Singapore, Hong Kong, and other centres',
        'Highlights strategic responses worth executive attention',
      ],
      note: 'Each signal links to its original news or regulatory source.',
    },
    ar: {
      label: 'عن نشاط المنافسين',
      title: 'نشاط المنافسين',
      intro: 'تحركات المراكز المالية المنافسة التي قد تؤثر على موقع ADGM.',
      bullets: [
        'المصدر: رويترز، الخليج، وإعلانات تنظيمية',
        'يتتبع دبي وسنغافورة وهونغ كونغ ومراكز أخرى',
        'يسلّط الضوء على ردود فعل استراتيجية تستحق الانتباه',
      ],
      note: 'كل إشارة مرتبطة بمصدرها الأصلي.',
    },
  },
  investment: {
    en: {
      label: 'About investment opportunities',
      title: 'Investment Opportunities',
      intro: 'Sectors scored against Falcon Economy priorities for Abu Dhabi.',
      bullets: [
        'Source: market intelligence + strategic planning documents',
        'Higher score = stronger alignment with national economic goals',
        'Ranks themes for leadership focus this quarter',
      ],
      note: 'Strategic prioritisation — not investment advice.',
    },
    ar: {
      label: 'عن فرص الاستثمار',
      title: 'فرص الاستثمار',
      intro: 'قطاعات مُقيّمة مقابل أولويات الاقتصاد الصقور لأبوظبي.',
      bullets: [
        'المصدر: استخبارات السوق + وثائق التخطيط الاستراتيجي',
        'درجة أعلى = توافق أقوى مع الأهداف الاقتصادية الوطنية',
        'يرتّب المحاور لتركيز القيادة هذا الربع',
      ],
      note: 'لترتيب الأولويات — وليس نصيحة استثمارية.',
    },
  },
  performance: {
    en: {
      label: 'About internal performance',
      title: 'Internal Performance Signals',
      intro: 'Department health and action-register status across ADGM.',
      bullets: [
        'Source: ERP/HR systems and internal action register',
        'Shows attrition, overdue actions, and department RAG status',
        'Flags correlated risks across teams',
      ],
      note: 'Internal data — refreshed from department dashboards.',
    },
    ar: {
      label: 'عن الأداء الداخلي',
      title: 'مؤشرات الأداء الداخلي',
      intro: 'صحة الإدارات وحالة سجل الإجراءات عبر ADGM.',
      bullets: [
        'المصدر: أنظمة ERP/HR وسجل الإجراءات الداخلي',
        'يعرض الدوران والإجراءات المتأخرة وحالة الإدارات',
        'يُبرز المخاطر المترابطة بين الفرق',
      ],
      note: 'بيانات داخلية — مُحدَّثة من لوحات الإدارات.',
    },
  },
  regulatory: {
    en: {
      label: 'About regulatory shifts',
      title: 'Regulatory Shifts',
      intro: 'Policy and rule changes from global and regional regulators.',
      bullets: [
        'Source: FSRA, MAS, FATF, FCA, and IOSCO feeds',
        'Assesses relevance to ADGM digital-asset framework',
        'Highlights compliance deadlines and competitive gaps',
      ],
      note: 'Each item traceable to the issuing regulator.',
    },
    ar: {
      label: 'عن التحولات التنظيمية',
      title: 'التحولات التنظيمية',
      intro: 'تغييرات السياسات والقواعد من الجهات التنظيمية العالمية والإقليمية.',
      bullets: [
        'المصدر: FSRA وMAS وFATF وFCA وIOSCO',
        'يقيّم الصلة بإطار ADGM للأصول الرقمية',
        'يُبرز مواعيد الامتثال والفجوات التنافسية',
      ],
      note: 'كل بند قابل للتتبع إلى الجهة المُصدِرة.',
    },
  },
  followup: {
    en: {
      label: 'About follow-up actions',
      title: 'Follow-Up Actions',
      intro: 'Open decisions and tasks from your action register.',
      bullets: [
        'Source: internal action register synced from meetings and briefings',
        'Shows items awaiting CSO decision or sign-off',
        'Prioritised by due date and strategic impact',
      ],
      note: 'Pulled from your institutional action register — not external feeds.',
    },
    ar: {
      label: 'عن إجراءات المتابعة',
      title: 'إجراءات المتابعة',
      intro: 'قرارات ومهام مفتوحة من سجل الإجراءات.',
      bullets: [
        'المصدر: سجل الإجراءات الداخلي من الاجتماعات والإحاطات',
        'يعرض البنود بانتظار قرار أو اعتماد كبير مسؤولي الاستراتيجية',
        'مرتّبة حسب الموعد والأثر الاستراتيجي',
      ],
      note: 'من سجل الإجراءات المؤسسي — وليس مصادر خارجية.',
    },
  },
};

/** Source explanation slide — for deck exports */
export const SOURCE_EXPLANATION_SLIDE = {
  en: `## Data sources across the Command Centre

| Source | Where used | Why credible | CSO relevance |
|--------|-----------|--------------|---------------|
| Bloomberg / Refinitiv | Market ticker, signal cards | Institutional-grade market data used by global banks | Real-time macro context for board and investor conversations |
| Reuters / Gulf News | Competitor activity, regulatory monitor | Tier-1 news with editorial standards | Early warning on peer-centre moves |
| FSRA / MAS / FATF / IOSCO | Regulatory shifts card | Primary regulatory issuers | Direct impact on ADGM licensing and compliance |
| SharePoint / DMS | Knowledge base, board packs | ADGM's own approved documents | Ground truth for institutional answers |
| ERP / HR systems | Performance signals | Internal operational data | Department health and attrition visibility |
| Action register | Follow-up actions | CSO-owned decision tracker | Ensures nothing falls through between meetings |`,
  ar: `## مصادر البيانات في مركز القيادة

| المصدر | أين يُستخدم | لماذا موثوق | أهمية لكبير مسؤولي الاستراتيجية |
|--------|------------|------------|--------------------------------|
| Bloomberg / Refinitiv | شريط السوق، بطاقات الإشارات | بيانات سوق مؤسسية | سياق كلي لحظي للمجلس والمستثمرين |
| رويترز / الخليج | نشاط المنافسين، الرقابة التنظيمية | أخبار من الدرجة الأولى | إنذار مبكر بتحركات المراكز المنافسة |
| FSRA / MAS / FATF / IOSCO | بطاقة التحولات التنظيمية | جهات تنظيمية أساسية | أثر مباشر على التراخيص والامتثال |
| SharePoint / DMS | قاعدة المعرفة، حزم المجلس | وثائق ADGM المعتمدة | مصدر الحقيقة المؤسسي |
| ERP / HR | مؤشرات الأداء | بيانات تشغيلية داخلية | صحة الإدارات وظهور الدوران |
| سجل الإجراءات | إجراءات المتابعة | متتبع قرارات كبير مسؤولي الاستراتيجية | ضمان عدم ضياع البنود بين الاجتماعات |`,
};

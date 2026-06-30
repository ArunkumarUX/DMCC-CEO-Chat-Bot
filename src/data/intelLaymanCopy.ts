/** Plain-language explanations for Market Intelligence panels — Apparel Group retail */

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
      intro: 'A simple picture of how R&B, 6thStreet or Club Apparel compares with another GCC retailer (Namshi, Noon, etc.) across six topics that matter to the portfolio.',
      bullets: [
        'Each spoke is a topic: store footprint, omnichannel, brand portfolio, loyalty, F&B, and compliance.',
        'The solid line is the selected Apparel Group company; the dashed line is the competitor.',
        'Further from the centre = stronger on that topic (higher score).',
        'The number beside each name (e.g. 85) is the average score out of 100 across all six topics.',
      ],
      note: 'These scores are for leadership discussion and planning — not live stock prices or official league tables.',
    },
    ar: {
      label: 'شرح مخطط البصمة التنافسية',
      title: 'ماذا أرى هنا؟',
      intro: 'صورة مبسطة لمقارنة R&B أو 6thStreet أو Club Apparel مع بائع تجزئة خليجي آخر (نامشي، نون…) في ستة محاور مهمة للمحفظة.',
      bullets: [
        'كل محور يمثل موضوعاً: شبكة المتاجر، القنوات المتعددة، محفظة العلامات، الولاء، المأكولات، والامتثال.',
        'الخط الصلب هو شركة Apparel Group المختارة؛ الخط المتقطع هو المنافس.',
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
      intro: 'Where retail and consumer capital moved in the last 24 hours — and how much is heading toward GCC markets and the Apparel Group store network.',
      bullets: [
        'Each row is a region (GCC, Europe, South Asia, etc.) with a % change — like "+4.2%" net inflow.',
        'Green "Live 24h" means the view is meant to feel current; data here is illustrative for scenarios.',
        'The chart bands show volume flowing toward GCC retail as the destination.',
        'The leader at the bottom (e.g. GCC +4.2%) is the strongest source region in this snapshot.',
      ],
      note: 'Use this to spot geographic rotation in consumer spending — not as an audited financial report.',
    },
    ar: {
      label: 'شرح تدفقات رأس المال',
      title: 'ماذا أرى هنا؟',
      intro: 'أين تحرك رأس مال التجزئة والمستهلك خلال 24 ساعة — وكم يتجه نحو أسواق الخليج وشبكة متاجر Apparel Group.',
      bullets: [
        'كل صف منطقة (الخليج، أوروبا، جنوب آسيا…) مع نسبة مثل «+4.2٪» صافي تدفق.',
        'شارة «مباشر 24س» تعني عرضاً لحظياً؛ البيانات هنا توضيحية للسيناريوهات.',
        'الأشرطة تبيّن حجم التدفق باتجاه تجزئة الخليج.',
        'الأعلى في الأسفل (مثل الخليج +4.2٪) هو أقوى مصدر في هذه اللقطة.',
      ],
      note: 'لرصد تحول الإنفاق الاستهلاكي جغرافياً — وليس كتقرير مالي مدقق.',
    },
  },
  benchmark12: {
    en: {
      label: 'Explain the 12-dimension benchmark',
      title: 'What am I looking at?',
      intro: 'A scorecard that lines R&B, 6thStreet and Club Apparel up against GCC retailers on twelve retail metrics.',
      bullets: [
        'Companies compared: R&B, 6thStreet, Club Apparel, Namshi, Noon — number under each name is its overall average.',
        'Each row is one dimension (e.g. store count, omnichannel, loyalty engagement, F&B footprint).',
        'Bar length = score out of 100; longer bar = stronger on that dimension.',
        'Small crown = who leads that row; portfolio bars are highlighted.',
      ],
      note: 'Refreshed for daily executive review — illustrative benchmarking, not an external published index.',
    },
    ar: {
      label: 'شرح معيار الـ12 بُعداً',
      title: 'ماذا أرى هنا؟',
      intro: 'بطاقة أداء تقارن R&B و6thStreet وClub Apparel مع بائعي تجزئة خليجيين في اثني عشر مقياساً.',
      bullets: [
        'الشركات: R&B و6thStreet وClub Apparel ونامشي ونون — الرقم تحت كل اسم هو المتوسط العام.',
        'كل صف بُعد واحد (مثل عدد المتاجر، القنوات المتعددة، تفاعل الولاء، بصمة المأكولات).',
        'طول الشريطة = درجة من 100؛ شريطة أطول = أقوى في ذلك البُعد.',
        'تاج صغير = المتصدر في ذلك الصف؛ أشرطة المحفظة مميزة.',
      ],
      note: 'محدّث للمراجعة التنفيذية اليومية — معيار توضيحي وليس مؤشراً منشوراً خارجياً.',
    },
  },
  investmentOps: {
    en: {
      label: 'Explain investment & operations radar',
      title: 'What am I looking at?',
      intro: 'A radar view of where Apparel Group is investing and operating — store openings, brand launches, and country expansion.',
      bullets: [
        'Each axis is an activity: new stores, brand launches, e-commerce, F&B, KSA expansion, sustainability.',
        'Further from centre = more active or higher priority in the current quarter.',
        'The shape shows balance — a lopsided radar means concentration risk in one area.',
        'Use alongside the signal cards for a full picture of where leadership attention is needed.',
      ],
      note: 'Scenario planning view — not a live ERP or store-management system feed.',
    },
    ar: {
      label: 'شرح رادار الاستثمار والعمليات',
      title: 'ماذا أرى هنا؟',
      intro: 'عرض راداري لأين تستثمر Apparel Group وتعمل — افتتاحات المتاجر وإطلاق العلامات والتوسع الجغرافي.',
      bullets: [
        'كل محور نشاط: متاجر جديدة، إطلاق علامات، تجارة إلكترونية، مأكولات، توسع السعودية، استدامة.',
        'الابتعاد عن المركز = نشاط أعلى أو أولوية أعلى في الربع الحالي.',
        'الشكل يبيّن التوازن — رادار غير متوازن يعني تركيزاً في مجال واحد.',
        'استخدمه مع بطاقات الإشارات لصورة كاملة عن اهتمام القيادة.',
      ],
      note: 'عرض تخطيط سيناريوهات — وليس تغذية مباشرة من نظام ERP أو إدارة المتاجر.',
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
      label: 'About GCC retail market',
      title: 'GCC Retail Market',
      intro: 'GCC retail sales, consumer trends and tourism-linked footfall — refreshed at 08:00 & 22:00 GST.',
      bullets: ['GCC retail sales growth and category mix', 'E-commerce vs in-store split', 'Sources: Images RetailME, Euromonitor, Gulf News, Zawya'],
      note: 'Live badge shown when price feeds succeed at refresh.',
    },
    ar: {
      label: 'عن سوق التجزئة في الخليج',
      title: 'سوق التجزئة في الخليج',
      intro: 'مبيعات التجزئة في الخليج واتجاهات المستهلك والزيارات السياحية — تحديث 08:00 و22:00.',
      bullets: ['نمو مبيعات التجزئة في الخليج ومزيج الفئات', 'التجارة الإلكترونية مقابل المتاجر', 'المصادر: Images RetailME، يورومونيتور، الخليج'],
      note: 'شارة «مباشر» عند نجاح المصادر.',
    },
  },
  competitor: {
    en: {
      label: 'About competitor watch',
      title: 'Competitor Watch',
      intro: 'Latest moves by GCC omnichannel and e-commerce players affecting 6thStreet and Apparel Group positioning.',
      bullets: ['Noon, Namshi, regional mall operators tracked', 'Same-day and 90-min delivery announcements', 'Strategic implications flagged for 6thStreet narrative'],
      note: 'Each headline links to its source. Interpretation is leadership\'s.',
    },
    ar: {
      label: 'عن رصد المنافسين',
      title: 'رصد المنافسين',
      intro: 'أحدث تحركات لاعبي القنوات المتعددة والتجارة الإلكترونية في الخليج المؤثرة على 6thStreet وApparel Group.',
      bullets: ['رصد نون ونامشي ومشغلي المولات الإقليميين', 'إعلانات التوصيل في نفس اليوم و90 دقيقة', 'تداعيات استراتيجية لسردية 6thStreet'],
      note: 'كل عنوان مرتبط بمصدره.',
    },
  },
  investment: {
    en: {
      label: 'About expansion pipeline',
      title: 'Expansion Pipeline',
      intro: 'Apparel Group store network growth and KSA expansion via Arabian Alesaar partnership.',
      bullets: ['KSA expansion: Arabian Alesaar strategic partnership', 'New brand launches: HEYDUDE, Barbour, Forever New, MLB', '2,500+ stores across 14 countries — milestone tracking'],
      note: 'KSA expansion is Apparel Group\'s highest-priority growth vector.',
    },
    ar: {
      label: 'عن خط التوسع',
      title: 'خط التوسع',
      intro: 'نمو شبكة متاجر Apparel Group وتوسع السعودية عبر شراكة Arabian Alesaar.',
      bullets: ['توسع السعودية: شراكة Arabian Alesaar الاستراتيجية', 'إطلاق علامات جديدة: HEYDUDE وBarbour وForever New وMLB', '2,500+ متجر في 14 دولة — متابعة المعالم'],
      note: 'توسع السعودية هو أعلى أولوية نمو لـ Apparel Group.',
    },
  },
  performance: {
    en: {
      label: 'About portfolio performance',
      title: 'Portfolio Performance',
      intro: 'Real-time health of R&B, 6thStreet and Club Apparel — plus macro context.',
      bullets: ['R&B: 100+ stores, same-store sales, value retail positioning', '6thStreet: omnichannel GMV, 90-min delivery uptake', 'Club Apparel: 10M+ members, loyalty engagement', 'Macro data: GCC retail rates when live feed available'],
      note: 'Internal data + live macro when Yahoo Finance feed succeeds.',
    },
    ar: {
      label: 'عن أداء المحفظة',
      title: 'أداء المحفظة',
      intro: 'صحة R&B و6thStreet وClub Apparel في الوقت الفعلي — مع السياق الكلي.',
      bullets: ['R&B: 100+ متجر، مبيعات المتاجر، تموضع التجزئة القيمة', '6thStreet: GMV متعدد القنوات، تبني التوصيل 90 دقيقة', 'Club Apparel: 10M+ عضو، تفاعل الولاء', 'بيانات كلية عند توفر المصدر المباشر'],
      note: 'بيانات داخلية + ماكرو مباشر عند نجاح Yahoo Finance.',
    },
  },
  regulatory: {
    en: {
      label: 'About UAE retail compliance',
      title: 'UAE Retail Compliance',
      intro: 'UAE regulatory changes directly affecting Apparel Group retail and F&B operations.',
      bullets: ['UAE VAT guidance for F&B (Tim Hortons, Cold Stone)', 'DED retail licensing renewal cycles', 'MOHRE labour law updates affecting store operations'],
      note: 'Traceable to UAE DED, FTA or MOHRE issuing notice.',
    },
    ar: {
      label: 'عن امتثال التجزئة في الإمارات',
      title: 'امتثال التجزئة في الإمارات',
      intro: 'تغييرات تنظيمية إماراتية تؤثر مباشرة على عمليات Apparel Group للتجزئة والمأكولات.',
      bullets: ['إرشادات ضريبة القيمة المضافة للمأكولات (Tim Hortons، Cold Stone)', 'دورات تجديد تراخيص DED للتجزئة', 'تحديثات قانون العمل MOHRE لعمليات المتاجر'],
      note: 'قابل للتتبع لـ DED أو FTA أو MOHRE.',
    },
  },
  followup: {
    en: {
      label: 'About awards & brand',
      title: 'Awards & Brand',
      intro: 'Images RetailME Awards, sustainability recognition, and Apparel Group brand milestones.',
      bullets: ['Images RetailME Awards 2025 — headline partner', 'Club Apparel 10M member milestone campaign', 'CEO speaking slot and brand launch decisions tracked'],
      note: 'Live retail industry news when available.',
    },
    ar: {
      label: 'عن الجوائز والعلامة',
      title: 'الجوائز والعلامة',
      intro: 'جوائز Images RetailME والاعتراف بالاستدامة ومعالم علامة Apparel Group.',
      bullets: ['Images RetailME Awards 2025 — شريك رئيسي', 'حملة معلم 10M عضو لـ Club Apparel', 'فرصة تحدث الرئيس التنفيذي وقرارات إطلاق العلامات مُتابعة'],
      note: 'أخبار صناعة التجزئة المباشرة عند توفرها.',
    },
  },
};

export const SOURCE_EXPLANATION_SLIDE = {
  en: `## Data sources — Apparel Group Command Centre\n\n| Source | Used for | Credibility |\n|--------|----------|-------------|\n| Images RetailME / Euromonitor | Retail benchmarks | Industry research |\n| UAE DED / FTA / MOHRE | Regulatory monitor | UAE regulators |\n| SharePoint / DMS | Knowledge base | Approved group docs |\n| ERP / HR / POS | Performance | Internal data |`,
  ar: `## مصادر البيانات — مركز قيادة Apparel Group\n\n| المصدر | الاستخدام | الموثوقية |\n|--------|-----------|----------|\n| Images RetailME / Euromonitor | مقارنة التجزئة | أبحاث القطاع |\n| DED / FTA / MOHRE | الرقابة | جهات الإمارات |\n| SharePoint | قاعدة المعرفة | وثائق معتمدة |`,
};

/** Plain-language explanations for Market Intelligence panels — DMCC commodities & free zone */

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
      intro: 'A simple picture of how DMCC compares with another global free zone or commodity hub (DIFC, ADGM, Singapore) across six topics that matter to the authority and its members.',
      bullets: [
        'Each spoke is a topic: member base, commodity depth, digital assets, trade corridors, ecosystem services, and compliance.',
        'The solid line is DMCC; the dashed line is the comparator free zone or hub.',
        'Further from the centre = stronger on that topic (higher score).',
        'The number beside each name (e.g. 85) is the average score out of 100 across all six topics.',
      ],
      note: 'These scores are for leadership discussion and planning — not live market prices or official league tables.',
    },
    ar: {
      label: 'شرح مخطط البصمة التنافسية',
      title: 'ماذا أرى هنا؟',
      intro: 'صورة مبسطة لمقارنة DMCC مع منطقة حرة أو مركز سلع عالمي آخر (DIFC، ADGM، سنغافورة) في ستة محاور مهمة للهيئة وأعضائها.',
      bullets: [
        'كل محور يمثل موضوعاً: قاعدة الأعضاء، عمق السلع، الأصول الرقمية، ممرات التجارة، خدمات المنظومة، والامتثال.',
        'الخط الصلب هو DMCC؛ الخط المتقطع هو المنطقة الحرة أو المركز المقارن.',
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
      intro: 'Where commodity and trade capital moved in the last 24 hours — and how much is heading toward GCC hubs and the DMCC member ecosystem.',
      bullets: [
        'Each row is a region (GCC, Europe, South Asia, etc.) with a % change — like "+4.2%" net inflow.',
        'Green "Live 24h" means the view is meant to feel current; data here is illustrative for scenarios.',
        'The chart bands show volume flowing toward GCC commodity and trade hubs as the destination.',
        'The leader at the bottom (e.g. GCC +4.2%) is the strongest source region in this snapshot.',
      ],
      note: 'Use this to spot geographic rotation in trade and commodity flows — not as an audited financial report.',
    },
    ar: {
      label: 'شرح تدفقات رأس المال',
      title: 'ماذا أرى هنا؟',
      intro: 'أين تحرك رأس مال السلع والتجارة خلال 24 ساعة — وكم يتجه نحو مراكز الخليج ومنظومة أعضاء DMCC.',
      bullets: [
        'كل صف منطقة (الخليج، أوروبا، جنوب آسيا…) مع نسبة مثل «+4.2٪» صافي تدفق.',
        'شارة «مباشر 24س» تعني عرضاً لحظياً؛ البيانات هنا توضيحية للسيناريوهات.',
        'الأشرطة تبيّن حجم التدفق باتجاه مراكز السلع والتجارة في الخليج.',
        'الأعلى في الأسفل (مثل الخليج +4.2٪) هو أقوى مصدر في هذه اللقطة.',
      ],
      note: 'لرصد تحول تدفقات التجارة والسلع جغرافياً — وليس كتقرير مالي مدقق.',
    },
  },
  benchmark12: {
    en: {
      label: 'Explain the 12-dimension benchmark',
      title: 'What am I looking at?',
      intro: 'A scorecard that lines DMCC up against global free zones and commodity hubs on twelve ecosystem metrics.',
      bullets: [
        'Hubs compared: DMCC, DIFC, ADGM, JAFZA, Singapore — number under each name is its overall average.',
        'Each row is one dimension (e.g. member count, gold/diamond depth, crypto licensing, AI ecosystem).',
        'Bar length = score out of 100; longer bar = stronger on that dimension.',
        'Small crown = who leads that row; DMCC bars are highlighted.',
      ],
      note: 'Refreshed for daily executive review — illustrative benchmarking, not an external published index.',
    },
    ar: {
      label: 'شرح معيار الـ12 بُعداً',
      title: 'ماذا أرى هنا؟',
      intro: 'بطاقة أداء تقارن DMCC مع المناطق الحرة ومراكز السلع العالمية في اثني عشر مقياساً للمنظومة.',
      bullets: [
        'المراكز: DMCC وDIFC وADGM وJAFZA وسنغافورة — الرقم تحت كل اسم هو المتوسط العام.',
        'كل صف بُعد واحد (مثل عدد الأعضاء، عمق الذهب/الماس، ترخيص العملات الرقمية، منظومة الذكاء الاصطناعي).',
        'طول الشريطة = درجة من 100؛ شريطة أطول = أقوى في ذلك البُعد.',
        'تاج صغير = المتصدر في ذلك الصف؛ أشرطة DMCC مميزة.',
      ],
      note: 'محدّث للمراجعة التنفيذية اليومية — معيار توضيحي وليس مؤشراً منشوراً خارجياً.',
    },
  },
  investmentOps: {
    en: {
      label: 'Explain investment & operations radar',
      title: 'What am I looking at?',
      intro: 'A radar view of where DMCC is investing and operating — ecosystem launches, member onboarding, and corridor expansion.',
      bullets: [
        'Each axis is an activity: gold centre, diamond exchange, tea/coffee, crypto, AI, gaming, member services.',
        'Further from centre = more active or higher priority in the current quarter.',
        'The shape shows balance — a lopsided radar means concentration risk in one ecosystem.',
        'Use alongside the signal cards for a full picture of where leadership attention is needed.',
      ],
      note: 'Scenario planning view — not a live member portal or ERP system feed.',
    },
    ar: {
      label: 'شرح رادار الاستثمار والعمليات',
      title: 'ماذا أرى هنا؟',
      intro: 'عرض راداري لأين تستثمر DMCC وتعمل — إطلاق المنظومات وضم الأعضاء والتوسع في الممرات التجارية.',
      bullets: [
        'كل محور نشاط: مركز الذهب، بورصة الماس، الشاي/القهوة، العملات الرقمية، الذكاء الاصطناعي، الألعاب، خدمات الأعضاء.',
        'الابتعاد عن المركز = نشاط أعلى أو أولوية أعلى في الربع الحالي.',
        'الشكل يبيّن التوازن — رادار غير متوازن يعني تركيزاً في منظومة واحدة.',
        'استخدمه مع بطاقات الإشارات لصورة كاملة عن اهتمام القيادة.',
      ],
      note: 'عرض تخطيط سيناريوهات — وليس تغذية مباشرة من بوابة الأعضاء أو نظام ERP.',
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
      label: 'About GCC commodity markets',
      title: 'GCC Commodity Markets',
      intro: 'Gold, diamond, oil and trade corridor flows — refreshed at 08:00 & 22:00 GST.',
      bullets: ['Precious metals and agri-commodity price trends', 'Trade volume through Dubai and GCC hubs', 'Sources: Bloomberg, Reuters, DMCC Research, Zawya'],
      note: 'Live badge shown when price feeds succeed at refresh.',
    },
    ar: {
      label: 'عن أسواق السلع في الخليج',
      title: 'أسواق السلع في الخليج',
      intro: 'تدفقات الذهب والماس والنفط وممرات التجارة — تحديث 08:00 و22:00.',
      bullets: ['اتجاهات المعادن الثمينة والسلع الزراعية', 'حجم التجارة عبر دبي ومراكز الخليج', 'المصادر: بلومberg، رويترز، أبحاث DMCC، زاوية'],
      note: 'شارة «مباشر» عند نجاح المصادر.',
    },
  },
  competitor: {
    en: {
      label: 'About free zone watch',
      title: 'Free Zone Watch',
      intro: 'Latest moves by DIFC, ADGM, JAFZA and global commodity hubs affecting DMCC positioning.',
      bullets: ['DIFC, ADGM, Singapore free zones tracked', 'Digital asset and AI licensing announcements', 'Strategic implications flagged for DMCC ecosystem narrative'],
      note: 'Each headline links to its source. Interpretation is leadership\'s.',
    },
    ar: {
      label: 'عن رصد المناطق الحرة',
      title: 'رصد المناطق الحرة',
      intro: 'أحدث تحركات DIFC وADGM وJAFZA ومراكز السلع العالمية المؤثرة على تموضع DMCC.',
      bullets: ['رصد DIFC وADGM والمناطق الحرة في سنغافورة', 'إعلانات ترخيص الأصول الرقمية والذكاء الاصطناعي', 'تداعيات استراتيجية لسردية منظومة DMCC'],
      note: 'كل عنوان مرتبط بمصدره.',
    },
  },
  investment: {
    en: {
      label: 'About ecosystem pipeline',
      title: 'Ecosystem Pipeline',
      intro: 'DMCC member growth and new ecosystem launches across crypto, AI, gaming and commodity centres.',
      bullets: ['Crypto Centre: VASP licensing and member onboarding', 'AI & Gaming centres: ecosystem partnerships and sandbox pilots', '26,000+ companies across 180+ countries — milestone tracking'],
      note: 'Ecosystem expansion is DMCC\'s highest-priority growth vector.',
    },
    ar: {
      label: 'عن خط المنظومات',
      title: 'خط المنظومات',
      intro: 'نمو أعضاء DMCC وإطلاق منظومات جديدة في العملات الرقمية والذكاء الاصطناعي والألعاب ومراكز السلع.',
      bullets: ['مركز العملات الرقمية: ترخيص VASP وضم الأعضاء', 'مراكز الذكاء الاصطناعي والألعاب: شراكات المنظومة وتجارب sandbox', '26,000+ شركة في 180+ دولة — متابعة المعالم'],
      note: 'توسع المنظومات هو أعلى أولوية نمو لـ DMCC.',
    },
  },
  performance: {
    en: {
      label: 'About ecosystem performance',
      title: 'Ecosystem Performance',
      intro: 'Real-time health of gold, diamond, tea/coffee and digital asset centres — plus macro context.',
      bullets: ['Gold & Diamond: trading volumes, member activity', 'Tea & Coffee Centre: origin corridor flows', 'Crypto Centre: licensed VASP count and transaction trends', 'Macro data: gold and GCC indices when live feed available'],
      note: 'Internal data + live macro when Yahoo Finance feed succeeds.',
    },
    ar: {
      label: 'عن أداء المنظومة',
      title: 'أداء المنظومة',
      intro: 'صحة مراكز الذهب والماس والشاي/القهوة والأصول الرقمية في الوقت الفعلي — مع السياق الكلي.',
      bullets: ['الذهب والماس: أحجام التداول ونشاط الأعضاء', 'مركز الشاي والقهوة: تدفقات ممرات المنشأ', 'مركز العملات الرقمية: عدد VASP المرخصة واتجاهات المعاملات', 'بيانات كلية عند توفر المصدر المباشر'],
      note: 'بيانات داخلية + ماكرو مباشر عند نجاح Yahoo Finance.',
    },
  },
  regulatory: {
    en: {
      label: 'About UAE free zone compliance',
      title: 'UAE Free Zone Compliance',
      intro: 'UAE regulatory changes directly affecting DMCC members and commodity trade operations.',
      bullets: ['AML/CFT updates for VASP and trading members', 'Free zone licensing and member portal compliance cycles', 'MOHRE and immigration updates affecting member workforce'],
      note: 'Traceable to UAE regulators, DMCC authority notices or FATF guidance.',
    },
    ar: {
      label: 'عن امتثال المناطق الحرة في الإمارات',
      title: 'امتثال المناطق الحرة في الإمارات',
      intro: 'تغييرات تنظيمية إماراتية تؤثر مباشرة على أعضاء DMCC وعمليات تجارة السلع.',
      bullets: ['تحديثات AML/CFT لأعضاء VASP والتداول', 'دورات ترخيص المناطق الحرة وامتثال بوابة الأعضاء', 'تحديثات MOHRE والهجرة للقوى العاملة للأعضاء'],
      note: 'قابل للتتبع لجهات الإمارات أو إشعارات DMCC أو FATF.',
    },
  },
  followup: {
    en: {
      label: 'About awards & authority brand',
      title: 'Awards & Authority Brand',
      intro: 'Global Free Zone of the Year recognition, trade forum milestones, and DMCC brand initiatives.',
      bullets: ['Global Free Zone of the Year — fDi Awards', '26,000+ member company milestone campaigns', 'CEO speaking slots and ecosystem launch decisions tracked'],
      note: 'Live trade and free zone industry news when available.',
    },
    ar: {
      label: 'عن الجوائز والعلامة',
      title: 'الجوائز والعلامة',
      intro: 'اعتراف Global Free Zone of the Year ومعالم منتديات التجارة ومبادرات علامة DMCC.',
      bullets: ['Global Free Zone of the Year — جوائز fDi', 'حملات معلم 26,000+ شركة عضو', 'فرصة تحدث الرئيس التنفيذي وقرارات إطلاق المنظومات مُتابعة'],
      note: 'أخبار التجارة والمناطق الحرة المباشرة عند توفرها.',
    },
  },
};

export const SOURCE_EXPLANATION_SLIDE = {
  en: `## Data sources — DMCC Command Centre\n\n| Source | Used for | Credibility |\n|--------|----------|-------------|\n| Bloomberg / Reuters | Commodity & trade benchmarks | Market wires |\n| DMCC.ae / UAE regulators | Regulatory monitor | Authority & regulators |\n| SharePoint / DMS | Knowledge base | Approved authority docs |\n| Member portal / CRM | Performance | Internal data |`,
  ar: `## مصادر البيانات — مركز قيادة DMCC\n\n| المصدر | الاستخدام | الموثوقية |\n|--------|-----------|----------|\n| Bloomberg / Reuters | مقارنة السلع والتجارة | وكالات الأسواق |\n| DMCC.ae / جهات الإمارات | الرقابة | الهيئة والجهات |\n| SharePoint | قاعدة المعرفة | وثائق معتمدة |`,
};

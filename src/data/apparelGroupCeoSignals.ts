/**
 * DMCC CEO — priority signal intelligence
 * Ahmed Bin Sulayem · commodities, free zone, member ecosystem, compliance, trade
 */

export const DMCC_CEO = {
  name: 'Ahmed Bin Sulayem',
  title: 'Executive Chairman and Chief Executive Officer',
  organisation: 'DMCC',
} as const;

/** @deprecated Use DMCC_CEO */
export const APPAREL_GROUP_CEO = DMCC_CEO;

export const CEO_RELEVANCE_KEYWORDS = [
  'dmcc',
  'dubai multi commodities',
  'ahmed bin sulayem',
  'free zone',
  'commodit',
  'gold',
  'diamond',
  'precious metal',
  'tea',
  'coffee',
  'crypto',
  'digital asset',
  'vasp',
  'gaming',
  'ai ecosystem',
  'member portal',
  'member company',
  'jlt',
  'jumeirah lakes',
  'trade corridor',
  'difc',
  'adgm',
  'jafza',
  'singapore free zone',
  'aml',
  'cft',
  'sanction',
  'fatf',
  'uae trade',
  'gcc trade',
  'dubai trade',
  'bullion',
  'refinery',
  'origin corridor',
  'agri-commodit',
  'blockchain',
  'web3',
  'fintech',
  'where the world does business',
  '26,000',
  '180 countries',
  'global trade forum',
  'fdi awards',
  'free zone of the year',
] as const;

export const CEO_EXCLUDE_KEYWORDS = [
  'property market',
  'real estate',
  'townhouse',
  'townhouses',
  'apartment',
  'villa sales',
  'off-plan',
  'off plan',
  'fashion retail',
  'mall footfall',
  'omnichannel fashion',
  'club apparel',
  '6thstreet',
  '6th street',
  'r&b fashion',
  'apparel group',
  'neeraj teckchandani',
  'tim hortons',
  'cold stone',
  'namshi',
  'noon fashion',
  'images retailme',
  'arabian alesaar',
  'heydude',
  'barbour',
  'forever new',
  'rental index',
  'ejari',
  'rera',
  'dld',
  'damac',
  'nakheel',
  'meraas',
  'sobha',
  'sold for $',
  'homes sold',
  'units sold',
  'store opening',
  'value retail',
] as const;

export const CEO_SIGNAL_KEYWORDS = {
  market: ['commodit', 'gold', 'diamond', 'tea', 'coffee', 'trade', 'bullion', 'precious', 'gcc trade', 'uae trade', 'shipping', 'corridor', 'oil'],
  competitor: ['difc', 'adgm', 'jafza', 'singapore', 'free zone', 'digital asset', 'crypto hub', 'competitor', 'rival', 'benchmark'],
  investment: ['dmcc', 'member', 'ecosystem', 'crypto centre', 'ai centre', 'gaming centre', 'gold centre', 'diamond exchange', 'onboarding', 'expansion', 'partnership', '26,000'],
  regulatory: ['aml', 'cft', 'fatf', 'sanction', 'vasp', 'licensing', 'compliance', 'free zone', 'consultation', 'regulator', 'mohre', 'visa'],
  followup: ['award', 'fdi', 'free zone of the year', 'trade forum', 'global trade', 'milestone', 'campaign', 'ceo', 'dmcc', 'ahmed bin sulayem'],
} as const;

export type CeoSignalId = keyof typeof CEO_SIGNAL_FALLBACKS.en;

export const CEO_SIGNAL_FALLBACKS = {
  en: {
    market: {
      label: 'GCC Commodity & Trade',
      headline: 'Gold and diamond flows firm; trade corridors steady through Dubai',
      headlineSub: 'Commodities · UAE & GCC',
      body: 'Precious metals activity supports DMCC members. Tea and coffee origin volumes holding. Watch shipping routes and sanctions for corridor risk.',
      metricLabel: 'Trade pulse',
    },
    competitor: {
      label: 'Free Zone Landscape',
      headline: 'DIFC and ADGM press digital asset and AI licensing depth',
      headlineSub: 'DMCC · free zone watch',
      body: 'GCC free zones investing in crypto, AI and institutional finance. Implications for DMCC ecosystem positioning and member value proposition.',
      metricLabel: 'Hub moves',
    },
    investment: {
      label: 'Member Ecosystem & Centres',
      headline: 'Crypto and AI centre milestones — 26,000+ member companies',
      headlineSub: 'DMCC · 180+ countries',
      body: 'Priority growth vector: VASP onboarding, AI & Gaming ecosystem partnerships, and gold/diamond centre member expansion reviews.',
      metricLabel: 'Pipeline items',
    },
    performance: {
      label: 'Ecosystem Health',
      headline: 'Gold · Diamond · Crypto — operating pulse',
      headlineSub: 'Gold · Diamond · Tea/Coffee · Crypto',
      body: 'Gold centre trading volumes. Diamond exchange member activity. Crypto Centre VASP licensing and onboarding ROI.',
      metricLabel: 'Ecosystem KPI',
    },
    regulatory: {
      label: 'Free Zone & AML Compliance',
      headline: 'UAE AML/CFT, VASP rules and free zone licensing updates',
      headlineSub: 'DMCC Authority · UAE regulators · FATF',
      body: 'AML/CFT guidance for crypto members. Free zone licence renewals and FATF travel rule affecting VASP onboarding.',
      metricLabel: 'Reg updates',
    },
    followup: {
      label: 'Authority Brand & Stakeholders',
      headline: 'Global Free Zone of the Year and member milestone campaigns',
      headlineSub: 'fDi Awards · DMCC',
      body: 'Trade forum keynotes, CEO speaking opportunities, ecosystem launch campaigns, and member growth initiatives requiring executive sign-off this quarter.',
      metricLabel: 'Brand items',
    },
  },
  ar: {
    market: {
      label: 'السلع والتجارة في الخليج',
      headline: 'تدفقات الذهب والماس مستقرة؛ ممرات التجارة عبر دبي ثابتة',
      headlineSub: 'السلع · الإمارات والخليج',
      body: 'نشاط المعادن الثمينة يدعم أعضاء DMCC. أحجام الشاي والقهوة مستقرة. راقب مسارات الشحن والعقوبات.',
      metricLabel: 'نبض التجارة',
    },
    competitor: {
      label: 'مشهد المناطق الحرة',
      headline: 'DIFC وADGM يعززان ترخيص الأصول الرقمية والذكاء الاصطناعي',
      headlineSub: 'DMCC · رصد المناطق الحرة',
      body: 'استثمار المناطق الحرة في العملات الرقمية والذكاء الاصطناعي — تداعيات على تموضع منظومة DMCC.',
      metricLabel: 'تحركات المراكز',
    },
    investment: {
      label: 'منظومة الأعضاء والمراكز',
      headline: 'معالم مركز العملات الرقمية والذكاء الاصطناعي — 26,000+ شركة',
      headlineSub: 'DMCC · 180+ دولة',
      body: 'أولوية النمو: ضم VASP وشراكات منظومة الذكاء الاصطناعي والألعاب وتوسع أعضاء الذهب والماس.',
      metricLabel: 'بنود المشروع',
    },
    performance: {
      label: 'صحة المنظومة',
      headline: 'الذهب · الماس · العملات الرقمية — نبض التشغيل',
      headlineSub: 'الذهب · الماس · الشاي/القهوة · العملات الرقمية',
      body: 'أحجام تداول مركز الذهب. نشاط أعضاء بورصة الماس. ترخيص VASP وضم الأعضاء في مركز العملات الرقمية.',
      metricLabel: 'مؤشر المنظومة',
    },
    regulatory: {
      label: 'امتثال المناطق الحرة وAML',
      headline: 'تحديثات AML/CFT وVASP وترخيص المناطق الحرة',
      headlineSub: 'هيئة DMCC · جهات الإمارات · FATF',
      body: 'إرشادات AML/CFT لأعضاء العملات الرقمية وتجديد التراخيص وقاعدة FATF travel rule.',
      metricLabel: 'تحديثات تنظيمية',
    },
    followup: {
      label: 'علامة الهيئة وأصحاب المصلحة',
      headline: 'Global Free Zone of the Year وحملات معالم الأعضاء',
      headlineSub: 'جوائز fDi · DMCC',
      body: 'منتديات التجارة وفرص التحدث وحملات إطلاق المنظومات التي تحتاج موافقة تنفيذية.',
      metricLabel: 'بنود العلامة',
    },
  },
} as const;

export function ceoItemText(item?: { title?: string; excerpt?: string }): string {
  return `${item?.title ?? ''} ${item?.excerpt ?? ''}`.toLowerCase();
}

export function isExcludedForCeo(item?: { title?: string; excerpt?: string }): boolean {
  const text = ceoItemText(item);
  return CEO_EXCLUDE_KEYWORDS.some((kw) => text.includes(kw));
}

export function isRelevantForCeo(item?: { title?: string; excerpt?: string }): boolean {
  if (!item?.title) return false;
  if (isExcludedForCeo(item)) return false;
  const text = ceoItemText(item);
  return CEO_RELEVANCE_KEYWORDS.some((kw) => text.includes(kw));
}

export function ceoSignalScore(
  tag: keyof typeof CEO_SIGNAL_KEYWORDS,
  item?: { title?: string; excerpt?: string },
): number {
  const text = ceoItemText(item);
  return CEO_SIGNAL_KEYWORDS[tag].reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
}

export function pickCeoLead(
  tag: keyof typeof CEO_SIGNAL_KEYWORDS,
  ...candidates: ({ title?: string; excerpt?: string } | null | undefined)[]
) {
  const pool = candidates.filter(Boolean) as { title: string; excerpt?: string }[];
  const relevant = pool.filter((item) => isRelevantForCeo(item) && !isExcludedForCeo(item));
  const scored = relevant
    .map((item) => ({ item, score: ceoSignalScore(tag, item) }))
    .sort((a, b) => b.score - a.score);
  if (scored[0]?.score > 0) return scored[0].item;
  return relevant[0] ?? undefined;
}

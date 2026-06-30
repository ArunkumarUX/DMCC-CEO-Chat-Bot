/**
 * Apparel Group CEO — priority signal intelligence
 * Neeraj Teckchandani · retail, portfolio, GCC expansion, compliance, brand
 */

export const APPAREL_GROUP_CEO = {
  name: 'Neeraj Teckchandani',
  title: 'Chief Executive Officer',
  organisation: 'Apparel Group',
} as const;

export const CEO_RELEVANCE_KEYWORDS = [
  'apparel group',
  'r&b',
  '6thstreet',
  '6th street',
  'club apparel',
  'nysaa',
  'neeraj teckchandani',
  'retail',
  'fashion',
  'mall',
  'footfall',
  'consumer',
  'store',
  'omnichannel',
  'e-commerce',
  'ecommerce',
  'loyalty',
  'namshi',
  'noon',
  'centrepoint',
  'landmark',
  'tim hortons',
  'cold stone',
  'aldo',
  'charles keith',
  'ksa',
  'saudi retail',
  'uae retail',
  'gcc retail',
  'arabian alesaar',
  'heydude',
  'barbour',
  'forever new',
  'images retailme',
  'vat',
  'ded',
  'mohre',
  'fta',
  'f&b',
  'franchise',
  'brand launch',
  'store opening',
  'value retail',
  'athleisure',
  'beauty retail',
  'lifestyle',
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
  'data center',
  'data centre',
  'ai infra',
  'war turmoil',
  'cryptocurrency',
  'bitcoin',
  'masterplan',
  'racecourse',
  'drec',
  'huna sculpture',
  'arm holding',
  'a.r.m.',
  'difc',
  'fsra',
  'rental index',
  'ejari',
  'rera',
  'dld',
  'damac',
  'nakheel',
  'meraas',
  'sobha',
  'coingecko',
  'ethereum',
  'btc ',
  ' eth',
  'sold for $',
  'homes sold',
  'units sold',
] as const;

export const CEO_SIGNAL_KEYWORDS = {
  market: ['retail', 'fashion', 'mall', 'footfall', 'consumer', 'tourism', 'gcc retail', 'uae retail', 'ksa retail', 'lifestyle', 'spending'],
  competitor: ['namshi', 'noon', 'centrepoint', 'landmark', 'e-commerce', 'omnichannel', 'delivery', 'fast fashion', 'marketplace', 'competitor', 'rival'],
  investment: ['apparel group', 'store opening', 'expansion', 'ksa', 'saudi', 'franchise', 'heydude', 'barbour', 'forever new', 'arabian alesaar', 'new store', 'flagship'],
  regulatory: ['vat', 'ded', 'mohre', 'fta', 'retail license', 'labour', 'labor', 'visa', 'compliance', 'f&b', 'tim hortons', 'cold stone'],
  followup: ['images retailme', 'club apparel', 'loyalty', 'award', 'sustainability', 'brand', 'campaign', 'nysaa', 'ceo', 'apparel group'],
} as const;

export type CeoSignalId = keyof typeof CEO_SIGNAL_FALLBACKS.en;

export const CEO_SIGNAL_FALLBACKS = {
  en: {
    market: {
      label: 'GCC Consumer & Retail',
      headline: 'GCC mall footfall and fashion demand holding into summer',
      headlineSub: 'Consumer & retail · UAE & KSA',
      body: 'Tourism-linked traffic supports UAE malls. Value and athleisure outperform in KSA. Watch discretionary spend ahead of back-to-school.',
      metricLabel: 'Retail pulse',
    },
    competitor: {
      label: 'Competitive Landscape',
      headline: 'Namshi and Noon press fashion delivery and marketplace depth',
      headlineSub: '6thStreet · omnichannel watch',
      body: 'GCC e-commerce players investing in fashion, beauty, and same-day delivery. Implications for 6thStreet positioning and margin guardrails.',
      metricLabel: 'Rival moves',
    },
    investment: {
      label: 'Store Network & KSA',
      headline: 'KSA expansion milestones — Arabian Alesaar partnership',
      headlineSub: 'Apparel Group · 2,500+ stores · 14 countries',
      body: 'Priority growth vector: Saudi store rollouts, franchise brands (HEYDUDE, Barbour, Forever New, MLB), and country-head execution reviews.',
      metricLabel: 'Pipeline items',
    },
    performance: {
      label: 'Portfolio Health',
      headline: 'R&B · 6thStreet · Club Apparel — operating pulse',
      headlineSub: 'R&B · 6thStreet · Club Apparel · Nysaa',
      body: 'R&B value retail same-store trends. 6thStreet GMV and 90-min delivery uptake. Club Apparel 10M+ members and campaign ROI.',
      metricLabel: 'Portfolio KPI',
    },
    regulatory: {
      label: 'Retail & F&B Compliance',
      headline: 'UAE VAT, DED licensing, and MOHRE updates for store ops',
      headlineSub: 'UAE DED · FTA · MOHRE',
      body: 'VAT guidance for F&B (Tim Hortons, Cold Stone). Retail licence renewals and labour rules affecting 2,500+ store network.',
      metricLabel: 'Reg updates',
    },
    followup: {
      label: 'Brand & Stakeholders',
      headline: 'Images RetailME Awards and Club Apparel member milestone',
      headlineSub: 'Images RetailME · Apparel Group',
      body: 'Industry awards, CEO speaking opportunities, loyalty campaigns, and brand launches requiring executive sign-off this quarter.',
      metricLabel: 'Brand items',
    },
  },
  ar: {
    market: {
      label: 'المستهلك والتجزئة في الخليج',
      headline: 'حركة المولات والطلب على الأزياء مستمرة',
      headlineSub: 'المستهلك والتجزئة · الإمارات والسعودية',
      body: 'السياحة تدعم حركة المولات في الإمارات. التجزئة القيمة والرياضية أقوى في السعودية.',
      metricLabel: 'نبض التجزئة',
    },
    competitor: {
      label: 'المشهد التنافسي',
      headline: 'نامشي ونون يعززان التوصيل والأزياء',
      headlineSub: '6thStreet · رصد القنوات المتعددة',
      body: 'استثمار اللاعبين في الأزياء والجمال والتوصيل السريع — تداعيات على تموضع 6thStreet.',
      metricLabel: 'تحركات المنافسين',
    },
    investment: {
      label: 'شبكة المتاجر والسعودية',
      headline: 'معالم توسع السعودية — شراكة Arabian Alesaar',
      headlineSub: 'Apparel Group · 2,500+ متجر · 14 دولة',
      body: 'أولوية النمو: افتتاحات السعودية وعلامات الامتياز ومراجعات التنفيذ مع رؤساء الدول.',
      metricLabel: 'بنود المشروع',
    },
    performance: {
      label: 'صحة المحفظة',
      headline: 'R&B · 6thStreet · Club Apparel — نبض التشغيل',
      headlineSub: 'R&B · 6thStreet · Club Apparel · Nysaa',
      body: 'اتجاهات R&B وGMV لـ 6thStreet وولاء Club Apparel 10M+ عضو.',
      metricLabel: 'مؤشر المحفظة',
    },
    regulatory: {
      label: 'امتثال التجزئة والمأكولات',
      headline: 'ضريبة القيمة المضافة وتراخيص DED وMOHRE',
      headlineSub: 'DED · FTA · MOHRE',
      body: 'إرشادات ضريبة المأكولات وتجديد التراخيص وقواعد العمل لشبكة المتاجر.',
      metricLabel: 'تحديثات تنظيمية',
    },
    followup: {
      label: 'العلامة وأصحاب المصلحة',
      headline: 'جوائز Images RetailME ومعالم Club Apparel',
      headlineSub: 'Images RetailME · Apparel Group',
      body: 'جوائز الصناعة وحملات الولاء وإطلاق العلامات التي تحتاج موافقة تنفيذية.',
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

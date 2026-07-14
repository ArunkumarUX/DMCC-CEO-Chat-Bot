/** Knowledge base — DMCC ecosystems & member corridors */
export type KbCompanyId = 'arm' | 'drec' | 'huna' | 'hive' | 'capri';

export type KbCompany = {
  id: KbCompanyId;
  label: string;
  labelAr: string;
  short: string;
  tagline: string;
  taglineAr: string;
  icon: string;
  color: string;
};

export const KB_COMPANIES: readonly KbCompany[] = [
  {
    id: 'arm',
    label: 'DMCC',
    labelAr: 'مركز دبي للسلع المتعددة',
    short: 'DMCC',
    tagline: 'Free zone strategy · member services · board intelligence',
    taglineAr: 'استراتيجية المنطقة الحرة · خدمات الأعضاء · ذكاء المجلس',
    icon: 'landmark',
    color: 'var(--adgm-navy)',
  },
  {
    id: 'drec',
    label: 'Gold & Precious Metals',
    labelAr: 'الذهب والمعادن الثمينة',
    short: 'Gold',
    tagline: 'DMCC Good Delivery · Dubai Precious Metals Conference',
    taglineAr: 'تسليم DMCC المعتمد · مؤتمر دبي للمعادن الثمينة',
    icon: 'building-2',
    color: 'var(--status-info)',
  },
  {
    id: 'huna',
    label: 'Crypto & Digital Assets',
    labelAr: 'العملات الرقمية والأصول',
    short: 'Crypto',
    tagline: 'BlockDown Dubai · tokenisation · Tether MoU',
    taglineAr: 'BlockDown دبي · الترميز · مذكرة تفاهم Tether',
    icon: 'sparkles',
    color: 'var(--status-warn)',
  },
  {
    id: 'hive',
    label: 'Diamonds',
    labelAr: 'الماس',
    short: 'Diamonds',
    tagline: 'Dubai Diamond Exchange · rough & polished tenders',
    taglineAr: 'بورصة دبي للماس · مناقصات خام ومصقولة',
    icon: 'layers',
    color: 'var(--status-good)',
  },
  {
    id: 'capri',
    label: 'AI & Technology',
    labelAr: 'الذكاء الاصطناعي والتكنولوجيا',
    short: 'Tech',
    tagline: 'DMCC Cyber · 4,000+ tech companies',
    taglineAr: 'DMCC Cyber · أكثر من 4,000 شركة تقنية',
    icon: 'trending-up',
    color: 'var(--status-risk)',
  },
] as const;

const BY_ID = Object.fromEntries(KB_COMPANIES.map((c) => [c.id, c])) as Record<KbCompanyId, KbCompany>;

export function getKbCompany(id?: string | null): KbCompany | undefined {
  if (!id) return undefined;
  return BY_ID[id as KbCompanyId];
}

export function kbCompanyLabel(id: KbCompanyId | undefined, ar: boolean): string {
  const c = id ? BY_ID[id] : undefined;
  if (!c) return ar ? 'غير محدد' : 'Unassigned';
  return ar ? c.labelAr : c.label;
}

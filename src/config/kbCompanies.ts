/** Knowledge base — A.R.M. Holding portfolio repositories */
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
    label: 'A.R.M. Holding',
    labelAr: 'A.R.M. Holding',
    short: 'ARM',
    tagline: 'Group strategy · board & portfolio intelligence',
    taglineAr: 'استراتيجية المجموعة · ذكاء المجلس والمحفظة',
    icon: 'landmark',
    color: 'var(--adgm-navy)',
  },
  {
    id: 'drec',
    label: 'DREC',
    labelAr: 'DREC',
    short: 'DREC',
    tagline: 'Real estate · 3,200+ residential & commercial units',
    taglineAr: 'العقارات · أكثر من 3200 وحدة سكنية وتجارية',
    icon: 'building-2',
    color: 'var(--status-info)',
  },
  {
    id: 'huna',
    label: 'HUNA',
    labelAr: 'HUNA',
    short: 'HUNA',
    tagline: 'Design-led real estate · architecture, culture & commerce',
    taglineAr: 'عقارات بتصميم رائد · العمارة والثقافة والتجارة',
    icon: 'sparkles',
    color: 'var(--status-warn)',
  },
  {
    id: 'hive',
    label: 'HIVE',
    labelAr: 'HIVE',
    short: 'HIVE',
    tagline: 'Coliving · flexible furnished living for creatives',
    taglineAr: 'العيش المشترك · سكن مرن ومفروش للمبدعين',
    icon: 'layers',
    color: 'var(--status-good)',
  },
  {
    id: 'capri',
    label: 'Capri LLC',
    labelAr: 'Capri LLC',
    short: 'Capri',
    tagline: 'Investment arm · UAE & international portfolio',
    taglineAr: 'الذراع الاستثمارية · محفظة الإمارات والأسواق الدولية',
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

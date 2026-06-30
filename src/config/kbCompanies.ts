/** Knowledge base — Apparel Group portfolio repositories */
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
    label: 'Apparel Group',
    labelAr: 'Apparel Group',
    short: 'AG',
    tagline: 'Group strategy · board & portfolio intelligence',
    taglineAr: 'استراتيجية المجموعة · ذكاء المجلس والمحفظة',
    icon: 'landmark',
    color: 'var(--adgm-navy)',
  },
  {
    id: 'drec',
    label: 'R&B Fashion',
    labelAr: 'R&B Fashion',
    short: 'R&B',
    tagline: 'Homegrown fashion · 100+ stores across GCC',
    taglineAr: 'أزياء محلية · أكثر من 100 متجر في الخليج',
    icon: 'building-2',
    color: 'var(--status-info)',
  },
  {
    id: 'huna',
    label: '6thStreet',
    labelAr: '6thStreet',
    short: '6thStreet',
    tagline: 'Omnichannel e-commerce · phygital retail',
    taglineAr: 'تجارة إلكترونية متعددة القنوات · تجزئة رقمية-مادية',
    icon: 'sparkles',
    color: 'var(--status-warn)',
  },
  {
    id: 'hive',
    label: 'Club Apparel',
    labelAr: 'Club Apparel',
    short: 'Club Apparel',
    tagline: 'Loyalty programme · 10M+ members',
    taglineAr: 'برنامج الولاء · أكثر من 10 ملايين عضو',
    icon: 'layers',
    color: 'var(--status-good)',
  },
  {
    id: 'capri',
    label: 'Nysaa',
    labelAr: 'Nysaa',
    short: 'Nysaa',
    tagline: 'Beauty retail · Nykaa GCC partnership',
    taglineAr: 'تجزئة الجمال · شراكة Nykaa في الخليج',
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

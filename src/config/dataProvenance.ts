/** What stakeholders can trust vs prototype scenario data */

export type DataSourceMode = 'live' | 'institutional' | 'pending' | 'ai';

export type DataSourceStatus = {
  id: string;
  labelEn: string;
  labelAr: string;
  mode: DataSourceMode;
  detailEn: string;
  detailAr: string;
};

export type DataProvenance = {
  lastSync: string;
  refreshedAt?: string;
  scheduleLabel?: string;
  bloombergLive: boolean;
  bloombergFetchedAt?: string;
  bloombergHeadline?: string;
  claudeEnabled: boolean;
  kbChunkCount: number;
  sources: DataSourceStatus[];
};

export const KB_CHUNK_COUNT = 183;

export function buildDefaultProvenance(opts?: {
  lastSync?: string;
  bloombergLive?: boolean;
  bloombergFetchedAt?: string;
  bloombergHeadline?: string;
  claudeEnabled?: boolean;
  scheduleLabel?: string;
}): DataProvenance {
  const lastSync = opts?.lastSync ?? new Date().toISOString();
  const bloombergLive = Boolean(opts?.bloombergLive);

  return {
    lastSync,
    refreshedAt: lastSync,
    scheduleLabel: opts?.scheduleLabel ?? '08:00 & 22:00 GST refresh',
    bloombergLive,
    bloombergFetchedAt: opts?.bloombergFetchedAt,
    bloombergHeadline: opts?.bloombergHeadline,
    claudeEnabled: opts?.claudeEnabled ?? false,
    kbChunkCount: KB_CHUNK_COUNT,
    sources: [
      {
        id: 'claude',
        labelEn: 'Personal AI',
        labelAr: 'الذكاء الشخصي',
        mode: 'ai',
        detailEn: opts?.claudeEnabled
          ? 'Answers synthesised from grounded records below — no invented figures.'
          : 'API key required for live synthesis; scenario fallback active.',
        detailAr: opts?.claudeEnabled
          ? 'إجابات مبنية على السجلات الموثقة أدناه — دون اختلاق أرقام.'
          : 'يتطلب مفتاح API؛ سيناريوهات تجريبية عند عدم التوفر.',
      },
      {
        id: 'bloomberg',
        labelEn: 'Market headlines',
        labelAr: 'عناوين السوق',
        mode: bloombergLive ? 'live' : 'pending',
        detailEn: bloombergLive
          ? `Live Bloomberg categories via Apify${opts?.bloombergHeadline ? `: ${opts.bloombergHeadline.slice(0, 80)}` : ''}.`
          : 'Set APIFY_TOKEN on server for live Bloomberg wire; otherwise rotation snapshot only.',
        detailAr: bloombergLive
          ? 'عناوين Bloomberg حية عبر Apify.'
          : 'أضف APIFY_TOKEN للحصول على Bloomberg حي؛ وإلا لقطة سيناريو فقط.',
      },
      {
        id: 'kb',
        labelEn: 'Knowledge base (DMCC corporate & trade sources)',
        labelAr: 'قاعدة المعرفة',
        mode: 'institutional',
        detailEn: `${KB_CHUNK_COUNT} grounded chunks from official DMCC sources — Future of Trade reports, member ecosystem briefs, and free zone policy documents.`,
        detailAr: `${KB_CHUNK_COUNT} مقطعاً من مصادر DMCC الرسمية — تقارير Future of Trade وموجزات المنظومة وسياسات المنطقة الحرة.`,
      },
      {
        id: 'calendar',
        labelEn: 'Calendar & action register',
        labelAr: 'التقويم وسجل الإجراءات',
        mode: 'pending',
        detailEn: 'CEO scenario dataset — dates roll with GST refresh; not Microsoft Graph yet.',
        detailAr: 'بيانات سيناريو للرئيس التنفيذي — تُحدَّث بتوقيت الإمارات.',
      },
      {
        id: 'departments',
        labelEn: 'Nine department dashboards',
        labelAr: 'لوحات الإدارات التسع',
        mode: 'pending',
        detailEn: 'Illustrative ERP-style metrics — ERP integration planned; cite as internal records only.',
        detailAr: 'مؤشرات توضيحية للعرض — تُستشهد كسجلات داخلية فقط.',
      },
      {
        id: 'ticker',
        labelEn: 'Commodities ticker & charts',
        labelAr: 'شريط السلع والرسوم',
        mode: 'pending',
        detailEn: 'Scenario indices for gold, Brent, and trade corridors — not a live exchange feed.',
        detailAr: 'مؤشرات سيناريو للذهب والنفط وممرات التجارة — ليست بيانات بورصة حية.',
      },
    ],
  };
}

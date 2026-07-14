/** Catalog for conversational Generate Document workflow */

export type CatalogItem = {
  id: string;
  label: string;
  labelAr: string;
  hint?: string;
};

export const DOC_TYPES: CatalogItem[] = [
  { id: 'business-proposal', label: 'Business Proposal', labelAr: 'مقترح أعمال' },
  { id: 'company-profile', label: 'Company Profile', labelAr: 'ملف الشركة' },
  { id: 'board-report', label: 'Board Report', labelAr: 'تقرير مجلس' },
  { id: 'investor-update', label: 'Investor Update', labelAr: 'تحديث مستثمرين' },
  { id: 'strategic-plan', label: 'Strategic Plan', labelAr: 'خطة استراتيجية' },
  { id: 'business-plan', label: 'Business Plan', labelAr: 'خطة عمل' },
  { id: 'executive-summary', label: 'Executive Summary', labelAr: 'ملخص تنفيذي' },
  { id: 'annual-report', label: 'Annual Report', labelAr: 'تقرير سنوي' },
  { id: 'project-proposal', label: 'Project Proposal', labelAr: 'مقترح مشروع' },
  { id: 'policy', label: 'Policy Document', labelAr: 'وثيقة سياسة' },
  { id: 'meeting-brief', label: 'Meeting Brief', labelAr: 'إحاطة اجتماع' },
  { id: 'decision-memo', label: 'Decision Memo', labelAr: 'مذكرة قرار' },
  { id: 'market-research', label: 'Market Research Report', labelAr: 'تقرير بحث سوق' },
  { id: 'financial-report', label: 'Financial Report', labelAr: 'تقرير مالي' },
  { id: 'performance-review', label: 'Performance Review', labelAr: 'مراجعة أداء' },
  { id: 'sop', label: 'Standard Operating Procedure', labelAr: 'إجراء تشغيل معياري' },
  { id: 'custom', label: 'Custom Document', labelAr: 'مستند مخصص' },
];

export const DOC_PURPOSES: CatalogItem[] = [
  { id: 'secure-approval', label: 'Secure approval', labelAr: 'تأمين موافقة' },
  { id: 'inform-leadership', label: 'Inform leadership', labelAr: 'إطلاع القيادة' },
  { id: 'present-performance', label: 'Present business performance', labelAr: 'عرض أداء الأعمال' },
  { id: 'strategic-decision', label: 'Support a strategic decision', labelAr: 'دعم قرار استراتيجي' },
  { id: 'raise-investment', label: 'Raise investment', labelAr: 'جمع استثمار' },
  { id: 'win-client', label: 'Win a client', labelAr: 'كسب عميل' },
  { id: 'new-initiative', label: 'Communicate a new initiative', labelAr: 'إعلان مبادرة' },
  { id: 'document-process', label: 'Document a company process', labelAr: 'توثيق عملية' },
];

export const DOC_AUDIENCES: CatalogItem[] = [
  { id: 'board', label: 'Board Members', labelAr: 'أعضاء المجلس' },
  { id: 'investors', label: 'Investors', labelAr: 'مستثمرون' },
  { id: 'leadership', label: 'Leadership Team', labelAr: 'فريق القيادة' },
  { id: 'employees', label: 'Employees', labelAr: 'الموظفون' },
  { id: 'clients', label: 'Clients', labelAr: 'العملاء' },
  { id: 'government', label: 'Government Authorities', labelAr: 'جهات حكومية' },
  { id: 'partners', label: 'Business Partners', labelAr: 'شركاء أعمال' },
  { id: 'internal', label: 'Internal Teams', labelAr: 'فرق داخلية' },
  { id: 'public', label: 'General Public', labelAr: 'الجمهور العام' },
];

export const DOC_STYLES: CatalogItem[] = [
  { id: 'executive', label: 'Executive', labelAr: 'تنفيذي' },
  { id: 'corporate', label: 'Corporate', labelAr: 'مؤسسي' },
  { id: 'premium', label: 'Premium', labelAr: 'راقٍ' },
  { id: 'minimal', label: 'Minimal', labelAr: 'بسيط' },
  { id: 'modern', label: 'Modern', labelAr: 'حديث' },
  { id: 'investor-ready', label: 'Investor-Ready', labelAr: 'جاهز للمستثمرين' },
  { id: 'board-level', label: 'Board-Level', labelAr: 'مستوى المجلس' },
  { id: 'professional', label: 'Professional', labelAr: 'مهني' },
  { id: 'formal', label: 'Formal', labelAr: 'رسمي' },
  { id: 'creative', label: 'Creative', labelAr: 'إبداعي' },
  { id: 'dmcc-brand', label: 'DMCC Brand Style', labelAr: 'هوية DMCC' },
];

export const QUICK_DOC_TEMPLATES = [
  {
    id: 'diamond-board',
    label: 'Board memo — Diamond corridor',
    labelAr: 'مذكرة مجلس — ممر الماس',
    description: 'Decision memo for London Diamond Bourse MoU acceleration',
    descriptionAr: 'مذكرة قرار لتسريع مذكرة بورصة لندن للماس',
    seed: {
      docType: 'decision-memo',
      purpose: 'strategic-decision',
      audience: 'board',
      style: 'board-level',
      includeNotes:
        'Focus on USD 41.7B diamond trade, London MoU, Antwerp/Mumbai competition, CEO decisions for H2 2026.',
    },
  },
  {
    id: 'cyber-investor',
    label: 'Investor update — DMCC Cyber',
    labelAr: 'تحديث مستثمرين — DMCC Cyber',
    description: 'Investor-ready brief on tech & crypto cluster formalisation',
    descriptionAr: 'موجز للمستثمرين حول مجمع التقنية والعملات الرقمية',
    seed: {
      docType: 'investor-update',
      purpose: 'raise-investment',
      audience: 'investors',
      style: 'investor-ready',
      includeNotes:
        'Cover DMCC Cyber 4,000+ companies, Tether MoU, BlockDown Dubai 2027, differentiation vs ADGM/DIFC.',
    },
  },
  {
    id: 'fot-exec',
    label: 'Executive summary — Future of Trade',
    labelAr: 'ملخص تنفيذي — مستقبل التجارة',
    description: 'One-page leadership summary of FoT 2026 priorities',
    descriptionAr: 'ملخص صفحة واحدةحدة لأولويات مستقبل التجارة 2026',
    seed: {
      docType: 'executive-summary',
      purpose: 'inform-leadership',
      audience: 'leadership',
      style: 'executive',
      includeNotes:
        'Future of Trade 2026 Rebuilding Through Rupture — key findings, member implications, Singapore launch.',
    },
  },
] as const;

export function labelFor(list: CatalogItem[], id: string | undefined, ar: boolean): string {
  const item = list.find((x) => x.id === id);
  if (!item) return id || '—';
  return ar ? item.labelAr : item.label;
}

import type { KbCompanyId } from '../config/kbCompanies';
import { PERFORMANCE_COMPANY_DEPT_IDS } from '../config/performanceCompanies';
import { DEPARTMENTS, type CommandCentreDepartment } from './commandCentreData';

export type PerfCompanyFilter = 'all' | KbCompanyId;

function deptIdsForCompany(company: PerfCompanyFilter): Set<string> | null {
  if (company === 'all') return null;
  return new Set(PERFORMANCE_COMPANY_DEPT_IDS[company]);
}

export function getPerformanceDepartments(
  company: PerfCompanyFilter,
): CommandCentreDepartment[] {
  const allowed = deptIdsForCompany(company);
  if (!allowed) return [...DEPARTMENTS];
  return DEPARTMENTS.filter((d) => allowed.has(d.id));
}

export function countRagStatuses(depts: CommandCentreDepartment[]) {
  return depts.reduce(
    (a, x) => {
      if (x.rag === 'good' || x.rag === 'warn' || x.rag === 'risk') a[x.rag]++;
      return a;
    },
    { good: 0, warn: 0, risk: 0 },
  );
}

export type PerformanceEscalationItem = {
  id: string;
  deptId: string;
  icon: string;
  title: string;
  sev: string;
};

const ESCALATION_DEFS: {
  id: string;
  deptId: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  sev: string;
}[] = [
  {
    id: 'esc-members',
    deptId: 'members',
    icon: 'users',
    titleEn: '12 licence renewals pending · 3 account manager roles unfilled',
    titleAr: '12 تجديد ترخيص معلق · 3 وظائف مدير حسابات شاغرة',
    sev: 'High',
  },
  {
    id: 'esc-it',
    deptId: 'it',
    icon: 'cpu',
    titleEn: 'DMCC Intelligence vendor API delivery slipping 2+ weeks',
    titleAr: 'تسليم واجهة مزود DMCC Intelligence متأخر أسبوعين+',
    sev: 'High',
  },
  {
    id: 'esc-legal',
    deptId: 'legal',
    icon: 'scale',
    titleEn: 'Corporate tax qualifying income member advisory due in 14 days',
    titleAr: 'استشارة ضريبة الشركات للدخل المؤهل مستحقة خلال 14 يوماً',
    sev: 'High',
  },
  {
    id: 'esc-bizdev',
    deptId: 'bizdev',
    icon: 'target',
    titleEn: 'AED 2.1B partner pipeline · Uptown Dubai deal stalled',
    titleAr: 'خط أنابيب شراكات 2.1 مليار درهم · صفقة أبتاون دبي متوقفة',
    sev: 'Medium',
  },
];

export function getPerformanceEscalations(
  ar: boolean,
  company: PerfCompanyFilter,
): PerformanceEscalationItem[] {
  const allowed = deptIdsForCompany(company);
  return ESCALATION_DEFS.filter((i) => !allowed || allowed.has(i.deptId)).map((i) => ({
    id: i.id,
    deptId: i.deptId,
    icon: i.icon,
    sev: i.sev,
    title: ar ? i.titleAr : i.titleEn,
  }));
}

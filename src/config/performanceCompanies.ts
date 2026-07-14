import type { KbCompanyId } from './kbCompanies';

/** Department ids shown per ecosystem on the Performance page */
export const PERFORMANCE_COMPANY_DEPT_IDS: Record<KbCompanyId, readonly string[]> = {
  arm: [
    'members',
    'commodities',
    'bizdev',
    'it',
    'finance',
    'strategy',
    'events',
    'legal',
    'marketing',
  ],
  drec: ['commodities', 'finance', 'strategy', 'legal', 'members'],
  huna: ['it', 'legal', 'strategy', 'marketing', 'bizdev'],
  hive: ['commodities', 'events', 'marketing', 'finance', 'bizdev'],
  capri: ['it', 'strategy', 'marketing', 'legal', 'bizdev'],
};

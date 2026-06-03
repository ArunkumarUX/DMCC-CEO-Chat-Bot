/** Primary user — Personal AI for Rajiv Sehgal (CSO, ADGM) */
export const EXECUTIVE_USER = {
  firstName: 'Rajiv',
  fullName: 'Rajiv Sehgal',
  title: 'Chief Strategy Officer',
  organisation: 'Abu Dhabi Global Market (ADGM)',
  email: 'rajiv.sehgal@adgm.com',
  role: 'cso' as const,
};

/** Product naming — Personal AI for Rajiv Sehgal */
export const PRODUCT_NAME = 'Personal AI for Rajiv Sehgal';
export const PRODUCT_NAME_AR = 'الذكاء الشخصي لراجيف سيهغال';
export const PRODUCT_AGENT_NAME = 'Personal AI Agent';
export const PRODUCT_AGENT_NAME_AR = 'وكيل الذكاء الشخصي';
/** @deprecated Use PRODUCT_AGENT_NAME in product UI */
export const PRODUCT_SHORT_NAME = PRODUCT_AGENT_NAME;
export const PRODUCT_SHORT_NAME_AR = PRODUCT_AGENT_NAME_AR;
export const PRODUCT_SUBTITLE = 'Chief Strategy Officer · ADGM';
export const PRODUCT_SUBTITLE_AR = 'كبير مسؤولي الاستراتيجية · سوق أبوظبي العالمي';
export const PRODUCT_TAGLINE =
  'Strategic intelligence, market opportunities, policy insight, stakeholder readiness and performance visibility.';
export const PRODUCT_TAGLINE_AR =
  'استخبارات استراتيجية، فرص السوق، رؤى السياسات، جاهزية أصحاب المصلحة، ورؤية الأداء.';

export const CSO_DAILY_CAPABILITIES = [
  'Ask strategic questions across approved knowledge sources',
  'Generate board-ready summaries and executive briefings',
  'Compare ADGM against global financial centres',
  'Review opportunities, risks and performance signals in one place',
] as const;

export function greetingForTime(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

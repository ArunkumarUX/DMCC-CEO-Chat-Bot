/** Primary user — Personal AI for DMCC Executive Chairman & CEO */
export const EXECUTIVE_USER = {
  firstName: 'Ahmed',
  fullName: 'Ahmed Bin Sulayem',
  /** Compact label for sidebar and tight UI slots */
  shortName: 'Ahmed',
  /** Two-letter avatar mark */
  initials: 'AS',
  profileImage: '/images/executive-profile.png',
  title: 'Executive Chairman & CEO',
  /** Full title as listed on dmcc.ae */
  titleFull: 'Executive Chairman and Chief Executive Officer, DMCC',
  organisation: 'DMCC',
  orgShort: 'DMCC',
  email: 'ceo@dmcc.ae',
  mobile: '+971 4 424 9600',
  mobileE164: '97144249600',
  role: 'ceo' as const,
};

/** Product naming — browser title & auth chrome */
export const AGI_EXECUTIVE_OS_NAME = 'DMCC Executive OS';
export const PRODUCT_NAME = 'Personal AI - CEO Agent';
export const PRODUCT_NAME_AR = 'الذكاء الشخصي - وكيل الرئيس التنفيذي';
export const PRODUCT_AGENT_NAME = 'DMCC Executive OS';
export const PRODUCT_AGENT_NAME_AR = 'وكيل الذكاء الشخصي';
/** @deprecated Use PRODUCT_AGENT_NAME in product UI */
export const PRODUCT_SHORT_NAME = PRODUCT_AGENT_NAME;
export const PRODUCT_SHORT_NAME_AR = PRODUCT_AGENT_NAME_AR;
export const PRODUCT_SUBTITLE = 'Executive Chairman & CEO · DMCC';
export const PRODUCT_SUBTITLE_AR = 'الرئيس التنفيذي · مركز دبي للسلع المتعددة';
export const PRODUCT_TAGLINE =
  'Where the world does business — commodities intelligence, member ecosystem signals, and executive visibility across 26,000+ companies and global trade corridors.';
export const PRODUCT_TAGLINE_AR =
  'حيث يمارس العالم أعماله — استخبارات السلع، إشارات منظومة الأعضاء، ورؤية تنفيذية عبر أكثر من 26,000 شركة وممرات التجارة العالمية.';

export const CEO_DAILY_CAPABILITIES = [
  'Ask strategic questions across approved DMCC corporate and trade knowledge sources',
  'Generate board-ready summaries and executive briefings for the free zone',
  'Compare commodities ecosystems — gold, diamonds, tea, coffee, crypto and tech — against global trade benchmarks',
  'Review opportunities, risks and performance signals across member services, licensing and ecosystem growth',
  'Track FDI pipeline, Future of Trade initiatives and Uptown Dubai development milestones',
] as const;

/** @deprecated Use CEO_DAILY_CAPABILITIES */
export const CSO_DAILY_CAPABILITIES = CEO_DAILY_CAPABILITIES;

export { greetingForGstTime as greetingForTime } from '../utils/gstGreeting';

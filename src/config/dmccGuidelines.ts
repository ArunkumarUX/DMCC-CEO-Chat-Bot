/**
 * DMCC — Brand Guidelines & Executive Intelligence Pack
 * @see https://dmcc.ae
 */
import { DISPLAY_FONT_STACK, UI_FONT_STACK } from './fonts';

/** ── Brand identity ─────────────────────────────────────────── */

export const DMCC_BRAND = {
  name: 'DMCC',
  nameFull: 'Dubai Multi Commodities Centre',
  nameAr: 'مركز دبي للسلع المتعددة',
  tagline: "Where the world does business",
  taglineAr: 'حيث يمارس العالم أعماله',
  officialTagline: 'THE WORLD\'S PREMIER BUSINESS DESTINATION',
  siteUrl: 'https://dmcc.ae/',
  founded: 2002,
  headquarters: 'Almas Tower, Jumeirah Lake Towers, Dubai, UAE',

  colors: {
    /** DMCC official wordmark colour (uploaded logo RGB) */
    sapphire: '#070047',
    sapphireRgb: '7, 0, 71',
    /** Dark marketing panels (Future of Trade hero) — not the logo sapphire */
    panel: '#050533',
    panelMid: '#0A1640',
    panelDeep: '#03051C',
    /** Digital UI — logo navy + pink CTA (dmcc.ae) */
    navy: '#070047',
    ink: '#0B1F3A',
    body: '#3D4F63',
    black: '#000000',
    white: '#FFFFFF',
    canvas: '#EEF3F6',
    infoBg: '#EEF3F6',
    line: '#D8DEE8',
    slate: '#6B7A8F',
    gold: '#C9A84C',
    pink: '#E21F7B',
    pinkHover: '#C41868',
    accent: '#E21F7B',
    success: '#157347',
    warning: '#B8860B',
    error: '#EB5757',
  },

  typography: {
    primary: UI_FONT_STACK,
    primaryName: 'Montserrat',
    display: DISPLAY_FONT_STACK,
    displayName: 'Gotham A',
    arabic: "'Noto Naskh Arabic', serif",
    trackingLogo: '-0.06em',
    trackingBody: '0.02em',
  },

  logos: {
    /** Exact uploaded DMCC wordmark (PNG) — preferred for UI fidelity */
    sapphireBlueLarge: '/dmcc-logo.png',
    sapphireBlue: '/dmcc-logo.png',
    onDark: '/dmcc-logo-white.png',
    mark: '/dmcc-mark.png',
    lockup: '/dmcc-logo-lockup.png',
    /** Square product mark for chat / agent avatars */
    productMark: '/personal-ai-mark.svg',
  },

  voice: {
    tone: 'Authoritative, globally connected, trade-forward, commercially precise',
    register: 'Board-level English; formal Modern Standard Arabic when bilingual',
    avoid: ['generic chatbot filler', 'unverified member counts', 'non-DMCC competitor framing'],
  },
} as const;

/** ── Executive leadership ───────────────────────────────────── */

export const DMCC_LEADERSHIP = {
  ceo: {
    name: 'Ahmed Bin Sulayem',
    title: 'Executive Chairman and Chief Executive Officer',
    organisation: 'DMCC',
  },
  executiveTeam: [
    { name: 'Feryal Ahmadi', title: 'Chief Operating Officer' },
    { name: 'Gautam Sashittal', title: 'Chief Financial Officer' },
    { name: 'Sanjeev Dutta', title: 'Executive Director — Commodities' },
    { name: 'James Bernard', title: 'Executive Director — Technology' },
    { name: 'Nadine Halabi', title: 'Executive Director — Marketing & Communications' },
    { name: 'Ahmed Bin Sulayem', title: 'Executive Chairman & CEO' },
  ],
} as const;

/** ── Company scale & footprint ──────────────────────────────── */

export const DMCC_FACTS = {
  memberCompanies: '26,000+',
  countries: '180+',
  licensedActivities: '900+',
  towers: 87,
  professionals: '90,000+',
  residentsVisitors: '100,000+',
  fdiShare: '15%',
  setupDays: '~10 working days',
  corporateTax: '0% on qualifying free zone income',
  personalIncomeTax: '0%',
  businessOwnership: '100%',
  destinations: ['Jumeirah Lake Towers (JLT)', 'Uptown Dubai'],
  awards: [
    '9-time winner — Global Free Zone of the Year (fDi)',
    '#1 Financial Times fDi Global Knowledge Zone (two years running)',
  ],
} as const;

/** ── Trade ecosystems (CEO command centre) ─────────────────── */

export const DMCC_ECOSYSTEMS = [
  { id: 'gold', name: 'Gold & Precious Metals', tagline: 'Dubai Precious Metals Conference · DMCC Good Delivery' },
  { id: 'diamonds', name: 'Diamonds', tagline: 'Dubai Diamond Exchange · rough & polished tenders' },
  { id: 'lgd', name: 'Lab-Grown Diamonds', tagline: 'Fastest-growing diamond segment · mainstream commercial force' },
  { id: 'tea', name: 'Tea', tagline: 'DMCC Tea Centre · global origin sourcing' },
  { id: 'coffee', name: 'Coffee', tagline: 'Cupping experiences · green bean to cup' },
  { id: 'cacao', name: 'Cacao', tagline: 'Agri commodities · supply chain intelligence' },
  { id: 'crypto', name: 'Crypto & Digital Assets', tagline: 'BlockDown Dubai · tokenisation · Tether MoU' },
  { id: 'ai', name: 'AI & Technology', tagline: 'DMCC Cyber · 4,000+ tech companies' },
  { id: 'gaming', name: 'Gaming', tagline: 'Play The Future · blockchain in Dubai digital economy' },
  { id: 'energy', name: 'Energy', tagline: 'Energy Trading Week Middle East' },
  { id: 'finserv', name: 'Financial Services', tagline: 'FinX · Wealth Hub · Foundations Framework' },
  { id: 'maritime', name: 'Maritime', tagline: 'Trade corridor connectivity' },
] as const;

/** ── Strategic priorities (2025–2026) ───────────────────────── */

export const DMCC_PRIORITIES = [
  'Future of Trade 2026 — Rebuilding Through Rupture flagship report',
  'DMCC Campus & DMCC Intelligence unified knowledge platform',
  'DMCC Cyber formalising tech ecosystem (4,000+ companies)',
  'Foundations Framework — wealth and structuring solutions',
  'Uptown Dubai mega-development activation',
  'South-South trade growth to 35% (Commodity Trade Index)',
  'Strategic partnerships — Tether, London Diamond Bourse, Naturalim France Miel',
] as const;

/** ── Member success stories (reference brands) ──────────────── */

export const DMCC_MEMBER_BRANDS = [
  'Bvlgari', 'Deliveroo', 'Hikvision', 'Electrolux', 'Baker Tilly', 'Edelman',
  'Brinc', 'AstroLabs', 'Connect Blockchain', 'Rosy Blue', 'SEPCO', 'Orion Systems',
] as const;

/** Deck / presentation footer standard */
export const DMCC_DECK_FOOTER = `DMCC · ${DMCC_BRAND.tagline} · Confidential`;

/** System-prompt block for SlideAI / presentation builder */
export const DMCC_DECK_BRAND_PROMPT = `
DMCC Executive Deck Standard (MANDATORY — always apply):
- Tagline: "${DMCC_BRAND.tagline}" · Brand: DMCC (Dubai Multi Commodities Centre) · CEO: Ahmed Bin Sulayem
- Scale: 26,000+ member companies · 180+ countries · 900+ licensed activities · 87 towers
- Ecosystems: Gold, Diamonds, Lab-grown diamonds, Tea, Coffee, Cacao, Crypto, AI, Gaming, Energy, FinX, Maritime
- Primary palette: Navy ${DMCC_BRAND.colors.navy}, Gold ${DMCC_BRAND.colors.gold}, Body ${DMCC_BRAND.colors.body}, Canvas ${DMCC_BRAND.colors.canvas}
- Typography: Gotham A/B for headers · Montserrat regular for body · Noto Naskh Arabic for Arabic content
- Layout: 16:9 widescreen, white and light grey section surfaces, navy headers, gold accents
- Footer: "${DMCC_DECK_FOOTER}"
- Every slide must be specific to DMCC free zone, commodities trade, member services, JLT, Uptown Dubai, or the user's topic
- Do NOT use generic retail, Apparel Group, or unrelated holding-company content unless the user explicitly requests it
`.trim();

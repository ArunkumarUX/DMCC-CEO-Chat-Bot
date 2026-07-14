/**
 * CEO Intelligence Profile — client-side mirror of server/ceoIntelligenceProfile.mjs
 * Update both files when priorities or delegation change.
 */

export const CEO_INTELLIGENCE_PROFILE = {
  productName: 'DMCC Executive OS',
  ceoName: 'Ahmed Bin Sulayem',
  ceoRole: 'Executive Chairman and Chief Executive Officer',
  organisation: 'DMCC',
  businessScope:
    'World\'s premier commodities free zone — 26,000+ member companies, 900+ licensed activities, trade ecosystems across gold, diamonds, tea, coffee, crypto, AI, and energy.',
  footprint: {
    memberCompanies: 26000,
    countries: 180,
    licensedActivities: 900,
    towers: 87,
  },
  flagshipEcosystems: [
    'Gold & Precious Metals',
    'Diamonds',
    'Lab-Grown Diamonds',
    'Tea & Coffee',
    'Crypto & Digital Assets',
    'AI & Technology',
    'Energy',
    'FinX',
  ],
  strategicPriorities: [
    'Future of Trade 2026 — Rebuilding Through Rupture',
    'DMCC Campus & DMCC Intelligence platform',
    'Uptown Dubai mega-development activation',
    'DMCC Cyber — formalising 4,000+ tech companies',
    'Foundations Framework — wealth and structuring',
    'South-South trade growth to 35%',
    'Strategic partnerships — Tether, London Diamond Bourse',
  ],
} as const;

export const EXECUTIVE_COMMANDS = [
  'Morning Brief',
  'Board Mode',
  'Crisis Mode',
  'Deal Room',
  'Growth Mode',
  'Red Team',
  'Member Mode',
  'Performance Mode',
  'Weekly Review',
  'Ecosystem Review',
  'What Am I Missing?',
  'Simplify',
  'Go Deeper',
  'Challenge Me',
  'Act Now',
] as const;

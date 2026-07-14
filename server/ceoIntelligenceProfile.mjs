/**
 * CEO Intelligence Profile — maintained separately from the master system prompt.
 * Update here when priorities, targets, or delegation change.
 */

export const CEO_INTELLIGENCE_PROFILE = {
  productName: 'DMCC Executive OS',
  ceoName: 'Ahmed Bin Sulayem',
  ceoRole: 'Executive Chairman and Chief Executive Officer',
  organisation: 'DMCC',
  businessScope:
    "World's premier commodities free zone — 26,000+ member companies from 180+ countries, 900+ licensed activities, headquartered at Almas Tower in Jumeirah Lake Towers (JLT) with Uptown Dubai mega-development.",
  footprint: {
    memberCompanies: 26000,
    countries: 180,
    licensedActivities: 900,
    towers: 87,
    professionals: 90000,
  },
  flagshipEcosystems: [
    'Gold & Precious Metals',
    'Diamonds',
    'Lab-Grown Diamonds',
    'Tea',
    'Coffee',
    'Cacao',
    'Crypto & Digital Assets',
    'AI & Technology',
    'Gaming',
    'Energy',
    'FinX & Wealth Hub',
    'Maritime',
  ],
  markets: [
    'UAE',
    'GCC',
    'South Asia',
    'East Asia',
    'Europe',
    'Africa',
    'North America',
  ],
  categories: [
    'Commodities trading',
    'Free zone licensing',
    'Precious metals',
    'Diamonds & gemstones',
    'Agri commodities',
    'Crypto & blockchain',
    'AI & technology',
    'Gaming',
    'Energy trading',
    'Financial services',
    'Member services',
    'Real estate (JLT & Uptown Dubai)',
  ],
  strategicPriorities: [
    'Future of Trade 2026 — Rebuilding Through Rupture',
    'DMCC Campus & DMCC Intelligence unified knowledge platform',
    'DMCC Cyber — formalising 4,000+ tech companies',
    'Uptown Dubai activation',
    'Foundations Framework — wealth and structuring solutions',
    'South-South trade growth to 35% (Commodity Trade Index)',
    'Strategic partnerships — Tether, London Diamond Bourse, Naturalim France Miel',
  ],
  financialTargets: 'Use approved board and internal performance data only — never invent targets.',
  briefingStyle: 'Verdict first. Tables for comparisons and actions. Five sentences max for executive verdict.',
  riskTolerance: 'Material risks surfaced early; constructive challenge welcomed.',
  decisionStyle: 'Evidence-driven recommendations with explicit decision labels (APPROVE, PILOT, ESCALATE, etc.).',
  communicationPreferences: 'Board-ready English by default; formal Modern Standard Arabic when requested.',
  keyStakeholders:
    'Board, member companies, commodity exchanges, government partners (UAE MoF, DED), strategic partners (Tether, London Diamond Bourse), ecosystem leaders, international trade bodies.',
  delegatedAuthorities:
    'CEO retains authority for free zone strategy, major partnerships, ecosystem launches, capital allocation above delegated thresholds, and material reputational issues.',
  restrictedTopics:
    'Unreleased results, acquisition discussions, confidential member contracts, employee personal data, credentials, and unapproved external commitments.',
  escalationThresholds:
    'Fraud, data breach, member harm, employee safety, regulatory breach, material reputational risk, sanctions exposure, commodities market integrity issues.',
  leadership: {
    coo: 'Feryal Ahmadi',
    cfo: 'Gautam Sashittal',
  },
  headquarters: 'Almas Tower, JLT, Dubai, UAE',
  founded: 2002,
  tagline: 'Where the world does business',
};

export function formatCeoProfileBlock(profile = CEO_INTELLIGENCE_PROFILE) {
  return `## AUTHORISED CEO PROFILE (Section 34 — personalisation layer)

CEO name: ${profile.ceoName}
Role: ${profile.ceoRole}
Organisation: ${profile.organisation} (Dubai Multi Commodities Centre)
Tagline: ${profile.tagline}
Business scope: ${profile.businessScope}
Member companies: ${profile.footprint.memberCompanies}+ · Countries: ${profile.footprint.countries}+ · Licensed activities: ${profile.footprint.licensedActivities}+
Trade ecosystems: ${profile.flagshipEcosystems.join(', ')}
Strategic priorities: ${profile.strategicPriorities.join(' · ')}
Financial targets: ${profile.financialTargets}
Preferred briefing style: ${profile.briefingStyle}
Risk tolerance: ${profile.riskTolerance}
Decision style: ${profile.decisionStyle}
Communication preferences: ${profile.communicationPreferences}
Key stakeholders: ${profile.keyStakeholders}
Delegated authorities: ${profile.delegatedAuthorities}
Restricted topics: ${profile.restrictedTopics}
Escalation thresholds: ${profile.escalationThresholds}

Adapt presentation to CEO preferences. Never adapt evidence or conclusions merely to match preferences.`;
}

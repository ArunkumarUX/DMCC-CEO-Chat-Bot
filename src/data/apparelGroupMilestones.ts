export type MilestoneVisual = 'founding' | 'growth' | 'global' | 'digital' | 'awards' | 'future';

export type DmccMilestone = {
  year: number;
  headline: string;
  items: string[];
  visual: MilestoneVisual;
  stat?: string;
};

/** @deprecated Use DmccMilestone */
export type ApparelMilestone = DmccMilestone;

export const MILESTONE_START_YEAR = 2002;
export const MILESTONE_END_YEAR = 2026;

export const DMCC_MILESTONES: DmccMilestone[] = [
  {
    year: 2002,
    headline: 'DMCC established — Where the world does business',
    items: [
      'Founded by Dubai Government as the Dubai Multi Commodities Centre',
      'Created to drive commodity trade through Dubai and establish a world-class free zone',
      'Laid the foundation for what would become the region\'s leading trade hub',
    ],
    visual: 'founding',
    stat: 'Year one',
  },
  {
    year: 2005,
    headline: 'Gold & Diamond Centre launches',
    items: [
      'Opened the DMCC Gold & Diamond Centre in Jumeirah Lakes Towers',
      'Attracted global bullion and diamond trading houses to Dubai',
      'Built the infrastructure for regulated precious metals trade',
    ],
    visual: 'growth',
    stat: 'Precious metals',
  },
  {
    year: 2012,
    headline: 'Global recognition as a commodity hub',
    items: [
      'Named Global Free Zone of the Year by fDi Magazine',
      'Expanded member base across gold, diamonds, energy and agri-commodities',
      'Strengthened trade corridors connecting Asia, Africa and Europe through Dubai',
    ],
    visual: 'global',
    stat: 'fDi Award',
  },
  {
    year: 2018,
    headline: 'Tea, Coffee and digital ecosystems take shape',
    items: [
      'DMCC Tea Centre and Coffee Centre deepen origin-to-market trade links',
      'Crypto Centre established — early mover in regulated digital asset trade',
      'Member ecosystem surpasses 15,000 companies across 170+ countries',
    ],
    visual: 'digital',
    stat: 'Ecosystems',
  },
  {
    year: 2023,
    headline: 'AI, Gaming and next-generation trade infrastructure',
    items: [
      'AI Centre launched to support member innovation and sandbox pilots',
      'Gaming Centre opens — connecting creators, publishers and investors',
      'Renewed Global Free Zone of the Year recognition',
      'Member portal and digital services scaled for 20,000+ companies',
    ],
    visual: 'awards',
    stat: 'Innovation',
  },
  {
    year: 2025,
    headline: 'A landmark year of ecosystem growth and global trade leadership',
    items: [
      '26,000+ member companies across 180+ countries',
      'Crypto Centre VASP licensing framework scales member onboarding',
      'AI & Gaming centres attract global ecosystem partnerships',
      'Ahmed Bin Sulayem leads authority through record member growth',
    ],
    visual: 'awards',
    stat: '26,000+',
  },
  {
    year: 2026,
    headline: '26,000+ companies · 180+ countries · Where the world does business',
    items: [
      'Leading global hub for gold, diamonds, tea, coffee, crypto, AI and gaming',
      'Trade corridors connecting every major commodity market through Dubai',
      'Member portal, compliance and ecosystem services at scale',
      'Where the world does business — the journey continues under Ahmed Bin Sulayem',
    ],
    visual: 'future',
    stat: '180+ countries',
  },
];

/** @deprecated Use DMCC_MILESTONES */
export const APPAREL_MILESTONES = DMCC_MILESTONES;

export const MILESTONE_YEARS = DMCC_MILESTONES.map((m) => m.year);

export const ALL_MILESTONE_YEARS = Array.from(
  { length: MILESTONE_END_YEAR - MILESTONE_START_YEAR + 1 },
  (_, i) => MILESTONE_START_YEAR + i,
);

export function getMilestoneForYear(year: number): DmccMilestone {
  return (
    DMCC_MILESTONES.find((m) => m.year === year) ??
    DMCC_MILESTONES[DMCC_MILESTONES.length - 1]
  );
}

export function getNearestMilestoneYear(year: number): number {
  const known = MILESTONE_YEARS;
  if (known.includes(year)) return year;
  let nearest = known[0];
  for (const y of known) {
    if (Math.abs(y - year) < Math.abs(nearest - year)) nearest = y;
  }
  return nearest;
}

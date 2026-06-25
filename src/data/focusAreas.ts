import type { AgentType, DocumentFile, FocusAreaId, Workflow } from '../types';

export type { FocusAreaId };

export interface FocusArea {
  id: FocusAreaId;
  title: string;
  shortTitle: string;
  description: string;
  capabilities: string[];
  icon: 'globe' | 'calendar' | 'scale' | 'mail' | 'users' | 'library';
  agents: AgentType[];
  prompts: string[];
  workflowIds: string[];
}

/** Core focus areas — A.R.M. Holding CEO personal AI */
export const CORE_FOCUS_AREAS: FocusArea[] = [
  {
    id: 'strategic-intelligence',
    title: 'Strategic Intelligence & Briefings',
    shortTitle: 'Intelligence',
    description:
      'Daily AI-generated briefings on Dubai real estate, hospitality, banking, healthtech and fintech markets relevant to A.R.M. Holding\'s portfolio (DREC, HUNA, HIVE), plus competitor and sector signals aligned to the Dubai Economic Agenda (D33).',
    capabilities: [
      'Daily briefings on markets, regulation, fintech and portfolio news',
      'Sector intelligence across real estate, hospitality, banking and fintech',
      'Real-time alerts on Dubai and UAE developments affecting the group',
    ],
    icon: 'globe',
    agents: ['strategy', 'policy'],
    workflowIds: [],
    prompts: [
      'Give me my overnight intelligence briefing — what are the most important developments I need to know today?',
      'What are the top investment opportunities A.R.M. Holding should prioritise from current Dubai capital flows?',
      'How is HUNA\'s design-led positioning compared to other Dubai developers this quarter?',
      'What does the latest D33 agenda mean for our real estate and hospitality portfolio?',
    ],
  },
  {
    id: 'meetings',
    title: 'Meeting & Agenda Preparation',
    shortTitle: 'Meetings',
    description:
      'Auto-generated pre-meeting briefs on attendees, organisations, and context. Post-meeting summaries, action extraction, and follow-up drafting. Board pack preparation and executive summaries from complex documents.',
    capabilities: [
      'Auto-generated pre-meeting briefs on attendees, organisations, and context',
      'Post-meeting summaries, action item extraction, and follow-up drafting',
      'Board pack preparation and executive summary generation',
    ],
    icon: 'calendar',
    agents: ['cos', 'relationship', 'comms'],
    workflowIds: ['w1', 'w2'],
    prompts: [
      'Brief me on my 3pm meeting tomorrow — attendees and context',
      'Extract action items from my last DREC board meeting notes',
      'Executive summary of the Q2 board pack for the holding group',
      'Draft follow-up email after today\'s HUNA development review',
    ],
  },
  {
    id: 'regulatory',
    title: 'Regulatory & Policy Intelligence',
    shortTitle: 'Regulatory',
    description:
      'Monitoring of UAE regulatory changes relevant to real estate (RERA/DLD), financial services (DFSA, CBUAE), hospitality and healthtech. AI-assisted drafting of policy briefs and consultation responses.',
    capabilities: [
      'Monitoring UAE regulation across real estate, banking and fintech',
      'AI-assisted drafting of policy documents and consultation responses',
      'Cross-reference group policies against international best practice',
    ],
    icon: 'scale',
    agents: ['policy', 'strategy'],
    workflowIds: ['w4'],
    prompts: [
      'Assess impact of the latest RERA rental index update on DREC\'s portfolio',
      'Compare UAE fintech licensing against regional benchmarks',
      'Draft an executive summary for a DFSA consultation response',
      'Which regulatory changes affect HIVE\'s coliving operations this quarter?',
    ],
  },
  {
    id: 'correspondence',
    title: 'Correspondence & Communications',
    shortTitle: 'Communications',
    description:
      'AI-assisted drafting of executive communications, speeches, and public statements — including cultural initiatives such as We Emerge Stronger. Prioritisation and summarisation of inbound correspondence in Arabic and English.',
    capabilities: [
      'AI-assisted drafting of speeches, statements, and executive letters',
      'Prioritisation and summarisation of inbound correspondence',
      'Arabic and English communications with formal register',
    ],
    icon: 'mail',
    agents: ['comms', 'cos'],
    workflowIds: ['w5'],
    prompts: [
      'Draft a note on A.R.M. Holding\'s Q2 portfolio performance in Arabic and English',
      'Draft talking points for the We Emerge Stronger sculpture commission announcement',
      'Summarise my priority inbound correspondence from the last 48 hours',
      'Review this board note for tone and cultural initiative messaging',
    ],
  },
  {
    id: 'stakeholders',
    title: 'Stakeholder & Relationship Management',
    shortTitle: 'Stakeholders',
    description:
      'Intelligent CRM tracking relationships, interactions, commitments, and follow-ups. Briefing notes on key stakeholders before engagements. Tracking A.R.M. Holding strategic partnerships across real estate, hospitality and cultural initiatives.',
    capabilities: [
      'Track relationships, last interactions, commitments, and follow-ups',
      'Briefing notes on key stakeholders before engagements',
      'Track strategic partnerships and global commitments across the portfolio',
    ],
    icon: 'users',
    agents: ['relationship', 'cos'],
    workflowIds: ['w3'],
    prompts: [
      'What did I commit to in my last DREC leadership meeting?',
      'Stakeholder profile for Art Dubai partnership — history and sensitivities',
      'Which HUNA development partnerships have follow-ups due this month?',
      'Open commitments with banking JV partners — status check',
    ],
  },
  {
    id: 'knowledge',
    title: 'Knowledge Management',
    shortTitle: 'Knowledge',
    description:
      'Instant access to A.R.M. Holding institutional knowledge — group strategy, portfolio reviews, board decisions, and precedents. AI-powered search across internal documents and correspondence.',
    capabilities: [
      'Instant access to reports, frameworks, decisions, and precedents',
      'AI-powered search across documents, contracts, and correspondence',
      'Preserve institutional knowledge beyond individual tenures',
    ],
    icon: 'library',
    agents: ['policy', 'strategy', 'cos'],
    workflowIds: [],
    prompts: [
      'What strategic decisions did A.R.M. Holding make in 2025 and how do they track against D33 priorities?',
      'Find precedents on HUNA design partnerships in our knowledge base',
      'Summarise the DREC portfolio review for a new board member',
      'Search internal documents for We Emerge Stronger commission milestones',
    ],
  },
];

export const FOCUS_AREA_MAP = Object.fromEntries(
  CORE_FOCUS_AREAS.map((a) => [a.id, a]),
) as Record<FocusAreaId, FocusArea>;

export const CONVERSATION_CATEGORIES = [
  'All',
  ...CORE_FOCUS_AREAS.map((a) => a.shortTitle),
];

export function getFocusArea(id: FocusAreaId): FocusArea {
  return FOCUS_AREA_MAP[id];
}

export function getFocusAreaByExactPrompt(prompt: string): FocusArea | undefined {
  const normalized = prompt.trim().toLowerCase();
  return CORE_FOCUS_AREAS.find((area) =>
    area.prompts.some((p) => p.trim().toLowerCase() === normalized),
  );
}

export function resolveFocusAreaForQuery(query: string): FocusAreaId | null {
  const exact = getFocusAreaByExactPrompt(query);
  if (exact) return exact.id;
  return matchFocusArea(query);
}

export function matchFocusArea(query: string): FocusAreaId | null {
  const q = query.toLowerCase();
  if (
    (q.includes('daily') && (q.includes('brief') || q.includes('briefing'))) ||
    q.includes('geopolitical') ||
    q.includes('competitor') ||
    q.includes('d33') ||
    q.includes('real estate') ||
    q.includes('hospitality') ||
    q.includes('portfolio')
  ) {
    return 'strategic-intelligence';
  }
  if (
    q.includes('meeting') ||
    q.includes('board pack') ||
    q.includes('action item') ||
    (q.includes('follow-up') && q.includes('email')) ||
    q.includes('agenda') ||
    q.includes('pre-meeting')
  ) {
    return 'meetings';
  }
  if (
    (q.includes('regulat') || q.includes('rera') || q.includes('dfsa') || q.includes('consultation')) &&
    !q.includes('inbound')
  ) {
    if (q.includes('policy') || q.includes('framework') || q.includes('best practice')) {
      return 'regulatory';
    }
  }
  if (
    q.includes('correspondence') ||
    q.includes('inbound') ||
    q.includes('ministerial') ||
    q.includes('talking points') ||
    q.includes('speech') ||
    (q.includes('arabic') && q.includes('draft')) ||
    q.includes('we emerge stronger')
  ) {
    return 'correspondence';
  }
  if (
    q.includes('stakeholder') ||
    q.includes('drec') ||
    q.includes('huna') ||
    q.includes('hive') ||
    q.includes('commitment') ||
    q.includes('partnership') ||
    q.includes('crm') ||
    q.includes('art dubai')
  ) {
    return 'stakeholders';
  }
  if (
    q.includes('knowledge') ||
    q.includes('precedent') ||
    (q.includes('search') && q.includes('document')) ||
    q.includes('institutional')
  ) {
    return 'knowledge';
  }
  return null;
}

export const ALL_FOCUS_PROMPTS = CORE_FOCUS_AREAS.flatMap((a) => a.prompts);

export function getWorkflowsForFocusArea(focusId: FocusAreaId, workflows: Workflow[]): Workflow[] {
  return workflows.filter(
    (w) => w.focusAreaId === focusId || FOCUS_AREA_MAP[focusId].workflowIds.includes(w.id),
  );
}

export function getDocumentsForFocusArea(
  focusId: FocusAreaId,
  documents: DocumentFile[],
): DocumentFile[] {
  return documents.filter((d) => d.focusAreaIds?.includes(focusId));
}

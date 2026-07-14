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

/** Core focus areas — DMCC CEO personal AI */
export const CORE_FOCUS_AREAS: FocusArea[] = [
  {
    id: 'strategic-intelligence',
    title: 'Strategic Intelligence & Briefings',
    shortTitle: 'Intelligence',
    description:
      'Daily AI-generated briefings on global commodity markets, free zone competitiveness, and ecosystem signals relevant to DMCC\'s 26,000+ member companies across gold, diamonds, tea, coffee, crypto, AI and gaming.',
    capabilities: [
      'Daily briefings on commodity flows, trade corridors and member ecosystem news',
      'Sector intelligence across precious metals, agri-commodities, digital assets and emerging tech',
      'Real-time alerts on GCC and global developments affecting DMCC and its members',
    ],
    icon: 'globe',
    agents: ['strategy', 'policy'],
    workflowIds: [],
    prompts: [
      'Give me my overnight intelligence briefing — what are the most important developments I need to know today?',
      'What are the top trade and free zone opportunities DMCC should prioritise from current GCC commodity trends?',
      'How does DMCC\'s member ecosystem compare to DIFC and ADGM on digital assets and AI this quarter?',
      'What does the latest gold and diamond market momentum mean for our trading members?',
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
      'Extract action items from my last DMCC leadership meeting notes',
      'Executive summary of the Q2 board pack for the authority',
      'Draft follow-up email after today\'s gold centre member roundtable',
    ],
  },
  {
    id: 'regulatory',
    title: 'Regulatory & Policy Intelligence',
    shortTitle: 'Regulatory',
    description:
      'Monitoring of UAE regulatory changes relevant to free zone licensing, AML/CFT, commodity trade rules, digital asset frameworks and member compliance. AI-assisted drafting of policy briefs and consultation responses.',
    capabilities: [
      'Monitoring UAE regulation across free zones, AML/CFT and commodity trade',
      'AI-assisted drafting of policy documents and consultation responses',
      'Cross-reference DMCC policies against international free zone best practice',
    ],
    icon: 'scale',
    agents: ['policy', 'strategy'],
    workflowIds: ['w4'],
    prompts: [
      'Assess impact of the latest UAE AML/CFT updates on our member onboarding',
      'Compare GCC free zone licensing frameworks against regional benchmarks',
      'Draft an executive summary for a digital asset consultation response',
      'Which regulatory changes affect our crypto centre members this quarter?',
    ],
  },
  {
    id: 'correspondence',
    title: 'Correspondence & Communications',
    shortTitle: 'Communications',
    description:
      'AI-assisted drafting of executive communications, speeches, and public statements — including trade forum keynotes, member announcements and ecosystem launches. Prioritisation and summarisation of inbound correspondence in Arabic and English.',
    capabilities: [
      'AI-assisted drafting of speeches, statements, and executive letters',
      'Prioritisation and summarisation of inbound correspondence',
      'Arabic and English communications with formal register',
    ],
    icon: 'mail',
    agents: ['comms', 'cos'],
    workflowIds: ['w5'],
    prompts: [
      'Draft a note on DMCC\'s Q2 member ecosystem performance in Arabic and English',
      'Draft talking points for the Global Trade Forum keynote — "Where the world does business"',
      'Summarise my priority inbound correspondence from the last 48 hours',
      'Review this board note for tone and crypto centre launch messaging',
    ],
  },
  {
    id: 'stakeholders',
    title: 'Stakeholder & Relationship Management',
    shortTitle: 'Stakeholders',
    description:
      'Intelligent CRM tracking relationships, interactions, commitments, and follow-ups. Briefing notes on key stakeholders before engagements. Tracking DMCC strategic partnerships with government bodies, commodity exchanges and global trade corridors.',
    capabilities: [
      'Track relationships, last interactions, commitments, and follow-ups',
      'Briefing notes on key stakeholders before engagements',
      'Track strategic partnerships and global commitments across the ecosystem',
    ],
    icon: 'users',
    agents: ['relationship', 'cos'],
    workflowIds: ['w3'],
    prompts: [
      'What did I commit to in my last leadership team meeting?',
      'Stakeholder profile for a major gold trading house — history and sensitivities',
      'Which crypto centre member partnerships have follow-ups due this month?',
      'Open commitments with government trade bodies — status check',
    ],
  },
  {
    id: 'knowledge',
    title: 'Knowledge Management',
    shortTitle: 'Knowledge',
    description:
      'Instant access to DMCC institutional knowledge — authority strategy, member performance reviews, board decisions, and precedents. AI-powered search across internal documents and correspondence.',
    capabilities: [
      'Instant access to reports, frameworks, decisions, and precedents',
      'AI-powered search across documents, contracts, and correspondence',
      'Preserve institutional knowledge beyond individual tenures',
    ],
    icon: 'library',
    agents: ['policy', 'strategy', 'cos'],
    workflowIds: [],
    prompts: [
      'What strategic decisions did DMCC make in 2025 and how do they track against ecosystem growth goals?',
      'Find precedents on diamond exchange member onboarding in our knowledge base',
      'Summarise the tea and coffee centre review for a new board member',
      'Search internal documents for AI and gaming centre milestones',
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
    q.includes('competitor') ||
    q.includes('commodit') ||
    q.includes('gold') ||
    q.includes('diamond') ||
    q.includes('free zone') ||
    q.includes('member ecosystem') ||
    q.includes('trade corridor')
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
    (q.includes('regulat') || q.includes('licensing') || q.includes('consultation') || q.includes('aml')) &&
    !q.includes('inbound')
  ) {
    if (q.includes('policy') || q.includes('framework') || q.includes('best practice')) {
      return 'regulatory';
    }
  }
  if (
    q.includes('correspondence') ||
    q.includes('inbound') ||
    q.includes('talking points') ||
    q.includes('speech') ||
    (q.includes('arabic') && q.includes('draft')) ||
    q.includes('trade forum') ||
    q.includes('press release')
  ) {
    return 'correspondence';
  }
  if (
    q.includes('stakeholder') ||
    q.includes('dmcc') ||
    q.includes('member portal') ||
    q.includes('crypto centre') ||
    q.includes('commitment') ||
    q.includes('partnership') ||
    q.includes('crm') ||
    q.includes('trading partner') ||
    q.includes('gold centre')
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

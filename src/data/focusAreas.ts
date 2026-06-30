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

/** Core focus areas — Apparel Group CEO personal AI */
export const CORE_FOCUS_AREAS: FocusArea[] = [
  {
    id: 'strategic-intelligence',
    title: 'Strategic Intelligence & Briefings',
    shortTitle: 'Intelligence',
    description:
      'Daily AI-generated briefings on GCC retail, fashion, footwear, F&B and e-commerce markets relevant to Apparel Group\'s portfolio (R&B, 6thStreet, Club Apparel), plus competitor and sector signals across 2,500+ stores and 85+ brands.',
    capabilities: [
      'Daily briefings on retail markets, consumer trends and portfolio news',
      'Sector intelligence across fashion, footwear, F&B and omnichannel',
      'Real-time alerts on GCC and UAE developments affecting the group',
    ],
    icon: 'globe',
    agents: ['strategy', 'policy'],
    workflowIds: [],
    prompts: [
      'Give me my overnight intelligence briefing — what are the most important developments I need to know today?',
      'What are the top retail expansion opportunities Apparel Group should prioritise from current GCC consumer trends?',
      'How is 6thStreet\'s omnichannel positioning compared to regional e-commerce players this quarter?',
      'What does the latest Dubai retail and tourism momentum mean for our store network?',
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
      'Extract action items from my last Apparel Group leadership meeting notes',
      'Executive summary of the Q2 board pack for the group',
      'Draft follow-up email after today\'s R&B store expansion review',
    ],
  },
  {
    id: 'regulatory',
    title: 'Regulatory & Policy Intelligence',
    shortTitle: 'Regulatory',
    description:
      'Monitoring of UAE regulatory changes relevant to retail licensing (DED), VAT, labour law, consumer protection and sustainability. AI-assisted drafting of policy briefs and consultation responses.',
    capabilities: [
      'Monitoring UAE regulation across retail, labour and consumer protection',
      'AI-assisted drafting of policy documents and consultation responses',
      'Cross-reference group policies against international retail best practice',
    ],
    icon: 'scale',
    agents: ['policy', 'strategy'],
    workflowIds: ['w4'],
    prompts: [
      'Assess impact of the latest UAE VAT changes on our F&B and retail operations',
      'Compare GCC retail licensing frameworks against regional benchmarks',
      'Draft an executive summary for a consumer protection consultation response',
      'Which regulatory changes affect our Saudi Arabia expansion this quarter?',
    ],
  },
  {
    id: 'correspondence',
    title: 'Correspondence & Communications',
    shortTitle: 'Communications',
    description:
      'AI-assisted drafting of executive communications, speeches, and public statements — including brand launches, awards and sustainability messaging. Prioritisation and summarisation of inbound correspondence in Arabic and English.',
    capabilities: [
      'AI-assisted drafting of speeches, statements, and executive letters',
      'Prioritisation and summarisation of inbound correspondence',
      'Arabic and English communications with formal register',
    ],
    icon: 'mail',
    agents: ['comms', 'cos'],
    workflowIds: ['w5'],
    prompts: [
      'Draft a note on Apparel Group\'s Q2 portfolio performance in Arabic and English',
      'Draft talking points for the Images RetailME Awards acceptance speech',
      'Summarise my priority inbound correspondence from the last 48 hours',
      'Review this board note for tone and brand launch messaging',
    ],
  },
  {
    id: 'stakeholders',
    title: 'Stakeholder & Relationship Management',
    shortTitle: 'Stakeholders',
    description:
      'Intelligent CRM tracking relationships, interactions, commitments, and follow-ups. Briefing notes on key stakeholders before engagements. Tracking Apparel Group strategic partnerships with brand licensors, mall operators and franchise partners.',
    capabilities: [
      'Track relationships, last interactions, commitments, and follow-ups',
      'Briefing notes on key stakeholders before engagements',
      'Track strategic partnerships and global commitments across the portfolio',
    ],
    icon: 'users',
    agents: ['relationship', 'cos'],
    workflowIds: ['w3'],
    prompts: [
      'What did I commit to in my last leadership team meeting?',
      'Stakeholder profile for a major mall operator partnership — history and sensitivities',
      'Which 6thStreet brand partnerships have follow-ups due this month?',
      'Open commitments with international brand licensors — status check',
    ],
  },
  {
    id: 'knowledge',
    title: 'Knowledge Management',
    shortTitle: 'Knowledge',
    description:
      'Instant access to Apparel Group institutional knowledge — group strategy, store performance reviews, board decisions, and precedents. AI-powered search across internal documents and correspondence.',
    capabilities: [
      'Instant access to reports, frameworks, decisions, and precedents',
      'AI-powered search across documents, contracts, and correspondence',
      'Preserve institutional knowledge beyond individual tenures',
    ],
    icon: 'library',
    agents: ['policy', 'strategy', 'cos'],
    workflowIds: [],
    prompts: [
      'What strategic decisions did Apparel Group make in 2025 and how do they track against expansion goals?',
      'Find precedents on R&B franchise partnerships in our knowledge base',
      'Summarise the Club Apparel loyalty programme review for a new board member',
      'Search internal documents for Saudi Arabia expansion milestones',
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
    q.includes('retail') ||
    q.includes('fashion') ||
    q.includes('footwear') ||
    q.includes('omnichannel') ||
    q.includes('portfolio') ||
    q.includes('store network')
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
    (q.includes('regulat') || q.includes('vat') || q.includes('licensing') || q.includes('consultation')) &&
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
    q.includes('brand launch') ||
    q.includes('press release')
  ) {
    return 'correspondence';
  }
  if (
    q.includes('stakeholder') ||
    q.includes('r&b') ||
    q.includes('6thstreet') ||
    q.includes('club apparel') ||
    q.includes('commitment') ||
    q.includes('partnership') ||
    q.includes('crm') ||
    q.includes('franchise') ||
    q.includes('mall operator')
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

import type { AgentType } from '../types';
import { resolveFocusAreaForQuery } from './focusAreas';
import { FOCUS_AREA_MAP } from './focusAreas';
import { detectChatIntent } from '../utils/chatIntent';

export interface AgentDefinition {
  id: AgentType;
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  color: string;
  colorMuted: string;
  tools: string[];
  focusAreas: string[];
}

/** Five specialist agents (spec §04) */
export const EXECUTIVE_AGENTS: AgentDefinition[] = [
  {
    id: 'cos',
    name: 'Chief of Staff AI',
    shortName: 'CoS',
    role: 'Orchestrator',
    tagline: 'Routes tasks, synthesises outputs, tracks commitments',
    color: '#001C7D',
    colorMuted: '#CCE7FF',
    tools: ['Calendar', 'Action register', 'Briefings'],
    focusAreas: ['Meetings', 'Stakeholders', 'Knowledge'],
  },
  {
    id: 'strategy',
    name: 'Strategy AI',
    shortName: 'Strategy',
    role: 'Market intelligence',
    tagline: 'D33, competitors, geopolitical and sector signals',
    color: '#006DCC',
    colorMuted: '#EBF7FB',
    tools: ['Bloomberg feed', 'D33 scorecard', 'Competitor radar'],
    focusAreas: ['Intelligence', 'Knowledge'],
  },
  {
    id: 'policy',
    name: 'Policy AI',
    shortName: 'Policy',
    role: 'Regulatory',
    tagline: 'FSRA frameworks, MAS/FCA benchmarks, consultation drafts',
    color: '#0088FF',
    colorMuted: '#CCE7FF',
    tools: ['Regulatory monitor', 'Policy KB', 'Impact memos'],
    focusAreas: ['Regulatory', 'Knowledge'],
  },
  {
    id: 'relationship',
    name: 'Relationship AI',
    shortName: 'CRM',
    role: 'Stakeholders',
    tagline: 'CRM, partnerships, pre-meeting stakeholder profiles',
    color: '#157347',
    colorMuted: '#E8F5EE',
    tools: ['Executive CRM', 'Commitment tracker', 'Partnership map'],
    focusAreas: ['Stakeholders', 'Meetings'],
  },
  {
    id: 'comms',
    name: 'Communications AI',
    shortName: 'Comms',
    role: 'Executive voice',
    tagline: 'Arabic/English speeches, ministerial notes, talking points',
    color: '#5B4FCF',
    colorMuted: '#EEECFA',
    tools: ['Voice learning', 'Bilingual drafts', 'Tone review'],
    focusAreas: ['Communications', 'Meetings'],
  },
];

export const AGENT_MAP = Object.fromEntries(EXECUTIVE_AGENTS.map((a) => [a.id, a])) as Record<
  AgentType,
  AgentDefinition
>;

export const AGENT_LABELS: Record<AgentType, string> = {
  policy: 'Policy AI',
  strategy: 'Strategy AI',
  cos: 'Chief of Staff AI',
  relationship: 'Relationship AI',
  comms: 'Communications AI',
};

export function routeAgentsForQuery(
  query: string,
  manualSelection: AgentType[],
  autoRoute: boolean,
): AgentType[] {
  const q = query.toLowerCase();
  const intent = detectChatIntent(query);
  if (intent === 'greeting' || intent === 'thanks') return ['cos'];

  const mentions: AgentType[] = [];
  if (q.includes('@policy') || q.includes('policy ai')) mentions.push('policy');
  if (q.includes('@strategy') || q.includes('strategy ai')) mentions.push('strategy');
  if (q.includes('@cos') || q.includes('chief of staff')) mentions.push('cos');
  if (q.includes('@crm') || q.includes('relationship ai')) mentions.push('relationship');
  if (q.includes('@comms') || q.includes('communications ai')) mentions.push('comms');
  if (mentions.length > 0) return mentions;

  if (manualSelection.length > 0 && !autoRoute) return manualSelection;

  const focusId = resolveFocusAreaForQuery(query);
  if (focusId) {
    const fromFocus = FOCUS_AREA_MAP[focusId].agents;
    return fromFocus.includes('cos') ? fromFocus : (['cos', ...fromFocus] as AgentType[]);
  }

  if (manualSelection.length > 0) return manualSelection;
  return ['cos', 'strategy', 'policy'];
}

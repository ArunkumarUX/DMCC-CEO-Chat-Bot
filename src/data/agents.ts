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

/** Five specialist agents for the CEO office */
export const EXECUTIVE_AGENTS: AgentDefinition[] = [
  {
    id: 'cos',
    name: 'Chief of Staff AI',
    shortName: 'CoS',
    role: 'Orchestrator',
    tagline: 'Routes tasks, synthesises outputs, tracks commitments',
    color: '#1A1A1A',
    colorMuted: '#F0EDE6',
    tools: ['Calendar', 'Action register', 'Briefings'],
    focusAreas: ['Meetings', 'Stakeholders', 'Knowledge'],
  },
  {
    id: 'strategy',
    name: 'Strategy AI',
    shortName: 'Strategy',
    role: 'Commodities intelligence',
    tagline: 'Global commodity flows, free zone competitiveness, member ecosystem and trade corridor signals',
    color: '#3D3D3D',
    colorMuted: '#FAF8F4',
    tools: ['Market feed', 'Commodity scorecard', 'Ecosystem radar'],
    focusAreas: ['Intelligence', 'Knowledge'],
  },
  {
    id: 'policy',
    name: 'Policy AI',
    shortName: 'Policy',
    role: 'Regulatory',
    tagline: 'UAE free zone licensing, AML/CFT, commodity trade rules and member compliance frameworks',
    color: '#B8924A',
    colorMuted: '#F0EDE6',
    tools: ['Regulatory monitor', 'Policy KB', 'Impact memos'],
    focusAreas: ['Regulatory', 'Knowledge'],
  },
  {
    id: 'relationship',
    name: 'Relationship AI',
    shortName: 'CRM',
    role: 'Stakeholders',
    tagline: 'Member companies, trading partners, government bodies and pre-meeting stakeholder profiles',
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
    tagline: 'Arabic/English speeches, board notes, member announcements and trade forum messaging',
    color: '#5B4FCF',
    colorMuted: '#EEECFA',
    tools: ['Voice learning', 'Bilingual drafts', 'Tone review'],
    focusAreas: ['Communications', 'Meetings'],
  },
  {
    id: 'explorer',
    name: 'Explorer AI',
    shortName: 'Web',
    role: 'General knowledge',
    tagline: 'Searches the internet to answer questions outside the CEO office scope',
    color: '#D97706',
    colorMuted: '#FEF3C7',
    tools: ['Live web search', 'General knowledge', 'Real-time answers'],
    focusAreas: [],
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
  explorer: 'Explorer AI',
};

function uniqueAgents(list: AgentType[]): AgentType[] {
  return [...new Set(list)];
}

function isExplorerQuery(q: string): boolean {
  if (
    /\b(check the internet|search the internet|search online|search the web|look (it|this) up online|find (it|this) online|google|look up|search for|find (on|from) the (web|internet)|what does (google|the internet) say)\b/.test(q)
  ) return true;

  const hasDmccEntity =
    /\b(dmcc|dubai multi commodities|ahmed bin sulayem|chief executive|ceo\b|board pack|action register|member portal|free zone|commodit(y|ies)|gold centre|diamond exchange|tea centre|coffee centre|crypto centre|gaming centre|26,?000\+?\s*companies|180\+?\s*countries|jlt|jumeirah lakes)\b/.test(q);
  if (hasDmccEntity) return false;

  const hasCeoRegContext =
    /\b(dubai|uae|gcc).{0,40}(regulat|policy|polic|compliance|framework|law|licensing|aml|cft)\b/.test(q) ||
    /\b(regulat|policy|polic|compliance|framework|law|licensing|aml|cft).{0,40}(dubai|uae|gcc)\b/.test(q);
  if (hasCeoRegContext) return false;

  const hasCeoBenchmark =
    /\b(benchmark|compare|comparison|versus|\bvs\b).{0,50}(dmcc|difc|adgm|jafza|free zone|commodit|gold|diamond|member ecosystem|trade corridor)\b/.test(q) ||
    /\b(dmcc|difc|adgm|free zone|commodit|gold|diamond|member).{0,50}(benchmark|compare|comparison)\b/.test(q);
  if (hasCeoBenchmark) return false;

  const hasCeoTask =
    /\b(brief me|board brief|board pack|premeeting|pre.?meeting|meeting prep|daily briefing|executive briefing)\b/.test(q);
  if (hasCeoTask) return false;

  const hasEmailDraftTask =
    /\b(draft|write|compose|rewrite|polish)\b.{0,40}\b(email|letter|memo|message|reply|response|announcement|note)\b/.test(q) ||
    /\b(email|letter|memo|message)\b.{0,30}\b(draft|write|compose|help me)\b/.test(q);
  if (hasEmailDraftTask) return false;

  return true;
}

/** Orchestrator routing */
export function routeAgentsForQuery(
  query: string,
  manualSelection: AgentType[],
  autoRoute: boolean,
  previousAgents: AgentType[] = [],
  prevResponseWasQuestion = false,
): AgentType[] {
  const q = query.toLowerCase();
  const intent = detectChatIntent(query);
  if (intent === 'greeting' || intent === 'catchup' || intent === 'thanks') return ['cos'];

  if (autoRoute && previousAgents.length > 0 && !q.includes('?')) {
    const wordCount = q.trim().split(/\s+/).length;
    const prevPrimary = previousAgents[0];
    const isContinuationAgent = prevPrimary === 'comms' || prevPrimary === 'explorer';
    const hasExplicitOverride = /\b(@policy|@strategy|@cos|@crm|@comms|policy ai|strategy ai|comms ai)\b/.test(q);
    if (wordCount <= 3 && isContinuationAgent && !hasExplicitOverride) {
      return [prevPrimary];
    }
    if (prevResponseWasQuestion && isContinuationAgent && !hasExplicitOverride) {
      return [prevPrimary];
    }
  }

  if (!autoRoute && manualSelection.length) return uniqueAgents(manualSelection);

  if (isExplorerQuery(q)) return ['explorer'];

  const focusId = resolveFocusAreaForQuery(query);
  if (focusId) {
    const area = FOCUS_AREA_MAP[focusId];
    if (area?.agents?.length) return uniqueAgents(area.agents);
  }

  const routed: AgentType[] = [];
  if (/\b(meeting|brief|board|action|follow.?up|calendar|agenda|decision)\b/.test(q)) routed.push('cos');
  if (
    /\b(market|competitor|benchmark|capital|sector|investment|commodit|gold|diamond|tea|coffee|crypto|gaming|ai|trade|free zone|dubai|d33|member|difc|adgm|compare|trend|intelligence|positioning|growth|landscape|gcc|mena|ecosystem|corridor|26,?000|180\+?\s*countries)\b/.test(q)
  ) {
    routed.push('strategy');
  }
  if (/\b(regulat|policy|polic|compliance|framework|licensing|aml|cft|sanction|consultation|member compliance|free zone rule)\b/.test(q)) {
    routed.push('policy');
  }
  if (/\b(stakeholder|partner|crm|commitment|relationship|member company|trading partner|government|investor)\b/.test(q)) {
    routed.push('relationship');
  }
  if (/\b(draft|speech|memo|arabic|english|communication|talking points|press release|note to)\b/.test(q)) {
    routed.push('comms');
  }

  if (!routed.length) routed.push('cos');
  return uniqueAgents(routed);
}

export function getAgentForType(type: AgentType): AgentDefinition {
  return AGENT_MAP[type];
}

export function getAgentColor(type: AgentType): string {
  return AGENT_MAP[type]?.color ?? '#1A1A1A';
}

export function getAgentLabel(type: AgentType): string {
  return AGENT_LABELS[type] ?? type;
}

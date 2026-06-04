import { EXECUTIVE_USER } from '../config/user';
import { AGENT_MAP, routeAgentsForQuery } from '../data/agents';
import type { ExecutiveState } from '../data/executiveStore';
import type { AgentType, ChatMessage } from '../types';
import { detectChatIntent } from '../utils/chatIntent';
import {
  actHandle,
  buildGroundedRecords,
  calHandle,
  crmHandle,
  kbHandle,
  mktHandle,
} from '../utils/sourceHandles';

function meetingCrmSlug(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('mubadala')) return 'mubadala';
  if (t.includes('mas') || t.includes('singapore')) return 'mas';
  if (t.includes('board')) return 'board-risk';
  return title.split(/\s+/).slice(0, 2).join('-').toLowerCase();
}

export type ChatContextOptions = {
  query?: string;
  routedAgents?: AgentType[];
  manualAgents?: AgentType[];
  autoRoute?: boolean;
};

export function buildChatContext(state: ExecutiveState, options?: ChatContextOptions) {
  const query = options?.query?.trim() ?? '';
  const chatIntent = query ? detectChatIntent(query) : 'standard';
  const routedAgents =
    options?.routedAgents ??
    (query
      ? routeAgentsForQuery(query, options?.manualAgents ?? [], options?.autoRoute ?? true)
      : []);

  const groundedRecords = buildGroundedRecords(state);
  const mktDate = state.lastSync.slice(0, 10);

  return {
    executiveName: EXECUTIVE_USER.fullName,
    executiveFirstName: EXECUTIVE_USER.firstName,
    organisation: EXECUTIVE_USER.organisation,
    lastSync: state.lastSync,
    userQuestion: query,
    chatIntent,
    conversationalMode:
      chatIntent === 'greeting' ? 'greeting' : chatIntent === 'thanks' ? 'thanks' : undefined,
    routedAgents,
    primaryAgent: routedAgents[0] ?? 'cos',
    agentDelegation: routedAgents.map((id) => ({
      id,
      name: AGENT_MAP[id].name,
      shortName: AGENT_MAP[id].shortName,
      role: AGENT_MAP[id].role,
      tagline: AGENT_MAP[id].tagline,
    })),
    groundedRecords,
    validHandles: groundedRecords.map((r) => r.handle),
    documents: state.documents.map((d, i) => ({
      id: d.id,
      handle: kbHandle(d.id, i),
      name: d.name,
      summary: d.summary,
      asOf: d.uploadedAt,
    })),
    metrics: {
      queriesThisWeek: state.metrics.queriesThisWeek,
      documentsInKb: state.metrics.documentsInKb,
      avgConfidence: state.metrics.avgConfidence,
      departmentsOnTrack: state.metrics.departmentsOnTrack,
      openActions: state.metrics.openActions,
    },
    departmentHeadlines: state.departments.slice(0, 6).map((d) => {
      const k = d.kpis[0];
      return `${d.name}: ${k ? `${k.label} ${k.value}` : '—'} (${d.rag})`;
    }),
    meetingsDetailed: state.meetings.map((m) => ({
      id: m.id,
      handle: calHandle(m.id, m.time),
      crmHandle: crmHandle(meetingCrmSlug(m.title)),
      title: m.title,
      time: m.time,
      attendees: m.attendees,
      location: m.location,
      prepStatus: m.prepStatus,
    })),
    meetings: state.meetings.map((m) => ({
      title: m.title,
      time: m.time,
      attendees: m.attendees,
      location: m.location,
      prepStatus: m.prepStatus,
    })),
    actionsDetailed: state.actionRegister
      .filter((a) => a.status !== 'done')
      .map((a, i) => ({
        id: a.id,
        handle: actHandle(a.id, i),
        title: a.title,
        due: a.due,
        status: a.status,
        owner: a.owner,
      })),
    openActions: state.actionRegister
      .filter((a) => a.status !== 'done')
      .map((a) => ({
        title: a.title,
        due: a.due,
        status: a.status,
        owner: a.owner,
      })),
    marketSnapshot: state.marketSnapshot,
    marketHandle: mktHandle(mktDate),
  };
}

export type ChatHistoryItem = { role: 'user' | 'assistant'; content: string };

export function buildChatHistory(
  msgs: { id: number; role: string; text: string }[],
  beforeId?: number,
): ChatHistoryItem[] {
  const slice = beforeId != null ? msgs.filter((m) => m.id < beforeId) : msgs;
  return slice
    .filter((m) => m.text?.trim())
    .map((m) => ({
      role: (m.role === 'user' ? 'user' : 'assistant') as ChatHistoryItem['role'],
      content: m.text,
    }))
    .slice(-12);
}

export function buildChatHistoryFromMessages(messages: ChatMessage[]): ChatHistoryItem[] {
  return messages
    .filter((m) => m.content?.trim())
    .map((m) => ({
      role: (m.role === 'user' ? 'user' : 'assistant') as ChatHistoryItem['role'],
      content: m.content,
    }))
    .slice(-12);
}

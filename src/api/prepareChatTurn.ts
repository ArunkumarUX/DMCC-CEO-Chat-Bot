import { routeAgentsForQuery } from '../data/agents';
import type { AgentType } from '../types';
import type { ExecutiveState } from '../data/executiveStore';
import { buildChatContext } from './buildChatContext';
import { buildChatUserMessage } from './buildChatUserMessage';

function applyContextAgent(routed: AgentType[], contextAgent?: AgentType | null): AgentType[] {
  if (!contextAgent) return routed;
  return [contextAgent, ...routed.filter((a) => a !== contextAgent)];
}

export function prepareChatTurn(
  query: string,
  state: ExecutiveState,
  options: {
    manualAgents: AgentType[];
    autoRoute: boolean;
    previousAgents?: AgentType[];
    prevResponseWasQuestion?: boolean;
    contextAgent?: AgentType | null;
  },
  historyLength = 0,
) {
  const routedAgents = applyContextAgent(
    routeAgentsForQuery(
      query,
      options.manualAgents,
      options.autoRoute,
      options.previousAgents ?? [],
      options.prevResponseWasQuestion ?? false,
    ),
    options.contextAgent,
  );
  const context = buildChatContext(state, {
    query,
    routedAgents,
    manualAgents: options.manualAgents,
    autoRoute: options.autoRoute,
    contextAgent: options.contextAgent ?? undefined,
  });
  const userMessage = buildChatUserMessage(query, context, { historyLength });
  return { context, userMessage, routedAgents };
}

import { routeAgentsForQuery } from '../data/agents';
import type { AgentType } from '../types';
import type { ExecutiveState } from '../data/executiveStore';
import { buildChatContext } from './buildChatContext';
import { buildChatUserMessage } from './buildChatUserMessage';

export function prepareChatTurn(
  query: string,
  state: ExecutiveState,
  options: { manualAgents: AgentType[]; autoRoute: boolean; previousAgents?: AgentType[]; prevResponseWasQuestion?: boolean },
  historyLength = 0,
) {
  const routedAgents = routeAgentsForQuery(query, options.manualAgents, options.autoRoute, options.previousAgents ?? [], options.prevResponseWasQuestion ?? false);
  const context = buildChatContext(state, {
    query,
    routedAgents,
    manualAgents: options.manualAgents,
    autoRoute: options.autoRoute,
  });
  const userMessage = buildChatUserMessage(query, context, { historyLength });
  return { context, userMessage, routedAgents };
}

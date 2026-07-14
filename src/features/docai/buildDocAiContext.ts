import { buildChatContext } from '../../api/buildChatContext';
import type { ExecutiveState } from '../../data/executiveStore';

/** Compact executive brief for DocAI */
export function formatDocAiExecutiveBrief(state: ExecutiveState, query: string): string {
  const ctx = buildChatContext(state, { query });
  const docLines = ctx.documents
    .slice(0, 8)
    .map((d) => `- ${d.handle}: ${d.name} — ${d.summary}`)
    .join('\n');
  const meetingLines = ctx.meetingsDetailed
    .slice(0, 6)
    .map((m) => `- ${m.handle}: ${m.title} (${m.time}) · ${m.prepStatus}`)
    .join('\n');
  const actionLines = ctx.actionsDetailed
    .slice(0, 8)
    .map((a) => `- ${a.handle}: ${a.title} · due ${a.due} · ${a.status}`)
    .join('\n');

  return [
    'COMMAND CENTRE CONTEXT (use for facts; cite handles; label inference; never invent figures):',
    `Executive: ${ctx.executiveName} · ${ctx.organisation} · sync ${ctx.lastSync}`,
    '',
    'Knowledge base:',
    docLines || '- (no documents)',
    '',
    'Calendar / meetings:',
    meetingLines || '- (none)',
    '',
    'Open actions:',
    actionLines || '- (none)',
    '',
    'Department headlines:',
    ctx.departmentHeadlines.join('\n'),
    '',
    `Market (${ctx.marketHandle}): GCC ${ctx.marketSnapshot.gccEquities}; digital assets ${ctx.marketSnapshot.digitalAssetsWoW}`,
    '',
    `Valid source handles: ${ctx.validHandles.slice(0, 24).join(', ')}`,
  ].join('\n');
}

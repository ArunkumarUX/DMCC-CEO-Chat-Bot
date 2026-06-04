import { buildChatContext } from '../../api/buildChatContext';
import type { ExecutiveState } from '../../data/executiveStore';

/** User wants slides grounded in Command Centre / chat / internal data */
export function userRequestsSlideContext(query: string): boolean {
  return /context|command\s*centre|ground(?:ed|ing)?|internal|knowledge\s*base|from\s+(our\s+)?chat|use\s+my\s+data|today'?s|meetings?|action\s*register|market\s*(?:data|snapshot)|\bKB-|\bCAL-|\bACT-|\bMKT-|personal\s*ai|sources?\s+of\s+truth|briefing/i.test(
    query,
  );
}

/** Compact executive brief for SlideAI (keeps token budget reasonable) */
export function formatSlideAiExecutiveBrief(state: ExecutiveState, query: string): string {
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
  const deptLines = ctx.departmentHeadlines.join('\n');

  return [
    'COMMAND CENTRE CONTEXT (use for facts; cite handles in speakerNotes where relevant; label inference):',
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
    deptLines,
    '',
    `Market (${ctx.marketHandle}): GCC ${ctx.marketSnapshot.gccEquities}; digital assets ${ctx.marketSnapshot.digitalAssetsWoW}; sector ${ctx.marketSnapshot.topSector}`,
    '',
    `Valid source handles: ${ctx.validHandles.slice(0, 24).join(', ')}`,
  ].join('\n');
}

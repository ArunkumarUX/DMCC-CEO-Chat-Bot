import { EXECUTIVE_USER, greetingForTime } from '../config/user';
import type { ExecutiveState } from './executiveStore';
import type { IntelligentResponse } from './executiveStore';
import { calHandle, mktHandle } from '../utils/sourceHandles';
import { plainTerms } from '../utils/executiveAnswerVisuals';

function formatMeetingTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Dubai',
    });
  } catch {
    return iso;
  }
}

function formatGccMarkets(gccEquities: string): string {
  return /^gcc\b/i.test(gccEquities.trim()) ? gccEquities : `GCC ${gccEquities}`;
}

/** One-line hello — used when Claude is offline */
export function buildShortGreetingResponse(
  _query: string,
  _state: ExecutiveState,
): IntelligentResponse {
  const firstName = EXECUTIVE_USER.firstName;
  const part = greetingForTime();
  return {
    agents: ['cos'],
    confidence: 0.96,
    sourceDocIds: [],
    followUps: [
      "What's happened today?",
      'Brief me on my next meeting',
      'What needs my attention today?',
    ],
    content: `${part}, **${firstName}**. I am your Personal AI Agent. How can I help you today?`,
  };
}

/** Daily catch-up briefing — Claude grounding template / offline fallback */
export function buildDailyCatchUpResponse(
  _query: string,
  state: ExecutiveState,
): IntelligentResponse {
  const firstName = EXECUTIVE_USER.firstName;
  const part = greetingForTime();
  const meetings = [...state.meetings].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
  );
  const nextMeeting = meetings.find((m) => new Date(m.time).getTime() >= Date.now() - 3_600_000) ?? meetings[0];
  const overdue = state.actionRegister.filter((a) => a.status === 'overdue');
  const open = state.actionRegister.filter((a) => a.status !== 'done');
  const m = state.marketSnapshot;
  const mktH = mktHandle(state.lastSync);
  const calH = nextMeeting ? calHandle(nextMeeting.id, nextMeeting.time) : null;
  const gccLine = formatGccMarkets(m.gccEquities);

  const overdueLine =
    overdue.length > 0
      ? `${overdue.length} overdue — top: **${overdue[0].title}** [ACT-01]`
      : 'No overdue actions right now';

  return {
    agents: ['cos'],
    confidence: 0.96,
    sourceDocIds: ['d1'],
    followUps: [
      nextMeeting ? `Brief me on ${nextMeeting.title}` : 'Brief me on my next meeting',
      'What needs my attention today?',
      'Compare DMCC diamond trade against regional free zone benchmarks',
    ],
    content: `${part}, **${firstName}** — good to see you.

${plainTerms(`You're broadly on track; ${overdue.length ? 'a couple of actions need your eye' : 'your action register is clean'} and ${meetings.length ? 'the calendar is active today' : 'the calendar is light'}.`)}
**What's happened today**
- **Markets:** ${gccLine}; digital assets ${m.digitalAssetsWoW} [${mktH}]
- **Teams:** ${state.metrics.departmentsOnTrack}/9 departments green · ${open.length} open actions
- **Actions:** ${overdueLine}
${nextMeeting ? `- **Next:** ${nextMeeting.title} (${formatMeetingTime(nextMeeting.time)} GST) [${calH}]` : ''}

I'm here when you're ready — meeting brief, regulatory compare, or a deeper performance look?`,
  };
}

/** @deprecated Use buildShortGreetingResponse or buildDailyCatchUpResponse */
export function buildPersonalGreetingResponse(query: string, state: ExecutiveState): IntelligentResponse {
  return buildDailyCatchUpResponse(query, state);
}

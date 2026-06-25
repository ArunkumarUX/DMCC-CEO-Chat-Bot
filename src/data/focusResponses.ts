import { EXECUTIVE_USER } from '../config/user';
import type { AgentType } from '../types';
import type { ExecutiveState } from './executiveStore';
import { getDepartment } from './executiveStore';
import type { FocusAreaId } from './focusAreas';
import { FOCUS_AREA_MAP } from './focusAreas';
import type { IntelligentResponse } from './executiveStore';
import {
  actionNow,
  agentTag,
  metricTable,
  plainTerms,
  scoreBar,
  signalEmoji,
} from '../utils/executiveAnswerVisuals';

function baseFollowUps(area: FocusAreaId): string[] {
  return FOCUS_AREA_MAP[area].prompts.slice(1, 4);
}

export function buildFocusAreaResponse(
  areaId: FocusAreaId,
  query: string,
  state: ExecutiveState,
): IntelligentResponse {
  const area = FOCUS_AREA_MAP[areaId];
  const m = state.marketSnapshot;
  const hr = getDepartment(state, 'hr');
  const attrition = hr?.kpis.find((k) => k.label.includes('Attrition'))?.value ?? '15.8%';

  const agents = area.agents as AgentType[];

  switch (areaId) {
    case 'strategic-intelligence': {
      const q = query.toLowerCase();
      if (q.includes('emaar') || q.includes('huna') || q.includes('competitor')) {
        return {
          agents,
          confidence: 0.9,
          sourceDocIds: ['d9', 'd8'],
          followUps: baseFollowUps(areaId),
          content: `## HUNA vs Emaar — design positioning

${plainTerms('HUNA leads on cultural curation and design; Emaar leads on scale and distribution.')}
${metricTable(
  ['Signal', 'HUNA', 'Emaar'],
  [
    ['Design differentiation', '96/100', '78/100'],
    ['Pre-sales velocity', 'Catching up', 'Market leader'],
    ['Cultural narrative', 'We Emerge Stronger', 'Volume-led'],
  ],
)}
${actionNow('Accelerate HUNA waterfront launch narrative this week.')}
${agentTag(['Strategy AI'])}`,
        };
      }
      if (q.includes('geopolitical')) {
        return {
          agents,
          confidence: 0.91,
          sourceDocIds: ['d8'],
          followUps: baseFollowUps(areaId),
          content: `## Geopolitical brief — Dubai portfolio

${plainTerms('No crisis for the group today — watch GCC capital flows and mortgage rule changes for HUNA pre-sales.')}
${metricTable(
  ['Topic', 'Status', 'Signal'],
  [
    ['Dubai RE transactions', '+4.2% overnight', signalEmoji('good')],
    ['GCC equities', m.gccEquities, signalEmoji('good')],
    ['Mortgage rules (CBUAE)', 'Expat affordability eased', signalEmoji('good')],
    ['Regional stability', 'Stable inflows', signalEmoji('good')],
  ],
)}
${agentTag(['Strategy AI', 'Policy AI'])}`,
        };
      }
      return {
        agents,
        confidence: 0.92,
        sourceDocIds: ['d6', 'd12', 'd8'],
        followUps: baseFollowUps(areaId),
        content: `## Daily briefing — ${new Date().toLocaleDateString('en-AE', { weekday: 'short', day: 'numeric', month: 'short' })}

${plainTerms('Dubai real estate steady; hospitality recovery supports DREC and HUNA. Watch RERA filing deadline.')}
${metricTable(
  ['Market', 'Move', 'Signal'],
  [
    ['Dubai RE transactions', '+4.2%', signalEmoji('good')],
    ['Hospitality RevPAR', 'Climbing', signalEmoji('good')],
    ['Top sector', m.topSector.split('(')[0].trim(), signalEmoji('good')],
  ],
)}
${metricTable(
  ['Competitor', 'Headline', 'Signal'],
  [
    ['Emaar', m.competitorNote, signalEmoji('watch')],
    ['Meraas', 'Waterfront community launch', signalEmoji('watch')],
    ['Nakheel', 'No major move', signalEmoji('good')],
  ],
)}
**D33 portfolio alignment**
${scoreBar(86)}
${agentTag(['Strategy AI', 'Policy AI'])}`,
      };
    }

    case 'meetings': {
      const qLower = query.toLowerCase();
      const mtg = state.meetings.find((m) => qLower.includes('drec') && m.title.toLowerCase().includes('drec'))
        ?? state.meetings[0];
      if (query.toLowerCase().includes('board pack') || query.toLowerCase().includes('executive summary')) {
        return {
          agents,
          confidence: 0.91,
          sourceDocIds: ['d1'],
          followUps: baseFollowUps(areaId),
          content: `## Board pack — executive summary

**Document:** Q2_Board_Pack_Draft_v3.pdf

### Decisions required (3)
1. HUNA waterfront launch — board sign-off Q3
2. We Emerge Stronger commission — artist shortlist approval
3. Talent pipeline — HR attrition **${attrition}** — retention actions recommended

### Portfolio highlights
- DREC occupancy 94.2% · leasing pipeline AED 124M
- HUNA pre-sales inquiries +12% QoQ
- HIVE occupancy 91%

### Risks for board attention
- One HUNA pre-sales deal stalled 3 weeks
- RERA rental disclosure due in 11 days

*Ready for export to board portal · Communications AI can draft covering note*`,
        };
      }
      if (query.toLowerCase().includes('action item') || query.toLowerCase().includes('drec')) {
        return {
          agents,
          confidence: 0.9,
          sourceDocIds: ['d1'],
          followUps: baseFollowUps(areaId),
          content: `## Post-meeting — action extraction

**Meeting:** DREC board (Apr 2026)

| Action | Owner | Due | Status |
|--------|-------|-----|--------|
| Approve RERA rental repricing plan | ${EXECUTIVE_USER.firstName} | 30 Jun | Open |
| HUNA launch narrative sign-off | Marketing | End Q2 | Open |
| Escalate stalled pre-sales deal | Sales | This week | **Urgent** |

**Follow-up draft (excerpt):** Thank you for a productive session. DREC will circulate the RERA compliance update by [date]. We welcome progress on the HUNA waterfront launch timeline.

*Add to action register · Chief of Staff AI*`,
        };
      }
      return {
        agents,
        confidence: 0.94,
        sourceDocIds: ['d8', 'd13'],
        followUps: baseFollowUps(areaId),
        content: `## Pre-meeting brief — ${mtg.title}

**${mtg.attendees}** · ${mtg.location}  
**Prep status:** ${mtg.prepStatus === 'ready' ? 'Ready' : 'In progress'}

### Context
- Last board: occupancy held at 94.2%; leasing pipeline healthy
- Open item: RERA rental disclosure due in 11 days

### Suggested questions
1. Timeline for stalled AED 90M pre-sales link?
2. Beach Centre footfall recovery — sustain Q2 gains?

### Sensitivities
- Avoid over-committing on HUNA launch date before design partner sign-off`,
      };
    }

    case 'regulatory':
      return {
        agents,
        confidence: 0.92,
        sourceDocIds: ['d13', 'd8'],
        followUps: baseFollowUps(areaId),
        content: `## Regulatory & policy intelligence

**Query:** ${query.slice(0, 120)}...

### A.R.M. Holding group position
RERA rental index update requires DREC portfolio repricing within 30 days. DLD registration SLA 5 business days for new leases.

### Dubai benchmark
**RERA:** Enhanced rental disclosure requirements — group filing due in 11 days

### Recommended CEO actions
1. Clear RERA filing with Legal & Compliance on time
2. Review HUNA escrow compliance for off-plan sales
3. Board visibility on DLD registration bottleneck (5.6-day turnaround)

*Cross-reference complete against RERA, DLD, DET feeds · updated today*`,
      };

    case 'correspondence':
      return {
        agents,
        confidence: 0.91,
        sourceDocIds: ['d3', 'd1'],
        followUps: baseFollowUps(areaId),
        content: `## Correspondence & communications

### Priority inbound (last 48h — simulated)
1. **Art Dubai** — We Emerge Stronger commission timeline confirmation
2. **Board secretariat** — Q2 pack circulation draft approval
3. **DREC Legal** — RERA filing gap memo

### Draft capability
- **Arabic / English** executive register with honorifics verified
- CEO voice learning applied from prior approved notes

### Sample (English excerpt — We Emerge Stronger)
Culture is essential to how we build cities and communities. This commission reflects our belief that art should be woven into everyday life at HUNA Sculpture Park.

*Full bilingual draft in Documents library · Communications AI*`,
      };

    case 'stakeholders':
      return {
        agents,
        confidence: 0.93,
        sourceDocIds: ['d1', 'd11'],
        followUps: baseFollowUps(areaId),
        content: `## Stakeholder & relationship intelligence

### CRM summary
| Stakeholder | Last interaction | Open commitments |
|-------------|------------------|------------------|
| **Art Dubai** | Jun 2026 | Sculpture commission launch |
| **DREC board** | Apr 2026 | RERA repricing approval |
| **Banking JV partner** | May 2026 | Q2 portfolio review |

### Partnerships requiring follow-up
- We Emerge Stronger × Art Dubai — open call live until 25 Jul
- HUNA design partnerships — 2 follow-ups due this month

### Before next engagement
Request a full stakeholder brief naming the organisation for attendee history, sensitivities, and talking points.`,
      };

    case 'knowledge':
      return {
        agents,
        confidence: 0.89,
        sourceDocIds: ['d6', 'd8', 'd9'],
        followUps: baseFollowUps(areaId),
        content: `## Knowledge management — institutional search

**Corpus:** ${state.metrics.documentsInKb}+ indexed documents · Knowledge Graph active

### Results for your query
- **ARM_Group_Strategy_2026.pdf** — investment approach, DREC/HUNA/HIVE portfolio
- **DREC_Portfolio_Review_Q1_2026.pdf** — 3,200+ units, 94.2% occupancy
- **We_Emerge_Stronger_Commission_Brief.pdf** — Art Dubai open call, HUNA Sculpture Park

### Historical precedent
2025 strategic decisions: accelerate HUNA design-led launches, launch We Emerge Stronger commission, stabilise DREC income base.

*Institutional knowledge preserved across tenures · cite sources in export*`,
      };

    default:
      return {
        agents: ['cos', 'strategy'],
        confidence: 0.87,
        sourceDocIds: ['d1'],
        followUps: ALL_FOCUS_PROMPTS_FALLBACK(),
        content: `**${EXECUTIVE_USER.firstName}** — ask within any of the six focus areas: strategic intelligence, meetings, regulatory, communications, stakeholders, or knowledge.`,
      };
  }
}

function ALL_FOCUS_PROMPTS_FALLBACK(): string[] {
  return [
    'Give me my daily executive briefing for Dubai real estate and the A.R.M. Holding portfolio',
    'Brief me on my next DREC board meeting',
    'Search our knowledge base for We Emerge Stronger commission details',
  ];
}

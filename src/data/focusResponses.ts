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
  const members = getDepartment(state, 'members');
  const setupTime = members?.kpis.find((k) => k.label.includes('setup'))?.value ?? '4.2 days';

  const agents = area.agents as AgentType[];

  switch (areaId) {
    case 'strategic-intelligence': {
      const q = query.toLowerCase();
      if (q.includes('difc') || q.includes('adgm') || q.includes('competitor') || q.includes('crypto')) {
        return {
          agents,
          confidence: 0.9,
          sourceDocIds: ['d9', 'd8'],
          followUps: baseFollowUps(areaId),
          content: `## DMCC vs DIFC — digital assets & free zone positioning

${plainTerms('DMCC leads on commodity depth and VASP licensing at scale; DIFC leads on institutional finance and capital markets.')}
${metricTable(
  ['Signal', 'DMCC', 'DIFC'],
  [
    ['Commodity ecosystem score', '94/100', '72/100'],
    ['Crypto Centre licensing', 'VASP framework live', 'VARA adjacent'],
    ['Member base', '26,000+ companies', 'Institutional focus'],
  ],
)}
${actionNow('Accelerate crypto and AI centre member onboarding this quarter.')}
${agentTag(['Strategy AI'])}`,
        };
      }
      if (q.includes('geopolitical')) {
        return {
          agents,
          confidence: 0.91,
          sourceDocIds: ['d8'],
          followUps: baseFollowUps(areaId),
          content: `## Geopolitical brief — GCC trade & commodities

${plainTerms('No crisis for the authority today — watch gold flows, shipping corridors and sanctions lists for member impact.')}
${metricTable(
  ['Topic', 'Status', 'Signal'],
  [
    ['Gold spot (benchmark)', 'Elevated', signalEmoji('watch')],
    ['GCC equities', m.gccEquities, signalEmoji('good')],
    ['Trade corridor volumes', 'Stable through Dubai', signalEmoji('good')],
    ['Regional stability', 'Member activity steady', signalEmoji('good')],
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

${plainTerms('GCC commodity flows steady; gold and diamond activity supports member ecosystem. Watch crypto centre licensing milestones.')}
${metricTable(
  ['Market', 'Move', 'Signal'],
  [
    ['Gold (spot)', 'Firm', signalEmoji('good')],
    ['Diamond trade volumes', 'Recovering', signalEmoji('good')],
    ['Top sector', m.topSector.split('(')[0].trim(), signalEmoji('good')],
  ],
)}
${metricTable(
  ['Hub', 'Headline', 'Signal'],
  [
    ['DIFC', m.competitorNote, signalEmoji('watch')],
    ['ADGM', 'Digital asset framework updates', signalEmoji('watch')],
    ['Singapore', 'Commodity hub competition', signalEmoji('watch')],
  ],
)}
**Ecosystem alignment**
${scoreBar(91)}
${agentTag(['Strategy AI', 'Policy AI'])}`,
      };
    }

    case 'meetings': {
      const qLower = query.toLowerCase();
      const mtg = state.meetings.find((m) => qLower.includes('leadership') && m.title.toLowerCase().includes('leadership'))
        ?? state.meetings[0];
      if (query.toLowerCase().includes('board pack') || query.toLowerCase().includes('executive summary')) {
        return {
          agents,
          confidence: 0.91,
          sourceDocIds: ['d1'],
          followUps: baseFollowUps(areaId),
          content: `## Board pack — executive summary

**Document:** Q2_Board_Pack_DMCC_v3.pdf

### Decisions required (3)
1. Crypto Centre — VASP licensing milestone approval
2. AI & Gaming centres — ecosystem partnership sign-off
3. Member services — onboarding SLA **${setupTime}** — renewal escalation recommended

### Ecosystem highlights
- Gold & Diamond: leading global commodity trading hub in JLT
- Tea & Coffee Centre: origin corridor partnerships expanding
- Crypto Centre: licensed VASP framework scaling member onboarding
- 26,000+ companies · 180+ countries · Where the world does business

### Risks for board attention
- AML/CFT compliance workload rising with crypto member growth
- Competing free zone digital asset acceleration (DIFC, ADGM)

*Ready for export to board portal · Communications AI can draft covering note*`,
        };
      }
      if (query.toLowerCase().includes('action item') || query.toLowerCase().includes('leadership')) {
        return {
          agents,
          confidence: 0.9,
          sourceDocIds: ['d1'],
          followUps: baseFollowUps(areaId),
          content: `## Post-meeting — action extraction

**Meeting:** DMCC leadership (Q2 2026)

| Action | Owner | Due | Status |
|--------|-------|-----|--------|
| Approve crypto centre licensing milestone plan | ${EXECUTIVE_USER.firstName} | 30 Jun | Open |
| AI centre partnership sign-off | Ecosystem team | End Q2 | Open |
| Escalate member services vacancies (diamonds desk) | Member Services | This week | **Urgent** |

**Follow-up draft (excerpt):** Thank you for a productive session. The authority will circulate the crypto centre update by [date]. We welcome progress on the AI and gaming ecosystem roadmap.

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
- Member ecosystem: 26,000+ companies globally; onboarding tracking to plan
- Open item: Global Trade Forum keynote due in 14 days

### Suggested questions
1. Timeline for crypto centre VASP onboarding targets?
2. AI & Gaming centre — partnership pipeline for Q3?

### Sensitivities
- Avoid over-committing on member growth targets before regulatory sign-off`,
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

### DMCC position
UAE AML/CFT updates affect crypto centre VASP members and gold trading houses. Free zone licensing requirements evolving for digital asset operators.

### GCC benchmark
**DMCC Authority:** Member compliance cycle — filings on track  
**UAE Central Bank / VARA:** Digital asset framework updates affecting VASP onboarding

### Recommended CEO actions
1. Clear AML/CFT review with Compliance for crypto centre members
2. Review free zone licensing timeline with Legal & ecosystem heads
3. Board visibility on FATF travel rule implementation for VASP members

*Cross-reference complete against UAE regulators, DMCC authority notices and FATF feeds · updated today*`,
      };

    case 'correspondence':
      return {
        agents,
        confidence: 0.91,
        sourceDocIds: ['d3', 'd1'],
        followUps: baseFollowUps(areaId),
        content: `## Correspondence & communications

### Priority inbound (last 48h — simulated)
1. **Global Trade Forum** — CEO keynote confirmation
2. **Board secretariat** — Q2 pack circulation draft approval
3. **Crypto Centre Legal** — VASP licensing milestone memo

### Draft capability
- **Arabic / English** executive register with honorifics verified
- CEO voice learning applied from prior approved notes

### Sample (English excerpt — Global Trade Forum)
DMCC's 26,000 companies across 180 countries represent the diversity and ambition of global trade. Where the world does business — this recognition reflects our members' commitment to innovation, compliance, and exceptional value creation.

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
| **Major gold trading house** | Jun 2026 | Gold centre membership milestone |
| **DMCC leadership** | Q2 2026 | Ecosystem growth review |
| **Government trade body** | May 2026 | Corridor partnership Q3 |

### Partnerships requiring follow-up
- UAE trade corridor × DMCC — agri-commodity origin partnerships
- AI ecosystem × global cloud provider — sandbox pilot follow-ups due this month

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
- **DMCC_Strategy_2026.pdf** — ecosystem expansion, trade corridors, 26,000+ member base
- **Gold_Diamond_Centre_Review_Q1_2026.pdf** — trading volumes, member activity
- **Crypto_Centre_Licensing_Review_2026.pdf** — VASP framework, onboarding metrics

### Historical precedent
2025 strategic decisions: scale crypto centre licensing, launch AI & Gaming centres, expand tea/coffee origin corridors, strengthen AML/CFT member compliance programme.

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
    'Give me my daily executive briefing for GCC commodities and the DMCC ecosystem',
    'Brief me on my next leadership team meeting',
    'Search our knowledge base for crypto centre licensing milestones',
  ];
}

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
  const attrition = hr?.kpis.find((k) => k.label.includes('Attrition'))?.value ?? '18%';

  const agents = area.agents as AgentType[];

  switch (areaId) {
    case 'strategic-intelligence': {
      const q = query.toLowerCase();
      if (q.includes('6thstreet') || q.includes('namshi') || q.includes('competitor')) {
        return {
          agents,
          confidence: 0.9,
          sourceDocIds: ['d9', 'd8'],
          followUps: baseFollowUps(areaId),
          content: `## 6thStreet vs Namshi — omnichannel positioning

${plainTerms('6thStreet leads on phygital experience and 90-min delivery; Namshi leads on marketplace scale in KSA.')}
${metricTable(
  ['Signal', '6thStreet', 'Namshi'],
  [
    ['Omnichannel score', '92/100', '85/100'],
    ['Delivery speed', '90-min (UAE)', 'Same-day (KSA)'],
    ['Brand portfolio depth', '85+ brands', 'Marketplace-led'],
  ],
)}
${actionNow('Accelerate 6thStreet KSA delivery proposition this quarter.')}
${agentTag(['Strategy AI'])}`,
        };
      }
      if (q.includes('geopolitical')) {
        return {
          agents,
          confidence: 0.91,
          sourceDocIds: ['d8'],
          followUps: baseFollowUps(areaId),
          content: `## Geopolitical brief — GCC retail

${plainTerms('No crisis for the group today — watch GCC consumer confidence and tourism flows for store footfall.')}
${metricTable(
  ['Topic', 'Status', 'Signal'],
  [
    ['GCC retail sales', '+8.2% YoY', signalEmoji('good')],
    ['GCC equities', m.gccEquities, signalEmoji('good')],
    ['Tourism arrivals (UAE)', 'Strong summer season', signalEmoji('good')],
    ['Regional stability', 'Stable consumer spending', signalEmoji('good')],
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

${plainTerms('GCC retail steady; omnichannel growth supports 6thStreet and Club Apparel. Watch KSA expansion milestones.')}
${metricTable(
  ['Market', 'Move', 'Signal'],
  [
    ['GCC retail sales', '+8.2% YoY', signalEmoji('good')],
    ['E-commerce penetration', '22%', signalEmoji('good')],
    ['Top sector', m.topSector.split('(')[0].trim(), signalEmoji('good')],
  ],
)}
${metricTable(
  ['Competitor', 'Headline', 'Signal'],
  [
    ['Noon', m.competitorNote, signalEmoji('watch')],
    ['Namshi', 'Same-day KSA delivery push', signalEmoji('watch')],
    ['Regional malls', 'Footfall recovering', signalEmoji('good')],
  ],
)}
**Portfolio alignment**
${scoreBar(88)}
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

**Document:** Q2_Board_Pack_Apparel_Group_v3.pdf

### Decisions required (3)
1. KSA expansion — Arabian Alesaar milestone approval
2. Club Apparel 10M member campaign — launch sign-off
3. Store operations talent — HR attrition **${attrition}** — retention actions recommended

### Portfolio highlights
- R&B: 100+ stores across GCC · Most Admired Value Retailer 2025
- 6thStreet: 90-min delivery live · phygital store network expanding
- Club Apparel: 10M+ loyalty members
- Tim Hortons: 300+ stores in GCC & India

### Risks for board attention
- Store labour attrition above threshold in UAE and KSA
- Competitor omnichannel acceleration (Noon, Namshi)

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

**Meeting:** Apparel Group leadership (Q2 2026)

| Action | Owner | Due | Status |
|--------|-------|-----|--------|
| Approve KSA expansion milestone plan | ${EXECUTIVE_USER.firstName} | 30 Jun | Open |
| Club Apparel campaign sign-off | Marketing | End Q2 | Open |
| Escalate store manager vacancies (KSA, Qatar) | HR | This week | **Urgent** |

**Follow-up draft (excerpt):** Thank you for a productive session. The group will circulate the KSA expansion update by [date]. We welcome progress on the 6thStreet omnichannel roadmap.

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
- Store network: 2,500+ globally; GCC same-store sales tracking to plan
- Open item: Images RetailME Awards speaking slot due in 14 days

### Suggested questions
1. Timeline for Arabian Alesaar KSA store rollout?
2. 6thStreet 90-min delivery — expansion to additional emirates?

### Sensitivities
- Avoid over-committing on KSA store count before retail partner sign-off`,
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

### Apparel Group position
UAE VAT guidance update affects F&B operations (Tim Hortons, Cold Stone). Saudi retail licensing requirements changing for foreign brand operators.

### GCC benchmark
**UAE DED:** Retail licensing renewal cycle — group filing on track  
**MOHRE:** Labour law updates affecting store operations headcount planning

### Recommended CEO actions
1. Clear VAT compliance review with Finance for F&B division
2. Review KSA licensing timeline with Legal & country head
3. Board visibility on consumer protection e-commerce returns policy

*Cross-reference complete against UAE DED, FTA, MOHRE feeds · updated today*`,
      };

    case 'correspondence':
      return {
        agents,
        confidence: 0.91,
        sourceDocIds: ['d3', 'd1'],
        followUps: baseFollowUps(areaId),
        content: `## Correspondence & communications

### Priority inbound (last 48h — simulated)
1. **Images RetailME Awards** — CEO acceptance speech confirmation
2. **Board secretariat** — Q2 pack circulation draft approval
3. **KSA Legal** — Arabian Alesaar partnership milestone memo

### Draft capability
- **Arabic / English** executive register with honorifics verified
- CEO voice learning applied from prior approved notes

### Sample (English excerpt — RetailME Awards)
Apparel Group's 2,500 stores and 85 brands represent the diversity and ambition of GCC retail. This recognition reflects our team's commitment to innovation, sustainability, and exceptional customer experience.

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
| **Arabian Alesaar Group** | Jun 2026 | KSA expansion milestone |
| **Apparel Group leadership** | Q2 2026 | Store network review |
| **Major mall operator** | May 2026 | New store openings Q3 |

### Partnerships requiring follow-up
- Arabian Alesaar × Apparel Group — KSA store rollout plan
- Nykaa × Nysaa — GCC beauty expansion follow-ups due this month

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
- **Apparel_Group_Strategy_2026.pdf** — GCC expansion, omnichannel, 85+ brand portfolio
- **RB_Store_Network_Review_Q1_2026.pdf** — 100+ stores, value retail positioning
- **Club_Apparel_Loyalty_Review_2026.pdf** — 10M+ members, engagement metrics

### Historical precedent
2025 strategic decisions: accelerate KSA expansion, launch 6thStreet 90-min delivery, scale Club Apparel to 10M members, new brand launches (HEYDUDE, Barbour, Forever New).

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
    'Give me my daily executive briefing for GCC retail and the Apparel Group portfolio',
    'Brief me on my next leadership team meeting',
    'Search our knowledge base for KSA expansion milestones',
  ];
}

import type { GeneratedDocument } from './docTypes';

function topicFrom(msg: string): string {
  const clean = msg.replace(/\s+/g, ' ').trim();
  if (clean.length < 40) return clean || 'Executive document';
  return clean.slice(0, 72).replace(/[,:;].*$/, '').trim() || 'Executive document';
}

/** Offline / demo document when API is unavailable */
export function buildFallbackDocument(
  userMessage: string,
  opts?: { executiveBrief?: string; docType?: string; purpose?: string; audience?: string; style?: string },
): GeneratedDocument {
  const now = new Date().toISOString();
  const title = topicFrom(userMessage);
  const hasContext = Boolean(opts?.executiveBrief);

  return {
    id: `doc-fallback-${Date.now()}`,
    title,
    docType: opts?.docType || 'decision-memo',
    purpose: opts?.purpose || 'strategic-decision',
    audience: opts?.audience || 'leadership',
    style: opts?.style || 'dmcc-brand',
    status: 'draft',
    summary:
      'Preview generated offline. Connect the AI service for a fully tailored executive document grounded in DMCC facts and your brief.',
    estimatedPages: 5,
    sources: [
      'User brief',
      ...(hasContext ? ['Command Centre context'] : []),
      'DMCC brand defaults',
    ],
    brandCheck: ['DMCC navy & gold', 'Executive hierarchy', 'Placeholder markers for missing data'],
    createdAt: now,
    updatedAt: now,
    version: 1,
    sections: [
      {
        id: 'sec-1',
        title: 'Cover Page',
        kind: 'cover',
        body: `# ${title}\n\n**DMCC** · Dubai Multi Commodities Centre  \nPrepared for CEO Office · Ahmed Bin Sulayem  \n*Confidential — Leadership use only*\n\nStatus: Draft`,
      },
      {
        id: 'sec-2',
        title: 'Executive Summary',
        kind: 'summary',
        body: `## Recommendation\n\nProceed with a focused leadership review of **${title}**, using verified Command Centre sources where available.\n\n### Key points\n- Align the ask to a clear decision and owner\n- Separate facts from assumptions\n- Flag data gaps before board or investor circulation\n\n> [REQUIRES INPUT: Confirm the specific decision you need from leadership.]`,
      },
      {
        id: 'sec-3',
        title: 'Business Context',
        kind: 'context',
        body: `## Context\n\nDMCC operates a free-zone commodities and member-services ecosystem (gold, diamonds, Cyber, trade corridors, Uptown Dubai).\n\n**User brief:** ${userMessage.slice(0, 500)}\n\n${hasContext ? '_Command Centre context was attached to this brief._' : '_Say "use Command Centre context" to ground facts in internal sources._'}`,
      },
      {
        id: 'sec-4',
        title: 'Recommendations',
        kind: 'recommendations',
        body: `## Recommendations\n\n1. **Clarify the decision** — what must be approved, by whom, and by when\n2. **Evidence pack** — attach KPIs, corridor metrics, or member SLAs from Knowledge Base\n3. **Risk register** — sanctions, competitor free zones, licensing dependencies\n4. **Next 30 days** — owners, milestones, and reporting cadence\n\n### Decisions required\n| Decision | Owner | Timing |\n|---|---|---|\n| [REQUIRES INPUT] | CEO Office | [REQUIRES INPUT] |`,
      },
      {
        id: 'sec-5',
        title: 'Next Steps',
        kind: 'next-steps',
        body: `## Next steps\n\n1. Validate numbers with Finance / Member Services\n2. Circulate draft for Leadership Review\n3. Convert approved sections into a board pack or presentation via Presentations`,
      },
    ],
  };
}

import { EXECUTIVE_USER } from '../config/user';

type DeckMessage = {
  role: string;
  content: string;
};

type DeckConversation = {
  title: string;
  updatedAt: string;
  messages: DeckMessage[];
};

export function buildDeckSourceMarkdown(
  conversation: DeckConversation | null,
  extraNotes = '',
): string {
  const lines: string[] = [
    `# ADGM Command Centre — deck source`,
    ``,
    `**Executive:** ${EXECUTIVE_USER.fullName} · ${EXECUTIVE_USER.title}`,
    `**Organisation:** ${EXECUTIVE_USER.orgShort}`,
    `**Exported:** ${new Date().toISOString()}`,
    ``,
    `> Use with PPT Master (local). Save as \`tools/ppt-master-adgm/projects/adgm-command-centre/sources/deck-source.md\`.`,
    ``,
  ];

  if (extraNotes.trim()) {
    lines.push(`## Briefing intent`, extraNotes.trim(), ``);
  }

  if (!conversation?.messages?.length) {
    lines.push(`## Content`, `_No conversation selected — add notes above or export from chat after a reply._`, ``);
    return lines.join('\n');
  }

  lines.push(`## Thread: ${conversation.title}`, `_Updated ${conversation.updatedAt}_`, ``);

  for (const m of conversation.messages) {
    const label = m.role === 'user' ? 'CSO question' : 'Personal AI answer';
    lines.push(`### ${label}`, '', m.content.trim(), '');
  }

  lines.push(
    `## Deck instructions (for PPT Master)`,
    `- Format: PowerPoint 16:9`,
    `- Style: ADGM executive — navy #00092a, accent #0087ff, clean typography`,
    `- Audience: ${EXECUTIVE_USER.fullName}, CSO`,
    `- Include: title, 3–5 insight slides, one comparison or metrics table, closing "Do this" slide`,
    `- Cite demo data handles where used (KB-, ACT-, CAL-, MKT-)`,
    ``,
  );

  return lines.join('\n');
}

export function downloadDeckSourceMarkdown(markdown: string, filename = 'adgm-deck-source.md') {
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const PPT_MASTER_CURSOR_PROMPT = `Read tools/ppt-master/skills/ppt-master/SKILL.md (run npm run ppt-master:setup first if missing).

Create a native editable PowerPoint from:
tools/ppt-master-adgm/projects/adgm-command-centre/sources/deck-source.md

Design: ADGM Command Centre — navy #00092a, Clearsky #0087ff, executive board deck, 16:9.
Audience: ${EXECUTIVE_USER.fullName}, Chief Strategy Officer, ADGM.
Confirm the eight design spec items with me, then run the full PPT Master pipeline.`;

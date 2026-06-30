import type { PresentationDeck, PresentationOutline } from '../types/presentation';
import { ADGM_BRAND } from '../config/brand';
import { ADGM_PPT_FOOTER } from '../config/adgmBrandForDeck';

export function buildPresentationMarkdown(
  deck: PresentationDeck,
  outline?: PresentationOutline | null,
  options?: { includeSpeakerNotes?: boolean },
): string {
  const notes = options?.includeSpeakerNotes !== false;
  const lines: string[] = [
    `# ${deck.title}`,
    ``,
    `**Theme:** ${deck.theme} · **ADGM Brand Book ${ADGM_BRAND.version}** + unified craft (McKinsey + Open Design + Executive Design + PPT Master) · 16:9`,
    ``,
  ];

  if (outline?.storyline) {
    lines.push(`**Storyline:** ${outline.storyline}`, ``);
  }

  if (deck.brandCheck?.length) {
    lines.push(`## Brand consistency`, ...deck.brandCheck.map((b) => `- ${b}`), ``);
  }

  deck.slides.forEach((s, i) => {
    lines.push(`## Slide ${i + 1}: ${s.title}`, `*Type: ${s.type}*`, ``);
    if (s.bullets?.length) {
      lines.push(...s.bullets.map((b) => `- ${b}`), ``);
    }
    if (s.metrics?.length) {
      lines.push(`| Metric | Value |`, `|--------|-------|`, ...s.metrics.map((m) => `| ${m.label} | ${m.value} |`), ``);
    }
    if (s.visualHint) lines.push(`**Visual:** ${s.visualHint}`, ``);
    if (notes && s.speakerNotes) lines.push(`**Speaker notes:** ${s.speakerNotes}`, ``);
  });

  lines.push(
    `---`,
    `Craft: docs/brand-2025/PPT-BRAND-RULES.md · tools/claude-design-ai/DESIGN-FOR-DECKS.md · PPT Master · in-app .pptx export.`,
    `Brand: Clearsky ${ADGM_BRAND.primary.clearsky}, navy ${ADGM_BRAND.navy.DEFAULT}, footer "${ADGM_PPT_FOOTER}".`,
    ``,
  );
  return lines.join('\n');
}

export function downloadTextFile(content: string, filename: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadDeckJson(deck: PresentationDeck) {
  downloadTextFile(JSON.stringify(deck, null, 2), 'adgm-presentation-deck.json', 'application/json');
}

export function downloadDeckMarkdown(deck: PresentationDeck, outline?: PresentationOutline | null, speakerNotes = true) {
  downloadTextFile(
    buildPresentationMarkdown(deck, outline, { includeSpeakerNotes: speakerNotes }),
    'adgm-presentation-deck.md',
    'text/markdown;charset=utf-8',
  );
}

export function printDeckPdfPreview() {
  window.print();
}

export { downloadDeckPptx } from './presentationPptxExport';
export type { PptxExportOptions } from './presentationPptxExport';
export { downloadDeckHtml, buildPresentationHtmlDeck } from './presentationHtmlDeckExport';

export {
  PPT_MASTER_CURSOR_PROMPT,
  CLAUDE_DESIGN_CURSOR_PROMPT,
  UNIFIED_PPT_CURSOR_PROMPT,
} from './exportDeckSource';

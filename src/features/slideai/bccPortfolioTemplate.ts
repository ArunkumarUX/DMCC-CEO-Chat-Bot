/**
 * BCC Senior Service Designer Portfolio — canonical look & feel
 * Extracted from: Senior Service Designer - BCC Portfolio - WITH SPEAKER NOTES.pptx
 * Builder reference: build_bcc_portfolio_pptx.py (Service Design)
 */

export const BCC_PORTFOLIO_SOURCE =
  'Senior Service Designer - BCC Portfolio - WITH SPEAKER NOTES.pptx';

/** pptxgenjs / JSON theme — hex without # */
export const BCC_PORTFOLIO_COLORS = {
  navy: '0B1F3A',
  navy2: '0E2A4E',
  navyLayer: '163861',
  ink: '152A44',
  inkSoft: '52647C',
  inkFaint: '8493A6',
  paper: 'F4F7FB',
  white: 'FFFFFF',
  civic: '2A6DB5',
  bcc: '9F00A7',
  bccLight: 'CF57D6',
  goldLight: 'E0C074',
  hands: '159C8C',
  luna: '2566A8',
  mlink: 'B4574E',
  lightBlue: 'BCD0EA',
  mutedBlue: 'AEBFD4',
  line: 'D7E1ED',
  kpiFill: 'E8F0FA',
} as const;

export const BCC_PORTFOLIO_TYPOGRAPHY = {
  display: 'Calibri Light',
  body: 'Calibri',
  mono: 'Consolas',
  kicker: { sizePt: 14, weight: 'bold', transform: 'uppercase', letterSpacing: 'wide' },
  title: { sizePt: 34, weight: 'bold', maxWords: 12 },
  lead: { sizePt: 20, color: 'lightBlue' },
  bodyText: { sizePt: 17, color: 'inkSoft' },
  bullet: { sizePt: 18, maxItems: 6 },
  quote: { sizePt: 20, style: 'italic', font: 'Calibri Light' },
} as const;

/** Default deck theme for SlideAI — BCC portfolio first */
export const BCC_PORTFOLIO_DECK_THEME = {
  bg: BCC_PORTFOLIO_COLORS.paper,
  darkBg: BCC_PORTFOLIO_COLORS.navy,
  text: BCC_PORTFOLIO_COLORS.ink,
  accent: BCC_PORTFOLIO_COLORS.bcc,
  secondaryAccent: BCC_PORTFOLIO_COLORS.civic,
  font: BCC_PORTFOLIO_TYPOGRAPHY.display,
  fontBody: BCC_PORTFOLIO_TYPOGRAPHY.body,
  tagline: 'Forward',
} as const;

/** Section accent colours for case-study / chapter slides */
export const BCC_SECTION_ACCENTS = {
  default: BCC_PORTFOLIO_COLORS.civic,
  hands: BCC_PORTFOLIO_COLORS.hands,
  luna: BCC_PORTFOLIO_COLORS.luna,
  mlink: BCC_PORTFOLIO_COLORS.mlink,
  bcc: BCC_PORTFOLIO_COLORS.bcc,
  synthesis: BCC_PORTFOLIO_COLORS.bcc,
} as const;

export const BCC_PORTFOLIO_LAYOUT_RULES = {
  aspect: '16:9',
  sandwich: 'Dark navy for cover, case dividers, and closing. Light paper (#F4F7FB) for content slides.',
  lockup:
    'Top-left: 6px vertical bar in bccLight (#CF57D6), org name in white/navy, italic tagline "Forward" in goldLight on dark slides',
  margin: '0.55in horizontal — generous left-aligned content column; image/exhibit right when present',
  kicker: 'Small uppercase label above title — accent bcc or bccLight on dark slides',
  stageStrip:
    'Case study slides: 5-stage strip at top — "1. Context · 2. Role & methods · 3. Insights · 4. Sharing & impact · 5. Reflection" with active stage marked ▸',
  chips: 'Topic chips in lightBlue on dark slides, dot-separated on light slides',
  cards: 'Rounded rectangles with navy2 fill on dark synthesis slides; white fill + line border on structure slides',
  imagePanel: 'Right column exhibit ~5.6in wide, rounded, full-bleed photo when imagePrompt provided',
} as const;

export const BCC_SPEAKER_NOTES_STYLE = `
Speaker notes style (from BCC portfolio):
- Start with "SLIDE N · LABEL (~Xs)" timing hint
- Conversational, spoken rhythm — written to be presented, not read verbatim
- Use [pause] markers for emphasis and breathing room
- Include transition sentence to next slide at the end
- 2–4 short paragraphs per slide; signpost structure ("Stage one — context")
- Honest about evidence limits where relevant
`.trim();

/** Injected into Claude system prompt — default visual language for SlideAI */
export const BCC_PORTFOLIO_TEMPLATE_PROMPT = `
DEFAULT VISUAL TEMPLATE (apply first unless user explicitly requests ADGM branding):
Source: ${BCC_PORTFOLIO_SOURCE} — BCC Senior Service Designer portfolio look & feel.

COLOUR PALETTE (hex without # — use exactly):
- Dark slides: navy ${BCC_PORTFOLIO_COLORS.navy}, navy2 ${BCC_PORTFOLIO_COLORS.navy2}
- Light slides: paper ${BCC_PORTFOLIO_COLORS.paper}
- Text: ink ${BCC_PORTFOLIO_COLORS.ink}, inkSoft ${BCC_PORTFOLIO_COLORS.inkSoft}, inkFaint ${BCC_PORTFOLIO_COLORS.inkFaint}
- Primary accent: bcc ${BCC_PORTFOLIO_COLORS.bcc}, bccLight ${BCC_PORTFOLIO_COLORS.bccLight} on dark backgrounds
- Secondary: civic ${BCC_PORTFOLIO_COLORS.civic}, goldLight ${BCC_PORTFOLIO_COLORS.goldLight}
- Section accents (case chapters): hands ${BCC_PORTFOLIO_COLORS.hands}, luna ${BCC_PORTFOLIO_COLORS.luna}, mlink ${BCC_PORTFOLIO_COLORS.mlink}
- Muted text on dark: lightBlue ${BCC_PORTFOLIO_COLORS.lightBlue}, mutedBlue ${BCC_PORTFOLIO_COLORS.mutedBlue}

TYPOGRAPHY:
- Display/titles: ${BCC_PORTFOLIO_TYPOGRAPHY.display} — bold, large (34pt cover, 28pt long titles)
- Body/bullets: ${BCC_PORTFOLIO_TYPOGRAPHY.body}
- Kickers: uppercase, 14pt, bold, accent colour
- Quotes: ${BCC_PORTFOLIO_TYPOGRAPHY.quote.font}, italic, 20pt

LAYOUT PATTERNS:
- ${BCC_PORTFOLIO_LAYOUT_RULES.sandwich}
- ${BCC_PORTFOLIO_LAYOUT_RULES.lockup}
- ${BCC_PORTFOLIO_LAYOUT_RULES.kicker}
- ${BCC_PORTFOLIO_LAYOUT_RULES.stageStrip}
- Content: left text column + optional right image/exhibit panel
- Structure/process slides: horizontal card row with numbered rounded rectangles
- Synthesis slides: comparison table with case names colour-coded by section accent

DEFAULT deck.theme:
{
  "bg": "${BCC_PORTFOLIO_DECK_THEME.bg}",
  "darkBg": "${BCC_PORTFOLIO_DECK_THEME.darkBg}",
  "text": "${BCC_PORTFOLIO_DECK_THEME.text}",
  "accent": "${BCC_PORTFOLIO_DECK_THEME.accent}",
  "secondaryAccent": "${BCC_PORTFOLIO_DECK_THEME.secondaryAccent}",
  "font": "${BCC_PORTFOLIO_DECK_THEME.font}",
  "fontBody": "${BCC_PORTFOLIO_DECK_THEME.fontBody}",
  "tagline": "${BCC_PORTFOLIO_DECK_THEME.tagline}"
}

Set useDarkBg: true on cover, case dividers, closing, and quote slides.
Use eyebrow for kickers (e.g. "CASE 01 · HANDS", "IN CLOSING", "HOW TO FOLLOW THIS").
${BCC_SPEAKER_NOTES_STYLE}

Override: If user says "ADGM brand" or "ADGM board pack", switch to ADGM Brand Book 2025 instead.
`.trim();

/** CSS custom properties for SlideAI preview */
export function bccPortfolioCssVars(): Record<string, string> {
  return {
    '--bcc-navy': `#${BCC_PORTFOLIO_COLORS.navy}`,
    '--bcc-navy2': `#${BCC_PORTFOLIO_COLORS.navy2}`,
    '--bcc-paper': `#${BCC_PORTFOLIO_COLORS.paper}`,
    '--bcc-ink': `#${BCC_PORTFOLIO_COLORS.ink}`,
    '--bcc-ink-soft': `#${BCC_PORTFOLIO_COLORS.inkSoft}`,
    '--bcc-accent': `#${BCC_PORTFOLIO_COLORS.bcc}`,
    '--bcc-accent-light': `#${BCC_PORTFOLIO_COLORS.bccLight}`,
    '--bcc-civic': `#${BCC_PORTFOLIO_COLORS.civic}`,
    '--bcc-light-blue': `#${BCC_PORTFOLIO_COLORS.lightBlue}`,
    '--bcc-muted-blue': `#${BCC_PORTFOLIO_COLORS.mutedBlue}`,
    '--bcc-gold': `#${BCC_PORTFOLIO_COLORS.goldLight}`,
    '--slide-accent': `#${BCC_PORTFOLIO_COLORS.bcc}`,
  };
}

export function userRequestsAdgmBrand(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes('adgm brand') ||
    lower.includes('adgm board') ||
    lower.includes('brand book 2025') ||
    lower.includes('adgm executive') ||
    /\badgm\b/.test(lower)
  );
}

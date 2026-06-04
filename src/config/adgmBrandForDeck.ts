/**
 * ADGM Brand Book 2025 — mandatory rules for all Presentation Builder exports.
 * @see docs/brand-2025/TOKENS.md
 * @see docs/brand-2025/PPT-BRAND-RULES.md
 */
import { ADGM_BRAND } from './brand';

/** pptxgenjs colours — no # prefix */
export const ADGM_PPT_COLORS = {
  navy: ADGM_BRAND.navy.DEFAULT.replace('#', ''),
  navyMid: ADGM_BRAND.navy.mid.replace('#', ''),
  navyDeep: ADGM_BRAND.navy.deep.replace('#', ''),
  accent: ADGM_BRAND.primary.clearsky.replace('#', ''),
  accentGlow: ADGM_BRAND.blue[400].replace('#', ''),
  accentSoft: ADGM_BRAND.blue[100].replace('#', ''),
  cyan: ADGM_BRAND.primary.cyan.replace('#', ''),
  slate: ADGM_BRAND.primary.slate.replace('#', ''),
  royal: ADGM_BRAND.secondary.royal.replace('#', ''),
  mint: ADGM_BRAND.secondary.mint.replace('#', ''),
  sand: ADGM_BRAND.secondary.sand.replace('#', ''),
  paper: ADGM_BRAND.surface.white.replace('#', ''),
  paperSoft: ADGM_BRAND.neutral[50].replace('#', ''),
  ink: ADGM_BRAND.navy.DEFAULT.replace('#', ''),
  inkMuted: ADGM_BRAND.neutral[500].replace('#', ''),
  inkLight: ADGM_BRAND.primary.slate.replace('#', ''),
  white: 'FFFFFF',
  line: ADGM_BRAND.neutral[200].replace('#', ''),
  hairline: ADGM_BRAND.neutral[100].replace('#', ''),
  tableHead: ADGM_BRAND.navy.mid.replace('#', ''),
  kpiFill: ADGM_BRAND.blue[100].replace('#', ''),
  kpiFillDeep: ADGM_BRAND.blue[50].replace('#', ''),
  insightBar: ADGM_BRAND.primary.clearsky.replace('#', ''),
} as const;

/** Brand Book 2025 typography for PowerPoint (Gilroy → Aptos fallback on export) */
export const ADGM_PPT_FONTS = {
  display: 'Gilroy',
  body: 'Aptos',
  mono: 'Consolas',
  arabic: 'Madani Arabic',
} as const;

export const ADGM_PPT_FOOTER = `ADGM · ${ADGM_BRAND.tagline} · Confidential`;

export const ADGM_PPT_LOGO_LABEL = ADGM_BRAND.logoAlt;

/** Mandatory brandCheck items — always merge into generated decks */
export const ADGM_DEFAULT_BRAND_CHECK = [
  `ADGM Brand Book ${ADGM_BRAND.version}: Clearsky ${ADGM_BRAND.primary.clearsky} + navy ${ADGM_BRAND.navy.DEFAULT}`,
  `Typography: Gilroy display / Aptos body · 16:9 widescreen`,
  `Naming: "ADGM" only on slides (not spelled-out legal name in marketing style)`,
  `Surfaces: white canvas, mint ${ADGM_BRAND.secondary.mint} or cyan ${ADGM_BRAND.primary.cyan} accents only`,
  `Tagline "${ADGM_BRAND.tagline}" on title or closing slide where appropriate`,
] as const;

export function mergeBrandCheck(existing?: string[]): string[] {
  const set = new Set<string>([...ADGM_DEFAULT_BRAND_CHECK]);
  (existing || []).forEach((item) => set.add(item));
  return [...set];
}

/** CSS custom properties for HTML deck export */
export function adgmDeckCssVars(): Record<string, string> {
  return {
    '--navy': ADGM_BRAND.navy.DEFAULT,
    '--navy-mid': ADGM_BRAND.navy.mid,
    '--navy-deep': ADGM_BRAND.navy.deep,
    '--accent': ADGM_BRAND.primary.clearsky,
    '--accent-glow': ADGM_BRAND.blue[400],
    '--accent-soft': ADGM_BRAND.blue[100],
    '--cyan': ADGM_BRAND.primary.cyan,
    '--slate': ADGM_BRAND.primary.slate,
    '--mint': ADGM_BRAND.secondary.mint,
    '--sand': ADGM_BRAND.secondary.sand,
    '--paper': ADGM_BRAND.surface.white,
    '--paper-soft': ADGM_BRAND.neutral[50],
    '--ink': ADGM_BRAND.navy.DEFAULT,
    '--ink-muted': ADGM_BRAND.neutral[500],
    '--line': ADGM_BRAND.neutral[200],
    '--font-display': ADGM_BRAND.typography.display,
    '--font-body': ADGM_BRAND.typography.secondary,
  };
}

/** System-prompt block — keep in sync with server/adgmBrandGuidelines.mjs */
export const ADGM_PPT_BRAND_PROMPT = `
ADGM Brand Book 2025 (MANDATORY — always apply):
- Tagline: "${ADGM_BRAND.tagline}" · Short name: ADGM only on slides
- Primary: Clearsky ${ADGM_BRAND.primary.clearsky}, Slate ${ADGM_BRAND.primary.slate}, Cyan ${ADGM_BRAND.primary.cyan}
- Secondary: Royal ${ADGM_BRAND.secondary.royal}, Mint ${ADGM_BRAND.secondary.mint}, Sand ${ADGM_BRAND.secondary.sand}
- Navy headers/text: ${ADGM_BRAND.navy.DEFAULT}, mid ${ADGM_BRAND.navy.mid}, deep ${ADGM_BRAND.navy.deep}
- Typography: Gilroy (display/headlines), Aptos (body), Madani Arabic for Arabic content
- Layout: 16:9 widescreen, white surfaces, Clearsky for CTAs/highlights only (not full-slide fills except title hero)
- Footer: "${ADGM_PPT_FOOTER}"
- brandCheck[] MUST include compliance with Brand Book 2025 colours and typography
- Do NOT use off-brand purples, generic blues, or non-ADGM gradients
`.trim();

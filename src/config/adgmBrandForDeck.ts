/**
 * Apparel Group brand rules for all Presentation Builder exports.
 * @see src/config/apparelGroupGuidelines.ts
 */
import { ADGM_BRAND } from './brand';
import {
  APPAREL_GROUP_BRAND,
  APPAREL_GROUP_DECK_FOOTER,
  APPAREL_GROUP_DECK_BRAND_PROMPT,
} from './apparelGroupGuidelines';

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

export const ADGM_PPT_FONTS = {
  display: 'Gotham',
  body: 'Gotham',
  mono: 'Consolas',
  arabic: 'Noto Naskh Arabic',
} as const;

export const ADGM_PPT_FOOTER = APPAREL_GROUP_DECK_FOOTER;

export const ADGM_PPT_LOGO_LABEL = ADGM_BRAND.logoAlt;

export const ADGM_DEFAULT_BRAND_CHECK = [
  `Apparel Group Executive Standard: Navy ${APPAREL_GROUP_BRAND.colors.navy} + Lime ${APPAREL_GROUP_BRAND.colors.lime}`,
  `Typography: Gotham display/body · 16:9 widescreen`,
  `Naming: "Apparel Group" on title/close; portfolio (R&B, 6thStreet, Club Apparel, Nysaa) on relevant slides`,
  `Surfaces: white canvas, #F4F7F9 section backgrounds, navy headings, lime accents`,
  `Tagline "${ADGM_BRAND.tagline}" on title or closing slide where appropriate`,
] as const;

export function mergeBrandCheck(existing?: string[]): string[] {
  const set = new Set<string>([...ADGM_DEFAULT_BRAND_CHECK]);
  (existing || []).forEach((item) => set.add(item));
  return [...set];
}

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

export const ADGM_PPT_BRAND_PROMPT = APPAREL_GROUP_DECK_BRAND_PROMPT;

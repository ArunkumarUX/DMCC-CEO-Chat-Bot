/**
 * ADGM Brand Book 2025 — server-side deck rules (keep aligned with src/config/adgmBrandForDeck.ts)
 * @see docs/brand-2025/PPT-BRAND-RULES.md
 */

export const ADGM_BRAND_VERSION = '2025';
export const ADGM_TAGLINE = 'Path to Forward';

export const ADGM_DEFAULT_BRAND_CHECK = [
  'ADGM Brand Book 2025: Clearsky #0087FF + navy #00092A',
  'Typography: Gilroy display / Aptos body · 16:9 widescreen',
  'Naming: ADGM only on slides (marketing style)',
  'Surfaces: white canvas, mint #E5F0F0 or cyan #AFFAFF accents only',
  'Tagline "Path to Forward" on title or closing slide where appropriate',
];

export const ADGM_PPT_BRAND_PROMPT = `ADGM Brand Book 2025 (MANDATORY — always apply):
- Tagline: "Path to Forward" · Short name: ADGM only on slides
- Primary: Clearsky #0087FF, Slate #A3ADC2, Cyan #AFFAFF
- Secondary: Royal #002ED1, Mint #E5F0F0, Sand #F0E8D8
- Navy headers/text: #00092A, mid #001C7D, deep #002ED1
- Typography: Gilroy (display/headlines), Aptos (body), Madani Arabic for Arabic
- Layout: 16:9 widescreen, white surfaces, Clearsky for accents/highlights (title hero may be full navy)
- Footer tone: "ADGM · Path to Forward · Confidential"
- brandCheck[] MUST confirm Brand Book 2025 compliance
- Do NOT use off-brand purples, generic template blues, or non-ADGM palettes`;

export function mergeBrandCheck(existing) {
  const set = new Set([...ADGM_DEFAULT_BRAND_CHECK]);
  (existing || []).forEach((item) => set.add(item));
  return [...set];
}

export function applyBrandToDeck(deck) {
  if (!deck || typeof deck !== 'object') return deck;
  return {
    ...deck,
    theme: deck.theme || 'adgm-brand-2025',
    brandCheck: mergeBrandCheck(deck.brandCheck),
  };
}

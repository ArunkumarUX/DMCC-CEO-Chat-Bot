/**
 * DMCC brand rules for Presentation Builder (server).
 * Keep aligned with src/config/adgmBrandForDeck.ts and src/config/dmccGuidelines.ts
 */

export const ADGM_BRAND_VERSION = '2026';
export const ADGM_TAGLINE = 'Where the world does business';

export const ADGM_DEFAULT_BRAND_CHECK = [
  'DMCC Executive Standard: Navy #0B1F3A + Sapphire #0F52BA + Gold #C9A84C',
  'Typography: Gotham display/body · 16:9 widescreen',
  'Naming: "DMCC" on title/close; ecosystems (Gold, Diamonds, Crypto, Tea/Coffee) on relevant slides',
  'Surfaces: white canvas, light grey sections, navy headings, gold accents',
  'Tagline "Where the world does business" on title or closing slide where appropriate',
  'Content must be DMCC free-zone / commodities trade — never Apparel retail or ADGM banking content unless requested',
];

export const ADGM_PPT_BRAND_PROMPT = `DMCC Executive Deck Standard (MANDATORY — always apply):
- Organisation: DMCC (Dubai Multi Commodities Centre) · CEO: Ahmed Bin Sulayem
- Tagline: "Where the world does business"
- Scale: 26,000+ member companies · 180+ countries · 900+ licensed activities · 87 towers (JLT & Uptown Dubai)
- Ecosystems: Gold & Precious Metals, Diamonds, Lab-grown diamonds, Tea, Coffee, Cacao, Crypto (DMCC Cyber), AI, Gaming, Energy, FinX, Maritime
- Palette: Navy #0B1F3A, Sapphire #0F52BA, Gold #C9A84C, Pink CTA #E21F7B (sparingly), Canvas #EEF3F6, Body ink #0B1F3A
- Typography: Gotham (display/body), Noto Naskh Arabic for Arabic
- Layout: 16:9 widescreen, white / light grey surfaces, navy headers, gold accents
- Footer: "DMCC · Where the world does business · Confidential"
- brandCheck[] MUST confirm DMCC executive standard compliance
- Do NOT use ADGM "Path to Forward", Clearsky #0087FF, Apparel Group navy/lime, retail store metrics, or fashion brand portfolios unless the user explicitly asks`;

export function mergeBrandCheck(existing) {
  const set = new Set([...ADGM_DEFAULT_BRAND_CHECK]);
  (existing || []).forEach((item) => set.add(item));
  return [...set];
}

export function applyBrandToDeck(deck) {
  if (!deck || typeof deck !== 'object') return deck;
  return {
    ...deck,
    theme: deck.theme || 'dmcc-executive',
    brandCheck: mergeBrandCheck(deck.brandCheck),
  };
}

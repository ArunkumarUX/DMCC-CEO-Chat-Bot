# ADGM Brand Book 2025 — PowerPoint rules

**Mandatory for all decks** from Create PPT, PPT Master, Open Design, and Claude Design exports.

Source: `ADGM Brand Book_2025.pdf` · Implemented in `src/config/brand.ts` and `src/config/adgmBrandForDeck.ts`

## Identity

| Rule | Value |
|------|--------|
| Short name on slides | **ADGM** (not “Abu Dhabi Global Market” in marketing-style slides) |
| Tagline | **Path to Forward** — title or closing slide |
| Aspect ratio | **16:9** widescreen only |

## Colour (never substitute)

| Token | Hex | PPT use |
|-------|-----|---------|
| Clearsky | `#0087FF` | Accent bar, KPI highlights, links, active elements |
| Navy | `#00092A` | Title hero, headers, primary text |
| Navy mid | `#001C7D` | Header gradient, table heads |
| Royal | `#002ED1` | Depth in gradients only |
| Slate | `#A3ADC2` | Muted labels, secondary text |
| Cyan | `#AFFAFF` | Light highlight panels |
| Mint | `#E5F0F0` | Soft KPI / callout backgrounds |
| Sand | `#F0E8D8` | Warm accent (sparingly) |
| White | `#FFFFFF` | Content canvas |

**Do not use:** random blues, purple gradients, stock-template palettes.

## Typography

| Role | Font | Weights |
|------|------|---------|
| Headlines | **Gilroy** | SemiBold (600) |
| Body | **Aptos** (fallback Calibri in .pptx) | Regular / Medium |
| Arabic | **Madani Arabic** | Medium |

Letter-spacing on body: ~0.4px where supported.

## Slide chrome

- **Header bar:** navy → navy-mid gradient + 3px Clearsky rule
- **Logo area:** “ADGM” wordmark treatment (text until logo asset embedded)
- **Footer:** `ADGM · Path to Forward · Confidential` + slide number
- **Action title:** left Clearsky bar (4–5px)

## Content rules

- McKinsey action titles (insight sentences)
- Max 4 bullets × 12 words
- KPI numerics in Clearsky or navy — never red/green unless semantic status
- Exhibits: bordered panel, mint or cyan-soft fill

## Code references

- Colours/fonts: `src/config/adgmBrandForDeck.ts`
- AI prompt: `server/adgmBrandGuidelines.mjs`
- PPTX: `src/utils/presentationPptxExport.ts`
- HTML: `src/utils/presentationHtmlDeckExport.ts`

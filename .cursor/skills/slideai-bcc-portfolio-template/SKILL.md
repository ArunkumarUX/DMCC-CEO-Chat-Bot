---
name: slideai-bcc-portfolio-template
description: >-
  Default SlideAI deck look & feel from the BCC Senior Service Designer portfolio
  PPTX. Use when generating, refining, or exporting SlideAI decks unless the
  user explicitly requests ADGM Brand Book 2025 styling.
---

# BCC Portfolio Template — SlideAI default

**Canonical source:** `docs/templates/BCC-Portfolio-Template-With-Speaker-Notes.pptx`  
**Tokens:** `src/features/slideai/bccPortfolioTemplate.ts`  
**System prompt:** `BCC_PORTFOLIO_TEMPLATE_PROMPT` in `src/features/slideai/prompts.ts`

## When to apply (first priority)

Apply this template **before** any other deck style when:

- User uses SlideAI (`/create-ppt`) to generate or refine a deck
- User asks for portfolio, case study, service design, or civic presentation style
- No explicit "ADGM brand" / "ADGM board pack" override in the prompt

## When NOT to apply

Switch to ADGM Brand Book 2025 only when user explicitly says:

- "ADGM brand", "ADGM board pack", "Brand Book 2025", or similar

## Look & feel summary

| Element | Value |
|---------|--------|
| Dark bg | `#0B1F3A` navy |
| Light bg | `#F4F7FB` paper |
| Primary accent | `#9F00A7` BCC purple |
| Accent on dark | `#CF57D6` bccLight |
| Secondary | `#2A6DB5` civic, `#E0C074` goldLight |
| Section accents | HANDS `#159C8C`, Luna `#2566A8`, MaternLink `#B4574E` |
| Typography | Calibri Light (titles), Calibri (body) |
| Pattern | Dark cover/dividers/closing · light content sandwich |
| Lockup | Vertical bccLight bar + org name + italic "Forward" tagline |
| Kickers | Uppercase eyebrow above title (e.g. `CASE 01 · HANDS`) |
| Case slides | 5-stage strip: Context → Role → Insights → Impact → Reflection |
| Speaker notes | Conversational, `[pause]` markers, `SLIDE N · LABEL (~Xs)` header |

## Agent workflow

1. Read `src/features/slideai/bccPortfolioTemplate.ts`
2. Inject `BCC_PORTFOLIO_TEMPLATE_PROMPT` into Claude system context (already in `prompts.ts`)
3. Default `deck.theme` to `BCC_PORTFOLIO_DECK_THEME`
4. Preview uses `bccPortfolioCssVars()` on `.cc-slideai`
5. Export `.pptx` with BCC colours unless ADGM override active

## Reference files

- Template PPTX: `docs/templates/BCC-Portfolio-Template-With-Speaker-Notes.pptx`
- Builder script (colour extraction): `Downloads/Service Design/build_bcc_portfolio_pptx.py`
- Design guide: `docs/SLIDEAI-DESIGN-GUIDE.md`

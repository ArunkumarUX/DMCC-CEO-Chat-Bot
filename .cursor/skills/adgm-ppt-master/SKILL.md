---
name: adgm-ppt-master
description: >-
  Unified ADGM board deck creation using ALL shared skills: McKinsey storyline,
  Open Design html-ppt/Swiss grid, Claude Design craft, PPT Master native pptx.
  Use for any PPT, deck, slides, board pack, or presentation export from this repo.
---

# ADGM PPT Master — all skills unified

**Read first:** `docs/brand-2025/PPT-BRAND-RULES.md` · `tools/adgm-deck-craft/MASTER.md`

## Brand (always first)

ADGM Brand Book 2025 is **mandatory** on every deck:
- Tokens: `src/config/adgmBrandForDeck.ts`
- Footer: `ADGM · Path to Forward · Confidential`
- Gilroy/Aptos · Clearsky `#0087FF` · navy `#00092A`

## Skill stack (use together — never one in isolation)

1. **ADGM Brand Book 2025** — `docs/brand-2025/PPT-BRAND-RULES.md`
2. **MASTER craft** — `tools/adgm-deck-craft/MASTER.md` (wow bar, tokens, layouts)
3. **McKinsey** — action titles, MECE, hypothesis-led (`server/presentationBuilderPrompts.mjs`)
4. **Open Design** — `npm run open-design:setup` → `deck-swiss-international`, `html-ppt`
5. **Claude Design** — `tools/claude-design-ai/DESIGN-FOR-DECKS.md`
6. **PPT Master** — `npm run ppt-master:setup` → `tools/ppt-master/skills/ppt-master/SKILL.md`

Child skills (reference only — this master supersedes):

- `.cursor/skills/adgm-open-design-deck/`
- `.cursor/skills/adgm-claude-design-ppt/`
- `.cursor/skills/adgm-ppt-deck/`

## In-app (fastest)

```bash
# .env.local
VITE_ENABLE_PPT_MASTER=true
npm run dev
# → Create PPT → Export
```

| Export | Quality |
|--------|---------|
| **PowerPoint (.pptx)** | Unified wow layouts in `presentationPptxExport.ts` |
| **HTML deck** | Premium animated deck in `presentationHtmlDeckExport.ts` |
| **Copy unified prompt** | Export step → applies all skills in Cursor |

## Agent workflow

```
1. Read tools/adgm-deck-craft/MASTER.md
2. Read tools/claude-design-ai/DESIGN-FOR-DECKS.md
3. Read tools/open-design/design-templates/html-ppt/SKILL.md (if present)
4. Read tools/ppt-master/skills/ppt-master/SKILL.md (if native pptx needed)
5. Source: app-exported Markdown or deck-source.md
6. Enforce action titles + wow checklist
7. Deliver: .pptx (in-app or PPT Master) and/or premium HTML
```

## Wow standards (non-negotiable)

- Title slide must feel **premium** (navy hero, accent beam, thesis line)
- Content slides: **left accent bar** + action title + exhibit or KPI
- No topic-label titles; no walls of text; no generic clip-art language
- ADGM Brand Book 2025 footer every slide: `ADGM · Path to Forward · Confidential`

## Docs

- `docs/ADGM-PPT-MASTER.md`
- `docs/OPEN-DESIGN-DECK.md` · `docs/CLAUDE-DESIGN-PPT.md` · `docs/PPT-MASTER-LOCAL.md`

---
name: adgm-open-design-deck
description: >-
  Upgrade ADGM Command Centre decks to McKinsey / Open Design quality using
  nexu-io/open-design deck skills (deck-swiss-international, html-ppt).
  Use when exporting PPT, polishing slides, or generating board packs from
  personal-ai-chat Presentation Builder.
---

# ADGM deck — Open Design + McKinsey craft

> **Unified master (all skills):** `.cursor/skills/adgm-ppt-master/SKILL.md`

## Setup (once)

```bash
cd personal-ai-chat
npm run open-design:setup
```

Clones [open-design](https://github.com/nexu-io/open-design) into `tools/open-design/` (gitignored).

## In-app export (fastest)

1. `VITE_ENABLE_PPT_MASTER=true` in `.env.local` → **Create PPT** wizard
2. **Export → PowerPoint (.pptx)** — McKinsey layouts (action titles, KPI towers, exhibit panels) via pptxgenjs
3. **Export → HTML deck** — Swiss-grid consulting HTML; open in browser, ←/→ navigate, print to PDF

## Agent polish (world-class)

Read these Open Design skills before editing deck content or layouts:

1. `tools/open-design/skills/deck-swiss-international/SKILL.md` — 16-column grid, action titles, KPI tower (S06), locked layouts
2. `tools/open-design/design-templates/html-ppt/SKILL.md` — html-ppt studio; themes `corporate-clean`, `swiss-grid`, `pitch-deck-vc`

### McKinsey rules (enforce on every slide)

- **Action titles** — headline = insight sentence, not topic label
- **MECE** — no overlap between slides
- **≤4 bullets**, ≤12 words each
- **Exhibit** — chart described in `visualHint`; data in `metrics` when type is `data-metrics`
- **ADGM brand** — navy `#00092a`, accent `#0087ff`, confidential footer

### Workflow from exported Markdown

```text
Presentation Builder → Export Markdown
  → save as tools/ppt-master-adgm/.../deck-source.md (optional PPT Master .pptx)
  → OR regenerate HTML deck with html-ppt skill + ADGM tokens
  → OR refine .pptx copy in PowerPoint using action-title checklist
```

### Regenerate HTML deck (Open Design path)

```
Read tools/open-design/design-templates/html-ppt/SKILL.md.
Rebuild an ADGM board deck from [deck markdown path].
Theme: corporate-clean with ADGM navy #00092a and accent #0087ff.
Use action titles, KPI layouts for metrics slides, keyboard navigation.
Output single index.html in the project exports folder.
```

## Related skill

- **`.cursor/skills/adgm-claude-design-ppt/`** — [Claude-Code-Design-AI](https://github.com/mikesheehan54/Claude-Code-Design-AI) deck craft (`tools/claude-design-ai/DESIGN-FOR-DECKS.md`)

## References

- App prompts: `server/presentationBuilderPrompts.mjs`
- PPTX engine: `src/utils/presentationPptxExport.ts` + `mckinseyDeckDesign.ts`
- HTML engine: `src/utils/presentationHtmlDeckExport.ts`
- Docs: `docs/OPEN-DESIGN-DECK.md`

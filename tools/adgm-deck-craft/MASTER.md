# ADGM Deck Craft — unified master (all skills)

**Always apply this file** when creating or exporting PPT for ADGM Command Centre.

**Brand source of truth (mandatory):** `docs/brand-2025/PPT-BRAND-RULES.md` · `src/config/adgmBrandForDeck.ts` · ADGM Brand Book 2025

It merges:

| Skill | Source | Role |
|-------|--------|------|
| **ADGM Brand Book 2025** | `src/config/brand.ts` | Colours, Gilroy/Aptos, tagline, footer — always first |
| **McKinsey** | In-app prompts + `mckinseyDeckDesign.ts` | Action titles, MECE, board storyline |
| **Open Design** | [nexu-io/open-design](https://github.com/nexu-io/open-design) | Swiss grid, html-ppt, KPI towers, exhibits |
| **Claude Design** | [Claude-Code-Design-AI](https://github.com/mikesheehan54/Claude-Code-Design-AI) | Low cognitive load, Artifacts-quality panels |
| **PPT Master** | [ppt-master](https://github.com/hugohe3/ppt-master) | Native editable `.pptx` agent pipeline |

Cursor entry point: `.cursor/skills/adgm-ppt-master/SKILL.md`

## Wow / outstanding bar

Every deck must feel **board-ready and premium**, not template-generic:

- **Hero title slide** — full navy, Clearsky accent beam, tagline "Path to Forward", one-line thesis
- **Action titles** — every content slide headline is a complete insight (never "Key insights")
- **Visual hierarchy** — Gilroy display → Aptos body → caption; extreme size contrast
- **Exhibit discipline** — chart intent in bordered panel, not floating text
- **KPI moments** — large numerics, Clearsky soft fills, optional bar emphasis
- **Whitespace** — never crowded; max 4 bullets × 12 words
- **Motion (HTML)** — subtle entrance, progress rail, keyboard nav
- **Brand** — footer `ADGM · Path to Forward · Confidential` every slide

## ADGM Brand Book 2025 tokens

```
navy:       #00092a
navy-mid:   #001c7d
navy-deep:  #002ed1
clearsky:   #0087ff  (accent / CTAs / highlights)
slate:      #a3adc2  (muted labels)
cyan:       #affaff  (soft accent)
mint:       #e5f0f0  (pillar fills)
sand:       #f0e8d8  (warm neutral)
paper:      #ffffff
```

Fonts: **Gilroy** (display/headlines) · **Aptos** (body) · **Madani Arabic** (Arabic) · 16:9 only.

Short name on slides: **ADGM** (not spelled-out legal name in marketing-style slides).

## Slide type → layout

| type | Layout |
|------|--------|
| title | Full-bleed navy hero + Clearsky rule + tagline + thesis |
| executive-summary | 3 numbered pillar cards (mint/cyan-soft fills) |
| key-insights | Action title + bullets + exhibit panel |
| data-metrics | KPI tower (3–4) or table |
| framework-model | 2×2 grid, hairlines |
| action-roadmap | Horizontal timeline |
| conclusion-next-steps | 3 bold next steps |

## Agent checklist (before delivery)

- [ ] Read `docs/brand-2025/PPT-BRAND-RULES.md`
- [ ] Read this MASTER.md
- [ ] Brand Book 2025 colours + typography applied
- [ ] Action titles on every slide
- [ ] MECE — no duplicate messages
- [ ] Metrics plausible; analysis labelled
- [ ] Speaker notes: 60–90s per slide
- [ ] Footer on every slide
- [ ] Export: in-app .pptx OR HTML OR PPT Master per path below

## Export paths

1. **In-app** — `/create-ppt` → Export → PowerPoint / HTML (uses unified craft in code)
2. **PPT Master** — `npm run ppt-master:setup` → Markdown to `tools/ppt-master-adgm/.../sources/`
3. **Open Design** — `npm run open-design:setup` → html-ppt regeneration
4. **Claude Design** — `tools/claude-design-ai/DESIGN-FOR-DECKS.md`

## Unified Cursor prompt

Use `UNIFIED_PPT_CURSOR_PROMPT` from `src/utils/exportDeckSource.ts` (copied from app Export step).

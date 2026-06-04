# Open Design — McKinsey deck integration

[Open Design](https://github.com/nexu-io/open-design) supplies **deck skills** and **html-ppt** templates used to raise ADGM Presentation Builder output to consulting-grade quality.

## Quick start

```bash
cd personal-ai-chat
npm run open-design:setup   # optional: local skill reference clone
```

In the app (**Create PPT** → **Export**):

| Export | What you get |
|--------|----------------|
| **PowerPoint (.pptx)** | Native editable deck — McKinsey layouts (action title bar, exec summary pillars, KPI towers, 2×2 framework, roadmap timeline) |
| **HTML deck** | Single-file consulting HTML — keyboard navigation, Open Design–compatible |
| **Markdown** | Source for PPT Master or html-ppt agent workflows |
| **PPT Master (Cursor)** | Highest-fidelity `.pptx` via local Python pipeline |

## Design principles (from Open Design)

Sourced from `deck-swiss-international` and `html-ppt` (`corporate-clean`, `swiss-grid`):

- **Action titles** — every slide headline states the “so what”
- **Grid discipline** — hairline borders, no decorative gradients on content slides
- **KPI towers** — metrics slides use large numbers + labels
- **Exhibit panels** — chart intent in `visualHint`
- **MECE storyline** — exec summary = 3 decisions, not topics

## Cursor skills

- `.cursor/skills/adgm-open-design-deck/SKILL.md` — Open Design html-ppt / Swiss  
- `.cursor/skills/adgm-claude-design-ppt/SKILL.md` — [Claude Design](https://github.com/mikesheehan54/Claude-Code-Design-AI) deck craft  
- `.cursor/skills/adgm-ppt-deck/SKILL.md` — PPT Master native `.pptx`

## License

Open Design is Apache-2.0. The shallow clone under `tools/open-design/` is gitignored and for local reference only.

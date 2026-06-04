# Claude Design — ADGM executive deck craft

Adapted from [Claude-Code-Design-AI](https://github.com/mikesheehan54/Claude-Code-Design-AI) (MIT) for **board PowerPoint / HTML decks** in the ADGM Command Centre Presentation Builder.

The upstream project targets React + Tailwind app UI. This file translates its design philosophy into **slide design rules** used by agents and export engines.

## Design intent

- **Low cognitive load** — one message per slide; generous whitespace
- **Semantic typography** — clear type scale: display title → section → body → caption
- **Artifacts-quality surfaces** — cards, code blocks, and KPI panels feel “designed”, not templated
- **Stream-ready structure** — content ordered so presenters can reveal top → detail → exhibit
- **Privacy-safe copy** — no fabricated metrics; label analysis vs fact

## ADGM × Claude Design tokens

| Role | Value | Use |
|------|--------|-----|
| Canvas | `#ffffff` | Content slides |
| Hero | `#00092a` | Title, section breaks |
| Accent | `#0087ff` | Highlights, KPI, links |
| Accent soft | `#cce7ff` | KPI backgrounds |
| Ink | `#1a2332` | Body text |
| Ink muted | `#5c6b7a` | Labels, footnotes |
| Confidence high | `#0f8a2f` | Positive delta |
| Confidence warn | `#d38a00` | Risk callout |
| Line | `#d8dee6` | Hairline grids |

**Fonts:** Inter / Helvetica Neue / Calibri (pptx), 16:9 only.

## Slide layout patterns (map to Presentation Builder types)

### Title (`title`)

- Full-bleed navy hero, accent rule at bottom
- Display 32–36pt, subtitle 15pt muted
- No bullets on title slide except one-line thesis

### Executive summary (`executive-summary`)

- **3 pillar cards** — numbered 1–3, each one decision (not a topic)
- First pillar uses accent-soft fill

### Key insights (`key-insights`)

- Left: action title + 3 bullets
- Right: **Exhibit** panel (chart description) — Artifacts-style bordered card

### Data / metrics (`data-metrics`)

- **KPI tower** — 3–4 large numbers, label below, optional bar height by value
- Table fallback for >4 metrics

### Framework (`framework-model`)

- 2×2 grid, hairline borders, no shadows
- Each cell: short label + one line

### Roadmap (`action-roadmap`)

- Horizontal timeline, accent nodes, phase labels

## McKinsey + Claude Design checklist (before export)

- [ ] Every title is an **action title** (complete insight sentence)
- [ ] ≤4 bullets per slide, ≤12 words each
- [ ] MECE — no repeated ideas across slides
- [ ] `visualHint` names chart type for insight/metrics slides
- [ ] Footer: `ADGM · Confidential` + slide number
- [ ] Speaker notes: 60–90s talk track, plain language

## Export paths in this repo

| Path | Engine |
|------|--------|
| In-app **PowerPoint (.pptx)** | `src/utils/presentationPptxExport.ts` |
| In-app **HTML deck** | `src/utils/presentationHtmlDeckExport.ts` |
| **Open Design** polish | `npm run open-design:setup` + `.cursor/skills/adgm-open-design-deck/` |
| **PPT Master** `.pptx` | `npm run ppt-master:setup` + `.cursor/skills/adgm-ppt-deck/` |

## Upstream

Run `npm run claude-design:setup` to clone upstream into `tools/claude-design-ai/upstream/` (gitignored). This `DESIGN-FOR-DECKS.md` file is the agent-facing contract and stays in git.

License: MIT © Mike Sheehan / Claude-Code-Design-AI contributors.

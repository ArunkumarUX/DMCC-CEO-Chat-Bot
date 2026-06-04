# Claude Design — PPT integration

[Claude-Code-Design-AI](https://github.com/mikesheehan54/Claude-Code-Design-AI) is an MIT-licensed **Claude Design** UI/UX framework. This repo adapts its craft rules for **ADGM executive decks** (PowerPoint + HTML), alongside Open Design and PPT Master.

## Setup

```bash
cd personal-ai-chat
npm run claude-design:setup
```

| Resource | Location |
|----------|----------|
| Deck design contract (committed) | `tools/claude-design-ai/DESIGN-FOR-DECKS.md` |
| Upstream clone (gitignored) | `tools/claude-design-ai/` after setup |
| Cursor skill | `.cursor/skills/adgm-claude-design-ppt/SKILL.md` |

Enable the builder: `VITE_ENABLE_PPT_MASTER=true` in `.env.local` → **Create PPT** in the sidebar.

## Export options

1. **PowerPoint (.pptx)** — in-browser, McKinsey layouts + Claude Design tokens  
2. **HTML deck** — consulting HTML with keyboard navigation  
3. **Markdown** → PPT Master or Open Design agent for maximum fidelity  

## Skill stack (recommended order)

1. `adgm-claude-design-ppt` — Claude Design deck craft (this integration)  
2. `adgm-open-design-deck` — [Open Design](https://github.com/nexu-io/open-design) html-ppt / Swiss layouts  
3. `adgm-ppt-deck` — PPT Master native `.pptx`  

## Note on upstream repo

The public `main` branch may contain a small Vite demo; the README describes the full **ClaudeDesign.zip** UI kit from [GitHub Releases](https://github.com/mikesheehan54/Claude-Code-Design-AI/releases). Slide rules in `DESIGN-FOR-DECKS.md` are maintained in this repo for agents and do not require the zip.

## License

MIT — Claude-Code-Design-AI upstream. ADGM integration files in this repo follow the same attribution in `DESIGN-FOR-DECKS.md`.

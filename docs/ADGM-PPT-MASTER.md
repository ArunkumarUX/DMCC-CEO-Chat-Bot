# ADGM Presentation — unified skill stack

All shared PPT skills work **together** for board-grade, outstanding decks.

## Skills used

| Layer | What it adds |
|-------|----------------|
| **McKinsey** | Action titles, MECE storyline, exec summary structure |
| **Open Design** | Swiss grid, html-ppt layouts, KPI towers, exhibits |
| **Claude Design** | Typography hierarchy, Artifacts panels, low cognitive load |
| **PPT Master** | Highest-fidelity native `.pptx` via agent pipeline |

**Master contract:** `tools/adgm-deck-craft/MASTER.md`  
**Cursor skill:** `.cursor/skills/adgm-ppt-master/SKILL.md`

## Quick start

```bash
cd personal-ai-chat
echo "VITE_ENABLE_PPT_MASTER=true" >> .env.local
npm run dev
# Optional local references:
npm run open-design:setup
npm run claude-design:setup
npm run ppt-master:setup
```

Open **Create PPT** → complete wizard → **Export**.

## Exports

- **PowerPoint (.pptx)** — premium McKinsey + all craft rules baked in
- **HTML deck** — animated, keyboard-nav, wow visual polish
- **Unified agent prompt** — one copy action runs all skills in Cursor
- **Markdown / PPT Master** — maximum `.pptx` quality

## Wow checklist

Every deck should pass:

1. Title slide feels premium (navy hero, accent, thesis)
2. Every headline is an action title (insight sentence)
3. KPI slides use large numbers + clear labels
4. Insights slides have an exhibit panel when `visualHint` is set
5. Footer: ADGM · Confidential + slide numbers

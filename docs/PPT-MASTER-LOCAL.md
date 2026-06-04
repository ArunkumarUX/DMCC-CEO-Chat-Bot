# PPT Master — local integration (not on production)

[PPT Master](https://github.com/hugohe3/ppt-master) generates **real, editable** `.pptx` files from documents via an AI agent workflow (Python + Cursor/Claude Code).

This capability is **intentionally excluded** from the public Netlify site.

## Quick start

```bash
cd personal-ai-chat
npm run ppt-master:setup
```

Add to `.env.local`:

```env
VITE_ENABLE_PPT_MASTER=true
```

Restart `npm run dev`, then open **Create PPT** in the sidebar (System group).

## In-app wizard (AI Presentation Builder)

1. **Input** — prompt, notes, link, paste/upload text, slide count, tone  
2. **Clarify** — up to 3 AI questions (optional)  
3. **Outline** — edit slide titles, approve  
4. **Preview** — slide-by-slide view, regenerate, speaker notes  
5. **Export** — **PowerPoint (.pptx)** (in-browser, editable), Markdown, JSON, print PDF, optional PPT Master Cursor prompt  

## Workflow

### Quick path (in app)

1. Complete the wizard through **Export**.
2. Click **PowerPoint (.pptx)** — downloads an ADGM-branded, editable 16:9 deck (speaker notes optional).

### Advanced path (PPT Master agent)

1. **Export** Markdown from the deck builder (or briefing source from chat).
2. **Save** — `tools/ppt-master-adgm/projects/adgm-command-centre/sources/deck-source.md`
3. **Generate** — In Cursor, use skill `adgm-ppt-deck` or paste the copied prompt; follow `tools/ppt-master/skills/ppt-master/SKILL.md`.
4. **Open** — `.pptx` from `tools/ppt-master/projects/.../exports/`

## Why not production?

- Requires Python, large dependencies, and long-running agent steps — unsuitable for Netlify serverless.
- Deck generation is a **local power-user** workflow aligned with Hugo He’s open-source tool.

## License

PPT Master is MIT © Hugo He. This integration does not redistribute the full upstream repo (clone is gitignored; run setup locally).

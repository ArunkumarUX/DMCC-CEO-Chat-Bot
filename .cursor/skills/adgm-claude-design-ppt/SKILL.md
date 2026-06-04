---
name: adgm-claude-design-ppt
description: >-
  Create McKinsey-grade ADGM PowerPoint decks using Claude Design craft
  (mikesheehan54/Claude-Code-Design-AI) plus Command Centre Presentation Builder exports.
  Use for PPT, slides, deck, keynote, board pack, or Claude Design styling.
---

# ADGM PPT — Claude Design skill

> **Unified master (all skills):** `.cursor/skills/adgm-ppt-master/SKILL.md`

Integrates [Claude-Code-Design-AI](https://github.com/mikesheehan54/Claude-Code-Design-AI) design philosophy with ADGM Command Centre deck tooling.

## Setup

```bash
cd personal-ai-chat
npm run claude-design:setup    # optional upstream clone
# Presentation Builder UI:
# VITE_ENABLE_PPT_MASTER=true in .env.local → npm run dev → /create-ppt
```

Read the deck contract (always):

- **`tools/claude-design-ai/DESIGN-FOR-DECKS.md`** — typography, layouts, checklist

Companion skills (use together for best results):

- **`.cursor/skills/adgm-open-design-deck/`** — Open Design html-ppt + Swiss grid
- **`.cursor/skills/adgm-ppt-deck/`** — native editable `.pptx` via PPT Master

## Claude Design principles → slides

From Claude Design Free (upstream README):

1. **Semantic typography** — one type scale per slide; no wall of text
2. **Artifacts-quality panels** — exhibits, KPI cards, and callouts feel intentional
3. **Low cognitive load** — single “so what” per slide (action title)
4. **Adaptive emphasis** — accent for priority; muted ink for context
5. **Stream-ready notes** — speaker notes = what to say while the slide is visible

## ADGM brand (non-negotiable)

- Navy `#00092a`, Clearsky `#0087ff`, white surfaces, 16:9
- Audience: Rajiv Sehgal, CSO, ADGM
- Grounding: Command Centre facts; label inference clearly

## Fast path (in-app)

1. User completes **Create PPT** wizard in the app
2. **Export → PowerPoint (.pptx)** — McKinsey layouts + Claude Design tokens
3. **Export → HTML deck** — browser preview, print to PDF

## Agent path (polish / regenerate)

### From exported Markdown

```
Read tools/claude-design-ai/DESIGN-FOR-DECKS.md.
Read the deck Markdown at [path].
Regenerate content with action titles and MECE structure.
Export via app PPTX rules or rebuild HTML deck with ADGM tokens.
```

### With Open Design (HTML excellence)

```
Read tools/claude-design-ai/DESIGN-FOR-DECKS.md.
Read tools/open-design/design-templates/html-ppt/SKILL.md (run npm run open-design:setup if missing).
Build ADGM board deck HTML: corporate-clean + navy #00092a + accent #0087ff.
```

### With PPT Master (native .pptx)

```
Read tools/claude-design-ai/DESIGN-FOR-DECKS.md.
Read tools/ppt-master/skills/ppt-master/SKILL.md.
Generate editable .pptx from tools/ppt-master-adgm/projects/adgm-command-centre/sources/deck-source.md.
```

## Optional upstream UI kit

The GitHub repo also ships a React/Tailwind **Claude Design** UI library. For app chrome (not slides), download **ClaudeDesign.zip** from [Releases](https://github.com/mikesheehan54/Claude-Code-Design-AI/releases).

## In-app SlideAI (Create PPT)

Runtime prompts embed this skill via `src/features/slideai/claudeDesignCraft.ts` and `buildSystemPrompt()` in `prompts.ts`. Users say **"use Command Centre context"** to ground decks in KB/CAL/ACT/MKT handles.

## Code references

- SlideAI prompts: `src/features/slideai/prompts.ts`, `claudeDesignCraft.ts`, `buildSlideAiContext.ts`
- Legacy wizard prompts: `server/presentationBuilderPrompts.mjs`
- PPTX: `src/utils/presentationPptxExport.ts`, `src/utils/mckinseyDeckDesign.ts`
- HTML: `src/utils/presentationHtmlDeckExport.ts`
- Docs: `docs/CLAUDE-DESIGN-PPT.md`

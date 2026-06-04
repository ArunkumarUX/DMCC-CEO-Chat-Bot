# SlideAI — Implementation Guide for Cursor

> Drop this file into your project root. Cursor will use it as context for every prompt.

---

## Context

You have an existing Vite + React bot app at `localhost:5173`. You are adding a **SlideAI feature**: the user describes a presentation in chat, the AI generates a structured slide deck, the user can keep chatting to refine it, and finally exports a `.pptx` file.

AI provider: **Anthropic Claude API** (via server proxy at `/api/slideai`)

**ADGM integration:** All decks follow ADGM Brand Book 2025 — see `docs/brand-2025/PPT-BRAND-RULES.md` and `src/config/adgmBrandForDeck.ts`.

**Design quality:** See `docs/SLIDEAI-DESIGN-GUIDE.md` for prompt formulas, theme presets, and the ✨ Boost Design flow.

**Default template:** BCC Senior Service Designer portfolio — `.cursor/skills/slideai-bcc-portfolio-template/SKILL.md` · `src/features/slideai/bccPortfolioTemplate.ts`

---

## Implemented in this repo

| Path | Purpose |
|------|---------|
| `src/features/slideai/` | SlideAI feature (chat + preview + export) |
| `server/slideAi.mjs` | Server proxy (keeps API key off browser) |
| `/create-ppt` route | SlideAI page (requires `VITE_ENABLE_PPT_MASTER=true`) |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React + Vite (existing) |
| Slide preview | Custom ADGM-branded CSS slide renderer |
| PPTX export | `pptxgenjs` (browser build) |
| AI | Anthropic Claude API via `/api/slideai` |
| State | Zustand |
| Backend | `server/dev-api.mjs` + Netlify `api.mjs` |

---

## Install Dependencies

```bash
npm install zustand pptxgenjs
```

Already installed in this project.

---

## File Structure

```
src/features/slideai/
  SlideAIChat.tsx        ← chat UI panel
  SlideAIPage.tsx        ← full page layout (chat + preview)
  useSlideStore.ts       ← Zustand state
  claudeSlideAgent.ts    ← calls /api/slideai, parses JSON
  pptxExporter.ts        ← ADGM-branded .pptx download
  slideTypes.ts          ← TypeScript types
  prompts.ts             ← system prompt, theme presets, design boost
server/slideAi.mjs        ← Claude proxy
```

Route: `/create-ppt` → `SlideAIPage` (when `VITE_ENABLE_PPT_MASTER=true`)

---

## Environment

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-...
VITE_ENABLE_PPT_MASTER=true
```

Run: `npm run dev` (starts Vite + API proxy on port 8787)

---

## Cursor prompts

**Streaming:** Update `slideAi.mjs` + `claudeSlideAgent.ts` to stream partial assistant text.

**Theme picker:** Add preset ADGM palettes (already fixed to Brand Book 2025 by default).

**Per-slide edit:** Click-to-edit on preview stage, update store on blur.

---

## Common Issues

| Issue | Fix |
|---|---|
| Claude returns markdown | System prompt requires raw JSON; agent extracts fenced JSON |
| No AI (demo deck) | Set `ANTHROPIC_API_KEY` in `.env.local`, restart dev server |
| Slide IDs on update | `buildUserMessage()` includes current slide IDs |
| Export | Click **Export .pptx** — uses ADGM Brand Book colours + footer |

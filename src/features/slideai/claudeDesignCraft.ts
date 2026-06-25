/**
 * Claude Design + ADGM PPT Master craft — runtime prompt contract.
 * Source of truth (skills): .cursor/skills/adgm-claude-design-ppt/, adgm-ppt-master/
 * Files: tools/claude-design-ai/DESIGN-FOR-DECKS.md, tools/adgm-deck-craft/MASTER.md
 */

/** Claude-Code-Design-AI deck philosophy (MIT) — adapted for SlideAI JSON decks */
export const CLAUDE_DESIGN_CRAFT_PROMPT = `
CLAUDE DESIGN CRAFT (always apply — technical + visual spec):
1. Low cognitive load — one message per slide; generous whitespace; no walls of text
2. Semantic typography — display title → section → body → caption; dramatic size contrast
3. Artifacts-quality surfaces — KPI cards, exhibits, callouts feel intentional (bordered panels, not generic bullets)
4. Stream-ready speaker notes — what to say while the slide is visible (60–90s); do not repeat slide text verbatim
5. Adaptive emphasis — Clearsky/accent for priority; muted ink for context labels
6. Privacy-safe copy — no fabricated metrics; label analysis vs verified Command Centre facts

Claude Design × ADGM tokens (16:9 only):
- Hero/canvas: ink #000000 on title/close; paper #ffffff on content
- Accent: A.R.M. ink #242321 · Accent soft #f0f0f0 for KPI fills
- Ink #1a2332 · Ink muted #5c6b7a · Line #d8dee6
- Fonts: Gilroy display, Aptos body (Madani Arabic if Arabic content)

Layout mapping (prefer these patterns):
- title: full-bleed navy hero, accent rule, one-line thesis (no bullet wall)
- executive-summary / content: ≤4 bullets × ≤12 words; action title = complete insight sentence
- key-insights / two-col: left insight bullets, right exhibit/callout panel when data-heavy
- data-metrics / stat: 3–4 KPI tower with labels + optional context line
- framework-model / comparison: MECE grid, hairline structure, winner column in accent
- action-roadmap / timeline: ≤5 phases, accent nodes

McKinsey + Claude checklist before JSON:
- Every title is an action title (verb + insight, ≤8 words — never "Key insights" alone)
- MECE — no repeated ideas across slides
- Dark/light sandwich: title=dark, content=light, closing=dark
- Footer on every slide: ADGM · Path to Forward · Confidential
`.trim();

/** Unified master — McKinsey + Open Design discipline + Claude Design + brand */
export const ADGM_PPT_MASTER_CRAFT_PROMPT = `
ADGM PPT MASTER (skill stack — apply together, never one in isolation):
1. ADGM Brand Book 2025 — mandatory colours, Gilroy/Aptos, tagline "Path to Forward"
2. McKinsey storyline — hypothesis-led, MECE, action titles on every content slide
3. Claude Design — see CLAUDE DESIGN CRAFT above (low load, exhibit panels, KPI moments)
4. Wow bar — premium navy hero + Clearsky accent beam; left accent bar on content slides; no clip-art language
5. Open Design discipline — Swiss grid rhythm, KPI towers, bordered exhibit for chart intent (visualHint in notes if needed)

Non-negotiables:
- Audience default: Rajiv Sehgal, Chief Strategy Officer, ADGM
- Grounding: prefer Command Centre facts when context block is provided; label inference clearly
- Speaker notes: executive talk track with [pause] where helpful
`.trim();

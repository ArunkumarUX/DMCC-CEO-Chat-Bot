# SlideAI — Beautiful Slide Design Guide

> How to feed Claude the right details to generate stunning ADGM presentations every time.  
> Drop this alongside [SLIDEAI-IMPLEMENTATION-GUIDE.md](../SLIDEAI-IMPLEMENTATION-GUIDE.md).

---

## The Core Principle

Claude's output quality is **directly proportional to the design context you give it**.  
A vague prompt → generic slides. A rich prompt → world-class slides.

There are two places to inject design quality:

1. **System prompt** — `buildSystemPrompt()` in `src/features/slideai/prompts.ts` plus embedded craft from `claudeDesignCraft.ts` (skills: `adgm-claude-design-ppt`, `adgm-ppt-master`, `tools/claude-design-ai/DESIGN-FOR-DECKS.md`)
2. **User message** — per-deck context (topic, audience, style, mood)
3. **Command Centre context** — when the user asks for context/grounding, `buildSlideAiContext.ts` injects KB, calendar, actions, and market handles

Default visual stack: **Claude Design + ADGM Brand Book 2025 + McKinsey action titles**. BCC portfolio template only when the user explicitly requests it.

---

## Part 1: System Prompt (implemented)

The design section in `prompts.ts` includes:

- Layout variety rules (no consecutive duplicate layouts)
- ADGM colour sandwich (dark title/closing, light content)
- Action-oriented titles (≤8 words)
- New layouts: `quote`, `timeline`, `comparison`, `icon-grid`
- Extended slide fields: `eyebrow`, `callout`, `imagePrompt`, `useDarkBg`, etc.
- Pre-return quality checklist

---

## Part 2: What to Include in User Messages

### The Magic Formula

```
[WHAT] + [WHO] + [MOOD/STYLE] + [CONSTRAINTS] + [CONTEXT]
```

### Minimal (mediocre output)

```
Create a board pack for ADGM
```

### Rich (beautiful output)

```
Create a 10-slide board pack on ADGM digital assets and D33 alignment.

Audience: ADGM Board and FSRA leadership.
Tone: Confident, data-driven, executive — not marketing fluff.
Style: ADGM executive theme — navy sandwich, Clearsky accents, McKinsey clarity.

Key facts to include:
- 82/100 D33 alignment score
- +12% licence growth YoY
- 50+ knowledge-base documents indexed

Must-have slides: Strategic context, regulatory outlook, three decisions, 90-day roadmap.
Make slide titles punchy — action titles that earn board attention.
```

---

## Part 3: Per-Slide Design Instructions

Refine any slide by chatting:

| Goal | Example prompt |
|------|----------------|
| Change layout | `Make slide 3 a stat slide — pull out the 3 key numbers and make them massive` |
| Strengthen title | `Slide 5's title is weak. Make it a bold claim, not a label.` |
| Change feel | `Slide 2 feels too corporate. Make it more emotional — the "why it matters" moment.` |
| Add visual | `Slide 4 is text-heavy. Convert bullets into an icon-grid with emojis.` |
| Dark/light | `Make slides 1, 6, and the last slide use dark background. Rest light.` |
| Restructure | `Swap slide 4 to a quote layout using: "ADGM cut our onboarding time by 40%" — Sarah K., COO` |

---

## Part 4: Theme Presets (ADGM-compliant)

Say **"use the executive theme"** (or bold, minimal, nature, finance, creative) in chat.

Defined in `prompts.ts` as `THEME_PRESETS` — all use ADGM Brand Book colours:

| Key | Name | Mood |
|-----|------|------|
| `executive` | ADGM Midnight Executive | Board and investor-ready |
| `bold` | ADGM Bold Forward | High-impact strategy |
| `minimal` | ADGM Clean Minimal | Apple-like clarity |
| `nature` | ADGM Impact & ESG | Sustainability and impact |
| `finance` | ADGM Navy Trust | Finance, legal, regulatory |
| `creative` | ADGM Innovation | Digital assets and fintech |

---

## Part 5: Layout Design Tips

| Layout | When to use |
|--------|-------------|
| `title` | Opening/closing — eyebrow + huge title + callout |
| `stat` | 2+ KPIs with context below each number |
| `two-col` | Before/after, problem/solution — set `leftTitle` / `rightTitle` |
| `quote` | Testimonials, bold one-liners (≤25 words) |
| `icon-grid` | 3–6 concepts with emoji + short title + body |
| `timeline` | Roadmaps, phases (max 5 items) |
| `comparison` | Us vs them with ✓/✗ — winner column in accent |

---

## Part 6: Sample Prompts by Use Case

### Board pack

```
10-slide ADGM board pack on [topic]. Audience: Board + CSO office.
Style: ADGM executive theme. Data-forward — every claim backed by a number.
Structure: Hook → Context → 3 decisions → Metrics → Roadmap → Ask.
```

### Investor / stakeholder

```
12-slide stakeholder deck on [topic]. Audience: institutional investors.
Style: ADGM navy trust theme. Punchy titles — they skim in 3 minutes.
Include traction metrics and a clear closing CTA.
```

### Internal strategy

```
10-slide quarterly business review for [team].
Style: ADGM finance theme — McKinsey-style, no fluff.
Include: highlights, misses, root causes, 3 decisions needed.
```

### Conference talk

```
15-slide keynote titled "[title]". Audience: [conference] attendees.
Style: ADGM bold theme. Each slide works as a standalone visual.
Structure: hook → story → 3 ideas → takeaways → CTA.
```

---

## Part 7: Design Booster Button

In SlideAI chat, click **✨ Boost Design** after a deck exists.  
Runs `DESIGN_BOOST_PROMPT` from `prompts.ts` — varies layouts, strengthens titles, adds stat/quote slides, and checks dark/light sandwich without changing core facts.

---

## Part 8: Quality Checklist

Claude self-validates before returning JSON:

- [ ] No two consecutive slides share a layout
- [ ] Every title ≤8 words and action-oriented
- [ ] At least 1 stat slide if deck has numbers
- [ ] First slide: `title` layout, `useDarkBg: true`
- [ ] Last slide: title or clear CTA
- [ ] Max 4 bullets per slide
- [ ] Quote or callout in decks ≥8 slides
- [ ] `speakerNotes` on every slide
- [ ] `imagePrompt` on at least half the slides
- [ ] Accent on every slide
- [ ] `brandCheck[]` confirms ADGM Brand Book 2025

---

## Quick Reference

| You want | Add to your prompt |
|----------|-------------------|
| Bold, premium look | `"ADGM executive theme — navy sandwich, Clearsky accents"` |
| Data-heavy feel | `"McKinsey-style — data-forward, every claim backed by a number"` |
| Emotional storytelling | `"Start with human stakes, build to insight, end with CTA"` |
| Clean minimal | `"ADGM minimal theme — one idea per slide, lots of white space"` |
| Punchy board deck | `"Board sees 20 packs a month — every slide must earn its place"` |
| Good variety | `"Mix stat, quote, icon-grid, and two-col — no consecutive duplicates"` |
| Strong narrative | `"Hook → Problem → Insight → Solution → Proof → Ask"` |

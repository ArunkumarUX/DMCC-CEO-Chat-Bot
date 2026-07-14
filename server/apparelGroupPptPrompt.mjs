/**
 * DMCC — board-ready strategy deck prompt (McKinsey / BCG / Bain standard).
 * Used by Presentation Builder, SlideAI system prompts, and Perceptis API generation.
 */

import {
  APPAREL_GROUP_DECK_CONFIG,
  clampSlideCount,
  inferSlideCountFromText,
  extractTopic,
  extractObjective,
} from './apparelGroupDeckConfig.mjs';

const APPAREL_CONTEXT = `Organisation: DMCC (Dubai Multi Commodities Centre) — world's leading commodities free zone; 26,000+ member companies from 180+ countries; 900+ licensed activities; 87 towers across JLT & Uptown Dubai.
Ecosystems: Gold & Precious Metals, Diamonds (Dubai Diamond Exchange), Lab-grown diamonds, Tea, Coffee, Cacao, Crypto (DMCC Cyber), AI, Gaming, Energy, FinX, Maritime.
Leadership: Ahmed Bin Sulayem — Executive Chairman and Chief Executive Officer.
Brand: Navy #0B1F3A, Sapphire #0F52BA, Gold #C9A84C, Pink CTA #E21F7B, Gotham typography, tagline "Where the world does business".`;

/**
 * Visual style — minimal numbered-card look (reference: "EcoTransit" pitch-deck PDF)
 * combined with the layout variety of the "Inaamajay" infographic pack, reskinned to
 * DMCC's own navy/gold brand instead of either reference's original colours.
 * Injected into every Perceptis prompt so the look survives even if template_name
 * isn't configured on the Perceptis side.
 */
const APPAREL_VISUAL_STYLE = `VISUAL STYLE (apply to every slide, this is not optional):
- Background: off-white/light neutral, never stark white. Generous whitespace and margins.
- Headlines: bold, large, near-black or navy, left-aligned. Small rounded pill "eyebrow" label above the headline on context slides (e.g. "About Us", "Our Vision").
- Sequential or list content (steps, options, features, risks, pillars): render as numbered rounded-corner cards labelled 01, 02, 03... Exactly ONE card per group is the lead/primary item — filled solid Navy #0B1F3A with white text; every other card in that group is light neutral grey (~#F0F0F0) with dark text. Never make more than one card solid-navy in the same group.
- Process flows, roadmaps, world maps, or multi-metric exhibits: use icon-badge diagrams, ring/donut segments, or map fills as the content calls for — but colour them with Navy #0B1F3A as the primary and Gold #C9A84C as the one secondary accent only. Do not introduce purple, pink, cyan, teal, amber, or any other accent colour.
- Photography: inset with rounded corners; full-bleed photography only on the cover and closing slides.
- Icons: simple flat white icon on a solid Navy or Gold badge — never multi-colour, never outline-only.
- Footer: "DMCC · Confidential" bottom-left, current year bottom-right.`;

export function buildApparelGroupPptPrompt({
  topic = '[INSERT TOPIC]',
  coreQuestion = '[INSERT THE SINGLE MOST IMPORTANT QUESTION THIS PRESENTATION MUST ANSWER]',
  decision = '[INSERT THE EXACT DECISION, APPROVAL OR ACTION REQUIRED]',
  inputs = '[INSERT REPORTS, DATA, DOCUMENTS, LINKS, PERFORMANCE METRICS, RESEARCH OR NOTES]',
  slideCount = 14,
} = {}) {
  return `Create a world-class, board-ready strategy presentation for DMCC, using the analytical rigour, storyline discipline and visual clarity expected from a top-tier McKinsey, BCG or Bain engagement.

1. PRESENTATION CONTEXT

${APPAREL_CONTEXT}

The business context may include: commodities free zone strategy; gold & precious metals; diamonds & lab-grown; tea/coffee/agri corridors; crypto & digital assets (DMCC Cyber); member onboarding & licensing; corporate tax qualifying income; Uptown Dubai activation; Future of Trade thought leadership; FDI pipeline; free zone competition (ADGM, DIFC, JAFZA).

Presentation topic: ${topic}

Core business question: ${coreQuestion}

Audience: DMCC Executive Chairman & CEO; leadership team; Board; ecosystem heads; Functional executives; Investors or strategic partners.

Required decision: ${decision}

Available inputs:
${inputs}

2. QUALITY STANDARD

Create at senior McKinsey engagement standard for a free-zone / commodities trade CEO. Boardroom-ready, decision-oriented, insight-led, commercially rigorous, evidence-based, MECE, concise but complete, visually premium, easy to scan, fully editable, suitable for senior executive presentation.

Do not create a generic corporate deck, marketing brochure, or decorative slides without analytical value. No excessive text, generic icons, or unsupported claims. Every slide must help understand the problem, evaluate evidence, or make a decision.

3. STORYLINE METHODOLOGY

Use Pyramid Principle and Situation–Complication–Resolution:
- Situation: What is happening in DMCC ecosystems, members, trade corridors or operations?
- Complication: What changed, underperformed or created urgency?
- Key question: What decision must leadership make?
- Answer: What is the recommended direction?
- Evidence: Facts, analysis and insights supporting the recommendation.
- Execution: How to implement, measure and govern.

Lead with the answer — do not force the audience to discover it at the end.

4. EXECUTIVE STORYLINE (default structure)

1. Cover
2. Executive recommendation
3. Key findings
4. Why action is required now
5. Current-state assessment
6. Market and corridor insight
7. Ecosystem analysis (gold / diamonds / crypto / members)
8. Performance diagnosis
9. Root causes
10. Strategic options
11. Option evaluation
12. Recommended strategy
13. Business and financial impact
14. Target operating model
15. Implementation roadmap
16. Governance and accountability
17. Risks and mitigations
18. Decisions required
19. Appendix

Core presentation: approximately ${slideCount} slides (12–18). Appendix for detailed calculations and supporting analysis.

5. DMCC ANALYTICAL LENSES

Assess across: Free zone, Ecosystem, Corridor, Country, Member segment, Licence type, Partnership, Event / Conference. Do not analyse one ecosystem in isolation when the recommendation affects the portfolio.

Commercial: member growth, licence revenue, event contribution, FDI pipeline value, EBITDA, SLA attainment.
Trade: gold volumes, diamond trade value, agri origin flows, tokenisation pilots, Good Delivery standards.
Digital: Cyber member growth, VASP licensing competitiveness, portal engagement, uptime.
Member experience: onboarding SLA, NPS, renewal rate, licence turnaround, complaints.
Estate: tower occupancy, Uptown Dubai activation economics, campus utilisation.
People: revenue per FTE, attrition, productivity, decision speed, accountability.
Market: free zone competition, regulatory shifts, macro trade and sanctions risk.

6. SLIDE CONSTRUCTION

Every slide: action title (complete conclusion, not topic label); supporting evidence; "so what"; implication. One primary question per slide.

Weak title: "Member Experience"
Strong title: "Member onboarding at 4.2 days threatens Uptown Dubai activation unless SLA hits 3.0 days by Q4"

7. CONSULTING-GRADE ACTION TITLES

Communicate conclusion; understandable without body; business implication; precise language. Examples:
- "USD 41.7B diamond trade through Dubai justifies accelerating the London corridor MoU now"
- "ADGM digital-asset licensing pace narrows DMCC Cyber's first-mover window to 6 months"
- "Corporate tax qualifying-income clarity can unlock member advisory attach without raising base fees"

8. VISUAL DESIGN SYSTEM

Premium DMCC design: sophisticated, modern, global, trade-focused, minimal, executive. Strong grid, generous whitespace, clear hierarchy, restrained colour.

Typography: professional sans-serif (Gotham); large concise action titles; readable chart labels.

Colour: deep navy #0B1F3A for authority; white/warm neutral backgrounds; gold #C9A84C accent; light grey structure; green/amber/red only for status. No unnecessary gradients or neon.

9. CHART AND FRAMEWORK STANDARD

Use appropriate visuals: waterfall, heatmap, 2×2, funnel, Sankey, timeline, Gantt, decision tree, bridge, cohort, map, value chain, KPI scorecard, issue tree. Every chart: title, unit, time period, source, takeaway. No pie charts for comparison; no 3D; do not invent data — label placeholders clearly.

10. STRATEGIC OPTIONS

At least three credible options. Evaluate: strategic fit to Future of Trade, member growth, trade corridor impact, free-zone competitiveness vs ADGM/DIFC/JAFZA, investment, time to value, complexity, capability, risk, scalability, reversibility. Weighted decision matrix with stated criteria.

11. FINANCIAL AND BUSINESS IMPACT

Quantify when credible: licence / fee revenue, member growth, diamond or gold trade value, event contribution, FDI pipeline, cost to serve, capex, payback, ROI, SLA impact, productivity. Base / upside / downside cases. Label assumptions.

12. RECOMMENDATION STANDARD

Explain what to do, why strongest, why now, where to start, what not to do, investment, expected value, risks, success factors, executive owner, decision required. End with a decisive statement.

13. IMPLEMENTATION ROADMAP

Phase 1 Diagnose and align · Phase 2 Design and pilot · Phase 3 Scale · Phase 4 Optimise. Each phase: timeline, deliverables, owner, dependencies, investment, success measure, decision gate.

14. GOVERNANCE MODEL

Executive Chairman & CEO, ecosystem leads (Gold, Diamonds, Cyber, Members), strategy, technology, finance, legal/compliance, marketing/events. Decision rights, accountability, escalation, reporting rhythm, KPI ownership. Named owners only.

15. RISK AND MITIGATION

Material risks only: strategic, financial, member, trade-corridor, operational, technology, data, people, partner, regulatory (corporate tax / AML), sanctions, execution. Probability, impact, early warning, mitigation, owner. No generic "monitor closely."

16. EXECUTIVE SUMMARY

Understandable in under three minutes: business issue, key finding, recommended decision, expected impact, key risk, immediate next step. Max five messages with numbers or stated inference.

17. FINAL DECISION SLIDE

Decision Required · We recommend [ONE CLEAR RECOMMENDATION] · Why (3 reasons) · Expected impact · Approval requested · Immediate next step (owner + action + deadline).

18. SOURCE AND EVIDENCE

Cite material facts: DMCC official sources, internal documents, audited reports, government data, credible market research. Distinguish verified fact, estimate, assumption, hypothesis, recommendation. Do not fabricate data.

19. OUTPUT REQUIREMENTS

Fully editable PowerPoint; ${slideCount} core slides; detailed appendix; consulting-grade charts; speaker notes per slide; data-source references; one-page executive summary; slide-by-slide storyline; placeholders where data unavailable; final decision slide. Text, charts, tables, shapes, icons, timelines must remain editable — do not flatten to images.

20. FINAL QUALITY GATE

Verify: clear business question answered; recommendation in first three slides; action titles on every slide; MECE structure; evidence supports conclusions; impact quantified; assumptions visible; alternatives evaluated; counterargument addressed; implementation realistic; accountability clear; decision explicit; CEO understands in three minutes; specific to DMCC; board-ready.

Final instruction: Create a decision-grade DMCC strategy deck — not merely attractive — that helps senior leadership understand the issue, evaluate evidence, align on direction and approve a clear course of action.`;
}

/** Default system prompt for JSON-based presentation builder (Claude outline/slides). */
export const PRESENTATION_BUILDER_SYSTEM = `${buildApparelGroupPptPrompt()}

COMPANY LOCK (non-negotiable):
- This product is only for DMCC (Dubai Multi Commodities Centre) and CEO Ahmed Bin Sulayem.
- Never invent Apparel Group, ADGM banking, retail fashion brands, co-living, mall/store KPIs, or "Path to Forward" branding.
- Use DMCC facts: commodities free zone, 26,000+ members, gold/diamonds/crypto/tea/coffee, Uptown Dubai, Future of Trade, JLT.

When returning JSON for outline or slides, follow McKinsey action titles, SCQA storyline, insightPanel on data slides, and DMCC navy/gold visual standard. Return ONLY valid JSON per the user request schema.`;

/** Format one slide for Perceptis — preserves SlideAI + Presentation Builder fields. */
function formatSlideForPerceptis(slide, index) {
  const lines = [`SLIDE ${index + 1}`];
  if (slide.layout) lines.push(`Layout: ${slide.layout}`);
  if (slide.type) lines.push(`Type: ${slide.type}`);
  lines.push(`Title: ${slide.title}`);
  if (slide.eyebrow) lines.push(`Eyebrow: ${slide.eyebrow}`);
  if (slide.subtitle) lines.push(`Subtitle: ${slide.subtitle}`);
  if (slide.body) lines.push(`Body: ${slide.body}`);
  if (slide.bullets?.length) {
    lines.push(`Bullets:\n${slide.bullets.map((b) => `  • ${b}`).join('\n')}`);
  }
  if (slide.stats?.length) {
    lines.push(
      `KPI stats:\n${slide.stats
        .map((s) => `  • ${s.label}: ${s.value}${s.context ? ` (${s.context})` : ''}`)
        .join('\n')}`,
    );
  }
  if (slide.metrics?.length) {
    lines.push(
      `Metrics:\n${slide.metrics.map((m) => `  • ${m.label}: ${m.value}`).join('\n')}`,
    );
  }
  if (slide.table) lines.push(`Table (native editable):\n${JSON.stringify(slide.table, null, 2)}`);
  if (slide.chart) lines.push(`Chart (native editable):\n${JSON.stringify(slide.chart, null, 2)}`);
  if (slide.insightPanel) {
    lines.push(`Insight panel (dark right column):\n${JSON.stringify(slide.insightPanel, null, 2)}`);
  }
  if (slide.soWhat) lines.push(`So what: ${slide.soWhat}`);
  if (slide.leftTitle || slide.leftContent) {
    lines.push(`Left column — ${slide.leftTitle || 'content'}:\n${slide.leftContent || ''}`);
  }
  if (slide.rightTitle || slide.rightContent) {
    lines.push(`Right column — ${slide.rightTitle || 'content'}:\n${slide.rightContent || ''}`);
  }
  if (slide.visualHint) lines.push(`Visual direction: ${slide.visualHint}`);
  if (slide.timelineItems?.length) {
    lines.push(`Timeline:\n${JSON.stringify(slide.timelineItems, null, 2)}`);
  }
  if (slide.icons?.length) lines.push(`Icon grid:\n${JSON.stringify(slide.icons, null, 2)}`);
  if (slide.quote) {
    lines.push(`Quote: "${slide.quote}"${slide.quoteAuthor ? ` — ${slide.quoteAuthor}` : ''}`);
  }
  if (slide.speakerNotes) lines.push(`Speaker notes: ${slide.speakerNotes}`);
  if (slide.sourceNote) lines.push(`Source: ${slide.sourceNote}`);
  if (slide.imagePrompt) lines.push(`Image (only when no chart/table): ${slide.imagePrompt}`);
  return lines.join('\n');
}

/** Serialize approved deck slides into a Perceptis fidelity block. */
export function serializeSlidesForPerceptis(deck) {
  if (!deck?.slides?.length) return '';
  return deck.slides.map((slide, i) => formatSlideForPerceptis(slide, i)).join('\n\n---\n\n');
}

/** Strip empty fields from a slide for a compact Perceptis payload. */
function compactSlide(slide) {
  const keys = [
    'layout',
    'type',
    'title',
    'eyebrow',
    'subtitle',
    'body',
    'bullets',
    'stats',
    'metrics',
    'table',
    'chart',
    'insightPanel',
    'soWhat',
    'sourceNote',
    'leftTitle',
    'leftContent',
    'rightTitle',
    'rightContent',
    'visualHint',
    'timelineItems',
    'icons',
    'quote',
    'quoteAuthor',
    'speakerNotes',
    'imagePrompt',
    'useDarkBg',
    'callout',
  ];
  const out = {};
  for (const key of keys) {
    const value = slide[key];
    if (value == null || value === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out;
}

const PERCEPTIS_LAYOUT_GUIDE = `
LAYOUT MAPPING (follow each slide's "layout" field exactly):
- title → Navy hero cover, large action title, minimal subtitle/tagline
- content → Action title + 3–5 MECE bullets; optional soWhat callout bar
- two-col → 62% left data exhibit (table OR chart) + 38% dark navy insight panel (insightPanel field)
- stat → 3 KPI towers with large numerics and labels (stats field)
- image-left → Native editable chart LEFT using chart field data + observation bullets RIGHT (rightContent) — NEVER stock photos or generic image placeholders
- comparison → Two labelled columns (leftTitle/leftContent, rightTitle/rightContent)
- timeline → Horizontal phased roadmap from timelineItems
- icon-grid → 4 icon cards from icons field
- quote → Large pull quote with attribution
- blank → Minimal content slide with title + body/bullets only

ANTI-PATTERNS (never use):
- Generic "image left" stock photo layouts when chart/table/stats are provided
- Topic-label titles ("Market Overview", "Key Findings") instead of action titles
- Pie charts, 3D charts, clipart, decorative filler slides
- Flattening charts or tables to images
`;

/** Focused Perceptis prompt when an approved deck already exists in SlideAI / Presentation Builder. */
export function buildPerceptisImplementationPrompt(payload = {}) {
  const deck = payload.deck;
  const slides = (deck?.slides ?? []).map(compactSlide);
  const slideCount = slides.length || payload.slideCount || 10;
  const title = deck?.title?.trim() || payload.prompt?.trim() || 'DMCC Strategy Deck';

  let deckJson = JSON.stringify({ title, brandCheck: deck?.brandCheck, slides }, null, 2);
  if (deckJson.length > 28000) {
    deckJson = JSON.stringify(
      {
        title,
        slides,
        note: 'Full deck — implement every slide in order; do not skip or merge slides.',
      },
      null,
      2,
    );
  }

  const context = [];
  if (payload.notes?.trim()) context.push(`Notes: ${payload.notes.trim()}`);
  if (payload.documentText?.trim()) {
    context.push(`Reference document:\n${payload.documentText.trim().slice(0, 6000)}`);
  }
  if (payload.clarificationAnswers?.length) {
    context.push(
      `Clarifications:\n${payload.clarificationAnswers.map((a, i) => `Q${i + 1}: ${a}`).join('\n')}`,
    );
  }

  return `Build a native editable PowerPoint (.pptx) for DMCC at McKinsey / Perceptis consulting-deck standard.

TASK: Implement the approved deck specification below EXACTLY.
- EXACTLY ${slideCount} slides — same order, same titles, same data
- Do NOT invent new storyline, slides, or content
- Do NOT substitute stock photos or generic layouts when charts, tables, KPIs, or insight panels are specified
- Render every chart and table as native editable PowerPoint objects using the JSON data provided

DECK TITLE: ${title}

BRAND (mandatory on every slide):
- DMCC · Navy #0B1F3A · Gold accent #C9A84C · Gotham headings · Aptos/Calibri body
- 16:9 widescreen · premium executive whitespace · boardroom-ready
- Footer: DMCC · Confidential

${APPAREL_VISUAL_STYLE}

${PERCEPTIS_LAYOUT_GUIDE}

QUALITY BAR (every slide):
- Action title = complete insight sentence naming a metric or entity (not a topic label)
- Data slides: exhibit (table/chart/stats) + interpretation + soWhat + source line
- Speaker notes on every slide (from speakerNotes field)
- MECE bullets · no marketing brochure tone

${context.length ? `CONTEXT:\n${context.join('\n\n')}\n\n` : ''}APPROVED DECK SPECIFICATION (JSON — implement faithfully):
${deckJson}

Final verification: ${slideCount} slides delivered · titles match JSON · chart/table data matches JSON · DMCC brand applied · fully editable native PowerPoint output.`;
}

/** Compose Perceptis API prompt from presentation builder payload. */
export function buildPerceptisPromptFromPayload(payload = {}) {
  if (payload.deck?.slides?.length) {
    return buildPerceptisImplementationPrompt(payload);
  }

  const userPrompt = payload.prompt?.trim() || '';
  const slideCount = clampSlideCount(payload.slideCount || inferSlideCountFromText(userPrompt));
  const context = [];
  if (payload.notes?.trim()) context.push(payload.notes.trim().slice(0, 4000));
  if (payload.documentText?.trim()) context.push(payload.documentText.trim().slice(0, 4000));
  if (payload.link?.trim()) context.push(`Reference: ${payload.link.trim()}`);

  if (payload.clarificationAnswers?.length) {
    context.push(
      `Clarifications:\n${payload.clarificationAnswers.map((a, i) => `Q${i + 1}: ${a}`).join('\n')}`,
    );
  }
  if (payload.outline) {
    context.push(`Approved outline:\n${JSON.stringify(payload.outline, null, 2).slice(0, 4000)}`);
  }

  const brandRules =
    'DMCC · Navy #0B1F3A · Gold #C9A84C · Gotham · action titles · native charts/tables · speaker notes · 16:9';

  // Detailed user briefs already specify structure — avoid duplicating a long template wrapper.
  if (userPrompt.length > 350) {
    return `${brandRules}. Exactly ${slideCount} slides.

${APPAREL_VISUAL_STYLE}

${userPrompt}

${context.length ? `CONTEXT:\n${context.join('\n\n')}\n\n` : ''}Deliver fully editable .pptx.`;
  }

  const topic = userPrompt || 'DMCC strategy update';

  return `Create a native editable PowerPoint deck for DMCC at McKinsey consulting standard.

TOPIC: ${topic}
SLIDES: exactly ${slideCount} slides, 16:9, board-ready

BRAND: ${brandRules} · footer "DMCC · Confidential"

${APPAREL_VISUAL_STYLE}

STRUCTURE: Cover → Executive recommendation → Key findings → Market insight → Strategic options → Recommended strategy → Financial impact → Roadmap → Decisions required

RULES:
- Action titles only (complete insight sentences)
- Native editable charts and tables
- Speaker notes on every slide
- MECE bullets, CEO-ready in under 3 minutes

${context.length ? `CONTEXT:\n${context.join('\n\n')}\n\n` : ''}Deliver fully editable .pptx.`;
}

/**
 * Compact structured request — brand rules live in server config, not repeated here.
 * @see apparelGroupDeckConfig.mjs
 */
export function buildCompactPerceptisPrompt(payload = {}) {
  if (payload.deck?.slides?.length) {
    return buildPerceptisImplementationPrompt(payload);
  }

  const userPrompt = payload.prompt?.trim() || '';
  const slideCount = clampSlideCount(
    payload.slideCount || inferSlideCountFromText(userPrompt),
  );
  const topic = extractTopic(userPrompt);
  const objective =
    payload.decision?.trim() ||
    payload.coreQuestion?.trim() ||
    extractObjective(userPrompt) ||
    'Deliver a board-ready strategic recommendation';
  const audience = payload.audience?.trim() || APPAREL_GROUP_DECK_CONFIG.audience;
  const templateId =
    payload.templateName?.trim() || APPAREL_GROUP_DECK_CONFIG.brandTemplateId;

  const sourceParts = [];
  if (payload.notes?.trim()) sourceParts.push(payload.notes.trim().slice(0, 1500));
  if (payload.documentText?.trim()) sourceParts.push(payload.documentText.trim().slice(0, 1500));
  if (userPrompt.length > topic.length + 20) {
    sourceParts.push(userPrompt.slice(0, 2500));
  }
  const sourceContent = sourceParts.join('\n\n').slice(0, 3000);

  const { primary, accent, headingFont, bodyFont, footer } = APPAREL_GROUP_DECK_CONFIG.brand;

  return [
    templateId ? `DMCC executive deck · template: ${templateId}` : 'DMCC executive deck',
    `Slides: exactly ${slideCount} · Format: ${APPAREL_GROUP_DECK_CONFIG.format}`,
    // Spelled out explicitly so the brand still applies even if the named
    // template above isn't found or configured on the Perceptis side —
    // don't rely on template_name alone to carry the brand.
    `Brand (mandatory on every slide): ${primary} navy + ${accent} gold accent · ${headingFont} headings / ${bodyFont} body · footer "${footer}"`,
    APPAREL_VISUAL_STYLE,
    `Topic: ${topic}`,
    `Audience: ${audience}`,
    `Objective: ${objective.slice(0, 220)}`,
    sourceContent ? `Source content:\n${sourceContent}` : '',
    'Instructions: action titles, native charts/tables, speaker notes, max 3 strategic options, no appendix unless requested.',
    'Output: fully editable .pptx.',
  ]
    .filter(Boolean)
    .join('\n');
}

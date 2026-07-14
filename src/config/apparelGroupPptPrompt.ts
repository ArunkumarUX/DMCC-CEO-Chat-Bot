/**
 * DMCC board-ready deck prompt — shared with server (apparelGroupPptPrompt.mjs).
 * @see server/apparelGroupPptPrompt.mjs
 * @see src/config/dmccGuidelines.ts
 */
import { DMCC_DECK_BRAND_PROMPT } from './dmccGuidelines';

const DMCC_CONTEXT = `Organisation: DMCC (Dubai Multi Commodities Centre) — 26,000+ member companies, 180+ countries, 900+ licensed activities, 87 towers in JLT & Uptown Dubai.
Ecosystems: Gold & Precious Metals, Diamonds, Lab-grown diamonds, Tea, Coffee, Cacao, Crypto, AI, Gaming, Energy, FinX, Maritime.
CEO: Ahmed Bin Sulayem. Brand: Navy #0B1F3A, Gold #C9A84C, Gotham, "Where the world does business".`;

export type DmccPptPromptFields = {
  topic?: string;
  coreQuestion?: string;
  decision?: string;
  inputs?: string;
  slideCount?: number;
};

/** @deprecated Use DmccPptPromptFields */
export type ApparelPptPromptFields = DmccPptPromptFields;

export function buildDmccPptPrompt(fields: DmccPptPromptFields = {}): string {
  const {
    topic = '[INSERT TOPIC]',
    coreQuestion = '[INSERT THE SINGLE MOST IMPORTANT QUESTION THIS PRESENTATION MUST ANSWER]',
    decision = '[INSERT THE EXACT DECISION, APPROVAL OR ACTION REQUIRED]',
    inputs = '[INSERT REPORTS, DATA, DOCUMENTS, LINKS, PERFORMANCE METRICS, RESEARCH OR NOTES]',
    slideCount = 14,
  } = fields;

  return `Create a world-class, board-ready strategy presentation for DMCC (McKinsey / BCG / Bain standard).

CONTEXT: ${DMCC_CONTEXT}
Topic: ${topic}
Core question: ${coreQuestion}
Required decision: ${decision}
Inputs: ${inputs}

${DMCC_DECK_BRAND_PROMPT}

MANDATORY: Pyramid Principle + SCQA · recommendation in first 3 slides · action titles (conclusions, not labels) · MECE · 12–18 core slides (${slideCount} target) · three strategic options with weighted matrix · financial impact (base/upside/downside) · phased roadmap · governance · risks · final decision slide · speaker notes · sources · fully editable output.

STRUCTURE: Cover → Executive recommendation → Key findings → Why now → Current state → Market insight → Commodities ecosystem analysis → Performance diagnosis → Root causes → Strategic options → Evaluation → Recommended strategy → Business impact → Future operating model → Roadmap → Governance → Risks → Decisions required → Appendix.

DESIGN: DMCC navy/gold, Gotham, premium minimal executive layout. No marketing brochure or decorative filler.

QUALITY GATE: CEO understands recommendation in 3 minutes; every slide has action title + evidence + so what; DMCC-specific; board-ready.`;
}

/** @deprecated Use buildDmccPptPrompt */
export const buildApparelGroupPptPrompt = buildDmccPptPrompt;

/** Appended to SlideAI system prompt for alignment with Perceptis generation. */
export const DMCC_PPT_STANDARD = buildDmccPptPrompt({
  topic: '[User topic from latest message]',
  coreQuestion: '[Derived from user request]',
  decision: '[CEO / board approval required]',
  inputs: '[Command Centre context + user notes]',
});

/** @deprecated Use DMCC_PPT_STANDARD */
export const APPAREL_GROUP_PPT_STANDARD = DMCC_PPT_STANDARD;

export const PERCEPTIS_DECK_HINT =
  'For native .pptx export, use Perceptis API (server action perceptis-deck) with the full DMCC strategy prompt.';

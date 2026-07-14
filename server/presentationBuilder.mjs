import { getAnthropicConfig } from './chatCore.mjs';
import { PRESENTATION_BUILDER_SYSTEM, buildPerceptisPromptFromPayload, buildCompactPerceptisPrompt } from './presentationBuilderPrompts.mjs';
import {
  generatePerceptisDeck,
  getPerceptisConfig,
  getPerceptisJobStatus,
  startPerceptisDeckJob,
} from './perceptisClient.mjs';
import { applyBrandToDeck } from './adgmBrandGuidelines.mjs';

function extractJson(text) {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fence) return JSON.parse(fence[1].trim());
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start >= 0 && end > start) return JSON.parse(trimmed.slice(start, end + 1));
    throw new Error('Could not parse AI response as JSON');
  }
}

async function claudeJson(userPrompt, maxTokens = 4096) {
  const { apiKey } = getAnthropicConfig();
  const model =
    process.env.PRESENTATION_ANTHROPIC_MODEL ||
    process.env.SLIDEAI_ANTHROPIC_MODEL ||
    'claude-opus-4-8';
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system: PRESENTATION_BUILDER_SYSTEM,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || res.statusText);
  }

  const data = await res.json();
  const text = data.content?.find((b) => b.type === 'text')?.text || '';
  return extractJson(text);
}

function buildSourceBlock(payload) {
  const parts = [];
  if (payload.prompt?.trim()) parts.push(`User prompt:\n${payload.prompt.trim()}`);
  if (payload.notes?.trim()) parts.push(`Notes:\n${payload.notes.trim()}`);
  if (payload.link?.trim()) parts.push(`Reference link (summarise topic only; do not claim live fetch):\n${payload.link.trim()}`);
  if (payload.documentText?.trim()) {
    const doc = payload.documentText.trim().slice(0, 12000);
    parts.push(`Uploaded / pasted document:\n${doc}`);
  }
  if (payload.slideCount) parts.push(`Target slide count: ~${payload.slideCount}`);
  if (payload.tone) parts.push(`Tone: ${payload.tone}`);
  return parts.join('\n\n') || 'General DMCC executive strategy deck';
}

function demoClarifications() {
  return {
    questions: [
      'Who is the primary audience — board, member companies, or external partners?',
      'Should the deck emphasise gold, diamonds, DMCC Cyber, or member services?',
      'Do you need bilingual (Arabic + English) speaker notes on any slides?',
    ],
  };
}

function demoOutline(prompt) {
  const topic = (prompt || 'DMCC strategy update').slice(0, 80);
  return {
    title: topic,
    theme: 'dmcc-executive',
    estimatedSlides: 10,
    storyline: 'SCQA — Situation → Complication → Question → Answer (Pyramid Principle)',
    outline: [
      { type: 'title', title: topic, summary: 'Board-ready opening — DMCC executive' },
      {
        type: 'executive-summary',
        title: 'Approve [recommendation] — three decisions unlock [X] in member / trade value by [date]',
        summary: 'Answer upfront — Pyramid Principle',
      },
      {
        type: 'context-problem',
        title: 'Free-zone context sets the stakes — Gold, Diamonds, and Cyber face [complication]',
        summary: 'Situation + complication',
      },
      {
        type: 'key-insights',
        title: 'Commodity corridor signals confirm [insight] — window closes in [N] months',
        summary: 'Evidence-led insights',
      },
      {
        type: 'data-metrics',
        title: 'Trade and member metrics support [X] addressable opportunity in [ecosystem]',
        summary: 'Table exhibit + insightPanel',
      },
      {
        type: 'framework-model',
        title: 'Strategic options score highest on [criterion] — Option [A] leads on impact and risk',
        summary: 'Competitive benchmark / options matrix',
      },
      {
        type: 'strategy-recommendation',
        title: 'Base case delivers [outcome] under disciplined phasing with decision gates at 6/12/18 months',
        summary: '3-scenario impact model',
      },
      {
        type: 'visual-infographic',
        title: 'Top risks are manageable — governance controls reduce severity on [risk 1] and [risk 2]',
        summary: 'Risk register',
      },
      {
        type: 'action-roadmap',
        title: '12-month roadmap gates investment at months 6, 12, and 18 — no commitment without KPI proof',
        summary: 'Timeline with decision gates',
      },
      {
        type: 'conclusion-next-steps',
        title: 'CEO must approve [3 items] today to protect corridor leadership',
        summary: 'Decisions required',
      },
    ],
  };
}

function demoSlides(outline) {
  return applyBrandToDeck({
    title: outline.title,
    theme: 'dmcc-executive',
    brandCheck: ['McKinsey action titles on every slide', 'KPI towers + exhibit panels enabled'],
    slides: outline.outline.map((o, i) => ({
      id: `slide-${i + 1}`,
      type: o.type,
      title: o.title,
      bullets: [
        'Lead with one crisp insight for Ahmed Bin Sulayem / DMCC leadership',
        'Support with approved DMCC institutional data where available',
        'Mark inferred points as analysis',
      ],
      visualHint: o.type === 'data-metrics' ? 'Score bar + 3-row metric table' : 'Icon-led layout, minimal text',
      speakerNotes: `Executive narration for ${o.title}. Keep to 45 seconds.`,
      metrics:
        o.type === 'data-metrics'
          ? [
              { label: 'Future of Trade alignment', value: '86/100' },
              { label: 'Diamond trade through Dubai', value: 'USD 41.7B' },
              { label: 'Member companies', value: '26,000+' },
            ]
          : undefined,
    })),
  });
}

export async function handlePresentationRequest(payload) {
  const action = payload?.action;

  if (action === 'ping') {
    const { apiKey: perceptisKey } = getPerceptisConfig();
    return { ok: true, service: 'presentation', perceptis: Boolean(perceptisKey) };
  }

  const source = buildSourceBlock(payload);

  if (action === 'clarify') {
    try {
      const data = await claudeJson(
        `${source}\n\nReturn JSON: { "questions": string[] } with 0 to 3 short clarification questions. Empty array if prompt is already clear.`,
        1024,
      );
      return { ok: true, ...data };
    } catch {
      return { ok: true, ...demoClarifications() };
    }
  }

  if (action === 'outline') {
    const answers = payload.clarificationAnswers || [];
    const answerBlock = answers.length
      ? `Clarification answers:\n${answers.map((a, i) => `Q${i + 1}: ${a}`).join('\n')}`
      : '';
    try {
      const data = await claudeJson(
        `${source}\n${answerBlock}\n\nReturn JSON:\n{
  "title": string,
  "theme": "dmcc-executive",
  "estimatedSlides": number,
  "storyline": string,
  "outline": [{ "type": string, "title": string, "summary": string }]
}`,
        2048,
      );
      return { ok: true, ...data };
    } catch {
      return { ok: true, ...demoOutline(payload.prompt) };
    }
  }

  if (action === 'slides') {
    const outline = payload.outline;
    if (!outline?.outline?.length) throw new Error('outline is required');
    try {
      const data = await claudeJson(
        `${source}\n\nApproved outline JSON:\n${JSON.stringify(outline)}\n\nReturn JSON:\n{
  "title": string,
  "theme": "dmcc-executive",
  "brandCheck": string[],
  "slides": [{
    "id": string,
    "type": string,
    "title": string,
    "bullets": string[],
    "visualHint": string,
    "speakerNotes": string,
    "metrics": [{ "label": string, "value": string }] | optional
  }]
}`,
        8192,
      );
      return { ok: true, ...applyBrandToDeck(data) };
    } catch {
      return { ok: true, ...demoSlides(outline) };
    }
  }

  if (action === 'regenerate-slide') {
    const slide = payload.slide;
    const instruction = payload.instruction || 'Improve clarity and consulting tone';
    if (!slide) throw new Error('slide is required');
    try {
      const data = await claudeJson(
        `${source}\nRegenerate this slide. Instruction: ${instruction}\nCurrent slide JSON:\n${JSON.stringify(slide)}\n\nReturn JSON: single slide object with same schema.`,
        2048,
      );
      return { ok: true, slide: data };
    } catch {
      return {
        ok: true,
        slide: {
          ...slide,
          bullets: slide.bullets?.map((b) => `${b} (refined)`) || ['Refined executive point'],
        },
      };
    }
  }

  if (action === 'perceptis-start') {
    const prompt = buildCompactPerceptisPrompt(payload);
    const { templateName: envTemplate } = getPerceptisConfig();
    console.log(
      `[perceptis-start] slides=${payload.deck?.slides?.length ?? 0} promptChars=${prompt.length}`,
    );
    const started = await startPerceptisDeckJob(prompt, {
      templateName: payload.templateName?.trim() || envTemplate || undefined,
      useWebSearch: Boolean(payload.useWebSearch),
      useKnowledgeBase: Boolean(payload.useKnowledgeBase),
    });
    return {
      ok: true,
      provider: 'perceptis',
      jobId: started.job_id,
      status: started.status,
    };
  }

  if (action === 'perceptis-status') {
    if (!payload?.jobId) throw new Error('jobId is required');
    const status = await getPerceptisJobStatus(payload.jobId);
    const download = status.downloads?.[0];
    return {
      ok: true,
      provider: 'perceptis',
      jobId: payload.jobId,
      status: status.status,
      error: status.error ?? null,
      slideCount: download?.slide_count ?? null,
      downloadUrl: download?.url ?? null,
      format: download?.format ?? 'pptx',
    };
  }

  if (action === 'perceptis-deck') {
    const prompt = buildPerceptisPromptFromPayload(payload);
    const { templateName: envTemplate } = getPerceptisConfig();
    console.log(
      `[perceptis-deck] slides=${payload.deck?.slides?.length ?? 0} promptChars=${prompt.length} template=${payload.templateName || envTemplate || 'default'}`,
    );
    const result = await generatePerceptisDeck(prompt, {
      timeoutSec: payload.timeoutSec ?? 300,
      templateName: payload.templateName?.trim() || envTemplate || undefined,
      useWebSearch: Boolean(payload.useWebSearch),
      useKnowledgeBase: Boolean(payload.useKnowledgeBase),
    });
    const download = result.downloads?.[0];
    return {
      ok: true,
      provider: 'perceptis',
      jobId: result.job_id,
      status: result.status,
      slideCount: download?.slide_count ?? null,
      downloadUrl: download?.url ?? null,
      format: download?.format ?? 'pptx',
    };
  }

  throw new Error(`Unknown action: ${action}`);
}

export async function createPresentationHttpResponse(request) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  try {
    const result = await handlePresentationRequest(payload);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err?.message || 'Presentation builder failed' }), {
      status: 500,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
}

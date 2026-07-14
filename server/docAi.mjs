/**
 * DocAI — Claude proxy for executive document generation.
 * Same JSON contract and sanitisation as SlideAI; supports a lightweight probe.
 */
import { handleSlideAiRequest } from './slideAi.mjs';
import { getAnthropicConfig } from './chatCore.mjs';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function handleDocAiRequest(body) {
  if (body?.probe === true) {
    const { apiKey } = getAnthropicConfig();
    if (!apiKey) {
      return { ok: false, status: 503, error: 'ANTHROPIC_API_KEY not configured' };
    }
    return { ok: true, status: 200, text: '{"probe":true}', model: 'probe' };
  }
  return handleSlideAiRequest(body);
}

export async function createDocAiHttpResponse(request) {
  const cors = corsHeaders();

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const result = await handleDocAiRequest(body);
  if (!result.ok) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: result.status || 500,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  if (body?.probe === true) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ text: result.text, model: result.model }), {
    status: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

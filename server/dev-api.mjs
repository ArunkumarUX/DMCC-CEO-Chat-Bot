/**
 * Local dev proxy — keeps ANTHROPIC_API_KEY off the browser.
 * Run: node server/dev-api.mjs  (or npm run dev)
 */
import http from 'node:http';
import os from 'node:os';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function loadEnvFile(name) {
  const path = join(root, name);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile('.env');
loadEnvFile('.env.local');

const PORT = Number(process.env.API_PORT || 8787);
const VITE_PORT = Number(process.env.VITE_PORT || 5173);

function lanPriority(ip) {
  if (ip.startsWith('192.168.')) return 4;
  if (ip.startsWith('10.')) return 3;
  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip)) return 2;
  if (ip.startsWith('169.254.') || ip.startsWith('192.0.0.')) return -1;
  return 1;
}

function getLanOrigin() {
  const candidates = [];
  const nets = os.networkInterfaces();
  for (const iface of Object.values(nets)) {
    if (!iface) continue;
    for (const net of iface) {
      if (net.family !== 'IPv4' || net.internal) continue;
      const score = lanPriority(net.address);
      if (score < 0) continue;
      candidates.push({ ip: net.address, score });
    }
  }
  candidates.sort((a, b) => b.score - a.score);
  const ip = candidates[0]?.ip;
  if (ip) return `http://${ip}:${VITE_PORT}`;
  return null;
}
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';
const ACCESS_PIN = process.env.ADGM_ACCESS_PIN || '9898';
const SESSION_TTL_MS = 15 * 60 * 1000;

/** @type {Map<string, { status: string, clientToken?: string, createdAt: number }>} */
const authSessions = new Map();
/** @type {Set<string>} */
const validClientTokens = new Set();

function randomId(len = 24) {
  return [...crypto.getRandomValues(new Uint8Array(len))]
    .map((b) => b.toString(36).padStart(2, '0'))
    .join('')
    .slice(0, len);
}

function pruneAuthSessions() {
  const now = Date.now();
  for (const [id, s] of authSessions) {
    if (now - s.createdAt > SESSION_TTL_MS) authSessions.delete(id);
  }
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify(body));
}

function buildSystemPrompt(ctx, language) {
  const ar = language === 'ar';
  const docs = (ctx?.documents || [])
    .slice(0, 12)
    .map((d) => `- ${d.name}: ${d.summary || 'No summary'}`)
    .join('\n');

  const meetings = (ctx?.meetings || [])
    .map(
      (m) =>
        `- ${m.title} · ${m.time} · ${m.attendees} · ${m.location} (prep: ${m.prepStatus})`,
    )
    .join('\n');

  const actions = (ctx?.openActions || [])
    .map((a) => `- [${a.status}] ${a.title} (due ${a.due}, ${a.owner})`)
    .join('\n');

  const market = ctx?.marketSnapshot;
  const marketBlock = market
    ? `Market snapshot: GCC ${market.gccEquities} · digital assets ${market.digitalAssetsWoW} · ${market.competitorNote} · top sector ${market.topSector}`
    : '';

  const isBriefing = Boolean(ctx?.briefingFormat);
  const formatLabel = ctx?.briefingFormat || 'executive briefing';

  return `You are the Personal AI Agent for ${ctx?.executiveName || 'Rajiv Sehgal'}, Chief Strategy Officer at Abu Dhabi Global Market (ADGM).

You coordinate five specialist perspectives: Policy, Strategy, Chief of Staff, Relationship, and Communications. Synthesise one executive-grade answer.

${isBriefing ? `You are generating a **${formatLabel}** briefing document (not a casual chat). Use the calendar, action register, and knowledge base below. Structure for scanning in under 2 minutes. Do not end with generic "how can I help" prompts.` : ''}

Rules:
- ${ar ? 'Respond in Modern Standard Arabic unless the user writes in English.' : 'Respond in clear executive English unless the user writes in Arabic.'}
- Use markdown: headings, bullets, tables when helpful.
- Be specific to ADGM, Abu Dhabi, and D33 where relevant.
- If you lack live data, say what you are inferring; do not invent confidential figures.
${isBriefing ? '- Output only the briefing body.' : '- End with 2–3 short follow-up prompts the executive might ask next.'}

Calendar (Microsoft Graph demo):
${meetings || '(no meetings listed)'}

Open action register:
${actions || '(none)'}

${marketBlock}

Knowledge base documents (cite by name when used):
${docs || '(none listed)'}

Live demo metrics: queries this week ${ctx?.metrics?.queriesThisWeek ?? '—'}, documents in KB ${ctx?.metrics?.documentsInKb ?? '—'}.`;
}

async function handleChat(req, res) {
  if (!API_KEY) {
    sendJson(res, 503, { error: 'ANTHROPIC_API_KEY not set. Add it to .env.local' });
    return;
  }

  let body = '';
  for await (const chunk of req) body += chunk;
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    sendJson(res, 400, { error: 'Invalid JSON body' });
    return;
  }

  const { message, language = 'en', history = [], context = {} } = payload;
  if (!message?.trim()) {
    sendJson(res, 400, { error: 'message is required' });
    return;
  }

  const messages = [
    ...history
      .filter((m) => m?.role && m?.content)
      .map((m) => ({
        role: m.role === 'assistant' || m.role === 'ai' ? 'assistant' : 'user',
        content: String(m.content),
      })),
    { role: 'user', content: message.trim() },
  ];

  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      stream: true,
      system: buildSystemPrompt(context, language),
      messages,
    }),
  });

  if (!anthropicRes.ok) {
    const errText = await anthropicRes.text();
    sendJson(res, anthropicRes.status, { error: errText || anthropicRes.statusText });
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });

  const reader = anthropicRes.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  const writeEvent = (obj) => {
    res.write(`data: ${JSON.stringify(obj)}\n\n`);
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (raw === '[DONE]') continue;
        let evt;
        try {
          evt = JSON.parse(raw);
        } catch {
          continue;
        }
        if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
          writeEvent({ type: 'token', text: evt.delta.text });
        }
        if (evt.type === 'message_stop') {
          writeEvent({ type: 'done', model: MODEL });
        }
      }
    }
    writeEvent({ type: 'done', model: MODEL });
  } catch (err) {
    writeEvent({ type: 'error', message: err?.message || 'Stream failed' });
  } finally {
    res.end();
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`);

  if (req.method === 'GET' && url.pathname === '/api/health') {
    sendJson(res, 200, { ok: true, claude: Boolean(API_KEY), model: MODEL });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/dev/public-origin') {
    const lan = getLanOrigin();
    sendJson(res, 200, {
      origin: lan,
      vitePort: VITE_PORT,
      hint: lan
        ? 'Use this origin in the QR code so your phone can reach your computer.'
        : 'Connect to Wi‑Fi and set VITE_PUBLIC_ORIGIN in .env.local',
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/chat') {
    await handleChat(req, res);
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/auth/session') {
    pruneAuthSessions();
    const sessionId = randomId(20);
    authSessions.set(sessionId, { status: 'pending', createdAt: Date.now() });
    sendJson(res, 200, { sessionId });
    return;
  }

  if (req.method === 'GET' && url.pathname.startsWith('/api/auth/session/')) {
    pruneAuthSessions();
    const sessionId = url.pathname.slice('/api/auth/session/'.length);
    const session = authSessions.get(sessionId);
    if (!session) {
      sendJson(res, 200, { status: 'not_found' });
      return;
    }
    if (Date.now() - session.createdAt > SESSION_TTL_MS) {
      authSessions.delete(sessionId);
      sendJson(res, 200, { status: 'expired' });
      return;
    }
    sendJson(res, 200, {
      status: session.status === 'verified' ? 'verified' : 'pending',
      clientToken: session.clientToken,
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/auth/verify') {
    pruneAuthSessions();
    const body = await readJsonBody(req);
    if (body === null) {
      sendJson(res, 400, { ok: false, error: 'Invalid JSON' });
      return;
    }
    const sessionId = String(body.sessionId || '');
    const pin = String(body.pin || '').replace(/\D/g, '');
    const session = authSessions.get(sessionId);
    if (!session || Date.now() - session.createdAt > SESSION_TTL_MS) {
      sendJson(res, 404, { ok: false, error: 'Session expired' });
      return;
    }
    if (pin !== ACCESS_PIN) {
      sendJson(res, 401, { ok: false, error: 'Invalid PIN' });
      return;
    }
    const clientToken = `adgm-${randomId(32)}`;
    session.status = 'verified';
    session.clientToken = clientToken;
    validClientTokens.add(clientToken);
    sendJson(res, 200, { ok: true, clientToken });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/auth/validate') {
    const body = await readJsonBody(req);
    if (body === null) {
      sendJson(res, 400, { ok: false });
      return;
    }
    const token = String(body.token || '');
    sendJson(res, 200, { ok: validClientTokens.has(token) });
    return;
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`[api] http://localhost:${PORT}  claude=${API_KEY ? 'on' : 'off (set ANTHROPIC_API_KEY in .env.local)'}`);
});

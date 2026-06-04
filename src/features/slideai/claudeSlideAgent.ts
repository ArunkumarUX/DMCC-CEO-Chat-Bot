import { buildFallbackDeck } from './fallbackDeckBuilder';
import { userRequestsNewDeck } from './parseDeckRequest';
import {
  buildSystemPrompt,
  buildUserMessage,
  DEFAULT_DECK_THEME,
  type SlideAiUserMessageOptions,
} from './prompts';
import { normalizeAgentDeck, sanitizeAssistantMessage, normalizeSlide } from './deckNormalize';
import type { AgentResponse, ChatMessage, Deck, Slide } from './slideTypes';

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)\n?```/);
    if (fence) return JSON.parse(fence[1].trim());
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start >= 0 && end > start) return JSON.parse(trimmed.slice(start, end + 1));
    throw new Error('Could not parse AI response as JSON');
  }
}

function normalizeDeck(deck: Deck): Deck {
  if (!deck?.slides?.length) {
    throw new Error('Deck is missing slides');
  }
  return normalizeAgentDeck(deck);
}

function shortError(reason: string): string {
  if (reason.includes('ECONNREFUSED') || reason.includes('proxy error')) {
    return 'API server not running — run npm run dev (both UI + API)';
  }
  if (reason.includes('ANTHROPIC_API_KEY')) {
    return 'ANTHROPIC_API_KEY missing in .env.local';
  }
  try {
    const parsed = JSON.parse(reason) as { error?: { message?: string } };
    return parsed.error?.message || reason.slice(0, 120);
  } catch {
    return reason.slice(0, 160);
  }
}

function demoResponse(
  userMessage: string,
  currentDeck: Deck | null,
  note?: string,
  options?: SlideAiUserMessageOptions,
): AgentResponse {
  const prefix = note ? `${note} ` : '';
  const forceNew = Boolean(options?.forceNewDeck) || userRequestsNewDeck(userMessage);
  if (!currentDeck || forceNew) {
    const deck = buildFallbackDeck(userMessage, { executiveBrief: options?.executiveBrief });
    return {
      action: 'create',
      deck,
      updatedSlides: null,
      message: `${prefix}Built a topic-aware preview (${deck.slides.length} slides). Connect Claude API for fully custom AI decks.`,
    };
  }

  const slideMatch = userMessage.match(/(?:slide|page)\s*(\d+)/i);
  const idx = slideMatch ? Math.max(0, parseInt(slideMatch[1], 10) - 1) : 0;
  const target = currentDeck.slides[idx] ?? currentDeck.slides[0];
  if (!target) {
    return {
      action: 'message',
      deck: null,
      updatedSlides: null,
      message: `${prefix}Connect Claude API for conversational editing.`,
    };
  }

  return {
    action: 'update',
    deck: null,
    updatedSlides: [
      {
        ...target,
        id: target.id,
        title: userMessage.length > 20 ? userMessage.slice(0, 80) : `${target.title} (updated)`,
      },
    ],
    message: `${prefix}Updated slide ${idx + 1} in preview.`,
  };
}

function sanitizeMessages(
  history: ChatMessage[],
  userMessage: string,
  currentDeck: Deck | null,
  options?: SlideAiUserMessageOptions,
) {
  const forceNew = Boolean(options?.forceNewDeck) || userRequestsNewDeck(userMessage);
  const deckForTurn = forceNew ? null : currentDeck;
  const trimmedHistory = deckForTurn ? history.slice(-8) : history;
  const out: { role: 'user' | 'assistant'; content: string }[] = [];
  for (const m of trimmedHistory) {
    const last = out[out.length - 1];
    if (last?.role === m.role) {
      last.content = `${last.content}\n\n${m.content}`;
      continue;
    }
    out.push({ role: m.role, content: m.content });
  }
  const userContent = buildUserMessage(userMessage, deckForTurn, options);
  const last = out[out.length - 1];
  if (last?.role === 'user') {
    last.content = userContent;
  } else {
    out.push({ role: 'user', content: userContent });
  }
  return out;
}

function parseAgentResponse(raw: string): AgentResponse {
  const parsed = extractJson(raw) as AgentResponse & { slides?: Slide[] };
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid agent response');
  }

  // Salvage slides returned at wrong JSON level
  if (!parsed.deck?.slides?.length && Array.isArray(parsed.slides) && parsed.slides.length) {
    parsed.deck = {
      title: (parsed as { title?: string }).title || parsed.deck?.title || 'Presentation',
      slides: parsed.slides,
      theme: parsed.deck?.theme || DEFAULT_DECK_THEME,
    };
  }

  const hasFull = Boolean(parsed.deck?.slides?.length);
  const hasPartial = Boolean(parsed.updatedSlides?.length);

  if (hasFull && !hasPartial) {
    parsed.action = 'create';
    parsed.deck = normalizeDeck(parsed.deck!);
  } else if (hasPartial && parsed.action === 'message') {
    parsed.action = 'update';
  } else if (hasFull && parsed.action === 'update' && !hasPartial) {
    parsed.action = 'create';
    parsed.deck = normalizeDeck(parsed.deck!);
  } else if (parsed.action === 'create' && parsed.deck) {
    parsed.deck = normalizeDeck(parsed.deck);
  } else if (hasPartial) {
    parsed.updatedSlides = parsed.updatedSlides!.map((s, i) =>
      normalizeSlide(s as Slide, i, parsed.deck?.title),
    );
  }

  if (!parsed.message) {
    parsed.message =
      parsed.action === 'create'
        ? 'Deck created.'
        : parsed.action === 'update'
          ? 'Slides updated.'
          : 'Done.';
  }
  parsed.message = sanitizeAssistantMessage(parsed.message);
  return parsed;
}

export async function checkSlideAiAvailable(): Promise<boolean> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return false;
    const data = (await res.json()) as { claude?: boolean };
    return Boolean(data.claude);
  } catch {
    return false;
  }
}

export async function runSlideAgent(
  userMessage: string,
  history: ChatMessage[],
  currentDeck: Deck | null,
  options?: SlideAiUserMessageOptions,
): Promise<AgentResponse> {
  const forceNew = Boolean(options?.forceNewDeck) || userRequestsNewDeck(userMessage);
  const agentOptions: SlideAiUserMessageOptions = { ...options, forceNewDeck: forceNew };
  const deckForTurn = forceNew ? null : currentDeck;
  const messages = sanitizeMessages(history, userMessage, currentDeck, agentOptions);
  const mode = deckForTurn ? 'update' : 'create';
  const system = buildSystemPrompt(userMessage);

  let res: Response;
  try {
    res = await fetch('/api/slideai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, system, mode }),
    });
  } catch (err) {
    const note = shortError(err instanceof Error ? err.message : 'Network error');
    return demoResponse(userMessage, currentDeck, note, agentOptions);
  }

  if (res.status === 404 || res.status === 502 || res.status === 503 || res.status === 504) {
    return demoResponse(userMessage, currentDeck, 'API unavailable.', agentOptions);
  }

  let data: { text?: string; error?: string } = {};
  try {
    data = (await res.json()) as { text?: string; error?: string };
  } catch {
    if (!res.ok) {
      return demoResponse(userMessage, currentDeck, `HTTP ${res.status}.`, agentOptions);
    }
  }

  if (!res.ok) {
    const reason = shortError(data.error || `HTTP ${res.status}`);
    if (!deckForTurn || forceNew) {
      return demoResponse(userMessage, null, reason, agentOptions);
    }
    return {
      action: 'message',
      deck: null,
      updatedSlides: null,
      message: `AI error: ${reason}. Restart \`npm run dev\` if the API stopped.`,
    };
  }

  const raw = data.text || '';
  if (!raw.trim()) {
    return demoResponse(userMessage, currentDeck, 'Empty AI response.', agentOptions);
  }

  try {
    return parseAgentResponse(raw);
  } catch {
    return {
      action: 'message',
      deck: null,
      updatedSlides: null,
      message: raw.slice(0, 500) || 'Could not parse deck update — try rephrasing your request.',
    };
  }
}

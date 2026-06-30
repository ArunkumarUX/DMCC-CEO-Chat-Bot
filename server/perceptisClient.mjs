/**
 * Perceptis API v1 — server-side deck generation.
 * @see https://docs.perceptis.ai/perceptis-api-v1/quickstart-deck.md
 */

import { randomUUID } from 'node:crypto';

export function getPerceptisConfig() {
  const apiKey = process.env.PERCEPTIS_API_KEY?.trim();
  const baseUrl = (process.env.PERCEPTIS_API_BASE_URL || 'https://app.perceptis.ai').replace(/\/$/, '');
  const templateName = process.env.PERCEPTIS_TEMPLATE_NAME?.trim() || '';
  return { apiKey, baseUrl, templateName };
}

export function assertPerceptisConfigured() {
  const { apiKey } = getPerceptisConfig();
  if (!apiKey) {
    throw new Error('PERCEPTIS_API_KEY not configured — add to .env.local');
  }
}

function formatPerceptisError(data, text, status) {
  if (typeof data?.error === 'string') return data.error;
  if (data?.error && typeof data.error === 'object') {
    return data.error.message || data.error.detail || JSON.stringify(data.error);
  }
  if (typeof data?.message === 'string') return data.message;
  if (data?.detail) return typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
  if (text?.trim()) return text.trim().slice(0, 500);
  return 'Request failed';
}

async function perceptisFetch(path, { method = 'GET', body, idempotencyKey } = {}) {
  const { apiKey, baseUrl } = getPerceptisConfig();
  assertPerceptisConfigured();

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json',
  };
  if (body) headers['Content-Type'] = 'application/json';
  if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;

  const url = `${baseUrl}${path}`;
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const msg = formatPerceptisError(data, text, res.status);
    console.error(`[perceptis] ${method} ${url} → ${res.status}:`, msg);
    throw new Error(`Perceptis API ${res.status}: ${msg}`);
  }

  return data;
}

export async function startPerceptisDeckJob(prompt, options = {}) {
  const templateName = options.templateName?.trim();
  const payload = {
    prompt: String(prompt).trim(),
    output_type: 'deck',
    ...(templateName ? { template_name: templateName } : {}),
    ...(options.useWebSearch ? { use_web_search: true } : {}),
    ...(options.useKnowledgeBase ? { use_knowledge_base: true } : {}),
  };

  const data = await perceptisFetch('/api/v1/generate', {
    method: 'POST',
    body: payload,
    idempotencyKey: options.idempotencyKey || randomUUID(),
  });

  const jobId = data.job_id || data.jobId || data.id;
  if (!jobId) {
    console.error('[perceptis] generate response missing job id:', JSON.stringify(data).slice(0, 500));
    throw new Error('Perceptis did not return a job id');
  }

  return { ...data, job_id: jobId };
}

export async function getPerceptisJobStatus(jobId) {
  return perceptisFetch(`/api/v1/status/${encodeURIComponent(jobId)}`);
}

export async function pollPerceptisJob(jobId, { timeoutSec = 300, intervalSec = 3 } = {}) {
  const deadline = Date.now() + timeoutSec * 1000;

  while (Date.now() < deadline) {
    const body = await getPerceptisJobStatus(jobId);
    if (body.status === 'completed' || body.status === 'failed') {
      return body;
    }
    await new Promise((r) => setTimeout(r, intervalSec * 1000));
  }

  throw new Error(`Perceptis job ${jobId} did not complete within ${timeoutSec}s`);
}

export async function generatePerceptisDeck(prompt, options = {}) {
  const started = await startPerceptisDeckJob(prompt, options);
  const jobId = started.job_id;
  if (!jobId) throw new Error('Perceptis did not return job_id');

  const final = await pollPerceptisJob(jobId, {
    timeoutSec: options.timeoutSec ?? 300,
    intervalSec: options.intervalSec ?? 3,
  });

  if (final.status === 'failed') {
    throw new Error(final.error || 'Perceptis deck generation failed');
  }

  return final;
}

const DEV_API_PORT_KEY = 'adgm-dev-api-port';

export function isLocalDevHost(): boolean {
  if (!import.meta.env.DEV || typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1';
}

export function getCachedDevApiPort(): number | null {
  try {
    const raw = sessionStorage.getItem(DEV_API_PORT_KEY);
    if (!raw) return null;
    const port = Number(raw);
    return Number.isFinite(port) && port > 0 ? port : null;
  } catch {
    return null;
  }
}

export function cacheDevApiPort(port: number): void {
  try {
    sessionStorage.setItem(DEV_API_PORT_KEY, String(port));
  } catch {
    /* ignore */
  }
}

async function probeDevApiPort(port: number): Promise<boolean> {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'ping', language: 'en', history: [], context: {} }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok || !res.body) return false;

    const reader = res.body.getReader();
    const { value } = await reader.read();
    await reader.cancel().catch(() => undefined);
    const chunk = new TextDecoder().decode(value ?? new Uint8Array());
    if (/credit balance|too low|invalid x-api-key|authentication_error/i.test(chunk)) {
      return false;
    }
    return /"type":"token"|"type":"done"/.test(chunk);
  } catch {
    return false;
  }
}

/** Find a local dev API that can reach Claude (skips stale proxies on :8787). */
export async function discoverWorkingDevApiPort(): Promise<number | null> {
  const cached = getCachedDevApiPort();
  if (cached != null && (await probeDevApiPort(cached))) return cached;

  const candidates = [8810, 8790, 8800, 8788, 8787, 8786];
  for (const port of candidates) {
    if (port === cached) continue;
    if (await probeDevApiPort(port)) {
      cacheDevApiPort(port);
      return port;
    }
  }
  return null;
}

export function chatApiUrl(port: number | null): string {
  if (isLocalDevHost() && port != null) {
    return `http://127.0.0.1:${port}/api/chat`;
  }
  return '/api/chat';
}

export function healthApiUrl(port: number | null): string {
  if (isLocalDevHost() && port != null) {
    return `http://127.0.0.1:${port}/api/health`;
  }
  return '/api/health';
}

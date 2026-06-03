import { ACCESS_PIN } from '../config/auth';

const API_BASE = '';

export type SessionStatus = 'pending' | 'verified' | 'expired' | 'not_found';

export async function createAuthSession(): Promise<{ sessionId: string }> {
  const res = await fetch(`${API_BASE}/api/auth/session`, { method: 'POST' });
  if (!res.ok) throw new Error('Could not start verification session');
  return res.json();
}

export async function getSessionStatus(sessionId: string): Promise<{
  status: SessionStatus;
  clientToken?: string;
}> {
  const res = await fetch(`${API_BASE}/api/auth/session/${encodeURIComponent(sessionId)}`);
  if (!res.ok) throw new Error('Session lookup failed');
  return res.json();
}

export async function verifyPin(
  sessionId: string,
  pin: string,
): Promise<{ ok: boolean; clientToken?: string; error?: 'invalid_pin' | 'session_expired' | 'network' }> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, pin }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 404) {
      return { ok: false, error: 'session_expired' };
    }
    if (res.status === 401) {
      return { ok: false, error: 'invalid_pin' };
    }
    if (!res.ok) {
      return { ok: false, error: 'network' };
    }
    return data;
  } catch {
    return { ok: false, error: 'network' };
  }
}

export async function validateClientToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data.ok);
  } catch {
    return false;
  }
}

/** Offline/demo fallback when API is unavailable */
export function verifyPinLocally(pin: string): boolean {
  return pin.replace(/\D/g, '') === ACCESS_PIN;
}

export function createLocalDemoToken(): string {
  return `demo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

import { getStore } from '@netlify/blobs';
import { SESSION_TTL_MS } from './memoryAuthStore.mjs';

function parseEntry(raw) {
  if (raw == null) return null;
  let text = '';
  if (typeof raw === 'string') text = raw;
  else if (raw instanceof ArrayBuffer) text = new TextDecoder().decode(raw);
  else if (ArrayBuffer.isView(raw)) text = new TextDecoder().decode(raw);
  else text = String(raw);
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Netlify Blobs auth store — same interface as memoryAuthStore for apiRouter. */
export function createNetlifyBlobAuthStore() {
  const store = getStore({ name: 'adgm-auth-sessions', consistency: 'strong' });

  return {
    async setJSON(key, value) {
      await store.set(key, JSON.stringify(value));
    },
    async get(key, opts) {
      const raw = await store.get(key);
      const data = parseEntry(raw);
      if (!data) return null;
      if (data.createdAt && Date.now() - data.createdAt > SESSION_TTL_MS) {
        await store.delete(key).catch(() => {});
        return null;
      }
      return opts?.type === 'json' ? data : data;
    },
    async delete(key) {
      await store.delete(key).catch(() => {});
    },
  };
}

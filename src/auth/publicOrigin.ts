/** Origin phones can reach for QR verify links (not localhost). */
export async function resolvePublicOrigin(): Promise<string> {
  const envOrigin = import.meta.env.VITE_PUBLIC_ORIGIN as string | undefined;
  if (envOrigin?.startsWith('http')) {
    return envOrigin.replace(/\/$/, '');
  }

  if (typeof window === 'undefined') return '';

  const { hostname, origin } = window.location;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';

  if (!isLocal) {
    return origin;
  }

  try {
    const res = await fetch('/api/dev/public-origin');
    if (res.ok) {
      const data = (await res.json()) as { origin?: string };
      if (data.origin?.startsWith('http')) {
        return data.origin.replace(/\/$/, '');
      }
    }
  } catch {
    /* API not running */
  }

  return origin;
}

export function isLocalDevHost(): boolean {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname;
  return h === 'localhost' || h === '127.0.0.1' || h === '[::1]';
}

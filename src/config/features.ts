/**
 * Feature flags — opt-in at build time (Vite env).
 * Production (Netlify): leave unset or "false" so Create PPT and Architecture stay hidden.
 */
export const PPT_MASTER_ENABLED = import.meta.env.VITE_ENABLE_PPT_MASTER === 'true';

export const ARCHITECTURE_ENABLED = import.meta.env.VITE_ENABLE_ARCHITECTURE === 'true';

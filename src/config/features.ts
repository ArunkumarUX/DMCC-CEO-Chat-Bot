/** Local-only features — off in production Netlify builds unless explicitly set. */
export const PPT_MASTER_ENABLED = import.meta.env.VITE_ENABLE_PPT_MASTER === 'true';

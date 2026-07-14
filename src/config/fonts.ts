/**
 * DMCC UI typography
 * - Headers / display: Gotham A / Gotham B (Cloud.typography, same as dmcc.ae)
 * - Body: Montserrat regular + system fallbacks
 *
 * Gotham kit may be referrer-locked on localhost — Montserrat remains in the display fallback chain.
 */

export const UI_FONT_STACK =
  "'Montserrat', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif";

export const UI_FONT_NAME = 'Montserrat';

export const DISPLAY_FONT_STACK =
  "'Gotham A', 'Gotham B', 'Gotham', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif";

export const DISPLAY_FONT_NAME = 'Gotham A';

/** @deprecated Prefer DISPLAY_FONT_STACK for titles; UI_FONT_STACK for body */
export const GOTHAM_FONT_STACK = DISPLAY_FONT_STACK;
/** @deprecated Prefer DISPLAY_FONT_NAME */
export const GOTHAM_FONT_NAME = DISPLAY_FONT_NAME;

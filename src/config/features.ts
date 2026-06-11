/**
 * Feature flags — baked in at build time (Vite).
 *
 * Opt in via env (see .env.example):
 *   VITE_ENABLE_ARCHITECTURE=true
 */
const isProdBuild = import.meta.env.PROD;

/** Create PPT / SlideAI — disabled for executive release */
export const PPT_MASTER_ENABLED = false;

/** Architecture page — local/preview only by default */
export const ARCHITECTURE_ENABLED =
  !isProdBuild && import.meta.env.VITE_ENABLE_ARCHITECTURE === 'true';

/** AI Presentation Builder wizard — disabled for executive release */
export const PRESENTATION_BUILDER_ENABLED = false;

/** Exposed for support / Settings diagnostics */
export const BUILD_FEATURES = {
  production: isProdBuild,
  pptMaster: PPT_MASTER_ENABLED,
  architecture: ARCHITECTURE_ENABLED,
  presentationBuilder: PRESENTATION_BUILDER_ENABLED,
} as const;

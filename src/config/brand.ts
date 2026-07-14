/**
 * DMCC brand tokens — sourced from dmcc.ae
 * @see https://dmcc.ae
 * @see src/config/dmccGuidelines.ts
 */
import { DMCC_BRAND } from './dmccGuidelines';

export const ADGM_BRAND = {
  version: '2026',
  tagline: DMCC_BRAND.tagline,
  siteUrl: DMCC_BRAND.siteUrl,
  logoSrc: DMCC_BRAND.logos.sapphireBlueLarge,
  logoOnDarkSrc: DMCC_BRAND.logos.onDark,
  logoLockupSrc: DMCC_BRAND.logos.lockup,
  logoSymbolSrc: DMCC_BRAND.logos.mark,
  logoMarkSrc: DMCC_BRAND.logos.mark,
  logoAlt: DMCC_BRAND.nameFull,
  productMarkAlt: `Personal AI — ${DMCC_BRAND.name}`,

  logoAspect: 402 / 127,

  typography: {
    primary: DMCC_BRAND.typography.primary,
    secondary: DMCC_BRAND.typography.primary,
    arabic: DMCC_BRAND.typography.arabic,
    sans: DMCC_BRAND.typography.primary,
    display: DMCC_BRAND.typography.primary,
    trackingBody: DMCC_BRAND.typography.trackingBody,
    trackingLogo: DMCC_BRAND.typography.trackingLogo,
    numeric: 'var(--font-sans)',
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },

  appleGrey: '#F7F7F7',
  appleGreySecondary: '#F2F2F2',

  primary: {
    clearsky: DMCC_BRAND.colors.gold,
    slate: DMCC_BRAND.colors.slate,
    cyan: '#E8EEF4',
    black: DMCC_BRAND.colors.black,
  },

  secondary: {
    royal: DMCC_BRAND.colors.sapphire,
    mint: DMCC_BRAND.colors.canvas,
    sand: '#E8EEF4',
  },

  blue: {
    50: DMCC_BRAND.colors.canvas,
    100: '#E8EEF8',
    200: '#D8DEE8',
    300: '#9AADBE',
    400: '#2D6BB5',
    500: DMCC_BRAND.colors.sapphire,
    600: '#0C4599',
    700: '#083670',
  },

  navy: {
    DEFAULT: DMCC_BRAND.colors.sapphire,
    mid: '#0A1640',
    deep: '#03051C',
  },

  cyan: {
    50: '#F5F7FA',
    border: DMCC_BRAND.colors.line,
  },

  neutral: {
    50: DMCC_BRAND.colors.canvas,
    100: '#E8EEF4',
    200: '#D8DEE8',
    300: '#B8C5D4',
    400: DMCC_BRAND.colors.slate,
    500: DMCC_BRAND.colors.body,
    600: '#2D3E52',
  },

  surface: {
    mint: DMCC_BRAND.colors.canvas,
    sand: '#E8EEF4',
    sky: '#FFFFFF',
    white: DMCC_BRAND.colors.white,
  },

  semantic: {
    success: DMCC_BRAND.colors.success,
    warning: DMCC_BRAND.colors.warning,
    error: DMCC_BRAND.colors.error,
    info: DMCC_BRAND.colors.sapphire,
  },
} as const;

export const ARM_BRAND = ADGM_BRAND;

/** Canonical DMCC brand — prefer importing from dmccGuidelines.ts */
export { DMCC_BRAND, DMCC_DECK_BRAND_PROMPT, DMCC_DECK_FOOTER } from './dmccGuidelines';

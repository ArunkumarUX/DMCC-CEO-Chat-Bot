/**
 * Apparel Group brand tokens — sourced from apparelgroup.com
 * @see https://www.apparelgroup.com/en/about-us/
 * @see src/config/apparelGroupGuidelines.ts
 */
import { APPAREL_GROUP_BRAND } from './apparelGroupGuidelines';

export const ADGM_BRAND = {
  version: '2026',
  tagline: APPAREL_GROUP_BRAND.tagline,
  siteUrl: APPAREL_GROUP_BRAND.siteUrl,
  logoSrc: '/apparel-group-logo.svg',
  logoOnDarkSrc: '/apparel-group-logo-white.svg',
  logoLockupSrc: '/apparel-group-logo-lockup.svg',
  logoSymbolSrc: '/apparel-group-mark.svg',
  logoMarkSrc: '/apparel-group-mark.svg',
  logoAlt: APPAREL_GROUP_BRAND.name,
  productMarkAlt: `Personal AI — ${APPAREL_GROUP_BRAND.name}`,

  logoAspect: 420 / 88,

  typography: {
    primary: APPAREL_GROUP_BRAND.typography.primary,
    secondary: APPAREL_GROUP_BRAND.typography.primary,
    arabic: APPAREL_GROUP_BRAND.typography.arabic,
    sans: APPAREL_GROUP_BRAND.typography.primary,
    display: APPAREL_GROUP_BRAND.typography.primary,
    trackingBody: APPAREL_GROUP_BRAND.typography.trackingBody,
    trackingLogo: APPAREL_GROUP_BRAND.typography.trackingLogo,
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
    clearsky: APPAREL_GROUP_BRAND.colors.lime,
    slate: APPAREL_GROUP_BRAND.colors.slate,
    cyan: '#E8EEF4',
    black: APPAREL_GROUP_BRAND.colors.black,
  },

  secondary: {
    royal: APPAREL_GROUP_BRAND.colors.navy,
    mint: APPAREL_GROUP_BRAND.colors.canvas,
    sand: '#E8EEF4',
  },

  blue: {
    50: APPAREL_GROUP_BRAND.colors.canvas,
    100: '#E8EEF8',
    200: '#DDE4EA',
    300: '#B8C5D9',
    400: '#335CAD',
    500: APPAREL_GROUP_BRAND.colors.navy,
    600: '#002B7A',
    700: '#001F5C',
  },

  navy: {
    DEFAULT: APPAREL_GROUP_BRAND.colors.navy,
    mid: '#002B7A',
    deep: '#001F5C',
  },

  cyan: {
    50: '#F5F5F5',
    border: APPAREL_GROUP_BRAND.colors.line,
  },

  neutral: {
    50: APPAREL_GROUP_BRAND.colors.canvas,
    100: '#E8EEF4',
    200: '#DDE4EA',
    300: '#C5CED8',
    400: APPAREL_GROUP_BRAND.colors.slate,
    500: APPAREL_GROUP_BRAND.colors.body,
    600: '#3D3D3D',
  },

  surface: {
    mint: APPAREL_GROUP_BRAND.colors.canvas,
    sand: '#E8EEF4',
    sky: '#FFFFFF',
    white: APPAREL_GROUP_BRAND.colors.white,
  },

  semantic: {
    success: APPAREL_GROUP_BRAND.colors.success,
    warning: APPAREL_GROUP_BRAND.colors.warning,
    error: APPAREL_GROUP_BRAND.colors.error,
    info: APPAREL_GROUP_BRAND.colors.navy,
  },
} as const;

export const ARM_BRAND = ADGM_BRAND;

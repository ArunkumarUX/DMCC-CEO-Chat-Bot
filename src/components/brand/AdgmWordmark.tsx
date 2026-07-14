import { ADGM_BRAND } from '../../config/brand';

export const ADGM_LOGO_ASPECT = ADGM_BRAND.logoAspect;

export function AdgmWordmark({
  className = '',
  height = 48,
  variant = 'onLight',
}: {
  className?: string;
  height?: number;
  variant?: 'onLight' | 'onDark';
}) {
  const width = Math.round(height * ADGM_LOGO_ASPECT);
  const src = variant === 'onDark' ? ADGM_BRAND.logoOnDarkSrc : ADGM_BRAND.logoSrc;
  return (
    <img
      src={src}
      alt={ADGM_BRAND.logoAlt}
      width={width}
      height={height}
      className={['adgm-logo-img', 'arm-logo-img', className].filter(Boolean).join(' ')}
      decoding="async"
      draggable={false}
      style={{ width: 'auto', height, maxWidth: '100%', objectFit: 'contain' }}
    />
  );
}

export function AdgmEmblem({
  className = '',
  size = 36,
  decorative = false,
  variant = 'onLight',
  display = 'badge',
}: {
  className?: string;
  size?: number;
  decorative?: boolean;
  variant?: 'onLight' | 'onDark';
  display?: 'badge' | 'symbol' | 'inline';
}) {
  const px = Math.round(size);
  const src = variant === 'onDark' ? ADGM_BRAND.logoOnDarkSrc : ADGM_BRAND.logoMarkSrc;

  if (display === 'symbol' || display === 'badge' || display === 'inline') {
    return (
      <img
        src={src}
        alt={decorative ? '' : ADGM_BRAND.logoAlt}
        width={Math.round(px * ADGM_LOGO_ASPECT)}
        height={px}
        className={['adgm-app-mark', 'adgm-logo-img', 'dmcc-logo-img', className].filter(Boolean).join(' ')}
        decoding="async"
        draggable={false}
        aria-hidden={decorative || undefined}
        style={{
          height: px,
          width: 'auto',
          maxWidth: Math.round(px * ADGM_LOGO_ASPECT),
          objectFit: 'contain',
          flexShrink: 0,
        }}
        title={ADGM_BRAND.logoAlt}
      />
    );
  }

  return null;
}

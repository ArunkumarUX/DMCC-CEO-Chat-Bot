import { ADGM_BRAND } from '../../config/brand';
import { AdgmSymbolIcon } from './AdgmSymbolIcon';

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
  const ink = variant === 'onDark' ? '#FFFFFF' : '#003399';

  if (display === 'symbol' || display === 'badge' || display === 'inline') {
    return (
      <span
        className={['adgm-app-mark', display === 'symbol' ? 'adgm-app-mark--symbol' : '', className]
          .filter(Boolean)
          .join(' ')}
        style={{
          width: display === 'symbol' ? px : px,
          height: px,
          flexShrink: 0,
          color: ink,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={ADGM_BRAND.logoAlt}
      >
        <AdgmSymbolIcon
          size={Math.round(px * 0.92)}
          className="adgm-logo-emblem"
          color={ink}
          aria-hidden={decorative ? true : undefined}
        />
      </span>
    );
  }

  return null;
}

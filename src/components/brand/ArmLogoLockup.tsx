import { ADGM_BRAND } from '../../config/brand';
import { AdgmWordmark } from './AdgmWordmark';

type Variant = 'onLight' | 'onDark';

/** DMCC horizontal logo lockup */
export function ArmLogoLockup({
  height = 48,
  variant = 'onLight',
  className = '',
  showTagline = false,
}: {
  height?: number;
  variant?: Variant;
  className?: string;
  showTagline?: boolean;
}) {
  const src = showTagline
    ? ADGM_BRAND.logoLockupSrc
    : variant === 'onDark'
      ? ADGM_BRAND.logoOnDarkSrc
      : ADGM_BRAND.logoSrc;
  const width = Math.round(height * ADGM_BRAND.logoAspect);

  return (
    <img
      src={src}
      alt={ADGM_BRAND.logoAlt}
      width={width}
      height={height}
      className={['dmcc-logo-lockup', 'dmcc-logo-img', className].filter(Boolean).join(' ')}
      decoding="async"
      draggable={false}
      style={{ height, width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
    />
  );
}

export { AdgmWordmark };

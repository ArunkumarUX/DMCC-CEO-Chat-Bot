import { ADGM_BRAND } from '../../config/brand';
import { AdgmSymbolIcon } from './AdgmSymbolIcon';

/** Wordmark crop — emblem + ADGM only (excludes 10-year badge & divider) */
export const ADGM_LOGO_ASPECT = 163 / 52.84;

export function AdgmWordmark({
  className = '',
  height = 28,
  variant = 'onLight',
}: {
  className?: string;
  height?: number;
  /** onDark: white wordmark for navy headers */
  variant?: 'onLight' | 'onDark';
}) {
  const width = Math.round(height * ADGM_LOGO_ASPECT);
  return (
    <img
      src={ADGM_BRAND.logoSrc}
      alt={ADGM_BRAND.logoAlt}
      width={width}
      height={height}
      className={[
        'adgm-logo-img',
        variant === 'onDark' ? 'adgm-logo-img--on-dark' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      decoding="async"
      draggable={false}
    />
  );
}

/** Square Personal AI mark — collapsed sidebar & compact chrome */
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
  /** badge = app tile; symbol = ADGM emblem only (collapsed sidebar); inline = chat */
  display?: 'badge' | 'symbol' | 'inline';
}) {
  const px = Math.round(size);

  if (display === 'symbol') {
    return (
      <span
        className={['adgm-app-mark adgm-app-mark--symbol', className].filter(Boolean).join(' ')}
        style={{ width: px, height: px, flexShrink: 0 }}
        title={ADGM_BRAND.logoAlt}
      >
        <AdgmSymbolIcon size={px} className="adgm-logo-emblem" />
      </span>
    );
  }

  const src = ADGM_BRAND.logoMarkSrc;
  const markClass =
    display === 'badge' ? 'adgm-app-mark' : 'adgm-app-mark adgm-app-mark--inline';

  return (
    <span
      className={[markClass, variant === 'onDark' ? 'adgm-app-mark--on-dark' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={{ width: px, height: px, flexShrink: 0 }}
    >
      <img
        src={src}
        alt={decorative ? '' : ADGM_BRAND.productMarkAlt}
        width={px}
        height={px}
        className="adgm-logo-emblem"
        decoding="async"
        draggable={false}
        aria-hidden={decorative ? true : undefined}
      />
    </span>
  );
}

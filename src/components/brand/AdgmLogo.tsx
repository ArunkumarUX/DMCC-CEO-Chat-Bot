import { ADGM_BRAND } from '../../config/brand';
import { AdgmEmblem, AdgmWordmark } from './AdgmWordmark';

/** Official ADGM mark / wordmark (vector) */
export function AdgmMark({
  size = 36,
  className = '',
  horizontal = false,
  variant = 'onLight',
}: {
  size?: number;
  className?: string;
  alt?: string;
  horizontal?: boolean;
  variant?: 'onLight' | 'onDark';
}) {
  if (horizontal) {
    return <AdgmWordmark className={className} height={size} variant={variant} />;
  }
  return <AdgmEmblem className={className} size={size} variant={variant} />;
}

export function AdgmLogo({
  variant = 'onDark',
  className = '',
  showTagline = false,
  markOnly = false,
  horizontal = false,
  size = 36,
}: {
  variant?: 'onDark' | 'onLight';
  className?: string;
  showTagline?: boolean;
  markOnly?: boolean;
  /** Full wordmark strip (sidebar / headers on white) */
  horizontal?: boolean;
  size?: number;
}) {
  const fg = variant === 'onDark' ? '#FFFFFF' : ADGM_BRAND.navy.DEFAULT;
  const sub = variant === 'onDark' ? '#CCE7FF' : ADGM_BRAND.neutral[500];

  if (horizontal || (!markOnly && variant === 'onLight')) {
    return (
      <div className={className} title="ADGM">
        <AdgmWordmark height={size} variant={variant} />
        {showTagline && (
          <p
            className="text-[10px] font-medium uppercase tracking-[0.14em] mt-1"
            style={{ color: sub }}
          >
            {ADGM_BRAND.tagline}
          </p>
        )}
      </div>
    );
  }

  if (markOnly) {
    return (
      <div className={className} title={ADGM_BRAND.logoAlt}>
        <AdgmEmblem size={size} variant={variant} display="symbol" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <AdgmMark size={size} alt={ADGM_BRAND.logoAlt} variant={variant} />
      <div className="min-w-0">
        <p
          className="font-semibold text-[15px] leading-tight"
          style={{ color: fg, fontFamily: 'var(--font-display)' }}
        >
          ADGM
        </p>
        {showTagline && (
          <p
            className="text-[10px] font-medium uppercase tracking-[0.14em] opacity-80"
            style={{ color: sub }}
          >
            {ADGM_BRAND.tagline}
          </p>
        )}
      </div>
    </div>
  );
}

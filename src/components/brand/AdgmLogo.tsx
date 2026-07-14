import { ADGM_BRAND } from '../../config/brand';
import { AdgmEmblem, AdgmWordmark } from './AdgmWordmark';

/** Official DMCC mark / wordmark */
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
  return <AdgmEmblem className={className} size={size} variant={variant} display="symbol" />;
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
  horizontal?: boolean;
  size?: number;
}) {
  const sub = variant === 'onDark' ? 'rgba(255,255,255,0.72)' : ADGM_BRAND.neutral[500];

  if (horizontal || (!markOnly && !showTagline)) {
    return (
      <div className={className} title="DMCC">
        <AdgmWordmark height={size} variant={variant} />
        {showTagline && (
          <p
            className="text-[10px] font-medium uppercase mt-1"
            style={{ color: sub, letterSpacing: ADGM_BRAND.typography.trackingLogo }}
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
      <AdgmMark size={size} variant={variant} />
      {showTagline && (
        <p
          className="text-[10px] font-medium uppercase tracking-[0.14em] opacity-80"
          style={{ color: sub }}
        >
          {ADGM_BRAND.tagline}
        </p>
      )}
    </div>
  );
}

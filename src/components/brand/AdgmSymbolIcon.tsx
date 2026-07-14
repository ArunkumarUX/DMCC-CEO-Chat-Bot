import type { SVGProps } from 'react';
import { DMCC_BRAND } from '../../config/dmccGuidelines';

const ACCENT = DMCC_BRAND.colors.gold;
const NAVY = DMCC_BRAND.colors.navy;

function resolveStroke(color: string): string {
  const normalized = color.toLowerCase();
  if (normalized === '#ffffff' || normalized === '#fff') return '#ffffff';
  if (normalized === '#000000' || normalized === '#000') return NAVY;
  return color;
}

/** DMCC compact mark — calligraphic emblem with gold accent bars */
export function AdgmSymbolIcon({
  size = 36,
  className = '',
  color = NAVY,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; color?: string }) {
  const px = size;
  const stroke = resolveStroke(color);
  const sw = 4.2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={px}
      height={px}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="DMCC"
      {...props}
    >
      <g transform="translate(12 3) scale(1)">
        <path
          d="M9 5 C9 24 8 46 7 67"
          stroke={stroke}
          strokeWidth={sw * 0.85}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M20 3 C20 28 20 50 20 69"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M31 9 C31 26 32 44 33 63"
          stroke={stroke}
          strokeWidth={sw * 0.78}
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <line x1="14" y1="52" x2="50" y2="52" stroke={ACCENT} strokeWidth="2" />
      <rect x="14" y="55" width="36" height="3.5" rx="1" fill={ACCENT} />
    </svg>
  );
}

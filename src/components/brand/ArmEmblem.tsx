import type { SVGProps } from 'react';

/** Apparel Group calligraphic emblem — three vertical strokes */
export function ArmEmblem({
  size = 48,
  className = '',
  color = 'currentColor',
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; color?: string }) {
  const height = size;
  const width = Math.round(size * 0.58);
  const sw = size * 0.11;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 40 72"
      fill="none"
      className={className}
      aria-hidden
      {...props}
    >
      <path
        d="M9 5 C9 24 8 46 7 67"
        stroke={color}
        strokeWidth={sw * 0.85}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 3 C20 28 20 50 20 69"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M31 9 C31 26 32 44 33 63"
        stroke={color}
        strokeWidth={sw * 0.78}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

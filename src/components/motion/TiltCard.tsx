import type { ReactNode } from 'react';

/** Flat card wrapper (no 3D tilt). */
export function TiltCard({
  children,
  className = '',
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`${glow ? 'transition-shadow duration-200 hover:shadow-adgm-md' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

import type { ReactNode } from 'react';

/** Standard button (no magnetic / 3D motion). */
export function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

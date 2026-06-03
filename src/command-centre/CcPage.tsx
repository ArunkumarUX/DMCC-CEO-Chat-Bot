import type { CSSProperties, ReactNode } from 'react';

/** Standard page wrapper — matches Executive Home / Knowledge / Settings layout */
export function CcPage({
  children,
  className = '',
  style,
  gap = 20,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  gap?: number;
}) {
  return (
    <div
      className={`grid mi-stagger cc-page ${className}`.trim()}
      style={{ gap, width: '100%', minWidth: 0, ...style }}
    >
      {children}
    </div>
  );
}

import { icons, type LucideProps } from 'lucide-react';
import { kebabToPascal } from './utils';

export function CcIcon({
  name,
  size = 20,
  className = '',
  style,
  strokeWidth = 2,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
}) {
  const key = kebabToPascal(name) as keyof typeof icons;
  const LucideIcon = icons[key];
  if (!LucideIcon) return <span className={className} style={{ width: size, height: size }} />;
  const props: LucideProps = { size, className: `ic ${className}`, style, strokeWidth };
  return <LucideIcon {...props} />;
}

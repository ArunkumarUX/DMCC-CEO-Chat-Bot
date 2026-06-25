import { ArmEmblem } from './ArmEmblem';

type Variant = 'onLight' | 'onDark';

const INK = {
  onLight: '#1A1A1A',
  onDark: '#FFFFFF',
} as const;

/** Official-style horizontal lockup: emblem + A.R.M. / HOLDING */
export function ArmLogoLockup({
  height = 48,
  variant = 'onLight',
  className = '',
}: {
  height?: number;
  variant?: Variant;
  className?: string;
}) {
  const ink = INK[variant];
  const emblemH = Math.round(height * 0.92);
  const armSize = Math.max(11, Math.round(height * 0.24));
  const holdingSize = Math.max(18, Math.round(height * 0.42));

  return (
    <div
      className={['arm-logo-lockup', className].filter(Boolean).join(' ')}
      style={{ height, color: ink }}
      role="img"
      aria-label="A.R.M. Holding"
    >
      <ArmEmblem size={emblemH} color={ink} className="arm-logo-lockup__emblem" />
      <div className="arm-logo-lockup__text">
        <span
          className="arm-logo-lockup__arm"
          style={{ fontSize: armSize, letterSpacing: '0.38em' }}
        >
          A.R.M.
        </span>
        <span
          className="arm-logo-lockup__holding"
          style={{ fontSize: holdingSize, letterSpacing: '0.22em' }}
        >
          HOLDING
        </span>
      </div>
    </div>
  );
}

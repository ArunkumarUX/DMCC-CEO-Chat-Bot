import type { ReactNode } from 'react';
import { CcIcon } from '../../command-centre/CcIcon';

export function AdgmInfoPanel({
  title,
  children,
  className = '',
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`adgm-info-panel ${className}`.trim()} role="note">
      <div className="adgm-info-panel__icon" aria-hidden>
        <CcIcon name="info" size={18} />
      </div>
      <div className="adgm-info-panel__content" style={{ minWidth: 0, flex: 1 }}>
        <div className="adgm-info-panel__title">{title}</div>
        <div className="adgm-info-panel__body">{children}</div>
      </div>
    </div>
  );
}

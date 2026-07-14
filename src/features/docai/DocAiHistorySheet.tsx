import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CcIcon } from '../../command-centre/CcIcon';
import { DocAiHistoryPanel } from './DocAiHistoryPanel';

type Props = {
  ar: boolean;
  open: boolean;
  onClose: () => void;
  onRestored?: () => void;
};

export function DocAiHistorySheet({ ar, open, onClose, onRestored }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const host =
    typeof document !== 'undefined' ? document.querySelector('.cc-slideai') : null;

  if (!open || !host) return null;

  const title = ar ? 'سجل المستندات' : 'Document history';
  const sub = ar ? 'اختر مستنداً سابقاً لاستعادته' : 'Pick a past document to restore';

  return createPortal(
    <div
      className="cc-slideai__history-sheet-layer cc-slideai__history-sheet-layer--open"
      role="presentation"
    >
      <div
        className="cc-slideai__history-sheet-backdrop"
        role="button"
        tabIndex={0}
        aria-label={ar ? 'إغلاق السجل' : 'Close history'}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClose();
          }
        }}
      />
      <aside className="cc-slideai__history-sheet" aria-label={title}>
        <header className="cc-slideai__history-sheet-head">
          <div>
            <h2 className="cc-slideai__history-sheet-title">{title}</h2>
            <p className="cc-slideai__history-sheet-sub muted-3">{sub}</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label={ar ? 'إغلاق' : 'Close'}>
            <CcIcon name="x" size={18} />
          </button>
        </header>
        <div className="cc-slideai__history-sheet-body">
          <DocAiHistoryPanel
            ar={ar}
            onRestored={() => {
              onRestored?.();
              onClose();
            }}
          />
        </div>
      </aside>
    </div>,
    host,
  );
}

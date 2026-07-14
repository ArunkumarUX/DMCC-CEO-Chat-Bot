import { useShallow } from 'zustand/react/shallow';
import { CcIcon } from '../../command-centre/CcIcon';
import { formatDocAiHistoryWhen } from './docAiHistory';
import { useDocStore } from './useDocStore';

type Props = {
  ar: boolean;
  onRestored?: () => void;
};

export function DocAiHistoryPanel({ ar, onRestored }: Props) {
  const { historyRevision, getHistory, restoreSession, removeSession } = useDocStore(
    useShallow((s) => ({
      historyRevision: s.historyRevision,
      getHistory: s.getHistory,
      restoreSession: s.restoreSession,
      removeSession: s.removeSession,
    })),
  );

  void historyRevision;
  const entries = getHistory();

  if (!entries.length) {
    return (
      <p className="muted-3" style={{ padding: 16 }}>
        {ar ? 'لا يوجد مستندات محفوظة بعد.' : 'No saved documents yet.'}
      </p>
    );
  }

  return (
    <ul className="cc-slideai__history-list">
      {entries.map((e) => (
        <li key={e.id} className="cc-slideai__history-item">
          <button
            type="button"
            className="cc-slideai__history-open"
            onClick={() => {
              if (restoreSession(e.id)) onRestored?.();
            }}
          >
            <span className="cc-slideai__history-title">{e.title}</span>
            <span className="cc-slideai__history-meta muted-3">
              {e.docType} · {e.sectionCount} {ar ? 'أقسام' : 'sections'} ·{' '}
              {formatDocAiHistoryWhen(e.updatedAt, ar)}
            </span>
            {e.previewLine ? (
              <span className="cc-slideai__history-preview muted-3">{e.previewLine}</span>
            ) : null}
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label={ar ? 'حذف' : 'Delete'}
            onClick={() => removeSession(e.id)}
          >
            <CcIcon name="trash-2" size={14} />
          </button>
        </li>
      ))}
    </ul>
  );
}

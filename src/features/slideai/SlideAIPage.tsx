import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { CcIcon } from '../../command-centre/CcIcon';
import { useApp } from '../../context/AppContext';
import { useSlideStore } from './useSlideStore';
import { exportToPptx } from './pptxExporter';
import { bccPortfolioCssVars } from './bccPortfolioTemplate';
import SlideAIChat from './SlideAIChat';
import { SlideAiHistorySheet } from './SlideAiHistorySheet';
import { SlidePreviewPanel } from './SlidePreviewPanel';

export function SlideAIPage() {
  const { settings, showToast } = useApp();
  const ar = settings.language === 'ar';
  const [showHistory, setShowHistory] = useState(false);
  const { deck, exportBusy, reset: resetChat, refreshHistory, setExportBusy } = useSlideStore(
    useShallow((s) => ({
      deck: s.deck,
      exportBusy: s.exportBusy,
      reset: s.reset,
      refreshHistory: s.refreshHistory,
      setExportBusy: s.setExportBusy,
    })),
  );

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const hasDeck = Boolean(deck?.slides?.length);
  const previewTitle = deck?.title;

  const onNewPpt = () => {
    resetChat();
    setShowHistory(false);
    showToast(ar ? 'ابدأ عرض PowerPoint جديد' : 'Start a new PowerPoint', 'success');
  };

  const onDownloadPptx = async () => {
    if (!deck?.slides?.length || exportBusy) return;
    setExportBusy(true);
    try {
      const name = (deck.title || 'apparel-group-deck').replace(/[^\w.-]+/g, '-').slice(0, 60);
      await exportToPptx(deck, `${name}.pptx`);
      showToast(ar ? 'تم تنزيل PowerPoint' : 'PowerPoint downloaded', 'success');
    } catch (err) {
      showToast(
        ar ? 'فشل التنزيل' : `Download failed: ${err instanceof Error ? err.message : 'unknown'}`,
        'info',
      );
    } finally {
      setExportBusy(false);
    }
  };

  const downloadLabel = exportBusy
    ? ar
      ? 'جاري التصدير…'
      : 'Exporting…'
    : ar
      ? 'تنزيل .pptx'
      : 'Download .pptx';

  return (
    <div className="cc-slideai" style={bccPortfolioCssVars() as CSSProperties}>
      <aside className="cc-slideai__panel cc-slideai__panel--chat">
        <header className="cc-slideai__panel-head">
          <div>
            <span className="cc-slideai__brand">SlideAI</span>
            <span className="cc-slideai__brand-sub">
              {ar ? 'SlideAI · عروض تنفيذية' : 'SlideAI · executive decks'}
            </span>
          </div>
          <div className="cc-slideai__panel-head-actions">
            <button
              type="button"
              className="pill cc-slideai__new-ppt-btn"
              onClick={onNewPpt}
              aria-label={ar ? 'عرض PowerPoint جديد' : 'New PowerPoint'}
            >
              <CcIcon name="file-plus" size={14} />
              {ar ? 'عرض جديد' : 'New PPT'}
            </button>
            <button
              type="button"
              className={`pill ghost cc-slideai__history-toggle${showHistory ? ' cc-slideai__history-toggle--on' : ''}`}
              onClick={() => setShowHistory((v) => !v)}
              aria-pressed={showHistory}
            >
              <CcIcon name="history" size={14} />
              {ar ? 'السجل' : 'History'}
            </button>
          </div>
        </header>
        <SlideAIChat />
        <SlideAiHistorySheet ar={ar} open={showHistory} onClose={() => setShowHistory(false)} />
      </aside>

      <section className="cc-slideai__panel cc-slideai__panel--preview">
        <header className="cc-slideai__panel-head">
          <div className="cc-slideai__preview-title">
            <span className="cc-slideai__preview-title-text" title={previewTitle}>
              {previewTitle || (ar ? 'معاينة العرض' : 'Deck preview')}
            </span>
          </div>
          {hasDeck && (
            <div className="cc-slideai__preview-actions">
              <button
                type="button"
                className="btn-primary cc-slideai__export"
                onClick={onDownloadPptx}
                disabled={exportBusy}
              >
                <CcIcon name="download" size={16} />
                {downloadLabel}
              </button>
            </div>
          )}
        </header>
        <SlidePreviewPanel ar={ar} />
      </section>
    </div>
  );
}

export default SlideAIPage;

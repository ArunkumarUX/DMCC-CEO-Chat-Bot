import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { CcIcon } from '../../command-centre/CcIcon';
import { useApp } from '../../context/AppContext';
import DocAIChat from './DocAIChat';
import { DocAiHistorySheet } from './DocAiHistorySheet';
import { downloadWordDocument, printDocumentAsPdf } from './docExporter';
import { DocPreviewPanel } from './DocPreviewPanel';
import { useDocStore } from './useDocStore';

export function DocAIPage() {
  const { settings, showToast } = useApp();
  const ar = settings.language === 'ar';
  const [showHistory, setShowHistory] = useState(false);
  const { document, exportBusy, reset, refreshHistory, setExportBusy } = useDocStore(
    useShallow((s) => ({
      document: s.document,
      exportBusy: s.exportBusy,
      reset: s.reset,
      refreshHistory: s.refreshHistory,
      setExportBusy: s.setExportBusy,
    })),
  );

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const hasDoc = Boolean(document?.sections?.length);
  const previewTitle = document?.title;
  const [mobileTab, setMobileTab] = useState<'chat' | 'preview'>('chat');
  const hadDocRef = useRef(false);

  useEffect(() => {
    if (hasDoc && !hadDocRef.current) setMobileTab('preview');
    hadDocRef.current = hasDoc;
  }, [hasDoc]);

  const layoutClass = mobileTab === 'preview' ? 'cc-slideai--show-preview' : 'cc-slideai--show-chat';

  const onNewDoc = () => {
    reset();
    setShowHistory(false);
    showToast(ar ? 'ابدأ مستنداً جديداً' : 'Start a new document', 'success');
  };

  const onDownloadWord = () => {
    if (!document?.sections?.length || exportBusy) return;
    setExportBusy(true);
    try {
      downloadWordDocument(document);
      showToast(ar ? 'تم تنزيل مستند Word' : 'Word document downloaded', 'success');
    } catch (err) {
      showToast(
        ar ? 'فشل التنزيل' : `Download failed: ${err instanceof Error ? err.message : 'unknown'}`,
        'info',
      );
    } finally {
      setExportBusy(false);
    }
  };

  const onPrintPdf = () => {
    if (!document?.sections?.length) return;
    printDocumentAsPdf(document);
    showToast(ar ? 'افتح نافذة الطباعة لحفظ PDF' : 'Use the print dialog to save PDF', 'success');
  };

  return (
    <div className={`cc-slideai cc-docai ${layoutClass}`}>
      <div
        className="cc-slideai__mobile-tabs"
        role="tablist"
        aria-label={ar ? 'لوحة DocAI' : 'DocAI panels'}
      >
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === 'chat'}
          className={`cc-slideai__mobile-tab${mobileTab === 'chat' ? ' cc-slideai__mobile-tab--on' : ''}`}
          onClick={() => setMobileTab('chat')}
        >
          <CcIcon name="message-square" size={16} />
          {ar ? 'المحادثة' : 'Chat'}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === 'preview'}
          className={`cc-slideai__mobile-tab${mobileTab === 'preview' ? ' cc-slideai__mobile-tab--on' : ''}`}
          onClick={() => setMobileTab('preview')}
        >
          <CcIcon name="file-text" size={16} />
          {ar ? 'المعاينة' : 'Preview'}
          {hasDoc ? (
            <span className="cc-slideai__mobile-tab-badge">{document!.sections.length}</span>
          ) : null}
        </button>
      </div>

      <aside className="cc-slideai__panel cc-slideai__panel--chat">
        <header className="cc-slideai__panel-head">
          <div>
            <span className="cc-slideai__brand">DocAI</span>
            <span className="cc-slideai__brand-sub">
              {ar ? 'DocAI · مستندات تنفيذية' : 'DocAI · executive documents'}
            </span>
          </div>
          <div className="cc-slideai__panel-head-actions">
            <button
              type="button"
              className="pill cc-slideai__new-ppt-btn"
              onClick={onNewDoc}
              aria-label={ar ? 'مستند جديد' : 'New document'}
            >
              <CcIcon name="file-plus" size={14} />
              {ar ? 'مستند جديد' : 'New doc'}
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
        <DocAIChat />
        <DocAiHistorySheet ar={ar} open={showHistory} onClose={() => setShowHistory(false)} />
      </aside>

      <section className="cc-slideai__panel cc-slideai__panel--preview">
        <header className="cc-slideai__panel-head">
          <div className="cc-slideai__preview-title">
            <span className="cc-slideai__preview-title-text" title={previewTitle}>
              {previewTitle
                ? `${previewTitle}.docx`
                : ar
                  ? 'معاينة مستند Word'
                  : 'Word document preview'}
            </span>
          </div>
          {hasDoc && (
            <div className="cc-slideai__preview-actions">
              <button type="button" className="pill ghost" onClick={onPrintPdf} disabled={exportBusy}>
                <CcIcon name="download" size={14} />
                {ar ? 'PDF' : 'PDF'}
              </button>
              <button
                type="button"
                className="btn-primary cc-slideai__export"
                onClick={onDownloadWord}
                disabled={exportBusy}
              >
                <CcIcon name="download" size={16} />
                {exportBusy ? (ar ? 'جاري…' : 'Exporting…') : ar ? 'تنزيل Word' : 'Download Word'}
              </button>
            </div>
          )}
        </header>
        <DocPreviewPanel ar={ar} />
      </section>
    </div>
  );
}

export default DocAIPage;

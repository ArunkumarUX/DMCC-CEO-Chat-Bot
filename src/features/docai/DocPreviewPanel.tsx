import { useEffect, useMemo, type CSSProperties, type ReactNode } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { CcIcon } from '../../command-centre/CcIcon';
import { labelFor, DOC_AUDIENCES, DOC_STYLES, DOC_TYPES } from './documentCatalog';
import { useDocStore } from './useDocStore';

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    if (p.startsWith('`') && p.endsWith('`')) {
      return <code key={i}>{p.slice(1, -1)}</code>;
    }
    return <span key={i}>{p}</span>;
  });
}

function MarkdownBlock({ text }: { text: string }) {
  const blocks = useMemo(() => {
    const lines = text.split('\n');
    const nodes: { type: string; content: string; cells?: string[] }[] = [];
    for (const line of lines) {
      const t = line.trimEnd();
      if (!t.trim()) {
        nodes.push({ type: 'gap', content: '' });
        continue;
      }
      if (t.startsWith('|') && t.includes('|')) {
        const cells = t
          .split('|')
          .map((c) => c.trim())
          .filter(Boolean);
        if (/^[-:| ]+$/.test(t)) {
          nodes.push({ type: 'table-sep', content: '' });
        } else {
          nodes.push({ type: 'table-row', content: t, cells });
        }
        continue;
      }
      if (/^[-*] /.test(t.trim())) {
        nodes.push({ type: 'li', content: t.trim().slice(2) });
        continue;
      }
      if (t.startsWith('### ')) nodes.push({ type: 'h3', content: t.slice(4) });
      else if (t.startsWith('## ')) nodes.push({ type: 'h2', content: t.slice(3) });
      else if (t.startsWith('# ')) nodes.push({ type: 'h1', content: t.slice(2) });
      else if (t.startsWith('> ')) nodes.push({ type: 'quote', content: t.slice(2) });
      else nodes.push({ type: 'p', content: t });
    }
    return nodes;
  }, [text]);

  const elements: ReactNode[] = [];
  let listBuf: string[] = [];
  let tableBuf: string[][] = [];

  const flushList = (key: string) => {
    if (!listBuf.length) return;
    elements.push(
      <ul key={key} className="cc-docai__md-ul">
        {listBuf.map((li, i) => (
          <li key={i}>{renderInline(li)}</li>
        ))}
      </ul>,
    );
    listBuf = [];
  };
  const flushTable = (key: string) => {
    if (!tableBuf.length) return;
    const [head, ...rows] = tableBuf;
    elements.push(
      <table key={key} className="cc-docai__md-table">
        <thead>
          <tr>
            {head.map((c, i) => (
              <th key={i}>{renderInline(c)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td key={ci}>{renderInline(c)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>,
    );
    tableBuf = [];
  };

  blocks.forEach((b, idx) => {
    if (b.type === 'li') {
      flushTable(`t-${idx}`);
      listBuf.push(b.content);
      return;
    }
    if (b.type === 'table-row' && b.cells) {
      flushList(`l-${idx}`);
      tableBuf.push(b.cells);
      return;
    }
    if (b.type === 'table-sep') return;
    flushList(`l-${idx}`);
    flushTable(`t-${idx}`);
    if (b.type === 'gap') return;
    if (b.type === 'h1')
      elements.push(
        <h3 key={idx} className="cc-docai__md-h1">
          {renderInline(b.content)}
        </h3>,
      );
    else if (b.type === 'h2')
      elements.push(
        <h4 key={idx} className="cc-docai__md-h2">
          {renderInline(b.content)}
        </h4>,
      );
    else if (b.type === 'h3')
      elements.push(
        <h5 key={idx} className="cc-docai__md-h3">
          {renderInline(b.content)}
        </h5>,
      );
    else if (b.type === 'quote')
      elements.push(
        <blockquote key={idx} className="cc-docai__md-quote">
          {renderInline(b.content)}
        </blockquote>,
      );
    else
      elements.push(
        <p key={idx} className="cc-docai__md-p">
          {renderInline(b.content)}
        </p>,
      );
  });
  flushList('l-end');
  flushTable('t-end');

  return <div className="cc-docai__md">{elements}</div>;
}

const DOC_STEPS_EN = [
  'Analysing purpose and audience',
  'Structuring the executive narrative',
  'Drafting Word document sections',
  'Finalising Word preview',
];

const DOC_STEPS_AR = [
  'تحليل الغرض والجمهور',
  'هيكلة السرد التنفيذي',
  'صياغة أقسام مستند Word',
  'إنهاء معاينة Word',
];

function DocPageStackPreview({ pageCount, activeIndex }: { pageCount: number; activeIndex: number }) {
  const total = Math.min(Math.max(pageCount, 4), 6);
  return (
    <div className="cc-slideai__progress-slides cc-docai__progress-pages" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={[
            'cc-slideai__progress-slide',
            'cc-docai__progress-page',
            i <= activeIndex ? 'cc-slideai__progress-slide--built' : '',
            i === activeIndex ? 'cc-slideai__progress-slide--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ '--slide-i': i } as CSSProperties}
        >
          <span className="cc-slideai__progress-slide-bar" />
          <span className="cc-slideai__progress-slide-line" />
          <span className="cc-slideai__progress-slide-line cc-slideai__progress-slide-line--short" />
          <span className="cc-slideai__progress-slide-line" />
        </div>
      ))}
    </div>
  );
}

function OpusDocProgressPanel({
  ar,
  pageCount,
  loadingStep,
}: {
  ar: boolean;
  pageCount: number;
  loadingStep: number;
}) {
  const steps = ar ? DOC_STEPS_AR : DOC_STEPS_EN;
  const activeStep = Math.min(loadingStep, steps.length - 1);

  return (
    <div className="cc-slideai__perceptis-progress cc-slideai__perceptis-progress--opus cc-docai__progress">
      <div className="cc-slideai__perceptis-progress-hero">
        <DocPageStackPreview pageCount={pageCount} activeIndex={activeStep} />
        <div className="cc-slideai__perceptis-progress-icon-wrap">
          <span className="cc-slideai__perceptis-progress-ring" aria-hidden />
          <div className="cc-slideai__perceptis-progress-icon">
            <CcIcon name="file-text" size={26} />
          </div>
        </div>
      </div>
      <div className="cc-slideai__perceptis-progress-body">
        <span className="cc-slideai__perceptis-progress-live">
          <span className="cc-slideai__perceptis-progress-live-dot" aria-hidden />
          DocAI · Word
        </span>
        <h3 className="cc-slideai__perceptis-progress-title">{steps[activeStep]}</h3>
        <p className="cc-slideai__perceptis-progress-msg">
          {ar ? 'عادةً 15–45 ثانية' : 'Typically 15–45 seconds'}
        </p>
        <div
          className="cc-slideai__perceptis-progress-bar cc-slideai__perceptis-progress-bar--indeterminate"
          role="progressbar"
          aria-busy="true"
        >
          <span className="cc-slideai__perceptis-progress-fill" />
          <span className="cc-slideai__perceptis-progress-shimmer" aria-hidden />
        </div>
      </div>
    </div>
  );
}

type Props = { ar: boolean };

export function DocPreviewPanel({ ar }: Props) {
  const {
    document,
    activeSectionIndex,
    previewFlash,
    contentKey,
    isLoading,
    loadingStep,
    setActiveSection,
    clearPreviewFlash,
  } = useDocStore(
    useShallow((s) => ({
      document: s.document,
      activeSectionIndex: s.activeSectionIndex,
      previewFlash: s.previewFlash,
      contentKey: s.contentKey,
      isLoading: s.isLoading,
      loadingStep: s.loadingStep,
      setActiveSection: s.setActiveSection,
      clearPreviewFlash: s.clearPreviewFlash,
    })),
  );

  const hasDoc = Boolean(document?.sections?.length);
  const pageCount = document?.estimatedPages || document?.sections?.length || 5;

  useEffect(() => {
    if (!previewFlash) return;
    const t = window.setTimeout(() => clearPreviewFlash(), 900);
    return () => window.clearTimeout(t);
  }, [previewFlash, clearPreviewFlash, contentKey]);

  useEffect(() => {
    if (!hasDoc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSection(Math.min(activeSectionIndex + 1, (document?.sections.length ?? 1) - 1));
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSection(Math.max(activeSectionIndex - 1, 0));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hasDoc, activeSectionIndex, document?.sections.length, setActiveSection]);

  useEffect(() => {
    if (!hasDoc || !document?.sections?.length) return;
    const section = document.sections[activeSectionIndex];
    if (!section) return;
    window.document
      .getElementById(`doc-section-${section.id}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activeSectionIndex, hasDoc, document?.sections]);

  if (!hasDoc && !isLoading) {
    return (
      <div className="cc-docai__preview-empty">
        <CcIcon name="file-text" size={40} className="cc-slideai__preview-icon" />
        <p>{ar ? 'سيُنشأ مستند Word هنا' : 'Your Word document will appear here'}</p>
        <span className="cc-slideai__preview-empty-hint muted-3">
          {ar
            ? 'أرسل موجزك في المحادثة لبدء توليد المستند'
            : 'Send your brief in chat to generate a Word document'}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`cc-docai__preview${isLoading ? ' cc-slideai__preview--busy' : ''}${previewFlash ? ' cc-docai__preview--flash' : ''}`}
    >
      <div className="cc-slideai__theater cc-docai__theater">
        <div
          className={`cc-slideai__canvas-wrap cc-docai__canvas-wrap${previewFlash ? ' cc-slideai__canvas-wrap--flash' : ''}`}
        >
          {!hasDoc ? (
            <OpusDocProgressPanel ar={ar} pageCount={pageCount} loadingStep={loadingStep} />
          ) : (
            <div className="cc-docai__word-stage" key={contentKey}>
              <div className="cc-docai__word-chrome" aria-hidden>
                <span className="cc-docai__word-dot cc-docai__word-dot--r" />
                <span className="cc-docai__word-dot cc-docai__word-dot--y" />
                <span className="cc-docai__word-dot cc-docai__word-dot--g" />
                <span className="cc-docai__word-chrome-title">
                  {(document!.title || 'Document').slice(0, 48)}.docx
                </span>
              </div>

              <div className="cc-docai__word-ribbon">
                <span>{labelFor(DOC_TYPES, document!.docType, ar)}</span>
                <span aria-hidden>·</span>
                <span>{labelFor(DOC_AUDIENCES, document!.audience, ar)}</span>
                <span aria-hidden>·</span>
                <span>{labelFor(DOC_STYLES, document!.style, ar)}</span>
                <span aria-hidden>·</span>
                <span>
                  {document!.estimatedPages} {ar ? 'صفحات' : 'pages'}
                </span>
                <span className="cc-docai__status">{document!.status}</span>
              </div>

              <article className="cc-docai__word-sheet" aria-label={document!.title}>
                <header className="cc-docai__page-head">
                  <img src="/dmcc-logo.png" alt="DMCC" className="cc-docai__page-logo" />
                  <div>
                    <p className="cc-docai__page-kicker">DMCC · Confidential · Word</p>
                    <h1 className="cc-docai__word-title">{document!.title}</h1>
                    {document!.summary ? (
                      <p className="cc-docai__word-summary">{document!.summary}</p>
                    ) : null}
                  </div>
                </header>

                {document!.sections.map((section, i) => (
                  <section
                    key={section.id}
                    id={`doc-section-${section.id}`}
                    className={`cc-docai__word-section${i === activeSectionIndex ? ' cc-docai__word-section--active' : ''}`}
                    onClick={() => setActiveSection(i)}
                  >
                    <h2 className="cc-docai__word-section-title">
                      <span className="cc-docai__toc-num">{i + 1}</span>
                      {section.title}
                    </h2>
                    <MarkdownBlock text={section.body} />
                  </section>
                ))}

                <footer className="cc-docai__page-foot">
                  <span>
                    DMCC · v{document!.version}
                    {document!.sources?.length ? ` · ${document!.sources.slice(0, 2).join(' · ')}` : ''}
                  </span>
                  <span>
                    {document!.sections.length} {ar ? 'أقسام' : 'sections'}
                  </span>
                </footer>
              </article>
            </div>
          )}

          {isLoading && hasDoc && (
            <div className="cc-slideai__canvas-loading-overlay" aria-live="polite" aria-busy="true">
              <span className="cc-slideai__preview-busy-pulse" />
              <p>{ar ? 'جاري تحديث مستند Word…' : 'Updating Word document…'}</p>
            </div>
          )}
        </div>

        {hasDoc && (
          <div className="cc-slideai__stage-nav cc-docai__stage-nav">
            <button
              type="button"
              className="icon-btn"
              disabled={activeSectionIndex <= 0 || isLoading}
              onClick={() => setActiveSection(activeSectionIndex - 1)}
              aria-label={ar ? 'القسم السابق' : 'Previous section'}
            >
              <CcIcon name="chevron-left" size={18} />
            </button>
            <span className="cc-slideai__stage-counter">
              {activeSectionIndex + 1} / {document!.sections.length}
            </span>
            <button
              type="button"
              className="icon-btn"
              disabled={activeSectionIndex >= document!.sections.length - 1 || isLoading}
              onClick={() => setActiveSection(activeSectionIndex + 1)}
              aria-label={ar ? 'القسم التالي' : 'Next section'}
            >
              <CcIcon name="chevron-right" size={18} />
            </button>
          </div>
        )}
      </div>

      {hasDoc && (
        <div className="cc-docai__toc" role="tablist" aria-label={ar ? 'أقسام المستند' : 'Document sections'}>
          {document!.sections.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === activeSectionIndex}
              className={`cc-docai__toc-item${i === activeSectionIndex ? ' cc-docai__toc-item--on' : ''}`}
              onClick={() => {
                setActiveSection(i);
                window.document
                  .getElementById(`doc-section-${s.id}`)
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <span className="cc-docai__toc-num">{i + 1}</span>
              {s.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

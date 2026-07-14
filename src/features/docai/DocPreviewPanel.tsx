import { useEffect, useMemo, type ReactNode } from 'react';
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

type Props = { ar: boolean };

export function DocPreviewPanel({ ar }: Props) {
  const {
    document,
    activeSectionIndex,
    previewFlash,
    contentKey,
    setActiveSection,
    clearPreviewFlash,
  } = useDocStore(
    useShallow((s) => ({
      document: s.document,
      activeSectionIndex: s.activeSectionIndex,
      previewFlash: s.previewFlash,
      contentKey: s.contentKey,
      setActiveSection: s.setActiveSection,
      clearPreviewFlash: s.clearPreviewFlash,
    })),
  );

  useEffect(() => {
    if (!previewFlash) return;
    const t = window.setTimeout(() => clearPreviewFlash(), 900);
    return () => window.clearTimeout(t);
  }, [previewFlash, clearPreviewFlash, contentKey]);

  if (!document?.sections?.length) {
    return (
      <div className="cc-docai__preview-empty">
        <CcIcon name="file-text" size={36} />
        <p>{ar ? 'معاينة المستند تظهر هنا' : 'Document preview appears here'}</p>
        <span className="muted-3">
          {ar
            ? 'اختر قالباً أو أجب عن الأسئلة لبدء الإنشاء'
            : 'Pick a template or answer the essentials to generate'}
        </span>
      </div>
    );
  }

  const section = document.sections[activeSectionIndex] ?? document.sections[0];

  return (
    <div className={`cc-docai__preview${previewFlash ? ' cc-docai__preview--flash' : ''}`} key={contentKey}>
      <div className="cc-docai__meta-card">
        <div className="cc-docai__meta-row">
          <span className="cc-docai__meta-label">{ar ? 'النوع' : 'Type'}</span>
          <span>{labelFor(DOC_TYPES, document.docType, ar)}</span>
        </div>
        <div className="cc-docai__meta-row">
          <span className="cc-docai__meta-label">{ar ? 'الجمهور' : 'Audience'}</span>
          <span>{labelFor(DOC_AUDIENCES, document.audience, ar)}</span>
        </div>
        <div className="cc-docai__meta-row">
          <span className="cc-docai__meta-label">{ar ? 'الأسلوب' : 'Style'}</span>
          <span>{labelFor(DOC_STYLES, document.style, ar)}</span>
        </div>
        <div className="cc-docai__meta-row">
          <span className="cc-docai__meta-label">{ar ? 'الصفحات' : 'Est. pages'}</span>
          <span>{document.estimatedPages}</span>
        </div>
        <div className="cc-docai__meta-row">
          <span className="cc-docai__meta-label">{ar ? 'الحالة' : 'Status'}</span>
          <span className="cc-docai__status">{document.status}</span>
        </div>
      </div>

      {document.summary ? (
        <div className="cc-docai__summary-card">
          <h3>{ar ? 'الملخص التنفيذي' : 'Executive summary'}</h3>
          <p>{document.summary}</p>
        </div>
      ) : null}

      {document.sources?.length ? (
        <p className="cc-docai__sources">
          <strong>{ar ? 'المصادر:' : 'Sources:'}</strong> {document.sources.join(' · ')}
        </p>
      ) : null}

      <div className="cc-docai__toc" role="tablist" aria-label={ar ? 'أقسام المستند' : 'Document sections'}>
        {document.sections.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === activeSectionIndex}
            className={`cc-docai__toc-item${i === activeSectionIndex ? ' cc-docai__toc-item--on' : ''}`}
            onClick={() => setActiveSection(i)}
          >
            <span className="cc-docai__toc-num">{i + 1}</span>
            {s.title}
          </button>
        ))}
      </div>

      <article className="cc-docai__page" aria-label={section.title}>
        <header className="cc-docai__page-head">
          <img src="/dmcc-logo.png" alt="DMCC" className="cc-docai__page-logo" />
          <div>
            <p className="cc-docai__page-kicker">DMCC · Confidential</p>
            <h2 className="cc-docai__page-title">{section.title}</h2>
          </div>
        </header>
        <MarkdownBlock text={section.body} />
        <footer className="cc-docai__page-foot">
          <span>v{document.version}</span>
          <span>
            {activeSectionIndex + 1} / {document.sections.length}
          </span>
        </footer>
      </article>
    </div>
  );
}

import { Fragment } from 'react';

export function mdToNodes(text: string) {
  const lines = text.split('\n');
  const out: React.ReactNode[] = [];
  let list: React.ReactNode[] | null = null;
  let key = 0;

  const inline = (s: string) => {
    const parts = s.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
      p.startsWith('**') && p.endsWith('**') ? (
        <strong key={i} style={{ fontWeight: 700, color: 'var(--ink)' }}>
          {p.slice(2, -2)}
        </strong>
      ) : (
        <Fragment key={i}>{p}</Fragment>
      ),
    );
  };

  const flush = () => {
    if (list) {
      out.push(
        <ul key={`u${key++}`} style={{ margin: '6px 0 12px', paddingInlineStart: 20, display: 'grid', gap: 5 }}>
          {list}
        </ul>,
      );
      list = null;
    }
  };

  lines.forEach((ln) => {
    const t = ln.trim();
    if (!t) {
      flush();
      return;
    }
    if (/^[•\-]\s/.test(t)) {
      list = list || [];
      list.push(
        <li key={key++} style={{ lineHeight: 1.55 }}>
          {inline(t.replace(/^[•\-]\s/, ''))}
        </li>,
      );
      return;
    }
    flush();
    if (/^\*\*.+\*\*$/.test(t)) {
      out.push(
        <div key={key++} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15.5, margin: '12px 0 6px' }}>
          {t.slice(2, -2)}
        </div>,
      );
      return;
    }
    out.push(
      <p key={key++} style={{ margin: '0 0 10px', lineHeight: 1.6 }}>
        {inline(t)}
      </p>,
    );
  });
  flush();
  return out;
}

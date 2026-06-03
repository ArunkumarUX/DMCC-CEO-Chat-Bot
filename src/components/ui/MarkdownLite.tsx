/** Lightweight markdown renderer for assistant messages */
export function MarkdownLite({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length) {
      elements.push(
        <ul key={key++} className="my-2 ms-5 list-disc space-y-1 text-adgm-charcoal">
          {listItems.map((item, i) => (
            <li key={i}>{item.replace(/^[-*]\s*/, '')}</li>
          ))}
        </ul>,
      );
      listItems = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h3 key={key++} className="mt-4 mb-2 font-display text-base font-semibold text-adgm-navy first:mt-0">
          {line.slice(3)}
        </h3>,
      );
    } else if (line.match(/^\d+\.\s/)) {
      flushList();
      elements.push(
        <p key={key++} className="my-1 text-adgm-charcoal">
          {line}
        </p>,
      );
    } else if (line.startsWith('- ')) {
      listItems.push(line);
    } else if (line.trim() === '') {
      flushList();
    } else {
      flushList();
      const html = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
      elements.push(
        <p
          key={key++}
          className="my-1.5 text-adgm-charcoal leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />,
      );
    }
  }
  flushList();

  return <div className="prose-adgm text-[15px]">{elements}</div>;
}

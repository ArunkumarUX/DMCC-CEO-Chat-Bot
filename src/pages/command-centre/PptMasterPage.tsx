// @ts-nocheck
import { useMemo, useState } from 'react';
import { CcIcon } from '../../command-centre/CcIcon';
import { useApp } from '../../context/AppContext';
import {
  buildDeckSourceMarkdown,
  downloadDeckSourceMarkdown,
  PPT_MASTER_CURSOR_PROMPT,
} from '../../utils/exportDeckSource';

export function PptMasterPage() {
  const { conversations, activeConversationId, settings } = useApp();
  const ar = settings.language === 'ar';
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const active = useMemo(
    () => conversations.find((c) => c.id === activeConversationId) ?? conversations[0] ?? null,
    [conversations, activeConversationId],
  );

  const t = ar
    ? {
        title: 'منشئ العروض (محلي)',
        sub: 'PPT Master — ملف PowerPoint قابل للتحرير. غير منشور على الإنترنت.',
        local: 'محلي فقط',
        setup: 'التثبيت',
        setup1: 'npm run ppt-master:setup',
        setup2: 'أضف VITE_ENABLE_PPT_MASTER=true في .env.local',
        export: 'تصدير مصدر الإحاطة',
        exportHint: 'يحمّل ملف Markdown من المحادثة النشطة + ملاحظاتك.',
        notes: 'ملاحظات للعرض (اختياري)',
        prompt: 'نسخ أمر Cursor',
        promptHint: 'الصق في Cursor بعد حفظ الملف في sources/',
        paths: 'المسارات',
        upstream: 'المستودع الأصلي',
      }
    : {
        title: 'Deck builder (local)',
        sub: 'PPT Master — real editable PowerPoint. Not published to production.',
        local: 'Local only',
        setup: 'Setup',
        setup1: 'npm run ppt-master:setup',
        setup2: 'Set VITE_ENABLE_PPT_MASTER=true in .env.local',
        export: 'Download briefing source',
        exportHint: 'Markdown from the active conversation plus your notes.',
        notes: 'Deck notes (optional)',
        prompt: 'Copy Cursor prompt',
        promptHint: 'Paste in Cursor after saving the file to sources/',
        paths: 'Paths',
        upstream: 'Upstream repo',
      };

  const handleExport = () => {
    const md = buildDeckSourceMarkdown(active, notes);
    downloadDeckSourceMarkdown(md);
  };

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(PPT_MASTER_CURSOR_PROMPT);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="content-pad mi-page-enter">
      <div className="cc-ppt-master">
        <header className="cc-ppt-master__head">
          <div>
            <span className="pill warn cc-ppt-master__badge">{t.local}</span>
            <h1 className="type-title" style={{ marginTop: 10 }}>
              {t.title}
            </h1>
            <p className="muted-3" style={{ marginTop: 6, maxWidth: 560 }}>
              {t.sub}
            </p>
          </div>
          <CcIcon name="presentation" size={32} className="cc-ppt-master__icon" />
        </header>

        <section className="card card-pad cc-ppt-master__block">
          <h2 className="type-sub" style={{ marginBottom: 12 }}>
            {t.setup}
          </h2>
          <ol className="cc-ppt-master__steps muted-3">
            <li>
              <code>{t.setup1}</code>
            </li>
            <li>
              <code>{t.setup2}</code> — then restart <code>npm run dev</code>
            </li>
            <li>
              Save exported markdown to{' '}
              <code>tools/ppt-master-adgm/projects/adgm-command-centre/sources/deck-source.md</code>
            </li>
            <li>Use Cursor with the copied prompt to run the PPT Master pipeline</li>
          </ol>
        </section>

        <section className="card card-pad cc-ppt-master__block">
          <label className="cc-ppt-master__label" htmlFor="ppt-notes">
            {t.notes}
          </label>
          <textarea
            id="ppt-notes"
            className="cc-ppt-master__textarea"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={
              ar
                ? 'مثال: ملخص مجلس الإدارة Q2، 8 شرائح، عربي/إنجليزي للشريحة الأخيرة'
                : 'e.g. Q2 board pack, 8 slides, bilingual closing slide'
            }
          />
          <p className="muted-3" style={{ fontSize: 12, marginTop: 8 }}>
            {active
              ? ar
                ? `المحادثة: ${active.title}`
                : `Conversation: ${active.title}`
              : ar
                ? 'لا توجد محادثة — أضف ملاحظات فقط.'
                : 'No conversation — notes only.'}
          </p>
          <div className="cc-ppt-master__actions">
            <button type="button" className="btn btn-primary" onClick={handleExport}>
              <CcIcon name="download" size={16} />
              {t.export}
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleCopyPrompt}>
              <CcIcon name="copy" size={16} />
              {copied ? (ar ? 'تم النسخ' : 'Copied') : t.prompt}
            </button>
          </div>
          <p className="muted-3" style={{ fontSize: 12, marginTop: 10 }}>
            {t.exportHint}
          </p>
        </section>

        <section className="card card-pad cc-ppt-master__block">
          <h2 className="type-sub" style={{ marginBottom: 10 }}>
            {t.paths}
          </h2>
          <ul className="cc-ppt-master__paths">
            <li>
              <code>tools/ppt-master/</code> — upstream clone (gitignored)
            </li>
            <li>
              <code>tools/ppt-master-adgm/projects/adgm-command-centre/</code> — ADGM sources
            </li>
            <li>
              <code>.cursor/skills/adgm-ppt-deck/SKILL.md</code> — Cursor skill wrapper
            </li>
          </ul>
          <a
            className="btn btn-ghost btn-sm"
            href="https://github.com/hugohe3/ppt-master"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.upstream} (MIT)
            <CcIcon name="external-link" size={14} />
          </a>
        </section>
      </div>
    </div>
  );
}

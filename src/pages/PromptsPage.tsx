import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Copy } from 'lucide-react';
import { PROMPT_LIBRARY, PROMPT_CATEGORIES } from '../data/dummyData';
import { useApp } from '../context/AppContext';

export function PromptsPage() {
  const [category, setCategory] = useState('All');
  const { setInputDraft, showToast, createConversation } = useApp();
  const navigate = useNavigate();

  const filtered =
    category === 'All'
      ? PROMPT_LIBRARY
      : PROMPT_LIBRARY.filter((p) => p.category === category);

  const insertPrompt = (prompt: string) => {
    createConversation();
    setInputDraft(prompt);
    showToast('Prompt inserted — open Chat to send');
    navigate('/chat');
  };

  return (
    <div className="grid mi-stagger cc-page cc-legacy" style={{ gap: 20 }}>
      <div className="w-full min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-6 w-6 text-adgm-gold" />
          <h1 className="font-display text-2xl font-semibold text-adgm-navy">Prompt library</h1>
        </div>
        <p className="text-adgm-slate mb-6">
          Starter prompts organised by the six Chief Strategy Office focus areas.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {PROMPT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                category === cat
                  ? 'bg-adgm-primary text-white'
                  : 'bg-white border border-adgm-line text-adgm-slate hover:border-adgm-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid cc-grid-auto">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border border-adgm-line bg-white p-5 shadow-adgm-sm hover:shadow-adgm-md transition-shadow"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-adgm-primary">
                {p.category}
              </span>
              <h2 className="font-semibold text-adgm-navy mt-1">{p.title}</h2>
              <p className="text-sm text-adgm-charcoal mt-2">{p.description}</p>
              <p className="text-xs text-adgm-mist mt-3 line-clamp-2 italic">"{p.prompt}"</p>
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => insertPrompt(p.prompt)}
                  className="flex-1 rounded-none bg-adgm-primary py-2.5 text-xs font-medium text-white hover:bg-adgm-primary-hover"
                >
                  Use in chat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(p.prompt);
                    showToast('Prompt copied');
                  }}
                  className="rounded-xl border border-adgm-line px-3 py-2 hover:border-adgm-gold"
                  aria-label="Copy"
                >
                  <Copy className="h-4 w-4 text-adgm-slate" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

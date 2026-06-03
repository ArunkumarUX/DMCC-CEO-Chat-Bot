import { X, ExternalLink, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export function SourcePanel() {
  const { sourcesPanelOpen, setSourcesPanelOpen, activeSources, copyMessage } = useApp();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {sourcesPanelOpen && (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-adgm-navy/20 md:bg-transparent md:pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setSourcesPanelOpen(false)}
        aria-hidden
      />
      <motion.aside
        className="fixed md:absolute inset-y-0 end-0 z-50 w-full max-w-md flex flex-col bg-white border-s border-adgm-line shadow-adgm-lg md:shadow-none"
        initial={{ x: '100%', opacity: 0.8 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0.8 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        role="complementary"
        aria-label="Knowledge sources"
      >
        <div className="flex items-center justify-between border-b border-adgm-line px-4 py-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-adgm-navy">Sources</h2>
            <p className="text-xs text-adgm-mist">{activeSources.length} references used</p>
          </div>
          <button
            type="button"
            onClick={() => setSourcesPanelOpen(false)}
            className="rounded-lg p-2 hover:bg-adgm-ivory"
            aria-label="Close sources"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {activeSources.map((src) => (
            <article
              key={src.id}
              className="rounded-xl border border-adgm-line bg-adgm-ivory/50 overflow-hidden"
            >
              <button
                type="button"
                className="w-full text-start p-4"
                onClick={() => setExpanded(expanded === src.id ? null : src.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-adgm-navy">{src.title}</p>
                    <p className="text-xs text-adgm-mist mt-0.5">{src.documentName}</p>
                    <p className="text-xs text-adgm-mist">{src.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        src.confidence >= 0.9
                          ? 'bg-emerald-100 text-adgm-success'
                          : 'bg-amber-50 text-adgm-warning'
                      }`}
                    >
                      {Math.round(src.confidence * 100)}% match
                    </span>
                    {expanded === src.id ? (
                      <ChevronUp className="h-4 w-4 text-adgm-mist" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-adgm-mist" />
                    )}
                  </div>
                </div>
              </button>
              {expanded === src.id && (
                <div className="px-4 pb-4 border-t border-adgm-line/80 pt-3">
                  <p className="text-sm text-adgm-charcoal leading-relaxed italic border-s-2 border-adgm-gold ps-3">
                    "{src.excerpt}"
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-lg border border-adgm-line bg-white px-3 py-1.5 text-xs font-medium text-adgm-navy hover:border-adgm-gold"
                      onClick={() => copyMessage(`"${src.excerpt}" — ${src.title}, ${src.documentName}`)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy citation
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-lg border border-adgm-line bg-white px-3 py-1.5 text-xs font-medium text-adgm-navy hover:border-adgm-gold"
                      onClick={() => window.open('https://www.adgm.com/', '_blank')}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open source
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </motion.aside>
    </>
      )}
    </AnimatePresence>
  );
}

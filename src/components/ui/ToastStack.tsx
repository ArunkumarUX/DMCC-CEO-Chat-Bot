import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ToastStack() {
  const { toasts, dismissToast } = useApp();
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-20 md:bottom-6 left-1/2 z-[100] flex flex-col gap-2 -translate-x-1/2 w-[min(100%-2rem,380px)]"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
      {toasts.map((t) => (
        <motion.div
          key={t.id}
          layout
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="flex items-center gap-3 rounded-xl border border-adgm-line bg-white px-4 py-3 shadow-adgm-lg"
        >
          {t.type === 'success' && <CheckCircle className="h-5 w-5 shrink-0 text-adgm-success" />}
          {t.type === 'error' && <AlertCircle className="h-5 w-5 shrink-0 text-adgm-error" />}
          {t.type === 'info' && <Info className="h-5 w-5 shrink-0 text-adgm-info" />}
          <p className="flex-1 text-sm text-adgm-navy">{t.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            className="rounded-lg p-1 text-adgm-mist hover:bg-adgm-ivory"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      ))}
      </AnimatePresence>
    </div>
  );
}

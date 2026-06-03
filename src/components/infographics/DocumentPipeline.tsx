import { motion } from 'framer-motion';
import { Upload, FileSearch, Database, MessageSquare } from 'lucide-react';

const steps = [
  { icon: Upload, label: 'Upload' },
  { icon: FileSearch, label: 'Extract' },
  { icon: Database, label: 'Index' },
  { icon: MessageSquare, label: 'Q&A' },
];

export function DocumentPipeline({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-1 relative">
        <div className="absolute top-5 left-8 right-8 h-0.5 bg-adgm-line -z-0" />
        <motion.div
          className="absolute top-5 left-8 h-0.5 bg-adgm-primary -z-0 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 'calc(100% - 4rem)' }}
        />
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              className="flex flex-col items-center gap-2 flex-1 z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border-2 border-adgm-primary-light shadow-adgm-sm"
                whileHover={{ scale: 1.08, borderColor: '#0088FF' }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Icon className="h-4 w-4 text-adgm-primary" />
              </motion.div>
              <span className="text-[10px] font-medium text-adgm-charcoal">{s.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

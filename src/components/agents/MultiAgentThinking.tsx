import { motion } from 'framer-motion';

/** Simple loading state — five agents work in the background when smart routing is on */
export function MultiAgentThinking() {
  return (
    <motion.div
      className="flex gap-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-adgm-primary-light">
        <span className="flex gap-0.5">
          <span className="thinking-dot h-1.5 w-1.5 rounded-full" />
          <span className="thinking-dot h-1.5 w-1.5 rounded-full" />
          <span className="thinking-dot h-1.5 w-1.5 rounded-full" />
        </span>
      </div>
      <div className="rounded-2xl border border-adgm-line bg-white px-4 py-3 shadow-adgm-sm">
        <p className="text-sm font-medium text-adgm-navy">Preparing your answer…</p>
        <p className="text-xs text-adgm-mist mt-1">Policy, Strategy & Chief of Staff AI</p>
      </div>
    </motion.div>
  );
}

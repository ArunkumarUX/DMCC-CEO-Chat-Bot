import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { pageTransition } from '../../lib/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/** Soft page transition when navigating between command-centre routes */
export function MiPage({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className="mi-page-enter" style={{ height: '100%' }}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        style={{ height: '100%', minHeight: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

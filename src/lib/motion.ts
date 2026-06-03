/** Shared motion presets — smooth, institutional feel */
export const springSmooth = { type: 'spring' as const, stiffness: 260, damping: 28, mass: 0.8 };
export const springGentle = { type: 'spring' as const, stiffness: 180, damping: 26, mass: 1 };
export const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: springSmooth },
};

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.28, ease: easeOut } },
};

export const hoverLift = {
  whileHover: { opacity: 0.95, transition: springGentle },
  whileTap: { scale: 0.99 },
};

// Centralized animation variants for the lel190 console.
// All animations respect prefers-reduced-motion (handled in AnimatedSection).

// Fade in from bottom with slide up — cards and contact links
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Fade in from left — section headers
export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" }
  }
};

// Simple fade in — terminal block
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Scale and fade in — skill chips
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" }
  }
};

// Container that staggers its children — sequential reveal
export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
};

// Fast stagger for small items like chips
export const staggerContainerFast = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 }
  }
};

// Spring animation for terminal window entrance
export const springIn = {
  hidden: { opacity: 0, scale: 0.965, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 130, damping: 18 }
  }
};

// Diagonal stagger for project cards
export const staggerDiagonal = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 }
  }
};
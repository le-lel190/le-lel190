// Centralized animation variants for consistency across the portfolio
// All animations respect prefers-reduced-motion for accessibility

// Fade in from bottom with slide up - great for cards and sections
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Fade in from left with slide - perfect for section headers
export const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Fade in from right with slide
export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Simple fade in
export const fadeIn = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Scale and fade in - great for pop-in effects
export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Container that staggers its children - creates sequential animation
export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Fast stagger for small items like chips
export const staggerContainerFast = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// Spring animation for terminal window entrance
export const springIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};

// Hover animation for cards with 3D tilt effect
export const hoverTilt = {
  rest: {
    scale: 1,
    rotateX: 0,
    rotateY: 0
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Hover animation with spring physics for buttons/links
export const hoverSpring = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};

// Tap animation for buttons - gives tactile feedback
export const tapScale = {
  scale: 0.95
};

// Configuration for viewport detection - when should animations trigger
export const viewportConfig = {
  once: true,  // Only animate once when scrolling down
  margin: "0px 0px -100px 0px",  // Trigger 100px before element enters viewport
  amount: 0.3  // Trigger when 30% of element is visible
};

// Reduced motion config - for users who prefer less animation
export const reducedMotionConfig = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  }
};

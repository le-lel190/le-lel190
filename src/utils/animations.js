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

// === PERSONA 5 STYLE ANIMATIONS ===

// Glitch-in effect with RGB split and slide
export const glitchIn = {
  hidden: { 
    opacity: 0,
    x: -10,
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9]
    }
  }
};

// Diagonal slash wipe-in reveal (signature Persona transition)
export const slashWipeIn = {
  hidden: { 
    opacity: 0,
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
  },
  visible: { 
    opacity: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 0.7,
      ease: [0.65, 0, 0.35, 1]
    }
  }
};

// Red flash effect on scroll trigger
export const redFlash = {
  hidden: { 
    filter: 'brightness(1) drop-shadow(0 0 0px rgba(230, 0, 18, 0))'
  },
  visible: { 
    filter: [
      'brightness(1) drop-shadow(0 0 0px rgba(230, 0, 18, 0))',
      'brightness(1.2) drop-shadow(0 0 10px rgba(230, 0, 18, 0.6))',
      'brightness(1) drop-shadow(0 0 0px rgba(230, 0, 18, 0))'
    ],
    transition: {
      duration: 0.5,
      times: [0, 0.5, 1],
      ease: "easeInOut"
    }
  }
};

// Rotate-in with scale (dynamic entrance)
export const rotateIn = {
  hidden: { 
    opacity: 0,
    rotate: -8,
    scale: 0.92
  },
  visible: { 
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
};

// Split reveal with center origin (for dividers/accents)
export const splitReveal = {
  hidden: { 
    scaleX: 0,
    opacity: 0
  },
  visible: { 
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1]
    }
  }
};

// Stagger container for diagonal rhythm (Persona-style)
export const staggerDiagonal = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};

// Slide from angle (diagonal entrance)
export const slideFromAngle = {
  hidden: { 
    opacity: 0,
    x: -40,
    y: 20,
    rotate: -3
  },
  visible: { 
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

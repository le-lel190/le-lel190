import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Reusable wrapper component that animates children when scrolled into view
 * Automatically handles:
 * - Intersection Observer setup
 * - Reduced motion preferences
 * - Viewport detection thresholds
 * - Optional glitch effects for Persona 5 style
 * 
 * Usage:
 * <AnimatedSection variants={fadeInUp}>
 *   <YourContent />
 * </AnimatedSection>
 * 
 * With glitch effect:
 * <AnimatedSection variants={fadeInUp} glitch>
 *   <YourContent />
 * </AnimatedSection>
 */
const AnimatedSection = ({ 
  children, 
  variants,
  threshold = 0.3,
  triggerOnce = true,
  className,
  style,
  glitch = false,
  ...props 
}) => {
  // Detect when element enters viewport
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  // Check if user prefers reduced motion
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If user prefers reduced motion, use simplified animation
  const animationVariants = prefersReducedMotion 
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } }
      }
    : variants;

  // Optional glitch effect on entrance
  const glitchStyle = glitch && inView && !prefersReducedMotion
    ? {
        animation: 'glitchFlash 0.4s ease-out',
      }
    : {};

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={animationVariants}
      className={className}
      style={{ ...style, ...glitchStyle }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;

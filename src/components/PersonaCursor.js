import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Custom cursor dot
const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: ${props => props.theme.accentRed};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  
  @media (pointer: coarse) {
    display: none;
  }
`;

// Cursor ring that expands on hover
const CursorRing = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  border: 2px solid ${props => props.theme.accentRed};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.6;
  
  @media (pointer: coarse) {
    display: none;
  }
`;

// Trail particles
const TrailParticle = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 4px;
  height: 4px;
  background: ${props => props.theme.accentRed};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9997;
  
  @media (pointer: coarse) {
    display: none;
  }
`;

const PersonaCursor = () => {
  // Check for reduced motion and touch devices (before any hooks)
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isTouchDevice = 
    typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState([]);
  const trailIdRef = useRef(0);
  
  // Mouse position with smooth spring animation
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const ringSpringConfig = { damping: 30, stiffness: 200 };
  const cursorXRing = useSpring(cursorX, ringSpringConfig);
  const cursorYRing = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    // Don't render custom cursor on touch devices or if reduced motion is preferred
    if (isTouchDevice || prefersReducedMotion) return;

    const updateCursor = (e) => {
      cursorX.set(e.clientX - 4); // Center the 8px dot
      cursorY.set(e.clientY - 4);
      
      // Add trail particle occasionally
      if (Math.random() > 0.85) {
        const newTrail = {
          id: trailIdRef.current++,
          x: e.clientX - 2,
          y: e.clientY - 2,
        };
        
        setTrails(prev => {
          const updated = [...prev, newTrail];
          // Keep only last 8 particles for performance
          return updated.slice(-8);
        });
        
        // Remove trail after animation
        setTimeout(() => {
          setTrails(prev => prev.filter(t => t.id !== newTrail.id));
        }, 800);
      }
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Add event listeners
    window.addEventListener('mousemove', updateCursor);
    document.body.addEventListener('mouseenter', handleMouseEnter, true);
    document.body.addEventListener('mouseleave', handleMouseLeave, true);

    // Hide default cursor
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `
      a, button, input, textarea, select, [role="button"] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.body.removeEventListener('mouseenter', handleMouseEnter, true);
      document.body.removeEventListener('mouseleave', handleMouseLeave, true);
      document.body.style.cursor = '';
      style.remove();
    };
  }, [cursorX, cursorY, isTouchDevice, prefersReducedMotion]);

  // Don't render on touch devices or reduced motion
  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <>
      {/* Main cursor dot */}
      <CursorDot
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Cursor ring */}
      <CursorRing
        style={{
          x: cursorXRing,
          y: cursorYRing,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.3 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Trail particles */}
      {trails.map(trail => (
        <TrailParticle
          key={trail.id}
          initial={{
            x: trail.x,
            y: trail.y,
            opacity: 0.8,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
};

export default PersonaCursor;

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Container for all background effects
const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

// Diagonal stripe pattern overlay
const DiagonalStripes = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 100px,
    rgba(230, 0, 18, 0.03) 100px,
    rgba(230, 0, 18, 0.03) 102px
  );
  animation: stripeScroll 30s linear infinite;
  
  @keyframes stripeScroll {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// Scanline overlay effect
const Scanlines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 65, 0.02) 2px,
    rgba(0, 255, 65, 0.02) 4px
  );
  animation: scanlineMove 8s linear infinite;
  
  @keyframes scanlineMove {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// Floating geometric shape
const FloatingShape = styled(motion.div)`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border: 2px solid ${props => props.$color};
  opacity: ${props => props.$opacity};
  will-change: transform;
  
  ${props => props.$shape === 'triangle' && `
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  `}
  
  ${props => props.$shape === 'diamond' && `
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  `}
  
  ${props => props.$shape === 'square' && `
    clip-path: none;
  `}
`;

// Particle burst element
const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${props => props.$color};
  border-radius: 50%;
  will-change: transform, opacity;
`;

// Corner accent - diagonal red stripe
const CornerAccent = styled.div`
  position: absolute;
  width: 300px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${props => props.theme.accentRed} 50%,
    transparent 100%
  );
  transform-origin: center;
  
  ${props => props.$corner === 'topLeft' && `
    top: 80px;
    left: -100px;
    transform: rotate(-45deg);
  `}
  
  ${props => props.$corner === 'topRight' && `
    top: 80px;
    right: -100px;
    transform: rotate(45deg);
  `}
  
  ${props => props.$corner === 'bottomLeft' && `
    bottom: 80px;
    left: -100px;
    transform: rotate(45deg);
  `}
  
  ${props => props.$corner === 'bottomRight' && `
    bottom: 80px;
    right: -100px;
    transform: rotate(-45deg);
  `}
  
  animation: accentPulse 3s ease-in-out infinite;
  
  @keyframes accentPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.3;
  }
`;

// Generate random shapes
const generateShapes = (count) => {
  const shapes = ['triangle', 'diamond', 'square'];
  const colors = ['rgba(230, 0, 18, 0.15)', 'rgba(0, 255, 65, 0.1)', 'rgba(255, 255, 0, 0.08)'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    shape: shapes[i % shapes.length],
    color: colors[i % colors.length],
    size: 30 + (i % 4) * 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: 0.15 + Math.random() * 0.15,
    duration: 20 + Math.random() * 15,
    delay: Math.random() * 5,
    rotationDirection: Math.random() > 0.5 ? 1 : -1,
  }));
};

// Generate particles for burst effect
const generateParticles = (count) => {
  const colors = ['#e60012', '#00ff41', '#ffff00'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    x: [0, 0, 50, 0, 100][i % 5], // Corner positions
    y: [0, 100, 0, 0, 100][i % 5],
    delay: i * 0.3,
    duration: 2 + Math.random() * 2,
  }));
};

const PersonaBackground = () => {
  // Memoize shape and particle generation
  const shapes = useMemo(() => generateShapes(18), []);
  const particles = useMemo(() => generateParticles(12), []);
  
  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <BackgroundContainer>
      {/* Diagonal stripe pattern */}
      <DiagonalStripes />
      
      {/* Scanline effect */}
      <Scanlines />
      
      {/* Corner accent lines */}
      <CornerAccent $corner="topLeft" />
      <CornerAccent $corner="topRight" />
      <CornerAccent $corner="bottomLeft" />
      <CornerAccent $corner="bottomRight" />
      
      {/* Floating geometric shapes */}
      {!prefersReducedMotion && shapes.map(shape => (
        <FloatingShape
          key={shape.id}
          $shape={shape.shape}
          $color={shape.color}
          $size={shape.size}
          $opacity={shape.opacity}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, shape.rotationDirection * 180, shape.rotationDirection * 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Particle bursts */}
      {!prefersReducedMotion && particles.map(particle => (
        <Particle
          key={particle.id}
          $color={particle.color}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
            y: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: 3 + Math.random() * 4,
            ease: "easeOut",
          }}
        />
      ))}
    </BackgroundContainer>
  );
};

export default PersonaBackground;

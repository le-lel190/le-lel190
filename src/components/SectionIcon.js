import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const IconContainer = styled(motion.div)`
  display: inline-block;
  width: ${props => props.$size || 48}px;
  height: ${props => props.$size || 48}px;
  margin-right: 16px;
  vertical-align: middle;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

// Path animation variant for stroke draw-in effect
const pathVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1.2,
        ease: "easeInOut",
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
};

// Container animation
const containerVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  },
};

// Icon types
const icons = {
  // Projects icon: code brackets </>
  projects: (color) => (
    <>
      <motion.path
        d="M 15 12 L 8 24 L 15 36"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={pathVariants}
      />
      <motion.path
        d="M 33 12 L 40 24 L 33 36"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={pathVariants}
      />
      <motion.path
        d="M 28 10 L 20 38"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        variants={pathVariants}
      />
    </>
  ),

  // Skills icon: terminal window with cursor
  skills: (color) => (
    <>
      <motion.rect
        x="6"
        y="10"
        width="36"
        height="28"
        stroke={color}
        strokeWidth="3"
        fill="none"
        rx="2"
        variants={pathVariants}
      />
      <motion.line
        x1="6"
        y1="16"
        x2="42"
        y2="16"
        stroke={color}
        strokeWidth="3"
        variants={pathVariants}
      />
      <motion.path
        d="M 12 24 L 16 28 L 12 32"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={pathVariants}
      />
      <motion.line
        x1="20"
        y1="30"
        x2="28"
        y2="30"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        variants={pathVariants}
      />
    </>
  ),

  // Contact icon: message bubble with dots
  contact: (color) => (
    <>
      <motion.path
        d="M 8 12 L 8 30 L 14 30 L 18 36 L 18 30 L 40 30 L 40 12 Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={pathVariants}
      />
      <motion.circle
        cx="18"
        cy="21"
        r="2"
        fill={color}
        variants={pathVariants}
      />
      <motion.circle
        cx="24"
        cy="21"
        r="2"
        fill={color}
        variants={pathVariants}
      />
      <motion.circle
        cx="30"
        cy="21"
        r="2"
        fill={color}
        variants={pathVariants}
      />
    </>
  ),

  // Hero icon: geometric profile silhouette (abstract)
  hero: (color) => (
    <>
      <motion.circle
        cx="24"
        cy="18"
        r="8"
        stroke={color}
        strokeWidth="3"
        fill="none"
        variants={pathVariants}
      />
      <motion.path
        d="M 10 42 Q 12 32 24 32 Q 36 32 38 42"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        variants={pathVariants}
      />
      <motion.path
        d="M 8 38 L 40 38"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        variants={pathVariants}
      />
    </>
  ),

  // Generic geometric icon (fallback)
  default: (color) => (
    <>
      <motion.path
        d="M 24 8 L 40 24 L 24 40 L 8 24 Z"
        stroke={color}
        strokeWidth="3"
        fill="none"
        variants={pathVariants}
      />
      <motion.circle
        cx="24"
        cy="24"
        r="4"
        fill={color}
        variants={pathVariants}
      />
    </>
  ),
};

const SectionIcon = ({ 
  type = 'default', 
  size = 48, 
  color,
  animated = true,
  className 
}) => {
  const theme = color || '#e60012'; // Default to Persona red
  const iconRenderer = icons[type] || icons.default;

  return (
    <IconContainer 
      $size={size} 
      className={className}
      variants={containerVariants}
      initial={animated ? "hidden" : "visible"}
      animate="visible"
      whileHover={{ 
        scale: 1.1,
        rotate: 5,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 15 
        }
      }}
    >
      <Svg viewBox="0 0 48 48">
        <motion.g
          initial={animated ? "hidden" : "visible"}
          animate="visible"
        >
          {iconRenderer(theme)}
        </motion.g>
      </Svg>
    </IconContainer>
  );
};

export default SectionIcon;

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import SectionIcon from './SectionIcon';
import { fadeInLeft, fadeIn, staggerContainerFast, scaleIn } from '../utils/animations';

const Section = styled.section`
  padding: 80px 0;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const SectionHeader = styled.div`
  font-family: ${props => props.theme.fontMono};
  font-size: 1.1rem;
  color: ${props => props.theme.accent};
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  position: relative;

  .prompt { color: ${props => props.theme.secondaryText}; }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100px;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${props => props.theme.accentRed} 0%,
      transparent 100%
    );
  }
`;

const TerminalBlock = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 30px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    width: 60px;
    height: 60px;
    background: linear-gradient(
      135deg,
      ${props => props.theme.accentRedGlow} 0%,
      transparent 100%
    );
    clip-path: polygon(100% 0, 100% 100%, 0 0);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 4px,
      rgba(230, 0, 18, 0.02) 4px,
      rgba(230, 0, 18, 0.02) 8px
    );
    pointer-events: none;
  }
`;

const CategoryHeader = styled.h3`
  font-family: ${props => props.theme.fontMono};
  font-size: 0.85rem;
  color: ${props => props.theme.secondaryText};
  margin-bottom: 12px;
  margin-top: ${props => props.$first ? '0' : '24px'};

  &::before {
    content: '# ';
    color: ${props => props.theme.accent};
  }
`;

const SkillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SkillChip = styled(motion.span)`
  display: inline-block;
  font-family: ${props => props.theme.fontMono};
  font-size: 0.8rem;
  padding: 4px 12px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 3px;
  color: ${props => props.theme.text};
  margin-right: 8px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(230, 0, 18, 0.05) 100%
  );

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.glowBorderRed};
    transition: left 0.3s ease;
    z-index: -1;
  }

  &:hover {
    border-color: ${props => props.theme.accentRed};
    color: ${props => props.theme.accentRed};
    box-shadow: 0 0 10px ${props => props.theme.glowBorderRed};
    transform: rotate(-2deg);
  }

  &:hover::before {
    left: 0;
  }
`;

const skillsData = [
  {
    category: 'Languages',
    skills: ['Python', 'C/C++', 'Java', 'R', 'SQL']
  },
  {
    category: 'Web Development',
    skills: ['React', 'Node.js', 'Express.js', 'JavaScript', 'HTML/CSS']
  },
  {
    category: 'Tools',
    skills: ['Git', 'Linux', 'Docker']
  }
];

const Skills = () => {
  return (
    <Section id="skills">
      <AnimatedSection variants={fadeInLeft}>
        <SectionHeader>
          <SectionIcon type="skills" size={40} />
          <span className="prompt">&gt; </span>cat skills.txt
        </SectionHeader>
      </AnimatedSection>
      
      <AnimatedSection variants={fadeIn}>
        <TerminalBlock>
          {skillsData.map((category, index) => (
            <div key={index}>
              <CategoryHeader $first={index === 0}>{category.category}</CategoryHeader>
              <motion.div
                variants={staggerContainerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <SkillsRow>
                  {category.skills.map((skill, i) => (
                    <SkillChip 
                      key={i}
                      variants={scaleIn}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 2,
                        transition: { 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 10 
                        }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </SkillChip>
                  ))}
                </SkillsRow>
              </motion.div>
            </div>
          ))}
        </TerminalBlock>
      </AnimatedSection>
    </Section>
  );
};

export default Skills;

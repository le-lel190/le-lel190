import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { fadeInLeft, fadeIn, staggerContainerFast, scaleIn } from '../utils/animations';

const Section = styled.section`
  padding: 88px 0;
  border-top: 1px solid ${props => props.theme.border};
`;

const SectionHeader = styled.div`
  font-family: ${props => props.theme.fontMono};
  font-size: 1.05rem;
  color: ${props => props.theme.text};
  margin-bottom: 12px;
  display: flex;
  align-items: center;

  .prompt {
    color: ${props => props.theme.accent};
    margin-right: 8px;
  }
`;

const SectionRule = styled.div`
  width: 152px;
  height: 1px;
  background: linear-gradient(90deg, ${props => props.theme.accent}, transparent);
  margin-bottom: 44px;
`;

const TerminalBlock = styled.div`
  background: ${props => props.theme.panel};
  border: 1px solid ${props => props.theme.borderStrong};
  border-radius: 10px;
  padding: 30px 32px;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadowPanel};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 140px;
    right: 160px;
    height: 1px;
    background: linear-gradient(90deg, ${props => props.theme.accent}, transparent 76%);
  }
`;

const CategoryHeader = styled.h3`
  font-family: ${props => props.theme.fontMono};
  font-size: 0.8rem;
  color: ${props => props.theme.textDim};
  margin-bottom: 14px;
  margin-top: ${props => props.$first ? '0' : '28px'};

  &::before {
    content: '# ';
    color: ${props => props.theme.accent};
  }
`;

const SkillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SkillChip = styled(motion.span)`
  display: inline-block;
  font-family: ${props => props.theme.fontMono};
  font-size: 0.79rem;
  padding: 5px 12px;
  border: 1px solid ${props => props.theme.borderStrong};
  border-radius: 5px;
  color: ${props => props.theme.text};
  background: ${props => props.theme.surface};
  transition: all 0.18s ease;

  &:hover {
    border-color: ${props => props.theme.accentLine};
    color: ${props => props.theme.accent};
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
          <span className="prompt">&gt;</span> cat skills.txt
        </SectionHeader>
        <SectionRule />
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
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
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
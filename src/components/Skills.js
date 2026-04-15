import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 80px 0;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const SectionHeader = styled.div`
  font-family: ${props => props.theme.fontMono};
  font-size: 1.1rem;
  color: ${props => props.theme.accent};
  margin-bottom: 30px;

  .prompt { color: ${props => props.theme.secondaryText}; }
`;

const TerminalBlock = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 30px;
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

const SkillChip = styled.span`
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

  &:hover {
    border-color: ${props => props.theme.accent};
    color: ${props => props.theme.accent};
    box-shadow: 0 0 10px ${props => props.theme.glowBorder};
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
      <SectionHeader><span className="prompt">&gt; </span>cat skills.txt</SectionHeader>
      <TerminalBlock>
        {skillsData.map((category, index) => (
          <div key={index}>
            <CategoryHeader $first={index === 0}>{category.category}</CategoryHeader>
            <SkillsRow>
              {category.skills.map((skill, i) => (
                <SkillChip key={i}>{skill}</SkillChip>
              ))}
            </SkillsRow>
          </div>
        ))}
      </TerminalBlock>
    </Section>
  );
};

export default Skills;

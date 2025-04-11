import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 60px 0;
  border-bottom: 1px solid ${props => props.theme.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled.div`
  background-color: ${props => props.theme.secondaryBackground};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CategoryTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
`;

const SkillsList = styled.ul`
  list-style-position: inside;
  margin-top: 10px;
`;

const SkillItem = styled.li`
  margin-bottom: 5px;
  color: ${props => props.theme.text};
`;

// Sample skills data - you can replace with your actual skills
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
    category: 'Other',
    skills: ['Git', 'Linux', 'Docker']
  }
  // Add more categories as needed
];

const Skills = () => {
  return (
    <Section id="skills">
      <Title>Skills</Title>
      <SkillsGrid>
        {skillsData.map((category, index) => (
          <SkillCategory key={index}>
            <CategoryTitle>{category.category}</CategoryTitle>
            <SkillsList>
              {category.skills.map((skill, i) => (
                <SkillItem key={i}>{skill}</SkillItem>
              ))}
            </SkillsList>
          </SkillCategory>
        ))}
      </SkillsGrid>
    </Section>
  );
};

export default Skills; 
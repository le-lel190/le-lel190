import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 60px 0;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
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
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CategoryTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const SkillsList = styled.ul`
  list-style-position: inside;
  margin-top: 10px;
`;

const SkillItem = styled.li`
  margin-bottom: 5px;
`;

// Sample skills data - you can replace with your actual skills
const skillsData = [
  {
    category: 'Languages',
    skills: ['JavaScript', 'HTML/CSS', 'Python']
  },
  {
    category: 'Frameworks',
    skills: ['React']
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
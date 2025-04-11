import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 60px 0;
  border-bottom: 1px solid #e9ecef;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  margin-bottom: 1rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0;
`;

const Tag = styled.span`
  background-color: #e9ecef;
  color: #6c757d;
  font-size: 0.8rem;
  padding: 3px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 20px;
`;

const Button = styled.a`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

// Sample project data - you can replace this with your actual projects
const projectData = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Description of your project goes here',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#'
  },
  // Add more projects here
];

const Projects = () => {
  return (
    <Section id="projects">
      <Title>Projects</Title>
      <ProjectGrid>
        {projectData.map(project => (
          <ProjectCard key={project.id}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <Tags>
              {project.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Tags>
            <Button href={project.link}>View Project</Button>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Section>
  );
};

export default Projects; 
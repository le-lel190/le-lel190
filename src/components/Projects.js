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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background-color: ${props => props.theme.secondaryBackground};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: ${props => props.theme.glowBorder};
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.1);
    transform: translateY(-4px);
  }
`;

const ProjectTitle = styled.h3`
  margin-bottom: 8px;
  color: ${props => props.theme.text};
  font-family: ${props => props.theme.fontBody};
  font-size: 1.2rem;
`;

const ProjectDescription = styled.p`
  margin-bottom: 16px;
  color: ${props => props.theme.secondaryText};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const Tag = styled.span`
  font-family: ${props => props.theme.fontMono};
  font-size: 0.75rem;
  padding: 3px 8px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 3px;
  color: ${props => props.theme.accentCyan};
  margin-right: 6px;
  margin-bottom: 6px;
`;

const Button = styled.a`
  display: inline-block;
  font-family: ${props => props.theme.fontMono};
  font-size: 0.85rem;
  padding: 8px 16px;
  color: ${props => props.theme.accent};
  background: transparent;
  border: 1px solid ${props => props.theme.accent};
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.glowBorder};
    box-shadow: 0 0 10px ${props => props.theme.glowBorder};
  }
`;

const WipBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  font-family: ${props => props.theme.fontMono};
  font-size: 0.7rem;
  font-weight: 700;
  color: ${props => props.theme.warning};
  border: 1px solid ${props => props.theme.warning};
  padding: 2px 8px;
  border-radius: 3px;
`;

const ProgressBar = styled.div`
  height: 4px;
  background-color: ${props => props.theme.border};
  border-radius: 2px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.$progress}%;
  background-color: ${props => props.theme.accent};
  border-radius: 2px;
`;

const projectData = [
  {
    id: 1,
    title: 'AI API Gateway',
    description: 'An AI API gateway/platform I built to provide a clean, centralized access point for AI services at https://api.lel190.dev.',
    tags: ['AI', 'API', 'Gateway', 'Platform'],
    link: 'https://api.lel190.dev',
  },
  {
    id: 2,
    title: 'No-Account Temp Mail',
    description: 'A no-account temporary email service I built on Cloudflare for quick disposable inbox access without signup.',
    tags: ['Cloudflare Workers', 'KV', 'D1', 'Temp Mail'],
    link: 'https://971236.xyz/',
  },
  {
    id: 3,
    title: 'Secret...',
    description: 'Secret...',
    tags: ['React', 'Node.js'],
    link: '#',
    inProgress: true,
    progress: 35,
  }
];

const Projects = () => {
  return (
    <Section id="projects">
      <SectionHeader><span className="prompt">&gt; </span>ls ~/projects</SectionHeader>
      <ProjectGrid>
        {projectData.map(project => (
          <ProjectCard key={project.id}>
            {project.inProgress && <WipBadge>[WIP]</WipBadge>}
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            {project.inProgress && (
              <ProgressBar>
                <Progress $progress={project.progress} />
              </ProgressBar>
            )}
            <Tags>
              {project.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Tags>
            <Button href={project.link}>
              {project.inProgress ? '[preview]' : '[view project →]'}
            </Button>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Section>
  );
};

export default Projects;

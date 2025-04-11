import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const Section = styled.section`
  padding: 60px 0;
  border-bottom: 1px solid #e9ecef;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  ${props => props.$constructionTitle && css`
    &:after {
      content: "🚧";
      font-size: 0.8em;
      position: absolute;
      top: -10px;
      right: -30px;
      animation: jackhammer 0.5s infinite;
    }
  `}
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

// Construction stripe animation
const moveStripes = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
`;

// Blinking animation
const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

// Dust particle float animation
const floatDust = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
`;

const ProjectCard = styled.div`
  background-color: ${props => props.theme.secondaryBackground};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    
    .dust-particles .particle {
      animation-play-state: running;
    }
  }
  
  ${props => props.$inProgress && css`
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: repeating-linear-gradient(
        -45deg,
        rgba(255, 204, 0, 0.1),
        rgba(255, 204, 0, 0.1) 10px,
        rgba(0, 0, 0, 0.05) 10px,
        rgba(0, 0, 0, 0.05) 20px
      );
      z-index: 0;
      animation: ${moveStripes} 3s linear infinite;
      pointer-events: none;
    }
  `}
`;

const DustParticles = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  z-index: 3;
  pointer-events: none;
`;

const DustParticle = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background-color: rgba(255, 204, 0, 0.3);
  border-radius: 50%;
  bottom: 0;
  left: ${props => props.$left}%;
  animation: ${floatDust} ${props => props.$duration}s linear infinite;
  animation-delay: ${props => props.$delay}s;
  animation-play-state: paused;
`;

const ConstructionBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff9800;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  animation: ${blink} 2s ease-in-out infinite;
  display: flex;
  align-items: center;
`;

const ProjectContent = styled.div`
  position: relative;
  z-index: 1;
`;

const ProjectTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
`;

const ProjectDescription = styled.p`
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0;
`;

const Tag = styled.span`
  background-color: ${props => props.theme.border};
  color: ${props => props.theme.text};
  font-size: 0.8rem;
  padding: 3px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 20px;
`;

const Button = styled.a`
  display: inline-block;
  background-color: ${props => props.theme.accent};
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const ProgressBar = styled.div`
  height: 6px;
  background-color: rgba(0,0,0,0.1);
  border-radius: 3px;
  margin: 15px 0;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.$progress}%;
  background-color: #4caf50;
  border-radius: 3px;
`;

const ComingSoonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 8px;
  z-index: 10;
  
  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ComingSoonText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const EstimatedDate = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

// Helper function to create dust particles
const createDustParticles = (count) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      size: Math.random() * 5 + 2, // 2-7px
      left: Math.random() * 100, // 0-100%
      duration: Math.random() * 3 + 2, // 2-5s
      delay: Math.random() * 2 // 0-2s
    });
  }
  return particles;
};

// Sample project data - you can replace this with your actual projects
const projectData = [
  {
    id: 1,
    title: 'Secret...',
    description: 'Secret...',
    tags: ['React', 'Node.js'],
    link: '#',
    inProgress: true,
    progress: 35,
    dustParticles: createDustParticles(15),
    comingSoon: true,
    estimatedCompletion: 'To Be Available',
    icon: 'hammer' // hammer or jackhammer
  },
  // Add more projects here
];

const Projects = () => {
  return (
    <Section id="projects" className="under-construction">
      <Title>Projects</Title>
      <ProjectGrid>
        {projectData.map(project => (
          <ProjectCard 
            key={project.id} 
            $inProgress={project.inProgress}
            className={project.inProgress ? 'in-progress' : ''}
          >
            {project.inProgress && (
              <ConstructionBadge>
                <span className={`construction-icon ${project.icon}`}>
                  {project.icon === 'hammer' ? '🔨' : '🔧'}
                </span>
                IN PROGRESS
              </ConstructionBadge>
            )}
            
            {project.comingSoon && (
              <ComingSoonOverlay>
                <ComingSoonText>Coming Soon</ComingSoonText>
                <EstimatedDate>Estimated completion: {project.estimatedCompletion}</EstimatedDate>
              </ComingSoonOverlay>
            )}
            
            <ProjectContent>
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
                {project.inProgress ? 'Preview' : 'View Project'}
              </Button>
            </ProjectContent>
            
            {project.inProgress && (
              <DustParticles className="dust-particles">
                {project.dustParticles.map(particle => (
                  <DustParticle 
                    key={particle.id}
                    className="particle"
                    $size={particle.size}
                    $left={particle.left}
                    $duration={particle.duration}
                    $delay={particle.delay}
                  />
                ))}
              </DustParticles>
            )}
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Section>
  );
};

export default Projects; 
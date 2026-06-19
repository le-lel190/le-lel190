import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import SectionIcon from './SectionIcon';
import { fadeInLeft, rotateIn, staggerDiagonal } from '../utils/animations';

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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${props => props.theme.secondaryBackground};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(
      135deg,
      transparent 0%,
      ${props => props.theme.accentRedGlow} 50%,
      transparent 100%
    );
    opacity: 0;
    transition: all 0.4s ease;
    transform: skewX(-15deg);
    transform-origin: top right;
  }

  &:hover {
    border-color: ${props => props.theme.glowBorderRed};
    box-shadow: 0 0 20px ${props => props.theme.glowBorderRed};
  }

  &:hover::before {
    width: 40%;
    opacity: 1;
  }
`;

const ProjectTitle = styled.h3`
  margin-bottom: 8px;
  color: ${props => props.theme.text};
  font-family: ${props => props.theme.fontBody};
  font-size: 1.2rem;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    text-shadow: 
      2px 0 ${props => props.theme.accentRed},
      -2px 0 ${props => props.theme.accentCyan};
    animation: glitch 0.3s ease;
  }

  @keyframes glitch {
    0%, 100% { transform: translate(0); }
    25% { transform: translate(-2px, 1px); }
    50% { transform: translate(2px, -1px); }
    75% { transform: translate(-1px, -1px); }
  }
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
  position: relative;
  z-index: 1;
  overflow: hidden;

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
    color: ${props => props.theme.text};
    box-shadow: 0 0 10px ${props => props.theme.glowBorderRed};
  }

  &:hover::before {
    left: 0;
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
      <AnimatedSection variants={fadeInLeft}>
        <SectionHeader>
          <SectionIcon type="projects" size={40} />
          <span className="prompt">&gt; </span>ls ~/projects
        </SectionHeader>
      </AnimatedSection>
      
      <motion.div
        variants={staggerDiagonal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <ProjectGrid>
          {projectData.map((project, index) => (
            <ProjectCard 
              key={project.id}
              variants={rotateIn}
              whileHover={{ 
                y: -8,
                rotateX: 2,
                rotateY: 2,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
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
      </motion.div>
    </Section>
  );
};

export default Projects;

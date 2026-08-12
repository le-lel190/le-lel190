import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { fadeInLeft, staggerDiagonal } from '../utils/animations';

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
  width: 132px;
  height: 1px;
  background: linear-gradient(90deg, ${props => props.theme.accent}, transparent);
  margin-bottom: 44px;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 24px 22px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.borderStrong};
    transform: translateY(-3px);
  }
`;

const CardIndex = styled.div`
  font-family: ${props => props.theme.fontMono};
  font-size: 0.71rem;
  color: ${props => props.theme.textMuted};
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectTitle = styled.h3`
  margin-bottom: 10px;
  color: ${props => props.theme.text};
  font-family: ${props => props.theme.fontBody};
  font-size: 1.18rem;
  font-weight: 650;
  letter-spacing: -0.012em;
`;

const ProjectDescription = styled.p`
  margin-bottom: 18px;
  color: ${props => props.theme.textDim};
  font-size: 0.925rem;
  line-height: 1.65;
  flex: 1;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
`;

const Tag = styled.span`
  font-family: ${props => props.theme.fontMono};
  font-size: 0.69rem;
  padding: 3px 8px;
  border: 1px solid ${props => props.theme.borderStrong};
  border-radius: 4px;
  color: ${props => props.theme.textDim};
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  align-self: flex-start;
  font-family: ${props => props.theme.fontMono};
  font-size: 0.79rem;
  padding: 8px 14px;
  color: ${props => props.theme.accent};
  background: transparent;
  border: 1px solid ${props => props.theme.accentLine};
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.18s ease;

  &::after {
    content: '→';
    transition: transform 0.18s ease;
  }

  &:hover {
    background: ${props => props.theme.accentFaint};
    border-color: ${props => props.theme.accent};
    &::after { transform: translateX(3px); }
  }
`;

const WipBadge = styled.div`
  font-family: ${props => props.theme.fontMono};
  font-size: 0.68rem;
  font-weight: 550;
  color: ${props => props.theme.warning};
  border: 1px solid ${props => props.theme.warning};
  padding: 2px 8px;
  border-radius: 4px;
`;

const ProgressLabel = styled.div`
  font-family: ${props => props.theme.fontMono};
  font-size: 0.68rem;
  color: ${props => props.theme.textMuted};
  margin-bottom: 6px;
`;

const ProgressBar = styled.div`
  height: 4px;
  background-color: ${props => props.theme.border};
  border-radius: 99px;
  margin-bottom: 18px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.$progress}%;
  background-color: ${props => props.theme.warning};
  border-radius: 99px;
`;

const projectData = [
  {
    id: 1,
    index: '01',
    title: 'AI API Gateway',
    description: 'A centralized gateway that fronts multiple AI providers behind one clean API. Built to give apps a single key, unified rate limits, and a consistent response shape — no vendor lock-in.',
    tags: ['AI', 'API', 'Gateway', 'Platform'],
    link: 'https://api.lel190.dev',
  },
  {
    id: 2,
    index: '02',
    title: 'No-Account Temp Mail',
    description: 'Disposable inboxes without the signup tax. Runs entirely on Cloudflare Workers with KV for mailboxes and D1 for storage — instant throwaway addresses for testing and privacy.',
    tags: ['Cloudflare Workers', 'KV', 'D1', 'Temp Mail'],
    link: 'https://971236.xyz/',
  },
  {
    id: 3,
    index: '03',
    title: 'Secret',
    description: 'A reverse-engineering challenge I am building in my spare time. More details once it is ready to ship — follow along on GitHub.',
    tags: ['Reverse Engineering', 'CTF', 'React', 'Node.js'],
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
          <span className="prompt">&gt;</span> ls ~/projects
        </SectionHeader>
        <SectionRule />
      </AnimatedSection>

      <motion.div
        variants={staggerDiagonal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <ProjectGrid>
          {projectData.map((project) => (
            <ProjectCard
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
              }}
              whileTap={{ scale: 0.985 }}
            >
              <CardIndex>
                <span>{project.index}</span>
                {project.inProgress && <WipBadge>[WIP]</WipBadge>}
              </CardIndex>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              {project.inProgress && (
                <>
                  <ProgressLabel>progress — {project.progress}%</ProgressLabel>
                  <ProgressBar>
                    <Progress $progress={project.progress} />
                  </ProgressBar>
                </>
              )}
              <Tags>
                {project.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </Tags>
              <Button href={project.link}>
                {project.inProgress ? 'preview' : 'view project'}
              </Button>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </motion.div>
    </Section>
  );
};

export default Projects;
import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 64px 0 68px;
`;
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
  h2 { font: 600 clamp(1.9rem, 3vw, 2.4rem)/1.2 ${props => props.theme.fontDisplay}; letter-spacing: -0.02em; }
  code { font-size: 0.7rem; color: ${props => props.theme.textMuted}; }
`;
const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;
const ProjectCard = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.border};
  background: ${props => props.theme.surface};
  transition: border-color 180ms ease;
  &:hover, &:focus-within { border-color: ${props => props.theme.borderStrong}; }
`;
const ProjectPreview = styled.div`
  padding: 21px 26px 26px;
  min-height: 187px;
  background: ${props => props.theme.panel};
  border-bottom: 1px solid ${props => props.theme.border};
  color: ${props => props.$mail ? props.theme.warning : props.theme.accent};
  font-family: ${props => props.theme.fontMono};
  > p { font-size: 0.62rem; color: ${props => props.theme.textMuted}; margin-bottom: 20px; }
  > strong { display: block; font: 500 clamp(1.55rem, 3vw, 2.2rem) ${props => props.theme.fontDisplay}; margin-bottom: 22px; }
  @media (max-width: 380px) { padding: 20px; }
`;
const Flow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.65rem;
  span { border: 1px solid ${props => props.theme.borderStrong}; padding: 4px 9px; color: ${props => props.theme.textDim}; }
  b { font-weight: 400; }
`;
const ProjectBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 25px 26px;
  h3 { font: 600 1.4rem/1.3 ${props => props.theme.fontDisplay}; margin-bottom: 12px; }
  p { color: ${props => props.theme.textDim}; font-size: 0.9rem; line-height: 1.75; margin-bottom: 20px; }
  @media (max-width: 380px) { padding: 20px; }
`;
const Tags = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 7px 16px;
  font: 0.64rem/1.6 ${props => props.theme.fontMono};
  color: ${props => props.theme.textMuted};
  margin-top: auto;
  margin-bottom: 22px;
`;
const Button = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 44px;
  border-top: 1px solid ${props => props.theme.border};
  padding-top: 16px;
  font: 500 0.74rem ${props => props.theme.fontMono};
  color: ${props => props.theme.accent};
  text-decoration: none;
  &:hover { text-decoration: underline; }
  svg { width: 16px; height: 16px; }
`;
const WorkInProgress = styled.article`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 22px;
  border-top: 1px solid ${props => props.theme.border};
  border-bottom: 1px solid ${props => props.theme.border};
  margin-top: 24px;
  padding: 23px 0;
  h3 { font: 600 1.15rem ${props => props.theme.fontDisplay}; margin-bottom: 5px; }
  p { color: ${props => props.theme.textDim}; font-size: 0.85rem; max-width: 62ch; }
  > a { color: ${props => props.theme.text}; font: 0.7rem/1.7 ${props => props.theme.fontMono}; padding: 10px 0; }
  @media (max-width: 780px) { grid-template-columns: auto 1fr; > a { grid-column: 2; } }
`;
const WipBadge = styled.span`
  align-self: start;
  margin-top: 2px;
  padding: 5px 9px;
  font: 0.64rem ${props => props.theme.fontMono};
  color: ${props => props.theme.warning};
  border: 1px solid ${props => props.theme.borderStrong};
`;
const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  color: ${props => props.theme.textMuted};
  font: 0.62rem ${props => props.theme.fontMono};
  progress {
    appearance: none;
    border: none;
    width: 90px;
    height: 4px;
    background: ${props => props.theme.border};
    color: ${props => props.theme.warning};
    &::-webkit-progress-bar { background: ${props => props.theme.border}; }
    &::-webkit-progress-value { background: ${props => props.theme.warning}; }
    &::-moz-progress-bar { background: ${props => props.theme.warning}; }
  }
`;

const projectData = [
  {
    title: 'AI API Gateway',
    description: 'A centralized gateway that fronts multiple AI providers behind one clean API. Built to give apps a single key, unified rate limits, and a consistent response shape — no vendor lock-in.',
    tags: ['AI', 'API', 'Gateway', 'Platform'],
    link: 'https://api.lel190.dev',
    domain: 'api.lel190.dev',
    diagramLabel: 'REQUEST FLOW / ONE ENDPOINT, MULTIPLE PROVIDERS',
    flow: ['your app', 'gateway', 'AI providers'],
  },
  {
    title: 'No-Account Temp Mail',
    description: 'Disposable inboxes without the signup tax. Runs entirely on Cloudflare Workers with KV for mailboxes and D1 for storage — instant throwaway addresses for testing and privacy.',
    tags: ['Cloudflare Workers', 'KV', 'D1', 'Temp Mail'],
    link: 'https://971236.xyz/',
    domain: '@971236.xyz',
    diagramLabel: 'MAILBOX ARCHITECTURE / NO ACCOUNT REQUIRED',
    flow: ['Workers', 'KV', 'D1'],
    mail: true,
  },
];

const Projects = () => (
  <Section id="projects" aria-labelledby="projects-heading">
    <SectionHeader>
      <h2 id="projects-heading">Things I've built.</h2>
      <code>ls ~/projects</code>
    </SectionHeader>
    <ProjectGrid>
      {projectData.map(project => (
        <ProjectCard key={project.title}>
          <ProjectPreview $mail={project.mail}>
            <p>{project.diagramLabel}</p>
            <strong>{project.domain}</strong>
            <Flow aria-label={project.mail ? 'Built with Workers, KV and D1' : 'Request flows from your app through the gateway to AI providers'}>
              {project.flow.map((item, i) => (
                <React.Fragment key={item}>
                  {i > 0 && <b aria-hidden="true">{project.mail ? '+' : '→'}</b>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </Flow>
          </ProjectPreview>
          <ProjectBody>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Tags aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</Tags>
            <Button href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title}`}>
              View project
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10" /></svg>
            </Button>
          </ProjectBody>
        </ProjectCard>
      ))}
    </ProjectGrid>
    <WorkInProgress>
      <WipBadge>WIP</WipBadge>
      <div>
        <h3>Secret project</h3>
        <p>A reverse-engineering challenge in the making. Keeping this one under wraps for now.</p>
        <Progress><progress value="35" max="100" aria-label="Secret project progress" />35% / still tinkering</Progress>
        <Tags style={{ marginTop: 12, marginBottom: 0 }} aria-label="Technologies">
          <li>Reverse Engineering</li><li>CTF</li><li>React</li><li>Node.js</li>
        </Tags>
      </div>
      <a href="https://github.com/le-lel190" target="_blank" rel="noopener noreferrer">Follow on GitHub ↗</a>
    </WorkInProgress>
  </Section>
);

export default Projects;

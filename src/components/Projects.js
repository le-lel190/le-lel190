import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 64px 0 72px;
`;
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
  h2 { font: 600 ${props => props.theme.sectionTitle}/1.2 ${props => props.theme.fontDisplay}; letter-spacing: -0.02em; }
  p { color: ${props => props.theme.textDim}; font-size: 0.9rem; }
`;
const Project = styled.article`
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  align-items: center;
  gap: 40px;
  padding: 32px;
  border-top: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.readingSurface};
  + article { margin-top: 24px; }
  > * { min-width: 0; }
  @media (max-width: 900px) { gap: 24px; padding: 24px; }
  @media (max-width: 720px) { grid-template-columns: 1fr; }
  @media (max-width: 380px) { padding: 20px; }
`;
const ProjectBody = styled.div`
  h3 { font: 600 clamp(1.6rem, 2.8vw, 2rem)/1.2 ${props => props.theme.fontDisplay}; letter-spacing: -0.02em; margin-bottom: 16px; }
  > p { color: ${props => props.theme.textDim}; font-size: 0.95rem; line-height: 1.8; max-width: 48ch; }
`;
const Tags = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-top: 24px;
  font: 0.75rem/1.6 ${props => props.theme.fontMono};
  color: ${props => props.theme.textMuted};
`;
const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  min-height: 44px;
  margin-top: 20px;
  color: ${props => props.theme.accent};
  font: 500 0.8rem ${props => props.theme.fontMono};
  text-decoration-thickness: 1px;
  svg { width: 18px; height: 18px; }
  &:hover { color: ${props => props.theme.text}; }
`;
const Diagram = styled.figure`
  padding: 28px 24px 20px;
  background: ${props => props.theme.panel};
  border: 1px solid ${props => props.theme.border};
  text-align: center;
  font-family: ${props => props.theme.fontMono};
  figcaption { margin-top: 24px; color: ${props => props.theme.textMuted}; font-size: 0.75rem; }
  @media (max-width: 380px) { padding-inline: 16px; }
`;
const Client = styled.div`
  color: ${props => props.theme.textDim};
  font-size: 0.8rem;
  &::after { content: ''; display: block; height: 24px; width: 1px; margin: 12px auto 0; background: ${props => props.theme.borderStrong}; }
`;
const Gateway = styled.div`
  border: 1px solid ${props => props.theme.accentLine};
  padding: 20px 12px;
  background: ${props => props.theme.accentFaint};
  strong { display: block; font: 500 clamp(1.2rem, 2.5vw, 1.7rem) ${props => props.theme.fontDisplay}; color: ${props => props.theme.accent}; }
  span { display: block; margin-top: 8px; color: ${props => props.theme.textDim}; font-size: 0.75rem; }
`;
const ProviderBranches = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  padding-top: 24px;
  background: linear-gradient(${props => props.theme.borderStrong}, ${props => props.theme.borderStrong}) center top / 1px 24px no-repeat;
  span { width: 48px; height: 32px; border: 1px solid ${props => props.theme.borderStrong}; position: relative; }
  span::after { content: ''; position: absolute; inset: 10px 12px; border-top: 1px solid ${props => props.theme.accent}; border-bottom: 1px solid ${props => props.theme.borderStrong}; }
`;
const MailPreview = styled.figure`
  border: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.panel};
  > div { display: flex; justify-content: space-between; gap: 12px; padding: 12px 16px; color: ${props => props.theme.warning}; font: 0.75rem ${props => props.theme.fontMono}; }
  img { width: 100%; height: auto; border-block: 1px solid ${props => props.theme.border}; }
  figcaption { padding: 16px; color: ${props => props.theme.textDim}; font: 0.75rem/1.7 ${props => props.theme.fontMono}; }
`;
const WorkInProgress = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 24px;
  margin-top: 32px;
  padding: 24px 0;
  border-block: 1px solid ${props => props.theme.borderStrong};
  h3 { font: 500 1.3rem/1.4 ${props => props.theme.fontDisplay}; margin-bottom: 8px; }
  p { color: ${props => props.theme.textDim}; font-size: 0.9rem; max-width: 65ch; }
  a { display: inline-flex; align-items: center; min-height: 44px; color: ${props => props.theme.accent}; font: 0.75rem ${props => props.theme.fontMono}; margin-top: 8px; }
  @media (max-width: 380px) { gap: 16px; }
`;
const WipBadge = styled.span`
  padding: 4px 8px;
  border: 1px solid ${props => props.theme.borderStrong};
  color: ${props => props.theme.warning};
  font: 0.75rem/1.7 ${props => props.theme.fontMono};
`;
const ExternalArrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10" /></svg>
);

const Projects = () => (
  <Section id="projects" aria-labelledby="projects-heading">
    <SectionHeader>
      <h2 id="projects-heading">Things I've built.</h2>
      <p>Useful services. A few rabbit holes.</p>
    </SectionHeader>
    <Project>
      <ProjectBody>
        <h3>AI API Gateway</h3>
        <p>One endpoint for multiple AI providers. A single API key, unified rate limits, and a consistent response shape keep the integration in one place.</p>
        <Tags aria-label="Project features"><li>API routing</li><li>Multiple providers</li><li>Rate limiting</li></Tags>
        <ProjectLink href="https://api.lel190.dev" target="_blank" rel="noopener noreferrer" aria-label="View AI API Gateway">api.lel190.dev <ExternalArrow /></ProjectLink>
      </ProjectBody>
      <Diagram aria-label="Request flow: your app connects through the gateway to multiple AI providers">
        <Client>your app</Client>
        <Gateway><strong>api.lel190.dev</strong><span>one key / one endpoint</span></Gateway>
        <ProviderBranches aria-hidden="true"><span /><span /><span /></ProviderBranches>
        <figcaption>multiple AI providers / consistent responses</figcaption>
      </Diagram>
    </Project>
    <Project>
      <ProjectBody>
        <h3>No-Account Temp Mail</h3>
        <p>A disposable inbox without the signup. Built for my own testing and privacy needs, using Cloudflare Workers, KV for mailboxes, and D1 for storage.</p>
        <Tags aria-label="Technologies"><li>Cloudflare Workers</li><li>KV</li><li>D1</li></Tags>
        <ProjectLink href="https://971236.xyz/" target="_blank" rel="noopener noreferrer" aria-label="View No-Account Temp Mail">971236.xyz <ExternalArrow /></ProjectLink>
      </ProjectBody>
      <MailPreview>
        <div><span>971236.xyz</span><span>inbox preview</span></div>
        <img src={`${process.env.PUBLIC_URL}/images/temp-mail-preview.webp`} alt="The temporary-mail app showing its empty inbox" width="900" height="430" loading="lazy" />
        <figcaption>A small tool, built for personal use.</figcaption>
      </MailPreview>
    </Project>
    <WorkInProgress>
      <WipBadge>WIP</WipBadge>
      <div>
        <h3>Currently taking apart: Unity.</h3>
        <p>A function-hooking experiment. Still tinkering with this one; more to share when it's ready.</p>
        <a href="https://github.com/le-lel190" target="_blank" rel="noopener noreferrer">Follow along on GitHub</a>
      </div>
    </WorkInProgress>
  </Section>
);

export default Projects;

import React from 'react';
import styled from 'styled-components';
import { AnthropicIcon, GeminiIcon, OpenAIIcon } from './ProviderIcons';

const Section = styled.section`
  padding: 72px 0 0;
  @media (max-width: 720px) { padding-top: 48px; }
`;
const SectionHead = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 10px 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${props => props.theme.borderStrong};
  h2 {
    font-family: ${props => props.theme.fontDisplay};
    font-size: ${props => props.theme.sectionTitle};
    font-weight: 700;
    font-stretch: 80%;
    text-transform: uppercase;
    letter-spacing: -0.015em;
    line-height: 1.05;
  }
  p { color: ${props => props.theme.textMuted}; font: 400 0.72rem/1.6 ${props => props.theme.fontMono}; }
  @media (max-width: 720px) { grid-template-columns: 1fr; align-items: start; }
`;
const TableHead = styled.div`
  display: grid;
  grid-template-columns: var(--spec-columns);
  gap: 0 20px;
  padding: 10px 0;
  border-bottom: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textMuted};
  font: 400 0.64rem/1.6 ${props => props.theme.fontMono};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  span:nth-child(3) { grid-column: 3 / span 2; }
  @media (max-width: 1100px) {
    grid-template-columns: 44px minmax(0, 1fr);
    span:nth-child(3), span:nth-child(4) { display: none; }
  }
`;
const Row = styled.article`
  display: grid;
  grid-template-columns: var(--spec-columns);
  gap: 0 20px;
  align-items: start;
  padding: 26px 0 30px;
  border-bottom: 1px solid ${props => props.theme.border};
  transition: background 160ms ease;
  &:hover { background: ${props => props.theme.accentFaint}; }
  @media (max-width: 1100px) {
    grid-template-columns: 44px minmax(0, 1fr);
  }
`;
const Pin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  color: ${props => props.theme.accentDim};
  font: 500 0.72rem/1 ${props => props.theme.fontMono};
  padding-top: 5px;
  &::before {
    content: '';
    width: 13px;
    height: 13px;
    border: 1px solid ${props => props.theme.accentDim};
    background: ${props => props.theme.background};
    box-shadow: inset 0 0 0 2px ${props => props.theme.background}, inset 0 0 0 3px ${props => props.theme.accentDim};
  }
  @media (max-width: 720px) { flex-direction: row; gap: 8px; }
`;
const Body = styled.div`
  h3 {
    font-family: ${props => props.theme.fontDisplay};
    font-size: clamp(1.42rem, 2.5vw, 1.95rem);
    font-weight: 700;
    font-stretch: 82%;
    line-height: 1.05;
    text-transform: uppercase;
    letter-spacing: -0.012em;
    margin-bottom: 10px;
  }
  > p { color: ${props => props.theme.textDim}; font-size: 0.92rem; line-height: 1.75; max-width: 56ch; }
`;
const Ref = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  min-height: 32px;
  color: ${props => props.theme.accent};
  font: 500 0.78rem ${props => props.theme.fontMono};
  text-decoration: none;
  border-bottom: 1px solid ${props => props.theme.accentLine};
  &:hover { color: ${props => props.theme.text}; border-color: ${props => props.theme.text}; }
  svg { width: 13px; height: 13px; }
`;
const Specs = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  margin-top: 14px;
  color: ${props => props.theme.textMuted};
  font: 400 0.7rem/1.6 ${props => props.theme.fontMono};
  li::before { content: '· '; color: ${props => props.theme.accentDim}; }
`;
const Visual = styled.div`
  grid-column: 3 / span 2;
  max-width: 620px;
  @media (max-width: 1100px) {
    grid-column: 2;
    margin-top: 22px;
    max-width: 560px;
  }
`;
const Footprint = styled.figure`
  border: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.panel};
  padding: 14px;
  font: 400 0.66rem/1.5 ${props => props.theme.fontMono};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${props => props.theme.textMuted};
  figcaption {
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid ${props => props.theme.border};
    color: ${props => props.theme.textMuted};
    font-size: 0.64rem;
    text-transform: none;
    letter-spacing: 0.02em;
  }
`;
const FootprintHead = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: ${props => props.theme.accent};
  b { font-weight: 500; letter-spacing: 0.12em; }
`;
const Chain = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 14px;
`;
const Pad = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  padding: 9px 10px;
  border: 1px solid ${props => props.theme.border};
  background: ${props => props.theme.surface};
  color: ${props => props.theme.textDim};
  b {
    min-width: 22px;
    padding: 2px 0;
    text-align: center;
    color: ${props => props.theme.background};
    background: ${props => props.theme.accent};
    font-weight: 600;
  }
  em { font-style: normal; color: ${props => props.theme.textMuted}; font-size: 0.6rem; }
`;
const PadPrimary = styled(Pad)`
  border-color: ${props => props.theme.accentLine};
  background: ${props => props.theme.accentFaint};
  color: ${props => props.theme.text};
  b { background: ${props => props.theme.accent}; }
`;
const Bus = styled.div`
  height: 12px;
  margin: 2px 14px;
  border-left: 1px solid ${props => props.theme.borderStrong};
  border-right: 1px solid ${props => props.theme.borderStrong};
  border-top: 1px solid ${props => props.theme.accentLine};
`;
const Providers = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  margin-top: 2px;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 60px;
    padding: 9px 4px 8px;
    border: 1px dashed ${props => props.theme.borderStrong};
    color: ${props => props.theme.textDim};
    font: 500 0.62rem/1.3 ${props => props.theme.fontMono};
    letter-spacing: 0.08em;
    text-align: center;
    text-transform: uppercase;
    svg { color: ${props => props.theme.accent}; }
    em {
      display: block;
      margin-top: 2px;
      color: ${props => props.theme.textMuted};
      font-style: normal;
      font-size: 0.56rem;
      letter-spacing: 0.06em;
    }
  }
`;
const MailFrame = styled.figure`
  border: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.panel};
  div.frame {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 9px 12px;
    border-bottom: 1px solid ${props => props.theme.border};
    color: ${props => props.theme.warning};
    font: 500 0.66rem/1.6 ${props => props.theme.fontMono};
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  img {
    width: 100%;
    height: auto;
    display: block;
    filter: invert(0.9) hue-rotate(165deg) brightness(0.82) contrast(1.18);
    border-bottom: 1px solid ${props => props.theme.border};
  }
  figcaption {
    padding: 10px 12px;
    color: ${props => props.theme.textMuted};
    font: 400 0.66rem/1.6 ${props => props.theme.fontMono};
  }
`;
const WipRow = styled.article`
  display: grid;
  grid-template-columns: var(--spec-columns);
  gap: 0 20px;
  align-items: start;
  padding: 26px 0 40px;
  @media (max-width: 1100px) {
    grid-template-columns: 44px minmax(0, 1fr);
  }
  background: repeating-linear-gradient(
    135deg,
    transparent,
    transparent 7px,
    ${props => props.theme.accentFaint} 7px,
    ${props => props.theme.accentFaint} 8px
  );
  h3 {
    font-family: ${props => props.theme.fontDisplay};
    font-size: clamp(1.3rem, 2.2vw, 1.7rem);
    font-weight: 700;
    font-stretch: 82%;
    text-transform: uppercase;
    line-height: 1.1;
    letter-spacing: -0.01em;
    margin-bottom: 8px;
  }
  p { color: ${props => props.theme.textDim}; font-size: 0.9rem; line-height: 1.75; max-width: 60ch; }
`;
const WipStamp = styled.span`
  display: inline-block;
  padding: 3px 7px;
  border: 1px solid ${props => props.theme.warning};
  color: ${props => props.theme.warning};
  font: 500 0.64rem/1.5 ${props => props.theme.fontMono};
  letter-spacing: 0.14em;
`;
const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10" /></svg>
);

const Projects = () => (
  <Section id="projects" aria-labelledby="projects-heading">
    <SectionHead>
      <h2 id="projects-heading">Things I've built.</h2>
      <p>section 01 / pin function table</p>
    </SectionHead>
    <TableHead aria-hidden="true">
      <span>Pin</span><span>Function</span><span>Reference</span><span>Package</span>
    </TableHead>
    <Row>
      <Pin aria-hidden="true">01</Pin>
      <Body>
        <h3>AI API Gateway</h3>
        <p>One endpoint for multiple AI providers. A single API key, unified rate limits, and a consistent response shape keep the integration in one place.</p>
        <Ref href="https://api.lel190.dev" target="_blank" rel="noopener noreferrer" aria-label="View AI API Gateway">api.lel190.dev <Arrow /></Ref>
        <Specs aria-label="Project features"><li>API routing</li><li>Multiple providers</li><li>Rate limiting</li></Specs>
      </Body>
      <Visual>
        <Footprint aria-label="Request flow: one key enters the gateway, three providers answer">
          <FootprintHead><b>U2</b><span>api.lel190.dev</span></FootprintHead>
          <Chain>
            <Pad><b>IN</b><span>your app <em>/ single key</em></span></Pad>
            <PadPrimary><b>U2</b><span>gateway <em>/ routing + rate limits</em></span></PadPrimary>
            <Bus aria-hidden="true" />
          </Chain>
          <Providers>
            <div><AnthropicIcon /><span>Anthropic</span></div>
            <div><OpenAIIcon /><span>OpenAI</span></div>
            <div><GeminiIcon /><span>Gemini <em>/ others</em></span></div>
          </Providers>
          <figcaption>one key, one endpoint / consistent responses across providers</figcaption>
        </Footprint>
      </Visual>
    </Row>
    <Row>
      <Pin aria-hidden="true">02</Pin>
      <Body>
        <h3>No-Account Temp Mail</h3>
        <p>A disposable inbox without the signup. Built for my own testing and privacy needs, using Cloudflare Workers, KV for mailboxes, and D1 for storage.</p>
        <Ref href="https://971236.xyz/" target="_blank" rel="noopener noreferrer" aria-label="View No-Account Temp Mail">971236.xyz <Arrow /></Ref>
        <Specs aria-label="Technologies"><li>Cloudflare Workers</li><li>KV</li><li>D1</li></Specs>
      </Body>
      <Visual>
        <MailFrame>
          <div className="frame"><span>971236.xyz</span><span>U3 · inbox</span></div>
          <img src={`${process.env.PUBLIC_URL}/images/temp-mail-preview.webp`} alt="The temporary-mail app showing its empty inbox" width="900" height="430" loading="lazy" />
          <figcaption>empty-inbox capture / a small tool, built for personal use</figcaption>
        </MailFrame>
      </Visual>
    </Row>
    <WipRow>
      <Pin aria-hidden="true">03</Pin>
      <Body>
        <h3>Currently taking apart: Unity</h3>
        <p>A function-hooking experiment. Still tinkering with this one; more to share when it's ready.</p>
        <Ref href="https://github.com/le-lel190" target="_blank" rel="noopener noreferrer">Follow along on GitHub <Arrow /></Ref>
      </Body>
      <Visual><WipStamp>DEV / WIP</WipStamp></Visual>
    </WipRow>
  </Section>
);

export default Projects;

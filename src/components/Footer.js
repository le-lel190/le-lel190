import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: 72px;
  border-top: 2px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.sheet};
  @media (max-width: 720px) { margin-top: 48px; }
`;
const FooterContent = styled.div`
  width: min(var(--content-width), 100%);
  margin-inline: auto;
  padding: 0 var(--page-padding);
`;
const Contact = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px 40px;
  padding: 44px 0 36px;
  h2 {
    font-family: ${props => props.theme.fontDisplay};
    font-size: ${props => props.theme.sectionTitle};
    font-weight: 700;
    font-stretch: 80%;
    text-transform: uppercase;
    line-height: 1.05;
    letter-spacing: -0.015em;
    margin-bottom: 12px;
  }
  p { color: ${props => props.theme.textDim}; font-size: 0.92rem; line-height: 1.75; max-width: 52ch; }
  @media (max-width: 780px) { grid-template-columns: 1fr; }
`;
const Routes = styled.div`
  border: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.panel};
  min-width: 268px;
  p {
    padding: 8px 14px;
    border-bottom: 1px solid ${props => props.theme.border};
    background: ${props => props.theme.surface};
    color: ${props => props.theme.textMuted};
    font: 400 0.64rem/1.6 ${props => props.theme.fontMono};
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    min-height: 44px;
    padding: 6px 14px;
    color: ${props => props.theme.text};
    font: 400 0.8rem ${props => props.theme.fontMono};
    text-decoration: none;
    border-bottom: 1px solid ${props => props.theme.border};
    transition: background 140ms ease, color 140ms ease;
    em { font-style: normal; color: ${props => props.theme.textMuted}; font-size: 0.68rem; letter-spacing: 0.08em; }
    &:last-child { border-bottom: none; }
    &:hover, &:focus-visible { background: ${props => props.theme.accentFaint}; color: ${props => props.theme.accent}; }
  }
  @media (max-width: 780px) { min-width: 0; }
`;
const Colophon = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px 24px;
  padding: 14px 0 18px;
  border-top: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textMuted};
  font: 400 0.66rem/1.8 ${props => props.theme.fontMono};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  a {
    display: inline-flex;
    align-items: center;
    min-height: 32px;
    color: ${props => props.theme.textDim};
    text-decoration: none;
    &:hover { color: ${props => props.theme.accent}; }
  }
`;

const Footer = () => (
  <FooterContainer id="contact" aria-labelledby="contact-heading">
    <FooterContent>
      <Contact>
        <div>
          <h2 id="contact-heading">Find me online.</h2>
          <p>Open to developer and security-focused roles. Have something interesting to build or take apart? I'd like to hear about it.</p>
        </div>
        <Routes aria-label="Contact links">
          <p>section 03 / I/O ports</p>
          <a href="https://github.com/le-lel190" target="_blank" rel="noopener noreferrer">github <em>le-lel190 ↗</em></a>
          <a href="https://www.linkedin.com/in/le-anson-cheung/" target="_blank" rel="noopener noreferrer">linkedin <em>le-anson-cheung ↗</em></a>
          <a href="https://linktr.ee/lel190" target="_blank" rel="noopener noreferrer">linktree <em>lel190 ↗</em></a>
        </Routes>
      </Contact>
      <Colophon>
        <span>© {new Date().getFullYear()} Anson Cheung / lel190</span>
        <span>end of sheet · thanks for reading</span>
        <a href="#home">back to top ↑</a>
      </Colophon>
    </FooterContent>
  </FooterContainer>
);

export default Footer;

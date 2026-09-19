import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  border-top: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.readingSurface};
`;
const FooterContent = styled.div`
  width: min(var(--content-width), 100%);
  margin-inline: auto;
  padding: 48px var(--page-padding) 24px;
  @media (min-width: 1160px) { margin-left: var(--content-offset); }
  @media (max-width: 600px) { padding-top: 36px; }
`;
const Contact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px 48px;
  flex-wrap: wrap;
  h2 { font: 600 ${props => props.theme.sectionTitle}/1.2 ${props => props.theme.fontDisplay}; margin-bottom: 16px; letter-spacing: -0.02em; }
  p { color: ${props => props.theme.textDim}; font-size: 0.95rem; line-height: 1.8; max-width: 48ch; }
`;
const ContactLinks = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: ${props => props.theme.accent};
    font: 0.8rem ${props => props.theme.fontMono};
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;
const Copyright = styled.div`
  margin-top: 44px;
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme.border};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  font: 0.75rem/1.7 ${props => props.theme.fontMono};
  color: ${props => props.theme.textMuted};
  a { display: inline-flex; align-items: center; min-height: 44px; color: ${props => props.theme.textDim}; }
`;

const Footer = () => (
  <FooterContainer id="contact" aria-labelledby="contact-heading">
    <FooterContent>
      <Contact>
        <div>
          <h2 id="contact-heading">Let's compare notes.</h2>
          <p>Open to developer and security-focused roles. Have something interesting to build or take apart? I'd like to hear about it.</p>
        </div>
        <ContactLinks aria-label="Contact links">
          <a href="https://github.com/le-lel190" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/le-anson-cheung/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="https://linktr.ee/lel190" target="_blank" rel="noopener noreferrer">Linktree ↗</a>
        </ContactLinks>
      </Contact>
      <Copyright>
        <span>© {new Date().getFullYear()} Anson Cheung / lel190</span>
        <span>thanks for stopping by.</span>
        <a href="#home">back to top ↑</a>
      </Copyright>
    </FooterContent>
  </FooterContainer>
);

export default Footer;

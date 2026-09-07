import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  border-top: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.panel};
`;
const FooterContent = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 48px 32px 24px;
  @media (max-width: 600px) { padding: 36px 20px 24px; }
`;
const Contact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px 48px;
  flex-wrap: wrap;
  h2 { font: 600 clamp(1.8rem, 3vw, 2.3rem)/1.2 ${props => props.theme.fontDisplay}; margin-bottom: 14px; }
  p { color: ${props => props.theme.textDim}; font-size: 0.87rem; max-width: 48ch; }
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
    font: 0.75rem ${props => props.theme.fontMono};
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
  font: 0.62rem/1.7 ${props => props.theme.fontMono};
  color: ${props => props.theme.textMuted};
  a { color: ${props => props.theme.textDim}; padding: 4px 0; }
`;

const Footer = () => (
  <FooterContainer id="contact" aria-labelledby="contact-heading">
    <FooterContent>
      <Contact>
        <div>
          <h2 id="contact-heading">Let's compare notes.</h2>
          <p>Open to internships and security-focused roles. Have something interesting to build or take apart? Say hello.</p>
        </div>
        <ContactLinks aria-label="Contact links">
          <a href="https://github.com/le-lel190" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/le-anson-cheung/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="https://linktr.ee/lel190" target="_blank" rel="noopener noreferrer">Linktree ↗</a>
        </ContactLinks>
      </Contact>
      <Copyright>
        <span>© {new Date().getFullYear()} lel190 / built with curiosity</span>
        <span>static by design. personal by nature.</span>
        <a href="#home">back to top ↑</a>
      </Copyright>
    </FooterContent>
  </FooterContainer>
);

export default Footer;

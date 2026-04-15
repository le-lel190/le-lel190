import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.background};
  padding: 80px 0 30px;
`;

const FooterContent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  text-align: center;
`;

const SectionHeader = styled.div`
  font-family: ${props => props.theme.fontMono};
  font-size: 1.1rem;
  color: ${props => props.theme.accent};
  margin-bottom: 30px;

  .prompt { color: ${props => props.theme.secondaryText}; }
`;

const ContactLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.text};
  text-decoration: none;
  font-family: ${props => props.theme.fontMono};
  font-size: 0.9rem;
  padding: 10px 20px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.accent};
    border-color: ${props => props.theme.accent};
    box-shadow: 0 0 15px ${props => props.theme.glowBorder};
    transform: translateY(-2px);
  }

  i { font-size: 1.1rem; }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.secondaryText};
  font-family: ${props => props.theme.fontMono};
  font-size: 0.75rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <SectionHeader><span className="prompt">&gt; </span>./contact.sh</SectionHeader>
        <ContactLinks>
          <ContactLink href="https://github.com/le-lel190" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> GitHub
          </ContactLink>
          <ContactLink href="https://www.linkedin.com/in/le-anson-cheung/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i> LinkedIn
          </ContactLink>
          <ContactLink href="https://linktr.ee/lel190" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-link"></i> Linktree
          </ContactLink>
        </ContactLinks>
        <Copyright>
          <p>&copy; {new Date().getFullYear()} lel190</p>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

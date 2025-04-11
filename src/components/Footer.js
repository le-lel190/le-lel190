import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.secondaryBackground};
  color: ${props => props.theme.text};
  padding: 50px 0 20px;
`;

const FooterContent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterColumn = styled.div`
  margin-bottom: 30px;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

const Description = styled.p`
  color: ${props => props.theme.secondaryText};
  margin-bottom: 20px;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  color: ${props => props.theme.secondaryText};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.accent};
    transform: translateY(-3px);
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  font-weight: 600;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 30px;
    height: 2px;
    background-color: ${props => props.theme.accent};
    left: 0;
    bottom: -8px;
    
    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FooterLink = styled.a`
  display: block;
  color: ${props => props.theme.secondaryText};
  margin-bottom: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.accent};
    transform: translateX(5px);
    
    @media (max-width: 768px) {
      transform: none;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.secondaryText};
  font-size: 0.9rem;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <Logo>190</Logo>
          <Description>
            A computer science student at CUHK passionate about frontend development and creating beautiful user experiences.
          </Description>
          <SocialLinks>
            <SocialLink href="https://github.com/le-lel190" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </SocialLink>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Links</FooterTitle>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#projects">Projects</FooterLink>
          <FooterLink href="#skills">Skills</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Contact</FooterTitle>
          <FooterLink href="mailto:your-email@example.com">Email</FooterLink>
          <FooterLink href="#">Discord: 190</FooterLink>
          <FooterLink href="https://github.com/le-lel190">GitHub</FooterLink>
        </FooterColumn>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {new Date().getFullYear()} 190. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 
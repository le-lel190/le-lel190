import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { fadeInLeft, fadeInUp, staggerContainer } from '../utils/animations';

const FooterContainer = styled.footer`
  background-color: rgba(5, 6, 5, 0.78);
  border-top: 1px solid ${props => props.theme.border};
  padding: 88px 0 36px;
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1060px;
  margin: 0 auto;
  padding: 0 24px;
`;

const SectionHeader = styled.div`
  font-family: ${props => props.theme.fontMono};
  font-size: 1.05rem;
  color: ${props => props.theme.text};
  margin-bottom: 12px;

  .prompt {
    color: ${props => props.theme.accent};
    margin-right: 8px;
  }
`;

const SectionRule = styled.div`
  width: 168px;
  height: 1px;
  background: linear-gradient(90deg, ${props => props.theme.accent}, transparent);
  margin-bottom: 40px;
`;

const ContactIntro = styled.p`
  color: ${props => props.theme.textDim};
  font-size: 0.98rem;
  max-width: 440px;
  margin-bottom: 32px;
  line-height: 1.65;
`;

const ContactLinks = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ContactLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: ${props => props.theme.text};
  text-decoration: none;
  font-family: ${props => props.theme.fontMono};
  font-size: 0.89rem;
  padding: 11px 18px;
  border: 1px solid ${props => props.theme.borderStrong};
  border-radius: 3px;
  background: ${props => props.theme.surface};
  transition: all 0.18s ease;

  i {
    font-size: 1.05rem;
    color: ${props => props.theme.textDim};
    transition: color 0.18s ease;
  }

  &:hover {
    border-color: ${props => props.theme.accentLine};
    color: ${props => props.theme.accent};
    background: ${props => props.theme.accentFaint};
    i { color: ${props => props.theme.accent}; }
  }
`;

const Copyright = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 56px;
  padding-top: 22px;
  border-top: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textMuted};
  font-family: ${props => props.theme.fontMono};
  font-size: 0.74rem;

  @media (max-width: 620px) {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
`;

const StatusLine = styled.span`
  color: ${props => props.theme.accent};
  text-shadow: 0 0 8px ${props => props.theme.accentLine};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <AnimatedSection variants={fadeInLeft}>
          <SectionHeader>
            <span className="prompt">&gt;</span> ./contact.sh
          </SectionHeader>
          <SectionRule />
        </AnimatedSection>

        <AnimatedSection variants={fadeInUp}>
          <ContactIntro>
            Open to internships and security-focused roles. Best reached on GitHub or LinkedIn — I read everything.
          </ContactIntro>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <ContactLinks>
            <ContactLink
              href="https://github.com/le-lel190"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <i className="fab fa-github"></i> GitHub
            </ContactLink>
            <ContactLink
              href="https://www.linkedin.com/in/le-anson-cheung/"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </ContactLink>
            <ContactLink
              href="https://linktr.ee/lel190"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <i className="fas fa-link"></i> Linktree
            </ContactLink>
          </ContactLinks>
        </motion.div>

        <Copyright>
          <span>&copy; {new Date().getFullYear()} lel190</span>
          <StatusLine>● system online</StatusLine>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

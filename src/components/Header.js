import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.$scrolled ? 'rgba(5, 6, 5, 0.86)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(12px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.$scrolled ? 'blur(12px)' : 'none'};
  box-shadow: ${props => props.$scrolled ? '0 1px 0 rgba(214, 216, 210, 0.06)' : 'none'};
  padding: 14px 0;
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-family: ${props => props.theme.fontMono};
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  color: ${props => props.theme.text};
  letter-spacing: 0.015em;

  em {
    font-style: normal;
    color: ${props => props.theme.accent};
  }

  .cursor {
    color: ${props => props.theme.accent};
    animation: blink 1.1s step-end infinite;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 720px) {
    position: fixed;
    top: 0;
    right: ${props => props.$isOpen ? '0' : '-100%'};
    width: 240px;
    height: 100vh;
    background-color: ${props => props.theme.panelRaised};
    border-left: 1px solid ${props => props.theme.borderStrong};
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: 104px 24px 24px;
    transition: right 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${props => props.$isOpen ? '-16px 0 48px rgba(0, 0, 0, 0.55)' : 'none'};
  }
`;

const NavItem = styled(motion.a)`
  margin: 0 6px;
  padding: 7px 11px;
  text-decoration: none;
  color: ${props => props.theme.textDim};
  font-family: ${props => props.theme.fontMono};
  font-size: 0.82rem;
  border-radius: 5px;
  position: relative;
  transition: color 0.18s ease, background-color 0.18s ease;

  &::before {
    content: '$ ';
    color: ${props => props.theme.accent};
    opacity: 0;
    transition: opacity 0.18s ease;
  }

  &:hover {
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.accentFaint};
    &::before { opacity: 1; }
  }

  @media (max-width: 720px) {
    margin: 6px 0;
    padding: 11px 12px;
    font-size: 0.93rem;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: 1px solid ${props => props.theme.borderStrong};
  border-radius: 6px;
  cursor: pointer;
  padding: 9px 10px;
  z-index: 1001;
  transition: border-color 0.18s ease;

  &:hover { border-color: ${props => props.theme.accentLine}; }

  @media (max-width: 720px) {
    display: block;
  }
`;

const HamburgerIcon = styled.div`
  width: 18px;
  height: 2px;
  background-color: ${props => props.theme.accent};
  position: relative;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.$isOpen ? 'rotate(45deg)' : 'none'};

  &:before, &:after {
    content: '';
    position: absolute;
    left: 0;
    width: 18px;
    height: 2px;
    background-color: ${props => props.theme.accent};
    transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:before {
    transform: ${props => props.$isOpen ? 'rotate(90deg)' : 'translateY(-6px)'};
  }

  &:after {
    transform: ${props => props.$isOpen ? 'rotate(90deg)' : 'translateY(6px)'};
    opacity: ${props => props.$isOpen ? 0 : 1};
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id) => {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer $scrolled={scrolled}>
      <HeaderContent>
        <Logo
          onClick={scrollToTop}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.975 }}
        >
          <em>lel190</em><span className="cursor">█</span>
        </Logo>

        <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <HamburgerIcon $isOpen={isMenuOpen} />
        </HamburgerButton>

        <NavMenu $isOpen={isMenuOpen}>
          <NavItem
            href="#projects"
            onClick={(e) => { e.preventDefault(); handleNavClick('#projects'); }}
            whileTap={{ scale: 0.97 }}
          >
            projects
          </NavItem>
          <NavItem
            href="#skills"
            onClick={(e) => { e.preventDefault(); handleNavClick('#skills'); }}
            whileTap={{ scale: 0.97 }}
          >
            skills
          </NavItem>
          <NavItem
            href="https://github.com/le-lel190"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
          >
            github
          </NavItem>
        </NavMenu>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
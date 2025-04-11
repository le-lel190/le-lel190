import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.$scrolled ? props.theme.background : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.$scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  color: ${props => props.$scrolled ? props.theme.text : 'white'};
  padding: 15px 0;
  transition: all 0.3s ease;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
`;

const NavMenu = styled.nav`
  display: flex;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.$isOpen ? '0' : '-100%'};
    width: 70%;
    height: 100vh;
    background-color: ${props => props.theme.secondaryBackground};
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 80px;
    transition: all 0.3s ease;
    box-shadow: ${props => props.$isOpen ? '-5px 0 15px rgba(0, 0, 0, 0.1)' : 'none'};
  }
`;

const NavItem = styled.a`
  margin: 0 15px;
  text-decoration: none;
  color: ${props => props.$scrolled ? props.theme.text : 'white'};
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.accent};
    left: 0;
    bottom: -5px;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.accent};
    
    &:after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    margin: 20px 30px;
    font-size: 1.2rem;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const HamburgerIcon = styled.div`
  width: 25px;
  height: 3px;
  background-color: ${props => props.$scrolled ? props.theme.text : 'white'};
  position: relative;
  transition: all 0.3s ease;
  transform: ${props => props.$isOpen ? 'rotate(45deg)' : 'none'};
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 25px;
    height: 3px;
    background-color: ${props => props.$scrolled ? props.theme.text : 'white'};
    transition: all 0.3s ease;
  }
  
  &:before {
    transform: ${props => props.$isOpen ? 'rotate(90deg) translate(0, 0)' : 'translateY(-8px)'};
  }
  
  &:after {
    transform: ${props => props.$isOpen ? 'rotate(90deg) translate(0, 0)' : 'translateY(8px)'};
    opacity: ${props => props.$isOpen ? 0 : 1};
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (id) => {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  
  return (
    <HeaderContainer $scrolled={scrolled}>
      <HeaderContent>
        <Logo onClick={scrollToTop}>lel190</Logo>
        
        <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <HamburgerIcon $isOpen={isMenuOpen} $scrolled={scrolled} />
        </HamburgerButton>
        
        <NavMenu $isOpen={isMenuOpen}>
          <NavItem 
            href="#about" 
            $scrolled={scrolled}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#about');
            }}
          >
            About
          </NavItem>
          <NavItem 
            href="#projects" 
            $scrolled={scrolled}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#projects');
            }}
          >
            Projects
          </NavItem>
          <NavItem 
            href="#skills" 
            $scrolled={scrolled}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#skills');
            }}
          >
            Skills
          </NavItem>
          <NavItem 
            href="https://github.com/le-lel190" 
            target="_blank" 
            rel="noopener noreferrer"
            $scrolled={scrolled}
          >
            GitHub
          </NavItem>
        </NavMenu>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 
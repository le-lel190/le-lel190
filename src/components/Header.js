import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${props => props.theme.readingSurface};
  border-bottom: 1px solid ${props => props.theme.border};
`;

const HeaderContent = styled.div`
  width: min(var(--content-width), 100%);
  min-height: 72px;
  margin-inline: auto;
  padding-inline: var(--page-padding);
  display: flex;
  align-items: center;
  gap: 32px;
  @media (min-width: 1160px) { margin-left: var(--content-offset); }
  @media (max-width: 600px) { min-height: 64px; gap: 12px; }
`;

const Logo = styled.a`
  font: 700 1.1rem ${props => props.theme.fontMono};
  text-decoration: none;
  color: ${props => props.theme.accent};
  white-space: nowrap;
  span { color: ${props => props.theme.textMuted}; font-weight: 400; }
  @media (max-width: 380px) { font-size: 0.95rem; }
`;

const SiteLabel = styled.span`
  color: ${props => props.theme.textMuted};
  font: 0.75rem ${props => props.theme.fontMono};
  letter-spacing: 0.04em;
  @media (max-width: 850px) { display: none; }
`;

const NavMenu = styled.nav`
  margin-left: auto;
  display: flex;
  gap: 28px;
  a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    color: ${props => props.theme.textDim};
    text-decoration: none;
    font: 0.8rem ${props => props.theme.fontMono};
    border-bottom: 2px solid transparent;
    transition: color 160ms ease, border-color 160ms ease;
    &:hover { color: ${props => props.theme.accent}; border-color: currentColor; }
  }
  @media (max-width: 600px) { gap: 16px; }
  @media (max-width: 380px) { gap: 10px; a { font-size: 0.75rem; } }
`;

const Header = () => (
  <HeaderContainer>
    <HeaderContent>
      <Logo href="#home" aria-label="lel190 home"><span>~/</span>lel190<span>_</span></Logo>
      <SiteLabel>code, curiosity & a little anime</SiteLabel>
      <NavMenu aria-label="Main navigation">
        <a href="#projects">projects</a>
        <a href="#skills">about</a>
        <a href="#contact">contact</a>
      </NavMenu>
    </HeaderContent>
  </HeaderContainer>
);

export default Header;

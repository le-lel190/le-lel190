import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${props => props.theme.sheet};
  border-bottom: 1px solid ${props => props.theme.borderStrong};
  backdrop-filter: blur(2px);
`;

const HeaderContent = styled.div`
  width: min(var(--content-width), 100%);
  margin-inline: auto;
  padding-inline: var(--page-padding);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: stretch;
  min-height: 64px;
  font-family: ${props => props.theme.fontMono};
`;

const Wordmark = styled.a`
  display: flex;
  align-items: center;
  padding-right: 20px;
  text-decoration: none;
  color: ${props => props.theme.accent};
  font: 600 0.95rem ${props => props.theme.fontMono};
  letter-spacing: 0.14em;
  white-space: nowrap;
  span { color: ${props => props.theme.textMuted}; font-weight: 400; }
  &:hover { color: ${props => props.theme.text}; }
`;

const Revision = styled.p`
  display: flex;
  align-items: center;
  gap: 10px 22px;
  flex-wrap: wrap;
  padding: 0 24px;
  border-left: 1px solid ${props => props.theme.border};
  border-right: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textMuted};
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  b { color: ${props => props.theme.textDim}; font-weight: 500; }
  @media (max-width: 860px) { display: none; }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: stretch;
  margin-left: auto;
  a {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 0 16px;
    color: ${props => props.theme.textDim};
    text-decoration: none;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    border-bottom: 2px solid transparent;
    border-left: 1px solid ${props => props.theme.border};
    transition: color 140ms ease, background 140ms ease, border-color 140ms ease;
    i { color: ${props => props.theme.textMuted}; font-style: normal; font-size: 0.68rem; }
    &:hover, &:focus-visible {
      color: ${props => props.theme.accent};
      background: ${props => props.theme.accentFaint};
      border-bottom-color: ${props => props.theme.accent};
    }
  }
  @media (max-width: 600px) {
    a { padding: 0 10px; font-size: 0.7rem; }
    a i { display: none; }
  }
`;

const Header = () => (
  <HeaderContainer>
    <HeaderContent>
      <Wordmark href="#home" aria-label="lel190 home">LEL190<span>_</span></Wordmark>
      <Revision>
        <span>Anson Cheung</span>
        <span>CUHK <b>B.Sc. CS</b></span>
        <span>Rev. <b>2026</b></span>
      </Revision>
      <NavMenu aria-label="Main navigation">
        <a href="#projects"><i>01</i>projects</a>
        <a href="#skills"><i>02</i>about</a>
        <a href="#contact"><i>03</i>contact</a>
      </NavMenu>
    </HeaderContent>
  </HeaderContainer>
);

export default Header;

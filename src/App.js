import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Hero from './components/Hero';
import lainImage from './assets/lain_bg.webp';

// Direction: the personal workstation — portfolio first, anime in the margins.
export const theme = {
  background: '#101211',
  surface: '#171b18',
  panel: '#0c100d',
  panelRaised: '#232923',
  border: '#303930',
  borderStrong: '#4a5748',
  text: '#e7e6d9',
  textDim: '#afb8a9',
  textMuted: '#929f8d',
  accent: '#b9d883',
  accentDim: '#789557',
  accentFaint: 'rgba(185, 216, 131, 0.07)',
  accentLine: 'rgba(185, 216, 131, 0.35)',
  danger: '#ea896d',
  warning: '#edbd79',
  info: '#b0c2ba',
  selection: '#b9d883',
  selectionInk: '#101211',
  fontMono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  fontDisplay: "'Chakra Petch', 'Arial Narrow', sans-serif",
  fontBody: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  sectionTitle: 'clamp(1.9rem, 3.2vw, 2.5rem)',
  readingSurface: 'rgba(16, 18, 17, 0.94)',
};

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: dark;
    --content-width: 1160px;
    --page-padding: 32px;
    --content-offset: max(0px, calc((100% - 1320px) / 2));
    @media (max-width: 600px) { --page-padding: 20px; }
  }
  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-family: ${props => props.theme.fontBody};
  }
  ::selection {
    background: ${props => props.theme.selection};
    color: ${props => props.theme.selectionInk};
  }
  :focus-visible {
    outline: 2px solid ${props => props.theme.accent};
    outline-offset: 5px;
  }
  a { text-underline-offset: 5px; }
  h1, h2, h3 { text-wrap: balance; }
  input { caret-color: ${props => props.theme.accent}; }
  section, footer { scroll-margin-top: 96px; }
`;

const AppContainer = styled.div`
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  border-top: 3px solid ${props => props.theme.accent};
`;

const PageArtwork = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: ${props => props.theme.background};
  &::before, &::after { content: ''; position: absolute; inset: 0; }
  &::before {
    background: url(${lainImage}) center center / auto 100% no-repeat;
    opacity: 0.7;
  }
  &::after {
    background: linear-gradient(90deg,
      ${props => props.theme.background}f5,
      ${props => props.theme.background}d9 calc(var(--content-offset) + min(var(--content-width), 100%) - var(--page-padding)),
      ${props => props.theme.background}26);
  }
  @media (max-width: 780px) {
    &::before { opacity: 0.46; }
    &::after {
      background: linear-gradient(90deg,
        ${props => props.theme.background}e6,
        ${props => props.theme.background}b3);
    }
  }
`;

const Main = styled.main`
  width: min(var(--content-width), 100%);
  margin-inline: auto;
  padding-inline: var(--page-padding);
  @media (min-width: 1160px) { margin-left: var(--content-offset); }
`;

const SkipLink = styled.a`
  position: fixed;
  top: -80px;
  left: 20px;
  padding: 12px 20px;
  z-index: 2000;
  color: ${props => props.theme.background};
  background: ${props => props.theme.accent};
  &:focus { top: 12px; }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <PageArtwork aria-hidden="true" data-page-artwork="lain" />
        <SkipLink href="#projects">Skip to projects</SkipLink>
        <Header />
        <Main>
          <Hero />
          <Projects />
          <Skills />
        </Main>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

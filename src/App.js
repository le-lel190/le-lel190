import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Hero from './components/Hero';
import lainImage from './assets/lain_bg.webp';
import archivoLatin from './assets/fonts/archivo-latin.woff2';
import archivoLatinExt from './assets/fonts/archivo-latin-ext.woff2';
import plexMono400 from './assets/fonts/plex-mono-400.woff2';
import plexMono500 from './assets/fonts/plex-mono-500.woff2';
import plexMono600 from './assets/fonts/plex-mono-600.woff2';

// Direction: the component datasheet — one board, silkscreen labels, honest specs.
export const theme = {
  background: '#0b0e0d',
  surface: '#111614',
  panel: '#0d1211',
  panelRaised: '#1a2320',
  border: '#26302c',
  borderStrong: '#3d4c46',
  text: '#eceee3',
  textDim: '#a9b4aa',
  textMuted: '#838f88',
  accent: '#e8c15c',
  accentDim: '#a8893a',
  accentFaint: 'rgba(232, 193, 92, 0.06)',
  accentLine: 'rgba(232, 193, 92, 0.32)',
  trace: 'rgba(232, 193, 92, 0.16)',
  danger: '#e58a6b',
  warning: '#e0a35e',
  info: '#9fb5ad',
  selection: '#e8c15c',
  selectionInk: '#0b0e0d',
  fontMono: "'Plex Data', ui-monospace, SFMono-Regular, Menlo, monospace",
  fontDisplay: "'Datasheet Grotesk', 'Helvetica Neue', Arial, sans-serif",
  fontBody: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  displaySize: 'clamp(3.2rem, 8.4vw, 7.2rem)',
  sectionTitle: 'clamp(1.9rem, 3.4vw, 2.6rem)',
  sheet: 'rgba(11, 14, 13, 0.95)',
  rule: '1px solid',
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Datasheet Grotesk';
    src: url(${archivoLatin}) format('woff2');
    font-weight: 400 700;
    font-stretch: 62% 125%;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0000-00FF, U+2000-206F, U+2191-2193;
  }
  @font-face {
    font-family: 'Datasheet Grotesk';
    src: url(${archivoLatinExt}) format('woff2');
    font-weight: 400 700;
    font-stretch: 62% 125%;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0100-024F, U+1E00-1EFF, U+2020-20AB;
  }
  @font-face {
    font-family: 'Plex Data';
    src: url(${plexMono400}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plex Data';
    src: url(${plexMono500}) format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plex Data';
    src: url(${plexMono600}) format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  :root {
    color-scheme: dark;
    --content-width: 1200px;
    --page-padding: 40px;
    --spec-columns: 56px minmax(150px, 1.1fr) minmax(0, 2fr) minmax(0, 1.4fr);
    @media (max-width: 720px) {
      --page-padding: 20px;
      --spec-columns: 44px minmax(0, 1fr) auto;
    }
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
    outline-offset: 4px;
  }
  a { text-underline-offset: 6px; }
  h1, h2, h3 { text-wrap: balance; }
  strong { font-weight: 600; }
  input { caret-color: ${props => props.theme.accent}; }
  section, footer { scroll-margin-top: 76px; }
`;

const AppContainer = styled.div`
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  border-top: 4px solid ${props => props.theme.accent};
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
    opacity: 0.62;
    filter: grayscale(0.45) sepia(0.12) contrast(1.05);
  }
  &::after {
    background:
      linear-gradient(90deg,
        ${props => props.theme.background}f2,
        ${props => props.theme.background}db calc(50% + 300px),
        ${props => props.theme.background}00 100%);
  }
  @media (max-width: 780px) {
    &::before { opacity: 0.4; }
    &::after {
      background: linear-gradient(90deg, ${props => props.theme.background}e8, ${props => props.theme.background}c4);
    }
  }
`;

const Main = styled.main`
  width: min(var(--content-width), 100%);
  margin-inline: auto;
  padding-inline: var(--page-padding);
`;

const SkipLink = styled.a`
  position: fixed;
  top: -80px;
  left: 20px;
  padding: 12px 20px;
  z-index: 2000;
  color: ${props => props.theme.selectionInk};
  background: ${props => props.theme.accent};
  font: 500 0.8rem ${props => props.theme.fontMono};
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

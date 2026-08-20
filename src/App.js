import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Hero from './components/Hero';

/*
  THESIS: The portfolio is a console, not a page. The visitor operates it —
  the CLI hero is the front door and every section is a panel of that same
  system. It refuses the decorated-portfolio default: no Persona 5 confetti,
  no floating shapes, no glow-everything. ONE accent (terminal green) carries
  the signal; red is reserved for the live cursor and the rare danger state;
  yellow for the single WIP marker. Restraint is the upgrade.
  OWN-WORLD: near-black phosphor ground, one green accent, hairline borders,
  JetBrains Mono for the system voice, Outfit for display. Depth comes from
  layered panels and a single soft shadow, never colored halos.
*/

const theme = {
  // Ground
  background: '#050605',
  surface: '#090c09',
  panel: '#0d120e',
  panelRaised: '#121812',
  border: '#1c291e',
  borderStrong: '#2b402e',

  // Ink
  text: '#d6e2d6',
  textDim: '#98ad9b',
  textMuted: '#617663',

  // Accent — terminal green is the only signal color
  accent: '#39ff72',
  accentDim: '#287d40',
  accentFaint: 'rgba(57, 255, 114, 0.065)',
  accentLine: 'rgba(57, 255, 114, 0.28)',
  scanline: 'rgba(57, 255, 114, 0.032)',

  // Rare states
  danger: '#ff3b30',
  dangerDim: 'rgba(255, 59, 48, 0.82)',
  warning: '#ffd60a',
  info: '#5bc8fa',

  // Selection / caret
  selection: '#39ff72',
  selectionInk: '#050605',

  // Fonts
  fontMono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  fontBody: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",

  // Elevation
  shadowPanel: '0 1px 0 rgba(214, 226, 214, 0.04), 0 14px 42px rgba(0, 0, 0, 0.58)',
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-family: ${props => props.theme.fontBody};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    text-rendering: optimizeLegibility;
    font-variant-ligatures: none;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    background: repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 3px,
      ${props => props.theme.scanline} 3px,
      ${props => props.theme.scanline} 4px
    );
    opacity: 0.52;
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: ${props => props.theme.selection};
    color: ${props => props.theme.selectionInk};
  }

  /* Focus rings are part of the system */
  :focus-visible {
    outline: 2px solid ${props => props.theme.accent};
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Caret in the terminal input */
  input {
    caret-color: ${props => props.theme.accent};
  }

  @media (prefers-reduced-motion: reduce) {
    body::before {
      opacity: 0.28;
    }
  }
`;


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 72px 24px 96px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Hero />
        <Header />
        <Main>
          <Projects />
          <Skills />
        </Main>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
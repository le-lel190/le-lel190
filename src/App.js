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
  surface: '#0a0c09',
  panel: '#0e110d',
  panelRaised: '#12150f',
  border: '#1e241b',
  borderStrong: '#2a3326',

  // Ink
  text: '#d6d8d2',
  textDim: '#98a090',
  textMuted: '#6b7365',

  // Accent — terminal green is the only signal color
  accent: '#33ff66',
  accentDim: '#1f7a3d',
  accentFaint: 'rgba(51, 255, 102, 0.06)',
  accentLine: 'rgba(51, 255, 102, 0.22)',

  // Rare states
  danger: '#ff3b30',
  dangerDim: 'rgba(255, 59, 48, 0.82)',
  warning: '#ffd60a',
  info: '#5bc8fa',

  // Selection / caret
  selection: '#33ff66',
  selectionInk: '#050605',

  // Fonts
  fontMono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  fontBody: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",

  // Elevation
  shadowPanel: '0 1px 0 rgba(214, 216, 210, 0.035), 0 12px 40px rgba(0, 0, 0, 0.5)',
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
    border-radius: 2px;
  }

  /* Caret in the terminal input */
  input {
    caret-color: ${props => props.theme.accent};
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
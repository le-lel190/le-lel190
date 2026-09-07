import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Hero from './components/Hero';

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
};

const GlobalStyle = createGlobalStyle`
  :root { color-scheme: dark; }
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
  input { caret-color: ${props => props.theme.accent}; }
  section, footer { scroll-margin-top: 88px; }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  border-top: 3px solid ${props => props.theme.accent};
`;

const Main = styled.main`
  width: min(1160px, 100%);
  margin: 0 auto;
  padding: 0 32px;
  @media (max-width: 600px) { padding: 0 20px; }
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

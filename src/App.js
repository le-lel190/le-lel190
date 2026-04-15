import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Hero from './components/Hero';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-family: ${props => props.theme.fontBody};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: ${props => props.theme.accent};
    color: ${props => props.theme.background};
  }
`;

const darkTheme = {
  background: '#0a0a0a',
  secondaryBackground: '#111111',
  text: '#e0e0e0',
  secondaryText: '#888888',
  accent: '#00ff41',
  accentCyan: '#00d4ff',
  warning: '#ffb800',
  border: '#1a1a1a',
  glowBorder: 'rgba(0, 255, 65, 0.2)',
  fontMono: "'JetBrains Mono', 'Courier New', monospace",
  fontBody: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
};

const lightTheme = {
  background: '#f0ede6',
  secondaryBackground: '#e8e4dc',
  text: '#1a1a1a',
  secondaryText: '#555555',
  accent: '#00ff41',
  accentCyan: '#00889a',
  warning: '#cc9200',
  border: '#d4d0c8',
  glowBorder: 'rgba(0, 255, 65, 0.15)',
  fontMono: "'JetBrains Mono', 'Courier New', monospace",
  fontBody: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

function App() {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Hero />
        <Header toggleTheme={toggleTheme} isLight={theme === lightTheme} />
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

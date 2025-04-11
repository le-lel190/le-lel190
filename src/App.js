import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import About from './components/About';
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
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: all 0.3s ease;
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: ${props => props.theme.accent};
    color: ${props => props.theme.background};
  }
`;

const lightTheme = {
  background: '#ffffff',
  secondaryBackground: '#f8f9fa',
  text: '#212529',
  secondaryText: '#6c757d',
  accent: '#0d6efd',
  border: '#e9ecef'
};

const darkTheme = {
  background: '#121212',
  secondaryBackground: '#1e1e1e',
  text: '#e9ecef',
  secondaryText: '#adb5bd',
  accent: '#0d6efd',
  border: '#343a40'
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

const ThemeToggle = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${props => props.theme.accent};
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
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
        <Header />
        <Main>
          <About />
          <Projects />
          <Skills />
        </Main>
        <Footer />
        <ThemeToggle onClick={toggleTheme}>
          {theme === lightTheme ? '🌙' : '☀️'}
        </ThemeToggle>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App; 
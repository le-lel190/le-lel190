import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LainDataStream from "./components/LainDataStream";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: ${(props) => props.theme.fontBody};
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
      ${(props) => props.theme.scanline} 3px,
      ${(props) => props.theme.scanline} 4px
    );
    opacity: 0.52;
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: ${(props) => props.theme.selection};
    color: ${(props) => props.theme.selectionInk};
  }

  /* Focus rings are part of the system */
  :focus-visible {
    outline: 2px solid ${(props) => props.theme.accent};
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Caret in the terminal input */
  input {
    caret-color: ${(props) => props.theme.accent};
  }

  @media (prefers-reduced-motion: reduce) {
    body::before {
      opacity: 0.28;
    }
  }
`;

const AppContainer = styled.div`
  position: relative;
  z-index: 1;
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
      <LainDataStream />
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

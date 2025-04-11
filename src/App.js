import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';

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
  return (
    <AppContainer>
      <Header />
      <Main>
        <About />
        <Projects />
        <Skills />
      </Main>
      {/* <Footer /> */}
    </AppContainer>
  );
}

export default App; 
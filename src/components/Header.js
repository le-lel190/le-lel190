import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #007bff;
  color: white;
  padding: 60px 0;
  text-align: center;
`;

const HeaderContent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 0.5rem;
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Title>Hi there 👋</Title>
        <Tagline>Computer Science Student at CUHK</Tagline>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 
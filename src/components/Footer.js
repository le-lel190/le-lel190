import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #6c757d;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-top: 40px;
`;

const FooterContent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <p>&copy; {year} - Made by 190</p>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 
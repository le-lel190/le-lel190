import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 60px 0;
  border-bottom: 1px solid #e9ecef;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

const AboutItem = styled.p`
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const About = () => {
  return (
    <Section id="about">
      <Title>About Me</Title>
      <AboutItem>📚 I'm currently studying computer science in CUHK</AboutItem>
      <AboutItem>🌱 I'm currently exploring different frontend frameworks</AboutItem>
      <AboutItem>📫 Feel free to reach me via Discord: 190</AboutItem>
    </Section>
  );
};

export default About; 
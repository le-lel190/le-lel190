import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  padding: 100px 0;
  border-bottom: 1px solid ${props => props.theme.border};
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    width: 70%;
    height: 3px;
    background-color: ${props => props.theme.accent};
    left: 0;
    bottom: -5px;
  }
`;

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutContent = styled.div`
  animation: ${fadeInUp} 0.8s forwards;
`;

const AboutImage = styled.div`
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: ${fadeInUp} 0.8s forwards;
  animation-delay: 0.2s;
  opacity: 0;
  position: relative;
  
  .main-image {
    width: 100%;
    height: auto;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  @media (max-width: 768px) {
    margin-top: 30px;
    animation-delay: 0s;
  }
`;

const AboutText = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.secondaryText};
`;

const AboutItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  animation: ${fadeInUp} 0.8s forwards;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
  
  .icon {
    margin-right: 15px;
    font-size: 1.5rem;
    color: ${props => props.theme.accent};
  }
  
  .text {
    font-size: 1.1rem;
  }
`;

const ContactButton = styled.a`
  display: inline-block;
  margin-top: 1rem;
  padding: 12px 25px;
  background-color: ${props => props.theme.accent};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s forwards;
  animation-delay: 0.6s;
  opacity: 0;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.theme.accent};
  }
`;

const BackgroundShape = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: ${props => props.theme.accent};
  opacity: 0.05;
  z-index: -1;
  top: -150px;
  right: -150px;
`;

const About = () => {
  return (
    <Section id="about">
      <BackgroundShape />
      <SectionTitle>About Me</SectionTitle>
      
      <AboutContainer>
        <AboutContent>
          <AboutText>
            Hello! I'm Anson (lel190), a passionate Computer Science student at CUHK with a keen interest in 
            different frontend frameworks and creating beautiful user experiences. I am also interested in reverse engineering and memory hacking 
            even though I am just a beginner.
          </AboutText>
          
          <AboutItem $delay="0.2s">
            <div className="icon">
              <span role="img" aria-label="Books">📚</span>
            </div>
            <div className="text">Currently studying Computer Science at CUHK</div>
          </AboutItem>
          
          <AboutItem $delay="0.3s">
            <div className="icon">
              <span role="img" aria-label="Growing plant">🌱</span>
            </div>
            <div className="text">Exploring different frontend frameworks</div>
          </AboutItem>
          
          <AboutItem $delay="0.4s">
            <div className="icon">
              <span role="img" aria-label="Computer">💻</span>
            </div>
            <div className="text">Learning backend development with Node.js and Express.js</div>
          </AboutItem>
          
          <AboutItem $delay="0.5s">
            <div className="icon">
              <span role="img" aria-label="Lock">🔒</span>
            </div>
            <div className="text">Interested in cybersecurity and ethical hacking</div>
          </AboutItem>
          
          <ContactButton href="https://linktr.ee/lel190" target="_blank" rel="noopener noreferrer">
            Contact Me
          </ContactButton>
        </AboutContent>
        
        <AboutImage>
          <img 
            className="main-image"
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80" 
            alt="Coding workspace" 
          />
        </AboutImage>
      </AboutContainer>
    </Section>
  );
};

export default About; 
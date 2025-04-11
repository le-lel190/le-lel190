import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const HeroContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  filter: brightness(0.6);
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    ${props => props.theme.background} 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 20px;
  overflow: hidden;
  border: 3px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 1s ease-out;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1rem;
  color: white;
  font-weight: 700;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.a`
  padding: 12px 25px;
  background: ${props => props.$primary ? props.theme.accent : 'transparent'};
  color: white;
  border: ${props => props.$primary ? 'none' : `2px solid white`};
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${slideUp} 0.8s ease-out forwards;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background: ${props => props.$primary ? props.theme.accent : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 50px;
  border: 2px solid white;
  border-radius: 15px;
  cursor: pointer;
  animation: ${fadeIn} 1s ease-out 1.5s forwards;
  opacity: 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: white;
    animation: scrollAnimation 1.5s infinite;
  }
  
  @keyframes scrollAnimation {
    0% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(15px);
    }
  }
`;

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Function to scroll down to the about section
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <HeroContainer>
      <VideoBackground
        autoPlay
        muted
        loop
        onLoadedData={() => setVideoLoaded(true)}
        style={{ opacity: videoLoaded ? 0.2 : 0 }}
      >
        <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Overlay />
      <HeroContent>
        <Avatar>
          <img src={`${process.env.PUBLIC_URL}/images/avatar.jpg`} alt="Anson's avatar" />
        </Avatar>
        <HeroTitle>Hi, I'm Anson <span role="img" aria-label="Waving hand">👋</span></HeroTitle>
        <HeroSubtitle>
          A computer science student at CUHK passionate about frontend development and creating beautiful user experiences.
        </HeroSubtitle>
        <HeroButtons>
          <Button href="#about" $primary $delay="0.3s" onClick={scrollToContent}>
            About Me
          </Button>
          <Button href="#projects" $delay="0.5s" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
          }}>
            See My Projects
          </Button>
        </HeroButtons>
      </HeroContent>
      <ScrollIndicator onClick={scrollToContent} />
    </HeroContainer>
  );
};

export default Hero; 
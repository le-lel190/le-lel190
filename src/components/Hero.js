import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const bootLines = [
  '[OK] Loading kernel modules...',
  '[OK] Mounting filesystems...',
  '[OK] Starting network services...',
  '[OK] Initializing security protocols...',
  '[OK] Loading user profile...',
];

const profileLines = [
  'root@anson:~$ cat /etc/profile',
  '─────────────────────────────────',
  'Name:      Anson Cheung',
  'Handle:    lel190',
  'Role:      CS Student @ CUHK',
  'Interests: Cybersecurity, CTF, Reverse Engineering',
  'Status:    Building things...',
  '─────────────────────────────────',
  'root@anson:~$ █',
];

const HeroContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.background};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 255, 65, 0.03) 2px,
      rgba(0, 255, 65, 0.03) 4px
    );
    pointer-events: none;
    z-index: 1;
  }
`;

const TerminalWindow = styled.div`
  position: relative;
  z-index: 2;
  max-width: 700px;
  width: 90%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid ${props => props.theme.glowBorder};
  border-radius: 8px;
  padding: 30px;
  font-family: ${props => props.theme.fontMono};
  box-shadow: 0 0 40px rgba(0, 255, 65, 0.1);
`;

const TerminalHeader = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const TerminalDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

const TerminalLine = styled.div`
  color: ${props => props.$isCommand ? props.theme.accent : props.theme.secondaryText};
  font-size: 0.85rem;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
  animation: slideInFromBottom 0.5s ease-out;
`;

const HeroButton = styled.a`
  padding: 10px 20px;
  font-family: ${props => props.theme.fontMono};
  font-size: 0.85rem;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  color: ${props => props.$primary ? props.theme.background : props.theme.accent};
  background: ${props => props.$primary ? props.theme.accent : 'transparent'};
  border: 1px solid ${props => props.theme.accent};

  &:hover {
    box-shadow: 0 0 15px ${props => props.theme.glowBorder};
    transform: translateY(-2px);
  }
`;

const SkipButton = styled.button`
  position: absolute;
  bottom: 30px;
  right: 30px;
  background: none;
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.secondaryText};
  font-family: ${props => props.theme.fontMono};
  font-size: 0.75rem;
  padding: 6px 14px;
  cursor: pointer;
  border-radius: 3px;
  z-index: 3;
  opacity: 0;
  animation: fadeIn 1s ease-out 1s forwards;
  transition: color 0.3s ease;

  &:hover { color: ${props => props.theme.accent}; }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 40px;
  border: 2px solid ${props => props.theme.accent};
  border-radius: 12px;
  cursor: pointer;
  z-index: 3;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: ${props => props.$delay || '0s'};

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 8px;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${props => props.theme.accent};
    animation: scrollDot 1.5s infinite;
  }

  @keyframes scrollDot {
    0% { opacity: 1; transform: translateX(-50%) translateY(0); }
    100% { opacity: 0; transform: translateX(-50%) translateY(12px); }
  }
`;

const Hero = () => {
  const [phase, setPhase] = useState('boot');
  const [visibleBootLines, setVisibleBootLines] = useState([]);
  const [visibleProfileLines, setVisibleProfileLines] = useState([]);
  const [skipped, setSkipped] = useState(false);

  const skipAnimation = useCallback(() => {
    setSkipped(true);
    setVisibleBootLines(bootLines);
    setVisibleProfileLines(profileLines);
    setPhase('done');
  }, []);

  useEffect(() => {
    if (skipped) return;

    if (phase === 'boot') {
      if (visibleBootLines.length < bootLines.length) {
        const timer = setTimeout(() => {
          setVisibleBootLines(bootLines.slice(0, visibleBootLines.length + 1));
        }, 300);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase('profile'), 500);
        return () => clearTimeout(timer);
      }
    }

    if (phase === 'profile') {
      if (visibleProfileLines.length < profileLines.length) {
        const timer = setTimeout(() => {
          setVisibleProfileLines(profileLines.slice(0, visibleProfileLines.length + 1));
        }, 200);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase('done'), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, visibleBootLines, visibleProfileLines, skipped]);

  const scrollToContent = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeroContainer>
      <TerminalWindow>
        <TerminalHeader>
          <TerminalDot $color="#ff5f57" />
          <TerminalDot $color="#ffbd2e" />
          <TerminalDot $color="#28c840" />
        </TerminalHeader>

        {visibleBootLines.map((line, i) => (
          <TerminalLine key={`boot-${i}`} $isCommand={false}>{line}</TerminalLine>
        ))}

        {visibleProfileLines.map((line, i) => (
          <TerminalLine
            key={`profile-${i}`}
            $isCommand={line.startsWith('root@') || line.startsWith('─')}
          >
            {line}
          </TerminalLine>
        ))}

        {phase === 'done' && (
          <HeroButtons>
            <HeroButton
              href="#projects"
              $primary
              onClick={(e) => { e.preventDefault(); scrollToContent(); }}
            >
              [view projects]
            </HeroButton>
            <HeroButton
              href="https://github.com/le-lel190"
              target="_blank"
              rel="noopener noreferrer"
            >
              [github]
            </HeroButton>
          </HeroButtons>
        )}
      </TerminalWindow>

      {phase !== 'done' && (
        <SkipButton onClick={skipAnimation}>skip ▸</SkipButton>
      )}

      {phase === 'done' && (
        <ScrollIndicator $delay="0.5s" onClick={scrollToContent} />
      )}
    </HeroContainer>
  );
};

export default Hero;

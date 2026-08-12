import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { springIn } from '../utils/animations';

const bootLines = [
  '[ OK ] loading kernel modules',
  '[ OK ] mounting filesystems',
  '[ OK ] starting network services',
  '[ OK ] verifying credentials',
  '[ OK ] loading user profile: anson',
];

const HELP_HINT = "Type 'help' to list available commands.";
const PROMPT = 'visitor@lel190:~$';

const COMMAND_GROUPS = [
  'core    :: help, whoami, about, projects, skills, contact, clear',
  'links   :: github, linkedin, linktree',
  'flavor  :: pwd, uname, cat /etc/motd',
];

const PROJECT_LINES = [
  '1. AI API Gateway -> https://api.lel190.dev',
  '2. No-Account Temp Mail -> https://971236.xyz/',
  '3. Secret... [WIP 35%]',
];

const SKILL_LINES = [
  'Languages       :: Python, C/C++, Java, R, SQL',
  'Web Development :: React, Node.js, Express.js, JavaScript, HTML/CSS',
  'Tools           :: Git, Linux, Docker',
];

const CONTACT_LINES = [
  'GitHub   :: https://github.com/le-lel190',
  'LinkedIn :: https://www.linkedin.com/in/le-anson-cheung/',
  'Linktree :: https://linktr.ee/lel190',
];

const HeroContainer = styled.div`
  position: relative;
  height: 100vh;
  min-height: 560px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(1200px 520px at 78% -10%, rgba(51, 255, 102, 0.045), transparent 62%),
    radial-gradient(900px 480px at 8% 118%, rgba(84, 199, 128, 0.028), transparent 58%),
    ${props => props.theme.background};
  overflow: hidden;
  padding: 112px 24px 96px;
`;

const TerminalWindow = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 640px;
  max-width: 100%;
  background: ${props => props.theme.panel};
  border: 1px solid ${props => props.theme.borderStrong};
  border-radius: 10px;
  padding: 26px 28px 28px;
  font-family: ${props => props.theme.fontMono};
  box-shadow: ${props => props.theme.shadowPanel};
  cursor: text;
  overflow: hidden;

  &::after {
    /* hairline top accent — the only decorative gradient */
    content: '';
    position: absolute;
    top: 0;
    left: 44px;
    right: 68px;
    height: 1px;
    background: linear-gradient(90deg, ${props => props.theme.accent}, transparent 74%);
  }
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 22px;
  padding-bottom: 13px;
  border-bottom: 1px solid ${props => props.theme.border};

  span {
    font-size: 0.67rem;
    letter-spacing: 0.07em;
    color: ${props => props.theme.textMuted};
    text-transform: uppercase;
  }
`;

const TerminalDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

const TerminalTitle = styled.span`
  margin-left: auto;
`;

const TerminalLine = styled.div`
  color: ${props => props.$isCommand ? props.theme.accent : props.theme.textDim};
  font-size: 0.83rem;
  line-height: 1.85;
  white-space: pre-wrap;
  word-break: break-word;
`;

const PromptForm = styled.form`
  margin-top: 10px;
`;

const PromptRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${props => props.theme.accent};
  font-size: 0.87rem;
`;

const PromptText = styled.span`
  flex-shrink: 0;
`;

const PromptInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: ${props => props.theme.text};
  font-family: inherit;
  font-size: 0.87rem;
`;

const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 22px;
  flex-wrap: wrap;
`;

const HeroButton = styled(motion.a)`
  padding: 9px 17px;
  font-family: ${props => props.theme.fontMono};
  font-size: 0.79rem;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.18s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  color: ${props => props.$primary ? props.theme.background : props.theme.accent};
  background: ${props => props.$primary ? props.theme.accent : 'transparent'};
  border: 1px solid ${props => props.$primary ? props.theme.accent : props.theme.accentLine};

  &:hover {
    background: ${props => props.$primary ? props.theme.accent : props.theme.accentFaint};
    border-color: ${props => props.theme.accent};
  }
`;

const SkipButton = styled.button`
  position: absolute;
  bottom: 76px;
  right: 52px;
  background: none;
  border: 1px solid ${props => props.theme.borderStrong};
  color: ${props => props.theme.textMuted};
  font-family: ${props => props.theme.fontMono};
  font-size: 0.73rem;
  padding: 6px 13px;
  cursor: pointer;
  border-radius: 4px;
  z-index: 3;
  opacity: 0;
  animation: fadeIn 0.6s ease-out 0.9s forwards;
  transition: color 0.18s ease, border-color 0.18s ease;

  &:hover {
    color: ${props => props.theme.accent};
    border-color: ${props => props.theme.accentLine};
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 116px;
  left: 50%;
  transform: translateX(-50%);
  width: 19px;
  height: 29px;
  border: 1.5px solid ${props => props.theme.borderStrong};
  border-radius: 10px;
  cursor: pointer;
  z-index: 3;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: ${props => props.$delay || '0s'};

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 6px;
    transform: translateX(-50%);
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: ${props => props.theme.accent};
    animation: scrollDot 1.6s infinite;
  }

  @keyframes scrollDot {
    0% { opacity: 1; transform: translateX(-50%) translateY(0); }
    100% { opacity: 0; transform: translateX(-50%) translateY(9px); }
  }
`;

const createEntry = (id, content, isCommand = false) => ({ id, content, isCommand });

const Hero = () => {
  const [phase, setPhase] = useState('boot');
  const [visibleBootLines, setVisibleBootLines] = useState([]);
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [skipped, setSkipped] = useState(false);
  const inputRef = useRef(null);
  const entryIdRef = useRef(0);

  const nextEntryId = useCallback(() => {
    entryIdRef.current += 1;
    return `entry-${entryIdRef.current}`;
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const pushOutput = useCallback((lines) => {
    setHistory(prev => [
      ...prev,
      ...lines.map(line => createEntry(nextEntryId(), line, false)),
    ]);
  }, [nextEntryId]);

  const scrollToSection = useCallback((selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const openExternal = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const enterInteractiveMode = useCallback(() => {
    setPhase('interactive');
    setHistory([createEntry(nextEntryId(), HELP_HINT)]);
  }, [nextEntryId]);

  const skipAnimation = useCallback(() => {
    setSkipped(true);
    setVisibleBootLines(bootLines);
    enterInteractiveMode();
  }, [enterInteractiveMode]);

  useEffect(() => {
    if (skipped || phase !== 'boot') return undefined;

    if (visibleBootLines.length < bootLines.length) {
      const timer = setTimeout(() => {
        setVisibleBootLines(bootLines.slice(0, visibleBootLines.length + 1));
      }, 260);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      enterInteractiveMode();
    }, 450);

    return () => clearTimeout(timer);
  }, [enterInteractiveMode, phase, skipped, visibleBootLines]);

  useEffect(() => {
    if (phase === 'interactive') {
      focusInput();
    }
  }, [focusInput, phase]);

  const commandHandlers = useMemo(() => ({
    help: () => {
      pushOutput(['Available commands:', ...COMMAND_GROUPS]);
    },
    whoami: () => {
      pushOutput(['anson :: CUHK CS student :: cybersecurity, CTF, reverse engineering']);
    },
    about: () => {
      pushOutput([
        'name      :: Anson Cheung',
        'handle    :: lel190',
        'role      :: CS student @ CUHK',
        'focus     :: cybersecurity, CTF, reverse engineering',
        'status    :: building things',
      ]);
    },
    projects: () => {
      pushOutput(['Projects loaded. Scrolling to portfolio section...', ...PROJECT_LINES]);
      scrollToSection('#projects');
    },
    skills: () => {
      pushOutput(['Skills indexed. Scrolling to skills section...', ...SKILL_LINES]);
      scrollToSection('#skills');
    },
    contact: () => {
      pushOutput(['Contact routes online. Scrolling to contact section...', ...CONTACT_LINES]);
      document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
    },
    github: () => {
      const url = 'https://github.com/le-lel190';
      pushOutput([`Opening GitHub: ${url}`]);
      openExternal(url);
    },
    linkedin: () => {
      const url = 'https://www.linkedin.com/in/le-anson-cheung/';
      pushOutput([`Opening LinkedIn: ${url}`]);
      openExternal(url);
    },
    linktree: () => {
      const url = 'https://linktr.ee/lel190';
      pushOutput([`Opening Linktree: ${url}`]);
      openExternal(url);
    },
    pwd: () => {
      pushOutput(['/home/visitor']);
    },
    uname: () => {
      pushOutput(['lel190OS 1.0.0 x86_64']);
    },
    'cat /etc/motd': () => {
      pushOutput(['Welcome to lel190.dev — type help and explore the system.']);
    },
    clear: () => {
      setHistory([]);
    },
  }), [openExternal, pushOutput, scrollToSection]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      setInputValue('');
      return;
    }

    setHistory(prev => [
      ...prev,
      createEntry(nextEntryId(), `${PROMPT} ${trimmedValue}`, true),
    ]);

    const normalized = trimmedValue.toLowerCase().replace(/\s+/g, ' ');
    const handler = commandHandlers[normalized];

    if (handler) {
      handler();
    } else {
      pushOutput([`command not found: ${trimmedValue}`, HELP_HINT]);
    }

    setInputValue('');
  }, [commandHandlers, inputValue, nextEntryId, pushOutput]);

  const scrollToContent = useCallback(() => {
    scrollToSection('#projects');
  }, [scrollToSection]);

  return (
    <HeroContainer>
      <TerminalWindow
        onClick={focusInput}
        variants={springIn}
        initial="hidden"
        animate="visible"
      >
        <TerminalHeader>
          <TerminalDot $color="#ff5f57" />
          <TerminalDot $color="#ffbd2e" />
          <TerminalDot $color="#28c840" />
          <TerminalTitle>lel190 — secure shell</TerminalTitle>
        </TerminalHeader>

        {visibleBootLines.map((line, i) => (
          <TerminalLine key={`boot-${i}`}>{line}</TerminalLine>
        ))}

        {history.map(entry => (
          <TerminalLine key={entry.id} $isCommand={entry.isCommand}>
            {entry.content}
          </TerminalLine>
        ))}

        {phase === 'interactive' && (
          <PromptForm onSubmit={handleSubmit}>
            <PromptRow>
              <SrOnly>Terminal command input</SrOnly>
              <PromptText>{PROMPT}</PromptText>
              <PromptInput
                ref={inputRef}
                aria-label="Terminal command input"
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
            </PromptRow>
          </PromptForm>
        )}

        {phase === 'interactive' && (
          <HeroButtons>
            <HeroButton
              href="#projects"
              $primary
              onClick={(e) => {
                e.preventDefault();
                scrollToContent();
              }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              view projects
            </HeroButton>
            <HeroButton
              href="https://github.com/le-lel190"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              github
            </HeroButton>
          </HeroButtons>
        )}
      </TerminalWindow>

      {phase === 'boot' && (
        <SkipButton onClick={skipAnimation}>skip intro</SkipButton>
      )}

      {phase === 'interactive' && (
        <ScrollIndicator $delay="0.5s" onClick={scrollToContent} />
      )}
    </HeroContainer>
  );
};

export default Hero;
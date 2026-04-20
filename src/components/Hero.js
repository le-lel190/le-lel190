import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';

const bootLines = [
  '[OK] Loading kernel modules...',
  '[OK] Mounting filesystems...',
  '[OK] Starting network services...',
  '[OK] Initializing security protocols...',
  '[OK] Loading user profile...',
];

const HELP_HINT = "Type 'help' to list available commands.";
const PROMPT = 'visitor@anson:~$';

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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.background};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
  cursor: text;
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

const PromptForm = styled.form`
  margin-top: 8px;
`;

const PromptRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.accent};
  font-size: 0.85rem;
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
  font-size: 0.85rem;
  caret-color: ${props => props.theme.accent};
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

  &:hover {
    color: ${props => props.theme.accent};
  }
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
      }, 300);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      enterInteractiveMode();
    }, 500);

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
      pushOutput(['Anson Cheung :: CUHK CS student focused on cybersecurity, CTF, and reverse engineering.']);
    },
    about: () => {
      pushOutput([
        'Name      :: Anson Cheung',
        'Handle    :: lel190',
        'Role      :: CS Student @ CUHK',
        'Interests :: Cybersecurity, CTF, Reverse Engineering',
        'Status    :: Building things...',
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
      pushOutput(['portfolioOS 1.0.0 x86_64']);
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
      <TerminalWindow onClick={focusInput}>
        <TerminalHeader>
          <TerminalDot $color="#ff5f57" />
          <TerminalDot $color="#ffbd2e" />
          <TerminalDot $color="#28c840" />
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

      {phase === 'boot' && (
        <SkipButton onClick={skipAnimation}>skip ▸</SkipButton>
      )}

      {phase === 'interactive' && (
        <ScrollIndicator $delay="0.5s" onClick={scrollToContent} />
      )}
    </HeroContainer>
  );
};

export default Hero;

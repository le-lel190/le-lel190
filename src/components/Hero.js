import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import pixelFont from '../assets/lel190-pixel.ttf';

const bootLines = [
  '[ OK ] mounting /home/lel190',
  '[ OK ] indexing projects and experiments',
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

const HeroContainer = styled.section`
  position: relative;
  isolation: isolate;
  padding: 110px 0 0;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0 -32px;
    pointer-events: none;
    background:
      linear-gradient(90deg, rgba(16, 18, 17, 0.97) 0%, rgba(16, 18, 17, 0.9) 38%, rgba(16, 18, 17, 0.12) 72%),
      linear-gradient(0deg, ${props => props.theme.background} 0%, transparent 28%, transparent 85%, rgba(16, 18, 17, 0.3) 100%),
      url('${process.env.PUBLIC_URL}/images/hero-bedroom.webp') center / cover no-repeat;
  }

  @media (max-width: 780px) {
    padding-top: 64px;
    &::before {
      background:
        linear-gradient(90deg, rgba(16, 18, 17, 0.92), rgba(16, 18, 17, 0.65) 60%, rgba(16, 18, 17, 0.15)),
        linear-gradient(0deg, ${props => props.theme.background} 0%, transparent 55%),
        url('${process.env.PUBLIC_URL}/images/hero-bedroom.webp') 70% top / auto 620px no-repeat;
    }
  }
  @media (max-width: 600px) { &::before { inset-inline: -20px; } }
`;
const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 64px;
  align-items: center;
  padding-bottom: 90px;
  > * { min-width: 0; }
  @media (max-width: 980px) { gap: 32px; }
  @media (max-width: 780px) { grid-template-columns: 1fr; gap: 36px; padding-bottom: 36px; }
`;
const Introduction = styled.div`
  h1 {
    font: 600 clamp(3.5rem, 6.7vw, 5.7rem)/0.98 ${props => props.theme.fontDisplay};
    letter-spacing: -0.035em;
    margin-bottom: 25px;
    span { display: block; }
    em { font-style: normal; color: ${props => props.theme.accent}; }
  }
`;
const Bio = styled.p`
  color: ${props => props.theme.textDim};
  font-size: 1rem;
  max-width: 38ch;
  line-height: 1.75;
  strong { color: ${props => props.theme.text}; font-weight: 500; }
`;
const Identity = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 30px;
  font: 0.7rem/1.7 ${props => props.theme.fontMono};
  color: ${props => props.theme.textMuted};
  img { width: 42px; height: 42px; object-fit: cover; border: 1px solid ${props => props.theme.borderStrong}; }
  strong { color: ${props => props.theme.accent}; font-weight: 500; display: block; }
`;
const HeroButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 28px;
  flex-wrap: wrap;
`;
const HeroButton = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 44px;
  padding: ${props => props.$primary ? '10px 19px' : '10px 0'};
  font: 500 0.78rem ${props => props.theme.fontMono};
  text-decoration: none;
  color: ${props => props.$primary ? props.theme.background : props.theme.text};
  background: ${props => props.$primary ? props.theme.accent : 'transparent'};
  border: 1px solid ${props => props.$primary ? props.theme.accent : 'transparent'};
  transition: background 160ms ease, color 160ms ease;
  &:hover { background: ${props => props.$primary ? props.theme.text : props.theme.accentFaint}; }
  svg { width: 16px; height: 16px; margin-left: 13px; }
`;
const Workstation = styled.div`
  animation: terminalEnter 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
`;
const WorkstationLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: ${props => props.theme.textMuted};
  font: 0.65rem ${props => props.theme.fontMono};
  span {
    padding: 4px 6px;
    background: ${props => props.theme.panel};
  }
  span:last-child { color: ${props => props.theme.accent}; }
`;
const TerminalWindow = styled.div`
  background: ${props => props.theme.panel};
  border: 1px solid ${props => props.theme.borderStrong};
  font-family: ${props => props.theme.fontMono};
`;
const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 17px;
  background: ${props => props.theme.panelRaised};
  border-bottom: 1px solid ${props => props.theme.borderStrong};
  color: ${props => props.theme.textDim};
  font-size: 0.67rem;
  span:first-child { color: ${props => props.theme.accent}; }
  span:last-child { margin-left: auto; color: ${props => props.theme.textMuted}; }
`;
const TerminalOutput = styled.div`
  height: 249px;
  padding: 20px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  @media (max-width: 400px) { padding: 16px; }
`;
const TerminalGreeting = styled.div`
  margin-bottom: 17px;
  color: ${props => props.theme.accent};
  font-size: 0.78rem;
  line-height: 1.8;
  span { color: ${props => props.theme.textMuted}; font-size: 0.7rem; }
`;
const PixelWordmark = styled.div`
  @font-face {
    font-family: 'lel190 Pixel';
    src: url(${pixelFont}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  margin-bottom: 14px;
  font: 400 1.75rem/1.4 'lel190 Pixel', ${props => props.theme.fontMono};
  letter-spacing: 0.08em;
  white-space: nowrap;
`;
const TerminalLine = styled.div`
  color: ${props => props.$isCommand ? props.theme.accent : props.theme.textDim};
  font-size: 0.72rem;
  line-height: 1.9;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;
const PromptForm = styled.form`
  border-top: 1px solid ${props => props.theme.border};
  padding: 14px 18px;
  min-height: 59px;
  &:focus-within { background: ${props => props.theme.accentFaint}; }
`;
const PromptRow = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  color: ${props => props.theme.accent};
  font-size: 0.73rem;
  > span { flex-shrink: 0; }
  @media (max-width: 380px) { gap: 5px; font-size: 0.66rem; }
`;
const PromptInput = styled.input`
  flex: 1;
  width: 100%;
  min-width: 0;
  padding: 2px;
  border: none;
  background: transparent;
  color: ${props => props.theme.text};
  font: 0.8rem ${props => props.theme.fontMono};
  &::placeholder { color: ${props => props.theme.textMuted}; opacity: 1; }
  @media (max-width: 780px) { font-size: 16px; }
`;
const SkipButton = styled.button`
  display: block;
  width: 100%;
  min-height: 59px;
  padding: 14px 18px;
  text-align: left;
  background: transparent;
  border: none;
  border-top: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.accent};
  font: 0.72rem ${props => props.theme.fontMono};
  cursor: pointer;
  &:hover { background: ${props => props.theme.accentFaint}; }
`;
const TerminalFootnote = styled.p`
  width: fit-content;
  padding: 4px 6px;
  background: ${props => props.theme.panel};
  margin-top: 12px;
  font: 0.65rem/1.7 ${props => props.theme.fontMono};
  color: ${props => props.theme.textMuted};
  code { color: ${props => props.theme.accent}; }
`;
const InterestStrip = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 28px;
  border-top: 1px solid ${props => props.theme.border};
  border-bottom: 1px solid ${props => props.theme.border};
  padding: 17px 0;
  color: ${props => props.theme.textMuted};
  font: 0.65rem/1.7 ${props => props.theme.fontMono};
  div { display: flex; flex-wrap: wrap; gap: 8px 22px; }
  span { color: ${props => props.theme.textDim}; }
  > p { color: ${props => props.theme.warning}; }
`;

const createEntry = (id, content, isCommand = false) => ({ id, content, isCommand });

const Hero = () => {
  const [phase, setPhase] = useState('boot');
  const [visibleBootLines, setVisibleBootLines] = useState([]);
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [skipped, setSkipped] = useState(false);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const entryIdRef = useRef(0);

  const nextEntryId = useCallback(() => `entry-${++entryIdRef.current}`, []);
  const pushOutput = useCallback((lines) => {
    setHistory(prev => [...prev, ...lines.map(line => createEntry(nextEntryId(), line))]);
  }, [nextEntryId]);
  const scrollToSection = useCallback((selector) => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document.querySelector(selector)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }, []);
  const openExternal = useCallback((url) => window.open(url, '_blank', 'noopener,noreferrer'), []);
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
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisibleBootLines(bootLines);
      enterInteractiveMode();
      return undefined;
    }
    const timer = setTimeout(() => {
      if (visibleBootLines.length < bootLines.length) {
        setVisibleBootLines(bootLines.slice(0, visibleBootLines.length + 1));
      } else {
        enterInteractiveMode();
      }
    }, 220);
    return () => clearTimeout(timer);
  }, [enterInteractiveMode, phase, skipped, visibleBootLines]);

  // Don't steal page focus or open a mobile keyboard after an automatic boot.
  useEffect(() => {
    if (skipped && phase === 'interactive') inputRef.current?.focus({ preventScroll: true });
  }, [skipped, phase]);
  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [history, visibleBootLines]);

  const commandHandlers = useMemo(() => ({
    help: () => pushOutput(['Available commands:', ...COMMAND_GROUPS]),
    whoami: () => pushOutput(['anson :: CUHK CS student :: cybersecurity, CTF, reverse engineering']),
    about: () => pushOutput([
      'name      :: Anson Cheung',
      'handle    :: lel190',
      'role      :: CS student @ CUHK',
      'focus     :: cybersecurity, CTF, reverse engineering',
      'status    :: building things',
    ]),
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
      scrollToSection('footer');
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
    pwd: () => pushOutput(['/home/visitor']),
    uname: () => pushOutput(['lel190OS 1.0.0 x86_64']),
    'cat /etc/motd': () => pushOutput(['Welcome to lel190.dev — type help and explore the system.']),
    clear: () => setHistory([]),
  }), [openExternal, pushOutput, scrollToSection]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) { setInputValue(''); return; }
    setHistory(prev => [...prev, createEntry(nextEntryId(), `${PROMPT} ${trimmedValue}`, true)]);
    const normalized = trimmedValue.toLowerCase().replace(/\s+/g, ' ');
    if (Object.prototype.hasOwnProperty.call(commandHandlers, normalized)) {
      commandHandlers[normalized]();
    } else {
      pushOutput([`command not found: ${trimmedValue}`, HELP_HINT]);
    }
    setInputValue('');
  }, [commandHandlers, inputValue, nextEntryId, pushOutput]);

  return (
    <HeroContainer id="home" aria-labelledby="name">
      <HeroGrid>
        <Introduction>
          <h1 id="name"><span>Anson</span>Cheung<em>.</em></h1>
          <Bio>
            CS student at <strong>CUHK</strong>. Building useful things,
            taking systems apart, and following the next rabbit hole.
          </Bio>
          <HeroButtons>
            <HeroButton href="#projects" $primary>
              Explore projects
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 10h14m-6-6 6 6-6 6" /></svg>
            </HeroButton>
            <HeroButton href="https://github.com/le-lel190" target="_blank" rel="noopener noreferrer">GitHub ↗</HeroButton>
          </HeroButtons>
          <Identity>
            <img src={`${process.env.PUBLIC_URL}/images/avatar.jpg`} alt="" width="42" height="42" />
            <div><strong>@lel190</strong>human behind the shell</div>
          </Identity>
        </Introduction>
        <Workstation>
          <WorkstationLabel><span>~/lel190 / interactive shell</span><span>LOCAL SESSION</span></WorkstationLabel>
          <TerminalWindow>
            <TerminalHeader><span aria-hidden="true">&gt;_</span> terminal <span>bash — visitor</span></TerminalHeader>
            <TerminalOutput ref={outputRef} role="region" aria-label="Terminal output" tabIndex="0">
              <TerminalGreeting>
                <PixelWordmark>lel190_</PixelWordmark>
                welcome to my corner of the internet.<br />
                <span>Not a remote server. Just a curious human's homepage.</span>
              </TerminalGreeting>
              {visibleBootLines.map((line, i) => <TerminalLine key={`boot-${i}`}>{line}</TerminalLine>)}
              <div role="log" aria-label="Command responses" aria-live="polite" aria-relevant="additions">
                {history.map(entry => <TerminalLine key={entry.id} $isCommand={entry.isCommand}>{entry.content}</TerminalLine>)}
              </div>
            </TerminalOutput>
            {phase === 'interactive' ? (
              <PromptForm onSubmit={handleSubmit}>
                <PromptRow>
                  <span>{PROMPT}</span>
                  <PromptInput ref={inputRef} aria-label="Terminal command input" placeholder="help" autoCapitalize="none" autoCorrect="off" autoComplete="off" spellCheck={false} value={inputValue} onChange={event => setInputValue(event.target.value)} />
                </PromptRow>
              </PromptForm>
            ) : <SkipButton onClick={skipAnimation}>skip intro / enter terminal</SkipButton>}
          </TerminalWindow>
          <TerminalFootnote>Try <code>whoami</code>, <code>projects</code>, or <code>help</code>. Point-and-click works too.</TerminalFootnote>
        </Workstation>
      </HeroGrid>
      <InterestStrip>
        <div><span>CYBERSECURITY</span><span>CTF</span><span>REVERSE ENGINEERING</span></div>
        <p>always a work in progress_</p>
      </InterestStrip>
    </HeroContainer>
  );
};

export default Hero;

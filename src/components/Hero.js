import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import pixelFont from '../assets/lel190-pixel.ttf';
import LainDataStream from './LainDataStream';
import { skills } from '../data/profile';

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
  '3. Unity function-hooking experiment [WIP]',
];
const SKILL_LINES = skills.map(({ category, items }) => `${category.padEnd(12)} :: ${items.join(', ')}`);
const CONTACT_LINES = [
  'GitHub   :: https://github.com/le-lel190',
  'LinkedIn :: https://www.linkedin.com/in/le-anson-cheung/',
  'Linktree :: https://linktr.ee/lel190',
];

const HeroContainer = styled.section`
  position: relative;
  isolation: isolate;
  padding: 80px 0 0;
  @media (max-width: 780px) { padding-top: 40px; }
`;
const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  padding-bottom: 64px;
  > * { min-width: 0; }
  @media (max-width: 980px) { gap: 32px; }
  @media (max-width: 780px) { grid-template-columns: 1fr; gap: 32px; padding-bottom: 32px; }
`;
const Introduction = styled.div`
  h1 {
    font: 600 clamp(3.5rem, 6.7vw, 5.7rem)/1 ${props => props.theme.fontDisplay};
    letter-spacing: -0.035em;
    margin-bottom: 20px;
    span { display: block; }
    em { font-style: normal; color: ${props => props.theme.accent}; }
  }
`;
const Bio = styled.p`
  color: ${props => props.theme.textDim};
  font-size: 1.05rem;
  max-width: 39ch;
  line-height: 1.75;
  strong { color: ${props => props.theme.text}; font-weight: 500; }
`;
const Identity = styled.p`
  margin-bottom: 16px;
  color: ${props => props.theme.accent};
  font: 0.9rem/1.6 ${props => props.theme.fontMono};
`;
const PersonalNote = styled.p`
  max-width: 44ch;
  margin-top: 20px;
  color: ${props => props.theme.textMuted};
  font-size: 0.9rem;
  line-height: 1.75;
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
  font: 500 0.8rem ${props => props.theme.fontMono};
  text-decoration: none;
  color: ${props => props.$primary ? props.theme.background : props.theme.text};
  background: ${props => props.$primary ? props.theme.accent : 'transparent'};
  border: 1px solid ${props => props.$primary ? props.theme.accent : 'transparent'};
  transition: background 160ms ease, color 160ms ease;
  &:hover { background: ${props => props.$primary ? props.theme.text : props.theme.accentFaint}; }
  svg { width: 16px; height: 16px; margin-left: 13px; }
`;
const Workstation = styled.div`
  margin-top: 20px;
  animation: terminalEnter 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
  @media (max-width: 780px) { margin-top: 0; }
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
  font-size: 0.75rem;
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
  span { color: ${props => props.theme.textMuted}; font-size: 0.75rem; }
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
  font-size: 0.8rem;
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
  font-size: 0.75rem;
  > span { flex-shrink: 0; }
  @media (max-width: 380px) { flex-wrap: wrap; gap: 8px; }
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
  font: 0.75rem ${props => props.theme.fontMono};
  cursor: pointer;
  &:hover { background: ${props => props.theme.accentFaint}; }
`;
const TerminalFootnote = styled.p`
  padding: 12px 18px;
  border-top: 1px solid ${props => props.theme.border};
  font: 0.75rem/1.7 ${props => props.theme.fontMono};
  color: ${props => props.theme.textMuted};
  code { color: ${props => props.theme.accent}; }
`;
const InterestStrip = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 24px;
  border-top: 1px solid ${props => props.theme.borderStrong};
  padding: 12px 0;
  color: ${props => props.theme.textDim};
  font: 0.75rem/1.8 ${props => props.theme.fontMono};
  > p { display: flex; flex-wrap: wrap; gap: 4px 16px; }
  > p span { color: ${props => props.theme.textMuted}; }
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
    whoami: () => pushOutput(['Anson Cheung / lel190 :: CUHK CS graduate :: web services, reverse engineering, CTF']),
    about: () => pushOutput([
      'name      :: Anson Cheung',
      'handle    :: lel190',
      'role      :: CS graduate from CUHK',
      'interests :: web services, reverse engineering, CTF',
      'background :: security coursework and CTF competitions',
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
          <Identity>@lel190</Identity>
          <Bio>
            CS graduate from <strong>CUHK</strong>. I build web services
            and enjoy taking software apart.
          </Bio>
          <PersonalNote>Cheat Engine started the reverse-engineering rabbit hole.</PersonalNote>
          <HeroButtons>
            <HeroButton href="#projects" $primary>
              Explore projects
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 10h14m-6-6 6 6-6 6" /></svg>
            </HeroButton>
            <HeroButton href="https://github.com/le-lel190" target="_blank" rel="noopener noreferrer">GitHub ↗</HeroButton>
          </HeroButtons>
        </Introduction>
        <Workstation>
          <TerminalWindow>
            <TerminalHeader><span aria-hidden="true">&gt;_</span> terminal <span>bash — visitor</span></TerminalHeader>
            <TerminalOutput ref={outputRef} role="region" aria-label="Terminal output" tabIndex="0">
              <TerminalGreeting>
                <PixelWordmark>lel190_</PixelWordmark>
                take a look around.<br />
                <span>A little shell for this homepage. Try a command below.</span>
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
            <TerminalFootnote>Try <code>whoami</code>, <code>projects</code>, or <code>help</code>.</TerminalFootnote>
          </TerminalWindow>
        </Workstation>
      </HeroGrid>
      <InterestStrip>
        <p>Web services <span>/</span> Reverse engineering <span>/</span> CTF</p>
        <LainDataStream />
      </InterestStrip>
    </HeroContainer>
  );
};

export default Hero;

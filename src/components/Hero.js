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
const SPECS = [
  { pin: '01', label: 'Role', value: 'CS graduate, CUHK', note: 'web services + systems' },
  { pin: '02', label: 'Builds', value: 'APIs, small tools, experiments', note: 'Node, React, Cloudflare' },
  { pin: '03', label: 'Tinkers', value: 'Reverse engineering', note: 'started with Cheat Engine' },
  { pin: '04', label: 'Compares', value: 'Security coursework, CTFs', note: 'university + competitions' },
];

const HeroContainer = styled.section`
  padding: 32px 0 0;
  @media (max-width: 780px) { padding-top: 20px; }
`;
const Sheet = styled.div`
  border: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.sheet};
`;
const SheetMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textMuted};
  font: 400 0.68rem/1.6 ${props => props.theme.fontMono};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  b { color: ${props => props.theme.accent}; font-weight: 500; }
  span:last-child { margin-left: auto; }
  @media (max-width: 720px) { span:last-child { display: none; } }
`;
const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
  > * { min-width: 0; }
  @media (max-width: 1000px) { grid-template-columns: 1fr; }
`;
const Introduction = styled.div`
  padding: 40px 32px 32px;
  border-right: 1px solid ${props => props.theme.border};
  @media (max-width: 1000px) { border-right: none; border-bottom: 1px solid ${props => props.theme.border}; }
  @media (max-width: 600px) { padding: 28px 20px 24px; }

  h1 {
    font-family: ${props => props.theme.fontDisplay};
    font-size: ${props => props.theme.displaySize};
    font-weight: 700;
    font-stretch: 78%;
    line-height: 0.83;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    span { display: block; color: ${props => props.theme.textDim}; }
    em { font-style: normal; color: ${props => props.theme.accent}; }
  }
`;
const NameField = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
`;
const PinFields = styled.ul`
  list-style: none;
  flex-shrink: 0;
  margin-top: 4px;
  padding-top: 8px;
  border-top: 1px solid ${props => props.theme.borderStrong};
  color: ${props => props.theme.textMuted};
  font: 400 0.62rem/1.9 ${props => props.theme.fontMono};
  letter-spacing: 0.08em;
  text-align: right;
  li::before { content: '▣ '; color: ${props => props.theme.accentDim}; }
  @media (max-width: 600px) { display: none; }
`;
const Trace = styled.svg`
  display: block;
  width: 100%;
  height: 10px;
  margin: 18px 0 0;
  overflow: visible;
  line { stroke: ${props => props.theme.accentDim}; stroke-width: 1; }
  line.active {
    stroke: ${props => props.theme.accent};
    stroke-dasharray: var(--len);
    animation: traceDraw 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  circle { fill: ${props => props.theme.accent}; }
`;
const Identity = styled.p`
  margin-top: 18px;
  color: ${props => props.theme.accent};
  font: 400 0.8rem/1.6 ${props => props.theme.fontMono};
  letter-spacing: 0.06em;
  span { color: ${props => props.theme.textMuted}; }
`;
const Lead = styled.p`
  max-width: 46ch;
  margin-top: 12px;
  color: ${props => props.theme.text};
  font-size: 1.02rem;
  line-height: 1.7;
  strong { color: ${props => props.theme.accent}; font-weight: 500; }
`;
const SpecTable = styled.dl`
  margin-top: 26px;
  border-top: 1px solid ${props => props.theme.border};
  > div {
    display: grid;
    grid-template-columns: 30px 8.5em minmax(0, 1fr);
    gap: 12px;
    align-items: baseline;
    padding: 9px 0;
    border-bottom: 1px solid ${props => props.theme.border};
  }
  .pin { color: ${props => props.theme.accentDim}; font: 500 0.7rem ${props => props.theme.fontMono}; }
  dt {
    color: ${props => props.theme.textMuted};
    font: 400 0.68rem ${props => props.theme.fontMono};
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  dd {
    color: ${props => props.theme.text};
    font: 500 0.82rem/1.7 ${props => props.theme.fontMono};
    display: flex;
    flex-wrap: wrap;
    gap: 2px 12px;
    align-items: baseline;
  }
  dd small { color: ${props => props.theme.textMuted}; font-weight: 400; font-size: 0.72rem; }
  @media (max-width: 420px) {
    > div { grid-template-columns: 26px minmax(0, 1fr); row-gap: 2px; }
    dd { grid-column: 2; }
    dt { font-size: 0.64rem; }
  }
`;
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 22px;
  margin-top: 26px;
`;
const PrimaryAction = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  min-height: 44px;
  padding: 10px 18px;
  background: ${props => props.theme.accent};
  color: ${props => props.theme.selectionInk};
  border: 1px solid ${props => props.theme.accent};
  font: 500 0.78rem ${props => props.theme.fontMono};
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: background 150ms ease, color 150ms ease;
  &:hover { background: transparent; color: ${props => props.theme.accent}; }
  svg { width: 15px; height: 15px; }
`;
const GhostAction = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  color: ${props => props.theme.text};
  font: 400 0.78rem ${props => props.theme.fontMono};
  text-decoration: none;
  border-bottom: 1px solid ${props => props.theme.borderStrong};
  &:hover { color: ${props => props.theme.accent}; border-color: ${props => props.theme.accent}; }
`;

const Console = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.panel};
`;
const ConsoleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: ${props => props.theme.panelRaised};
  border-bottom: 1px solid ${props => props.theme.borderStrong};
  color: ${props => props.theme.textDim};
  font: 400 0.66rem/1.6 ${props => props.theme.fontMono};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  span.ref {
    padding: 1px 5px;
    border: 1px solid ${props => props.theme.accentDim};
    color: ${props => props.theme.accent};
  }
  span:last-child { margin-left: auto; color: ${props => props.theme.textMuted}; }
`;
const ConsoleBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const TerminalOutput = styled.div`
  flex: 1;
  min-height: 250px;
  max-height: none;
  padding: 18px 16px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  background-image: repeating-linear-gradient(
    0deg,
    ${props => props.theme.accentFaint},
    ${props => props.theme.accentFaint} 1px,
    transparent 1px,
    transparent 4px
  );
  @media (max-width: 1000px) { min-height: 200px; max-height: 280px; }
`;
const TerminalGreeting = styled.div`
  margin-bottom: 14px;
  color: ${props => props.theme.accent};
  font: 400 0.78rem/1.8 ${props => props.theme.fontMono};
  span { color: ${props => props.theme.textMuted}; font-size: 0.72rem; }
`;
const PixelWordmark = styled.div`
  @font-face {
    font-family: 'lel190 Pixel';
    src: url(${pixelFont}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  margin-bottom: 10px;
  font: 400 1.5rem/1.4 'lel190 Pixel', ${props => props.theme.fontMono};
  letter-spacing: 0.08em;
  white-space: nowrap;
`;
const TerminalLine = styled.div`
  font: 400 0.78rem/1.85 ${props => props.theme.fontMono};
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  color: ${props => {
    if (props.$isCommand) return props.theme.accent;
    if (props.$isError) return props.theme.warning;
    if (props.$isResponse) return props.theme.text;
    return props.theme.textMuted;
  }};
`;
const PromptForm = styled.form`
  border-top: 1px solid ${props => props.theme.borderStrong};
  padding: 13px 16px;
  min-height: 53px;
  &:focus-within { background: ${props => props.theme.accentFaint}; }
`;
const PromptRow = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  color: ${props => props.theme.accent};
  font: 400 0.75rem ${props => props.theme.fontMono};
  > span { flex-shrink: 0; }
  @media (max-width: 380px) { flex-wrap: wrap; gap: 6px; }
`;
const PromptInput = styled.input`
  flex: 1;
  width: 100%;
  min-width: 0;
  padding: 2px;
  border: none;
  background: transparent;
  color: ${props => props.theme.text};
  font: 400 0.8rem ${props => props.theme.fontMono};
  &:focus { outline: none; }
  &::placeholder { color: ${props => props.theme.textMuted}; opacity: 1; }
  @media (max-width: 1000px) { font-size: 16px; }
`;
const SkipButton = styled.button`
  display: block;
  width: 100%;
  min-height: 53px;
  padding: 13px 16px;
  text-align: left;
  background: transparent;
  border: none;
  border-top: 1px solid ${props => props.theme.borderStrong};
  color: ${props => props.theme.accent};
  font: 400 0.75rem ${props => props.theme.fontMono};
  cursor: pointer;
  &:hover { background: ${props => props.theme.accentFaint}; }
`;
const ConsoleFoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  align-items: center;
  justify-content: space-between;
  padding: 9px 16px;
  border-top: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textMuted};
  font: 400 0.68rem/1.7 ${props => props.theme.fontMono};
  > span { letter-spacing: 0.06em; }
`;
const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
const Chip = styled.button`
  padding: 3px 9px;
  min-height: 26px;
  border: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.surface};
  color: ${props => props.theme.textDim};
  font: 400 0.7rem ${props => props.theme.fontMono};
  cursor: pointer;
  transition: color 140ms ease, border-color 140ms ease, background 140ms ease;
  &:hover, &:focus-visible {
    color: ${props => props.theme.accent};
    border-color: ${props => props.theme.accentDim};
    background: ${props => props.theme.accentFaint};
  }
`;

const BoardEdge = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(120px, 240px);
  align-items: center;
  gap: 12px 32px;
  border-top: 1px solid ${props => props.theme.borderStrong};
  background: ${props => props.theme.surface};
  min-height: 52px;
  padding: 0 20px;
  color: ${props => props.theme.textMuted};
  font: 400 0.68rem/1.6 ${props => props.theme.fontMono};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  > p {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 18px;
    position: relative;
    z-index: 1;
  }
  > p span::before { content: '+ '; color: ${props => props.theme.accentDim}; }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 10px 16px;
    > p { column-gap: 14px; }
    > div:last-child { display: none; }
  }
`;

const createEntry = (id, content, type = 'boot') => ({ id, content, type });

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
  const pushOutput = useCallback((lines, type = 'response') => {
    setHistory(prev => [...prev, ...lines.map(line => createEntry(nextEntryId(), line, type))]);
  }, [nextEntryId]);
  const scrollToSection = useCallback((selector) => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document.querySelector(selector)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }, []);
  const openExternal = useCallback((url) => window.open(url, '_blank', 'noopener,noreferrer'), []);
  const enterInteractiveMode = useCallback(() => {
    setPhase('interactive');
    setHistory([createEntry(nextEntryId(), HELP_HINT, 'response')]);
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
    setHistory(prev => [...prev, createEntry(nextEntryId(), `${PROMPT} ${trimmedValue}`, 'command')]);
    const normalized = trimmedValue.toLowerCase().replace(/\s+/g, ' ');
    if (Object.prototype.hasOwnProperty.call(commandHandlers, normalized)) {
      commandHandlers[normalized]();
    } else {
      pushOutput([`command not found: ${trimmedValue}`, HELP_HINT], 'error');
    }
    setInputValue('');
  }, [commandHandlers, inputValue, nextEntryId, pushOutput]);

  // Touch and keyboard users get the same commands without typing.
  const runChip = useCallback((command) => {
    setHistory(prev => [...prev, createEntry(nextEntryId(), `${PROMPT} ${command}`, 'command')]);
    commandHandlers[command]();
  }, [commandHandlers, nextEntryId]);

  return (
    <HeroContainer id="home" aria-labelledby="name">
      <Sheet>
        <SheetMeta>
          <span>Parts no. <b>LEL-190</b></span>
          <span>Chipset: CUHK CS</span>
          <span>Package: personal portfolio</span>
          <span>Document rev. <b>2026</b></span>
        </SheetMeta>
        <HeroGrid>
          <Introduction>
            <NameField>
              <h1 id="name"><span>Anson</span>Cheung<em>.</em></h1>
              <PinFields aria-hidden="true">
                <li>A1</li>
                <li>GND</li>
                <li>VCC</li>
              </PinFields>
            </NameField>
            <Trace viewBox="0 0 640 10" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="5" x2="640" y2="5" />
              <line className="active" style={{ '--len': 640 }} x1="0" y1="5" x2="470" y2="5" />
              <circle cx="470" cy="5" r="2.6" />
            </Trace>
            <Identity>@lel190 <span>/ portfolio sheet 01 of 01</span></Identity>
            <Lead>
              CS graduate from <strong>CUHK</strong>. I build web services and take
              software apart to see how it works.
            </Lead>
            <SpecTable>
              {SPECS.map(({ pin, label, value, note }) => (
                <div key={pin}>
                  <span className="pin" aria-hidden="true">{pin}</span>
                  <dt>{label}</dt>
                  <dd>{value} <small>{note}</small></dd>
                </div>
              ))}
            </SpecTable>
            <Actions>
              <PrimaryAction href="#projects">
                Explore the projects
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 10h14m-6-6 6 6-6 6" /></svg>
              </PrimaryAction>
              <GhostAction href="https://github.com/le-lel190" target="_blank" rel="noopener noreferrer">github.com/le-lel190 ↗</GhostAction>
            </Actions>
          </Introduction>
          <Console>
            <ConsoleBar>
              <span className="ref" aria-hidden="true">U1</span>
              <span>tty console</span>
              <span>visitor@lel190</span>
            </ConsoleBar>
            <ConsoleBody>
              <TerminalOutput ref={outputRef} role="region" aria-label="Terminal output" tabIndex="0">
                <TerminalGreeting>
                  <PixelWordmark>lel190_</PixelWordmark>
                  take a look around.<br />
                  <span>A little shell for this homepage. Try a command below.</span>
                </TerminalGreeting>
                {visibleBootLines.map((line, i) => <TerminalLine key={`boot-${i}`}>{line}</TerminalLine>)}
                <div role="log" aria-label="Command responses" aria-live="polite" aria-relevant="additions">
                  {history.map(entry => <TerminalLine key={entry.id} $isCommand={entry.type === 'command'} $isResponse={entry.type === 'response'} $isError={entry.type === 'error'}>{entry.content}</TerminalLine>)}
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
              <ConsoleFoot>
                {phase === 'interactive' ? (
                  <ChipRow aria-label="Quick commands">
                    {['whoami', 'projects', 'skills', 'contact'].map(command => (
                      <Chip key={command} type="button" onClick={() => runChip(command)}>{command}</Chip>
                    ))}
                  </ChipRow>
                ) : <span>loading profile</span>}
                <span>no login required</span>
              </ConsoleFoot>
            </ConsoleBody>
          </Console>
        </HeroGrid>
        <BoardEdge>
          <p><span>web services</span><span>reverse engineering</span><span>CTF</span><span>rhythm games</span></p>
          <LainDataStream />
        </BoardEdge>
      </Sheet>
    </HeroContainer>
  );
};

export default Hero;

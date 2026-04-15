# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the portfolio site with a cyberpunk/hacker aesthetic — terminal hero boot sequence, green accent palette, monospace typography, streamlined 4-section layout.

**Architecture:** Reskin existing React + styled-components app. Replace About.js content into Hero.js boot sequence. Restyle all components with new theme colors, fonts, and animations. No new dependencies beyond Google Fonts link tags.

**Tech Stack:** React 18, styled-components 6, Google Fonts (JetBrains Mono, Outfit), Font Awesome (existing)

---

## File Map

- **Modify:** `public/index.html` — swap Google Fonts link to JetBrains Mono + Outfit
- **Modify:** `src/App.js` — new theme objects (dark/light), updated GlobalStyle, remove About import, move theme toggle into Header
- **Modify:** `src/index.css` — new scrollbar colors, remove construction animations, update base styles
- **Modify:** `src/components/Header.js` — monospace logo with cursor, green nav links, theme toggle button in nav
- **Rewrite:** `src/components/Hero.js` — terminal boot sequence with typing animation, absorb About content
- **Modify:** `src/components/Projects.js` — terminal-style header, green glow cards, restyled tags/badges
- **Modify:** `src/components/Skills.js` — terminal output style, tag chips, comment-style category headers
- **Modify:** `src/components/Footer.js` — contact section with centered links, hover glow
- **Delete:** `src/components/About.js` — content absorbed into Hero
- **Modify:** `src/components/Projects.test.js` — update theme object to match new palette

---

### Task 1: Update Google Fonts and Base Styles

**Files:**
- Modify: `public/index.html`
- Modify: `src/index.css`

- [ ] **Step 1: Replace Google Fonts link in index.html**

In `public/index.html`, replace the Inter font link:

```html
<!-- Remove -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Add -->
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Rewrite src/index.css**

Replace entire contents of `src/index.css` with:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
}

code {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb {
  background: #00ff41;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #00cc33;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInFromBottom {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

- [ ] **Step 3: Verify no build errors**

Run: `cd /home/wlcheung2/le-lel190 && npm run build 2>&1 | tail -5`
Expected: "Compiled successfully."

- [ ] **Step 4: Commit**

```bash
git add public/index.html src/index.css
git commit -m "feat: update fonts to JetBrains Mono + Outfit, restyle base CSS"
```

---

### Task 2: Update Theme Objects and GlobalStyle in App.js

**Files:**
- Modify: `src/App.js`

- [ ] **Step 1: Replace theme objects and GlobalStyle**

Replace the `lightTheme` and `darkTheme` objects in `src/App.js`:

```js
const darkTheme = {
  background: '#0a0a0a',
  secondaryBackground: '#111111',
  text: '#e0e0e0',
  secondaryText: '#888888',
  accent: '#00ff41',
  accentCyan: '#00d4ff',
  warning: '#ffb800',
  border: '#1a1a1a',
  glowBorder: 'rgba(0, 255, 65, 0.2)',
  fontMono: "'JetBrains Mono', 'Courier New', monospace",
  fontBody: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
};

const lightTheme = {
  background: '#f0ede6',
  secondaryBackground: '#e8e4dc',
  text: '#1a1a1a',
  secondaryText: '#555555',
  accent: '#00ff41',
  accentCyan: '#00889a',
  warning: '#cc9200',
  border: '#d4d0c8',
  glowBorder: 'rgba(0, 255, 65, 0.15)',
  fontMono: "'JetBrains Mono', 'Courier New', monospace",
  fontBody: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
};
```

- [ ] **Step 2: Update GlobalStyle**

Replace the `GlobalStyle` in `src/App.js`:

```js
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-family: ${props => props.theme.fontBody};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: ${props => props.theme.accent};
    color: ${props => props.theme.background};
  }
`;
```

- [ ] **Step 3: Remove About import, remove ThemeToggle, pass toggleTheme to Header**

Remove the `import About` line. Remove the `ThemeToggle` styled component entirely. Update the `App` function to pass `toggleTheme` and `currentTheme` to Header:

```js
import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Hero from './components/Hero';

// ... GlobalStyle, themes, AppContainer, Main as before ...

function App() {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Hero />
        <Header toggleTheme={toggleTheme} isLight={theme === lightTheme} />
        <Main>
          <Projects />
          <Skills />
        </Main>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `cd /home/wlcheung2/le-lel190 && npm run build 2>&1 | tail -5`
Expected: "Compiled successfully." (warnings about unused About.js are OK)

- [ ] **Step 5: Commit**

```bash
git add src/App.js
git commit -m "feat: update themes to cyberpunk palette, remove About, move toggle to Header"
```

---

### Task 3: Restyle Header with Monospace Logo and Theme Toggle

**Files:**
- Modify: `src/components/Header.js`

- [ ] **Step 1: Rewrite Header.js**

Rewrite `src/components/Header.js` with:
- Accept `toggleTheme` and `isLight` props
- Logo styled in JetBrains Mono with a blinking cursor `█` after "lel190"
- Nav links: color from `theme.text`, hover color `theme.accent`, green underline on hover
- Theme toggle as a `[dark]` / `[light]` text button in the nav, monospace, green text
- HeaderContainer: transparent initially, on scroll → `theme.background` with `backdrop-filter: blur(10px)`
- Mobile hamburger: bars colored `theme.accent`
- Mobile nav menu background: `theme.secondaryBackground`

Key styled components:

```js
const Logo = styled.div`
  font-family: ${props => props.theme.fontMono};
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  color: ${props => props.theme.accent};

  .cursor {
    animation: blink 1s step-end infinite;
  }
`;

const NavItem = styled.a`
  margin: 0 15px;
  text-decoration: none;
  color: ${props => props.theme.text};
  font-family: ${props => props.theme.fontMono};
  font-size: 0.85rem;
  font-weight: 400;
  position: relative;
  transition: color 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.accent};
    left: 0;
    bottom: -5px;
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${props => props.theme.accent};
    &:after { width: 100%; }
  }
`;

const ThemeToggleBtn = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.accent};
  font-family: ${props => props.theme.fontMono};
  font-size: 0.8rem;
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.3s ease;
  margin-left: 15px;

  &:hover {
    background: ${props => props.theme.glowBorder};
  }
`;
```

Logo render: `<Logo onClick={scrollToTop}>lel190<span className="cursor">█</span></Logo>`

Theme toggle render: `<ThemeToggleBtn onClick={toggleTheme}>[{isLight ? 'dark' : 'light'}]</ThemeToggleBtn>`

- [ ] **Step 2: Verify build**

Run: `cd /home/wlcheung2/le-lel190 && npm run build 2>&1 | tail -5`
Expected: "Compiled successfully."

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.js
git commit -m "feat: restyle Header with monospace logo, green nav, theme toggle"
```

---

### Task 4: Rewrite Hero with Terminal Boot Sequence

**Files:**
- Rewrite: `src/components/Hero.js`

- [ ] **Step 1: Rewrite Hero.js**

Complete rewrite of `src/components/Hero.js`. Key elements:

**Boot sequence data:**
```js
const bootLines = [
  '[OK] Loading kernel modules...',
  '[OK] Mounting filesystems...',
  '[OK] Starting network services...',
  '[OK] Initializing security protocols...',
  '[OK] Loading user profile...',
  '',
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
```

**State management:**
```js
const [phase, setPhase] = useState('boot'); // 'boot' | 'profile' | 'done'
const [visibleBootLines, setVisibleBootLines] = useState([]);
const [visibleProfileLines, setVisibleProfileLines] = useState([]);
const [skipped, setSkipped] = useState(false);
```

**Animation logic (useEffect):**
- Phase 'boot': add one boot line every 300ms. After all lines shown, wait 500ms, switch to 'profile'.
- Phase 'profile': type one profile line every 200ms. After all lines shown, switch to 'done'.
- If `skipped` is set, immediately show all lines and set phase to 'done'.

**Styled components:**

```js
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

const TerminalLine = styled.div`
  color: ${props => props.$isCommand ? props.theme.accent : props.theme.secondaryText};
  font-size: 0.85rem;
  line-height: 1.8;
  white-space: pre;
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
```

CTA buttons appear after phase === 'done':
```js
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
```

Scroll indicator at bottom (same concept as current, restyled green).

- [ ] **Step 2: Verify build**

Run: `cd /home/wlcheung2/le-lel190 && npm run build 2>&1 | tail -5`
Expected: "Compiled successfully."

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.js
git commit -m "feat: terminal boot sequence hero with typing animation"
```

---

### Task 5: Restyle Projects Section

**Files:**
- Modify: `src/components/Projects.js`

- [ ] **Step 1: Rewrite Projects.js**

Restyle with cyberpunk aesthetic. Key changes:

**Section header as terminal command:**
```js
const SectionHeader = styled.div`
  font-family: ${props => props.theme.fontMono};
  font-size: 1.1rem;
  color: ${props => props.theme.accent};
  margin-bottom: 30px;

  .prompt { color: ${props => props.theme.secondaryText}; }
`;
// Render: <SectionHeader><span className="prompt">&gt; </span>ls ~/projects</SectionHeader>
```

**Project card restyled:**
```js
const ProjectCard = styled.div`
  background-color: ${props => props.theme.secondaryBackground};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: ${props => props.theme.glowBorder};
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.1);
    transform: translateY(-4px);
  }
`;
```

**Tags as terminal badges:**
```js
const Tag = styled.span`
  font-family: ${props => props.theme.fontMono};
  font-size: 0.75rem;
  padding: 3px 8px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 3px;
  color: ${props => props.theme.accentCyan};
  margin-right: 6px;
  margin-bottom: 6px;
`;
```

**WIP badge restyled:**
```js
const WipBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  font-family: ${props => props.theme.fontMono};
  font-size: 0.7rem;
  font-weight: 700;
  color: ${props => props.theme.warning};
  border: 1px solid ${props => props.theme.warning};
  padding: 2px 8px;
  border-radius: 3px;
`;
// Render: <WipBadge>[WIP]</WipBadge>
```

Remove all construction-themed animations (moveStripes, blink, floatDust, DustParticles, ComingSoonOverlay). Keep progress bar but with green fill. Remove `under-construction` class from section.

Button styled with monospace font, green border, hover glow.

Grid: `grid-template-columns: repeat(auto-fill, minmax(340px, 1fr))` for 2-col desktop.

- [ ] **Step 2: Update Projects.test.js theme object**

Update the theme object in `src/components/Projects.test.js`:

```js
const theme = {
  background: '#0a0a0a',
  secondaryBackground: '#111111',
  text: '#e0e0e0',
  secondaryText: '#888888',
  accent: '#00ff41',
  accentCyan: '#00d4ff',
  warning: '#ffb800',
  border: '#1a1a1a',
  glowBorder: 'rgba(0, 255, 65, 0.2)',
  fontMono: "'JetBrains Mono', 'Courier New', monospace",
  fontBody: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
};
```

- [ ] **Step 3: Run tests**

Run: `cd /home/wlcheung2/le-lel190 && npx react-scripts test --watchAll=false 2>&1 | tail -10`
Expected: All tests pass.

- [ ] **Step 4: Verify build**

Run: `cd /home/wlcheung2/le-lel190 && npm run build 2>&1 | tail -5`
Expected: "Compiled successfully."

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.js src/components/Projects.test.js
git commit -m "feat: restyle Projects with cyberpunk cards and terminal header"
```

---

### Task 6: Restyle Skills Section

**Files:**
- Modify: `src/components/Skills.js`

- [ ] **Step 1: Rewrite Skills.js**

Terminal-style skills display:

**Section header:**
```js
const SectionHeader = styled.div`
  font-family: ${props => props.theme.fontMono};
  font-size: 1.1rem;
  color: ${props => props.theme.accent};
  margin-bottom: 30px;

  .prompt { color: ${props => props.theme.secondaryText}; }
`;
// Render: <SectionHeader><span className="prompt">&gt; </span>cat skills.txt</SectionHeader>
```

**Terminal output container:**
```js
const TerminalBlock = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 30px;
`;
```

**Category headers as comments:**
```js
const CategoryHeader = styled.h3`
  font-family: ${props => props.theme.fontMono};
  font-size: 0.85rem;
  color: ${props => props.theme.secondaryText};
  margin-bottom: 12px;
  margin-top: ${props => props.$first ? '0' : '24px'};

  &::before { content: '# '; color: ${props => props.theme.accent}; }
`;
```

**Skill chips:**
```js
const SkillChip = styled.span`
  display: inline-block;
  font-family: ${props => props.theme.fontMono};
  font-size: 0.8rem;
  padding: 4px 12px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 3px;
  color: ${props => props.theme.text};
  margin-right: 8px;
  margin-bottom: 8px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    color: ${props => props.theme.accent};
    box-shadow: 0 0 10px ${props => props.theme.glowBorder};
  }
`;
```

Section padding: `padding: 80px 0`. Same skills data.

- [ ] **Step 2: Verify build**

Run: `cd /home/wlcheung2/le-lel190 && npm run build 2>&1 | tail -5`
Expected: "Compiled successfully."

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.js
git commit -m "feat: restyle Skills as terminal output with chip tags"
```

---

### Task 7: Restyle Footer as Contact Section

**Files:**
- Modify: `src/components/Footer.js`

- [ ] **Step 1: Rewrite Footer.js**

Minimal centered contact section:

**Section header:**
```js
const SectionHeader = styled.div`
  font-family: ${props => props.theme.fontMono};
  font-size: 1.1rem;
  color: ${props => props.theme.accent};
  margin-bottom: 30px;
  text-align: center;

  .prompt { color: ${props => props.theme.secondaryText}; }
`;
// Render: <SectionHeader><span className="prompt">&gt; </span>./contact.sh</SectionHeader>
```

**Contact links row:**
```js
const ContactLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.text};
  text-decoration: none;
  font-family: ${props => props.theme.fontMono};
  font-size: 0.9rem;
  padding: 10px 20px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.accent};
    border-color: ${props => props.theme.accent};
    box-shadow: 0 0 15px ${props => props.theme.glowBorder};
    transform: translateY(-2px);
  }

  i { font-size: 1.1rem; }
`;
```

**Copyright:**
```js
const Copyright = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.secondaryText};
  font-family: ${props => props.theme.fontMono};
  font-size: 0.75rem;
`;
```

Footer container: centered, `padding: 80px 0 30px`, `background: ${theme.background}`.

Links: GitHub (fab fa-github), LinkedIn (fab fa-linkedin), Linktree (fas fa-link).

- [ ] **Step 2: Verify build**

Run: `cd /home/wlcheung2/le-lel190 && npm run build 2>&1 | tail -5`
Expected: "Compiled successfully."

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.js
git commit -m "feat: restyle Footer as minimal contact section with hover glow"
```

---

### Task 8: Delete About.js and Final Verification

**Files:**
- Delete: `src/components/About.js`

- [ ] **Step 1: Delete About.js**

```bash
rm src/components/About.js
```

- [ ] **Step 2: Run tests**

Run: `cd /home/wlcheung2/le-lel190 && npx react-scripts test --watchAll=false 2>&1 | tail -10`
Expected: All tests pass.

- [ ] **Step 3: Run full build**

Run: `cd /home/wlcheung2/le-lel190 && npm run build 2>&1 | tail -5`
Expected: "Compiled successfully."

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: remove About.js, complete portfolio redesign"
```

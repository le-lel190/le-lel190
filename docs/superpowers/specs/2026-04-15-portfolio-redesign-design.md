# Portfolio Redesign — Cyberpunk/Hacker Aesthetic

## Direction
Cyberpunk/Hacker aesthetic tempered with Minimal Dark restraint. Dark base, terminal-inspired UI, monospace typography accents, subtle scanlines and glow effects. Professional enough for recruiters, memorable enough to stand out.

## Color Palette
- Background: `#0a0a0a` (primary), `#111111` (secondary/cards)
- Text: `#e0e0e0` (primary), `#888888` (secondary)
- Primary accent: `#00ff41` (terminal green)
- Secondary accent: `#00d4ff` (cyan, links/interactive)
- Warning/WIP: `#ffb800` (amber)
- Borders: `#1a1a1a` (subtle), `#00ff41` at 20% opacity (glow)
- Light theme: `#f0ede6` bg, dark text, green accents preserved

## Typography
- Display/terminal: JetBrains Mono (Google Fonts)
- Body: Outfit (Google Fonts)
- Terminal elements use monospace exclusively
- Body text uses Outfit for readability

## Page Structure
Four sections, streamlined from the current six:

### 1. Terminal Hero (Cinematic Boot)
- Full viewport, dark CRT-style screen
- Boot sequence animation (~5-6s):
  1. BIOS-style system lines scroll fast (~2s)
  2. Resolves into profile output block:
     ```
     root@anson:~$ cat /etc/profile
     ─────────────────────────────
     Name:     Anson Cheung
     Handle:   lel190
     Role:     CS Student @ CUHK
     Interests: Cybersecurity, CTF, Reverse Engineering
     Status:   Building things...
     ─────────────────────────────
     root@anson:~$ █
     ```
  3. Avatar fades in beside terminal (desktop) or below (mobile)
  4. Two CTA buttons appear: `[About Projects]` `[View GitHub]`
  5. Blinking cursor, scroll indicator at bottom
- Skip button (small, bottom-right) for repeat visitors
- Implemented with CSS animations + small JS typing effect
- Absorbs current About section content (name, role, university, interests)

### 2. Projects
- Section header: `> ls ~/projects`
- Dark cards with green border glow on hover
- Each card: title, description, tech tags as terminal badges `[React]` `[Node.js]`, "View Project →" link
- WIP card: amber `[WIP]` badge, green progress bar, no animated stripes
- 2-column grid (desktop), 1-column (mobile)
- Same project data as current

### 3. Skills
- Section header: `> cat skills.txt`
- Terminal output block, monospace
- Skills as tag/chip elements with subtle borders, flow layout
- Categories as comment headers: `# Languages`, `# Web Development`, `# Tools`
- Fade-in on scroll
- Same skills data as current

### 4. Contact / Footer
- Section header: `> ./contact.sh`
- Centered row of links: GitHub, LinkedIn, Linktree with icons and hover glow
- Small copyright line
- Minimal, no multi-column grid

## Navigation
- Fixed header, transparent until scroll, then dark + blur
- Logo: `lel190` in monospace with blinking cursor
- Nav links: green underline on hover
- Mobile hamburger restyled to match
- Theme toggle in nav as `[dark]` / `[light]` text button (replaces floating circle)

## Light Theme
- Background: `#f0ede6`, text: dark, green accents stay
- Terminal elements: dark text on light bg with green highlights
- Same layout and structure

## Technical Constraints
- React 18 + styled-components (no new dependencies except Google Fonts via link tag)
- Same component file structure: Hero.js, Header.js, Projects.js, Skills.js, Footer.js, App.js
- About.js removed (content absorbed into Hero)
- Responsive breakpoints preserved
- Smooth scroll navigation preserved
- `NODE_OPTIONS=--openssl-legacy-provider` preserved in scripts

## Animations
- Hero boot sequence: CSS keyframes + JS typing effect
- Section headers: fade-in on scroll (CSS or Intersection Observer)
- Card hover: green border glow, slight translateY
- Nav links: underline width transition
- Blinking cursor: CSS keyframe
- Skip button: fade in after 1s delay
- Scanline overlay on hero: CSS repeating-linear-gradient, subtle opacity

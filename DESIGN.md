---
name: lel190 Console
description: A dark phosphor console portfolio for Anson Cheung — the visitor operates the site, not just reads it.
colors:
  phosphor-ground: "#050605"
  phosphor-surface: "#0a0c09"
  phosphor-panel: "#0e110d"
  phosphor-raised: "#12150f"
  hairline: "#1e241b"
  hairline-strong: "#2a3326"
  terminal-ink: "#d6d8d2"
  terminal-ink-dim: "#98a090"
  terminal-ink-muted: "#6b7365"
  signal-green: "#33ff66"
  signal-green-dim: "#1f7a3d"
  signal-danger: "#ff3b30"
  signal-warning: "#ffd60a"
  signal-info: "#5bc8fa"
typography:
  display:
    fontFamily: "Outfit, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.18rem"
    fontWeight: 650
    lineHeight: 1.3
    letterSpacing: "-0.012em"
  body:
    fontFamily: "Outfit, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.925rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.79rem"
    fontWeight: 400
    letterSpacing: "0"
rounded:
  sm: "4px"
  md: "6px"
  lg: "10px"
  xl: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "28px"
components:
  button-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.phosphor-ground}"
    rounded: "{rounded.md}"
    padding: "9px 17px"
  button-primary-hover:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.phosphor-ground}"
    rounded: "{rounded.md}"
    padding: "9px 17px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.signal-green}"
    rounded: "{rounded.md}"
    padding: "9px 17px"
  chip:
    backgroundColor: "{colors.phosphor-surface}"
    textColor: "{colors.terminal-ink}"
    rounded: "{rounded.sm}"
    padding: "5px 12px"
  card:
    backgroundColor: "{colors.phosphor-surface}"
    textColor: "{colors.terminal-ink}"
    rounded: "{rounded.xl}"
    padding: "24px 22px 20px"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.terminal-ink-dim}"
    rounded: "{rounded.sm}"
    padding: "7px 11px"
---

# Design System: lel190 Console

## Overview

**Creative North Star: "The Operator's Console"**

The portfolio is a console, not a page. The visitor operates it: the interactive CLI hero is the front door, and every section below is a panel of that same system. The terminal is not a decoration bolted onto a website — it is the product, and the rest of the page behaves like its coherent output. This world deliberately refuses the decorated-portfolio default: no Persona 5 confetti, no floating geometric shapes, no glow-everything. Restraint is the upgrade.

The palette is a phosphor CRT in a dark room: a near-black green-tinted ground, one signal green that carries every interactive promise, and hairline borders that define panels without shouting. Depth comes from layered surfaces and a single soft ambient shadow, never colored halos. Motion is sparse and purposeful — one authored entrance for the terminal, gentle reveals elsewhere — because the terminal's boot sequence is the only performance that should feel alive.

**Key Characteristics:**
- One accent color (terminal green) carries all interactive signal; red is reserved for the live cursor and danger states, yellow for the single WIP marker.
- Hairline borders and layered panels instead of heavy cards or glow.
- JetBrains Mono is the system voice; Outfit is the display/body voice.
- The terminal boot sequence is the signature interaction; everything else recedes.
- Dark-only, by product commitment.

## Colors

The palette is a phosphor CRT: a green-tinted near-black ground with a single saturated green accent. Secondary and tertiary accents exist only as rare state markers, not as decoration.

### Primary
- **Signal Green** (`#33ff66`): The one interactive accent. Prompts, the live cursor, primary buttons, focus rings, hover states, the header logo. Its rarity is the point — it appears where the visitor can act.

### Secondary
- **Signal Danger** (`#ff3b30`): Reserved for destructive/attention states and the terminal window's red traffic-light dot. Never decorative.

### Tertiary
- **Signal Warning** (`#ffd60a`): Used only for the single WIP badge and its progress bar. Yellow is precious.

### Neutral
- **Phosphor Ground** (`#050605`): Page background. A green-tinted near-black, not pure black.
- **Phosphor Surface** (`#0a0c09`): Card and chip background, one step off the ground.
- **Phosphor Panel** (`#0e110d`): Terminal window and terminal block background.
- **Phosphor Raised** (`#12150f`): Mobile drawer and raised surfaces.
- **Hairline** (`#1e241b`): Borders, dividers, section rules.
- **Hairline Strong** (`#2a3326`): Panel borders and emphasized hairlines.
- **Terminal Ink** (`#d6d8d2`): Primary text. Warm-neutral, not pure white.
- **Terminal Ink Dim** (`#98a090`): Secondary text, descriptions.
- **Terminal Ink Muted** (`#6b7365`): Tertiary text, captions, indices.

### Named Rules
**The One Voice Rule.** Signal green is used on a minority of any given screen. Its rarity is what makes it mean "you can act here."

**The Hairline Rule.** Panels are separated by 1px hairlines, never by thick borders or colored glow. If two surfaces meet, a hairline is enough.

## Typography

**Display/Body Font:** Outfit (with -apple-system, BlinkMacSystemFont, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo, monospace)

**Character:** Outfit is the calm, geometric humanist voice for readable content; JetBrains Mono is the system voice for everything the visitor "operates" — prompts, commands, indices, tags, labels. The pairing reads as a terminal with a comfortable body.

### Hierarchy
- **Display / Title** (650, 1.18rem, 1.3, -0.012em): Project card titles. Headings are modest — the terminal is the loudest thing on the page.
- **Body** (400, 0.925rem, 1.65): Project descriptions, contact intro. Max ~65ch.
- **Label / Mono** (400, 0.79rem): Buttons, tags, chips, nav items, section headers, indices, copyright. The system voice for interactive chrome.

### Named Rules
**The Mono-Chrome Rule.** Interactive and system chrome speaks in JetBrains Mono; readable prose speaks in Outfit. Don't set body copy in mono.

## Layout

A single centered column, max-width 1080px for content (1240px for the header), with generous vertical rhythm. Sections stack with 88px vertical padding and are separated by 1px top hairlines. Each section header is a mono prompt line (`> ls ~/projects`) followed by a short gradient hairline rule that fades to transparent — the only decorative gradient in the system.

The project grid is 3 columns at desktop, collapsing to 2 at ≤980px and 1 at ≤680px. The skills terminal block is a single panel. The footer centers contact links and ends with a status line.

Spacing rhythm: tight groups (8–16px between related items), generous separation (40–56px between a header and its content). More space above a heading than below it.

## Elevation & Depth

Depth is tonal layering plus a single ambient shadow — never colored glow, never hard offset shadows. The ground is darkest; surfaces step up one or two tones; the terminal window and terminal block carry the one real shadow.

### Shadow Vocabulary
- **Ambient Panel** (`0 1px 0 rgba(214,216,210,0.035), 0 12px 40px rgba(0,0,0,0.5)`): The terminal window and skills terminal block. A soft, wide, low-opacity drop that lifts the panel off the ground.

Everything else is flat at rest. Cards lift on hover via a 1px border-color shift and a 3px translateY, not a shadow.

## Shapes

Radius language is a quiet scale: 4px for small chips and badges, 6px for buttons, 10px for the terminal window and terminal block, 12px for cards. No pill-shaped controls except the 4px progress bar (99px radius). Borders are 1px hairlines throughout. The only clipped geometry is the terminal window's hairline top accent (a 1px gradient line, not a shape).

## Components

### Buttons
- **Shape:** 6px radius, 1px border.
- **Primary:** Signal green fill, phosphor-ground text, 9px 17px padding. Hover keeps the fill and shifts the border to full green.
- **Ghost:** Transparent fill, signal-green text, signal-green hairline border. Hover adds a faint green wash (`rgba(51,255,102,0.06)`) and full-green border.
- **Interaction:** 0.18s ease transitions; a subtle arrow translate on project-button hover.

### Chips
- **Style:** Phosphor-surface background, terminal-ink text, 1px hairline-strong border, 5px radius, 5px 12px padding.
- **Hover:** Border shifts to signal-green line, text shifts to signal green.

### Cards / Containers
- **Corner Style:** 12px radius.
- **Background:** Phosphor surface.
- **Border:** 1px hairline; hover shifts to hairline-strong.
- **Shadow Strategy:** Flat at rest; no shadow. Hover lifts 3px and shifts the border.
- **Internal Padding:** 24px 22px 20px.

### Terminal Window (signature component)
- **Corner Style:** 10px radius.
- **Background:** Phosphor panel with the ambient panel shadow.
- **Border:** 1px hairline-strong.
- **Header:** Three traffic-light dots (red/orange/green) plus a right-aligned uppercase mono title (`LEL190 — SECURE SHELL`).
- **Behavior:** Boot sequence types out `[ OK ]` lines, then reveals the interactive prompt (`visitor@lel190:~$`) and two buttons. Clicking anywhere focuses the input. A skip-intro button and scroll indicator appear on the sides.

### Navigation
- **Style:** Fixed header, transparent at top, blurred phosphor-ground (`rgba(5,6,5,0.86)` + 12px blur) once scrolled.
- **Typography:** JetBrains Mono 0.82rem, terminal-ink-dim at rest, terminal-ink on hover with a faint green wash.
- **Hover:** A `$ ` prefix fades in before each item.
- **Mobile:** A 240px right drawer with a hamburger toggle; items stack vertically.

## Do's and Don'ts

### Do:
- **Do** use signal green sparingly — only where the visitor can act.
- **Do** separate panels with 1px hairlines, not thick borders or glow.
- **Do** set interactive chrome in JetBrains Mono and prose in Outfit.
- **Do** keep the terminal the loudest element on the page; let sections recede.
- **Do** use the single ambient shadow for the terminal window and skills block, and keep cards flat.

### Don't:
- **Don't** reintroduce floating shapes, diagonal stripes, scanlines, or particle bursts — the Persona 5 confetti is gone.
- **Don't** use colored glow shadows or hard offset (neobrutalist) shadows.
- **Don't** add a light mode — the product is dark-only by commitment.
- **Don't** set body copy in monospace.
- **Don't** scatter hover animations across every element; the boot sequence is the one performance.
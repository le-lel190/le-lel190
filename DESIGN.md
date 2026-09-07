---
name: lel190 Personal Workstation
description: A retro workstation portfolio with anime and old-web personality in the margins.
colors:
  background: "#101211"
  surface: "#171b18"
  panel: "#0c100d"
  panel-raised: "#232923"
  border: "#303930"
  border-strong: "#4a5748"
  text: "#e7e6d9"
  text-dim: "#afb8a9"
  text-muted: "#929f8d"
  accent: "#b9d883"
  accent-faint: "rgba(185, 216, 131, 0.07)"
  warning: "#edbd79"
  info: "#b0c2ba"
typography:
  display:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "clamp(3.5rem, 6.7vw, 5.7rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "clamp(1.9rem, 3vw, 2.4rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.75
  wordmark:
    fontFamily: "lel190 Pixel, JetBrains Mono, ui-monospace, monospace"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
rounded:
  square: "0px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "24px"
  xl: "32px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background}"
    padding: "10px 19px"
    rounded: "{rounded.square}"
  button-primary-hover:
    backgroundColor: "{colors.text}"
    textColor: "{colors.background}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    padding: "10px 0"
  terminal-input:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    padding: "2px"
  project-body:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    padding: "25px 26px"
  interest-sticker:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.accent}"
    padding: "4px 9px"
---

# Design System: lel190 Personal Workstation

## Overview

**Creative North Star: "The Personal Workstation"**

A dark, human-operated workspace rather than a fictional security console. Angular headings and terminal chrome establish the retro technical character; the owner's avatar, casual copy, and small old-web interest stickers supply personality. This is a portfolio with personal details, not an immersive operating-system simulation.

**Key Characteristics:** readable identity, square utilitarian surfaces, warm phosphor colors, a real optional shell, native navigation, restrained motion.

## Colors

Sage phosphor is the primary interactive signal. Amber distinguishes mail-project material and WIP details; the pale gray-green info color is a tertiary sticker accent. Warm text and green-tinted charcoal surfaces avoid harsh pure-white/pure-black contrast.

**The Signal Rule.** Use the accent for links, the main action, and terminal prompts. Decorative material may use amber, but must not imply fabricated live status.

## Typography

Chakra Petch is the angular display voice. JetBrains Mono carries commands, navigation, labels, and technical data. System sans carries readable descriptions. The terminal's single-line `lel190_` wordmark uses a locally hosted Silkscreen subset (`src/assets/lel190-pixel.ttf`, OFL license alongside it), not multi-line ASCII. It is 1.75rem with 0.08em letter spacing; the subset is only for this wordmark.

The display name uses the large responsive role; section headings are around 2rem, project titles 1.4rem, and prose 0.85–1rem. Technical labels are smaller. Existing decorative metadata ranges around 0.61–0.7rem; this is not a body-copy scale. Terminal input becomes 16px on narrow screens to avoid mobile zoom.

## Layout

Content uses a centered 1160px container with 32px side padding, reduced to 20px at 600px. The header is sticky, 72px tall (64px on narrow screens). Native section anchors reserve 88px of scroll margin.

The hero pairs identity and shell with a 64px gap, reduced to 32px below 980px; it stacks at 780px. Projects use two columns with a 24px gap and stack at 720px. The toolbox and personal corner also stack at 720px. The WIP item is a separate horizontal row, not a third full project card. Section separation is generous; related labels and controls stay close.

## Elevation & Depth

Depth comes from charcoal surface changes and single-pixel rules. The hero alone has a static anime bedroom wallpaper by Kyuririn, locally stored as `public/images/hero-bedroom.webp` with provenance in `public/images/CREDITS.md`. A dark directional fade protects the identity text; the terminal and its small labels stay opaque. Mobile uses a separate crop and stronger text-side fade. The image ends at the hero—projects and other sections retain their plain backgrounds. There is no autoplay, parallax, particle layer, or added animation.

## Shapes

Square corners and thin utilitarian borders define windows, controls, diagrams, and stickers. No pill-shaped skill chips. The page starts with a narrow sage rule; the terminal header is a lighter solid panel.

## Components

- **Primary action:** sage fill, dark ink, at least 44px tall; hover changes to warm ink fill. Secondary actions are text links.
- **Navigation:** inline native anchors on all screen sizes, with a colored underline on hover. No mobile drawer or click-only navigation.
- **Terminal:** labeled header, 249px scrollable output, and a separate input row. Long history scrolls internally; it does not resize the page. The command response log is announced politely.
- **Boot and motion:** three short boot lines at 220ms intervals, a skip button, and one 600ms translate entrance. Identity and links remain visible throughout. Reduced motion removes the delay, entrance, and smooth scrolling. Automatic boot never steals focus.
- **Projects:** an architecture panel above the description, plain technology labels, and a descriptive external link. Diagrams describe supplied architecture; they are not screenshots or live telemetry.
- **Personal corner:** an existing avatar, personal prose, and three small interest stickers. Do not add claims about specific anime favorites or hardware without user input.
- **Focus:** a visible sage outline with 5px offset; the terminal input row also gains a faint sage background.
- **Browser surfaces:** dark color scheme, sage selection and caret, themed thin scrollbars. Content is visible by default, without scroll-reveal gates.

## Do's and Don'ts

- **Do** keep name, background, and projects understandable without using the terminal.
- **Do** preserve native keyboard navigation, reduced motion, touch usability, and real project URLs.
- **Do** centralize theme values in `src/App.js` and check the baseline in `src/index.css`.
- **Don't** replace personal content with invented system alerts, fake metrics, or remote-server claims.
- **Don't** turn the anime references into a fandom landing page or add a mandatory intro.
- **Don't** bring back particle systems or a custom cursor as a default embellishment.

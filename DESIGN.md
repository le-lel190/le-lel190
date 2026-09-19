---
name: lel190 Personal Workstation
description: A retro workstation portfolio with anime and old-web personality in the margins.
colors:
  background: "#101211"
  surface: "#171b18"
  panel: "#0c100d"
  panel-raised: "#232923"
  reading-surface: "rgba(16, 18, 17, 0.94)"
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
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "clamp(1.9rem, 3.2vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "clamp(1.6rem, 2.8vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.8
  lead:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.75
  note:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.75
  command:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.9
  mobile-input:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "16px"
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
    backgroundColor: "{colors.reading-surface}"
    textColor: "{colors.text}"
    padding: "32px"
  interest-sticker:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.accent}"
    padding: "4px 8px"
---

# Design System: lel190 Personal Workstation

## Overview

**Creative North Star: "The Personal Workstation"**

A personal portfolio with the atmosphere of a working desk. Angular headings, a real optional terminal, and square reading surfaces establish the technical character. A continuous Lain backdrop, the owner's avatar, and personal writing connect the whole page. The projects lead; anime and old-web details stay recognizable around them.

**Key Characteristics:** full-name identity, readable work, continuous artwork, square utilitarian surfaces, warm phosphor colors, an optional shell, native navigation, restrained motion.

## Colors

Sage phosphor is the primary interactive signal. Amber distinguishes mail-project material and WIP details; the pale gray-green info color is a tertiary sticker accent. Warm text and green-tinted charcoal surfaces avoid harsh pure-white/pure-black contrast.

**The Signal Rule.** Use the accent for links, the main action, and terminal prompts. Decorative material may use amber, but must not imply fabricated live status.

## Typography

Chakra Petch is the angular display voice. JetBrains Mono carries commands, navigation, labels, and technical data. System sans carries readable descriptions. The terminal's single-line `lel190_` wordmark uses a locally hosted Silkscreen subset (`src/assets/lel190-pixel.ttf`, OFL license alongside it), not multi-line ASCII. It is 1.75rem with 0.08em letter spacing; the subset is only for this wordmark.

The full name uses the large responsive role; project, toolbox, and contact section headings share `theme.sectionTitle`. Body prose is 0.95rem with a 1.8 line height, and the hero lead is 1.05rem. Technical labels use 0.75rem; navigation, commands, and skill values use 0.8rem. The 0.9rem handle and 1.8rem personal heading are local identity roles. The header wordmark uses 1.1rem, reduced to 0.95rem at the narrowest breakpoint. Terminal input becomes 16px on narrow screens to avoid mobile zoom. Useful information never shrinks below 0.75rem.

## Layout

Content uses a 1160px container with 32px side padding, reduced to 20px at 600px. Above 1160px it sits slightly left of center: the left margin is `max(0px, (viewport - 1320px) / 2)`, reserving a wider artwork margin on the right. Header, main, and footer align to the same grid. The sticky header is 72px tall (64px on narrow screens); section anchors reserve 96px.

The hero pairs identity and shell with a 56px gap, reduced to 32px below 980px, and stacks at 780px. Each project is a wide row with description left and a distinct visual right; rows stack internally at 720px. The toolbox and personal corner also stack at 720px. A separate WIP row describes the Unity experiment without an arbitrary completion percentage. The story reads: name and interests, shipped work, tools and the human, contact.

## Elevation & Depth

Depth comes from charcoal surfaces and single-pixel rules. The existing `src/assets/lain_bg.webp` artwork lives in a fixed viewport-sized layer in `App.js`, behind the entire page. It scales to the viewport height and is centered horizontally and vertically on desktop and mobile. It never stretches to the document's height, tiles, drifts, or uses parallax. A horizontal dark gradient protects the complete reading column and opens toward the outer right margin. Mobile uses a more subdued treatment.

Project rows, the header, and footer use the almost-opaque reading surface; terminal and personal content have solid surfaces. The sparse data stream remains local to the hero. The fixed artwork and scrolling content are separate layers, so scrolling to the footer never removes the artwork.

## Shapes

Square corners and thin utilitarian borders define windows, controls, diagrams, and stickers. No pill-shaped skill chips. The page starts with a narrow sage rule; the terminal header is a lighter solid panel.

## Components

- **Primary action:** sage fill, dark ink, at least 44px tall; hover changes to warm ink fill. Secondary actions are text links.
- **Navigation:** inline native anchors on all screen sizes, with a colored underline on hover. No mobile drawer or click-only navigation.
- **Terminal:** labeled header, 249px scrollable output, and a separate input row. Long history scrolls internally; it does not resize the page. The command response log is announced politely.
- **Boot and motion:** three short boot lines at 220ms intervals, a skip button, and one 600ms translate entrance. Identity and links remain visible throughout. Reduced motion removes the delay, entrance, and smooth scrolling. Automatic boot never steals focus.
- **Hero data stream:** sparse decorative glyphs and packets at 30% canvas opacity, capped at 30fps with a 1.5× device-pixel-ratio ceiling. Stops offscreen and in hidden tabs. Pause/resume preserves the current streams and stays paused across viewport changes. Reduced motion paints a still frame and hides the pause control; unsupported canvas also omits the control. Canvas and artwork are hidden from assistive technology.
- **Projects:** full-width work rows with readable descriptions and descriptive domain links. The gateway has a conceptual routing diagram. Temporary mail has a real screenshot of its public empty-inbox interface, captured without message contents. Neither visual implies live telemetry.
- **Toolbox:** four plain rows share `src/data/profile.js` with terminal skill output so the two views stay consistent.
- **Personal corner:** the existing avatar, anime/rhythm-game interests, and the supplied osu!mania achievement. The Cheat Engine origin story appears in the introduction. Preserve informal personality without inventing claims.
- **Focus:** a visible sage outline with 5px offset; the terminal input row also gains a faint sage background.
- **Browser surfaces:** dark color scheme, sage selection and caret, themed thin scrollbars. Content is visible by default, without scroll-reveal gates.

## Do's and Don'ts

- **Do** keep name, background, and projects understandable without using the terminal.
- **Do** preserve native keyboard navigation, reduced motion, touch usability, and real project URLs.
- **Do** centralize theme values in `src/App.js` and check the baseline in `src/index.css`.
- **Don't** replace personal content with invented system alerts, fake metrics, or remote-server claims.
- **Don't** turn the anime references into a fandom landing page or add a mandatory intro.
- **Don't** bring back particle systems or a custom cursor as a default embellishment.

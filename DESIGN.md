---
name: lel190 Component Datasheet
description: A portfolio laid out as an engineering datasheet on a black solder mask board.
colors:
  background: "#0b0e0d"
  surface: "#111614"
  panel: "#0d1211"
  panel-raised: "#1a2320"
  border: "#26302c"
  border-strong: "#3d4c46"
  text: "#eceee3"
  text-dim: "#a9b4aa"
  text-muted: "#838f88"
  accent: "#e8c15c"
  accent-dim: "#a8893a"
  accent-faint: "rgba(232, 193, 92, 0.06)"
  accent-line: "rgba(232, 193, 92, 0.32)"
  warning: "#e0a35e"
  info: "#9fb5ad"
typography:
  display:
    fontFamily: "Datasheet Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3.2rem, 8.4vw, 7.2rem)"
    fontWeight: 700
    fontStretch: "78%"
    lineHeight: 0.83
    letterSpacing: "-0.025em"
  section-title:
    fontFamily: "Datasheet Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)"
    fontWeight: 700
    fontStretch: "80%"
    lineHeight: 1.05
  row-title:
    fontFamily: "Datasheet Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.42rem, 2.5vw, 1.95rem)"
    fontWeight: 700
    fontStretch: "82%"
    lineHeight: 1.05
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.75
  lead:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 400
    lineHeight: 1.7
  data:
    fontFamily: "Plex Data, ui-monospace, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Plex Data, ui-monospace, monospace"
    fontSize: "0.64rem"
    fontWeight: 400
    letterSpacing: "0.16em"
  wordmark:
    fontFamily: "lel190 Pixel, Plex Data, monospace"
    fontSize: "1.5rem"
    letterSpacing: "0.08em"
rounded:
  square: "0px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "48px"
  xxl: "72px"
components:
  action-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background}"
    padding: "10px 18px"
  action-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-dim}"
    padding: "3px 9px"
  sheet:
    backgroundColor: "rgba(11, 14, 13, 0.95)"
    border: "1px solid {colors.border-strong}"
---

# Design System: lel190 Component Datasheet

## Overview

**Creative North Star: "The Component Datasheet"**

The page is a single engineering document for one part: `LEL-190`. Headers are sheet metadata, projects are pin rows in a function table, skills are buses on a pinout, contact links are I/O ports. A black solder-mask ground with gold pad accents replaces the previous sage workstation; the shell is the one live circuit on the sheet.

**Key Characteristics:** one bordered sheet, uppercase condensed display type, tabular mono data with dotted/solid leader rules, pin numbers in the margin, gold as the only saturated colour, Lain still in the right margin.

## Colors

Black-green solder mask (`#0b0e0d`) is the ground; every surface is a step up from it, never pure black. Gold (`#e8c15c`) is the signal colour and the only saturated hue: it marks pads, pins, the primary action, live terminal text, and hover states. Amber-orange (`#e0a35e`) covers the mail project and WIP stamps; pale grey-green (`#9fb5ad`) is unused tertiary.

**The Signal Rule.** Gold means "this is a pad, a connection, or an action". It never fills a reading region; body text stays in warm ink on charcoal.

## Typography

Two self-hosted families, no third-party font requests. **Datasheet Grotesk** is Archivo, served from `src/assets/fonts/archivo-*.woff2` (OFL), used at `font-stretch: 78–82%` for every uppercase display voice — name, section headings, project names. **Plex Data** is IBM Plex Mono, served locally (OFL), for all measurement and metadata: sheet headers, table labels, pin numbers, terminal, links, footers. System sans carries only prose.

Display type is uppercase with tight negative tracking and sub-1 line-height; the name is the largest object on the page. Technical labels are 0.64–0.68rem with 0.16em tracking and uppercase; never below 0.64rem. Terminal and data rows are 0.78rem at 1.85 line height so leader lines stay legible.

## Layout

One centred 1200px sheet with 40px side padding (20px below 720px). The page is a stack of sheet regions separated by full-width rules, not floating cards: hero sheet → projects table → toolbox + personal module → contact ports → colophon.

The project table shares one column definition, `--spec-columns: 56px 1fr 2fr 1.4fr`, with pin, function, and visual cells so every row lines up like a real pin table. Below 1100px the table collapses to `44px 1fr` and each visual drops under its description; the pinout stays two-column to 720px.

## Elevation & Depth

No shadows and no blur except a 2px backdrop on the sticky header. Depth comes from three flat steps (ground, sheet, panel), single-pixel rules, and a 2px rule under section heads. The Lain artwork stays a fixed viewport layer in `App.js`, de-saturated and sepia-tinted, opening toward the right margin so the reading column stays legible.

## Shapes

Square everywhere: no radius anywhere in the sheet, including chips, stamps, inputs, and the terminal. Pins are 13px squares drawn as nested borders. Dividers are 1px in `border`, 2px in `border-strong` under section heads.

## Components

- **Sheet header:** part number, chipset, package, document revision on one 10px-padded strip.
- **Revision header (sticky):** `LEL190_` wordmark, name/CUHK/revision metadata, and numbered section links (`01 projects`, `02 about`, `03 contact`) as native anchors.
- **Spec table:** pin, uppercase label, value, and a muted note per row.
- **Terminal:** labelled `U1 tty console` with scanline texture, internally scrolling output, and a prompt row. Below it, quick-command chips (`whoami`, `projects`, `skills`, `contact`) run the same handlers so touch users never need to type.
- **Footprint diagrams:** the gateway is a pad-to-provider chain naming Anthropic, OpenAI, and Gemini / others as example provider slots; the mail project is a framed screenshot. Both are code-drawn and labelled, never live telemetry.
- **Personal module:** labelled `J1 · /home/lel190`, avatar, interests, and stencil tags.
- **Contact ports:** labelled `section 03 / I/O ports`, one row per destination.
- **Motion:** one authored moment — the gold trace under the name draws itself once (1100ms exponential ease-out). Nothing else animates except the hero data stream and the terminal boot.
- **Focus:** 2px gold outline at 4px offset.
- **Browser surfaces:** gold selection with dark ink, solder-mask scrollbars, gold caret in the terminal.

## Do's and Don'ts

- **Do** keep the whole page readable without the terminal.
- **Do** keep facts, URLs, and command names stable; this world changes presentation only.
- **Do** keep every label uppercase mono and every reading region in warm ink.
- **Don't** introduce rounded corners, drop shadows, gradient text, or a second saturated hue.
- **Don't** invent part numbers with implied certifications, specs, or live status.
- **Don't** add a third type family.

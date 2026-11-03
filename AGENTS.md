# AGENTS.md

## Project Overview
React 18 portfolio using Create React App and `styled-components`, deployed to GitHub Pages via `gh-pages`. Dark-only, retro personal-workstation aesthetic: portfolio first, hacker/anime/old-web details in the margins.

## Repository Map
- `src/App.js` — composition, datasheet theme tokens, self-hosted `@font-face` declarations, continuous fixed Lain artwork, global styles, and skip link.
- `src/components/Hero.js` — sheet header, identity spec table, gold trace, and the interactive `U1 tty console` with quick-command chips. History scrolls inside a bounded output region. Boot never gates portfolio content or automatically focuses the input.
- `src/components/LainDataStream.js` — subdued hero-only canvas data stream. Includes a reduced-motion still and offscreen/hidden-tab suspension; the still artwork is independent in `App.js`.
- `src/components/Header.js` — sticky revision strip with part metadata and native numbered anchor navigation, including mobile.
- `src/components/Projects.js` — pin function table: two project rows with a gateway pad chain and a real empty-inbox screenshot, plus a striped Unity WIP row.
- `src/data/profile.js` — shared skills for the pinout bus table and terminal.
- `src/components/Skills.js` — bus table and personal module (`J1 · /home/lel190`) using the existing avatar.
- `src/components/Footer.js` — contact as I/O ports plus colophon.
- `src/index.css` — baseline, browser surfaces, trace-draw keyframe, and reduced-motion rules.
- `src/components/AnimatedSection.js`, `src/utils/animations.js` — legacy animation helpers, not imported by the current page. Framer Motion and intersection-observer remain installed; no need to reintroduce them for simple effects.
- `public/images/` — existing avatar/logo assets, the actual temporary-mail preview, and the unused bedroom wallpaper retained from the earlier design. Image provenance is in `public/images/CREDITS.md`.
- `src/assets/` — the existing Lain background (`lain_bg.webp`), the self-hosted Silkscreen subset for the `lel190_` wordmark, and `fonts/` holding the self-hosted Archivo and IBM Plex Mono files with their OFL licenses. No third-party font requests.
- `PRODUCT.md`, `DESIGN.md` — product constraints and built design language.
- `build/` — generated; never edit manually.
- `.github/workflows/deploy.yml` — automatically deploys to GitHub Pages on push to `dev`.

## Local Development / Build / Test / Deploy
```bash
npm install
npm run dev       # alias for npm start; http://localhost:3000
npm start         # original CRA entry point also works
CI=true npm test -- --watchAll=false --runInBand
npm run build
npm run deploy    # only when deployment is explicitly requested
```

- Preserve `NODE_OPTIONS=--openssl-legacy-provider` in the existing start, build, and predeploy scripts.
- `dev` delegates to `start`; it is not a new server or toolchain.
- `homepage` in `package.json` remains `https://le-lel190.github.io/le-lel190`.
- Public assets use `process.env.PUBLIC_URL` or `%PUBLIC_URL%` for GitHub Pages subpath compatibility.

## Design and Architecture
- Keep theme colors and fonts centralized in `src/App.js`; check `src/index.css` for baseline styling too.
- The world is a **component datasheet on a black solder mask**: gold pad accent, warm ink, charcoal sheet surfaces, columns that line up like a pin table. Every font is self-hosted from `src/assets/fonts/` — no Google Fonts links.
- Type: Archivo at 78–82% width for uppercase display (name, section and project headings); IBM Plex Mono for all data, labels, terminal, and links; system sans for prose only.
- The terminal is an optional interaction, not a simulated remote connection. Preserve all commands, clickable equivalents, and the quick-command chips.
- The whole portfolio is visible by default. Lain is a stationary viewport-sized background across the page, de-saturated so the reading column stays legible. Only the hero gold trace, the terminal entrance, its short boot sequence, and the hero data stream animate. The stream is capped at 30fps, pauses offscreen/when hidden, and has no manual control.
- Honor `prefers-reduced-motion` in both CSS and programmatic scrolling/boot logic.
- Do not invent employers, awards, project metrics, favorite anime, hardware specs, or live status.
- Preserve the name Anson Cheung and handle lel190. Present him as a CUHK CS graduate with a mix of web services, reversing, security coursework, and CTF experience. Keep project descriptions and URLs factual.

## Editing and Verification
- Prefer small local changes and current function-component/styled-components patterns.
- Avoid unrelated refactors, dependency churn, and manual changes to generated build files.
- Recheck imports before moving or renaming files.
- Run tests for component behavior changes; run `npm run build` for UI, structure, or deployment changes.
- Existing tests use React DOM utilities and Jest through CRA; no extra test framework is needed.
- Check desktop/mobile overflow, keyboard navigation, terminal history, and reduced motion for UI changes. Verify at 1440, 1024, and 390 wide; the project table changes column count below 1100.
- Update these notes when structure or workflow changes. No deployment without user authorization.

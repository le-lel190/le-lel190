# AGENTS.md

## Project Overview
React 18 portfolio using Create React App and `styled-components`, deployed to GitHub Pages via `gh-pages`. Dark-only, retro personal-workstation aesthetic: portfolio first, hacker/anime/old-web details in the margins.

## Repository Map
- `src/App.js` — composition, dark theme tokens, global styles, and skip link.
- `src/components/Hero.js` — visible identity and project links alongside the interactive terminal. History scrolls inside a bounded output region. Boot never gates portfolio content or automatically focuses the input.
- `src/components/LainDataStream.js` — hero-only Lain artwork and a subdued canvas data stream. Includes a pause control, reduced-motion still, and offscreen/hidden-tab suspension.
- `src/components/Header.js` — sticky header with native anchor navigation, including mobile.
- `src/components/Projects.js` — two real projects with architecture diagrams and a separate WIP row.
- `src/components/Skills.js` — toolbox and personal corner using the existing avatar.
- `src/components/Footer.js` — contact links and closing information.
- `src/index.css` — baseline, browser surfaces, terminal entrance, and reduced-motion rules.
- `src/components/AnimatedSection.js`, `src/utils/animations.js` — legacy animation helpers, not imported by the current page. Framer Motion and intersection-observer remain installed; no need to reintroduce them for simple effects.
- `public/images/` — existing avatar/logo assets and the unused bedroom wallpaper retained from the earlier design; its artwork attribution is in `public/images/CREDITS.md`.
- `src/assets/` — the existing Lain background (`lain_bg.webp`) and a self-hosted Silkscreen subset for the `lel190_` wordmark, with its OFL license. Not a general text font.
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
- Sage phosphor accent, warm ink, charcoal surfaces, and amber secondary details. Chakra Petch headings, JetBrains Mono for commands and technical metadata, system sans for prose.
- The terminal is an optional interaction, not a simulated remote connection. Preserve all commands and clickable equivalents.
- The whole portfolio is visible by default. Only the terminal entrance, its short boot sequence, and the user-approved hero data stream animate. The stream is capped at 30fps, pauses offscreen/when hidden, and has a manual pause button.
- Honor `prefers-reduced-motion` in both CSS and programmatic scrolling/boot logic.
- Do not invent employers, awards, project metrics, favorite anime, hardware specs, or live status.
- Preserve the name Anson Cheung and handle lel190. Keep project descriptions and URLs factual.

## Editing and Verification
- Prefer small local changes and current function-component/styled-components patterns.
- Avoid unrelated refactors, dependency churn, and manual changes to generated build files.
- Recheck imports before moving or renaming files.
- Run tests for component behavior changes; run `npm run build` for UI, structure, or deployment changes.
- Existing tests use React DOM utilities and Jest through CRA; no extra test framework is needed.
- Check desktop/mobile overflow, keyboard navigation, terminal history, and reduced motion for UI changes.
- Update these notes when structure or workflow changes. No deployment without user authorization.

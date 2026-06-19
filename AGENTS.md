# AGENTS.md

## Project Overview
React 18 portfolio site using Create React App, `styled-components`, and `framer-motion` for animations. Dark terminal theme only (no light mode). Deploys to GitHub Pages via `gh-pages`.

## Repository Map
- `src/App.js` — composition root. Defines single dark theme object, wraps in `ThemeProvider`, injects global styles
- `src/components/` — Hero (interactive terminal), Header, Projects, Skills, Footer, AnimatedSection (scroll animation wrapper)
- `src/utils/animations.js` — centralized Framer Motion animation variants
- `src/index.css` — baseline CSS, scrollbar, keyframes
- `build/` — generated. Do not edit manually

## Local Development / Build / Test / Deploy
Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm start
```

Run the test suite:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

Deploy to GitHub Pages:

```bash
npm run deploy
```

Notes:
- The existing `start`, `build`, and `predeploy` scripts set `NODE_OPTIONS=--openssl-legacy-provider`. Preserve that behavior unless you intentionally update the toolchain and verify the change.
- The GitHub Pages target path is controlled in part by the `homepage` field in `package.json`.

## Architecture Notes
The app is currently structured as a single-page, section-based React application. `src/App.js` imports and renders the major sections in order, so content and layout changes often stay localized to one component plus top-level composition.

Theme handling currently lives in `src/App.js`. That file defines the light and dark theme objects, wraps the tree in `ThemeProvider`, and injects shared themed styles through `createGlobalStyle`.

Global styling is split across two places: themed global styles inside `src/App.js` and non-theme baseline CSS inside `src/index.css`. When making visual changes, check both before assuming a style only exists in one place.

**Animation system (added June 2026):**
- `framer-motion` + `react-intersection-observer` provide scroll-triggered animations
- `src/utils/animations.js` — centralized variants for consistency (fadeInUp, staggerContainer, etc.)
- `src/components/AnimatedSection.js` — reusable wrapper with viewport detection and reduced-motion support
- All animations use GPU-accelerated transforms (opacity/transform only) for 60fps performance
- Components use `motion` from `styled-components` + direct framer-motion props (whileHover, variants, etc.)

## Editing Guidelines
- Prefer small, localized edits over broad refactors.
- Follow the existing React function-component style and current `styled-components` usage.
- Keep theme-related values centralized when possible instead of duplicating color or spacing decisions across files.
- Avoid mixing unrelated cleanup with a targeted content or UI change.
- Do not manually edit files in `build/`; regenerate them through the build process.
- Before moving or renaming components, verify imports from `src/App.js` and any files under `src/components/`.

## Warnings / Inconsistencies
- Styling is intentionally split between `styled-components` and `src/index.css`. Visual bugs may come from either layer.
- Deployment is coupled to GitHub Pages configuration in `package.json`, especially the `homepage` value and deploy script.
- This is a small repository, so path mismatches or renamed files under `src/components/` can break the app quickly. Re-check imports after structural edits.
- `README.md` is concise and useful for project summary, but it does not capture all operational details contributors may need.
- **Theme note:** This site is dark-only (no light mode). The single theme object in `src/App.js` defines terminal-aesthetic colors (green accent #00ff41, dark backgrounds).

## Verification Expectations
After changing code or documentation that affects behavior, use the smallest meaningful verification step and escalate as needed:
- For component logic or behavior changes, run `npm test`.
- For UI, styling, structure, or deployment-related changes, run `npm run build` before calling the work complete.
- When changing deploy behavior, confirm the `homepage` and deploy target still match the intended GitHub Pages URL.

## Contributor / Agent Behavior
- Follow existing repository patterns before introducing new abstractions.
- Keep changes easy to review, explain, and revert.
- State assumptions clearly when making non-obvious decisions.
- Avoid speculative refactors unless they directly support the requested task.
- If you update project structure or workflow, update this file so future contributors inherit accurate guidance.

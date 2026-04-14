# AGENTS.md

## Project Overview
This repository is a small React-based GitHub profile / portfolio site. It currently uses React 18 with Create React App conventions through `react-scripts`, styles UI with `styled-components`, and deploys the production build to GitHub Pages.

This file is intended for both coding agents and human contributors. Treat it as an operational guide for making safe changes, not as a product roadmap.

## Repository Map
- `src/App.js` — main composition root. It wires together the page sections, defines light/dark theme objects, injects themed global styles, and owns the theme toggle.
- `src/components/` — section-level UI components such as hero, header, about, projects, skills, and footer.
- `src/index.js` — React entry point that renders `<App />` inside `React.StrictMode`.
- `src/index.css` — baseline global CSS, scrollbar styling, and animation definitions.
- `public/` — static Create React App assets.
- `build/` — generated production output. Do not treat this as a source directory.
- `README.md` — brief public-facing summary of the project.
- `package.json` — scripts, dependencies, and GitHub Pages deployment configuration.

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

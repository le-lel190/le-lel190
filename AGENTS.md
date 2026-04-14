# AGENTS.md

## Project Overview
- React-based GitHub profile / portfolio site.
- Uses `react-scripts` and `styled-components`.
- Deploys to GitHub Pages.

## Repository Map
- `src/App.js`: main app composition and theme toggle.
- `src/components/`: section components.
- `src/index.js`: React entry point.
- `src/index.css`: baseline global CSS and animations.
- `public/`: static assets.
- `build/`: generated output.
- `README.md`: brief project summary.

## Local Development / Build / Test / Deploy
- `npm install`
- `npm start`
- `npm test`
- `npm run build`
- `npm run deploy`

## Architecture Notes
- Single-page section-based app.
- Theme state is managed in `src/App.js`.
- Styling is split across `styled-components` and `src/index.css`.

## Editing Guidelines
- Prefer small, localized edits.
- Follow existing React and `styled-components` patterns.
- Do not manually edit `build/`.

## Warnings / Inconsistencies
- Verify import paths and files under `src/components/`.
- Deployment depends on the `homepage` field in `package.json`.

## Verification Expectations
- Run `npm test` when behavior changes.
- Run `npm run build` before considering UI work complete.

## Contributor / Agent Behavior
- Follow existing structure first.
- Keep changes easy to review and revert.

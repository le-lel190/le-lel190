# AGENTS.md Design Spec

**Date:** 2026-04-14  
**Topic:** Repository guide for agents and human contributors

## Goal

Create an `AGENTS.md` file at the repository root that serves as a durable, repo-specific operating guide for both coding agents and human contributors. It should help readers understand the project quickly, make safe changes, run the app locally, and avoid common mistakes.

## Scope

The document will describe the repository as it exists today and include notable inconsistencies or warnings that future contributors should be aware of. It will not act as a feature roadmap or broad cleanup plan.

## Audience

Primary audiences:
- Coding agents making edits in this repository
- Human contributors onboarding to the project

The tone should be practical and operational rather than promotional.

## Proposed File

- Create: `AGENTS.md`

## Content Structure

### 1. Project Overview

Summarize the repository as a React-based GitHub profile / portfolio site. Note the current stack:
- React 18
- `react-scripts` / Create React App conventions
- `styled-components`
- GitHub Pages deployment

### 2. Repository Map

Document the current important paths and their responsibilities:
- `src/App.js` as the main composition root and theme toggle owner
- `src/components/` for section components such as header, hero, about, projects, skills, and footer
- `src/index.js` as the React entry point
- `src/index.css` for baseline global CSS and animations
- `public/` for CRA static assets
- `build/` as generated output that should not usually be edited by hand
- `README.md` as a brief project overview

### 3. Local Development and Deployment Commands

Document the existing commands from `package.json`:
- `npm install`
- `npm start`
- `npm test`
- `npm run build`
- `npm run deploy`

Also explain that start/build/predeploy use `NODE_OPTIONS=--openssl-legacy-provider`, which may be important for compatibility with this setup.

### 4. Architecture Notes

Capture the current architecture at a practical level:
- Single-page section-based app
- Theme state currently managed in `App.js`
- `ThemeProvider` and `createGlobalStyle` used for themed styling
- Additional global styles live in `src/index.css`

### 5. Editing Guidelines

Include repository-specific guidance:
- Prefer small, localized changes
- Follow existing React and `styled-components` patterns
- Keep theme-related values centralized when possible
- Avoid unrelated refactors during targeted edits
- Do not manually edit build artifacts in `build/`
- Verify import paths and file names before changing structure

### 6. Warnings / Inconsistencies

Record notable current-state warnings without turning the document into a roadmap:
- Styling is split between `styled-components` and `src/index.css`, so visual changes may require checking both places
- Deployment depends on the configured GitHub Pages `homepage` value in `package.json`
- The repository is small, but any mismatch between imports and files under `src/components/` should be verified during edits
- `README.md` is intentionally brief and may not capture operational details as completely as `AGENTS.md`

### 7. Verification Expectations

Document expectations contributors should follow after changes:
- Run `npm test` when behavior or component logic changes
- Run `npm run build` for UI or structural changes before considering work complete
- Check that deploy-related configuration still aligns with the intended GitHub Pages path when changing deployment behavior

### 8. Contributor / Agent Behavior

Set expectations for safe collaboration:
- Follow existing structure before introducing new abstractions
- Keep changes easy to review and revert
- Explain assumptions when making non-obvious decisions
- Avoid speculative cleanup unless it directly supports the requested change

## Non-Goals

The document will not:
- Replace the README as a public-facing project description
- Define a new coding standard beyond what the repository currently uses
- Introduce a cleanup backlog or refactor plan
- Add implementation details unrelated to this repo

## Recommended Style

Use moderate-to-thorough detail with strong headings and bullets so the file works as a reference without becoming bloated. It should be standalone and readable in one pass.

## Risks / Ambiguities Addressed

- **Potential stale guidance:** Mitigate by describing current patterns rather than speculative future architecture.
- **Overlapping docs with README:** Keep README as project summary and AGENTS.md as operational guidance.
- **Overprescribing conventions:** Phrase guidance around existing patterns and safe editing rather than imposing a large new process.

## Acceptance Criteria

The final `AGENTS.md` should:
- Exist at the repository root
- Be useful to both agents and human contributors
- Include repo overview, file map, commands, architecture notes, editing rules, warnings, and verification steps
- Reflect the actual current codebase and package scripts
- Explicitly discourage manual edits to generated build output

# Portfolio

Terminal-inspired portfolio built with React 18. Dark-only console aesthetic with interactive CLI hero, animated data streams, and Serial Experiments Lain visual references.

**Live:** <https://le-lel190.github.io/le-lel190/>

## Stack

- React 18 + styled-components
- framer-motion for scroll animations
- Canvas-based data stream background
- GitHub Pages deployment

## Local Development

```bash
npm install
npm start       # http://localhost:3000
npm test        # run test suite
npm run build   # production build
```

## Deploy

Push to `main` triggers GitHub Actions deployment to `gh-pages` branch. Manual deploy:

```bash
npm run deploy
```

## Architecture

See `AGENTS.md` for component structure, animation system, and editing guidelines.

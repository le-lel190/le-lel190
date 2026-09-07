## Hi there 👋

- 📚 I'm currently studying computer science in CUHK
- 🌱 I'm currently exploring on different frontend frameworks...
- 📫 Feel free to reach me via Discord: 190 (yes my username is literally 190)

## About This Portfolio

This is my GitHub profile page built with React: a dark, retro workstation portfolio with an interactive terminal.

**Live:** <https://le-lel190.github.io/le-lel190/>

### Technologies Used

- React 18 + styled-components
- GitHub Pages deployment

### Local preview

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `dev` is an alias for the existing Create React App `start` command; it does not deploy anything. `npm start` still works.

```bash
CI=true npm test -- --watchAll=false --runInBand
npm run build
```

## Deployment

Pushing to `dev` triggers `.github/workflows/deploy.yml`, which builds and deploys to the `gh-pages` branch. Only push when you intend to publish.

Manual deployment is also available via `npm run deploy` over SSH.

## Contributor Notes

For repository workflow, commands, and editing guidance, see `AGENTS.md`.

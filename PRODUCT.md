# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Recruiters / hiring managers** for cybersecurity and CS roles. Arrive cold, skim fast, and need competence communicated in seconds with minimal friction.
- **Peers in the security / CTF / reverse-engineering community.** Skilled enough to judge craft, and primed to appreciate the hacker-terminal aesthetic when it is executed well.

## Product Purpose

A personal portfolio for Anson Cheung (handle `lel190`), a CUHK CS graduate focused on cybersecurity, CTF, reverse engineering and general devops jobs. Success means a recruiter can grasp his skills and projects quickly, and a peer recognizes real craft. It also doubles as a demonstration of what he can build.

## Positioning

The site is a hacker's personal workstation with anime taste showing through: a portfolio first, with personal details in the margins. Anson's name, background, and project links are immediately readable; the working terminal is an optional way to explore, never a gate. The user chose this balance over an immersive digital hideout.

## Operating Context

- Viewed on desktop and mobile (mobile web). Recruiters may open it from a résumé or link on a phone.
- Dark-only viewing environment; the site is explicitly dark-only (no light mode).
- Fully static: no server, no database, no auth. Deploys to GitHub Pages.
- Current stack: React 18 + Create React App, `styled-components`, `framer-motion`, `react-intersection-observer`. Build/deploy scripts set `NODE_OPTIONS=--openssl-legacy-provider`; preserve that unless the toolchain is intentionally upgraded and verified.

## Capabilities and Constraints

- Sections: Hero (identity plus interactive terminal), Projects, Skills and personal corner, Contact/Footer, plus a sticky header.
- The interactive terminal remains the signature interaction. Identity and project links must not wait for its boot sequence.
- Existing content: two real projects (AI API Gateway at api.lel190.dev; No-Account Temp Mail at 971236.xyz) and one placeholder "Secret..." WIP at 35%. Contact links: GitHub (github.com/le-lel190), LinkedIn (linkedin.com/in/le-anson-cheung), Linktree (linktr.ee/lel190).
- Terminal commands already implemented: help, whoami, about, projects, skills, contact, clear, github, linkedin, linktree, pwd, uname, cat /etc/motd.
- Skills categories: Languages (Python, C/C++, Java, R, SQL); Web Development (React, Node.js, Express.js, JavaScript, HTML/CSS); Tools (Git, Linux, Docker).
- Requested visual character: nerd, weeb, technology enthusiast, retro hacker. References include Lain/Ghost in the Shell/Eva, Persona menus, old-web personal homepages, and Linux culture. These are influences, not permission to turn the portfolio into a fandom site.
- Personal details may use the existing avatar and broad interests. Do not invent favorite series, hardware specifications, or live activity.
- Copy may be enriched freely; user will review. Handle `lel190` and the name Anson Cheung must be preserved.

## Brand Commitments

- Handle: `lel190` (logo text).
- Name: Anson Cheung
- Dark-only theme (no light mode), permanently.
- Static, zero-backend hosting on GitHub Pages.
- Voice: a technically curious human, precise but personal; not a fake security console.

## Evidence on Hand

- Live links for both real projects and all three contact profiles (URLs above).
- No fabricated testimonials, metrics, or employers. Absence to respect: do not invent employers, internships, awards, or benchmark numbers.

## Product Principles

- Competence first: a recruiter must grasp skills and projects in seconds.
- Craft is the product: the terminal and system aesthetic must be executed at a level that impresses the very audience it addresses.
- Calm over noise: restraint is the upgrade; effects serve hierarchy, not decoration.
- Coherent design: workstation typography, surfaces, and navigation connect the whole page; visitors need no terminal knowledge.
- Static and fast: no backend, no heavy runtime cost; content visible by default.

## Accessibility & Inclusion

- Respect `prefers-reduced-motion` throughout (existing behavior to preserve).
- Keyboard-operable terminal input; sensible focus states.
- Touch devices get a usable experience: native navigation, no automatic input focus or keyboard popup, and no custom cursor.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Recruiters / hiring managers** for cybersecurity and CS roles. Arrive cold, skim fast, and need competence communicated in seconds with minimal friction.
- **Peers in the security / CTF / reverse-engineering community.** Skilled enough to judge craft, and primed to appreciate the hacker-terminal aesthetic when it is executed well.

## Product Purpose

A personal portfolio for Anson Cheung (handle `lel190`), a CUHK CS student focused on cybersecurity, CTF, and reverse engineering. Success means a recruiter can grasp his skills and projects quickly, and a peer recognizes real craft. It also doubles as a demonstration of what he can build.

## Positioning

The site presents itself as a living system rather than a decorated brochure: the terminal CLI is the front door, and the rest of the page behaves like the coherent console of that system. The claim a neighboring portfolio could not truthfully copy is that the visitor is operating the portfolio, not just reading it.

## Operating Context

- Viewed on desktop and mobile (mobile web). Recruiters may open it from a résumé or link on a phone.
- Dark-only viewing environment; the site is explicitly dark-only (no light mode).
- Fully static: no server, no database, no auth. Deploys to GitHub Pages.
- Current stack: React 18 + Create React App, `styled-components`, `framer-motion`, `react-intersection-observer`. Build/deploy scripts set `NODE_OPTIONS=--openssl-legacy-provider`; preserve that unless the toolchain is intentionally upgraded and verified.

## Capabilities and Constraints

- Sections: Hero (interactive terminal), Projects, Skills, Contact/Footer, plus a fixed header.
- The interactive terminal hero is the established signature and must remain the centerpiece (user-confirmed "keep & elevate").
- Existing content: two real projects (AI API Gateway at api.lel190.dev; No-Account Temp Mail at 971236.xyz) and one placeholder "Secret..." WIP at 35%. Contact links: GitHub (github.com/le-lel190), LinkedIn (linkedin.com/in/le-anson-cheung), Linktree (linktr.ee/lel190).
- Terminal commands already implemented: help, whoami, about, projects, skills, contact, clear, github, linkedin, linktree, pwd, uname, cat /etc/motd.
- Skills categories: Languages (Python, C/C++, Java, R, SQL); Web Development (React, Node.js, Express.js, JavaScript, HTML/CSS); Tools (Git, Linux, Docker).
- Known weakness (user-confirmed): the current visual system is too busy/noisy and reads as generic despite its effects; content is too thin.
- Copy may be enriched freely; user will review. Handle `lel190` and the name Anson Cheung must be preserved.

## Brand Commitments

- Handle: `lel190` (logo text).
- Name: Anson Cheung.
- Dark-only theme (no light mode), permanently.
- Static, zero-backend hosting on GitHub Pages.
- Voice: terminal/system operator; precise, dry, competent.

## Evidence on Hand

- Live links for both real projects and all three contact profiles (URLs above).
- No fabricated testimonials, metrics, or employers. Absence to respect: do not invent employers, internships, awards, or benchmark numbers.

## Product Principles

- Competence first: a recruiter must grasp skills and projects in seconds.
- Craft is the product: the terminal and system aesthetic must be executed at a level that impresses the very audience it addresses.
- Calm over noise: restraint is the upgrade; effects serve hierarchy, not decoration.
- Coherent fiction: the whole page behaves as one system, not a webpage with a terminal widget bolted on.
- Static and fast: no backend, no heavy runtime cost; content visible by default.

## Accessibility & Inclusion

- Respect `prefers-reduced-motion` throughout (existing behavior to preserve).
- Keyboard-operable terminal input; sensible focus states.
- Touch devices get a usable experience (custom cursor is desktop-only today; preserve that).
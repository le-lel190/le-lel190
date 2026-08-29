/*
  THESIS: The portfolio is a console, not a page. The visitor operates it —
  the CLI hero is the front door and every section is a panel of that same
  system. It refuses the decorated-portfolio default: no Persona 5 confetti,
  no floating shapes, no glow-everything. ONE accent (terminal green) carries
  the signal; red is reserved for the live cursor and the rare danger state;
  yellow for the single WIP marker. Restraint is the upgrade.
  OWN-WORLD: near-black phosphor ground, one green accent, hairline borders,
  JetBrains Mono for the system voice, Outfit for display. Depth comes from
  layered panels and a single soft shadow, never colored halos.
*/

const theme = {
  // Ground
  background: "#050605",
  surface: "#090c09",
  panel: "#0d120e",
  panelRaised: "#121812",
  border: "#1c291e",
  borderStrong: "#2b402e",

  // Ink
  text: "#d6e2d6",
  textDim: "#98ad9b",
  textMuted: "#617663",

  // Accent — terminal green is the only signal color
  accent: "#39ff72",
  accentDim: "#287d40",
  accentFaint: "rgba(57, 255, 114, 0.065)",
  accentLine: "rgba(57, 255, 114, 0.28)",
  scanline: "rgba(57, 255, 114, 0.032)",

  // Rare states
  danger: "#ff3b30",
  dangerDim: "rgba(255, 59, 48, 0.82)",
  warning: "#ffd60a",
  info: "#5bc8fa",

  // Selection / caret
  selection: "#39ff72",
  selectionInk: "#050605",

  // Fonts
  fontMono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  fontBody: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",

  // Elevation
  shadowPanel:
    "0 1px 0 rgba(214, 226, 214, 0.04), 0 14px 42px rgba(0, 0, 0, 0.58)",
};

export default theme;

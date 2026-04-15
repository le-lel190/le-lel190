import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ThemeProvider } from 'styled-components';
import Projects from './Projects';

const theme = {
  background: '#0a0a0a',
  secondaryBackground: '#111111',
  text: '#e0e0e0',
  secondaryText: '#888888',
  accent: '#00ff41',
  accentCyan: '#00d4ff',
  warning: '#ffb800',
  border: '#1a1a1a',
  glowBorder: 'rgba(0, 255, 65, 0.2)',
  fontMono: "'JetBrains Mono', 'Courier New', monospace",
  fontBody: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
};

describe('Projects', () => {
  it('renders the AI API Gateway project instead of the Cookie Sharing project', () => {
    const html = ReactDOMServer.renderToStaticMarkup(
      <ThemeProvider theme={theme}>
        <Projects />
      </ThemeProvider>
    );

    expect(html).toContain('AI API Gateway');
    expect(html).toContain('https://api.lel190.dev');
    expect(html).not.toContain('Cookie Sharing');
    expect(html).not.toContain('Cookies_Sharing');
  });

  it('renders the No-Account Temp Mail project with the Cloudflare service link', () => {
    const html = ReactDOMServer.renderToStaticMarkup(
      <ThemeProvider theme={theme}>
        <Projects />
      </ThemeProvider>
    );

    expect(html).toContain('No-Account Temp Mail');
    expect(html).toContain('https://971236.xyz/');
    expect(html).toContain('Cloudflare Workers');
    expect(html).toContain('KV');
    expect(html).toContain('D1');
    expect(html).not.toContain('shared-session-hhh');
    expect(html).not.toContain('ahahaha');
    expect(html).not.toContain('http://1237819.xyz');
  });
});

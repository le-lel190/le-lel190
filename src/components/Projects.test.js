import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ThemeProvider } from 'styled-components';
import Projects from './Projects';

const theme = {
  background: '#121212',
  secondaryBackground: '#1e1e1e',
  text: '#ffffff',
  secondaryText: '#e0e0e0',
  accent: '#0d6efd',
  border: '#343a40'
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

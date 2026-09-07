/* eslint-disable testing-library/no-unnecessary-act, testing-library/no-container */
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import Hero from './Hero';

import { theme } from '../App';

const renderHero = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <ThemeProvider theme={theme}>
        <Hero />
      </ThemeProvider>
    );
  });

  return {
    container,
    unmount: () => {
      act(() => {
        root.unmount();
      });
      container.remove();
    },
  };
};

const setNativeValue = (element, value) => {
  const { set } = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
  set.call(element, value);
};

const enterInteractiveMode = (container) => {
  const skipButton = container.querySelector('button');
  expect(skipButton).not.toBeNull();

  act(() => {
    skipButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
};

const submitCommand = (container, value) => {
  const input = container.querySelector('input[aria-label="Terminal command input"]');
  const form = input.closest('form');

  act(() => {
    setNativeValue(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });

  act(() => {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
};

describe('Hero terminal', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    window.open = jest.fn();
    document.body.innerHTML = '<section id="projects"></section><section id="skills"></section><footer></footer>';
    document.querySelector('#projects').scrollIntoView = jest.fn();
    document.querySelector('#skills').scrollIntoView = jest.fn();
    document.querySelector('footer').scrollIntoView = jest.fn();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    globalThis.IS_REACT_ACT_ENVIRONMENT = false;
  });

  it('shows the identity and project link before the terminal finishes booting', () => {
    const { container, unmount } = renderHero();
    expect(container.querySelector('h1').textContent).toBe('AnsonCheung.');
    expect(container.querySelector('a[href="#projects"]').textContent).toContain('Explore projects');
    expect(container.querySelector('input')).toBeNull();
    unmount();
  });

  it('boots without stealing focus from the page', () => {
    jest.useFakeTimers();
    const { container, unmount } = renderHero();
    for (let step = 0; step < 4; step += 1) {
      act(() => jest.advanceTimersByTime(220));
    }
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
    expect(document.activeElement).not.toBe(input);
    unmount();
    jest.useRealTimers();
  });

  it('skips the boot delay when reduced motion is preferred', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn(() => ({ matches: true }));
    const { container, unmount } = renderHero();
    expect(container.querySelector('input')).not.toBeNull();
    expect(container.textContent).toContain("Type 'help' to list available commands.");
    unmount();
    window.matchMedia = originalMatchMedia;
  });

  it.each(['constructor', '__proto__', 'toString'])('rejects inherited object keys: %s', command => {
    const { container, unmount } = renderHero();
    enterInteractiveMode(container);
    submitCommand(container, command);
    expect(container.textContent).toContain(`command not found: ${command}`);
    unmount();
  });

  it('enters interactive mode after skip and shows the help hint', () => {
    const { container, unmount } = renderHero();

    enterInteractiveMode(container);

    expect(container.textContent).toContain("Type 'help' to list available commands.");
    expect(container.querySelector('input[aria-label="Terminal command input"]')).not.toBeNull();

    unmount();
  });

  it('prints the command list when help is entered', () => {
    const { container, unmount } = renderHero();

    enterInteractiveMode(container);
    submitCommand(container, 'help');

    expect(container.textContent).toContain('Available commands:');
    expect(container.textContent).toContain('projects, skills, contact');

    unmount();
  });

  it('shows a command not found message for unsupported commands', () => {
    const { container, unmount } = renderHero();

    enterInteractiveMode(container);
    submitCommand(container, 'foobar');

    expect(container.textContent).toContain('command not found: foobar');
    expect(container.textContent).toContain("Type 'help' to list available commands.");

    unmount();
  });

  it('scrolls to the projects section when projects is entered', () => {
    const { container, unmount } = renderHero();

    enterInteractiveMode(container);
    submitCommand(container, 'projects');

    expect(document.querySelector('#projects').scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(container.textContent).toContain('Projects loaded. Scrolling to portfolio section...');

    unmount();
  });

  it('opens the GitHub profile when github is entered', () => {
    const { container, unmount } = renderHero();

    enterInteractiveMode(container);
    submitCommand(container, 'github');

    expect(window.open).toHaveBeenCalledWith('https://github.com/le-lel190', '_blank', 'noopener,noreferrer');
    expect(container.textContent).toContain('Opening GitHub: https://github.com/le-lel190');

    unmount();
  });

  it('clears interactive history when clear is entered', () => {
    const { container, unmount } = renderHero();

    enterInteractiveMode(container);
    submitCommand(container, 'help');
    expect(container.textContent).toContain('Available commands:');

    submitCommand(container, 'clear');

    expect(container.textContent).not.toContain('Available commands:');
    expect(container.textContent).not.toContain("Type 'help' to list available commands.");
    expect(container.querySelector('input[aria-label="Terminal command input"]')).not.toBeNull();

    unmount();
  });
});

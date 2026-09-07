/* eslint-disable testing-library/no-unnecessary-act, testing-library/no-container */
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../App';
import LainDataStream from './LainDataStream';

const original = {
  matchMedia: window.matchMedia,
  IntersectionObserver: window.IntersectionObserver,
  ResizeObserver: window.ResizeObserver,
};
let container;
let root;
let context;
let motionQuery;
let intersect;
let motionChange;
let frame;
let visibility;
let disconnect;

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  context = { clearRect: jest.fn(), fillText: jest.fn(), setTransform: jest.fn() };
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
  jest.spyOn(HTMLCanvasElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 640, height: 400 });
  jest.spyOn(Math, 'random').mockReturnValue(0.6);
  visibility = jest.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible');
  motionQuery = {
    matches: false,
    addEventListener: jest.fn((type, callback) => { motionChange = callback; }),
    removeEventListener: jest.fn(),
  };
  window.matchMedia = jest.fn(() => motionQuery);
  disconnect = jest.fn();
  window.IntersectionObserver = jest.fn(callback => {
    intersect = callback;
    return { observe: jest.fn(), disconnect };
  });
  window.ResizeObserver = jest.fn(() => ({ observe: jest.fn(), disconnect }));
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { frame = callback; return 42; });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  Object.assign(window, original);
  jest.restoreAllMocks();
  globalThis.IS_REACT_ACT_ENVIRONMENT = false;
});

const mount = () => act(() => {
  root.render(<ThemeProvider theme={theme}><LainDataStream /></ThemeProvider>);
});
const enterViewport = () => intersect([{ isIntersecting: true }]);

it('draws a decorative still for reduced motion and reacts to preference changes', () => {
  motionQuery.matches = true;
  mount();
  enterViewport();
  expect(container.querySelector('canvas').closest('[aria-hidden="true"]')).not.toBeNull();
  expect(context.fillText).toHaveBeenCalled();
  expect(window.requestAnimationFrame).not.toHaveBeenCalled();

  motionQuery.matches = false;
  motionChange();
  expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
  motionQuery.matches = true;
  motionChange();
  expect(window.cancelAnimationFrame).toHaveBeenCalledWith(42);
});

it('pauses offscreen and in hidden tabs, caps drawing at 30fps, and cleans up', () => {
  mount();
  expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  enterViewport();
  frame(100);
  context.clearRect.mockClear();
  frame(110);
  expect(context.clearRect).not.toHaveBeenCalled();
  frame(140);
  expect(context.clearRect).toHaveBeenCalledTimes(1);

  intersect([{ isIntersecting: false }]);
  expect(window.cancelAnimationFrame).toHaveBeenCalledWith(42);
  window.requestAnimationFrame.mockClear();
  visibility.mockReturnValue('hidden');
  enterViewport();
  document.dispatchEvent(new Event('visibilitychange'));
  expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  visibility.mockReturnValue('visible');
  document.dispatchEvent(new Event('visibilitychange'));
  expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);

  act(() => root.unmount());
  expect(disconnect).toHaveBeenCalledTimes(2);
  expect(motionQuery.removeEventListener).toHaveBeenCalledWith('change', motionChange);
  window.requestAnimationFrame.mockClear();
  document.dispatchEvent(new Event('visibilitychange'));
  expect(window.requestAnimationFrame).not.toHaveBeenCalled();
});

it('keeps the artwork available when canvas is unsupported', () => {
  HTMLCanvasElement.prototype.getContext.mockReturnValue(null);
  mount();
  expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  expect(window.requestAnimationFrame).not.toHaveBeenCalled();
});

import React, { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import lainImage from '../assets/lain_bg.webp';

const GLYPHS = '01ZX<>[]{}|/\\:+-*=_#';
const DATA_FRAGMENTS = [
  'LN-07 // SIGNAL',
  '0x4c41 1f90',
  'NODE: WIRED',
  'sync://local',
  'user@wired',
  'TRACE 200 OK',
  'protocol::noise',
  'packet.stream',
];

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0 -32px;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: ${props => props.theme.background};
  isolation: isolate;
  @media (max-width: 600px) { inset-inline: -20px; }
`;

const Artwork = styled.div`
  position: absolute;
  inset: 0;
  background: url(${lainImage}) 58% center / cover no-repeat;
  opacity: 0.38;
  @media (max-width: 780px) { background-position: 61% top; opacity: 0.25; }
`;

const StreamCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.65;
`;

const ColorWash = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, ${props => props.theme.background}d9, ${props => props.theme.background}33 70%),
    linear-gradient(0deg, ${props => props.theme.background}, transparent 35%);
`;


const randomBetween = (min, max) => min + Math.random() * (max - min);

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

const createStream = (x, height, fontSize) => {
  const length = Math.floor(randomBetween(5, 15));

  return {
    x,
    y: randomBetween(-height, height),
    speed: randomBetween(16, 38),
    length,
    alpha: randomBetween(0.12, 0.31),
    cyan: Math.random() > 0.78,
    chars: Array.from({ length }, randomGlyph),
    fontSize,
  };
};

const createPacket = (width, height, fontSize) => ({
  x: randomBetween(-width, width),
  y: Math.floor(randomBetween(0, Math.max(1, height / (fontSize * 1.9)))) * fontSize * 1.9,
  speed: randomBetween(12, 28),
  alpha: randomBetween(0.08, 0.18),
  cyan: Math.random() > 0.72,
  text: `${DATA_FRAGMENTS[Math.floor(Math.random() * DATA_FRAGMENTS.length)]}  ${randomGlyph()}${randomGlyph()}${randomGlyph()}`,
});

const drawStreamFrame = (context, width, height, streams, packets, fontSize, delta, animate, theme) => {
  const lineHeight = fontSize * 1.15;
  context.clearRect(0, 0, width, height);
  context.font = `${fontSize}px ${theme.fontMono}`;
  context.textBaseline = 'top';

  streams.forEach(stream => {
    if (animate) {
      stream.y += stream.speed * delta;
    }

    if (stream.y - stream.length * lineHeight > height) {
      stream.y = randomBetween(-height * 0.4, -lineHeight);
      stream.speed = randomBetween(16, 38);
      stream.chars = Array.from({ length: stream.length }, randomGlyph);
    }

    stream.chars.forEach((glyph, index) => {
      const y = stream.y - index * lineHeight;
      if (y < -lineHeight || y > height + lineHeight) return;

      const trailProgress = index / stream.length;
      const alpha = stream.alpha * (1 - trailProgress) * (index === 0 ? 1.7 : 1);
      context.fillStyle = stream.cyan ? theme.info : theme.accent;
      context.globalAlpha = Math.min(alpha, 0.62);
      context.fillText(glyph, stream.x, y);
    });
  });

  packets.forEach(packet => {
    if (animate) {
      packet.x += packet.speed * delta;
    }

    if (packet.x > width + fontSize * packet.text.length) {
      packet.x = randomBetween(-width * 0.8, -fontSize * packet.text.length);
      packet.y = Math.floor(randomBetween(0, Math.max(1, height / (fontSize * 1.9)))) * fontSize * 1.9;
    }

    context.fillStyle = packet.cyan ? theme.info : theme.accent;
    context.globalAlpha = packet.alpha;
    context.fillText(packet.text, packet.x, packet.y);
  });
  context.globalAlpha = 1;
};

const LainDataStream = () => {
  const canvasRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)') || { matches: true };
    let animationFrame;
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;
    let fontSize = 13;
    let streams = [];
    let packets = [];
    let lastTime = 0;
    let isOnscreen = !window.IntersectionObserver;

    const draw = (delta = 0, animate = false) => {
      drawStreamFrame(context, width, height, streams, packets, fontSize, delta, animate, theme);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      fontSize = Math.max(11, Math.min(15, width / 100));
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const columnGap = fontSize * 1.72;
      const columnCount = Math.ceil(width / columnGap) + 1;
      streams = Array.from({ length: columnCount }, (_, index) => (
        createStream(index * columnGap, height, fontSize)
      ));
      packets = Array.from({ length: Math.max(5, Math.floor(width / 190)) }, () => (
        createPacket(width, height, fontSize)
      ));

      draw();
    };

    const shouldAnimate = () => isOnscreen && document.visibilityState !== 'hidden' && !motionQuery.matches;
    const stop = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = undefined;
      lastTime = 0;
    };
    const render = (time) => {
      animationFrame = undefined;
      if (!shouldAnimate()) return;
      // Cap canvas work at 30fps; resume without a jump after tab/viewport changes.
      if (!lastTime || time - lastTime >= 1000 / 30) {
        const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0;
        lastTime = time;
        draw(delta * 0.65, true);
      }
      animationFrame = window.requestAnimationFrame(render);
    };
    const syncAnimation = () => {
      if (!shouldAnimate()) {
        stop();
      } else if (animationFrame === undefined) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const observer = window.IntersectionObserver && new IntersectionObserver(([entry]) => {
      isOnscreen = entry.isIntersecting;
      syncAnimation();
    });
    const resizeObserver = window.ResizeObserver && new ResizeObserver(resize);
    resize();
    observer?.observe(canvas);
    resizeObserver?.observe(canvas);
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', syncAnimation);
    motionQuery.addEventListener?.('change', syncAnimation);
    syncAnimation();

    return () => {
      stop();
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', syncAnimation);
      motionQuery.removeEventListener?.('change', syncAnimation);
    };
  }, [theme]);

  return (
    <>
      <BackgroundLayer aria-hidden="true">
        <Artwork />
        <StreamCanvas ref={canvasRef} />
        <ColorWash />
      </BackgroundLayer>
    </>
  );
};

export default LainDataStream;

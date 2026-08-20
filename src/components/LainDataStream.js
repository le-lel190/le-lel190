import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
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
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: ${props => props.theme.background};
  isolation: isolate;
`;

const Artwork = styled.div`
  position: absolute;
  inset: -3%;
  background-image:
    linear-gradient(180deg, rgba(5, 6, 5, 0.22), rgba(5, 6, 5, 0.78)),
    url(${lainImage});
  background-size: cover;
  background-position: 58% center;
  background-repeat: no-repeat;
  filter: saturate(0.82) contrast(1.08);
  opacity: 0.7;
  transform: scale(1.035);
  animation: lainDrift 26s ease-in-out infinite alternate;

  @keyframes lainDrift {
    from { transform: scale(1.035) translate3d(0, 0, 0); }
    to { transform: scale(1.06) translate3d(-0.6%, -0.35%, 0); }
  }

  @media (max-width: 720px) {
    background-position: 61% center;
    opacity: 0.57;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: scale(1.035);
  }
`;

const ColorWash = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(5, 6, 5, 0.64) 0%, rgba(5, 6, 5, 0.2) 46%, rgba(5, 6, 5, 0.68) 100%),
    linear-gradient(180deg, rgba(5, 6, 5, 0.18), rgba(5, 6, 5, 0.55));
`;

const StreamCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.48;
  mix-blend-mode: screen;
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 24%, rgba(5, 6, 5, 0.42) 100%);
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

const drawStreamFrame = (context, width, height, streams, packets, fontSize, delta, animate) => {
  const lineHeight = fontSize * 1.15;
  context.clearRect(0, 0, width, height);
  context.font = `${fontSize}px "JetBrains Mono", monospace`;
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
      const color = stream.cyan ? '89, 220, 255' : '57, 255, 114';
      context.fillStyle = `rgba(${color}, ${Math.min(alpha, 0.62)})`;
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

    context.fillStyle = packet.cyan
      ? `rgba(89, 220, 255, ${packet.alpha})`
      : `rgba(57, 255, 114, ${packet.alpha})`;
    context.fillText(packet.text, packet.x, packet.y);
  });
};

const LainDataStream = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame;
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;
    let fontSize = 13;
    let streams = [];
    let packets = [];
    let lastTime = 0;
    let isVisible = document.visibilityState !== 'hidden';

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

      drawStreamFrame(context, width, height, streams, packets, fontSize, 0, false);
    };

    const render = (time) => {
      if (!isVisible) {
        animationFrame = undefined;
        return;
      }

      animationFrame = undefined;

      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      drawStreamFrame(
        context,
        width,
        height,
        streams,
        packets,
        fontSize,
        delta,
        !motionQuery.matches,
      );

      if (!motionQuery.matches) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const start = () => {
      if (animationFrame === undefined && isVisible) {
        lastTime = 0;
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState !== 'hidden';
      if (isVisible) {
        start();
      } else if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = undefined;
      }
    };

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        if (animationFrame !== undefined) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = undefined;
        }
        drawStreamFrame(context, width, height, streams, packets, fontSize, 0, false);
      } else {
        start();
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener?.('change', handleMotionChange);
    start();

    return () => {
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener?.('change', handleMotionChange);
    };
  }, []);

  return (
    <BackgroundLayer aria-hidden="true">
      <Artwork />
      <ColorWash />
      <StreamCanvas ref={canvasRef} />
      <Vignette />
    </BackgroundLayer>
  );
};

export default LainDataStream;

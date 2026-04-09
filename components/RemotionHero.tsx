'use client';
import { Player } from '@remotion/player';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate, Sequence } from 'remotion';
import React from 'react';

const ParticleLayer = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Make particles drift and glow
  const particles = Array.from({ length: 40 }).map((_, i) => {
    const startOffset = i * 15;
    const progress = Math.max(0, frame - startOffset) / fps;
    const y = interpolate(progress, [0, 5], [110, -20], { extrapolateRight: 'clamp' });
    const opacity = interpolate(Math.sin(progress * 2 + i), [-1, 1], [0.2, 0.8]);
    
    return (
      <div key={i} style={{
        position: 'absolute',
        left: `${(i * 137) % 100}%`,
        top: `${y}%`,
        width: 4 + (i % 4),
        height: 4 + (i % 4),
        backgroundColor: '#fff',
        borderRadius: '50%',
        opacity,
        boxShadow: '0 0 10px 2px rgba(255,255,255,0.8)'
      }} />
    );
  });

  return <AbsoluteFill>{particles}</AbsoluteFill>;
};

const TitleSequence = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const textOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{
        fontSize: '120px',
        fontWeight: 900,
        color: '#fff',
        transform: `translateY(${textY}px)`,
        opacity: textOpacity,
        letterSpacing: '-0.05em',
        textAlign: 'center',
        lineHeight: 1
      }}>
        <span style={{ display: 'block' }}>빛이</span>
        <span className="text-gradient" style={{ display: 'block' }}>공간을</span>
        <span style={{ display: 'block' }}>완성한다</span>
      </h1>
      <p style={{
        marginTop: 40,
        fontSize: 24,
        color: 'rgba(255,255,255,0.7)',
        opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' }),
        transform: `translateY(${interpolate(frame, [20, 50], [30, 0], { extrapolateRight: 'clamp' })}px)`,
        fontWeight: 300,
        textAlign: 'center'
      }}>
        LUMINA: Next-Generation LED Lighting Technology
      </p>
    </AbsoluteFill>
  );
};

export const LuminaComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
      <Sequence from={0}>
        <ParticleLayer />
      </Sequence>
      <Sequence from={15}>
        <TitleSequence />
      </Sequence>
      {/* Dynamic Background Glow */}
      <AbsoluteFill style={{
        background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)',
        mixBlendMode: 'screen'
      }} />
    </AbsoluteFill>
  );
};

export default function RemotionHero() {
  return (
    <Player
      component={LuminaComposition}
      durationInFrames={300}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={60}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        objectFit: 'cover'
      }}
      autoPlay
      loop
    />
  );
}

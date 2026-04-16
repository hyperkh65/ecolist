'use client';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, spring } from 'remotion';
import React from 'react';

export const HighbaySequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const scale = spring({ frame, fps, config: { damping: 200 } });

  const logoMove = interpolate(frame, [20, 40], [0, -100], { extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [30, 50], [0, 1]);

  return (
    <AbsoluteFill style={{ background: '#020617', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      {/* Background Glow */}
      <AbsoluteFill style={{ 
        background: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
        opacity
      }} />

      {/* Main Visual: UFO silhouette with light effect */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        transform: `scale(${scale}) translateY(${logoMove}px)`
      }}>
        <div style={{ position: 'relative' }}>
          {/* Light Beam Effect */}
          <div style={{ 
            position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0, 
            borderLeft: '150px solid transparent', borderRight: '150px solid transparent',
            borderBottom: '400px solid rgba(14, 165, 233, 0.2)',
            filter: 'blur(40px)',
            opacity: interpolate(frame, [40, 60], [0, 1])
          }} />
          
          <div style={{ 
            width: 320, height: 60, background: '#1e293b', 
            borderRadius: '160px 160px 10px 10px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,255,255,0.1)'
          }} />
        </div>
      </div>

      {/* Technical Labels */}
      <div style={{ 
        position: 'absolute', bottom: 150, width: '100%', textAlign: 'center',
        opacity: textOpacity,
        transform: `translateY(${interpolate(frame, [30, 50], [20, 0])}px)`
      }}>
        <h1 style={{ fontSize: 80, fontWeight: 900, marginBottom: 10, letterSpacing: '-0.05em' }}>
          UFO-AM6 <span style={{ color: '#0ea5e9' }}>150W</span>
        </h1>
        <div style={{ fontSize: 24, fontWeight: 500, color: '#94a3b8' }}>
          18M Sensor Engine • Philips Xitanium™ Inside
        </div>
      </div>

      {/* Floating Specs */}
      {frame > 60 && (
        <div style={{ position: 'absolute', top: 100, left: 100, opacity: interpolate(frame, [60, 80], [0, 1]) }}>
          <div style={{ fontSize: 14, color: '#0ea5e9', fontWeight: 900 }}>CHIPSET</div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>SSC 2835 9V</div>
        </div>
      )}
      {frame > 75 && (
        <div style={{ position: 'absolute', top: 100, right: 100, opacity: interpolate(frame, [75, 95], [0, 1]), textAlign: 'right' }}>
          <div style={{ fontSize: 14, color: '#0ea5e9', fontWeight: 900 }}>EFFICACY</div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>151.2 lm/W</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

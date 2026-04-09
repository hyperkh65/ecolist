'use client';
import { Player } from '@remotion/player';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence, Easing } from 'remotion';
import React, { useState, useEffect } from 'react';

/**
 * 전용 로컬 영상 베이스 히로 섹션 - 프리미엄 리디자인
 * - KC KS EMC HEE 인증 뱃지 도입
 * - 텍스트 번짐 제거 및 반응형 최적화
 */

// ─── 타이틀 시퀀스 (Remotion: 텍스트 애니메이션 담당) ─────────────────────
const TitleSequence = () => {
  const frame = useCurrentFrame();

  const phase1 = interpolate(frame, [20, 80],  [0, 1], { easing: Easing.bezier(0.2, 0.8, 0.4, 1), extrapolateRight: 'clamp' });
  const phase2 = interpolate(frame, [60, 140], [0, 1], { easing: Easing.bezier(0.2, 0.8, 0.4, 1), extrapolateRight: 'clamp' });
  const phase3 = interpolate(frame, [100, 190],[0, 1], { easing: Easing.bezier(0.2, 0.8, 0.4, 1), extrapolateRight: 'clamp' });

  const scale1 = interpolate(phase1, [0, 1], [1.02, 1], { easing: Easing.out(Easing.quad) });
  const scale2 = interpolate(phase2, [0, 1], [1.02, 1], { easing: Easing.out(Easing.quad) });
  const scale3 = interpolate(phase3, [0, 1], [1.01, 1], { easing: Easing.out(Easing.quad) });
  const translateY = (p: number) => interpolate(p, [0, 1], [24, 0]);

  const certifications = ['KC', 'KS', 'EMC', 'HEE'];

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', padding: '0 5vw', zIndex: 10, maxWidth: 1100, width: '100%' }}>

        {/* 최상단 뱃지 섹션 */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 14,
          padding: '10px 32px', background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)', borderRadius: '50px',
          border: '1px solid rgba(255,255,255,0.15)',
          marginBottom: 48, boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          opacity: phase1, 
          transform: `translateY(${translateY(phase1)}px) scale(${scale1}) translateZ(0)`,
        }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: '#38bdf8', letterSpacing: 2.5 }}>(주)와이앤케이</span>
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.2)' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5 }}>PREMIUM B2B PARTNER</span>
        </div>

        {/* 메가 타이틀 */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontSize: 'clamp(38px, 6.4vw, 92px)', fontWeight: 900,
            color: '#ffffff', letterSpacing: '-0.045em', lineHeight: 1.1,
            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
            opacity: phase2, 
            transform: `translateY(${translateY(phase2)}px) scale(${scale2}) translateZ(0)`,
            marginBottom: 0,
            WebkitFontSmoothing: 'antialiased',
          }}>
            검증된 제품,<br />
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontWeight: 900,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))', // 블러 대신 섀도우로 선명도 보강
            }}>신뢰할 수 있는 공급</span>
          </h1>
        </div>

        {/* 인증 뱃지 리스트 */}
        <div style={{ 
          display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap',
          opacity: phase3, 
          transform: `translateY(${translateY(phase3)}px) scale(${scale3}) translateZ(0)`,
          marginTop: 40
        }}>
          {certifications.map(cert => (
            <div key={cert} style={{
              padding: '6px 18px', background: 'rgba(255,255,255,0.12)',
              borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)',
              color: '#ffffff', fontSize: 13, fontWeight: 800, letterSpacing: 1
            }}>
              {cert}
            </div>
          ))}
          <div style={{
            padding: '6px 18px', background: 'rgba(3,105,161,0.2)',
            borderRadius: 8, border: '1px solid rgba(14,165,233,0.3)',
            color: '#7dd3fc', fontSize: 13, fontWeight: 800, marginLeft: 4
          }}>
            인증 제품
          </div>
        </div>

        {/* 서브 설명 */}
        <p style={{
          fontSize: 'clamp(16px, 1.6vw, 22px)', color: 'rgba(255,255,255,0.7)', fontWeight: 500,
          maxWidth: 820, margin: '24px auto 0', lineHeight: 1.7,
          opacity: phase3,
          transform: `translateY(${translateY(phase3)}px) scale(${scale3}) translateZ(0)`,
          WebkitFontSmoothing: 'antialiased',
        }}>
          글로벌 제조사로부터 직접 소싱한 프리미엄 라인업.<br />
          까다로운 검수와 안전한 물류로 귀사의 비즈니스를 지원합니다.
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const LuminaComposition: React.FC = () => (
  <AbsoluteFill style={{ background: 'transparent', overflow: 'hidden' }}>
    <Sequence from={0}><TitleSequence /></Sequence>
  </AbsoluteFill>
);

// ─── 배경 영상 컴포넌트 ─────────────────────────────────────────────────────────
function BackgroundVideo() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#020617' }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 1,
          filter: 'contrast(1.05) brightness(0.85)', 
        }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* 텍스트 가독성을 위한 비네팅 (화이트워싱 없음) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at center, transparent 0%, rgba(2,6,23,0.4) 100%)',
        zIndex: 2,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(2,6,23,0.4) 0%, transparent 15%, transparent 85%, rgba(2,6,23,0.6) 100%)',
        zIndex: 2,
      }} />
    </div>
  );
}

// ─── 메인 Export ────────────────────────────────────────────────────────────────
export default function RemotionHero() {
  const [dim, setDim] = useState({ w: 1920, h: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setDim({ w: window.innerWidth, h: Math.max(window.innerHeight, 700) });
    window.addEventListener('resize', update);
    update();
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!mounted) return <div style={{ width: '100%', height: '100vh', background: '#020617' }} />;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#020617' }}>
      <BackgroundVideo />

      <Player
        component={LuminaComposition}
        durationInFrames={3600}
        compositionWidth={dim.w}
        compositionHeight={dim.h}
        fps={60}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: 'transparent', zIndex: 10 }}
        autoPlay
        loop
      />

      {/* 액션 버튼 그룹 (버튼형 디테일 최적화) */}
      <div style={{
        position: 'absolute',
        bottom: '10vh',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex',
        gap: 16,
        width: 'max-content'
      }}>
        <button style={{
          padding: '16px 36px',
          background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
          color: '#ffffff',
          borderRadius: '12px',
          border: 'none',
          fontSize: 15,
          fontWeight: 800,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(2,132,199,0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(2,132,199,0.5)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(2,132,199,0.4)';
        }}
        >
          제품 및 인증서 보기
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
        <button style={{
          padding: '16px 36px',
          background: 'rgba(255,255,255,0.05)',
          color: '#ffffff',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.4)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
        }}
        >
          무역 절차 안내
        </button>
      </div>

      {/* 스크롤 유도 UI */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        color: 'white',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 4,
        opacity: 0.4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
      }}>
        SCROLL
        <div style={{ width: 1, height: 30, background: 'linear-gradient(180deg, white, transparent)' }} />
      </div>
    </div>
  );
}

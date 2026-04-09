'use client';
import { Player } from '@remotion/player';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, Sequence, Easing, Video } from 'remotion';
import React, { useState, useEffect } from 'react';

/**
 * 배경 영상 목록 — 무역/LED/글로벌 물류 분위기
 * mixkit.co 무료 영상 (상업 이용 가능)
 *
 * 1. 밤 도심 항공뷰 — 글로벌 무역 도시 규모
 * 2. 공장·창고 물류 — 안전한 소싱·공급망
 * 3. 빛나는 LED 조명 시설 — 제품의 실제 적용
 */
const VIDEO_CLIPS = [
  // 항공뷰 야경 도시 (글로벌 무역 스케일)
  'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-at-night-4714-large.mp4',
  // 산업 창고/물류 (소싱·공급망)
  'https://assets.mixkit.co/videos/preview/mixkit-warehouse-workers-moving-boxes-19760-large.mp4',
  // 도심 빌딩 야경 (LED 조명 실적용)
  'https://assets.mixkit.co/videos/preview/mixkit-night-city-with-traffic-and-illuminated-buildings-33827-large.mp4',
];

/**
 * 배경 비디오 레이어
 * - 60fps 기준 0~60초 재생
 * - 20초마다 영상 클립 전환 (fade cross)
 */
const CinematicVideoLayer = () => {
  const frame = useCurrentFrame();
  const framesPerClip = 1200; // 20초 @ 60fps

  // 현재 영상 인덱스
  const clipIndex = Math.floor(frame / framesPerClip) % VIDEO_CLIPS.length;
  // 다음 영상 인덱스
  const nextIndex = (clipIndex + 1) % VIDEO_CLIPS.length;

  // 클립 내 위치 (0 ~ framesPerClip)
  const frameInClip = frame % framesPerClip;

  // 크로스페이드: 마지막 1.5초(90프레임) 동안 전환
  const fadeOut = interpolate(frameInClip, [framesPerClip - 90, framesPerClip], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fadeIn = interpolate(frameInClip, [framesPerClip - 90, framesPerClip], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: '#060d1a' }}>
      {/* 현재 클립 */}
      <Video
        src={VIDEO_CLIPS[clipIndex]}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: fadeOut * 0.45,
          filter: 'grayscale(0.2) contrast(1.15) saturate(1.1)',
        }}
        muted
      />
      {/* 다음 클립 (크로스페이드용) */}
      <Video
        src={VIDEO_CLIPS[nextIndex]}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: fadeIn * 0.45,
          filter: 'grayscale(0.2) contrast(1.15) saturate(1.1)',
        }}
        muted
      />
      {/* 딥 블루 코퍼레이트 오버레이 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 60% 40%, rgba(2,132,199,0.18) 0%, rgba(6,13,26,0.85) 70%)',
      }} />
    </AbsoluteFill>
  );
};

/**
 * 타이틀 시퀀스 — 무역회사 정체성을 담은 카피
 * "검증된 제품, 신뢰할 수 있는 공급"
 */
const TitleSequence = () => {
  const frame = useCurrentFrame();

  // 단계별 장엄한 시네마틱 페이드인
  const phase1 = interpolate(frame, [20, 80], [0, 1], { easing: Easing.bezier(0.2, 0.8, 0.4, 1), extrapolateRight: 'clamp' });
  const phase2 = interpolate(frame, [60, 140], [0, 1], { easing: Easing.bezier(0.2, 0.8, 0.4, 1), extrapolateRight: 'clamp' });
  const phase3 = interpolate(frame, [100, 190], [0, 1], { easing: Easing.bezier(0.2, 0.8, 0.4, 1), extrapolateRight: 'clamp' });

  const blur1 = interpolate(phase1, [0, 1], [30, 0]);
  const blur2 = interpolate(phase2, [0, 1], [30, 0]);
  const blur3 = interpolate(phase3, [0, 1], [20, 0]);

  const scale1 = interpolate(phase1, [0, 1], [1.08, 1]);
  const scale2 = interpolate(phase2, [0, 1], [1.08, 1]);
  const scale3 = interpolate(phase3, [0, 1], [1.04, 1]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', padding: '0 24px', zIndex: 10, maxWidth: 900 }}>

        {/* 회사 뱃지 */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 24px',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          borderRadius: 40,
          border: '1px solid rgba(255,255,255,0.12)',
          marginBottom: 40,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          opacity: phase1,
          filter: `blur(${blur1}px)`,
          transform: `scale(${scale1})`,
        }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#38bdf8', letterSpacing: 2 }}>(주)와이앤케이</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', letterSpacing: 1.5 }}>GLOBAL LED TRADE PARTNER</span>
        </div>

        {/* 메인 헤드라인 */}
        <h1 style={{
          fontSize: 'clamp(40px, 5.5vw, 88px)',
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-0.04em',
          lineHeight: 1.18,
          textShadow: '0 16px 48px rgba(0,0,0,0.6)',
          opacity: phase2,
          filter: `blur(${blur2}px)`,
          transform: `scale(${scale2})`,
          marginBottom: 0,
        }}>
          검증된 제품,<br />
          <span style={{
            background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>신뢰할 수 있는 공급</span>
        </h1>

        {/* 서브카피 */}
        <p style={{
          fontSize: 'clamp(16px, 1.4vw, 21px)',
          color: '#94a3b8',
          fontWeight: 400,
          maxWidth: 680,
          margin: '32px auto 0',
          lineHeight: 1.85,
          textShadow: '0 8px 24px rgba(0,0,0,0.5)',
          opacity: phase3,
          filter: `blur(${blur3}px)`,
          transform: `scale(${scale3})`,
        }}>
          글로벌 제조사로부터 직접 소싱한 KC·CE·RoHS 인증 완료 제품.<br />
          까다로운 검수와 안전한 물류로 귀사의 비즈니스를 지원합니다.
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const LuminaComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#060d1a', overflow: 'hidden' }}>
      <CinematicVideoLayer />
      <Sequence from={0}>
        <TitleSequence />
      </Sequence>
    </AbsoluteFill>
  );
};

export default function RemotionHero() {
  const [dim, setDim] = useState({ w: 1920, h: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateDim = () => setDim({ w: window.innerWidth, h: Math.max(window.innerHeight, 700) });
    updateDim();
    window.addEventListener('resize', updateDim);
    return () => window.removeEventListener('resize', updateDim);
  }, []);

  if (!mounted) return <div style={{ width: '100%', height: '100vh', background: '#060d1a' }} />;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Player
        component={LuminaComposition}
        durationInFrames={3600} /* 60초 @ 60fps */
        compositionWidth={dim.w}
        compositionHeight={dim.h}
        fps={60}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
        }}
        autoPlay
        loop
      />
      {/* 섹션 하단 자연스러운 페이드 */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(to top, rgba(255,255,255,0.7) 0%, transparent 100%)', zIndex: 20 }} />
    </div>
  );
}

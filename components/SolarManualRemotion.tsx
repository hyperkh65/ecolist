'use client';
import { Player } from '@remotion/player';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence, Easing, Img } from 'remotion';
import React, { useState, useEffect } from 'react';
import { Sun, Battery, Zap, Cpu, Lightbulb, Settings, ArrowRight } from 'lucide-react';

const FadeIn = ({ children, frameRange, translateYStart = 30 }: { children: React.ReactNode, frameRange: [number, number], translateYStart?: number }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, frameRange, [0, 1], { easing: Easing.out(Easing.quad), extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const translateY = interpolate(frame, frameRange, [translateYStart, 0], { easing: Easing.out(Easing.quad), extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  return <div style={{ opacity, transform: `translateY(${translateY}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>{children}</div>;
};

// Scene 1: Intro
const IntroScene = () => {
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <FadeIn frameRange={[10, 40]}>
        <div style={{ padding: '12px 30px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: 50, border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', fontWeight: 800, fontSize: 14, letterSpacing: 2 }}>
          YnK EDUCATIONAL MANUAL
        </div>
      </FadeIn>
      <FadeIn frameRange={[40, 70]}>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 900, textAlign: 'center', margin: 0, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          태양광 LED 가로등<br/>
          <span style={{ color: '#fbbf24' }}>작동 원리와 관리 포인트</span>
        </h1>
      </FadeIn>
      <FadeIn frameRange={[70, 100]}>
        <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.7)', marginTop: 20 }}>핵심 컴포넌트부터 효율적인 에너지 흐름까지 완벽 마스터</p>
      </FadeIn>
    </AbsoluteFill>
  );
};

// Scene 2: Solar Panel
const PanelScene = () => {
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ display: 'flex', maxWidth: 1200, width: '100%', padding: '0 40px', gap: 80, alignItems: 'center' }}>
        <FadeIn frameRange={[10, 40]} translateYStart={0}>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -20, background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)', zIndex: 0 }} />
            <Img src="/solar-panel.png" style={{ width: '100%', objectFit: 'contain', zIndex: 1, position: 'relative', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }} />
          </div>
        </FadeIn>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start' }}>
          <FadeIn frameRange={[30, 60]}>
             <h2 style={{ fontSize: 50, fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: 20 }}>
               <Sun size={48} color="#fbbf24" /> 태양광 패널
             </h2>
          </FadeIn>
          <FadeIn frameRange={[60, 90]}>
             <p style={{ fontSize: 24, lineHeight: 1.6, color: '#e2e8f0', margin: 0 }}>빛 에너지를 전기 에너지로 변환하는 핵심 부품입니다. 고효율 모노크리스탈 패널을 사용하여 흐린 날씨에도 우수한 발전량을 보장합니다.</p>
          </FadeIn>
          <FadeIn frameRange={[90, 120]}>
             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
               <li style={{ display: 'flex', gap: 12, fontSize: 20, color: '#94a3b8' }}><Settings color="#38bdf8"/> 주기적인 표면 세척 (먼지/조류 분변 제거)</li>
               <li style={{ display: 'flex', gap: 12, fontSize: 20, color: '#94a3b8' }}><Settings color="#38bdf8"/> 그림자가 지지 않는 설치 각도 및 방향(남쪽) 확보</li>
             </ul>
          </FadeIn>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: MPPT Controller
const ControllerScene = () => {
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ display: 'flex', maxWidth: 1200, width: '100%', padding: '0 40px', gap: 80, alignItems: 'center', flexDirection: 'row-reverse' }}>
        <FadeIn frameRange={[10, 40]} translateYStart={0}>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -20, background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)', zIndex: 0 }} />
            <Img src="/solar-controller.png" style={{ width: '100%', objectFit: 'contain', zIndex: 1, position: 'relative', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }} />
          </div>
        </FadeIn>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start' }}>
          <FadeIn frameRange={[30, 60]}>
             <h2 style={{ fontSize: 50, fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: 20 }}>
               <Cpu size={48} color="#10b981" /> MPPT 컨트롤러
             </h2>
          </FadeIn>
          <FadeIn frameRange={[60, 90]}>
             <p style={{ fontSize: 24, lineHeight: 1.6, color: '#e2e8f0', margin: 0 }}>태양광 패널의 전력을 정밀하게 제어하여 배터리에 충전하고, 야간에는 알맞은 전력을 LED에 공급하는 "두뇌"입니다.</p>
          </FadeIn>
          <FadeIn frameRange={[90, 120]}>
             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
               <li style={{ display: 'flex', gap: 12, fontSize: 20, color: '#94a3b8' }}><Settings color="#10b981"/> 상태 표시 LED 점검 (Error 빨간불 확인)</li>
               <li style={{ display: 'flex', gap: 12, fontSize: 20, color: '#94a3b8' }}><Settings color="#10b981"/> 단자대 결속 상태 확인 (느슨해짐 방지)</li>
               <li style={{ display: 'flex', gap: 12, fontSize: 20, color: '#94a3b8' }}><Settings color="#10b981"/> 과충전/과방전 보호 기능 정상 작동 여부 테스팅</li>
             </ul>
          </FadeIn>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: LED Light
const LightScene = () => {
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ display: 'flex', maxWidth: 1200, width: '100%', padding: '0 40px', gap: 80, alignItems: 'center' }}>
        <FadeIn frameRange={[10, 40]} translateYStart={0}>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -20, background: 'radial-gradient(circle, rgba(244,63,94,0.2) 0%, transparent 70%)', zIndex: 0 }} />
            <Img src="/solar-light.png" style={{ width: '80%', margin: '0 auto', display: 'block', objectFit: 'contain', zIndex: 1, position: 'relative', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }} />
          </div>
        </FadeIn>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start' }}>
          <FadeIn frameRange={[30, 60]}>
             <h2 style={{ fontSize: 50, fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: 20 }}>
               <Lightbulb size={48} color="#f43f5e" /> LED 광원부
             </h2>
          </FadeIn>
          <FadeIn frameRange={[60, 90]}>
             <p style={{ fontSize: 24, lineHeight: 1.6, color: '#e2e8f0', margin: 0 }}>고효율 LED 칩셋을 사용하여 최소한의 소비전력으로 최대의 밝기를 만들어냅니다. 모션 센서가 결합되어 에너지를 획기적으로 절약합니다.</p>
          </FadeIn>
          <FadeIn frameRange={[90, 120]}>
             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
               <li style={{ display: 'flex', gap: 12, fontSize: 20, color: '#94a3b8' }}><Settings color="#f43f5e"/> 모션 센서(PIR/Microwave) 작동 상태 점검</li>
               <li style={{ display: 'flex', gap: 12, fontSize: 20, color: '#94a3b8' }}><Settings color="#f43f5e"/> 방열판(Heatsink) 이물질 제거로 수명 연장</li>
             </ul>
          </FadeIn>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Flow
const FlowScene = () => {
    const frame = useCurrentFrame();
    const flowProgress = interpolate(frame, [30, 150], [0, 100], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white', flexDirection: 'column', gap: 60 }}>
            <FadeIn frameRange={[0, 20]} translateYStart={-20}>
                <h2 style={{ fontSize: 40, fontWeight: 800 }}>전체 에너지 플로우</h2>
            </FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: 40, background: 'rgba(255,255,255,0.05)', padding: '60px 80px', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
                {/* 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(251,191,36,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fbbf24' }}>
                        <Sun size={48} color="#fbbf24"/>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>태양광 패널</span>
                </div>
                
                {/* Arrow 1 */}
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: 100, height: 4, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${flowProgress}%`, background: '#fbbf24' }} />
                </div>

                {/* 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #10b981' }}>
                        <Cpu size={48} color="#10b981"/>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>컨트롤러</span>
                </div>

                {/* Arrow 2 */}
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: 100, height: 4, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${interpolate(frame, [80, 200], [0, 100], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })}%`, background: '#10b981' }} />
                </div>

                {/* 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #38bdf8' }}>
                        <Battery size={48} color="#38bdf8"/>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>배터리 팩</span>
                </div>

                {/* Arrow 3 */}
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: 100, height: 4, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${interpolate(frame, [150, 270], [0, 100], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })}%`, background: '#38bdf8' }} />
                </div>

                {/* 4 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(244,63,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #f43f5e' }}>
                        <Lightbulb size={48} color="#f43f5e"/>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>LED 램프</span>
                </div>
            </div>
            <FadeIn frameRange={[200, 230]} translateYStart={20}>
                <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', maxWidth: 800, textAlign: 'center', lineHeight: 1.6 }}>
                    낮에는 패널에서 전력을 생산하여 컨트롤러를 통해 배터리에 저장하고,<br/>
                    밤이 되면 패널 전압 강하를 컨트롤러가 감지하여 배터리 전력을 LED 램프로 자동 공급합니다.
                </p>
            </FadeIn>
        </AbsoluteFill>
    )
}


export const SolarManualComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#020617', overflow: 'hidden' }}>
      <Sequence from={0} durationInFrames={150}>
        <IntroScene />
      </Sequence>
      <Sequence from={150} durationInFrames={200}>
        <PanelScene />
      </Sequence>
      <Sequence from={350} durationInFrames={200}>
        <ControllerScene />
      </Sequence>
      <Sequence from={550} durationInFrames={200}>
        <LightScene />
      </Sequence>
      <Sequence from={750} durationInFrames={350}>
        <FlowScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export default function SolarManualRemotion() {
  const [dim, setDim] = useState({ w: 1920, h: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
        // Adjust for responsive ratio but keep high res
        const width = document.getElementById('remotion-container')?.clientWidth || window.innerWidth;
        setDim({ w: width, h: width * (9/16) });
    };
    window.addEventListener('resize', update);
    update();
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!mounted) return <div style={{ width: '100%', aspectRatio: '16/9', background: '#020617', borderRadius: 24 }} />;

  return (
    <div id="remotion-container" style={{ width: '100%', position: 'relative', overflow: 'hidden', background: '#020617', borderRadius: 24, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <Player
        component={SolarManualComposition}
        durationInFrames={1100}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={60}
        style={{ width: '100%', height: 'auto', aspectRatio: '16/9', background: 'transparent' }}
        controls
        autoPlay
        loop
      />
    </div>
  );
}

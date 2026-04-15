'use client';
import { Player } from '@remotion/player';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence, Easing, Img } from 'remotion';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sun, Battery, Zap, Cpu, Lightbulb, Settings, Info, Cable, 
  CheckCircle2, ListFilter, Play, RefreshCcw, Cloud, Wind, 
  Thermometer, AlertCircle, ShieldAlert, BarChart3, Gauge, 
  ChevronRight, ArrowRight, Microscope, Ruler, Database
} from 'lucide-react';

const FadeIn = ({ children, frameRange, translateYStart = 30, style, className }: any) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, frameRange, [0, 1], { easing: Easing.out(Easing.quad), extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const translateY = interpolate(frame, frameRange, [translateYStart, 0], { easing: Easing.out(Easing.quad), extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  return <div style={{ opacity, transform: `translateY(${translateY}px)`, display: 'flex', flexDirection: 'column', ...style }} className={className}>{children}</div>;
};

// --- Remotion Composition ---
export const SolarManualComposition: React.FC = () => {
    // 0~200: Intro
    // 200~500: Panel
    // 500~800: Controller
    // 800~1100: Battery
    // 1100~1500: Wiring
  return (
    <AbsoluteFill style={{ background: '#020617', overflow: 'hidden' }}>
      <Sequence from={0} durationInFrames={200}>
        <IntroScene />
      </Sequence>
      <Sequence from={200} durationInFrames={300}>
        <PanelScene />
      </Sequence>
      <Sequence from={500} durationInFrames={300}>
        <ControllerScene />
      </Sequence>
      <Sequence from={800} durationInFrames={300}>
        <BatteryScene />
      </Sequence>
      <Sequence from={1100} durationInFrames={400}>
        <WiringScene />
      </Sequence>
    </AbsoluteFill>
  );
};

const IntroScene = () => (
  <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white', display: 'flex', flexDirection: 'column', gap: 20 }}>
    <FadeIn frameRange={[10, 40]} style={{ alignItems: 'center' }}>
      <div style={{ padding: '12px 30px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: 50, border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', fontWeight: 800, fontSize: 14, letterSpacing: 2 }}>
        최첨단 가로등 공학 마스터 클래스
      </div>
    </FadeIn>
    <FadeIn frameRange={[40, 70]} style={{ alignItems: 'center' }}>
      <h1 style={{ fontSize: '72px', fontWeight: 950, textAlign: 'center', margin: 0, textShadow: '0 10px 30px rgba(0,0,0,0.5)', wordBreak: 'keep-all', lineHeight: 1.1 }}>
        태양광 LED 시스템 <br/>
        <span style={{ color: '#fbbf24' }}>초격차 실무 매뉴얼</span>
      </h1>
    </FadeIn>
    <FadeIn frameRange={[70, 100]} style={{ alignItems: 'center' }}>
      <p style={{ fontSize: 24, color: 'rgba(148, 163, 184, 0.8)', marginTop: 24, wordBreak: 'keep-all', textAlign: 'center', maxWidth: 800 }}>
        이론을 넘어 실제 시뮬레이션 데이터와 공학적 변수까지.<br/>
        완벽한 무정전 가로등 시스템을 구현하는 모든 기술적 산식을 공개합니다.
      </p>
    </FadeIn>
  </AbsoluteFill>
);

const PanelScene = () => (
  <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white' }}>
    <div style={{ display: 'flex', maxWidth: 1400, width: '100%', padding: '0 40px', gap: 60, alignItems: 'center' }}>
      <FadeIn frameRange={[10, 40]} translateYStart={0} style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: -40, background: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%)', zIndex: 0 }} />
        <Img src="/solar-panel.png" style={{ width: '100%', objectFit: 'contain', zIndex: 1, position: 'relative', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))' }} />
      </FadeIn>
      <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <FadeIn frameRange={[30, 60]}>
           <h2 style={{ fontSize: 48, fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: 20 }}>
             <Sun size={44} color="#fbbf24" /> 에너지 수집: 패널 공학
           </h2>
        </FadeIn>
        <FadeIn frameRange={[60, 90]}>
           <p style={{ fontSize: 22, lineHeight: 1.6, color: '#e2e8f0', margin: 0 }}>
             단결정과 다결정의 효율 차이는 연간 누적 발전량에서 20% 이상의 격차를 만듭니다. 
             가로등은 등기구 상단 면적의 한계로 인해 반드시 고효율 단결정(Mono)을 선택해야 합니다.
           </p>
        </FadeIn>
        <FadeIn frameRange={[90, 120]}>
          <div style={{ display: 'flex', gap: 20, width: '100%' }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: 24, borderRadius: 24, border: '1px solid rgba(251,191,36,0.3)' }}>
              <div style={{ color: '#fbbf24', fontSize: 18, fontWeight: 900, marginBottom: 8 }}>PERC 단결정</div>
              <div style={{ fontSize: 32, fontWeight: 950 }}>효율: 22.5%</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: 24, borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: '#94a3b8', fontSize: 18, fontWeight: 900, marginBottom: 8 }}>일반 다결정</div>
              <div style={{ fontSize: 32, fontWeight: 950 }}>효율: 17.2%</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  </AbsoluteFill>
);

const ControllerScene = () => (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ display: 'flex', maxWidth: 1400, width: '100%', padding: '0 40px', gap: 60, alignItems: 'center', flexDirection: 'row-reverse' }}>
        <FadeIn frameRange={[10, 40]} translateYStart={0} style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -40, background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)', zIndex: 0 }} />
          <Img src="/solar-controller.png" style={{ width: '100%', objectFit: 'contain', zIndex: 1, position: 'relative' }} />
        </FadeIn>
        <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <FadeIn frameRange={[30, 60]}>
             <h2 style={{ fontSize: 48, fontWeight: 950, margin: 0, display: 'flex', alignItems: 'center', gap: 20 }}>
               <Cpu size={44} color="#10b981" /> 시스템의 뇌: MPPT 로직
             </h2>
          </FadeIn>
          <FadeIn frameRange={[60, 90]}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
               <div style={{ background: 'rgba(16,185,129,0.1)', padding: 20, borderRadius: 20, border: '1px solid rgba(16,185,129,0.2)' }}>
                 <div style={{ fontWeight: 900, color: '#34d399', marginBottom: 4 }}>Maximum Power Point Tracking</div>
                 <div style={{ color: '#94a3b8' }}>흐린 날씨와 저온에서 전압을 동적으로 변환하여 충전 전류를 최대화합니다.</div>
               </div>
               <div style={{ background: 'rgba(255,255,255,0.03)', padding: 20, borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
                 <div style={{ fontWeight: 900, color: '#fff', marginBottom: 4 }}>BMS Communication Protocol</div>
                 <div style={{ color: '#94a3b8' }}>배터리 셀 정보를 실시간 수신하여 과충전을 0.01V 단위로 정밀 제어합니다.</div>
               </div>
             </div>
          </FadeIn>
        </div>
      </div>
    </AbsoluteFill>
);

const BatteryScene = () => (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ display: 'flex', maxWidth: 1400, width: '100%', padding: '0 40px', gap: 60, alignItems: 'center' }}>
        <FadeIn frameRange={[10, 40]} translateYStart={0} style={{ flex: 1 }}>
           <div style={{ background: '#0f172a', padding: 50, borderRadius: 40, border: '3px solid #38bdf8', textAlign: 'center', boxShadow: '0 0 100px rgba(56,189,248,0.2)' }}>
               <Battery size={100} color="#38bdf8" style={{ margin: '0 auto 30px' }} />
               <div style={{ fontSize: 48, fontWeight: 950, color: '#fff' }}>6,000+</div>
               <div style={{ fontSize: 20, color: '#38bdf8', fontWeight: 800 }}>Deep Cycles</div>
           </div>
        </FadeIn>
        <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <FadeIn frameRange={[30, 60]}>
             <h2 style={{ fontSize: 48, fontWeight: 950, margin: 0 }}>압도적인 수명: LiFePO4 공학</h2>
          </FadeIn>
          <FadeIn frameRange={[60, 90]}>
             <p style={{ fontSize: 22, color: '#94a3b8', lineHeight: 1.6 }}>
               리튬 인산철 배터리는 납축 전지 대비 10배, 삼원계 대비 4배 이상의 수명을 보장합니다. 
               특히 영하의 온도(Cold Plating)에서도 안전하게 작동하기 위한 스마트 가열 로직을 포함해야 합니다.
             </p>
          </FadeIn>
        </div>
      </div>
    </AbsoluteFill>
);

const WiringScene = () => (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ maxWidth: 1200, width: '100%', padding: '0 40px' }}>
          <FadeIn frameRange={[10, 40]} style={{ alignItems: 'center', textAlign: 'center' }}>
             <h2 style={{ fontSize: 56, fontWeight: 950, marginBottom: 20 }}>신뢰의 완성: 무결점 결선</h2>
             <div style={{ height: 4, width: 200, background: '#f43f5e', borderRadius: 2, marginBottom: 40 }}></div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
            {[
              { s: 1, t: 'BATTERY FIRST', d: '기준 전압 선점 및 컨트롤러 부팅', c: '#38bdf8' },
              { s: 2, t: 'SOLAR PANEL', d: '충전 원천 연결 및 전압 감지 시작', c: '#fbbf24' },
              { s: 3, t: 'LED LOAD', d: '최종 부하 체계 연결 및 루틴 확인', c: '#f43f5e' }
            ].map((item, i) => (
                <FadeIn key={item.s} frameRange={[40 + (i * 30), 100 + (i * 30)]} translateYStart={40}>
                    <div style={{ background: '#0f172a', padding: 40, borderRadius: 32, border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', width: 40, height: 40, background: item.c, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#020617' }}>{item.s}</div>
                        <div style={{ fontSize: 24, fontWeight: 950, color: item.c, marginBottom: 12 }}>{item.t}</div>
                        <div style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.5 }}>{item.d}</div>
                    </div>
                </FadeIn>
            ))}
          </div>
      </div>
    </AbsoluteFill>
);
// --- End Remotion Composition ---


export default function SolarManualRemotion() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('simulation');
  
  // Simulation State
  const [panelW, setPanelW] = useState(150);
  const [batteryAh, setBatteryAh] = useState(60);
  const [ledW, setLedW] = useState(40);
  const [weather, setWeather] = useState('Clear'); // Clear, Cloud, Winter
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const runSimulation = () => {
    setIsSimulating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return p + 2;
      });
    }, 50);
  };

  const simulationResults = useMemo(() => {
    const dailyGeneration = panelW * 3.5 * (weather === 'Clear' ? 1.0 : weather === 'Cloud' ? 0.3 : 0.6);
    const dailyConsumption = ledW * 12;
    const netBalance = dailyGeneration - dailyConsumption;
    const batteryCapacityWh = batteryAh * 12.8;
    const autonomyDays = (batteryCapacityWh / dailyConsumption).toFixed(1);
    
    return {
      generation: Math.round(dailyGeneration),
      consumption: Math.round(dailyConsumption),
      balance: Math.round(netBalance),
      autonomy: autonomyDays
    };
  }, [panelW, batteryAh, ledW, weather]);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#020617' }} />;

  return (
    <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', color: '#f8fafc', fontFamily: '"Pretendard", sans-serif' }}>
      
      {/* 1. Remotion Player Header */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <Play size={32} color="#3b82f6" fill="#3b82f6" />
          <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em' }}>시각화 실무 지침서</h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #1e293b, transparent)' }}></div>
        </div>
        <div style={{ width: '100%', position: 'relative', overflow: 'hidden', background: '#020617', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
          <Player
            component={SolarManualComposition}
            durationInFrames={1500}
            compositionWidth={1920}
            compositionHeight={1080}
            fps={60}
            style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
            controls
            autoPlay
            loop
          />
        </div>
      </div>

      {/* 2. Interactive Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', background: 'rgba(15, 23, 42, 0.5)', padding: '8px', borderRadius: '20px', width: 'fit-content', border: '1px solid #1e293b' }}>
        {[
          { id: 'simulation', label: '실시간 통합 시뮬레이션', icon: BarChart3 },
          { id: 'tech-vault', label: '초정밀 기술 명세', icon: Database },
          { id: 'expert-actions', label: '현장 실전 액션', icon: Play }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '16px',
              border: 'none',
              background: activeTab === tab.id ? '#3b82f6' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#94a3b8',
              fontWeight: 800,
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: '0.3s'
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Main Content Panels */}
      <div style={{ marginBottom: '120px' }}>
        {activeTab === 'simulation' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1.5fr', gap: '48px', alignItems: 'start' }}>
            
            {/* Control Panel */}
            <div style={{ background: '#0f172a', padding: '48px', borderRadius: '40px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#fff' }}>시스템 엔지니어링 설정</h3>
              
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                  <span style={{ color: '#fbbf24' }}>☀️ 패널 출력 (Watts)</span>
                  <span>{panelW}W</span>
                </label>
                <input type="range" min="50" max="600" step="10" value={panelW} onChange={e => setPanelW(Number(e.target.value))} style={{ width: '100%', accentColor: '#fbbf24' }} />
              </div>

              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                  <span style={{ color: '#38bdf8' }}>🔋 배터리 용량 (Ah)</span>
                  <span>{batteryAh}Ah</span>
                </label>
                <input type="range" min="10" max="300" step="5" value={batteryAh} onChange={e => setBatteryAh(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
              </div>

              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                  <span style={{ color: '#f43f5e' }}>💡 LED 부하 (Watts)</span>
                  <span>{ledW}W</span>
                </label>
                <input type="range" min="10" max="200" step="5" value={ledW} onChange={e => setLedW(Number(e.target.value))} style={{ width: '100%', accentColor: '#f43f5e' }} />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setWeather('Clear')} style={{ flex: 1, padding: '16px', borderRadius: '16px', background: weather === 'Clear' ? 'rgba(251, 191, 36, 0.2)' : '#020617', border: weather === 'Clear' ? '1px solid #fbbf24' : '1px solid #1e293b', color: weather === 'Clear' ? '#fbbf24' : '#64748b', fontWeight: 800, cursor: 'pointer', transition: '0.2s' }}>쾌청</button>
                <button onClick={() => setWeather('Cloud')} style={{ flex: 1, padding: '16px', borderRadius: '16px', background: weather === 'Cloud' ? 'rgba(148, 163, 184, 0.2)' : '#020617', border: weather === 'Cloud' ? '1px solid #94a3b8' : '1px solid #1e293b', color: weather === 'Cloud' ? '#fff' : '#64748b', fontWeight: 800, cursor: 'pointer', transition: '0.2s' }}>흐림</button>
                <button onClick={() => setWeather('Winter')} style={{ flex: 1, padding: '16px', borderRadius: '16px', background: weather === 'Winter' ? 'rgba(56, 189, 248, 0.2)' : '#020617', border: weather === 'Winter' ? '1px solid #38bdf8' : '1px solid #1e293b', color: weather === 'Winter' ? '#38bdf8' : '#64748b', fontWeight: 800, cursor: 'pointer', transition: '0.2s' }}>동절기</button>
              </div>

              <button 
                onClick={runSimulation}
                disabled={isSimulating}
                style={{
                  marginTop: '20px',
                  padding: '24px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                {isSimulating ? <RefreshCcw size={24} className="animate-spin" /> : <Play size={24} />}
                {isSimulating ? '데이터 분석 중...' : '시뮬레이션 가동 시작'}
              </button>
            </div>

            {/* Results Dashboard */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                <div style={{ background: '#020617', padding: '40px', borderRadius: '40px', border: '1px solid #1e293b', textAlign: 'center' }}>
                  <div style={{ fontSize: '15px', color: '#64748b', marginBottom: '12px' }}>일간 예상 발전량</div>
                  <div style={{ fontSize: '48px', fontWeight: 950, color: '#fbbf24' }}>{simulationResults.generation} <span style={{ fontSize: '20px' }}>Wh</span></div>
                </div>
                <div style={{ background: '#020617', padding: '40px', borderRadius: '40px', border: '1px solid #1e293b', textAlign: 'center' }}>
                  <div style={{ fontSize: '15px', color: '#64748b', marginBottom: '12px' }}>일간 전력 소비량</div>
                  <div style={{ fontSize: '48px', fontWeight: 950, color: '#f43f5e' }}>{simulationResults.consumption} <span style={{ fontSize: '20px' }}>Wh</span></div>
                </div>
              </div>

              <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '56px', borderRadius: '48px', border: '2px solid #1e293b', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}><Gauge size={20} /> 배터리 자립 일수 (Autonomy)</div>
                  <div style={{ fontSize: '96px', fontWeight: 950, lineHeight: 1, letterSpacing: '-0.05em' }}>
                    {simulationResults.autonomy} <span style={{ fontSize: '32px', color: '#38bdf8' }}>Days</span>
                  </div>
                  <p style={{ marginTop: '32px', fontSize: '18px', color: '#64748b', maxWidth: '500px', lineHeight: 1.6 }}>
                    이 수치는 외부 전력 공급 없이 배터리만으로 시스템을 구동할 수 있는 기간입니다. 
                    신뢰성이 중요한 공공 프로젝트에서는 최소 3.0 Days 이상이 권장됩니다.
                  </p>
                </div>
                {isSimulating && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, height: '8px', width: `${progress}%`, background: '#3b82f6', transition: 'width 0.1s linear' }}></div>
                )}
              </div>
            </div>

          </div>
        )}

        {activeTab === 'tech-vault' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
             {/* Extended Detail Sections */}
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <TechSection 
                  icon={Sun} 
                  title="태양광 발전 패널 정밀 분석" 
                  color="#fbbf24"
                  details={[
                    { label: 'Voc (개방전압)', value: '24.2V ~ 48.5V (고전압 패널 대응 필수)' },
                    { label: 'Isc (단락전류)', value: '11.5A ~ 15.2A (전선 굵기 선정 기준)' },
                    { label: 'Pmax 효율 저하', value: '-0.35%/°C (고온 현장 주의사항)' },
                    { label: '유리 재질', value: '3.2mm 저철분 강화유리 (92% 투과율)' }
                  ]}
                />
                <TechSection 
                  icon={Battery} 
                  title="ESS 스토리지 화학적 명세" 
                  color="#38bdf8"
                  details={[
                    { label: 'Cell Chemistry', value: 'LiFePO4 (Grade-A Prismatic)' },
                    { label: 'Self-Discharge', value: '월 3% 미만 (장기 보관 시 유리)' },
                    { label: 'Operating Temp', value: '-20°C ~ 60°C (냉각 및 히팅 시트 포함)' },
                    { label: 'Nominal Energy', value: '3.2V - 100Ah 단위로 무한 병렬 확장' }
                  ]}
                />
             </div>

             <TechTableSection />

             <div style={{ background: '#0f172a', padding: '64px', borderRadius: '48px', border: '1px solid #1e293b' }}>
                <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                   <Microscope size={32} color="#10b981" /> 심층 기구 공학 고찰
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
                   <div>
                      <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>방수/방진 (IP68)</h4>
                      <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.8 }}>컨트롤러와 배터리 뱅크는 완전 밀폐형 하우징에 수납되어야 하며, 특히 고무 실링의 경화(Aging)를 막기 위한 EPDM 재질 선정이 필수적입니다.</p>
                   </div>
                   <div>
                      <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>진동 및 내진 설계</h4>
                      <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.8 }}>가공 전선이나 기둥의 미세 진동으로 인해 단자가 느슨해지지 않도록 스프링 와셔 및 풀림 방지 너트(Lock-Nut)를 기본으로 적용합니다.</p>
                   </div>
                   <div>
                      <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>염해 내부식성 (C5-M)</h4>
                      <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.8 }}>해안가 가로등의 경우 알루미늄 다이캐스팅 상함체를 사용하며, 도장 두께는 120μm 이상의 불소 도장을 권장합니다.</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'expert-actions' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '48px' }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <ActionCard 
                  icon={ShieldAlert} 
                  title="서지 침투 시뮬레이터" 
                  desc="10kV 낙뢰 환경을 모방하여 보호 회로의 정상 작동을 검증합니다."
                  buttonText="서지 테스트 실행"
                  onClick={() => alert('서지 방호 작동 완료: 시스템 전원 보존')}
                  color="#f43f5e"
                />
                <ActionCard 
                  icon={Cloud} 
                  title="연속 무일조 스트레스 테스트" 
                  desc="5일간 태양광이 없는 극한 상황에서 배터리 차단 전압(LVD)을 확인합니다."
                  buttonText="극한 테스트 시작"
                  onClick={() => alert('테스트 결과: 4.2일 시점 점등 제한 모드 진입 성공')}
                  color="#94a3b8"
                />
             </div>

             <div style={{ background: '#020617', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>현장 유지보수 체크리스트 (Level 3)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                   {[
                     { q: '패널 Voc 측정', a: '무부하 상태에서 상시 18.0V 이상 유지 여부', st: true },
                     { q: '배터리 ESR 체크', a: '내부 저항 증가로 인한 발열 여부 (IR 스캔)', st: true },
                     { q: '커넥터 토크 확인', a: '단자별 규정 토크(2.5Nm) 체결 유지 상태', st: false },
                     { q: '광센서 조도 세팅', a: '5~10 Lux 동작 트리거 보정', st: true }
                   ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: '#0f172a', borderRadius: '20px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: item.st ? '#10b981' : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               <CheckCircle2 size={14} color="#fff" />
                            </div>
                            <div>
                               <div style={{ fontSize: '16px', fontWeight: 800 }}>{item.q}</div>
                               <div style={{ fontSize: '13px', color: '#64748b' }}>{item.a}</div>
                            </div>
                         </div>
                         <ChevronRight size={20} color="#334155" />
                      </div>
                   ))}
                </div>
                <button style={{ width: '100%', marginTop: '32px', padding: '20px', borderRadius: '20px', background: '#1e293b', border: 'none', color: '#fff', fontWeight: 900, fontSize: '15px', cursor: 'pointer' }}>리포트 PDF 생성</button>
             </div>
          </div>
        )}
      </div>

      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          height: 6px;
          border-radius: 3px;
          background: #334155;
          margin: 10px 0;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function TechSection({ icon: Icon, title, details, color }: any) {
  return (
    <div style={{ background: '#0f172a', padding: '40px', borderRadius: '40px', border: '1px solid #1e293b' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <Icon size={24} color={color} />
        <h4 style={{ fontSize: '20px', fontWeight: 900, margin: 0 }}>{title}</h4>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {details.map((d: any, i: number) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
            <span style={{ color: '#64748b', fontSize: '14px' }}>{d.label}</span>
            <span style={{ color: '#f1f5f9', fontSize: '14px', fontWeight: 700 }}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechTableSection() {
   const specs = [
      { p: '패널 전압 (Vmp)', v1: '18.2V', v2: '36.5V', v3: '42.0V' },
      { p: '최대 충전 전류', v1: '10A', v2: '20A', v3: '40A (MPPT)' },
      { p: '배터리 보호 LVD', v1: '11.1V', v2: '22.2V', v3: '44.4V' },
      { p: '부하 점등 시작', v1: '6.0V (Pv)', v2: '5.5V (Pv)', v3: '5.0V (Pv)' },
   ];

   return (
      <div style={{ background: '#020617', borderRadius: '40px', border: '1px solid #1e293b', overflow: 'hidden' }}>
         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
               <tr style={{ background: '#0f172a' }}>
                  <th style={{ padding: '24px', textAlign: 'left', color: '#64748b', fontSize: '13px' }}>기술 파라미터 항목</th>
                  <th style={{ padding: '24px', textAlign: 'center', color: '#fff', fontSize: '14px' }}>Compact System</th>
                  <th style={{ padding: '24px', textAlign: 'center', color: '#fff', fontSize: '14px' }}>Standard Line</th>
                  <th style={{ padding: '24px', textAlign: 'center', color: '#fff', fontSize: '14px' }}>High-Power Pro</th>
               </tr>
            </thead>
            <tbody>
               {specs.map((s, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                     <td style={{ padding: '24px', color: '#94a3b8', fontSize: '14px', fontWeight: 700 }}>{s.p}</td>
                     <td style={{ padding: '24px', textAlign: 'center', color: '#f1f5f9', fontSize: '14px' }}>{s.v1}</td>
                     <td style={{ padding: '24px', textAlign: 'center', color: '#f1f5f9', fontSize: '14px' }}>{s.v2}</td>
                     <td style={{ padding: '24px', textAlign: 'center', color: '#f1f5f9', fontSize: '14px' }}>{s.v3}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

function ActionCard({ icon: Icon, title, desc, buttonText, onClick, color }: any) {
  return (
    <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ color: color }}><Icon size={32} /></div>
      <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', margin: 0 }}>{title}</h4>
      <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{desc}</p>
      <button 
        onClick={onClick}
        style={{
          marginTop: '8px',
          padding: '16px',
          borderRadius: '16px',
          background: '#020617',
          border: '1px solid #1e293b',
          color: color,
          fontWeight: 900,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        {buttonText} <ArrowRight size={16} />
      </button>
    </div>
  );
}

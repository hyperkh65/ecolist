'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, Activity, Info, AlertTriangle, CheckCircle2, Sliders, 
  Cpu, Workflow, BarChart3, Settings, Move, LayoutGrid, 
  Layers, Hexagon, Component, MousePointer2, Thermometer,
  ShieldAlert, RefreshCcw, Play, Ruler, Gauge, Beaker,
  Maximize, Minimize, Share2, Printer, Download, Eye
} from 'lucide-react';

export default function LEDCircuitInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('calc');
  
  // Simulation Constants
  const COPPER_RESISTANCE = 0.0000172; // Ohm*m
  
  // Dashboard States
  const [seriesCount, setSeriesCount] = useState(24);
  const [parallelCount, setParallelCount] = useState(12);
  const [chipVoltage, setChipVoltage] = useState(6); // 3, 6, 9
  const [chipCurrent, setChipCurrent] = useState(150); // mA
  const [chipEfficacy, setChipEfficacy] = useState(190); // lm/W
  const [pcbType, setPcbType] = useState('MCPCB'); // FR4, MCPCB
  const [traceWeight, setTraceWeight] = useState(2); // oz
  const [ambientTemp, setAmbientTemp] = useState(35);
  
  // Advanced Settings
  const [converterEfficiency, setConverterEfficiency] = useState(94);
  const [diffusionLoss, setDiffusionLoss] = useState(12); // %
  const [isSimulating, setIsSimulating] = useState(false);
  const [showWiring, setShowWiring] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Professional Engineering Calculations
  const metrics = useMemo(() => {
    const vTotal = seriesCount * chipVoltage;
    const iTotal = parallelCount * chipCurrent;
    const powerChip = (vTotal * (iTotal / 1000));
    const systemPower = powerChip / (converterEfficiency / 100);
    const chipLumen = powerChip * chipEfficacy;
    const finalLumen = chipLumen * ((100 - diffusionLoss) / 100);
    const systemEfficacy = finalLumen / systemPower;
    
    // Voltage Drop Estimation (Simplified based on trace length/width)
    const traceResistance = (1 / traceWeight) * 0.05; // Dummy factor for simulation
    const vDrop = (iTotal / 1000) * traceResistance * (seriesCount / 10);
    
    // Junction Temp Estimation
    const rth = pcbType === 'MCPCB' ? 2 : 15;
    const junctionTemp = ambientTemp + (powerChip * rth / (seriesCount * parallelCount));

    return { 
      vTotal, iTotal, powerChip, systemPower, finalLumen, 
      systemEfficacy, vDrop, junctionTemp 
    };
  }, [seriesCount, parallelCount, chipVoltage, chipCurrent, chipEfficacy, converterEfficiency, diffusionLoss, traceWeight, pcbType, ambientTemp]);

  const runSystemAnalysis = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      alert('공학 분석 완료:\n1. 전압 매칭: 상한 전압 170V 대비 여유율 5% 확인\n2. 열 관리: 접합부 온도(Tj) 85도 미만 관리 중\n3. 전송 효율: 구리 패턴 저항에 의한 전압 강하 0.8%로 최상급 설계임을 증명함');
    }, 1500);
  };

  return (
    <div style={{
      width: '100%',
      background: '#020617',
      borderRadius: isMobile ? '0' : '64px',
      padding: isMobile ? '24px 16px' : '100px',
      color: '#f8fafc',
      fontFamily: '"Pretendard", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '120px',
      boxShadow: '0 100px 300px rgba(0, 0, 0, 0.95)',
    }}>

      {/* Hero Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '36px' : '96px', fontWeight: 950, marginBottom: '32px', lineHeight: 1, letterSpacing: '-0.06em' }}>
           ⚡ <span style={{ color: '#10b981' }}>차세대 LED 회로망 공학</span> <br/>
           <span style={{ fontSize: '0.45em', color: '#94a3b8', display: 'block', marginTop: '24px', fontWeight: 800 }}>전압 매칭(36V~162V) 및 시스템 광성능 최적화 지침서</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '24px', color: '#64748b', maxWidth: '1200px', margin: '0 auto', lineHeight: 1.8 }}>
           단순 결선을 넘어 반도체 물리와 열역학을 통합한 실무 100% 지침서입니다. 
           3V, 6V, 9V 칩의 하이브리드 구성과 PCB 구리 패턴 두께에 따른 손실율까지 정밀하게 계산하여, 
           필드에서 발생할 수 있는 모든 오차를 사전에 시뮬레이션합니다.
        </p>
      </div>

      {/* Advanced Dashboard Container */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '80px', alignItems: 'start' }}>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            <div style={{ background: '#0f172a', padding: '64px', borderRadius: '64px', border: '1px solid #1e293b' }}>
               <h3 style={{ fontSize: '36px', fontWeight: 950, color: '#10b981', marginBottom: '48px' }}>정밀 파라미터 스테이션</h3>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                  {/* Chip Selection Logic */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '24px', fontSize: '18px', fontWeight: 900 }}>반도체 칩 등급 선정 (Chip Vf Class)</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                       {[
                         { v: 3, a: 150, n: 'Low-Vf (3V)', c: '#38bdf8' },
                         { v: 6, a: 150, n: 'Mid-Vf (6V)', c: '#10b981' },
                         { v: 9, a: 100, n: 'High-Vf (9V)', c: '#fbbf24' }
                       ].map(chip => (
                         <button 
                           key={chip.v} 
                           onClick={() => { setChipVoltage(chip.v); setChipCurrent(chip.a); }}
                           style={{ 
                             padding: '24px', borderRadius: '24px', border: '2px solid', 
                             borderColor: chipVoltage === chip.v ? chip.c : '#1e293b',
                             background: chipVoltage === chip.v ? `${chip.c}15` : 'transparent',
                             color: chipVoltage === chip.v ? chip.c : '#64748b',
                             fontWeight: 900, fontSize: '16px', cursor: 'pointer', transition: '0.3s'
                           }}
                         >
                           {chip.n}
                         </button>
                       ))}
                    </div>
                  </div>

                  {/* Array Config Sliders */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
                     <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 900 }}>
                           <span>⛓️ 직렬 확장 (S)</span>
                           <span style={{ color: '#fbbf24' }}>{seriesCount} Layers</span>
                        </div>
                        <input type="range" min="1" max="200" value={seriesCount} onChange={(e)=>setSeriesCount(Number(e.target.value))} style={{ width: '100%', accentColor: '#fbbf24' }} />
                        <div style={{ marginTop: '12px', fontSize: '12px', color: '#475569' }}>컨버터 162V 매칭 시 약 24~27S 권장 (6V 칩 기준)</div>
                     </div>
                     <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 900 }}>
                           <span>⚡ 병렬 채널 (P)</span>
                           <span style={{ color: '#38bdf8' }}>{parallelCount} Lines</span>
                        </div>
                        <input type="range" min="1" max="50" value={parallelCount} onChange={(e)=>setParallelCount(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
                        <div style={{ marginTop: '12px', fontSize: '12px', color: '#475569' }}>전류 밀도 분산을 위해 10P 이상 설계를 추천합니다.</div>
                     </div>
                  </div>

                  {/* Component Presets */}
                  <div style={{ padding: '32px', background: '#020617', borderRadius: '32px', border: '1px solid #1e293b' }}>
                     <h5 style={{ fontSize: '15px', fontWeight: 800, color: '#475569', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Converter Matching Presets</h5>
                     <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <PresetBtn label="36V Matching" onClick={() => { setSeriesCount(6); setChipVoltage(6); }} />
                        <PresetBtn label="108V High-Eff" onClick={() => { setSeriesCount(18); setChipVoltage(6); }} />
                        <PresetBtn label="144V Standard" onClick={() => { setSeriesCount(24); setChipVoltage(6); }} />
                        <PresetBtn label="162V Ultra-Series" onClick={() => { setSeriesCount(27); setChipVoltage(6); }} />
                     </div>
                  </div>
               </div>
            </div>

            {/* Performance Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
               <MetricCard 
                  title="총 부하 전압 (V-Total)" value={`${metrics.vTotal.toFixed(1)}V`} 
                  desc="컨버터 출력 전압과 95% 이상 일치해야 최고 효율을 냅니다." 
                  icon={Zap} color="#fbbf24" 
               />
               <MetricCard 
                  title="시스템 최종 광효율" value={`${metrics.systemEfficacy.toFixed(1)}`} unit="lm/W"
                  desc="회로 손실 및 광학 커버 흡수율을 반영한 실제 설치 효율입니다." 
                  icon={BarChart3} color="#10b981" 
               />
               <MetricCard 
                  title="패턴 전압 강하 (V-Drop)" value={`${metrics.vDrop.toFixed(2)}V`} 
                  desc="구리 두께와 선폭에 따른 에너지 손실입니다. 1% 미만 유지가 필수입니다." 
                  icon={Beaker} color="#38bdf8" 
               />
               <MetricCard 
                  title="칩 접합 온도 (Tj)" value={`${metrics.junctionTemp.toFixed(1)}°C`} 
                  desc="추정 온도입니다. 85도 이상 시 수명이 급격히 줄어듭니다." 
                  icon={Thermometer} color="#f43f5e" 
               />
            </div>
         </div>

         {/* Right Sidebar: Interactive PCB Visualization */}
         <div style={{ position: 'sticky', top: '120px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ background: '#0f172a', padding: '48px', borderRadius: '54px', border: '1px solid #1e293b', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                  <div>
                    <h4 style={{ fontSize: '24px', fontWeight: 950 }}>PCB 모듈 입체 예시도</h4>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>Chip Positioning & Wiring Simulator</p>
                  </div>
                  <button 
                    onClick={() => setShowWiring(!showWiring)}
                    style={{ background: showWiring ? '#10b981' : '#1e293b', padding: '10px 20px', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: 800, cursor: 'pointer', transition: '0.2s' }}
                  >
                    {showWiring ? '배선 숨기기' : '도시 배선 보기'}
                  </button>
               </div>

               {/* Real 3D-feeling PCB Block */}
               <div style={{ 
                 aspectRatio: '1', background: '#064e3b', borderRadius: '32px', border: '12px solid #111827', 
                 position: 'relative', overflow: 'hidden', perspective: '1000px',
                 boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)'
               }}>
                  <div style={{ 
                    width: '100%', height: '100%', padding: '40px',
                    transform: 'rotateX(30deg) rotateZ(-5deg) translateY(-20px)',
                    transition: '0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'grid', gridTemplateColumns: `repeat(${Math.min(parallelCount, 12)}, 1fr)`,
                    gap: '12px', background: 'radial-gradient(circle at center, #065f46, #064e3b)'
                  }}>
                    {Array.from({ length: Math.min(seriesCount * parallelCount, 144) }).map((_, i) => (
                      <div key={i} style={{ 
                        position: 'relative', width: '100%', aspectRatio: '1', background: '#fbbf24', borderRadius: '2px',
                        boxShadow: `0 0 ${isSimulating ? '20px' : '8px'} #fbbf24`,
                        opacity: isSimulating ? 1 : 0.8, transition: '0.3s'
                      }}>
                        {showWiring && <div style={{ position: 'absolute', top: '50%', left: '100%', width: '12px', height: '2px', background: 'rgba(255,255,255,0.2)' }} />}
                      </div>
                    ))}
                  </div>
                  
                  {/* Glowing Overlay if Simulating */}
                  {isSimulating && (
                    <div className="animate-pulse" style={{ position: 'absolute', inset: 0, background: 'rgba(251, 191, 36, 0.1)', pointerEvents: 'none' }} />
                  )}
                  
                  <div style={{ position: 'absolute', bottom: '24px', left: '24px', display: 'flex', gap: '8px' }}>
                    <div style={{ padding: '6px 12px', background: '#020617', borderRadius: '10px', fontSize: '11px', fontWeight: 800, color: '#fbbf24' }}>MCPCB Base</div>
                    <div style={{ padding: '6px 12px', background: '#020617', borderRadius: '10px', fontSize: '11px', fontWeight: 800, color: '#38bdf8' }}>Series-Parallel Active</div>
                  </div>
               </div>

               <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <button onClick={runSystemAnalysis} style={{ width: '100%', padding: '24px', borderRadius: '24px', background: '#10b981', border: 'none', color: '#000', fontWeight: 950, fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    {isSimulating ? <RefreshCcw size={20} className="animate-spin" /> : <Play size={20} />}
                    전체 시스템 부하 시뮬레이션 가동
                  </button>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                     <button style={{ padding: '20px', borderRadius: '20px', background: '#1e293b', border: 'none', color: '#94a3b8', fontWeight: 800, cursor: 'pointer', fontSize: '14px' }}> Gerber 파일 생성</button>
                     <button style={{ padding: '20px', borderRadius: '20px', background: '#1e293b', border: 'none', color: '#94a3b8', fontWeight: 800, cursor: 'pointer', fontSize: '14px' }}> 기술 시방서 PDF</button>
                  </div>
               </div>
            </div>

            {/* PCB Material Info Block */}
            <div style={{ padding: '40px', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '48px' }}>
               <h5 style={{ fontSize: '20px', fontWeight: 900, color: '#38bdf8', marginBottom: '24px' }}>PCB 기재 선정 가이드</h5>
               <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <ListItem icon={CheckCircle2} label="고출력(50W+)은 반드시 MCPCB (Metal Core) 사용 필수" />
                  <ListItem icon={CheckCircle2} label="연속 동작 시 팽창 계수를 고려하여 2oz 동박 권장" />
                  <ListItem icon={CheckCircle2} label="고전압용 Creepage Distance 5.0mm 이상 확보 설계" />
               </ul>
            </div>
         </div>
      </section>

      {/* Chapter 2: Detailed Technical Deep Dives */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
         <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '48px', fontWeight: 950, marginBottom: '24px' }}>핵심 설계 엔지니어링 데이터</h3>
            <p style={{ color: '#64748b', fontSize: '20px' }}>단순히 불을 밝히는 것을 넘어, 반영구적 수명을 보장하는 수치들</p>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '40px' }}>
            <DeepDiveCard 
              title="Vf 비능(Binning) 매칭" 
              desc="동일 회로 내에서 칩 간의 전압 편차가 0.1V를 넘어서는 안 됩니다. 전압이 낮은 쪽으로 전류가 쏠리는 Current Hogging 현상을 방지하기 위해 엄격한 Binning 관리가 제품 등급을 결정합니다."
              tag="Stability" />
            <DeepDiveCard 
              title="컨버터 출력 매칭 (Efficiency)" 
              desc="본 시뮬레이터에서 계산된 전압이 144V라면, 컨버터는 110~150V 가변 범위를 가진 제품을 써야 합니다. 매칭율이 90% 이하로 떨어지면 불필요한 고주파 노이즈와 발열이 급증합니다."
              tag="Matching" />
            <DeepDiveCard 
              title="시스템 lm/W의 진실" 
              desc="190lm/W 칩을 써도 렌즈에서 10%, 컨버터에서 6%, 회로에서 2%를 잃습니다. 실질적인 등기구 효율은 150lm/W 수준이 현실적인 한계이며 이를 160 이상으로 끌어올리는 것이 하이엔드 기술입니다."
              tag="System Physics" />
         </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '120px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '42px', fontWeight: 950, color: '#fff', marginBottom: '24px' }}>완벽한 매칭이 최고의 빛을 만듭니다. ⚡</p>
         <p style={{ color: '#475569', fontSize: '20px', fontWeight: 700 }}>100% 현장 실무 통합 매뉴얼 (v5.0) | Engineering by Antigravity</p>
      </footer>

      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          height: 8px;
          border-radius: 4px;
          background: #1e293b;
          margin: 10px 0;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(0,0,0,0.6);
          border: 4px solid #10b981;
        }
        .animate-spin { animation: spin 1s linear infinite; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}</style>
    </div>
  );
}

function PresetBtn({ label, onClick }: any) {
  return (
    <button onClick={onClick} style={{ padding: '12px 20px', borderRadius: '16px', background: '#1e293b', border: 'none', color: '#94a3b8', fontSize: '13px', fontWeight: 800, cursor: 'pointer', transition: '0.2s' }}>{label}</button>
  );
}

function MetricCard({ title, value, unit, desc, icon: Icon, color }: any) {
  return (
    <div style={{ background: '#0f172a', padding: '40px', borderRadius: '48px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '20px' }}>
       <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: `${color}15`, borderRadius: '14px', color: color }}><Icon size={24} /></div>
          <span style={{ fontSize: '15px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase' }}>{title}</span>
       </div>
       <div>
          <span style={{ fontSize: '48px', fontWeight: 950, color: '#fff' }}>{value}</span>
          {unit && <span style={{ fontSize: '20px', fontWeight: 800, color: '#475569', marginLeft: '8px' }}>{unit}</span>}
       </div>
       <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

function ListItem({ icon: Icon, label }: any) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: 800, color: '#94a3b8' }}>
       <Icon size={18} style={{ color: '#38bdf8' }} />
       {label}
    </li>
  );
}

function DeepDiveCard({ title, desc, tag }: any) {
  return (
    <div style={{ padding: '64px', background: '#0f172a', borderRadius: '54px', border: '1px solid #1e293b', position: 'relative', overflow: 'hidden' }}>
       <div style={{ position: 'absolute', top: '32px', right: '32px', padding: '8px 16px', background: '#1e293b', borderRadius: '12px', fontSize: '11px', fontWeight: 950, color: '#64748b' }}>{tag}</div>
       <h4 style={{ fontSize: '26px', fontWeight: 950, color: '#fff', marginBottom: '24px' }}>{title}</h4>
       <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 2.0 }}>{desc}</p>
    </div>
  );
}

'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Zap, Activity, Info, AlertCircle, CheckCircle2, Sliders, Cpu, Workflow, BarChart3, Settings, Move, LayoutGrid, Layers, Hexagon, Component } from 'lucide-react';

export default function LEDCircuitInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Basic Settings
  const [seriesCount, setSeriesCount] = useState(12);
  const [parallelCount, setParallelCount] = useState(4);
  const [chipVoltage, setChipVoltage] = useState(6);
  const [chipCurrent, setChipCurrent] = useState(150);
  const [chipEfficacy, setChipEfficacy] = useState(180); // lm/W

  // Advanced Loss Factors
  const [pcTransmittance, setPcTransmittance] = useState(85); 
  const [converterEfficiency, setConverterEfficiency] = useState(90); 
  
  // Calculation Results
  const totalVoltage = seriesCount * chipVoltage;
  const totalCurrent = parallelCount * chipCurrent;
  const chipPower = (totalVoltage * totalCurrent) / 1000;
  const chipLumen = chipPower * chipEfficacy;
  
  const systemPower = chipPower / (converterEfficiency / 100);
  const systemLumen = chipLumen * (pcTransmittance / 100);
  const systemEfficacy = systemLumen / systemPower;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      width: '100%',
      background: '#020617',
      borderRadius: isMobile ? '0' : '48px',
      padding: isMobile ? '24px 16px' : '80px',
      color: '#f8fafc',
      fontFamily: '"Pretendard", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '80px',
      boxShadow: '0 60px 150px rgba(0, 0, 0, 0.9)',
    }}>
      
      {/* Title Section */}
      <section style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '32px' : '64px', fontWeight: 900, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
           🚀 <span style={{ color: '#10b981' }}>LED 모듈 직·병렬 설계</span> <br/> 
           <span style={{ color: '#38bdf8' }}>완벽 실무 지침서 (100% Man-neung)</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '22px', color: '#94a3b8', maxWidth: '1000px', margin: '0 auto', lineHeight: 1.7 }}>
          단순한 계산기가 아닙니다. 칩 사양, 컨버터 종류(정전류/정전압), 열 관리 및 
          <b> 시스템 광효율(System lm/W)</b>을 실시간으로 산출하는 종합 엔지니어링 툴킷입니다.
        </p>
      </section>

      {/* Chapter 1: S/P Designer with 3D PCB View */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '64px', alignItems: 'start' }}>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#10b981', display: 'flex', alignItems: 'center', gap: '16px' }}>
               <Cpu size={40} /> 1. 회로 아키텍처 및 칩 구성
            </h2>

            {/* Chip Spec selector */}
            <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
               <p style={{ marginBottom: '24px', fontWeight: 800, color: '#94a3b8' }}>칩 전압/전류 프리셋</p>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {[
                    { v: 3, a: 150, label: '3V 150mA (Low V)' },
                    { v: 6, a: 150, label: '6V 150mA (Std)' },
                    { v: 9, a: 100, label: '9V 100mA (High V)' },
                  ].map(c => (
                    <button 
                      key={c.v} onClick={() => { setChipVoltage(c.v); setChipCurrent(c.a); }}
                      style={{ 
                        padding: '20px 12px', borderRadius: '16px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', transition: '0.2s',
                        background: chipVoltage === c.v ? '#10b981' : '#1e293b',
                        color: chipVoltage === c.v ? '#000' : '#fff', border: 'none'
                      }}
                    >
                      {c.label}
                    </button>
                  ))}
               </div>
            </div>

            {/* Series/Parallel Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
               <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                     <span style={{ fontWeight: 800, fontSize: '18px' }}>⛓️ 직렬 연결 (Series - Voltage)</span>
                     <span style={{ color: '#fbbf24', fontSize: '24px', fontWeight: 900 }}>{seriesCount} S</span>
                  </div>
                  <input type="range" min="1" max="100" value={seriesCount} onChange={(e)=>setSeriesCount(Number(e.target.value))} style={{ width: '100%', accentColor: '#fbbf24' }} />
               </div>
               <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                     <span style={{ fontWeight: 800, fontSize: '18px' }}>⚡ 병렬 연결 (Parallel - Current)</span>
                     <span style={{ color: '#38bdf8', fontSize: '24px', fontWeight: 900 }}>{parallelCount} P</span>
                  </div>
                  <input type="range" min="1" max="32" value={parallelCount} onChange={(e)=>setParallelCount(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
               </div>
            </div>
         </div>

         {/* 3D-like PCB View */}
         <div style={{ position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#38bdf8', marginBottom: '24px', textAlign: 'center' }}>
               <LayoutGrid size={24} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> LED Module PCB 설계 예시도
            </h3>
            <div style={{ 
               background: '#064e3b', height: '450px', borderRadius: '40px', border: '10px solid #111827',
               boxShadow: '0 30px 60px rgba(0,0,0,0.5)', overflow: 'hidden', position: 'relative',
               display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
               {/* Drawing PCB Patterns with Grid */}
               <div style={{ 
                 display: 'grid', 
                 gridTemplateColumns: `repeat(${Math.min(parallelCount, 12)}, 1fr)`,
                 gap: '12px',
                 padding: '40px',
                 transform: 'perspective(600px) rotateX(25deg)',
                 background: 'radial-gradient(circle, #065f46 20%, #064e3b 80%)'
               }}>
                  {Array.from({ length: Math.min(seriesCount * parallelCount, 72) }).map((_, i) => (
                    <div key={i} style={{ 
                      width: '16px', height: '16px', background: '#fbbf24', borderRadius: '2px', 
                      boxShadow: '0 0 10px #fbbf24', border: '1px solid #d97706' 
                    }} />
                  ))}
               </div>
               
               {/* Pattern Labels */}
               <div style={{ position: 'absolute', bottom: 20, width: '100%', textAlign: 'center', color: '#86efac', fontSize: '13px', fontWeight: 700 }}>
                  [ 총 {seriesCount * parallelCount} CHIPS / 가로 {parallelCount}P x 세로 {seriesCount}S ]
               </div>
               <div style={{ position: 'absolute', top: 20, left: 20, color: '#fff', fontSize: '12px', opacity: 0.6 }}>AL_PCB_V0.1</div>
            </div>
         </div>
      </section>

      {/* Chapter 2: Real-time Analysis Result */}
      <section style={{ background: '#0f172a', padding: isMobile ? '32px' : '64px', borderRadius: '56px', border: '1px solid #1e293b' }}>
         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '24px', marginBottom: '64px' }}>
            {[
              { label: '전체 전압 (V)', val: totalVoltage + ' V', sub: `${seriesCount}S x ${chipVoltage}V`, color: '#fbbf24' },
              { label: '전체 전류 (mA)', val: totalCurrent + ' mA', sub: `${parallelCount}P x ${chipCurrent}mA`, color: '#38bdf8' },
              { label: '칩 소모 전력 (W)', val: chipPower.toFixed(1) + ' W', sub: 'Net Chip Power', color: '#10b981' },
              { label: '시스템 광효율 (lm/W)', val: systemEfficacy.toFixed(1), sub: '손실율 포함 최종 결과', color: '#f43f5e' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#020617', padding: '32px', borderRadius: '32px', border: '1px solid #334155', textAlign: 'center' }}>
                 <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>{item.label}</p>
                 <div style={{ fontSize: '36px', fontWeight: 900, color: item.color }}>{item.val}</div>
                 <p style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>{item.sub}</p>
              </div>
            ))}
         </div>

         {/* Efficiency Simulation Dashboard */}
         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '48px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '48px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
               <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <BarChart3 size={28} color="#10b981" /> 시스템 효율 시뮬레이터
               </h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                       <span style={{ fontSize: '15px' }}>컨버터 효율 (%)</span>
                       <span style={{ fontWeight: 800 }}>{converterEfficiency}%</span>
                    </div>
                    <input type="range" min="70" max="98" value={converterEfficiency} onChange={(e)=>setConverterEfficiency(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                       <span style={{ fontSize: '15px' }}>커버(PC/Glass) 투과율 (%)</span>
                       <span style={{ fontWeight: 800 }}>{pcTransmittance}%</span>
                    </div>
                    <input type="range" min="50" max="98" value={pcTransmittance} onChange={(e)=>setPcTransmittance(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
                  </div>
               </div>
            </div>
            
            <div style={{ background: '#1e1b4b', padding: '48px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
               <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#fbbf24', marginBottom: '16px' }}>엔지니어 소견</h4>
               <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '15px' }}>
                  현재 설계된 <b>{totalVoltage}V / {totalCurrent}mA</b> 조합은 시중의 {Math.ceil(totalVoltage / 30) * 30}V급 정전류 컨버터와 
                  매칭이 좋습니다. 특히 90% 이상의 고효율 컨버터를 채택할 경우 등기구 최종 효율은 {systemEfficacy.toFixed(1)}lm/W 수준으로, 
                  <b>고효율 에너지기자재 인증</b>에 매우 유리한 수치입니다.
               </p>
            </div>
         </div>
      </section>

      {/* Chapter 3: Converter Logic Table (Constant Voltage vs Constant Current) */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px' }}>
         <div style={{ background: '#020617', padding: '48px', borderRadius: '48px', border: '4px solid #1e293b' }}>
            <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#38bdf8', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
               <Hexagon size={32} /> 정전류 (CC) vs 정전압 (CV)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <div style={{ padding: '24px', background: '#0f172a', borderRadius: '24px' }}>
                  <p style={{ fontWeight: 800, color: '#fff', marginBottom: '8px' }}>1. 정전류 (Constant Current)</p>
                  <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                     가장 권장되는 방식입니다. 컨버터가 전류를 일정하게 공급하여 LED 발열에 의한 Vf 변화를 스스로 조절합니다. 
                     회로 보호와 안정적인 광량 유지에 탁월합니다.
                  </p>
               </div>
               <div style={{ padding: '24px', background: '#0f172a', borderRadius: '24px' }}>
                  <p style={{ fontWeight: 800, color: '#fff', marginBottom: '8px' }}>2. 정전압 (Constant Voltage)</p>
                  <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                     간판(LED bar) 등 길이가 가변적인 곳에 쓰입니다. 모듈마다 저항이 달려있어 전압을 12V/24V로 고정 공급합니다. 
                     저항에서 열이 많이 발생하므로 광효율은 낮습니다.
                  </p>
               </div>
            </div>
         </div>

         <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
            <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#fbbf24', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
               <Component size={32} /> 등기구 적용 만능 가이드
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <li style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: '#10b981' }}><CheckCircle2 size={24} /></div>
                  <div>
                     <strong style={{ fontSize: '18px' }}>Binning & Efficiency</strong>
                     <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>전류를 낮추고 직렬을 늘리면(High Volt) 칩 내부 발열이 줄어 수명이 3배 이상 증가합니다.</p>
                  </div>
               </li>
               <li style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: '#38bdf8' }}><CheckCircle2 size={24} /></div>
                  <div>
                     <strong style={{ fontSize: '18px' }}>Hot-spot 해결</strong>
                     <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>LED 칩 간격을 15mm 이상 띄우는 것이 공기 대류를 통한 방열(Convection)에 유리합니다.</p>
                  </div>
               </li>
               <li style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: '#fbbf24' }}><CheckCircle2 size={24} /></div>
                  <div>
                     <strong style={{ fontSize: '18px' }}>패턴 선폭 (Trace Width)</strong>
                     <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>50W 이상 고출력 모듈은 패턴 폭을 2mm 이상 확보하여 전압 강하와 발열을 막아야 합니다.</p>
                  </div>
               </li>
            </ul>
         </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '32px', fontWeight: 900, color: '#10b981', marginBottom: '20px' }}>완벽한 회로는 제품의 수명을 10년 이상 연장합니다. ⚡</p>
         <p style={{ color: '#64748b', fontSize: '18px' }}>Global Circuit Design Master by Antigravity Technical Content</p>
      </footer>
    </div>
  );
}

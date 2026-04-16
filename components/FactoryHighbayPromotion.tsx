'use client';
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Eye, 
  Settings, 
  Maximize, 
  Warehouse, 
  Cpu, 
  CheckCircle2, 
  Activity, 
  Thermometer,
  Layers,
  ArrowRight
} from 'lucide-react';

const S = {
  container: { background: '#020617', color: '#f8fafc', fontFamily: 'Inter, sans-serif' },
  hero: { 
    height: '90vh', 
    display: 'flex', 
    flexDirection: 'column' as const,
    justifyContent: 'center', 
    alignItems: 'center', 
    background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)',
    position: 'relative' as const,
    overflow: 'hidden' as const
  },
  card: { background: '#0f172a', borderRadius: 24, border: '1px solid #1e293b', padding: 32, height: '100%' },
  accent: { color: '#10b981' },
  glass: { background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20 },
  input: { background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', color: '#fff', width: '100%' }
};

export default function FactoryHighbayPromotion() {
  const [mountHeight, setMountHeight] = useState(18);
  const [sensorRange, setSensorRange] = useState(25);
  const [isDetected, setIsDetected] = useState(false);
  const [activeTab, setActiveTab] = useState('structure');
  
  // 18m Sensor Detection Simulation Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIsDetected(prev => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={S.container}>
      {/* 1. HERO SECTION */}
      <section style={S.hero}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.2 }}>
          <div style={{ position: 'absolute', width: '200%', height: '200%', top: '-50%', left: '-50%', background: 'conic-gradient(from 180deg at 50% 50%, #10b981 0deg, transparent 60deg, transparent 300deg, #10b981 360deg)', filter: 'blur(100px)', animation: 'spin 20s linear infinite' }} />
        </div>
        
        <div style={{ zIndex: 10, textAlign: 'center', padding: '0 20px' }}>
          <div style={{ display: 'inline-block', padding: '4px 16px', background: '#10b98122', border: '1px solid #10b981', borderRadius: 100, color: '#10b981', fontSize: 14, fontWeight: 700, marginBottom: 24 }}>
            KOREAN TECHNOLOGY - 18M MICROWAVE SENSOR
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 84px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.1, marginBottom: 16 }}>
            UFO-AM6 <span style={S.accent}>150W</span>
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: '#94a3b8', maxWidth: 800, margin: '0 auto 40px', fontWeight: 500 }}>
            압도적인 18M 감지 고도. 대한민국 기술로 완성된 차세대 지능형 공장등.<br/>
            물류 창고의 효율을 140lm/W의 고효율과 스마트 센싱으로 혁명합니다.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button style={{ background: '#10b981', color: '#000', padding: '16px 32px', borderRadius: 12, fontWeight: 800, fontSize: 18, border: 'none', cursor: 'pointer' }}>
              견적 문의하기
            </button>
            <button style={{ background: 'transparent', color: '#fff', padding: '16px 32px', borderRadius: 12, fontWeight: 800, fontSize: 18, border: '1px solid #334155', cursor: 'pointer' }}>
              데이터시트 다운로드
            </button>
          </div>
        </div>

        {/* Floating Metrics */}
        <div style={{ position: 'absolute', bottom: 40, display: 'flex', gap: 60, zIndex: 10 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 900 }}>140lm/W</div>
            <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase' }}>High Efficacy</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 900 }}>18M+</div>
            <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase' }}>Sensor Height</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 900 }}>IP65</div>
            <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase' }}>Protection</div>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 24px' }}>
        
        {/* 2. CORE FEATURE: 18M SENSOR SIMULATION */}
        <section style={{ marginBottom: 120 }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 42, fontWeight: 900, marginBottom: 16 }}>Hyper-Sensing Technology</h2>
            <p style={{ color: '#94a3b8', fontSize: 18 }}>대한민국 자체 베이스 마이크로웨이브 센서가 18m 고천장에서의 미세한 움직임을 잡아냅니다.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32 }}>
            {/* Visualizer */}
            <div style={{ ...S.card, padding: 0, height: 600, overflow: 'hidden', position: 'relative' }}>
              {/* Warehouse Side View Mockup */}
              <div style={{ height: '100%', background: 'linear-gradient(to bottom, #020617, #0f172a)' }}>
                {/* Ceiling */}
                <div style={{ height: 2, background: '#1e293b', width: '100%', position: 'absolute', top: 50 }} />
                
                {/* Light Source */}
                <div style={{ position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)' }}>
                  <div style={{ width: 80, height: 20, background: '#1e293b', borderRadius: '40px 40px 10px 10px' }} />
                  {/* Light Beam */}
                  <div style={{ 
                    position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
                    width: 0, height: 0, 
                    borderLeft: '200px solid transparent', borderRight: '200px solid transparent',
                    borderBottom: '500px solid ' + (isDetected ? '#10b98111' : '#33415511'),
                    filter: 'blur(40px)', transition: '0.5s'
                  }} />
                  {/* Glow */}
                  <div style={{ position: 'absolute', top: 15, left: '50%', transform: 'translateX(-50%)', width: 40, height: 40, background: isDetected ? '#10b981' : '#334155', borderRadius: '50%', filter: 'blur(20px)', transition: '0.3s' }} />
                </div>

                {/* Person/Vehicle at Bottom */}
                <div style={{ 
                  position: 'absolute', bottom: 60, left: isDetected ? '50%' : '10%',
                  transition: 'all 2s ease-in-out',
                  zIndex: 20
                }}>
                  <div style={{ width: 40, height: 60, background: '#f8fafc', borderRadius: 8, opacity: 0.8 }} />
                  <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', width: 20, height: 20, background: '#f8fafc', borderRadius: '50%' }} />
                </div>

                {/* Ground */}
                <div style={{ height: 40, background: '#1e293b', width: '100%', position: 'absolute', bottom: 0 }} />

                {/* Dimension Line */}
                <div style={{ position: 'absolute', left: 40, top: 60, bottom: 60, width: 2, background: 'rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ background: '#020617', padding: '4px 8px', fontSize: 12, transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>
                    HEIGHT: {mountHeight}M
                  </div>
                </div>
              </div>

              {/* HUD Overlay */}
              <div style={{ position: 'absolute', top: 20, right: 20, padding: 16, ...S.glass }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: isDetected ? '#10b981' : '#ef4444', boxShadow: isDetected ? '0 0 10px #10b981' : 'none' }} />
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{isDetected ? 'OBJECT DETECTED' : 'SCANNING...'}</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div style={S.card}>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Settings size={20} /> Sensor Calibration
              </h3>
              
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>Mounting Height (m)</label>
                <input 
                  type="range" min="5" max="25" value={mountHeight} 
                  onChange={(e) => setMountHeight(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981' }} 
                />
                <div style={{ textAlign: 'right', fontWeight: 700, marginTop: 4 }}>{mountHeight}m</div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>Detection Range (%)</label>
                <input 
                  type="range" min="10" max="100" value={sensorRange}
                  onChange={(e) => setSensorRange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981' }} 
                />
                <div style={{ textAlign: 'right', fontWeight: 700, marginTop: 4 }}>{sensorRange}%</div>
              </div>

              <div style={{ borderTop: '1px solid #1e293b', paddingTop: 24 }}>
                <div style={{ background: '#10b98111', padding: 16, borderRadius: 12, border: '1px solid #10b98133' }}>
                  <div style={{ fontSize: 13, color: '#10b981', fontWeight: 700, marginBottom: 4 }}>Korean Sensor Advantage</div>
                  <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>
                    저가형 센서와 달리, 고출력 5.8GHz 밴드를 사용하여 18m 이상의 물류창고에서도 바닥의 지게차나 작업자를 정확하게 식별합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. COMPETITIVE ADVANTAGE: THE 18M CHALLENGE */}
        <section style={{ marginBottom: 120 }}>
          <div style={S.card}>
            <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: 'center' }}>왜 UFO-AM6 인가?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
              <div style={{ padding: 24, background: '#1e293b55', borderRadius: 20, border: '1px solid #1e293b' }}>
                <div style={{ color: '#ef4444', fontWeight: 800, fontSize: 18, marginBottom: 16 }}>Conventional Sensors</div>
                <ul style={{ color: '#94a3b8', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li>• 최대 감지 고도 8~10m (고천장 대응 불능)</li>
                  <li>• 중국산 범용 모듈 사용 (오작동 빈번)</li>
                  <li>• 주변 노이즈에 취약한 감도</li>
                </ul>
              </div>
              <div style={{ padding: 24, background: '#10b98111', borderRadius: 20, border: '1px solid #10b98133' }}>
                <div style={{ color: '#10b981', fontWeight: 800, fontSize: 18, marginBottom: 16 }}>YNK K-Microwave Sensor</div>
                <ul style={{ color: '#f8fafc', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li>• 최대 감지 고도 18m ~ 20m (초고천장 완벽 대응)</li>
                  <li>• 국내 독자 개발 센서 알고리즘 탑제</li>
                  <li>• 물류창고 대형 도어/지게차 특화 필터링</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PRODUCT DETAIL TABS (3D/CAD/STRUCTURE) */}
        <section style={{ marginBottom: 120 }}>
          <div style={{ display: 'flex', gap: 40, marginBottom: 48 }}>
            {['structure', 'chipset', 'thermal'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ 
                  background: 'none', border: 'none', 
                  color: activeTab === tab ? '#10b981' : '#64748b',
                  fontSize: 20, fontWeight: 800, cursor: 'pointer',
                  paddingBottom: 8,
                  borderBottom: activeTab === tab ? '3px solid #10b981' : '3px solid transparent'
                }}
              >
                {tab === 'structure' ? '외형 디자인' : tab === 'chipset' ? 'LED 모듈' : '방열 설계'}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            {/* Visual Part */}
            <div>
              {activeTab === 'structure' && (
                <div style={{ position: 'relative', height: 500, background: '#0f172a', borderRadius: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                  <div style={{ width: 300, height: 60, background: '#334155', borderRadius: '150px 150px 10px 10px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
                  <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '80%', padding: 24, ...S.glass, textAlign: 'center' }}>
                    <Layers size={40} style={{ marginBottom: 16, color: '#10b981' }} />
                    <h4 style={{ fontSize: 18, fontWeight: 700 }}>ADC12 Die-Casting Housing</h4>
                    <p style={{ fontSize: 14, color: '#94a3b8' }}>강력한 내구성과 최적화된 공기 흐름 설계</p>
                  </div>
                </div>
              )}
              {activeTab === 'chipset' && (
                <div style={{ height: 500, background: '#0f172a', borderRadius: 24, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 10, padding: 40 }}>
                  {[...Array(48)].map((_, i) => (
                    <div key={i} style={{ aspectRatio: '1', background: '#fbbf24', borderRadius: 2, boxShadow: '0 0 5px #fbbf24' }} />
                  ))}
                </div>
              )}
              {activeTab === 'thermal' && (
                <div style={{ height: 500, background: '#0f172a', borderRadius: 24, padding: 40 }}>
                  <div style={{ height: '100%', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)', opacity: 0.5 }} />
                    <Activity size={40} color="#f43f5e" style={{ position: 'absolute', top: 20, right: 20 }} />
                    <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                      <div style={{ fontSize: 48, fontWeight: 900 }}>Tj 65°C</div>
                      <div style={{ fontSize: 14, color: '#94a3b8' }}>Real-time Thermal Dissipation</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description Part */}
            <div>
              <h3 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>
                {activeTab === 'structure' ? '컴팩트 & 하이엔드 하우징' : activeTab === 'chipset' ? '고효율 2835 9V 패키지' : 'Aerodynamic Thermal Control'}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { title: activeTab === 'structure' ? '우수한 내부식성' : '고출력 밀도', desc: '염해 및 유증기 환경에서도 부식되지 않는 특수 도장 적용' },
                  { title: activeTab === 'structure' ? '경량화 설계' : '장수명 보장', desc: '설치 하중을 최소화하면서도 방열 효율을 극대화한 구조' },
                  { title: activeTab === 'structure' ? 'IP65 완전방수' : 'CRI 80+', desc: '극한의 현장 환경을 고려한 빈틈 없는 씰링 시스템' }
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: 16 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#10b98122', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#10b981', flexShrink: 0 }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. TECHNICAL SPECIFICATIONS TABLE */}
        <section style={{ marginBottom: 120 }}>
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
              <div>
                <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Technical Specification</h2>
                <p style={{ color: '#94a3b8' }}>UFO-AM6-150W 상세 데이터시트</p>
              </div>
              <div style={{ padding: '8px 16px', background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 14 }}>
                Last Updated: 2026.04
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1 }}>
              {[
                { label: '모델명', value: 'UFO-AM6-150W (Motion Sensor Type)' },
                { label: '소비전력', value: '150.0 W (±5%)' },
                { label: '총 광속', value: '22,477 lm' },
                { label: '광효율', value: '151.2 lm/W' },
                { label: '색온도', value: '5000K (Standard)' },
                { label: '연색성 (CRI)', value: 'Ra > 80' },
                { label: '입력전압', value: 'AC 100~277V (50/60Hz)' },
                { label: '작동온도', value: '-30°C ~ +50°C' },
                { label: 'IP 등급', value: 'IP65' },
                { label: '빔 각도', value: '120° (Wide Beam)' },
                { label: '센서 종류', value: 'Microwave Sensor (KOREA Base)' },
                { label: '수명 (L70)', value: '50,000 Hours' },
              ].map((spec, idx) => (
                <div key={idx} style={{ padding: '20px 0', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontSize: 15 }}>{spec.label}</span>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CTA SECTION */}
        <section style={{ 
          ...S.card, 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
          textAlign: 'center', 
          padding: '80px 40px',
          color: '#000'
        }}>
          <h2 style={{ fontSize: 48, fontWeight: 900, marginBottom: 16 }}>준비되셨나요?</h2>
          <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 40, opacity: 0.8 }}>최고의 물류 환경을 위한 지능형 조명 솔루션, 지금 바로 도입하세요.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button style={{ background: '#000', color: '#fff', padding: '18px 48px', borderRadius: 14, fontWeight: 800, fontSize: 20, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
              프로젝트 상담 시작하기 <ArrowRight size={20} />
            </button>
          </div>
        </section>

      </main>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

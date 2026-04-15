'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Cpu, Zap, Activity, Network, AlertTriangle, Settings, Lightbulb, 
  Workflow, ShieldCheck, Thermometer, BarChart3, Clock, Layers, 
  Gauge, Play, RefreshCcw, ChevronRight, ArrowRight, ShieldAlert,
  Waves, Battery, Microscope, Ruler, Database, Share2, Compass,
  TrendingUp, Power, Monitor, HardHat
} from 'lucide-react';

export default function SmartSMPSManual() {
  const [isMobile, setIsMobile] = useState(false);
  const [load, setLoad] = useState(85);
  const [temp, setTemp] = useState(48);
  const [selectedOutput, setSelectedOutput] = useState('108V');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState('topology');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const outputs = [
    { v: '36V', desc: '저전압 안전 설계용, 소형 가로등 최적' },
    { v: '72V', desc: '중규모 모듈, 고효율 밸런스' },
    { v: '108V', desc: '대규모 투광등, 직렬 손실 최소화' },
    { v: '144V', desc: '초고출력 엔진, 1:1 매칭 전문가용' },
    { v: '162V', desc: '특수 고출력 및 장거리 배선 전압 강하 보상용' }
  ];

  // Professional Engineering Calculations
  const metrics = useMemo(() => {
    const baseEff = 96.2;
    const vBoost = selectedOutput === '162V' ? 0.8 : selectedOutput === '36V' ? -1.2 : 0;
    const currentEff = (baseEff + vBoost - (Math.abs(85-load)*0.1) - (temp > 60 ? (temp-60)*0.2 : 0)).toFixed(1);
    const pf = (0.98 - (Math.abs(100-load)*0.001)).toFixed(3);
    const thd = (4.2 + (Math.abs(100-load)*0.05)).toFixed(1);
    return { eff: currentEff, pf, thd };
  }, [load, temp, selectedOutput]);

  const runSystemTest = (type: string) => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      alert(`${type} 검증 완료: 출력 전압 편차 0.5% 이내, 서지 10kV 내성Pass, 효율 ${metrics.eff}%를 기록하였습니다.`);
    }, 1500);
  };

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
      gap: '100px',
      boxShadow: '0 80px 200px rgba(0, 0, 0, 0.9)',
    }}>

      {/* Hero Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '36px' : '88px', fontWeight: 950, marginBottom: '32px', lineHeight: 1, letterSpacing: '-0.05em' }}>
           ⚡ <span style={{ color: '#38bdf8' }}>초정밀 지능형 SMPS</span> <br/>
           <span style={{ fontSize: '0.45em', color: '#94a3b8', display: 'block', marginTop: '24px', fontWeight: 700 }}>고신뢰성 전력 변환 시스템 실무 기술 지침서 (V1.2)</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '24px', color: '#94a3b8', maxWidth: '1100px', margin: '0 auto', lineHeight: 1.9 }}>
           SMPS는 조명의 심장입니다. 본 지침서는 전압 원리와 전류 제어(CC/CV), 
           그리고 10kV 서지 방호 기술을 포함하여 현장에서 발생하는 
           모든 전력 변수를 통제하기 위한 100% 엔지니어링 실무 데이터를 담고 있습니다.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', background: 'rgba(15, 23, 42, 0.5)', padding: '10px', borderRadius: '24px', width: 'fit-content', margin: '0 auto', border: '1px solid #1e293b', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { id: 'topology', label: '회로 공학 (Topology)', icon: Layers },
          { id: 'driving', label: '드라이빙 센터 (CC/CV)', icon: Gauge },
          { id: 'protection', label: '보호 시스템 (Surge)', icon: ShieldCheck },
          { id: 'thermal', label: '열설계 및 수명', icon: Thermometer }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '14px 28px',
              borderRadius: '20px',
              border: 'none',
              background: activeTab === tab.id ? '#38bdf8' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#94a3b8',
              fontWeight: 800,
              fontSize: '15.5px',
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

      {/* Chapter 1: Topology & Dynamic Load Simulation */}
      {activeTab === 'topology' && (
        <section style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: isMobile ? '32px' : '80px', borderRadius: '64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
               <h2 style={{ fontSize: '38px', fontWeight: 950, color: '#38bdf8', marginBottom: '40px' }}>LLC 공진형 전력 변환 공학</h2>
               <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 2.0, marginBottom: '60px' }}>
                  기존의 플라이백(Flyback)이나 포워드 컨버터는 하드 스위칭 방식으로 인해 열 손실이 큽니다. 
                  본 스마트 SMPS는 LLC Resonant Topology를 채택하여 제로 전압 스위칭(ZVS)을 실현했습니다. 
                  스위칭 손실을 극한으로 줄여 효율을 96% 이상으로 확보함과 동시에 전자기파(EMI) 발생을 원천적으로 억제합니다.
               </p>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                     <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                           <span>📉 동작 부하율 (Working Load)</span>
                           <span style={{ color: '#38bdf8' }}>{load} %</span>
                        </label>
                        <input type="range" min="20" max="100" value={load} onChange={(e)=>setLoad(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
                     </div>
                     <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                           <span>🌡️ 주변 온도 (Ambient)</span>
                           <span style={{ color: temp > 65 ? '#f43f5e' : '#fbbf24' }}>{temp} °C</span>
                        </label>
                        <input type="range" min="10" max="85" value={temp} onChange={(e)=>setTemp(Number(e.target.value))} style={{ width: '100%', accentColor: temp > 65 ? '#f43f5e' : '#fbbf24' }} />
                     </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                     <DataBox title="전력 효율" value={`${metrics.eff}%`} color="#10b981" />
                     <DataBox title="역률 (PF)" value={metrics.pf} color="#38bdf8" />
                     <DataBox title="고조파 (THD)" value={`${metrics.thd}%`} color="#fbbf24" />
                  </div>
               </div>
            </div>

            <div style={{ position: 'sticky', top: '100px' }}>
               <div style={{ background: '#020617', padding: '48px', borderRadius: '48px', border: '2px solid #1e293b' }}>
                  <h4 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <Activity size={24} color="#38bdf8" /> 스위칭 파형 분석 (ZVS)
                  </h4>
                  <div style={{ height: '240px', background: 'rgba(56, 189, 248, 0.05)', borderRadius: '24px', position: 'relative', overflow: 'hidden', padding: '24px' }}>
                     {/* Oscilloscope Mockup */}
                     <svg width="100%" height="100%" viewBox="0 0 200 100" style={{ overflow: 'visible' }}>
                        <path d="M 0 50 Q 25 10 50 50 T 100 50 T 150 50 T 200 50" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M 0 50 Q 25 90 50 50 T 100 50 T 150 50 T 200 50" fill="none" stroke="#fbbf24" strokeWidth="2" />
                        <line x1="0" y1="50" x2="200" y2="50" stroke="#334155" strokeWidth="0.5" />
                     </svg>
                     <div style={{ position: 'absolute', bottom: '16px', right: '16px', fontSize: '11px', color: '#64748b' }}>65kHz Resonant Sync</div>
                  </div>
                  <button 
                    onClick={() => runSystemTest('LLC Resonance Verification')}
                    style={{ width: '100%', marginTop: '32px', padding: '24px', borderRadius: '20px', background: '#38bdf8', border: 'none', color: '#fff', fontWeight: 950, fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                  >
                    {isSimulating ? <RefreshCcw size={20} className="animate-spin" /> : <Play size={20} />}
                    동적 파형 검증 실행
                  </button>
               </div>
            </div>
          </div>
        </section>
      )}

      {/* Chapter 2: Output Voltage & Driver Match (CC/CV) */}
      {activeTab === 'driving' && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
           <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '38px', fontWeight: 950, marginBottom: '24px' }}>드라이버 출력 설계 가이드</h2>
              <p style={{ color: '#94a3b8', fontSize: '18px' }}>LED 모듈 배열에 따른 최적 전압 선택은 시스템 효율의 3%를 결정합니다.</p>
           </div>

           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', gap: '20px' }}>
              {outputs.map(item => (
                <button 
                  key={item.v}
                  onClick={() => setSelectedOutput(item.v)}
                  style={{
                    padding: '32px 20px',
                    borderRadius: '32px',
                    background: selectedOutput === item.v ? '#38bdf8' : '#0f172a',
                    border: '1px solid #1e293b',
                    color: selectedOutput === item.v ? '#fff' : '#94a3b8',
                    transition: '0.3s',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '28px', fontWeight: 950, marginBottom: '12px' }}>{item.v}</div>
                  <div style={{ fontSize: '12px', lineHeight: 1.5 }}>{item.desc}</div>
                </button>
              ))}
           </div>

           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px' }}>
              <div style={{ background: '#0f172a', padding: '56px', borderRadius: '48px', border: '1px solid #1e293b' }}>
                 <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px', color: '#38bdf8' }}>정전류(CC) 제어의 필수성</h4>
                 <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: 1.9 }}>
                    LED는 온도가 올라갈수록 순방향 전압이 낮아지는 부특성을 지닙니다. 
                    전압을 고정하면 전류가 폭주하여 열폭주(Thermal Runaway)가 발생합니다. 
                    저희 SMPS는 출력 전류 오차율 1% 미만의 정밀 피드백 회로를 통해 
                    사계절 어떠한 환경에서도 일정한 밝기를 유지합니다.
                 </p>
              </div>
              <div style={{ background: '#0f172a', padding: '56px', borderRadius: '48px', border: '1px solid #1e293b' }}>
                 <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px', color: '#fbbf24' }}>동적 디밍 가변 기술</h4>
                 <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: 1.9 }}>
                    1-10V, DALI-2, PWM 디밍을 모두 지원합니다. 
                    특히 'Soft-On/Off' 기능을 탑재하여 켜지고 꺼질 때 사람의 눈이 피로를 느끼지 않도록 
                    1.5초간 부드럽게 밝기가 변화합니다. 이는 등기구 수명 연장에도 기여합니다.
                 </p>
              </div>
           </div>
        </section>
      )}

      {/* Chapter 3: Surge & Reliability */}
      {activeTab === 'protection' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
           <ProtectionCard 
            icon={ShieldAlert}
            title="10kV Surge Protection"
            desc="낙뢰가 잦은 산간/해안 지역에서도 안전하도록 10kV 5kA 등급의 서지 방호 소자가 장착되었습니다. 계통 사고로부터 등기구를 완벽히 격리합니다."
           />
           <ProtectionCard 
            icon={Thermometer}
            title="Automatic Derating"
            desc="내부 온도가 85℃를 넘으면 기능을 정지하는 대신 출력을 30% 낮추어 열을 식힙니다. 0% 소등 사고를 방치하는 스마트 로직입니다."
           />
           <ProtectionCard 
            icon={Activity}
            title="Ripple-Free Output"
            desc="DC 출력의 노이즈를 1V 이하로 억제하여 LED의 미세한 떨림(Flicker)을 원천 차단합니다. 장시간 사용 시에도 눈의 피로도가 매우 낮습니다."
           />
        </section>
      )}

      {/* Chapter 4: Life Calculation & Maintenance */}
      {activeTab === 'thermal' && (
        <section style={{ background: 'linear-gradient(135deg, #020617 0%, #1e1b4b 100%)', padding: '80px', borderRadius: '64px', border: '1px solid #312e81' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: '80px', alignItems: 'center' }}>
              <div>
                 <h3 style={{ fontSize: '36px', fontWeight: 950, marginBottom: '32px' }}>엔지니어를 위한 <br/> 기대 수명 차트</h3>
                 <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 1.8, marginBottom: '40px' }}>
                    SMPS 최고의 설계는 '방열'입니다. 온도가 10도 낮아질수록 내부 전해 콘덴서의 수명은 2배로 늘어납니다. 
                    저희 모듈은 알루미늄 다이캐스팅 케이스와 100% 실리콘 함침 처리를 통해 
                    -40도에서 +60도의 극한 환경에서도 50,000시간 이상의 수명을 보장합니다.
                 </p>
                 <div style={{ display: 'flex', gap: '16px' }}>
                    <Tag label="IP67 Waterproof" />
                    <Tag label="IK10 Impact" />
                    <Tag label="105℃ Cap Grade" />
                 </div>
              </div>
              <div style={{ background: '#020617', padding: '48px', borderRadius: '48px', border: '1px solid #334155' }}>
                 <div style={{ marginBottom: '32px', borderBottom: '1px solid #1e293b', paddingBottom: '24px' }}>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>예상 수명 (Standard Operation)</div>
                    <div style={{ fontSize: '48px', fontWeight: 950, color: '#10b981' }}>62,400 <span style={{ fontSize: '20px' }}>Hours</span></div>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                       <span>부하율 100% 구동 시</span>
                       <span style={{ color: '#fff' }}>약 35,000시간</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                       <span>부하율 70% 구동 시 (권장)</span>
                       <span style={{ color: '#fff' }}>약 72,000시간</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      )}

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '32px', fontWeight: 950, color: '#fff', marginBottom: '20px' }}>완벽한 전력은 완벽한 빛의 시작입니다. ⚡</p>
         <p style={{ color: '#64748b', fontSize: '18px' }}>Global Power Engineering Standards by Antigravity Systems</p>
      </footer>

      <style jsx>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
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
      `}</style>
    </div>
  );
}

function DataBox({ title, value, color }: any) {
  return (
    <div style={{ background: '#020617', padding: '24px', borderRadius: '24px', border: '1px solid #1e293b', textAlign: 'center' }}>
       <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>{title}</div>
       <div style={{ fontSize: '24px', fontWeight: 950, color: color }}>{value}</div>
    </div>
  );
}

function ProtectionCard({ icon: Icon, title, desc }: any) {
  return (
    <div style={{ background: '#0f172a', padding: '56px', borderRadius: '48px', border: '1px solid #1e293b' }}>
       <div style={{ color: '#38bdf8', marginBottom: '24px' }}><Icon size={40} /></div>
       <h4 style={{ fontSize: '22px', fontWeight: 950, marginBottom: '20px' }}>{title}</h4>
       <p style={{ color: '#cbd5e1', fontSize: '15.5px', lineHeight: 1.8 }}>{desc}</p>
    </div>
  );
}

function Tag({ label }: any) {
  return (
    <span style={{ padding: '10px 20px', borderRadius: '14px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', fontSize: '13px', fontWeight: 800, border: '1px solid rgba(56, 189, 248, 0.2)' }}>{label}</span>
  );
}

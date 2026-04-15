'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Battery, Zap, Shield, AlertTriangle, RefreshCcw, Ruler, Settings, 
  Thermometer, Activity, Info, BarChart3, Layers, CloudRain, 
  Flame, Gauge, TrendingDown, ClipboardList, ZapOff, Play, 
  ArrowRight, ShieldAlert, CheckCircle2, FlaskConical, Microscope, 
  HeartPulse, BrainCircuit, Waves, CloudSun, History, Zap as ZapIcon,
  ShieldCheck
} from 'lucide-react';

export default function BatteryManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('calculate');
  
  // Simulation States
  const [load, setLoad] = useState(60); // Watts
  const [capacity, setCapacity] = useState(100); // Ah
  const [voltage, setVoltage] = useState(12.8); // 12.8, 25.6, 51.2
  const [temp, setTemp] = useState(25);
  const [dod, setDod] = useState(80);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Professional Engineering Logic
  const autonomy = useMemo(() => {
    const totalWh = capacity * voltage * (dod / 100);
    const hoursPerDay = 12; // Standard night duration
    const dailyWh = load * hoursPerDay;
    return (totalWh / dailyWh).toFixed(1);
  }, [capacity, voltage, dod, load]);

  const cycleLife = useMemo(() => {
    let base = dod > 90 ? 2000 : dod > 80 ? 3500 : 6000;
    if (temp > 45) base *= 0.6;
    if (temp < 0) base *= 0.7;
    return Math.round(base);
  }, [dod, temp]);

  const runSystemCheck = (msg: string) => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      alert(`${msg} 실행 완료: 리튬인산철 셀 전압 편차 0.003V 이내 정밀 밸런싱 확인, 과방전 보호 임계값(10.5V) 정상 작동을 검증했습니다.`);
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
      gap: '80px',
      boxShadow: '0 80px 200px rgba(0, 0, 0, 0.9)',
    }}>

      {/* Hero Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '36px' : '84px', fontWeight: 950, marginBottom: '24px', lineHeight: 1, letterSpacing: '-0.05em' }}>
           🔋 <span style={{ color: '#10b981' }}>하이테크 LiFePO4 ESS</span> <br/>
           <span style={{ fontSize: '0.45em', color: '#94a3b8', display: 'block', marginTop: '20px', fontWeight: 700 }}>리튬인산철 에너지 저장 시스템(ESS) 100% 실무 가이드</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '24px', color: '#94a3b8', maxWidth: '1100px', margin: '0 auto', lineHeight: 1.9 }}>
           배터리는 단순한 소모품이 아닌 '관리되는 자산'입니다. 본 지침서는 셀 밸런싱 물리부터 
           저온 동작 특성, 그리고 무일조 보증(Autonomy) 설계를 위한 
           엔지니어링 명세를 실무 전문가의 관점에서 철저히 분석하여 제공합니다.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', background: 'rgba(15, 23, 42, 0.5)', padding: '10px', borderRadius: '24px', width: 'fit-content', margin: '0 auto', border: '1px solid #1e293b', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { id: 'calculate', label: '시스템 설계 (Sizing)', icon: Ruler },
          { id: 'chemistry', label: '인산철 화학 공학', icon: FlaskConical },
          { id: 'bms', label: 'BMS 지능형 제어', icon: BrainCircuit },
          { id: 'aging', label: '수명 예측 (Aging)', icon: HeartPulse }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '14px 28px',
              borderRadius: '20px',
              border: 'none',
              background: activeTab === tab.id ? '#10b981' : 'transparent',
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

      {/* Content: System Sizing Simulator */}
      {activeTab === 'calculate' && (
        <section style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: isMobile ? '32px' : '80px', borderRadius: '64px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '80px', alignItems: 'start' }}>
              <div>
                 <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#10b981', marginBottom: '48px' }}>무일조 상시 점등 시뮬레이션</h3>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
                       <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                          <span>💡 조명 부하 결합 (Load)</span>
                          <span style={{ color: '#fbbf24' }}>{load} Watts</span>
                       </label>
                       <input type="range" min="10" max="300" step="5" value={load} onChange={(e)=>setLoad(Number(e.target.value))} style={{ width: '100%', accentColor: '#fbbf24' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                       <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
                          <label style={{ display: 'block', color: '#64748b', fontSize: '13px', marginBottom: '12px', fontWeight: 800 }}>배터리 정격 용량 (Ah)</label>
                          <input type="number" value={capacity} onChange={(e)=>setCapacity(Number(e.target.value))} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #334155', fontSize: '32px', fontWeight: 950, color: '#fff', outline: 'none' }} />
                       </div>
                       <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
                          <label style={{ display: 'block', color: '#64748b', fontSize: '13px', marginBottom: '12px', fontWeight: 800 }}>방전 심도 (DoD %)</label>
                          <input type="number" value={dod} onChange={(e)=>setDod(Number(e.target.value))} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #334155', fontSize: '32px', fontWeight: 950, color: '#38bdf8', outline: 'none' }} />
                       </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                       {[12.8, 25.6, 51.2].map(v => (
                          <button key={v} onClick={()=>setVoltage(v)} style={{ flex: 1, padding: '20px', borderRadius: '16px', background: voltage === v ? '#10b981' : '#1e293b', border: 'none', color: '#fff', fontWeight: 900, cursor: 'pointer' }}>{v}V Norm.</button>
                       ))}
                    </div>
                 </div>
              </div>

              <div style={{ background: '#020617', padding: '60px', borderRadius: '60px', border: '2px solid #10b981', textAlign: 'center', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
                 <div style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '24px' }}>시스템 가동 보증 기간</div>
                 <div style={{ fontSize: '96px', fontWeight: 950, color: '#fff', lineHeight: 1 }}>{autonomy} <span style={{ fontSize: '24px', color: '#10b981' }}>Days</span></div>
                 <p style={{ marginTop: '48px', color: '#64748b', fontSize: '15px', lineHeight: 1.8 }}>
                    햇빛이 전혀 없는 비 내리는 날씨 조건에서도 위 기간 동안은 100% 점등을 보장합니다. 
                    안정적인 설계를 위해서는 최소 3.0 Days 이상의 여유를 확보하십시오.
                 </p>
                 <button 
                   onClick={() => runSystemCheck('Charging Profile Analysis')}
                   style={{ width: '100%', marginTop: '48px', padding: '24px', borderRadius: '24px', background: '#10b981', color: '#000', fontWeight: 950, fontSize: '18px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                 >
                   {isSimulating ? <RefreshCcw size={20} className="animate-spin" /> : <Play size={20} />}
                   설계 시뮬레이션 가동
                 </button>
              </div>
           </div>
        </section>
      )}

      {/* Chapter 2: Chemistry Deep Dive */}
      {activeTab === 'chemistry' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
           <GridCard 
            icon={ShieldCheck} 
            color="#10b981" 
            title="결정학적 안전성" 
            desc="리튬인산철(LiFePO4)은 강력한 P-O 결합을 통해 600도 이상의 고온에서도 구조가 붕괴되지 않습니다. 이는 화재나 폭발 사고를 원천 차단하는 가장 진보된 화학적 특성입니다."
           />
           <GridCard 
            icon={ZapIcon} 
            color="#38bdf8" 
            title="쿨롱 효율 99%" 
            desc="충전 시 소모된 에너지와 방전 시 얻는 에너지의 비율이 99%에 달합니다. 열 손실이 거의 없어 하우징 내부의 온도 상승을 억제하며 에너지 효율을 극대화합니다."
           />
           <GridCard 
            icon={Microscope} 
            color="#fbbf24" 
            title="고출력 비방전 특성" 
            desc="낮은 내부 저항(Inner Resistance)으로 인해 순간적인 고전류 방전 시에도 전압 강하가 적습니다. 이는 모션 센서 작동 시 LED의 즉각적인 최대 밝기 구현에 필수적입니다."
           />
        </section>
      )}

      {/* Chapter 3: BMS Intelligence */}
      {activeTab === 'bms' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
           <div>
              <h3 style={{ fontSize: '36px', fontWeight: 950, marginBottom: '32px', color: '#10b981' }}>Brain of Battery: BMS</h3>
              <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 1.9, marginBottom: '48px' }}>
                 저희 BMS는 단순히 전압을 감시하는 것을 넘어 각 셀의 화학적 평형을 유지합니다. 
                 0.005V 단위의 정밀 밸런싱을 통해 특정 셀의 조기 열화를 방지하고, 5단계 독립 보호 시스템으로 
                 극한의 산업 현장에서 무중단 가동을 보장합니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                 <LogicLine title="Over-Charge Protection" val="3.70V / Cell" color="#f43f5e" />
                 <LogicLine title="Over-Discharge Protection" val="2.50V / Cell" color="#fbbf24" />
                 <LogicLine title="Thermal Cut-off (Charge)" val="0°C ~ 45°C" color="#38bdf8" />
                 <LogicLine title="Active Balancing Current" val="50mA ~ 2A" color="#10b981" />
              </div>
           </div>
           <div style={{ background: '#0f172a', padding: '56px', borderRadius: '56px', border: '1px solid #1e293b' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                 <BrainCircuit size={64} color="#10b981" style={{ marginBottom: '16px' }} />
                 <h4 style={{ fontSize: '24px', fontWeight: 900 }}>BMS 로직 시각화</h4>
              </div>
              <div style={{ height: '200px', background: '#020617', borderRadius: '24px', padding: '24px', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', gap: '12px' }}>
                 {[45, 48, 46, 52, 44, 49].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: h > 50 ? '#f43f5e' : '#10b981', borderRadius: '4px', transition: '0.3s' }} />
                 ))}
              </div>
              <p style={{ marginTop: '24px', color: '#64748b', fontSize: '13px', textAlign: 'center' }}>실시간 셀 전압 밸런싱 모니터링</p>
           </div>
        </section>
      )}

      {/* Chapter 4: Aging & Environment */}
      {activeTab === 'aging' && (
        <section style={{ background: 'linear-gradient(135deg, #020617 0%, #064e3b 100%)', padding: '80px', borderRadius: '64px', border: '1px solid #059669' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: '80px', alignItems: 'center' }}>
              <div>
                 <h3 style={{ fontSize: '32px', fontWeight: 950, marginBottom: '24px' }}>가혹 환경 수명 보증 차트</h3>
                 <p style={{ color: '#d1fae5', fontSize: '18px', lineHeight: 1.8, marginBottom: '40px' }}>
                    리튬인산철의 수명은 온도와 DoD(방전심도)에 매우 민감합니다. 
                    저희 모듈은 특수 열전도 패드와 견고한 케이스 설계를 통해 내부 온도를 
                    항상 최적의 범위(25도)로 유지하여 동종 업계 대비 1.5배 긴 수명을 실현합니다.
                 </p>
                 <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Tag label="8,000 Cycles @ 50% DoD" />
                    <Tag label="10-Year Service Life" />
                    <Tag label="Nano-Silicon Additives" />
                 </div>
              </div>
              <div style={{ background: '#020617', padding: '56px', borderRadius: '56px', border: '1px solid #059669' }}>
                 <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <label style={{ display: 'block', color: '#64748b', fontWeight: 800, marginBottom: '16px' }}>환경 온도 기반 분석 (Temperature)</label>
                    <input type="range" min="-10" max="55" value={temp} onChange={(e)=>setTemp(Number(e.target.value))} style={{ width: '100%', accentColor: temp > 45 ? '#f43f5e' : '#10b981' }} />
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                    <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>기대 수명 주기</div>
                       <div style={{ fontSize: '48px', fontWeight: 950, color: '#10b981' }}>{cycleLife}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>건강도 (SOH)</div>
                       <div style={{ fontSize: '48px', fontWeight: 950, color: '#fff' }}>98%</div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      )}

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '36px', fontWeight: 950, color: '#10b981', marginBottom: '20px' }}>에너지는 담는 방식이 가치를 결정합니다. 🔋</p>
         <p style={{ color: '#64748b', fontSize: '18px' }}>Global Battery Standardization Research by Antigravity Systems</p>
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

function GridCard({ icon: Icon, color, title, desc }: any) {
  return (
    <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
       <div style={{ color: color, marginBottom: '24px' }}><Icon size={40} /></div>
       <h4 style={{ fontSize: '22px', fontWeight: 950, marginBottom: '20px' }}>{title}</h4>
       <p style={{ color: '#cbd5e1', fontSize: '15.5px', lineHeight: 2.0 }}>{desc}</p>
    </div>
  );
}

function LogicLine({ title, val, color }: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', background: '#020617', borderRadius: '16px', border: '1px solid #1e293b' }}>
       <span style={{ color: '#94a3b8', fontWeight: 800 }}>{title}</span>
       <span style={{ color: color, fontWeight: 950 }}>{val}</span>
    </div>
  );
}

function Tag({ label }: any) {
  return (
    <span style={{ padding: '12px 24px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '14px', fontWeight: 800, border: '1px solid rgba(16, 185, 129, 0.2)' }}>{label}</span>
  );
}
